import * as React from 'react';

type DropdownProps = {
  /**
   * above or below the button
   */
  position: 'above' | 'below';
  /**
   * Dropdown Button
   */
  horizontalPosition: 'left' | 'right';
  /*
   * Dropdown Button
   */
  dropdownButton?: React.ReactNode;
  /**
   *
   */
  dropdownRef: React.RefObject<HTMLButtonElement>;
  /**
   * Dropdown Button Options
   */
  optionList?: { text?: string; type?: string; id?: string; href?: string; callback?: () => void; }[];
  /**
   *
   */
  onOptionClick?: (option: {
    text?: string;
    type?: string;
    id?: string;
    href?: string;
  }) => void;
  /**
   * Different dropdown rendering modes
   */
  abstractControl?: boolean;
  /**
   * External show variable;
   */
  abstractShow?: boolean;
  /**
   * Submit the css for background color
   * Submit a dark medium and light gradation
   */
  bgColor?: { dark: string; medium: string; light: string };
};

const Dropdown: React.FC<DropdownProps> = (props) => {
  const [show, setShow] = React.useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (props?.abstractControl) {
      setShow(props?.abstractShow || false);
    } else if (props?.dropdownRef?.current) {
      props.dropdownRef.current.onmousedown = (e) => {
        setShow(!show);
        e.preventDefault();
      };
    }
  }, [props?.abstractControl, props?.abstractShow, props?.dropdownRef, show]);

  React.useEffect(() => {
    if (!props?.abstractControl && divRef?.current) {
      if (show) {
        divRef.current.focus();
      } else {
        console.log('am i calling blur first');
        divRef.current.blur();
      }
    }
  }, [props?.abstractControl, show]);

  const bgAnchorClass = props.bgColor
    ? props.bgColor.light + ' hover:' + props.bgColor.dark
    : 'bg-secondary-medium hover:bg-secondary-dark';

  return (
    <div tabIndex={1} className="relative my-auto inline-block">
      {props.position === 'above' && props.dropdownButton}
      {show && (
        <div
          className={`absolute z-50 ${
            props.position === 'above' ? 'top-full' : 'bottom-full'
          } ${
            props?.horizontalPosition === 'right' ? 'right-0' : 'left-0'
          } w-56 rounded-md shadow-lg ${
            props.bgColor ? props.bgColor.light : 'bg-secondary-medium'
          } ring-1 ring-black ring-opacity-5 focus:outline-none my-2`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={1}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget) &&
              !(event.relatedTarget === props.dropdownRef.current)
            ) {
              setShow(false);
            }
          }}
          ref={divRef}
        >
          <div className="py-1" role="none">
            {props?.optionList?.map((option, ix) => (
              <a
                className={`text-lightpen-medium dark:text-darkpen-medium ${bgAnchorClass} block px-4 py-2 text-sm cursor-pointer`}
                role="menuitem"
                tabIndex={-1}
                id={option?.id + '-' + ix}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  if (option?.callback) {
                    option.callback();
                  } else {
                    if (props?.onOptionClick) {
                      props.onOptionClick(option);
                    }
                  }
                }}
              >
                {option.text}
              </a>
            ))}
          </div>
        </div>
      )}
      {props.position === 'below' && props.dropdownButton}
    </div>
  );
};

export default Dropdown;
