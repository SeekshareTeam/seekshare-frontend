import * as React from 'react';
import * as yup from 'yup';

/* State Management & Functions */
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useAppSelector } from 'src/modules/Redux';
import { keyBy } from 'lodash';
import { useSearchInSubspaceLazyQuery } from 'src/generated/apollo';

/* Components */
import { Button } from 'src/components/Button';
import { IconChevronDown, IconMenu2, IconSearch } from '@tabler/icons';
import { Modal } from 'src/components/Modal';
import { SubspaceForm } from 'src/components/Subspace';
import Dropdown, {
  DropdownOption as DropdownOptionType,
} from 'src/components/Dropdown';
import InputSearch from 'src/components/Input/Search';
import UserLabelDropdown from 'src/sections/user/UserLabel/Dropdown';

type NavbarProps = {
  sidebarToggle: boolean;
  setSidebarToggle: (val: boolean) => void;
};

const Navbar = (props: NavbarProps) => {
  const [showSubspaceForm, setShowSubspaceForm] = React.useState(false);
  const [hideSignIn, setHideSignIn] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState('subspace');
  const [searchMode, setSearchMode] = React.useState<'subspace' | 'general'>(
    'general'
  );

  const [
    searchInSubspaceQuery,
    // {
    //   data: subspaceSearchData,
    //   loading: subspaceSearchLoading,
    //   error: subspaceSearchError,
    // },
  ] = useSearchInSubspaceLazyQuery();

  const dropdownRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const options = [
    { text: 'Subspace', type: 'subspace', href: '', id: '' },
    { text: 'Posts', type: 'posts', href: '', id: '' },
    { text: 'Q + A', type: 'qna', href: '', id: '' },
    { text: 'Question Bank', type: 'question_bank', href: '', id: '' },
  ];

  const keyedOptions = keyBy(options, 'type');

  React.useEffect(() => {
    if (dropdownRef?.current) {
      dropdownRef.current.onmousedown = () => {
        setShowDropdown(!showDropdown);
      };
    }
  }, [showDropdown]);

  React.useEffect(() => {
    if (router.pathname === '/login') {
      setHideSignIn(true);
    } else if (router.pathname.includes('/workspace/')) {
      setSearchMode('subspace');
    } else {
      if (hideSignIn) {
        setHideSignIn(false);
      }
    }
  }, [router.pathname]);

  const reduxState = useAppSelector((state) => {
    return {
      authUser: state?.auth?.data,
      subspace: state?.subspace?.server,
    };
  });

  const tagValidationSchema = yup.object().shape({
    tagName: yup
      .string()
      .min(2, 'Too short')
      .max(50, 'Too Long!')
      .required('Required!'),
  });

  const searchBarSubspace = () => {
    return (
      <>
        <Dropdown
          dropdownRef={dropdownRef}
          dropdownButton={
            <Button
              className="w-32 justify-between"
              type="button"
              variant={null}
              ref={dropdownRef}
            >
              {keyedOptions[selectedOption]?.text}
              <IconChevronDown size={16} />
            </Button>
          }
          abstractControl={true}
          abstractShow={showDropdown}
          bgColor={{
            dark: 'bg-night-dark',
            medium: 'bg-night-medium',
            light: 'bg-night-light',
          }}
          optionList={options}
          onOptionClick={(val: DropdownOptionType) => {
            if (val?.type) {
              setSelectedOption(val.type);
            }
          }}
          position={'above'}
          horizontalPosition={'left'}
        />
      </>
    );
  };

  const searchBarGeneral = () => {
    return null;
  };

  const searchBarOptions = () => {
    if (searchMode === 'subspace') {
      return searchBarSubspace();
    } else {
      return searchBarGeneral();
    }
  };

  const searchQueryCallback = async (val: string) => {
    /**
     * Pass the option to the back-end
     */
    await searchInSubspaceQuery({
      variables: {
        searchInput: {
          search: val,
          workspaceId: reduxState?.subspace?.workspaceId,
          option: selectedOption,
          pageNumber: 0,
        },
      },
    });
  };

  const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('eee', e.target, e.currentTarget);
    if (!(e.relatedTarget === dropdownRef?.current)) {
      setShowDropdown(false);
    }
  };

  const onFocusCallback = () => {};

  return (
    <div className="flex flex-1 bg-night-dark">
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
            {/*<Button
              variant={'primary'}
              size={'small'}
              onClick={() => {
                setShowSubspaceForm(true);
              }}
            >
              {'Add Subspaces'}
              </Button>*/}
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
          leftNode={searchBarOptions()}
          rightNode={<IconSearch size={24} />}
          labelTitle={''}
          className={'flex-1'}
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
            <div className="flex items-center justify-center">
              <UserLabelDropdown name={reduxState.authUser.fullname || ''} imgUrl={reduxState?.authUser?.avatar || ''} />
              <Button
                size={'small'}
                variant={null}
                onClick={async () => {
                  signOut({ redirect: false });
                }}
              >
                {'Sign Out'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
