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

export interface UnderlineTabProps extends BaseTabProps {
  leftNode?: React.ReactNode;
  fullwidth?: boolean;
  rightNode?: React.ReactNode;
}

export const UnderlineTabs: React.FC<UnderlineTabProps> = (props) => {

  return (
    <div className="border-b border-lightpen-medium dark:border-night-extralight dark:bg-night-light/60 flex items-center relative">
      {props.leftNode}
      <ul className="flex w-64 sm:w-full md:flex-auto -mb-px text-sm lg:text-md font-medium text-center text-lightpen-dark dark:text-darkpen-dark justify-center whitespace-nowrap overflow-x-auto">
        {props.tabs.map((t) => (
          <li key={`underline_${t.tabKey}`} className={`${props.fullwidth ? 'flex-1 min-w-max' : 'mr-2 flex-shrink-0'}`}>
            <a
              role="button"
              className={`inline-block p-4 text-lightpen-dark border-b-2 ${
                props.active === t.tabKey
                  ? 'border-pink-600 text-lightpen-dark dark:border-darkpen-medium dark:text-darkpen-light'
                  : 'border-transparent hover:text-gray-600 dark:text-darkpen-dark dark:hover:text-darkpen-light'
              } ${props.fullwidth ? 'w-full': ''}`}
              onClick={() => {
                props.onSelectTab(t.tabKey);
              }}
            >
              {t.tabValue}
            </a>
          </li>
        ))}
      </ul>
      {props.rightNode}
    </div>
  );
};
