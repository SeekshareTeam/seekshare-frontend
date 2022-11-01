import React from 'react';

import MultipleChoice, {
  Props as MultipleChoiceProps,
} from './multiple_choice/Component';
import Poll, { Props as PollProps } from './poll/Component';
import OpenResponse, {
  Props as OpenResponseProps,
} from './open_response/Component';

import multipleChoiceParser from './multiple_choice/parser';
import pollParser from './poll/parser';
import openResponseParser from './open_response/parser';

import { isKeyOfObject } from '../utils/types';
import type { Editable } from '../utils/traits';

export const plugins = {
  'multiple-choice': 1,
  poll: 1,
  'open-response': 1,
};

export interface ComponentProps {
  'multiple-choice': Partial<MultipleChoiceProps>;
  poll: Partial<PollProps>;
  'open-response': Partial<OpenResponseProps>;
}

export const isPlugin = (type: string): type is keyof typeof plugins =>
  isKeyOfObject(type, plugins);

interface Config {
  type: keyof typeof plugins;
  text: string;
  flags: string;
  props: Editable;
  componentProps?: Partial<ComponentProps>;
}

export const createComponent = (config: Config) => {
  const { props, flags, text, componentProps } = config;
  switch (config.type) {
    case 'multiple-choice':
      return (
        <MultipleChoice
          {...props}
          {...multipleChoiceParser(text, flags)}
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
    case 'open-response':
      return (
        <OpenResponse
          {...props}
          {...openResponseParser(text)}
          {...(componentProps?.['open-response'] || {})}
        />
      );
    default:
      return null;
  }
};

export default createComponent;
