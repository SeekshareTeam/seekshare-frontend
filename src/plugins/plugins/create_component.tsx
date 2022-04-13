import React from 'react';

import MultipleChoice, {
  Props as MultipleChoiceProps,
} from './multiple_choice/Component';
import Poll, { Props as PollProps } from './poll/Component';

import multipleChoiceParser from './multiple_choice/parser';
import pollParser from './poll/parser';

import { isKeyOfObject } from '../utils/types';
import type { Editable } from '../utils/traits';

export const plugins = {
  'multiple-choice': 1,
  poll: 1
};

export interface ComponentProps {
  'multiple-choice': Partial<MultipleChoiceProps>;
  poll: Partial<PollProps>;
}

export const isPlugin = (type: string): type is keyof typeof plugins =>
  isKeyOfObject(type, plugins);

interface Config {
  type: keyof typeof plugins,
  text: string,
  props: Editable,
  componentProps?: Partial<ComponentProps>,
}

export const createComponent = (config: Config) => {
  const { props, text, componentProps } = config;
  switch (config.type) {
    case 'multiple-choice':
      return (
        <MultipleChoice
          {...props}
          {...multipleChoiceParser(text)}
          {...(componentProps?.['multiple-choice'] || {})}
        />
      );
    case 'poll':
      return (
        <Poll
          {...props}
          {...pollParser(text)}
          {...(componentProps?.poll || {})}
        />
      );
    default:
      return null;
  }
};

export default createComponent;
