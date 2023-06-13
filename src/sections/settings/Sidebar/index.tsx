import * as React from 'react';
import type { SidebarTab } from 'src/utils/types';

interface SettingTabProps {
  tab: SidebarTab;
  selected: SidebarTab;
  onSelect: (val: SidebarTab) => void;
}

const SettingTab: React.FC<SettingTabProps> = (props) => {
  return (
    <li key={props.tab.tabKey}>
      <a
        className={`flex flex-row bg-nord-4 dark:bg-nord-1 hover:bg-nord-1 dark:hover:bg-nord-5 rounded ${
          props.selected.tabKey === props.tab.tabKey
            ? 'border-l-2 border-blue-700 text-nord-0 dark:text-nord-6 dark:bg-nord-1'
            : 'hover:border-l-2 border-nord-0 text-nord-0 bg-nord-4 dark:text-nord-dark dark:bg-nord-0 '
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
              key={t.tabKey}
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
