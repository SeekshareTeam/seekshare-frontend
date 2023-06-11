import * as React from 'react';

/* Components */
import ContentLoader from 'react-content-loader';
import { IconUpload } from '@tabler/icons';
import { Button } from 'src/components/Button';

export const UploadButtonLoader: React.FC = () => {
  /*
   * Viewport:
   * This is set by providing the width and height values
   * to an SVG element. The viewport determins the size of the SVG container.
   * It basically provides snapshot of how much one can view.
   * ViewBox:
   * This is set by providing four numerical values
   * "min x min y width height".
   * The first two values determine wheere the viewbox is going to "pan" to.
   * The last two values determine the scale of what's inside the Viewport.
   * For example if the Viewport is 50 50,
   * then it means the SVG container is 50 pixels by 50 pixels
   * However, if the ViewBox last two parameters are 100 100, then that means
   * everything inside the 50 by 50 Viewport is actually displaying elements
   * that are of the size 100 by 100.
   *
   * Loader Dimensions:
   * x = 8 + 35 + (50 - 8 - 35) + 145 = 195
   * y = 5 + 20 = 25
   */
  return (
    <ContentLoader
      speed={2}
      width={200}
      height={40}
      viewBox="0 0 200 30"
      backgroundColor="#d9d9d9"
      foregroundColor="#ededed"
    >
      <rect x="50" y="10" rx="4" ry="4" width="145" height="20" />
      <rect x="8" y="10" rx="4" ry="4" width="35" height="20" />
    </ContentLoader>
  );
};

interface Props {
  text: string;

  type?: string;
}

const UploadButton: React.FC<Props> = (props) => {
  return (
    <Button
      className="bg-nord-4 dark:bg-nord-2 border border-nord-3 text-nord-0 dark:text-node-0 shadow hover:brightness-110 hover:shadow pointer-events-none"
      size={'medium'}
      type={props.type}
      radius={'small'}
    >
      <span>{props.text}</span>
      <IconUpload size={16} />
    </Button>
  );
};

export default UploadButton;
