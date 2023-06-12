import * as React from 'react';
import { upperFirst } from 'lodash';
import IconCircle from 'src/components/IconPicker/Children/IconCircle';

interface Props {
  colorPalette: string[];

  colorGradientPalette: { [key: string]: string[] };

  onSelect: (val: string) => void;
}

const ColorPicker: React.FC<Props> = (props) => {
  const [selectedColor, setSelectedColor] = React.useState(
    props.colorPalette[0] || 'Gray'
  );

  return (
    <>
      <div className="w-full py-1 flex-none overflow-x-scroll inline-block whitespace-nowrap">
        {props.colorPalette.map((colorGroup: string) => {
          const isSelected = colorGroup === selectedColor;

          const textColor = `dark:text-${colorGroup}-300`;

          return (
            <button
              className={`border-b dark:border-${colorGroup}-300 ${
                isSelected
                  ? textColor
                  : `dark:text-${colorGroup}-100 dark:hover:text-${colorGroup}-300`
              } px-2 pb-1 text-sm`}
              onClick={() => {
                setSelectedColor(colorGroup);
              }}
              type={'button'}
            >
              {upperFirst(colorGroup)}
            </button>
          );
        })}
      </div>
      <div className={'flex flex-1 flex-row flex-wrap'}>
        {props.colorGradientPalette[selectedColor].map((color) => {
          return <IconCircle colorOption={color} onSelect={props.onSelect} />;
        })}
      </div>
    </>
  );
};

export default ColorPicker;
