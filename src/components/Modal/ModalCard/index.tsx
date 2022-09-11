import * as React from 'react';
import { IconX } from '@tabler/icons';

type ModalCardProps = {
  modalTitle: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  onCancel?: () => void;
  primaryText?: string;
  secondaryText?: string;
  modalBody?: string;
};

export const ModalCard = (props: ModalCardProps) => {
  return (
    <div className="z-10 bg-white dark:bg-night-light rounded shadow-lg w-10/12 md:w-1/4">
      <div className="border-b px-4 py-2 flex justify-between items-center">
        <h3 className="font-semibold text-lg dark:text-darkpen-medium">
          {props.modalTitle}
        </h3>
        <button
          className="text-lightpen-dark dark:text-darkpen-light"
          onClick={props.onCancel}
        >
          <IconX />
        </button>
      </div>
      <div className="p-3 dark:text-darkpen-medium">{props.modalBody}</div>
      <div className="flex justify-center items-center w-100 border-t p-3">
        {props.secondaryText && (
          <button
            onClick={props.onSecondaryPress}
            className="bg-red-200 mx-2 hover:bg-red-400 px-3 py-1 rounded text-white mr-1 close-modal"
          >
            {props.secondaryText}
          </button>
        )}
        <button
          onClick={props.onPrimaryPress}
          className="bg-secondary-medium mx-2 hover:bg-secondary-dark px-3 py-1 rounded text-white"
        >
          {props.primaryText}
        </button>
      </div>
    </div>
  );
};
