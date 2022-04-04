import * as React from 'react';

type ModalProps = {
  onPressBlur: () => void;
  blurBackground: Boolean;
  show: boolean;
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

export const Modal: React.FC<ModalProps> = ({
  blurBackground = false,
  ...props
}) => {
  useDisableBodyScroll(props.show);

  return (
    <>
      {props.show && (
        <div
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            if (event.target === event.currentTarget) {
              props.onPressBlur();
            }
          }}
          className={`h-screen w-full z-50 fixed left-0 top-0 flex justify-center items-center bg-black ${
            blurBackground ? 'backdrop-filter backdrop-blur-md' : ''
          } bg-opacity-50`}
        >
          {props.children}
        </div>
      )}
    </>
  );
};
