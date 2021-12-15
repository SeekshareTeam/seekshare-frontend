import * as React from 'react';
import Link from 'next/Link';

function getSize(size = null) {
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

function getType(type = null) {
  switch (type) {
    case 'subspace':
      return 'bg-red-400 hover:bg-red-500 duration-300';
    case 'workspace':
      return 'bg-green-500 hover:bg-green-600 duration-300';
  }
}

function getShape(shape = null) {
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
      'rounded-sm';
  }
}

const composer = {
  getSize,
  getType,
  getShape,
};

type BadgeProps = {
  size?: string;
  type?: string;
  shape?: string;
  name?: string;
}

export const Badge: React.FC<BadgeProps> = ({ size, type, shape, name }: BadgeProps) => {
  const baseClasses =
    'inline-block font-bold text-white  hover:bg-gray-500 opacity-90 hover:opacity-100';
  const sizeClass = composer.getSize(size);
  const typeClass = composer.getType(type);
  const shapeClass = composer.getShape(shape);

  const styleClass = `${baseClasses} ${sizeClass} ${typeClass} ${shapeClass}`;
  return <div className="self-start"><span className={styleClass}>{name}</span></div>;
};
