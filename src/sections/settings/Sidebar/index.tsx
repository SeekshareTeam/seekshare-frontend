import * as React from 'react';
import { SidebarTab } from 'src/utils/types';

interface Props {
  tabs: SidebarTab[];
  selected: SidebarTab;
  onSelect: (val: SidebarTab) => void;
}

const SettingSidebar: React.FC<Props> = (props) => {
  const settingTab = (val: SidebarTab, selected: SidebarTab) => {
    return (
      <li key={val.tabKey}>
        <a
          className={`flex flex-row hover:bg-night-light rounded ${
            selected.tabKey === val.tabKey
              ? 'border-l-2 border-blue-700 dark:text-darkpen-medium dark:bg-night-medium'
              : 'hover:border-l-2 border-lightpen-dark dark:text-darkpen-dark dark:bg-night-dark '
          } text-sm box-border px-2 py-1 cursor-pointer`}
          onClick={() => {
            props.onSelect(val);
          }}
        >
          <span className="mr-1">{val.icon}</span>
          <span>{val.tabValue}</span>
        </a>
      </li>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <ul className="px-1 flex flex-col items-stretch">
        {props.tabs.map((t) => {
          return settingTab(t, props.selected);
        })}
      </ul>
    </div>
  );
};

export default SettingSidebar;
