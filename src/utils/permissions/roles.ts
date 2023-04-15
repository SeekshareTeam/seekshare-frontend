import { get, set } from 'lodash';

const userRoutes = [
  '/user/dashboard',
  '/user/settings'
];

const adminRoutes = [
  '/workspace/[workspace]/settings',
  ...userRoutes
  // The rest of the routes are for testing
  // '/workspace/[workspace]/settings/blah/blah/blah',
  // '/workspace/[workspace]/settings/test1',
  // '/workspace/[workspace]/*',
  // '/workspace/[workspace]/settings/test1/test3',
  // '/subspace/settings',
];

// const sampleRoute = '/workspace/[workspace333]/settings/test2';
// const sampleRoute2 = '/workspace/[workspace]/settings/test1';
// const sampleRoute3 = '/workspace/[workspace]/';
// const sampleRoute4 = '/workspace/[workspace]/settings/test5';

type RouteValidatorType = {
  [key: string]: RouteValidatorType | boolean;
};

const stringSplice = function (
  val: string,
  idx: number,
  rem: number,
  str: string
): string {
  return val.slice(0, idx) + str + val.slice(idx + Math.abs(rem));
};

// const roles = {
//   admin: adminRoutes,
// };

const extendCurrentPath = (
  currentPath: string,
  directory: string,
  delimitter = '.'
) => {
  /**
   * Extends the path provided with a new directory
   */
  if (currentPath) {
    currentPath += delimitter + directory;
  } else {
    currentPath = directory;
  }

  return currentPath;
};

const replaceRouteParam = (directory: string, param = '*'): string => {
  // Check if the first and last character are square brackets. [ ]
  // Replace them with param variable. Default is *
  if (directory[0] === '[' && directory[directory.length - 1] === ']') {
    directory = stringSplice(directory, directory.length - 1, 1, param);
    directory = stringSplice(directory, 0, 1, param);
  }

  return directory;
};

const routeSplitter = (route: string, delimitter = '/'): string[] => {
  return route.split(delimitter).filter((val) => val !== '');
};

const isObject = (val: RouteValidatorType | boolean): boolean => {
  if (typeof val === 'object' && !Array.isArray(val) && val !== null) {
    return true;
  } else {
    return false;
  }
};

const routeIterator = (
  routeByDir: string[],
  routeValidator: RouteValidatorType,
  endOfRouteCallback: (
    path: string,
    child: RouteValidatorType | boolean,
    routeValidator: RouteValidatorType
  ) => void
): boolean => {
  let remainingPathIsVerified = false;
  let currentPath: string = '';

  routeByDir.forEach((directory) => {
    if (!remainingPathIsVerified) {
      directory = replaceRouteParam(directory);

      currentPath = extendCurrentPath(currentPath, directory, '.');

      // Come back to this and check the type
      const childDirectory: RouteValidatorType | boolean | undefined = get(
        routeValidator,
        currentPath
      );

      // Somewhere else should throw an error for if the path is
      if (
        isObject(childDirectory) &&
        typeof childDirectory !== 'boolean' &&
        childDirectory['*']
      ) {
        remainingPathIsVerified = true;
      } else {
        endOfRouteCallback(currentPath, childDirectory, routeValidator);
      }
    }
  });

  return true;
};

const convertRoutesToValidator = (
  routesArray: string[],
  routeValidator = {}
) => {
  routesArray.map((route) => {
    const splitByDirectory: string[] = routeSplitter(route);

    const endOfRouteCallback = function (
      currentPath: string,
      childDirectory: RouteValidatorType | boolean,
      routeValidator: RouteValidatorType
    ) {
      if (!childDirectory) {
        set(routeValidator, currentPath, true);
      }
    };

    routeIterator(splitByDirectory, routeValidator, endOfRouteCallback);
  });

  return routeValidator;
};

export const validateRoute = (route: string, routeValidator: RouteValidatorType) => {
  let isPathValid = false;
  const splitByDirectory = routeSplitter(route);

  const endOfRouteCallback = (
    _: string,
    childDirectory: RouteValidatorType | boolean
  ) => {
    if (!childDirectory) {
      throw new Error('Subroute not valid.');
    }
  };


  try {
    isPathValid = routeIterator(
      splitByDirectory,
      routeValidator,
      endOfRouteCallback
    );
  } catch {
    isPathValid = false;
  }

  return isPathValid;
};

const adminRouteValidator = convertRoutesToValidator(adminRoutes);
const userRouteValidator = convertRoutesToValidator(userRoutes);

export const routeValidator = {
  'admin': adminRouteValidator,
  'user': userRouteValidator,
}
