import { useRouter } from 'next/router';
import { GeneralLayout } from 'src/components/Layouts';

import { Post } from 'src/components/Post';

const PostPage = () => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div className="flex justify-center flex-1 items-start">
      <Post pid={id} />
    </div>
  );
};

PostPage.getLayout = GeneralLayout;

export default PostPage;
