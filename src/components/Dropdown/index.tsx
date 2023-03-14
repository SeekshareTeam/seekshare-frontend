import * as React from 'react';

export interface DropdownOption {
  text: string;
  type?: string;
  id: string;
  href?: string;
  callback?: () => void;
}

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
  optionList?: DropdownOption[];
  /**
   *
   */
  onOptionClick?: (option: DropdownOption) => void;
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
  /**
   *
   */
  onSelect?: (_: string) => void;
};

// TODO: make the a generic component that accepts id types
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
                key={option?.id}
                className={`text-lightpen-medium dark:text-darkpen-medium ${bgAnchorClass} block px-4 py-2 text-sm cursor-pointer`}
                id={option?.id + '-' + ix}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                role="menuitem"
                tabIndex={-1}
                // optionList ids shouldn't be optional
                onClick={() => {
                  if (option?.callback) {
                    option.callback();
                  } else {
                    if (props?.onOptionClick) {
                      props.onOptionClick(option);
                    } else {
                      props.onSelect?.(option?.id ?? '');
                    }
                  }
                  setShow(false);
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


type DropdownComponentProps = {
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
  dropdownButton: (option: DropdownOption | null, dropdownRef: React.RefObject<HTMLButtonElement>) => React.ReactNode;
  /**
   * Dropdown Button Options
   */
  optionList?: DropdownOption[];
  /**
   *
   */
  onOptionClick?: (option: DropdownOption) => void;
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
  /**
   *
   */
  onSelect?: (_: string) => void;
};


export const ReusableDropdown: React.FC<DropdownComponentProps> = (props) => {
  const [selectedOption, setSelectedOption] = React.useState<DropdownOption | null>(null);

  const dropdownRef = React.useRef<HTMLButtonElement>(null);

  /**
   * Creates a dictionary of all the options by their types
   */
  React.useEffect(() => {
    if (props.optionList && props.optionList.length >= 1) {
      setSelectedOption(props.optionList[0])
    }
  }, [props.optionList]);

  return (
    <Dropdown
      dropdownRef={dropdownRef}
      dropdownButton={props.dropdownButton(selectedOption, dropdownRef)}
      bgColor={props.bgColor}
      onSelect={props.onSelect}
      onOptionClick={props.onOptionClick}
      optionList={props.optionList}
      position={props.position}
      horizontalPosition={props.horizontalPosition}
    />
  )
}

export default Dropdown;
