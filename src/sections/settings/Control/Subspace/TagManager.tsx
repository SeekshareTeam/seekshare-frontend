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

const TagView: React.FC<TagViewProps> = (props) => {
  switch (props.selectedTabKey) {
    case 'dashboard':
      return <TagDashboard tags={props.tags} />;
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
      return <TagRequest />;
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
  ] = useCreateTagMutation();

  return (
    <div className="flex flex-row dark:text-darkpen-medium h-full">
      <div className="flex flex-col items-center xs:w-full md:w-64 border-r border-night-dark">
        {tabs.map((tab) => {
          return (
            <button
              key={tab.key}
              className={`py-1 hover:text-darkpen-medium w-full ${
                selectedTab.key === tab.key
                  ? 'bg-zinc-700 dark:text-darkpen-medium'
                  : 'dark:text-darkpen-dark'
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
        <TagView
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
