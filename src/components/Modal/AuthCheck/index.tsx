import * as React from 'react';

import { useAppSelector } from 'src/modules/Redux';
import { shallowEqual } from 'react-redux';
import { Modal } from 'src/components/Modal';
import { ModalCard } from 'src/components/Modal/ModalCard';

export const AuthCheck = (props) => {
  // const [showModal, setShowModal] = React.useState(false);

  // There could be a redux state such as show auth modal
  // if that is triggered, then it should show the auth model

  const [show, setShow] = React.useState(false);

  // React.useEffect(() => {
  //   setShow(props.show);
  //   console.log('@ show in useeffect', show);
  // }, [props.show])

  const onHideModal = () => {
    setShow(false);
  };

  const reduxState = useAppSelector(
    (state) => ({
      auth: state?.auth?.data,
    }),
    shallowEqual
  );

  let divProps: {
    onClickCapture?: (event: React.MouseEvent<HTMLDivElement>) => void;
  } = {};

  if (!reduxState.auth) {
    divProps.onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
      console.log('@ event', event.target, event.currentTarget);

      // event.preventDefault();
      event.stopPropagation();
      setShow(true);
    };
  }

  console.log('@ show', show);

  // console.log('@ reduxState', reduxState?.auth)
  return (
    <>
      {show && (
        <Modal show={show} onPressBlur={onHideModal}>
          <ModalCard
            onPrimaryPress={() => {}}
            onCancel={onHideModal}
            primaryText={'Login'}
            modalBody={props.message}
            modalTitle={'Login To Seekshare!'}
          />
        </Modal>
      )}
      <div {...divProps} className={props.className}>
        {props.children}
      </div>
    </>
  );
};
