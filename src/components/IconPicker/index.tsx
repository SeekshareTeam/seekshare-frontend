import * as React from 'react';
import { upperFirst, isObject } from 'lodash';

import colors from 'tailwindcss/colors';
import { DefaultColors } from 'tailwindcss/types/generated/colors';

import ColorPicker from 'src/components/IconPicker/Children/ColorPicker';

const colorPalette: string[] = [];
const nonSafeList = [
  'lightBlue',
  'warmGray',
  'trueGray',
  'coolGray',
  'blueGray',
  'zinc',
  'stone',
  'neutral',
  'slate',
];

Object.keys(colors).forEach((c) => {
  if (
    isObject(colors[c as keyof DefaultColors]) &&
    typeof colors[c as keyof DefaultColors] !== 'function' &&
    // @ts-ignore
    500 in colors[c as keyof DefaultColors] &&
    !nonSafeList.includes(c)
  ) {
    colorPalette.push(c);
  }
});

const colorGradientPalette: { [key: string]: string[] } = {};

colorPalette.forEach((c1, ix) => {
  colorGradientPalette[c1] = [];
  colorPalette.forEach((c2, jx) => {
    if (ix !== jx) {
      colorGradientPalette[c1].push(
        `bg-gradient-to-r from-${c1}-500 to-${c2}-500`
      );
    }
  });
});

interface Props {
  onSelect: ((val: string) => Promise<void>) | ((val: string) => void);
  onBlur: () => void;
  show: boolean;
  uploadImageNode: React.ReactNode;
}

const pickerTypes = ['color', 'image'];

type PickerType = typeof pickerTypes[number];

const IconPicker: React.FC<Props> = (props) => {
  const [pickerType, setPickerType] = React.useState<PickerType>(
    pickerTypes[0]
  );

  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (divRef.current) {
      if (props.show) {
        divRef.current.focus();
      }
    }
  }, [divRef, props.show]);

  const renderPicker = (currentType: PickerType) => {
    switch (currentType) {
      case 'color':
        return (
          <ColorPicker
            colorPalette={colorPalette}
            colorGradientPalette={colorGradientPalette}
            onSelect={(val: string) => {
              props.onSelect(val);
            }}
          />
        );
      case 'image':
        return (
          <div className="flex flex-1 justify-center items-center">
            {props.uploadImageNode}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative inline-block mx-auto w-48">
      {props.show && (
        <div
          className="p-3 z-10 h-48 w-48 flex flex-col overflow-y-scroll overflow-x-hidden box-border shadow absolute dark:bg-slate-700 rounded"
          onBlur={(event) => {
            /**
             * event related target is the element that is getting focus
             * currentTarget is this div element
             * event target is the element that is losing focus
             */
            if (!event.currentTarget.contains(event.relatedTarget)) {
              props.onBlur();
            }
          }}
          tabIndex={1}
          ref={divRef}
        >
          <div className="w-full flex-none flex">
            {pickerTypes.map((pType) => {
              return (
                <button
                  className={`flex-1 ${
                    pickerType === pType
                      ? 'dark:text-gray-100 dark:border-gray-100 py-1 border-t border-x rounded-t-lg shadow '
                      : 'dark:text-gray-300 dark:hover:text-gray-100 dark:border-gray-300 border-b'
                  }`}
                  type={'button'}
                  onClick={() => {
                    setPickerType(pType);
                  }}
                >
                  {upperFirst(pType)}
                </button>
              );
            })}
          </div>
          <div className="flex flex-1 flex-wrap">
            {renderPicker(pickerType)}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconPicker;
