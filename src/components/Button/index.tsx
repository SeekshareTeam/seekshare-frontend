import * as React from 'react';
import Link from 'next/link';
import Spinner from 'src/components/Spinner';

const classes = {
  wrapper: 'flex flex-row mr-3 text-lightpen-medium dark:text-darkpen-medium',
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
        <a className={'text-link-medium hover:text-link-dark'}>
          {props.linkText}
        </a>
      </Link>
    </div>
  );
};

interface BaseButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  [key: string]: unknown;
  size: string;
  radius: string;
  selected?: boolean;
  disabled?: boolean;
  textColor?: string;
  fillColor?: string;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

// type ButtonAsButton = BaseButtonProps &
//   React.ButtonHTMLAttributes<HTMLButtonElement>;

// type ButtonAsLink = BaseButtonProps &
//   React.AnchorHTMLAttributes<HTMLAnchorElement>;

// type ButtonProps = ButtonAsButton | ButtonAsLink;

type ButtonProps = BaseButtonProps;

interface ButtonPropsWithRef extends ButtonProps {
  forwardedRef: React.ForwardedRef<HTMLButtonElement>;
}

function BaseButton({ forwardedRef, ...rest }: ButtonPropsWithRef) {
  return <button ref={forwardedRef} {...rest} />;
}

const baseClasses =
  'flex space-x-1 flex-none items-center justify-center cursor-pointer leading-none transition-all';

function getSize(size: string | undefined) {
  switch (size) {
    case 'xlarge': {
      return 'px-4 py-4 text-sm';
    }
    case 'large': {
      return 'px-4 py-2 text-sm';
    }
    case 'large-full': {
      return 'px-4 py-2 text-sm w-full';
    }
    case 'small': {
      return 'px-2.5 py-1.5 text-sm';
    }
    case 'xs': {
      return 'px-2 py-0.5 text-sm';
    }
    case 'small-square': {
      return 'p-2 text-sm';
    }
    default: {
      return 'px-2 py-0.5 text-sm';
      // return 'px-4 py-2 text-sm w-full';
    }
  }
}

function getOpacity(disabled = false) {
  return disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100';
}

function getRadius(size: string | undefined) {
  switch (size) {
    case 'full':
      return 'rounded-full';
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

function buttonVariantSwitch(
  textColor: string,
  fillColor: string,
  type: string = 'primary',
  disabled: boolean = false,
  selected: boolean = false
) {
  switch (type) {
    case 'primary':
      return `text-${textColor}-200 dark:text-darkpen-medium shadow-sm bg-${fillColor}-700 dark:bg-primary-medium ${
        disabled
          ? ''
          : 'hover:bg-' + fillColor + '-800 dark:hover:bg-primary-dark'
      } border-lightpen-medium dark:border-primary-medium`;
    case 'secondary':
      return `text-${textColor}-200 dark:text-darkpen-medium shadow-sm bg-${fillColor}-700 dark:bg-secondary-medium ${
        disabled
          ? ''
          : 'hover:bg-' + fillColor + '-800 dark:hover:bg-secondary-dark'
      } border-opacity-100 border border-lightpen-medium dark:border-secondary-medium`;
    case 'outline':
      return `${
        !selected
          ? `text-${
              textColor ? textColor : 'green'
            }-700 dark:bg-night-medium hover:bg-${fillColor}-700`
          : `bg-${fillColor}-700`
      } text-lightpen-medium dark:text-darkpen-medium dark:hover:text-darkpen-medium hover:text-lightpen-light shadow-sm bg-white border-opacity-100 border border-${fillColor}-500`;
    case 'dark':
      return `text-lightpen-medium dark:text-darkpen-medium dark:bg-night-light ${
        disabled
          ? ''
          : 'hover:bg-' + fillColor + '-800 dark:hover:bg-night-medium'
      } border-lightpen-medium shadow-sm`;
    default:
      return 'transition-all duration-200 text-lightpen-medium dark:text-darkpen-medium hover:text-lightpen-dark hover:dark:text-darkpen-dark';
  }
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      textColor = 'gray',
      fillColor = 'pink',
      iconRight = null,
      iconLeft = null,
      variant = 'primary',
      loading = false,
      className = '',
      ...props
    }: ButtonProps,
    ref
  ) => {
    const classes = buttonVariantSwitch(
      textColor,
      fillColor,
      variant,
      props.disabled,
      props.selected
    );

    const size = composer.getSize(props.size);
    const opacity = composer.getOpacity(props.disabled);
    const radius = composer.getRadius(props.radius);
    const composed = `${baseClasses} ${size} ${radius} ${opacity} ${classes} ${className}`;

    if (loading) {
      return <Spinner />;
    }

    return (
      <BaseButton forwardedRef={ref} className={composed} {...props}>
        {iconLeft}
        {children}
        {iconRight}
      </BaseButton>
    );
  }
);

export const DropdownButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      textColor = 'gray',
      fillColor = 'pink',
      iconRight = null,
      iconLeft = null,
      ...props
    }: ButtonProps,
    ref
  ) => {
    const classes = `self-center text-${textColor}-200 shadow-sm bg-${fillColor}-700 hover:bg-${fillColor}-800 border-opacity-100 border border-gray-200`;
    const size = composer.getSize(props.size);
    const radius = composer.getRadius(props.radius);
    const composed = `${baseClasses} ${size} ${radius} ${classes}`;

    return (
      <BaseButton
        forwardedRef={ref}
        className={`flex items-center flex-row w-full ${composed}`}
        {...props}
      />
    );
  }
);

export const GhostButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { textColor = 'green', fillColor = 'green', ...props }: ButtonProps,
    ref
  ) => {
    const classes = `self-center ${
      !props.selected
        ? `text-${textColor ? textColor : 'green'}-500`
        : `text-gray-100`
    } hover:text-gray-100 shadow-sm bg-white border-opacity-100 border border-${fillColor}-500`;
    const filled = `bg-${fillColor}-500`;
    const background = props.selected ? `${filled}` : `hover:${filled}`;
    const size = composer.getSize(props.size);
    const opacity = composer.getOpacity(props.disabled);
    const radius = composer.getRadius(props.radius);
    const composed = `${baseClasses} ${background} ${size} ${opacity} ${radius} ${classes}`;
    return <BaseButton forwardedRef={ref} className={composed} {...props} />;
  }
);
