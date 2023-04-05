import * as React from 'react';

/* State Management */
import { Post as PostType } from 'src/generated/types';
// import { useFetchPostsByUserLazyQuery } from 'src/generated/apollo';

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
}

interface GridLayout {
  headers?: GridItem;
  gridData: GridItem[];
  className?: string;
}

const PostRow: React.FC<GridLayout> = (props) => {
  const data = [props.headers, ...(props?.gridData || [])];

  return (
    <div
      className={`grid grid-cols-4 gap-4 dark:text-darkpen-medium ${props.className}`}
    >
      {data.map((row, ix) => {
        return (
          <React.Fragment key={`subspace_panel_row_${ix}`}>
            <div className="col-start-1 col-end-1">{row?.cell1}</div>
            <div className="col-start-2 col-end-2">{row?.cell2}</div>
            <div className="col-start-3 col-end-3">{row?.cell3}</div>
            <div className="col-start-4 col-end-4">{row?.cell4}</div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

interface Props {
  posts: PostType[];
}

const PostGrid: React.FC<Props> = (props) => {
  /*
     Date
     User (name, image)
     title
     tags
   */

  const headers = {
    cell1: <p>{'User'}</p>,
    cell2: <p>{'Title'}</p>,
    cell3: <p>{'Tags'}</p>,
    cell4: <p>{'Date Created'}</p>,
  };

  const gridData = props.posts.map((post) => {
    return {
      cell1: <p>{post.user?.firstname + ' ' + post.user?.lastname}</p>,
      cell2: <p>{post.title}</p>,
      cell3: <p>{'tags'}</p>,
      cell4: <p>{post.createdAt}</p>,
    };
  });

  return <PostRow headers={headers} gridData={gridData} />;
};

export default PostGrid;
