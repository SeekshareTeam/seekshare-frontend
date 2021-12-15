import * as React from 'react';
import Link from 'next/Link';

const classes = {
  wrapper: 'flex flex-row mr-3 text-gray-500',
};

type TextLinkProps = {
  size?: string;
  normalText?: string;
  linkText?: string;
  href: string;
};

export function getTextSize(size: string | undefined) {
  switch (size) {
    case 'large':
      return 'text-lg';
    case 'small':
      return 'text-sm';
    default:
      return 'text-xs';
  }
}

export const TextLink: React.FC<TextLinkProps> = (props: TextLinkProps) => {
  const baseClass = classes.wrapper;
  const sizeClass = getTextSize(props.size);
  const styleClass = `${baseClass} ${sizeClass}`;

  return (
    <div className={styleClass}>
      <p className="pr-1">{props.normalText}</p>
      <Link href={props.href}>
        <a>{props.linkText}</a>
      </Link>
    </div>
  );
};

interface BaseButtonProps {
  [key: string]: unknown;
  size: string;
  radius: string;
  disabled?: boolean;
}

type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

// type ButtonAsLink = BaseButtonProps &
//   React.AnchorHTMLAttributes<HTMLAnchorElement>;

// type ButtonProps = ButtonAsButton | ButtonAsLink;

type ButtonProps = ButtonAsButton;

function BaseButton({ forwardedRef = null, ...rest }: ButtonProps) {
  // if (href && href.startsWith('/')) {
  //   return (
  //     <Link href={href}>
  //       <a {...rest} />
  //     </Link>
  //   );
  // }

  // if (href) {
  //   return <a ref={forwardedRef} href={href} {...rest} />;
  // }

  return <button ref={forwardedRef} {...rest} />;
}

const baseClasses =
  'flex space-x-2 flex-none items-center justify-center cursor-pointer leading-none transition-all font-semibold';

function getSize(size: string | undefined) {
  switch (size) {
    case 'large': {
      return 'px-4 py-1 text-sm';
    }
    case 'small': {
      return 'px-2.5 py-1.5 text-xs';
    }
    case 'small-square': {
      return 'p-2 text-sm';
    }
    default: {
      return 'px-4 py-2 text-sm';
    }
  }
}

function getOpacity(disabled = false) {
  return disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100';
}

function getRadius(size: string | undefined) {
  switch (size) {
    case 'large': {
      return 'rounded-lg';
    }
    case 'small': {
      return 'rounded';
    }
    default: {
      return 'rounded-md';
    }
  }
}

const composer = {
  getSize,
  getOpacity,
  getRadius,
};

// export const Button = React.forwardRef((props: ButtonProps, ref) => {
//   const classes = `text-gray-700 hover:text-gray-1000 shadow-xs bg-white border border-gray-400 border-opacity-25 dark:border-gray-700 dark:hover:border-gray-600 dark:bg-white dark:bg-opacity-10 dark:text-gray-200 dark:hover:text-white hover:border-opacity-50 hover:shadow-sm`;
//   const size = composer.getSize(props.size);
//   const opacity = composer.getOpacity(props.disabled);
//   const radius = composer.getRadius(props.size);
//   const composed = `${baseClasses} ${size} ${opacity} ${radius} ${classes}`;
//   return <BaseButton forwardedRef={ref} className={composed} {...props} />;
// });

export const GhostButton = React.forwardRef((props: ButtonProps, ref) => {
  const classes = `text-green-500 hover:text-gray-100 shadow-sm bg-white border-opacity-100 border border-green-500 hover:bg-green-500`;
  const size = composer.getSize(props.size);
  const opacity = composer.getOpacity(props.disabled);
  const radius = composer.getRadius(props.radius);
  const composed = `${baseClasses} ${size} ${opacity} ${radius} ${classes}`;
  return <BaseButton forwardedRef={ref} className={composed} {...props} />;
});
