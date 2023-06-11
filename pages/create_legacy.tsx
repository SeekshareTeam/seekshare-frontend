import React from 'react';

import { PageWithLayout } from 'src/utils/types';
import { useRouter } from 'next/router';
import QuestionEditor from 'src/components/Editor';

type Query = string | undefined;

const Create: PageWithLayout<{}> = () => {
  const router = useRouter();

  const { subspaceId, workspaceId } = router.query;

  return (
    <QuestionEditor
      subspaceId={subspaceId as Query}
      workspaceId={workspaceId as Query}
    />
  );
};

Create.layoutType = 'general';

export default Create;
