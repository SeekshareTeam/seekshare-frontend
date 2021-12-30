// import React from 'react';
//
// const classes = { navbar: 'flex flex-1 h-full border border-black'};
//
// const Navbar: React.FC = () => {
//   return (
//     <nav className={classes.navbar}>
//
//     </nav>
//   )
// };
import * as React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { PrimaryButton } from 'src/components/Button';
import { useAppSelector } from 'src/modules/Redux';

const Header = () => {
  const [email, setEmail] = React.useState('abhinav.bhandari@mail.mcgill.ca');
  const [password, setPassword] = React.useState('sample');
  const router = useRouter();
  console.log('in the header', router.pathname);
  if (typeof window !== 'undefined') {
    console.log('@ wd', window?.location?.href);
  }

  const reduxState = useAppSelector((state) => {
    return {
      authUser: state?.auth?.data,
    };
  });
  return (
    <div className="flex flex-row mr-4 border-2 border-green-900">
      {!reduxState.authUser && (
        <PrimaryButton
          onClick={async () => {
            router.push({ pathname: '/login', query: { callbackUrl: router.asPath } } );
            // signIn('seekshare-backend', {
            //   email,
            //   password,
            //   callbackUrl: 'http://localhost:3000',
            // });
          }}
        >
          {'Sign In'}
        </PrimaryButton>
      )}
      {reduxState.authUser && (
        <>
          <div className="self-center px-2">
            {reduxState?.authUser?.firstname +
              ' ' +
              reduxState?.authUser?.lastname}
          </div>

          <PrimaryButton
            onClick={async () => {
              signOut();
            }}
          >
            {'Sign Out'}
          </PrimaryButton>
        </>
      )}
    </div>
  );
};

export default Header;
