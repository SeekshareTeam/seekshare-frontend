import { Fragment } from 'react';
import type { ComponentType, FC, ReactNode } from 'react';

type Props = { children: ReactNode };
type Component = FC<Props> | ComponentType<Props>;

const composeElements = (...elements: Component[]): Component =>
  elements.reduce<Component>((Prev, Curr) => {
    const Root: Component = ({ children }) => (
      <Prev>
        <Curr>{children}</Curr>
      </Prev>
    );

    Root.displayName = Prev.displayName;

    return Root;
  }, Fragment);

export default composeElements;
