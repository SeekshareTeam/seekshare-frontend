import * as React from 'react';
import * as ReactDOM from 'react-dom';

type ModalProps = {
  onPressBlur: () => void;
  blurBackground: Boolean;
  show: boolean;
  children?: React.ReactNode;
};

export const useDisableBodyScroll = (open: boolean) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);
};

// const modalRoot = document.getElementById('modal-root');

/**
 * Refer to these two links to see if we should avoid using a useState to
 * hold onto the values of the documents:
 * https://www.learnbestcoding.com/post/101/how-to-create-a-portal-in-next-js
 * https://stackoverflow.com/questions/54660685/react-and-using-reactdom-createportal-target-container-is-not-a-dom-element
 */

export const Modal: React.FC<ModalProps> = ({
  blurBackground = false,
  ...props
}) => {
  useDisableBodyScroll(props.show);
  const [container, setContainer] = React.useState<Element | null>(null);
  const [root, setRoot] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setRoot(document.getElementById('modal-root'));
    setContainer(document.createElement('div'));
  }, []);

  React.useEffect(() => {
    if (root && container) {
      root.appendChild(container);

      return () => {
        root.removeChild(container);
      };
    }
  }, [root, container]);

  if (!container) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      {props.show && (
        <div
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            if (event.target === event.currentTarget) {
              props.onPressBlur();
            }
          }}
          className={`h-screen w-full z-50 fixed left-0 top-0 flex justify-center items-center bg-nord-4 dark:bg-nord-1 ${
            blurBackground ? 'backdrop-filter backdrop-blur-md' : ''
          } bg-opacity-50`}
        >
          {props.children}
        </div>
      )}
    </>,
    container
  );
};
