import * as React from 'react';
import { upperFirst } from 'lodash';
import { ApolloError } from '@apollo/client';

/* State Management */
import { CreateTagMutationFn } from 'src/generated/apollo';
import { TagStatus } from 'src/generated/types';

/* Components */
import IconPicker from 'src/components/IconPicker';
import IconCircle from 'src/components/IconPicker/Children/IconCircle';
import ErrorMessage from 'src/components/ErrorMessage';
import { Button } from 'src/components/Button';

/* Initialize Global Color Palette */
import palette from 'src/utils/palette';
const tagColorPalette: { [key: string]: string[] } = {};

tagColorPalette['Tag Colors'] = [];
palette.forEach((c1) => {
  tagColorPalette['Tag Colors'].push(`bg-${c1}-700`);
});

interface TagCreateProps {
  createTagMutation: CreateTagMutationFn;

  createTagLoading: boolean;

  createTagError?: ApolloError;

  status: string;

  subspaceId: string;

  workspaceId: string;
}

const TagCreate: React.FC<TagCreateProps> = (props) => {
  const [tagName, setTagName] = React.useState('');
  const [tagDescription, setTagDescription] = React.useState('');
  const [tagColor, setTagColor] = React.useState(
    palette[0] ? `bg-${palette[0]}-500` : 'bg-primary-medium'
  );
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  const addInput = (
    inputName: string,
    labelName: string,
    value: string,
    handleChange: (e: React.ChangeEvent<any>) => void,
    handleBlur: (e: any) => void
  ) => {
    return (
      <div className="inline-flex flex-col py-1 justify-between items-start">
        <label
          className="font-semibold text-sm capitalize text-gray-700 dark:text-darkpen-dark"
          htmlFor={inputName}
        >
          {labelName}
        </label>
        <input
          name={inputName}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          className="w-64 xs:flex-1 shadow-md bg-transparent border-b focus:border-blue-400 outline-none p-1 dark:text-darkpen-medium dark:placeholder:text-darkpen-dark"
          placeholder={'Insert new tag name here.'}
        />
      </div>
    );
  };

  const addTextArea = (
    textareaName: string,
    labelName: string,
    value: string,
    handleChange: (e: React.ChangeEvent<any>) => void,
    handleBlur: (e: any) => void
  ) => {
    return (
      <div className="flex flex-col w-80 py-1 justify-between items-start">
        <label
          className="font-semibold text-sm capitalize text-gray-700 dark:text-darkpen-dark"
          htmlFor={textareaName}
        >
          {labelName}
        </label>
        <textarea
          style={{ resize: 'none' }}
          name={textareaName}
          placeholder={'Optional'}
          onChange={handleChange}
          id={textareaName}
          onBlur={handleBlur}
          value={value}
          rows={4}
          className="rounded-lg shadow-md w-full border border-blue-400 dark:border-gray-300 outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 p-1 dark:bg-night-light dark:focus:ring-gray-400"
        />
      </div>
    );
  };

  return (
    <div className="dark:text-darkpen-medium m-4">
      {addInput(
        'tagName',
        'Tag Name',
        tagName,
        (e: React.ChangeEvent<any>) => {
          setTagName(e.target.value);
        },
        () => {}
      )}
      <div>
        <ErrorMessage
          error={props.createTagError}
          errorComponent={(val: string) => (
            <span className="text-red-700">{val}</span>
          )}
        />
      </div>
      <div className="flex flex-row items-center mr-2">
        <div className="flex flex-col items-center">
          <IconCircle
            onSelect={() => {
              setShowColorPicker(true);
            }}
            colorOption={tagColor}
          />
          <IconPicker
            pickerTypes={['color']}
            show={showColorPicker}
            onSelect={(iconColor: string) => {
              setTagColor(iconColor);
              setShowColorPicker(false);
            }}
            onBlur={() => {
              setShowColorPicker(false);
            }}
            colorPalette={['Tag Colors']}
            colorGradientPalette={tagColorPalette}
            uploadImageNode={null}
          />
        </div>
        {tagName && (
          <span
            className={`${tagColor} text-darkpen-medium text-xs px-2 py-1 rounded-full`}
          >
            {upperFirst(tagName)}
          </span>
        )}
      </div>
      {addTextArea(
        'tagDescription',
        'Tag Description (Optional)',
        tagDescription,
        (e) => {
          setTagDescription(e.target.value);
        },
        () => {}
      )}
      <Button
        variant={'primary'}
        size={'medium'}
        radius={'small'}
        onClick={async () => {
          await props.createTagMutation({
            variables: {
              input: {
                value: tagName,
                subspaceId: props.subspaceId,
                workspaceId: props.workspaceId,
                description: tagDescription,
                colorString: tagColor,
                status: TagStatus.Active,
              },
            },
          });
        }}
      >
        {'Add Tag'}
      </Button>
    </div>
  );
};

export default TagCreate;
