import React from 'react';

import { IconChevronDown } from '@tabler/icons';
import Dropdown, { DropdownProps } from 'src/components/Dropdown';
import { Button } from 'src/components/Button';

export type Props = {
  selectedSubspaceId?: string;
  subspaceOptions: Record<string, string>;
  onSelect: DropdownProps['onSelect'];
};

const SubspaceDropdown = (props: Props) => {
  const dropdownRef = React.useRef(null);

  const options = React.useMemo(
    () =>
      Object.keys(props.subspaceOptions).map(id => ({
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
      onSelect={props.onSelect}
      dropdownButton={
        <Button variant={null} ref={dropdownRef}>
          <h3>
            {props.subspaceOptions[props.selectedSubspaceId ?? '-1'] ??
              'Subspace not selected'}
          </h3>
          <IconChevronDown />
        </Button>
      }
    />
  );
};

export default SubspaceDropdown;
