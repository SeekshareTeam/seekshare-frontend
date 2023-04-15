import * as React from 'react';
import { SidebarTab } from 'src/utils/types';

interface SettingTabProps {
  tab: SidebarTab;
  selected: SidebarTab;
  onSelect: (val: SidebarTab) => void;
}

const SettingTab: React.FC<SettingTabProps> = (props) => {
  return (
    <li key={props.tab.tabKey}>
      <a
        className={`flex flex-row hover:bg-night-light rounded ${
          props.selected.tabKey === props.tab.tabKey
            ? 'border-l-2 border-blue-700 dark:text-darkpen-medium dark:bg-night-medium'
            : 'hover:border-l-2 border-lightpen-dark dark:text-darkpen-dark dark:bg-night-dark '
        } text-sm box-border px-2 py-1 cursor-pointer`}
        onClick={() => {
          props.onSelect(props.tab);
        }}
      >
        <span className="mr-1">{props.tab.icon}</span>
        <span>{props.tab.tabValue}</span>
      </a>
    </li>
  );
};

interface Props {
  tabs: SidebarTab[];
  selected: SidebarTab;
  onSelect: (val: SidebarTab) => void;
}

const SettingSidebar: React.FC<Props> = (props) => {

  return (
    <div className="flex flex-col h-full">
      <ul className="px-1 flex flex-col items-stretch">
        {props.tabs.map((t) => {
          return (
            <SettingTab
              tab={t}
              selected={props.selected}
              onSelect={props.onSelect}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default SettingSidebar;
