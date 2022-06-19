import React from 'react';

import { PageWithLayout } from 'src/utils/types';
import { useRouter } from 'next/router';
import QuestionEditor from 'src/components/Editor';

const Create: PageWithLayout<{}> = () => {

  const router = useRouter();

  // console.log('@ create router', router);

  const { subspaceId, workspaceId } = router.query;

  return (
    <QuestionEditor subspaceId={(subspaceId as string)} workspaceId={(workspaceId as string)} />
  );
};

// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//   return { props: {} };
// });

Create.layoutType = 'general';

export default Create;
