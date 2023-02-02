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
  optionList?: { text?: string; id?: string; href?: string }[];
  /**
   *
   */
  onSelect?: (_: string) => void;
};

// TODO: make the a generic component that accepts id types
const Dropdown: React.FC<DropdownProps> = props => {
  const [show, setShow] = React.useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (props?.dropdownRef?.current) {
      props.dropdownRef.current.onclick = () => {
        setShow(!show);
      };

      // props.dropdownRef.current.onblur = () => {
      //   setShow(false);
      // };
    }
  }, [props?.dropdownRef, show]);

  React.useEffect(() => {
    if (divRef?.current) {
      if (show) {
        divRef.current.focus();
      } else {
        divRef.current.blur();
      }
    }
  }, [show]);

  return (
    <div tabIndex={1} className="relative inline-block">
      {props.position === 'above' && props.dropdownButton}
      {show && (
        <div
          className={`absolute z-50 ${
            props.position === 'above' ? 'top-full' : 'bottom-full'
          } ${
            props?.horizontalPosition === 'right' ? 'right-0' : 'left-0'
          } w-56 rounded-md shadow-lg bg-secondary-medium ring-1 ring-black ring-opacity-5 focus:outline-none my-2`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={1}
          onBlur={event => {
            if (
              !event.currentTarget.contains(event.relatedTarget) &&
              !(event.relatedTarget === props.dropdownRef.current)
            ) {
              setShow(false);
            }
          }}
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            console.log(event);
          }}
          ref={divRef}
        >
          <div className="py-1" role="none">
            {props?.optionList?.map((option, ix) => (
              <a
                key={option?.id}
                className="text-lightpen-medium dark:text-darkpen-medium dark:bg-secondary-medium block px-4 py-2 text-sm dark:hover:bg-secondary-dark"
                role="menuitem"
                tabIndex={-1}
                id={option?.id + '-' + ix}
                // optionList ids shouldn't be optional
                onClick={() => {
                  props.onSelect?.(option?.id ?? '');
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

export default Dropdown;
