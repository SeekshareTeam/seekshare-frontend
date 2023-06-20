import * as React from 'react';

/* State Management */
import { Quiz as QuizType } from 'src/generated/types';
import { addQuizToQueue } from 'src/modules/Quiz/slice';
import { useAppDispatch } from 'src/modules/Redux';

/* Components */
import {
  ReusableDropdown,
  // DropdownOption as DropdownOptionType,
} from 'src/components/Dropdown';
import { IconDots } from '@tabler/icons';

interface Props {
  quiz: QuizType;
}

const DashboardOptions: React.FC<Props> = (props) => {
  const [options] = React.useState([{ id: 'add', text: 'Add To Quiz Basket' }]);

  const dispatch = useAppDispatch();

  return (
    <ReusableDropdown
      position={'above'}
      horizontalPosition={'right'}
      optionList={options}
      bgColor={{
        dark: 'bg-nord-0 dark:hover:bg-nord-0',
        medium: 'bg-nord-1 dark:hover:bg-nord-1 ',
        light: 'bg-nord-3',
      }}
      dropdownButton={(_, dropdownRef: React.RefObject<HTMLButtonElement>) => {
        return (
          <button ref={dropdownRef} className="dark:hover:opacity-75">
            <IconDots size={24} />
          </button>
        );
      }}
      onOptionClick={(option) => {
        console.log('@@@ option', option);
        if (option.id === 'add') {
          console.log('action');
          dispatch(addQuizToQueue(props.quiz));
        }
      }}
    />
  );
};

export default DashboardOptions;
