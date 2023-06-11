import * as React from 'react';
import { isEmpty } from 'lodash';

import { IconPlus, IconTags, IconTag, IconX } from '@tabler/icons';
import { UnderlineTabs } from 'src/components/Tabs';
import InputSearch from 'src/components/Input/Search';
import TagItemList from 'src/components/Tags/ItemList';
import TagItem from 'src/components/Tags/Item';
import { Tag as TagType, TagStatus } from 'src/generated/types';
import {
  useSearchTagsLazyQuery,
  useFetchSubspaceTagsLazyQuery,
  useCreateTagMutation,
} from 'src/generated/apollo';
import * as yup from 'yup';
import { SpaceRequiredProps } from 'src/utils/types';

interface Props extends SpaceRequiredProps {
  onSubmitTags: (tags: TagType[]) => void;
}

const TagPopup: React.FC<Props> = (props) => {
  /**
   * Have a tab to request tags
   * add new tags
   * Select existing tags
   */
  // const workspaceApi = useWorkspaceApi();

  const tagTabs = [
    { tabKey: 'select', tabValue: 'Select' },
    { tabKey: 'create', tabValue: 'Create' },
  ];

  const [selectedTab, setSelectedTab] = React.useState<string>(
    tagTabs[0].tabKey
  );
  const [searchedTags, setSearchedTags] = React.useState<TagType[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<TagType[]>([]);
  const [availableTags, setAvailableTags] = React.useState<TagType[]>([]);

  const [createTagMutation] = useCreateTagMutation();

  const [searchTagsQuery, { data: dataSearchTags }] = useSearchTagsLazyQuery();

  const [fetchSubspaceTagsQuery, { data: dataSubspaceTags }] =
    useFetchSubspaceTagsLazyQuery();
  const [showTags, setShowTags] = React.useState(false);

  React.useEffect(() => {
    if (dataSearchTags) {
      if (dataSearchTags.searchTags) {
        setSearchedTags(dataSearchTags.searchTags);
        setShowTags(true);
      }
    }
  }, [dataSearchTags]);

  React.useEffect(() => {
    if (dataSubspaceTags && dataSubspaceTags.fetchSubspaceTags) {
      setAvailableTags(dataSubspaceTags.fetchSubspaceTags);
    }
  }, [dataSubspaceTags]);

  React.useEffect(() => {
    (async () => {
      await fetchSubspaceTagsQuery({
        variables: {
          workspaceId:
            props.workspaceId || 'e139398b-9b19-46fe-a11a-5408b21b2aa0',
          subspaceId:
            props.subspaceId || '33a8789a-cdea-4e88-91d6-c4e5f10e9e38',
        },
      });
    })();
  }, []);

  const searchTagsQueryCallback = React.useCallback(
    async (val: string, onEnter = false) => {
      /*
         TODO: Write in a functionality that onEnter
         the debounce function should search for a tag
         that already exists based on the EXACT value
         If it does exist, then pass in the value from here.
       */
      if (val === '') {
        setSearchedTags([]);
      } else {
        if (onEnter) {
          // This should also be in the top section
          // await searchExactTagQuery({
          //   variables: { queryString: val },
          // });
        } else {
          await searchTagsQuery({
            variables: { queryString: val },
          });
        }
      }
    },
    [searchTagsQuery]
  );

  const createTagsMutationCallback = React.useCallback(
    async (val: string) => {
      if (val) {
        await createTagMutation({
          variables: {
            input: {
              value: val,
              workspaceId:
                props.workspaceId || 'e139398b-9b19-46fe-a11a-5408b21b2aa0',
              subspaceId:
                props.subspaceId || '33a8789a-cdea-4e88-91d6-c4e5f10e9e38',
              colorString: 'bg-blue-700',
              description: '',
              status: TagStatus.Requested,
            },
          },
        });
      }
    },
    [props.workspaceId, props.subspaceId]
  );

  const removeItem = React.useCallback((item: TagType, itemList: TagType[]) => {
    const itemIndex = itemList.findIndex((it) => it.id === item.id);
    const itemListCopy = [...itemList];
    itemListCopy.splice(itemIndex, 1);
    return itemListCopy;
  }, []);

  const onSelectTag = React.useCallback(
    (selectedTag?: TagType) => {
      if (selectedTag) {
        const selectedTagIndex = availableTags.findIndex(
          (aTag) => aTag.id === selectedTag.id
        );
        setSelectedTags([...selectedTags, selectedTag]);
        const availableTagsCopy = [...availableTags];
        availableTagsCopy.splice(selectedTagIndex, 1);
        setAvailableTags(availableTagsCopy);
      }
    },
    [availableTags, selectedTags]
  );

  const tagValidationSchema = yup.object().shape({
    tagName: yup
      .string()
      .min(2, 'Too short')
      .max(50, 'Too Long!')
      .required('Required!'),
  });

  return (
    <div className="z-10 w-1/3 h-80 flex flex-col rounded-lg dark:bg-night-light">
      <div className="p-2">
        <h2 className="text-gray-700 ml-4 text-2xl font-normal dark:text-white">
          {'Manage Tags'}
        </h2>
      </div>
      <UnderlineTabs
        tabs={tagTabs}
        active={selectedTab}
        onSelectTab={(selectedTab) => {
          setSelectedTab(selectedTab);
        }}
        fullwidth={true}
      />
      <div className="p-2 flex-1 overflow-auto">
        {selectedTab === 'select' && (
          <div className="overflow-auto space-y-2">
            <div>
              <InputSearch
                validationSchema={tagValidationSchema}
                searchQueryCallback={searchTagsQueryCallback}
                onBlurCallback={() => {
                  setShowTags(false);
                }}
                onFocusCallback={() => {
                  setShowTags(true);
                }}
                labelName={'tagName'}
                labelTitle={'Search For Tags'}
                inputPlaceholder={'Search Tags'}
                leftNode={
                  <IconTags
                    size={24}
                    className={'text-gray-500 px-1 dark:text-white'}
                  />
                }
              />
              <div className="relative w-full">
                {showTags && !isEmpty(searchedTags) && (
                  <TagItemList
                    leftIcon={<IconTag size={16} />}
                    itemList={searchedTags}
                    rightIcon={<IconPlus size={16} />}
                    onSelectTag={onSelectTag}
                  />
                )}
              </div>
            </div>
            {!isEmpty(selectedTags) && (
              <div>
                <h4 className="text-gray-700 font-medium dark:text-white">
                  {'Selected Tags'}
                </h4>
                <div className="flex flex-wrap space-x-1 [&>*]:mb-1">
                  {selectedTags.map((sTag) => {
                    return (
                      <TagItem
                        border
                        key={`selected_${sTag.id}`}
                        item={sTag}
                        generalColor={'pink'}
                        textColor={'gray'}
                        fill={true}
                        rightIcon={
                          <button
                            onClick={() => {
                              const itemRemovedList = removeItem(
                                sTag,
                                selectedTags
                              );
                              setSelectedTags(itemRemovedList);
                              setAvailableTags([...availableTags, sTag]);
                            }}
                          >
                            <IconX size={16} />
                          </button>
                        }
                      />
                    );
                  })}
                </div>
              </div>
            )}
            <div>
              <h4 className="text-gray-700 font-medium dark:text-white">
                {'Available Tags'}
              </h4>
              <div className="flex flex-wrap space-x-1 [&>*]:mb-1">
                {availableTags.map((aTag) => {
                  return (
                    <TagItem
                      border={true}
                      key={`available_${aTag.id}`}
                      generalColor={'red'}
                      onSelect={onSelectTag}
                      item={aTag}
                      rightIcon={
                        <button onClick={() => {}}>
                          <IconPlus size={16} />
                        </button>
                      }
                    />
                  );
                })}
              </div>
            </div>
            <div>
              <button
                disabled={isEmpty(selectedTags)}
                className="bg-primary-medium hover:bg-primary-dark dark:text-darkpen-medium rounded px-2 py-1"
                onClick={() => {
                  props.onSubmitTags(selectedTags);
                }}
              >
                {'Submit Tags'}
              </button>
            </div>
          </div>
        )}
        {selectedTab === 'create' && (
          <>
            <InputSearch
              validationSchema={tagValidationSchema}
              submissionCallback={createTagsMutationCallback}
              labelName={'tagName'}
              labelTitle={'Create Tags'}
              inputPlaceholder={'Insert New Tag'}
              rightNode={
                <button>
                  <IconPlus
                    size={24}
                    className={
                      'text-gray-500 hover:text-blue-500 transform transition-colors duration-500'
                    }
                  />
                </button>
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TagPopup;
