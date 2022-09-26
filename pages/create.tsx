import React from 'react';

import { PageWithLayout } from 'src/utils/types';
import { useRouter } from 'next/router';
import QuestionEditor from 'src/components/Editor';

const Create: PageWithLayout<{}> = () => {

  const router = useRouter();

  const { subspaceId, workspaceId } = router.query;

  return (
    <QuestionEditor subspaceId={(subspaceId as string)} workspaceId={(workspaceId as string)} />
  );
};

Create.layoutType = 'general';

export default Create;
