import * as React from 'react';
import { upperCase } from 'lodash';

/* State Management */
import { Tag as TagType } from 'src/generated/types';

/* Components */
import { IconPencil } from '@tabler/icons';
import { Button } from 'src/components/Button';

interface GridItem {
  /*
   * React Node
   */
  cell1: React.ReactNode;
  /*
   * React Node
   */
  cell2: React.ReactNode;
  /*
   * React Node
   */
  cell3: React.ReactNode;
  /*
   * React Node
   */
  cell4: React.ReactNode;
  /*
   * React Node
   */
  cell5: React.ReactNode;
}

interface GridLayout {
  headers?: GridItem;
  gridData: GridItem[];
  className?: string;
}

const TagDashboardGridLayout: React.FC<GridLayout> = (props) => {
  const data = [props.headers, ...(props?.gridData || [])];

  return (
    <div
      className={`grid grid-cols-6 items-center gap-4 m-4 text-nord-0 dark:text-nord-6 ${props.className}`}
    >
      {data.map((row, ix) => {
        return (
          <React.Fragment key={`subspace_panel_row_${ix}`}>
            <div className="col-start-1 col-end-1">{row?.cell1}</div>
            <div className="col-start-2 col-end-4 col-span-2">{row?.cell2}</div>
            <div className="col-start-4 col-end-4">{row?.cell3}</div>
            <div className="col-start-5 col-end-5">{row?.cell4}</div>
            <div className="col-start-6 col-end-6">{row?.cell5}</div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

interface Props {
  tags: TagType[];
}

const TagDashboard: React.FC<Props> = (props) => {
  /* Requirements:
   * Display the tag name - 1
   * Description - 2
   * Number of posts - 1
   * Date created - 1
   * Edit button - 1
   */

  const headers = {
    cell1: <p className="font-semibold">{'Tag'}</p>,
    cell2: <p className="font-semibold">{'Description'}</p>,
    cell3: <p className="font-semibold">{'# of Posts'}</p>,
    cell4: <p className="font-semibold">{'Date Created'}</p>,
    cell5: <p className="font-semibold">{''}</p>,
  };

  const formattedTagData = props.tags.map((tag: TagType) => {
    return {
      cell1: (
        <div className="flex flex-row justify-start items-center overflow-hidden">
          <span
            className={`${tag.colorString} text-nord-0 dark:text-nord-6 text-xs px-2 py-1 rounded-full whitespace-nowrap`}
          >
            {upperCase(tag.value)}
          </span>
        </div>
      ),
      cell2: (
        <div className="flex flex-row justify-start items-center w-full">
          <p>{tag.description}</p>
        </div>
      ),
      cell3: null,
      cell4: <span>{tag.createdAt}</span>,
      cell5: (
        <Button>
          <IconPencil />
        </Button>
      ),
    };
  });

  return (
    <TagDashboardGridLayout headers={headers} gridData={formattedTagData} />
  );
};

export default TagDashboard;
