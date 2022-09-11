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
      <div className="flex items-center pt-5 pb-2">
        <span>{sectionElement.icon}</span>
        <h4
          key={labelIndex}
          className="px-2 font-semibold text-lightpen-medium dark:text-darkpen-medium"
        >
          {sectionElement.label}
        </h4>
      </div>
      {sectionElement?.items.map((it) => (
        <SidebarTab key={it.label} {...it} />
      ))}
    </ul>
  );
};

export default SidebarSection;
