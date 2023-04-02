import * as React from 'react';

/* State Management */
import { Subspace as SubspaceType } from 'src/generated/types';

/* Components */
import ContentLoader from 'react-content-loader';
import Logo, { LogoType } from 'src/components/Avatar';

interface Props {
  subspace: SubspaceType;

  className?: string;

  titleClassName?: string;

  loading?: boolean;
}

export const SubspaceCardLoader = () => {
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
  )
}


const SubspaceCard: React.FC<Props> = (props) => {


  if (props.loading) {
    /**
     */
    return (
      <SubspaceCardLoader />
    );
  }

  return (
    <div
      className={`dark:text-darkpen-medium flex flex-row items-start ${
        props.className || ''
      }`}
    >
      <div className="flex flex-row">
        <Logo
          type={props.subspace.logoType as LogoType}
          imgUrl={props.subspace.logoUrl}
          displayHeight={'h-6'}
          displayWidth={'w-6'}
        />
        <h4 className={`mx-1 ${props.titleClassName || ''}`}>
          {props.subspace.name}
        </h4>
      </div>
    </div>
  );
};

export default SubspaceCard;
