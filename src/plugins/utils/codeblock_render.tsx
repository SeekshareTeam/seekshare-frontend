import React from 'react';
import type { CodeComponent } from 'react-markdown/lib/ast-to-react';

import Id from '../plugins/Id';
import {
  ComponentProps,
  createComponent,
  isPlugin,
} from '../plugins/create_component';

import type { Editable, Saveable } from './traits';
import type { SavedComponents } from './types';

const defaultComponent = (
  className: string,
  props: {},
  children: React.ReactNode,
) => (
  <pre>
    <code className={className} {...props}>
      {children}
    </code>
  </pre>
);

const codeblockTypeRegex = /language-([\w-]+)/;

interface Config extends Editable {
  componentProps?: Partial<ComponentProps>;
  savedComponents?: SavedComponents<keyof ComponentProps>;
  onSaveComponent: Saveable<string>['onSubmit'];
}

type CodeProps = NonNullable<CodeComponent['defaultProps']>;

const codeblockRender = (config: Config) => (args: CodeProps) => {
  const { node, inline, className, children, ...props } = args;

  const type = codeblockTypeRegex.exec(className || '')?.[1];
  const body = children?.[0];

  if (type === 'id') {
    const id = (node?.data?.meta || '') as string;
    const savedComponent = config.savedComponents?.[id];
    if (!savedComponent) {
      return defaultComponent(
        className || '',
        props,
        `Cannot find saved component with id ${id}`,
      );
    }

    return (
      <Id
        {...savedComponent}
        mode={config.mode}
        componentProps={config.componentProps}
        onSubmit={config.onSaveComponent}
      />
    );
  }

  if (inline || !type || !isPlugin(type) || typeof body !== 'string') {
    return defaultComponent(className || '', props, children);
  }

  try {
    const Component = createComponent({
      type,
      text: body,
      props: {
        mode: config.mode,
      },
      componentProps: config.componentProps,
    });

    return Component;
  } catch (err) {
    if (err instanceof Error) {
      return defaultComponent(className || '', props, err.message);
    }
  }

  return null;
};

export type { ComponentProps };

export default codeblockRender;
