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
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { PrimaryButton, DropdownButton } from 'src/components/Button';
import { useAppSelector } from 'src/modules/Redux';
import { IconChevronDown, IconMenu2 } from '@tabler/icons';
import { Modal } from 'src/components/Modal';
import { WorkspaceForm } from 'src/components/Workspace/Form';
import { SubspaceForm } from 'src/components/Subspace';

import Dropdown from 'src/components/Dropdown';

type NavbarProps = {
  sidebarToggle: boolean;
  setSidebarToggle: (val: boolean) => void;
};

const Navbar = (props: NavbarProps) => {
  const [showWorkspaceForm, setShowWorkspaceForm] = React.useState(false);
  const [showSubspaceForm, setShowSubspaceForm] = React.useState(false);

  const dropdownRef = React.useRef(null);
  const router = useRouter();

  const reduxState = useAppSelector((state) => {
    return {
      authUser: state?.auth?.data,
    };
  });

  return (
    <>
      <div className="flex flex-1 h-full justify-start">
        {reduxState.authUser && (
          <>
            <Modal
              blurBackground={false}
              show={showSubspaceForm}
              onPressBlur={() => {
                setShowSubspaceForm(false);
              }}
            >
              <SubspaceForm />
            </Modal>

            <button
              onClick={() => {
                props.setSidebarToggle(!props.sidebarToggle);
              }}
              className="hover:bg-gray-100 rounded-lg"
            >
              <IconMenu2 size={36} stroke={1} color={'red'}  />
            </button>
            <PrimaryButton
              size={'small'}
              onClick={() => {
                setShowSubspaceForm(true);
              }}
            >
              {'Add Subspaces'}
            </PrimaryButton>
          </>
        )}
      </div>
      <div className="flex flex-1 h-full justify-end">
        <div className="flex flex-row mr-4">
          {!reduxState.authUser && (
            <button
              className="bg-white text-pink-500 hover:text-pink-900 transition-all duration-500"
              onClick={async () => {
                router.push({
                  pathname: '/login',
                  query: { callbackUrl: router.asPath },
                });
              }}
            >
              {'Sign In'}
            </button>
          )}
          {reduxState.authUser && (
            <PrimaryButton
              size={'small'}
              onClick={() => {
                console.log(showWorkspaceForm);
                setShowWorkspaceForm(true);
              }}
            >
              {'Create Workspace'}
            </PrimaryButton>
          )}
          {reduxState.authUser && (
            <>
              <Modal
                blurBackground={false}
                show={showWorkspaceForm}
                onPressBlur={() => {
                  setShowWorkspaceForm(false);
                }}
              >
                <WorkspaceForm />
              </Modal>
              <Dropdown
                dropdownRef={dropdownRef}
                dropdownButton={
                  <DropdownButton ref={dropdownRef}>
                    <span className={'pr-0.5'}>{'Trial'}</span>
                    <IconChevronDown size={16} />
                  </DropdownButton>
                }
              />
              <div className="self-center px-2">
                {reduxState?.authUser?.firstname +
                  ' ' +
                  reduxState?.authUser?.lastname}
              </div>

              <PrimaryButton
                size={'small'}
                onClick={async () => {
                  signOut({ redirect: false });
                }}
              >
                {'Sign Out'}
              </PrimaryButton>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
