import * as React from 'react';

/* State Management */
import { Post as PostType } from 'src/generated/types';

/* Components */
import TagItem from 'src/components/Tags';

export const headers = () => ({
  cell1: <p className="font-semibold">{'User'}</p>,
  cell2: <p className="font-semibold">{'Title'}</p>,
  cell3: <p className="font-semibold">{'Tags'}</p>,
  cell4: <p className="font-semibold">{'Date Created'}</p>,
  itemKey: 'dashboard_header',
});

export const gridData = (params: { posts: PostType[] }) => {
  return params.posts.map((post, ix) => {
    return {
      cell1: <p>{post.user?.firstname + ' ' + post.user?.lastname}</p>,
      cell2: <p>{post.title}</p>,
      cell3:
        (post?.tags || []).length > 0 ? (
          <div className="flex flex-wrap space-y-1">
            {post?.tags?.map((tag, ix) => {
              return (
                <div key={tag.value} className={`${ix > 0 ? 'mr-1' : ''}`}>
                  <TagItem colorString={tag.colorString} value={tag.value} />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-nord-0 dark:text-nord-1">{'No Tags'}</p>
        ),
      cell4: <p>{post.createdAt}</p>,
      itemKey: `dashboard_grid_${ix}`,
    };
  });
};
