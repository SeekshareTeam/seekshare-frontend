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
  buttonType?: 'primary' | 'secondary' | 'ghost';
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
  'flex space-x-2 flex-none items-center justify-center cursor-pointer leading-none transition-all font-semibold';

function getSize(size: string | undefined) {
  switch (size) {
    case 'xlarge': {
      return 'px-4 py-4 text-sm';
    }
    case 'large': {
      return 'px-4 py-2 text-sm';
    }
    case 'small': {
      return 'px-2.5 py-1.5 text-sm';
    }
    case 'xs': {
      return 'px-2 py-0.5 text-sm'
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

function buttonTypes(
  textColor: string,
  fillColor: string,
  type: string = 'primary',
  selected: boolean = false
) {
  switch (type) {
    case 'primary':
      return `self-center text-${textColor}-200 shadow-sm bg-${fillColor}-700 hover:bg-${fillColor}-800 border-opacity-100 border border-gray-200`;
    case 'secondary':
      return '';
    case 'ghost':
      return `self-center ${
        !selected
          ? `text-${
              textColor ? textColor : 'green'
            }-700 hover:bg-${fillColor}-700`
          : `text-gray-100 bg-${fillColor}-700`
      } hover:text-gray-100 shadow-sm bg-white border-opacity-100 border border-${fillColor}-500`;
    default:
      '';
  }
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      textColor = 'gray',
      fillColor = 'pink',
      iconRight = null,
      iconLeft = null,
      buttonType = 'primary',
      ...props
    }: ButtonProps,
    ref
  ) => {

    const classes = buttonTypes(textColor, fillColor, buttonType, props.selected);
    const size = composer.getSize(props.size);
    const opacity = composer.getOpacity(props.disabled);
    const radius = composer.getRadius(props.radius);
    const composed = `${baseClasses} ${size} ${radius} ${opacity} ${classes}`;
    return (
      <BaseButton
        forwardedRef={ref}
        className={composed}
        {...props}
      />
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

export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ textColor = 'gray', fillColor = 'pink', ...props }: ButtonProps, ref) => {
    const classes = `self-center text-${textColor}-200 shadow-sm bg-${fillColor}-700 hover:bg-${fillColor}-800 border-opacity-100 border border-gray-200`;
    const size = composer.getSize(props.size);
    const background = '';
    const opacity = composer.getOpacity(props.disabled);
    const radius = composer.getRadius(props.radius);
    const composed = `${baseClasses} ${background} ${size} ${opacity} ${radius} ${classes}`;
    // return <button className={composed} ref={ref} {...props} />;
    return <BaseButton forwardedRef={ref} className={composed} {...props} />;
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
