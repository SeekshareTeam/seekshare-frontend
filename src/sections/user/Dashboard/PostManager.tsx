import * as React from 'react';

/* State Management */
import { PostTypeArray, Post as PostType } from 'src/generated/types';
import { PostTypeOptionKey } from 'src/utils/types';

/* Components */
// import { UnderlineTabs } from 'src/components/Tabs';
import UserActivityTabs from 'src/components/Tabs/UserActivityTabs';
import PostGrid from 'src/sections/user/Dashboard/PostGrid';

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

  // This should be a static value
  const tabTypes = props.postsTypeArray.map((p) => ({
    tabKey: p.type,
    tabValue: PostTypeOptionKey[p.type].text,
  }));

  const [activeTabKey, setActiveTabKey] = React.useState<string>(
    tabTypes[0].tabKey
  );

  const [displayPostArray, setDisplayPostArray] = React.useState<
    PostType[] | undefined
  >();

  React.useEffect(() => {
    if (activeTabKey) {
      setDisplayPostArray(
        props.postsTypeArray.find(
          (typeArray) => typeArray.type === activeTabKey
        )?.posts
      );
    }
  }, [activeTabKey]);

  return (
    <div>
      <div className="p-4">
        <UserActivityTabs
          tabs={tabTypes}
          active={activeTabKey}
          onSelectTab={setActiveTabKey}
        />
      </div>
      <PostGrid posts={displayPostArray} />
    </div>
  );
};

export default PostManager;
