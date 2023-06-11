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
    <div className="z-10 bg-nord-4 dark:bg-nord-1 rounded shadow-lg w-10/12 md:w-1/4">
      <div className="border-b px-4 py-2 flex justify-between items-center">
        <h3 className="font-semibold text-lg text-nord-0 dark:text-nord-6">
          {props.modalTitle}
        </h3>
        <button
          className="text-nord-0 dark:text-nord-6"
          onClick={props.onCancel}
        >
          <IconX />
        </button>
      </div>
      <div className="p-3 text-nord-0 dark:text-nord-6">{props.modalBody}</div>
      <div className="flex justify-center items-center w-100 border-t p-3">
        {props.secondaryText && (
          <button
            onClick={props.onSecondaryPress}
            className="bg-red-200 mx-2 hover:bg-red-400 px-3 py-1 rounded text-nord-0 mr-1 close-modal"
          >
            {props.secondaryText}
          </button>
        )}
        <button
          onClick={props.onPrimaryPress}
          className="bg-nord-7 mx-2 hover:bg-nord-7 px-3 py-1 rounded text-nord-0"
        >
          {props.primaryText}
        </button>
      </div>
    </div>
  );
};
