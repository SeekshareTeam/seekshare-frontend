import * as React from 'react';

import { SectionElement } from 'src/sections/sidebar';
import { SidebarTab } from 'src/components/Sidebar/SidebarTab';

interface SidebarSectionProps {
  labelIndex: number;

  sectionElement: SectionElement;
}

export const SidebarSection: React.FC<SidebarSectionProps> = (props) => {
  const { labelIndex, sectionElement } = props;
  return (
    <ul key={labelIndex}>
      <li className="flex items-center pt-5 pb-2">
        <span>{sectionElement.icon}</span>
        <h4
          key={labelIndex}
          className="px-2 font-semibold text-nord-0 dark:text-nord-6"
        >
          {sectionElement.label}
        </h4>
      </li>
      {sectionElement?.items.map((it) => (
        <SidebarTab key={it.label} {...it} />
      ))}
    </ul>
  );
};

export default SidebarSection;
