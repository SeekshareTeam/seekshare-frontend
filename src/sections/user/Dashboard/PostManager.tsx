import * as React from 'react';

/* State Management */
import { PostTypeArray } from 'src/generated/types';

/* Components */
import { UnderlineTabs } from 'src/components/Tabs';
import PostGrid from 'src/sections/user/Dashboard/PostRow';
// import { useFetchPostsByUserLazyQuery } from 'src/generated/apollo';

interface Props {
  postsTypeArray: PostTypeArray[];
}

const PostManager: React.FC<Props> = (props) => {
  /*
     Date
     User (name, image)
     title
     tags
   */

  const tabTypes = props.postsTypeArray.map((p) => ({
    tabKey: p.type,
    tabValue: 'Question',
  }));

  const [activeTabKey, setActiveTabKey] = React.useState<string>(
    tabTypes[0].tabKey
  );

  console.log('@@@ postArray', props.postsTypeArray);

  return (
    <div>
      <UnderlineTabs
        tabs={tabTypes}
        active={activeTabKey}
        onSelectTab={setActiveTabKey}
      />
      {props.postsTypeArray.map((postArray) => {
        return <PostGrid posts={postArray.posts} />;
      })}
    </div>
  );
};

export default PostManager;
