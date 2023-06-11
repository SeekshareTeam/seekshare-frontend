import * as React from 'react';

/* State Management */
import { GridItem, GridLayout, gridColumns } from 'src/utils/types';

/* Components */
import GridRow from './Row';

/*
   Should be able to provide to the table a grid size of x cells in a row
   Should provide the column number
   Should provide a config with the width of each cell
 */
const GridTable = <T extends GridItem<string>, K extends keyof T>(
  props: GridLayout<T, K>
) => {
  const [data, setData] = React.useState<(T | undefined)[]>([]);

  React.useEffect(() => {
    setData([props.headers, ...(props.gridData || [])]);
  }, [props.headers, props.gridData]);

  return (
    <div
      className={`grid ${
        gridColumns[props.columns]
      } gap-4 text-nord-0 dark:text-nord-6 ${props.className}`}
    >
      {data?.map((row) => {
        if (!row) {
          return null;
        }

        return <GridRow row={row} config={props.config} />;
      })}
    </div>
  );
};

export default GridTable;
