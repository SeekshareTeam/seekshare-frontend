import * as React from 'react';

import { ApolloError } from '@apollo/client';

interface Props {
  error?: ApolloError;

  errorComponent: (message: string) => React.ReactNode;
}

const ErrorMessage: React.FC<Props> = (props) => {
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    if (props.error) {
      const errorMessages =
        props.error?.graphQLErrors
          ?.filter((gqlErr) => gqlErr?.extensions?.showClient)
          ?.map((gqlErr) => gqlErr.message) || [];
      setMessage(errorMessages.join('\n'));
    }
  }, [props.error]);


  /**
   * Think about this. We might want to just make it conditional on the outside
   */
  if (!message) {
    return null;
  }

  return (
    <div className="inline-flex flex-row items-start">
      {props.errorComponent(message)}
    </div>
  );
};

export default ErrorMessage;
