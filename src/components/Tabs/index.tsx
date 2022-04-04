import * as React from 'react';

export type TabType = {
  tabKey: string;
  tabValue: string;
};

export interface BaseTabProps {
  tabs: TabType[];
  active: string;
  onSelectTab: (val: string) => void;
}

export const BaseTab: React.FC<BaseTabProps> = (props: BaseTabProps) => {
  const active = 'bg-red-400 text-gray-100';
  const nonactive = 'text-gray-700';
  const all = 'px-2 py-0.5 rounded-lg text-sm';

  return (
    <ul className="rounded-tl-md rounded-tr-md py-2 px-2 inline-block border-l-2 border-t-2 border-r-2 border-red-800">
      {props.tabs.map((t) => {
        return (
          <li key={t.tabKey} className="inline-block">
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

export interface UnderlineTabProps extends BaseTabProps {}

export const UnderlineTabs: React.FC<UnderlineTabProps> = (props) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 flex flex-1 items-center relative">
      <ul className="flex w-64 sm:w-full md:flex-auto -mb-px text-sm lg:text-md font-medium text-center text-gray-400 justify-center whitespace-nowrap overflow-x-auto">
        <li className="mr-2 flex-shrink-0">
          {props.tabs.map((t) => (
            <a
              className={`inline-block p-4 text-gray-400 border-b-2 ${props.active === t.tabKey ? 'border-pink-600 text-pink-600' : 'border-transparent hover:text-gray-600'} `}
              href="#"
              onClick={() => {
                props.onSelectTab(t.tabKey)
              }}
            >
              {t.tabValue}
            </a>
          ))}
        </li>
      </ul>
    </div>
  );
};
