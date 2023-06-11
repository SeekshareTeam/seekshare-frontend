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

const Create: PageWithLayout<{}> = () => {
  const router = useRouter();
  const { subspaceId, workspaceId } = router.query;

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
