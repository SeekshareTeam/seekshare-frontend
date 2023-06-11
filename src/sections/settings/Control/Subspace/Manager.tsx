import * as React from 'react';

/* State Management */
import { Subspace as SubspaceType } from 'src/generated/types';

/* Components */
import SubspaceCard from 'src/components/Subspace/SubspaceCard';
import GeneralManager from './GeneralManager';
import TagManager from './TagManager';
import { UnderlineTabs } from 'src/components/Tabs';

interface LayoutProps {
  subspaceCard: React.ReactNode;

  tabbedMenu: React.ReactNode;

  manager: React.ReactNode;
}

const SubspaceManagerLayout: React.FC<LayoutProps> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Check what's going on here. Since this doesn't work
    if (divRef?.current) {
      divRef.current.style.height = divRef.current.offsetHeight - 80 + 'px';
    }
  }, [divRef]);

  return (
    <div
      id={'subspace-manager'}
      className="mx-32 h-4/5 w-full bg-nord-4 dark:bg-nord-1 box-border flex flex-wrap"
      ref={divRef}
    >
      <div className="flex flex-col flex-1">
        <div>{props.subspaceCard}</div>
        <div>{props.tabbedMenu}</div>
        <div className="flex-1">{props.manager}</div>
      </div>
    </div>
  );
};

const SubspaceManagerView: React.FC<{
  tabKey: string;
  subspace: SubspaceType;
}> = (props) => {
  switch (props.tabKey) {
    case 'tags':
      return (
        <TagManager
          tags={props.subspace.tags}
          subspaceId={props.subspace.id}
          workspaceId={props.subspace.workspaceId}
        />
      );
    case 'general':
      return (
        <GeneralManager
          subspaceId={props.subspace.id}
          workspaceId={props.subspace.workspaceId}
        />
      );
    default:
      return null;
  }
};

interface Props {
  subspace: SubspaceType;
}

const SubspaceManager: React.FC<Props> = (props) => {
  const [tabs] = React.useState([
    { tabValue: 'General', tabKey: 'general' },
    { tabValue: 'Tags', tabKey: 'tags' },
  ]);
  const [selectedTab, setSelectedTab] = React.useState('posts');

  const onTabClick = (tabKey: string) => {
    setSelectedTab(tabKey);
  };

  return (
    <SubspaceManagerLayout
      subspaceCard={
        <SubspaceCard
          subspace={props.subspace}
          className={'ml-4 my-4'}
          titleClassName="text-xl text-nord-0 dark:text-nord-6"
        />
      }
      tabbedMenu={
        <UnderlineTabs
          tabs={tabs}
          onSelectTab={onTabClick}
          active={selectedTab}
        />
      }
      manager={
        <SubspaceManagerView subspace={props.subspace} tabKey={selectedTab} />
      }
    />
  );
};

export default SubspaceManager;
