import * as React from 'react';

/* Tools */
import { validateRoute, routeValidator } from 'src/utils/permissions/roles';
import { isEmpty } from 'lodash';

/* State Management */
import { useAppSelector } from 'src/modules/Redux';
import { shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';
import {
  User as UserType,
  Permission as PermissionType,
} from 'src/generated/types';
import { AccessLevel } from 'src/utils/types';
import { useSession } from 'next-auth/react';

/**
  Get the workspace and subspace permissions:
  Should be in the format of:
  - workspace { [id]: permissionType, subspace { [id]: permissionType } },
  -

  page needs a condition that says person of permissionType can view it:
  Page's parameters are determined by the url:
  URL configuration: () => {

  }

  Check the permission type the page requires (Something like Component.permissionType).

  If it is undefined then the show the page as it is.

  if it has some kind of character, then check and see the router path:
  If the router path is

  Let there be a kind of role file:
role:
admin -> [routes1, routes2, routes3kj]

 */

const useState = () => {
  return useAppSelector(
    (state) => ({
      auth: state?.auth?.data,
    }),
    shallowEqual
  );
};

interface Props {
  children?: React.ReactNode;
  permissionTypes?: AccessLevel;
}

const keyIntoArray = <T extends object, K extends keyof T>(arr: T[], index: K) => {
  const grouped: { [key: string]: T[] } = {};
  arr.forEach((val: T) => {
    if (index in val) {
      const groupKey = val[index];
      if (typeof groupKey === 'string') {
        if (groupKey in grouped) {
          grouped[groupKey].push(val);
        } else {
          grouped[groupKey] = [val];
        }
      }
    }
  });

  return grouped;
};

const validateQueryParams = (
  queryParams: ReturnType<typeof useRouter>['query'],
  pageAccessLevels: AccessLevel,
  permissions?: NonNullable<UserType['permissions']>
) => {
  // No query params
  if (isEmpty(queryParams)) {
    return true;
  }
  // No permissions
  if (!permissions || isEmpty(permissions)) {
    return true;
  }

  const permissionByType = keyIntoArray<PermissionType, 'type'>(
    permissions,
    'type'
  );
  let hasPermission = true;

  for (const [key, value] of Object.entries(queryParams)) {
    if (key !== 'page') {
      const keyedPermission = permissionByType[key];

      const permInstance = keyedPermission.find((perm) => perm.id === value);
      // TODO: find a way to map the access level to the query parameters

      const pageKeyExists = pageAccessLevels[key];
      if (pageKeyExists && !(pageKeyExists === permInstance?.accessLevel)) {
        hasPermission = false;
      }
    }
  }

  return hasPermission;
};

const PageAuthenticator: React.FC<Props> = (props) => {
  const { status } = useSession();
  const router = useRouter();
  const state = useState();

  React.useEffect(() => {
    // This is a bug: https://stackoverflow.com/questions/72031976/isready-is-true-from-next-route-when-using-getinitialprops
    // Currently isReady is always true. Update NextJS version
    if (router.isReady && props.permissionTypes) {
      if (props.permissionTypes['page']) {
        const isPathValid = validateRoute(
          router.pathname,
          routeValidator[props.permissionTypes['page']]
        );

        const areParamsValid = validateQueryParams(
          router.query,
          props.permissionTypes,
          state.auth?.permissions || undefined
        );

        if (status === 'unauthenticated' || !(isPathValid && areParamsValid)) {
          router.push('/noaccess');
        }
      }
    }
  }, [status, props.permissionTypes, router, state.auth]);

  return <>{props.children}</>;
};

export default PageAuthenticator;
