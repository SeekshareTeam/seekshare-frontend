import * as React from 'react';

/* State Management */
import { GridItem, GridRow as GridRowProps, gridWidth } from 'src/utils/types';

const GridRow = <T extends GridItem<string>, K extends keyof T>(
  props: GridRowProps<T, K>
) => {
  return (
    <React.Fragment key={`${props.row.itemKey}`}>
      {props.config.map((tableConfig) => {
        return (
          <div className={`${gridWidth[tableConfig.width]}`}>
            {props.row[tableConfig.key]}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default GridRow;
