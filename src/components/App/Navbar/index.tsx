import * as React from 'react';
import * as yup from 'yup';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, DropdownButton } from 'src/components/Button';
import { useAppSelector } from 'src/modules/Redux';
import { IconChevronDown, IconMenu2, IconSearch } from '@tabler/icons';
import { Modal } from 'src/components/Modal';
import { SubspaceForm } from 'src/components/Subspace';

import Dropdown from 'src/components/Dropdown';
import InputSearch from 'src/components/Input/Search';

type NavbarProps = {
  sidebarToggle: boolean;
  setSidebarToggle: (val: boolean) => void;
};

const Navbar = (props: NavbarProps) => {
  const [showSubspaceForm, setShowSubspaceForm] = React.useState(false);
  const [hideSignIn, setHideSignIn] = React.useState(false);

  const dropdownRef = React.useRef(null);
  const router = useRouter();

  React.useEffect(() => {
    if (router.pathname === '/login') {
      setHideSignIn(true);
    } else {
      if (hideSignIn) {
        setHideSignIn(false);
      }
    }
  }, [router.pathname]);

  const reduxState = useAppSelector((state) => {
    return {
      authUser: state?.auth?.data,
    };
  });

  const tagValidationSchema = yup.object().shape({
    tagName: yup
      .string()
      .min(2, 'Too short')
      .max(50, 'Too Long!')
      .required('Required!'),
  });

  // const searchTagsQueryCallback = React.useCallback(
  //   async (val, onEnter = false) => {
  //     /*
  //        TODO: Write in a functionality that onEnter
  //        the debounce function should search for a tag
  //        that already exists based on the EXACT value
  //        If it does exist, then pass in the value from here.
  //      */
  //     if (val === '') {
  //       setSearchedTags([]);
  //     } else {
  //       if (onEnter) {
  //         // This should also be in the top section
  //         // await searchExactTagQuery({
  //         //   variables: { queryString: val },
  //         // });
  //       } else {
  //         await searchTagsQuery({
  //           variables: { queryString: val },
  //         });
  //       }
  //     }
  //   },
  //   [searchTagsQuery]
  // );

  const searchQueryCallback = async (val: string) => {
    console.log(val);
  };

  // const submissionCallback = () => {};

  const onBlurCallback = () => {};

  const onFocusCallback =  () => {};

  return (
    <div className="flex flex-1 bg-night-medium">
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
              <SubspaceForm
                workspaceId={reduxState?.authUser?.currentWorkspace || ''}
                onSubmit={() => {
                  setShowSubspaceForm(false);
                }}
              />
            </Modal>

            <button
              onClick={() => {
                props.setSidebarToggle(!props.sidebarToggle);
              }}
              className="sm:hidden hover:bg-gray-100 rounded-lg"
            >
              <IconMenu2 size={36} stroke={1} color={'red'} />
            </button>
            <Button
              variant={'primary'}
              size={'small'}
              onClick={() => {
                setShowSubspaceForm(true);
              }}
            >
              {'Add Subspaces'}
            </Button>
          </>
        )}
      </div>
      <div className="flex flex-1 h-full items-center justify-center">
        <InputSearch
          validationSchema={tagValidationSchema}
          searchQueryCallback={searchQueryCallback}
          onBlurCallback={onBlurCallback}
          onFocusCallback={onFocusCallback}
          labelName={'searchContent'}
          inputPlaceholder={'Search for...'}
          leftNode={<IconSearch size={24} />}
          labelTitle={''}
        />
      </div>
      <div className="flex flex-1 h-full justify-end">
        <div className="flex flex-row mr-4">
          {!reduxState.authUser && !hideSignIn && (
            <Button
              className="text-lightpen-medium hover:text-lightpen-dark transition-all duration-200 dark:text-darkpen-dark dark:hover:text-darkpen-light"
              onClick={async () => {
                router.push({
                  pathname: '/login',
                  query: { callbackUrl: router.asPath },
                });
              }}
            >
              {'Sign In'}
            </Button>
          )}
          {reduxState.authUser && (
            <>
              <Dropdown
                position={'above'}
                dropdownRef={dropdownRef}
                dropdownButton={
                  <DropdownButton ref={dropdownRef}>
                    <span className={'pr-0.5'}>{'Trial'}</span>
                    <IconChevronDown size={16} />
                  </DropdownButton>
                }
                horizontalPosition={'left'}
              />
              <div className="self-center px-2">
                {reduxState?.authUser?.firstname +
                  ' ' +
                  reduxState?.authUser?.lastname}
              </div>

              <Button
                variant={'primary'}
                size={'small'}
                onClick={async () => {
                  signOut({ redirect: false });
                }}
              >
                {'Sign Out'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
