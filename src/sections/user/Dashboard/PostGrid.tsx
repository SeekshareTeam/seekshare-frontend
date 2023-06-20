import * as React from 'react';
import { isEmpty } from 'lodash';

/* State Management */
import { Post as PostType } from 'src/generated/types';
import { ConfigType } from 'src/utils/types';

/* Components */
import GridTable from 'src/components/GridTable/';
import { gridData, headers } from './PostRow';

interface Props {
  posts?: PostType[];
}

const usePosts = (props: Props) => {
  const [posts, setPosts] = React.useState(props?.posts || []);

  React.useEffect(() => {
    if (props.posts) {
      setPosts(props.posts);
    }
  }, [props.posts]);

  return { posts, setPosts };
};

const PostGrid: React.FC<Props> = (props) => {
  /*
     Date
     User (name, image)
     title
     tags
   */
  const { posts } = usePosts(props);

  if (isEmpty(props.posts)) {
    return null;
  }

  const config: ConfigType<'cell1' | 'cell2' | 'cell3' | 'cell4'>[] = [
    { width: 1, key: 'cell1' },
    { width: 2, key: 'cell2' },
    { width: 1, key: 'cell3' },
    { width: 1, key: 'cell4' },
  ];

  return (
    <div className="mx-4 p-2 rounded-lg bg-node-4 dark:bg-nord-1">
      <GridTable
        config={config}
        columns={5}
        headers={headers()}
        gridData={gridData({ posts })}
        keyName="dashboard_grid_table"
      />
    </div>
  );
};

export default PostGrid;
