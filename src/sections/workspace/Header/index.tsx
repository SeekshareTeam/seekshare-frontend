import * as React from 'react';
import { Workspace as WorkspaceType } from 'src/generated/types';
import WorkspaceTitle from 'src/components/Workspace/Title';
import Avatar from 'src/components/Avatar';

interface Props {
  imgUrl?: string;

  workspace: WorkspaceType;

  loading: boolean;
}

const WorkspaceHeader: React.FC<Props> = (props) => {
  const { workspace } = props;
  // const [pattern, setPattern] = React.useState<React.ReactNode>();
  // const [patternUrl, setPatternUrl] = React.useState('');

  // React.useEffect(() => {
  //   (async () => {
  //     const backgroundPattern = await generate({ input: 'lorem posum' });
  //     // setPattern(backgroundPattern);
  //     setPatternUrl(backgroundPattern.toDataURL());
  //   })();
  // }, []);


  return (
    <div
      className={`flex flex-wrap w-full md:h-56 pb-6`}
      style={{ backgroundImage: `url("${workspace?.backgroundImage}")` }}
    >
      <div className="flex ml-4 items-end">
        <Avatar type={'image'} imgUrl={workspace?.url} loading={props.loading} />
        <WorkspaceTitle title={props.workspace.name} loading={props.loading} />
      </div>
    </div>
  );
};

export default WorkspaceHeader;
