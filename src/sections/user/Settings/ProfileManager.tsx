import * as React from 'react';

/* State Management & APIs */
import { useAppSelector } from 'src/modules/Redux';

/* Components */
import ProfileForm from './ProfileForm';

interface LayoutProps {
  headerTitle: React.ReactNode;
  profileForm: React.ReactNode;
}

const ProfileManagerLayout: React.FC<LayoutProps> = (props) => {
  return (
    <div
      id={'profile-manager'}
      className="mx-32 h-4/5 md:w-3/5 dark:bg-nord-1 box-border flex flex-wrap overflow-y-auto"
    >
      {props.headerTitle}
      <div className="flex flex-col flex-1">{props.profileForm}</div>
    </div>
  );
};

const useState = () => {
  return useAppSelector((state) => ({
    auth: state?.auth?.data,
  }));
};

const ProfileManager: React.FC = () => {
  const state = useState();

  return (
    <ProfileManagerLayout
      headerTitle={
        <h1
          className={'p-2 overflow-hidden w-full text-2xl text-nord-0 dark:text-nord-6'}
        >
          {'Edit Your Profile'}
        </h1>
      }
      profileForm={<ProfileForm user={state.auth} />}
    />
  );
};

export default ProfileManager;
