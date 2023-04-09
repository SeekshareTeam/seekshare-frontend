import * as React from 'react';

import { QnaType } from 'src/utils/types';

export const useQnaExtensionHooks = () => {
  const [qnaType, setQnaType] = React.useState<QnaType>('question');
  const [qnaOptions] = React.useState<{ value: QnaType; label: string }[]>([
    { value: 'question', label: 'Question' },
    { value: 'answer', label: 'Answer' },
  ]);

  return { qnaType, setQnaType, qnaOptions };
};

interface Props {
  qnaType: QnaType;
  list: { value: QnaType; label: string }[];
  onSelect: (val: QnaType) => void;
}

const QnaExtension: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-row flex-1">
      {props.list.map((item) => (
        <div
          key={item.value}
          className="py-0.5 px-2"
          style={{
            color: props.qnaType === item.value ? 'white' : '#91A699',
            backgroundColor:
              props.qnaType === item.value ? '#91A699' : '#232325',
          }}
          onClick={() => props.onSelect(item.value)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default QnaExtension;
