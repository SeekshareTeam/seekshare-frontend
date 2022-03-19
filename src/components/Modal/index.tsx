import * as React from 'react';

type ModalProps = {
  onPressBlur: () => void;
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
    }
  }, [open]);
};


export const Modal: React.FC<ModalProps> = (props) => {

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
          className="h-screen w-full z-20 fixed left-0 top-0 flex flex-wrap justify-center items-center bg-black bg-opacity-50"
        >
          {props.children}
        </div>
      )}
    </>
  );
};
