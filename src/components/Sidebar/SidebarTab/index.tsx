import * as React from 'react';
import Link from 'next/link';

interface SidebarTabProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

export const SidebarTab: React.FC<SidebarTabProps> = ({
  isActive = false,
  ...props
}) => {
  return (
    <li className="flex items-stretch space-x-1">
      <Link href={props.href}>
        <a
          className={`flex flex-1 items-center space-x-1 text-opacity-70 rounded-md px-2 py-1.5 font-medium text-gray-300 ${
            isActive ? 'bg-pink-800' : 'hover:bg-pink-800'
          }`}
        >
          <span>{props.icon}</span>
          <span className="flex-1">{props.label}</span>
        </a>
      </Link>
    </li>
  );
};

