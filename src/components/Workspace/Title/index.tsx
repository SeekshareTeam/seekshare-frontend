import * as React from 'react';
import ContentLoader from 'react-content-loader';

interface Props {
  title: string;

  loading: boolean;
}

const WorkspaceTitle: React.FC<Props> = (props) => {
  if (props.loading) {
    return (
      <ContentLoader className="mx-4" width={200} height={35}>
        <rect x="0" y="0" width="100%" height="100%" />
      </ContentLoader>
    );
  }

  return (
    <h2 className="mx-4 inline-block text-4xl text-gray-500 font-bold">
      {props.title}
    </h2>
  );
};

export default WorkspaceTitle;
