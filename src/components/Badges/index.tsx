import * as React from 'react';

function getSize(size: string | undefined) {
  switch (size) {
    case 'large': {
      return 'px-4 py-3 text-sm';
    }
    case 'small': {
      return 'mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 text-xs';
    }
    case 'small-square': {
      return 'p-2 text-sm';
    }
    default: {
      return 'px-4 py-2 text-sm';
    }
  }
}

function getType(type: string | undefined) {
  switch (type) {
    case 'subspace':
      return 'bg-red-500 hover:bg-red-600 duration-300';
    case 'workspace':
      return 'bg-green-500 hover:bg-green-600 duration-300';
    case 'tag':
      return 'bg-blue-500 hover:bg-blue-600 duration-300';
  }
}

function getShape(shape: string | undefined) {
  switch (shape) {
    case 'small':
      return 'rounded-sm';
    case 'normal':
      return 'rounded';
    case 'medium':
      return 'rounded-md';
    case 'large':
      return 'rounded-lg';
    case 'circle':
      return 'rounded-full';
    default:
      return 'rounded-sm';
  }
}

// const ComposerBuilder = () => {
//   const composedObject = { size: '', shape: '', type: '' };
//
//   const getSize = (size: string | undefined) => {
//     switch (size) {
//       case 'large': {
//         composedObject['size'] = 'px-4 py-3 text-sm';
//         break;
//       }
//       case 'small': {
//         composedObject['size'] = 'mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 text-xs';
//         break;
//       }
//       case 'small-square': {
//         composedObject['size'] = 'p-2 text-sm';
//         break;
//       }
//       default: {
//         composedObject['size'] = 'px-4 py-2 text-sm';
//         break;
//       }
//     }
//   };
//
//   const getShape = (shape: string | undefined) => {
//     let shapeClass = '';
//     switch (shape) {
//       case 'small':
//         shapeClass = 'rounded-sm';
//         break;
//       case 'normal':
//         shapeClass = 'rounded';
//         break;
//       case 'medium':
//         shapeClass = 'rounded-md';
//         break;
//       case 'large':
//         shapeClass = 'rounded-lg';
//         break;
//       case 'circle':
//         shapeClass = 'rounded-full';
//         break;
//       default:
//         shapeClass = 'rounded-sm';
//         break;
//     }
//     composedObject.shape = shapeClass;
//   };
//
//   const getType = function (type: string | undefined) {
//     let typeClass = '';
//     switch (type) {
//       case 'subspace':
//         typeClass = 'bg-red-400 hover:bg-red-500 duration-300';
//         break;
//       case 'workspace':
//         typeClass = 'bg-green-500 hover:bg-green-600 duration-300';
//         break;
//     }
//     this.composedObject.type = typeClass;
//     return this;
//   };
//
//   const build = () => {
//     let buildClass = '';
//     for (var [k, v] of Object.entries(composedObject)) {
//       if (buildClass) {
//         buildClass += ' ' + v;
//       } else {
//         buildClass = v;
//       }
//     }
//     return buildClass;
//   };
//
//   let builder = {
//     getSize,
//     getShape,
//     getType,
//     build,
//   };
//
//   const create = () => {
//     return builder;
//   };
//
//   return {
//     create,
//   };
// };

const composer = {
  getSize,
  getType,
  getShape,
};

type BadgeProps = {
  size?: string;
  type?: string;
  shape?: string;
  text?: string;
};

export const Badge: React.FC<BadgeProps> = ({
  size,
  type,
  shape,
  text,
}: BadgeProps) => {
  const baseClasses =
    'inline-block font-bold text-white  hover:bg-gray-500 opacity-90 hover:opacity-100';
  const sizeClass = composer.getSize(size);
  const typeClass = composer.getType(type);
  const shapeClass = composer.getShape(shape);

  const styleClass = `${baseClasses} ${sizeClass} ${typeClass} ${shapeClass}`;
  return (
    <div className="self-start">
      <span className={styleClass}>{text}</span>
    </div>
  );
};
