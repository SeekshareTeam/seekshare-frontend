import * as React from 'react';
import { UnderlineTabs, UnderlineTabProps } from 'src/components/Tabs';

const UserActivityTabs: React.FC<UnderlineTabProps> = (props) => {

  return (
    <div className="rounded-lg overflow-hidden border dark:border-night-light">
      <UnderlineTabs
        tabs={props.tabs}
        active={props.active}
        onSelectTab={props.onSelectTab}
      />
    </div>
  );
};

export default UserActivityTabs;
