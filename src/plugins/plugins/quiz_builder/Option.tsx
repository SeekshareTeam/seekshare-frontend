import * as React from 'react';

import { IconX } from '@tabler/icons';
import PortableEditor from 'src/plugins/components/PortableEditor';

interface Props {
  value: string;

  title: string;

  className?: string;

  onChange: (val: string) => void;

  onClose: () => void;
}

const Option: React.FC<Props> = (props) => {
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      sideBySideFullscreen: false,
      minHeight: '50px',
      placeholder: 'Insert Content...',
    }),
    []
  );

  return (
    <div className={props.className}>
      <div className="flex rounded-t-lg">
        <div className="flex-1 flex">
          <span className="mx-2 text-sm dark:text-darkpen-dark">
            {props.title}
          </span>
        </div>
        <div className="flex-1 flex justify-end">
          <button onClick={props.onClose} className="text-darkpen-dark hover:text-darkpen-medium">
            <IconX size={16} />
          </button>
        </div>
      </div>
      <PortableEditor
        options={options}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Option;
