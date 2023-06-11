import * as React from 'react';
import { ApolloError } from '@apollo/client';

/* State Management */
import {
  useCreateTagMutation,
  CreateTagMutationFn,
} from 'src/generated/apollo';
import { Tag as TagType, Maybe } from 'src/generated/types';

/* Components */
import TagRequest from 'src/sections/settings/Control/Subspace/TagRequest';
import TagCreate from 'src/sections/settings/Control/Subspace/TagCreate';
import TagDashboard from 'src/sections/settings/Control/Subspace/TagDashboard';

interface TagViewProps {
  selectedTabKey: string;

  tags: TagType[];

  createTagMutation: CreateTagMutationFn;

  createTagLoading: boolean;

  subspaceId: string;

  workspaceId: string;

  createTagError?: ApolloError;
}

const TagManagerView: React.FC<TagViewProps> = (props) => {
  switch (props.selectedTabKey) {
    case 'dashboard':
      return (
        <TagDashboard
          tags={props.tags.filter(
            (tag) => tag.status === 'active' || tag.status === 'inactive'
          )}
        />
      );
    case 'create':
      return (
        <TagCreate
          createTagMutation={props.createTagMutation}
          createTagLoading={props.createTagLoading}
          createTagError={props.createTagError}
          subspaceId={props.subspaceId}
          workspaceId={props.workspaceId}
          status={'active'}
        />
      );
    case 'requests':
      return (
        <TagRequest
          tags={props.tags.filter((tag) => tag.status === 'requested')}
        />
      );
    default:
      return null;
  }
};

interface Props {
  tags?: Maybe<TagType[]>;
  workspaceId: string;
  subspaceId: string;
}

const TagManager: React.FC<Props> = (props) => {
  const [tabs] = React.useState([
    { value: 'Dashboard', key: 'dashboard' },
    { value: 'Create', key: 'create' },
    { value: 'Requests', key: 'requests' },
  ]);

  const [selectedTab, setSelectedTab] = React.useState<{
    value: string;
    key: string;
  }>({ value: 'Dashboard', key: 'dashboard' });

  const [
    createTagMutation,
    { loading: createTagLoading, error: createTagError },
  ] = useCreateTagMutation ({ onError: () => null });

  return (
    <div className="flex flex-row text-nord-0 dark:text-nord-6 h-full">
      <div className="flex flex-col items-center xs:w-full md:w-64 border-r border-nord-5 dark:border-nord-2">
        {tabs.map((tab) => {
          return (
            <button
              key={tab.key}
              className={`py-1 hover:text-nord-1 dark:hover:text-nord-5 w-full ${
                selectedTab.key === tab.key
                  ? 'bg-nord-4 dark:bg-nord-1 text-nord-0 dark:text-nord-6'
                  : 'text-nord-0 dark:text-nord-6'
              }`}
              onClick={() => {
                setSelectedTab(tab);
              }}
            >
              {tab.value}
            </button>
          );
        })}
      </div>
      <div className="flex-1">
        <TagManagerView
          selectedTabKey={selectedTab.key}
          tags={props?.tags || []}
          createTagMutation={createTagMutation}
          createTagLoading={createTagLoading}
          createTagError={createTagError}
          subspaceId={props.subspaceId}
          workspaceId={props.workspaceId}
        />
      </div>
    </div>
  );
};

export default TagManager;
