import * as React from 'react';

const Dropdown: React.FC = (props) => {
  const [show, setShow] = React.useState(false);

  const toggleMenu = () => {
    setShow(!show);
  };

  React.useEffect(() => {
    props.dropdownRef.current.onclick = () => {
      console.log('@ ahooow', show);
      setShow(!show);
    };
  }, [props.dropdownRef, show]);

  return (
    <div className="relative inline-block m-auto">
      {props.dropdownButton}

      {show && (
        <div
          className="origin-bottom-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              Account settings
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
            >
              Support
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-2"
            >
              License
            </a>
            <form method="POST" action="#" role="none">
              <button
                type="submit"
                className="text-gray-700 block w-full text-left px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-3"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
