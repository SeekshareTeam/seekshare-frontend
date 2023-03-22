import * as React from 'react';

/* State Management */
import { Subspace as SubspaceType } from 'src/generated/types';

/* Components */
import { Modal } from 'src/components/Modal';
import SubspaceCard from './SubspaceCard';
import SubspaceManager from './Manager';

interface GridItem {
  /*
   * React Node
   */
  cell1: React.ReactNode;
  /*
   * React Node
   */
  cell2: React.ReactNode;
}

interface GridLayout {
  headers?: GridItem;
  gridData: GridItem[];
  className?: string;
}

const SubspacePanelGridLayout: React.FC<GridLayout> = (props) => {
  const data = [props.headers, ...(props?.gridData || [])];

  return (
    <div
      className={`grid grid-cols-4 gap-4 dark:text-darkpen-medium ${props.className}`}
    >
      {data.map((row, ix) => {
        return (
          <React.Fragment key={`subspace_panel_row_${ix}`}>
            <div className="col-start-1 col-end-2">{row?.cell1}</div>
            <div className="col-start-3 col-end-5 col-span-2">{row?.cell2}</div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

interface Props {
  subspaces?: SubspaceType[];
}

const Subspaces: React.FC<Props> = (props) => {
  /**
   * Things to display:
   * User name and role
   * Fetch the subspaces that
   */
  const [selectedSubspace, setSelectedSubspace] =
    React.useState<SubspaceType | null>(null);
  const [showSubspaceManager, setShowSubspaceManager] = React.useState(false);

  const headers = {
    cell1: <p className="font-semibold">{'Name'}</p>,
    cell2: <p className="font-semibold">{'Access Role'}</p>,
  };

  const subspaceGridData = (props?.subspaces || []).map((subspace) => {
    return {
      cell1: (
        <button
          onClick={() => {
            setSelectedSubspace(subspace);
            setShowSubspaceManager(true);
          }}
        >
          <SubspaceCard subspace={subspace} />
        </button>
      ),
      cell2: null,
    };
  });

  return (
    <>
      {selectedSubspace && (
        <Modal
          show={showSubspaceManager}
          blurBackground={true}
          onPressBlur={() => {
            setShowSubspaceManager(false);
            setSelectedSubspace(null);
          }}
        >
          <SubspaceManager subspace={selectedSubspace} />
        </Modal>
      )}
      <SubspacePanelGridLayout
        headers={headers}
        gridData={subspaceGridData}
        className="text-darkpen-medium"
      />
    </>
  );
};

export default Subspaces;
