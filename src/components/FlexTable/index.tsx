import * as React from 'react';

/* State Management */
import { GridItem, GridLayout } from 'src/utils/types';
import { isEmpty } from 'lodash';

/* Components */
import FlexRow from './Row';

/*
   Should be able to provide to the table a grid size of x cells in a row
   Should provide the column number
   Should provide a config with the width of each cell
 */
const FlexTable = <T extends GridItem<string>, K extends keyof T>(
  props: GridLayout<T, K>
) => {
  // const [data, setData] = React.useState<(T | undefined)[]>([]);

  // React.useEffect(() => {
  //   setData([props.headers, ...(props.gridData || [])]);
  // }, [props.headers, props.gridData]);

  return (
    <div className="overflow-x-auto w-full">
      <table
        className={`table-fixed m-4 rounded-lg bg-nord-4 dark:bg-nord-1 text-nord-0 dark:text-nord-6 ${props.className}`}
      >
        {!isEmpty(props.headers) && (
          <thead className="rounded-lg">
            <FlexRow
              rowColor={'dark:bg-nord-1'}
              row={props.headers}
              config={props.config}
              isHeader={true}
            />
          </thead>
        )}
        <tbody>
          {(props.gridData || []).map((row, i) => {
            return (
              <FlexRow
                rowColor={['dark:bg-nord-1', 'dark:bg-nord-2'][i % 2]}
                key={i}
                row={row}
                config={props.config}
                isHeader={false}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FlexTable;
