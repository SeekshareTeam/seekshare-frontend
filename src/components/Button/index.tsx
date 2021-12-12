import * as React from 'react';
import Link from 'next/Link';

const classes = {
  wrapper: 'flex flex-row mr-3 text-gray-500',
};

type TextLinkProps = {
  size?: string;
  normalText?: string;
  linkText?: string;
  href?: string;
};

export function getSize(size = null) {
  switch (size) {
    case 'large':
      return 'text-lg';
    case 'small':
      return 'text-sm';
    default:
      return 'text-xs';
  }
};

export const TextLink: JSX.Element = (props: TextLinkProps) => {
  const baseClass = classes.wrapper;
  const sizeClass = getSize(props.size);
  const styleClass = `${baseClass} ${sizeClass}`;

  return (
    <div className={styleClass} >
      <p className="pr-1">{props.normalText}</p>
      <Link href={props.href}>
        <a>{props.linkText}</a>
      </Link>
    </div>
  );
};
