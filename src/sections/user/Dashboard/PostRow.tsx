import * as React from 'react';

/* State Management */
import { Post as PostType } from 'src/generated/types';
import { ConfigType } from 'src/utils/types';

/* Components */
import GridTable from 'src/components/GridTable/';
import TagItem from 'src/components/Tags';

interface Props {
  posts?: PostType[];
}

const PostGrid: React.FC<Props> = (props) => {
  /*
     Date
     User (name, image)
     title
     tags
   */

  if (!props.posts) {
    return <p className="dark:text-darkpen-dark text-xl">{'No Activity.'}</p>;
  }

  const config: ConfigType<'cell1' | 'cell2' | 'cell3' | 'cell4'>[] = [
    { width: 1, key: 'cell1' },
    { width: 2, key: 'cell2' },
    { width: 1, key: 'cell3' },
    { width: 1, key: 'cell4' },
  ];

  const headers = {
    cell1: <p className="font-semibold">{'User'}</p>,
    cell2: <p className="font-semibold">{'Title'}</p>,
    cell3: <p className="font-semibold">{'Tags'}</p>,
    cell4: <p className="font-semibold">{'Date Created'}</p>,
    itemKey: 'dashboard_header',
  };

  const gridData = props.posts.map((post, ix) => {
    return {
      cell1: <p>{post.user?.firstname + ' ' + post.user?.lastname}</p>,
      cell2: <p>{post.title}</p>,
      cell3:
        (post?.tags || []).length > 0 ? (
          <div className="flex flex-wrap space-y-1">
            {post?.tags?.map((tag, ix) => {
              return (
                <div className={`${ix > 0 ? 'mr-1' : ''}`}>
                  <TagItem colorString={tag.colorString} value={tag.value} />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="dark:text-darkpen-dark">{'No Tags'}</p>
        ),
      cell4: <p>{post.createdAt}</p>,
      itemKey: `dashboard_grid_${ix}`,
    };
  });

  return (
    <div className="m-2">
      <GridTable
        config={config}
        columns={5}
        headers={headers}
        gridData={gridData}
        keyName="dashboard_grid_table"
      />
    </div>
  );
};

export default PostGrid;
