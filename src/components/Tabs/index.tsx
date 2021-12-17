import * as React from 'react';

export type TabType = {
  tabKey: string;
  tabValue: string;
};

export type BaseTabProps = {
  tabs: TabType[];
  active: string;
  onSelectTab: (val: string) => void;
};

export const BaseTab: React.FC<BaseTabProps> = (props: BaseTabProps) => {
  const active = 'bg-red-400 text-gray-100';
  const nonactive = 'text-gray-700';
  const all = 'px-2 py-0.5 rounded-lg text-sm';

  return (
    <ul className="rounded-tl-md rounded-tr-md py-2 px-2 inline-block border-l-2 border-t-2 border-r-2 border-red-800">
      {props.tabs.map((t) => {
        return (
          <li className="inline-block">
            <button
              onClick={() => {
                props.onSelectTab(t.tabKey);
              }}
              className={`${
                props.active === t.tabKey ? active : nonactive
              } ${all}`}
            >
              {t.tabValue}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export const Tab: React.FC = () => {
  return <></>;
};
