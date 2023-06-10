import React from 'react';

import { IconChevronDown } from '@tabler/icons';
import Dropdown, { DropdownOption } from 'src/components/Dropdown';
import { Button } from 'src/components/Button';
import LabeledButton from 'src/components/Button/LabeledButton';

export type Props = {
  selectedWorkspaceId?: string;
  workspaceOptions: Record<string, string>;
  onSelect: (value: string) => void;
};

const WorkspaceDropdown = (props: Props) => {
  const dropdownRef = React.useRef(null);

  const options = React.useMemo(
    () =>
      Object.keys(props.workspaceOptions).map((id) => ({
        id,
        text: props.workspaceOptions[id],
      })),
    [props.workspaceOptions]
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
          legend="Workspace"
          legendBackground={"dark:bg-night-dark"}
          button={
            <Button variant={null} ref={dropdownRef} className={"w-44 justify-between"}>
              <h3>
                {props.workspaceOptions[props.selectedWorkspaceId ?? '-1'] ??
                  'Select Workspace'}
              </h3>
              <IconChevronDown size={16} />
            </Button>
          }
        />
      }
    />
  );
};

export default WorkspaceDropdown;
