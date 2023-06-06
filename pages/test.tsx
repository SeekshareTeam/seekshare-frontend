import * as React from 'react';

import { runCommand } from 'src/utils/hastscript_test';

const Test: React.FC = () => {
  const [someComp, setSomeComp] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      const result = await runCommand();
      setSomeComp(result);
    })();
  }, []);

  return (
    <div>
      <h1 className="dark:text-darkpen-medium">{'Hello!!'}</h1>
      {someComp}
    </div>
  );
};

export default Test;
