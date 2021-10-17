import React from 'react';

import Name from './Name';
import ParentElement from './ParentElement';

const classes = {
  navBar:
    'flex flex-shrink-0 flex-col w-64 h-screen px-2 py-4 space-y-2 bg-indigo-900 overflow-y-hidden hover:overflow-y-auto text-gray-900 border',
  wrapper: 'mt-10 mb-4 ml-4',
};

const Sidebar: React.FC = () => {
  const a = 'hello';
  return (
    <aside className={classes.navBar}>
      <Name />
      <div className={classes.wrapper}>
        <ParentElement key={"Parent1"} title="subjects" leftSvgRef="home" />
        <ParentElement key={"Parent2"} title="subjects" leftSvgRef="home" />
      </div>
      {/*<div className="mt-10 mb-4">
        <ul className="ml-4">
          <li>
            <ParentElement title="subjects" leftSvgRef="home" />
          </li>
          <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg">
            <span>
              <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                <path
                  d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
                      4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
                      4h4v-4h-4M4 8h4V4H4v4z"
                ></path>
              </svg>
            </span>
            <a href="#">
              <span className="ml-2">Dashboard</span>
            </a>
          </li>
        </ul>
      </div>*/}
    </aside>
  );
};

export default Sidebar;
