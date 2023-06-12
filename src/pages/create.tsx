import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { MilkdownProvider } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';

import composeElements from 'src/utils/compose_elements';
import type { PageWithLayout } from 'src/utils/types';

const Provider = composeElements(MilkdownProvider, ProsemirrorAdapterProvider);

const Editor = dynamic(() => import('src/components/MilkdownEditor/Editor'), {
  ssr: false,
});
// import Lol from 'src/components/MilkdownEditor/Editor';

const Create: PageWithLayout<Record<string, never>> = () => {
  const router = useRouter();
  let { subspaceId, workspaceId } = router.query;

  if (Array.isArray(subspaceId)) {
    subspaceId = subspaceId[0];
  }

  if (Array.isArray(workspaceId)) {
    workspaceId = workspaceId[0];
  }

  return (
    <div className="flex-1">
      <Provider>
        <div className="flex justify-center">
          <Editor subspaceId={subspaceId} workspaceId={workspaceId} />
        </div>
      </Provider>
    </div>
  );
};

Create.layoutType = 'general';

export default Create;
