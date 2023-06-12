import React from 'react';

import { IconChevronDown } from '@tabler/icons';
import Dropdown, { DropdownOption } from 'src/components/Dropdown';
import { Button } from 'src/components/Button';
import LabeledButton from 'src/components/Button/LabeledButton';

export type Props = {
  selectedSubspaceId?: string;
  subspaceOptions: Record<string, string>;
  onSelect: (value: string) => void;
};

const SubspaceDropdown = (props: Props) => {
  const dropdownRef = React.useRef(null);

  const options = React.useMemo(
    () =>
      Object.keys(props.subspaceOptions).map((id) => ({
        id,
        text: props.subspaceOptions[id],
      })),
    [props.subspaceOptions]
  );

  return (
    <Dropdown
      dropdownRef={dropdownRef}
      optionList={options}
      position="above"
      horizontalPosition="right"
      onOptionClick={(option: DropdownOption) => {
        props.onSelect(option?.id ?? '');
      }}
      dropdownButton={
        <LabeledButton
          legend="Subspace"
          legendBackground={'dark:bg-nord-0'}
          button={
            <Button
              variant={null}
              ref={dropdownRef}
              className={'w-44 justify-between'}
            >
              <h3>
                {props.subspaceOptions[props.selectedSubspaceId ?? '-1'] ??
                  'Select Subspace'}
              </h3>
              <IconChevronDown size={16} />
            </Button>
          }
        />
      }
    />
  );
};

export default SubspaceDropdown;
