import * as React from 'react';

/* State Management */
import {
  GridItem,
  GridRow as GridRowProps,
  flexColumns,
} from 'src/utils/types';

const GridRow = <T extends GridItem<string>, K extends keyof T>(
  props: GridRowProps<T, K>
) => {
  return (
    <tr
      className={`w-full rounded-lg hover:dark:bg-node-3 bg-node-4 p-2 ${props.rowColor}`}
      key={`${props.row.itemKey}`}
    >
      {props.config.map((tableConfig, i) => {

        if (props?.isHeader) {
          return (
            <th key={i} className={`p-2 rounded-lg text-left ${flexColumns[tableConfig.width]}`}>
              {props.row[tableConfig.key]}
            </th>
          );
        } else {
          return (
            <td key={i} className={`px-2 py-4 max-w-[320px] text-left ${flexColumns[tableConfig.width]}`}>
              {props.row[tableConfig.key]}
            </td>
          );

        }
      })}
    </tr>
  );
};

export default GridRow;
