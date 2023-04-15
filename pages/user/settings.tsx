import * as React from 'react';

/* State Management */
import { PageWithLayout } from 'src/utils/types';

/* Components */
import ProfileManager from 'src/sections/user/Settings/ProfileManager';

const UserSettings: PageWithLayout<{}> = () => {

  const state = useState();

  console.log('@@@ state')

  return (
    <ProfileManager
      user={state?.auth}
    />
  );
};

UserSettings.accessLevel = { page: 'user' };

UserSettings.layoutType = 'general';

export default UserSettings;
