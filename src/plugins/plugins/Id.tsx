import React from 'react';
import { ComponentProps, createComponent } from './create_component';

import type { Editable, Saveable } from '../utils/traits';

import './Id.module.css';

interface Props extends Editable, Saveable<string> {
  code: string;
  type: keyof ComponentProps;
  flags: string;
  componentProps?: Partial<ComponentProps>;
}

const Id: React.FC<Props> = props => {
  const [edit, setEdit] = React.useState(false);
  const [body, setBody] = React.useState(props.code);

  React.useEffect(() => {
    setBody(props.code);
  }, [props.code]);

  return (
    <div>
      {props.mode === 'write' && !edit && (
        <div className="id-toolbar">
          <button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            {'Edit'}
          </button>
        </div>
      )}
      {createComponent({
        type: props.type,
        text: body,
        flags: props.flags,
        props: {
          mode: props.mode,
        },
        componentProps: props.componentProps,
      })}
      {edit && (
        <>
          <textarea
            className="id-textarea"
            autoFocus
            rows={Math.min(body.split(/\r\n|\r|\n/).length, 7)}
            value={body}
            onChange={event => setBody(event.target.value)}
          />
          <div className="id-actions">
            <button
              onClick={() => {
                setBody(props.code);
                setEdit(false);
              }}
            >
              {'Cancel'}
            </button>
            <button onClick={() => {
              props.onSubmit?.(props.id || '', body);
              setEdit(false);
            }}>{'Save'}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Id;
