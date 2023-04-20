import * as React from 'react';

import { IconX, } from '@tabler/icons';
import PortableEditor from 'src/plugins/components/PortableEditor';

interface OptionToolbarProps
  extends Pick<Props, 'title' | 'answerNode' | 'onClose'> {}

const OptionToolbar: React.FC<OptionToolbarProps> = (props) => {
  return (
    <div className="flex rounded-t-lg py-1">
      <div className="flex-1 flex">
        <span className="mx-2 text-sm dark:text-darkpen-dark">
          {props.title}
        </span>
        {props.answerNode}
      </div>
      <div className="flex-1 flex justify-end">
        <button
          onClick={props.onClose}
          className="text-darkpen-dark hover:text-darkpen-medium mx-2"
        >
          <IconX size={16} />
        </button>
      </div>
    </div>
  );
};

interface Props {
  value: string;

  title: string;

  answerNode: React.ReactNode;

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
      <OptionToolbar
        title={props.title}
        answerNode={props.answerNode}
        onClose={props.onClose}
      />
      <PortableEditor
        options={options}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Option;
