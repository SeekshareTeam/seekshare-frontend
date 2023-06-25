import * as React from 'react';
import { isEmpty } from 'lodash';

/* State Management */
import { WorksheetItem as WorksheetItemType } from 'src/generated/types';
import { ConfigType } from 'src/utils/types';

/* Components */
// import GridTable from 'src/components/GridTable/';
import FlexTable from 'src/components/FlexTable';
import { gridData, headers } from './WorksheetRow';

interface Props {
  worksheetItems?: WorksheetItemType[];
}

const useWorksheetItems = (props: Props) => {
  const [worksheetItems, setWorksheetItems] = React.useState(
    props?.worksheetItems || []
  );

  React.useEffect(() => {
    if (props.worksheetItems) {
      setWorksheetItems(props.worksheetItems);
    }
  }, [props.worksheetItems]);

  return { worksheetItems, setWorksheetItems };
};

const WorksheetGrid: React.FC<Props> = (props) => {
  /*
     Date
     User (name, image)
     title
     tags
   */
  const { worksheetItems } = useWorksheetItems(props);

  if (isEmpty(props.worksheetItems)) {
    return null;
  }

  const config: ConfigType<'cell1' | 'cell2' | 'cell3'>[] = [
    { width: 3, key: 'cell1' },
    { width: 1, key: 'cell2' },
    { width: 1, key: 'cell3' },
  ];

  return (
    <FlexTable
      config={config}
      columns={7}
      headers={headers()}
      gridData={gridData({ worksheetItems })}
      keyName="dashboard_grid_table"
    />
  );
};

export default WorksheetGrid;
