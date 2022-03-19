import * as React from 'react';
import { SelectCell } from 'src/components/Input/SelectCell';
import { SearchTagsQuery } from 'src/generated/operations';

type SelectDropdownTypes = {
  items: SearchTagsQuery['searchTags'];
  onSelectTag: (selectedTag: { value: string; id: string }) => void;
};

export const SelectDropdownGrid: React.FC<SelectDropdownTypes> = (props) => {
  return (
    <div className={'grid grid-cols-3 absolute z-50 bg-white'}>
      {props?.items?.map((it) => (
        <SelectCell key={it.id} item={it} onSelectTag={props.onSelectTag} />
      ))}
    </div>
  );
};
