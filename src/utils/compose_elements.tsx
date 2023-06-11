import { Fragment } from 'react';
import type { ComponentType, FC, ReactNode } from 'react';

type Props = { children: ReactNode };
type Component = ComponentType<Props>;

const composeElements = (...elements: Component[]): Component =>
  elements.reduce((Prev, Curr) => {
    const Root: FC<Props> = ({ children }) => (
      <Prev>
        <Curr>{children}</Curr>
      </Prev>
    );

    Root.displayName = Prev.displayName;

    return Root;
  }, Fragment);

export default composeElements;
