import * as React from 'react';
import Logo, { LogoType } from 'src/components/Avatar';
import { Subspace as SubspaceType } from 'src/generated/types';

interface Props {
  subspace: SubspaceType;

  className?: string;

  titleClassName?: string;
}

const SubspaceCard: React.FC<Props> = (props) => {
  return (
    <div className={`dark:text-darkpen-medium flex flex-row items-start ${props.className || ''}`}>
      <div className="flex flex-row">
      <Logo
        type={props.subspace.logoType as LogoType}
        imgUrl={props.subspace.logoUrl}
        displayHeight={'h-6'}
        displayWidth={'w-6'}
      />
      <h4 className={`mx-1 ${props.titleClassName || ''}`}>{props.subspace.name}</h4>
      </div>
    </div>
  );
};

export default SubspaceCard;
