import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}

export const SubjectsDocument = gql`
    query subjects {
  subjects {
    code
    digit
    name
  }
}
    `;

/**
 * __useSubjectsQuery__
 *
 * To run a query within a React component, call `useSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSubjectsQuery(baseOptions?: Apollo.QueryHookOptions<Types.SubjectsQuery, Types.SubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SubjectsQuery, Types.SubjectsQueryVariables>(SubjectsDocument, options);
      }
export function useSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SubjectsQuery, Types.SubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SubjectsQuery, Types.SubjectsQueryVariables>(SubjectsDocument, options);
        }
export type SubjectsQueryHookResult = ReturnType<typeof useSubjectsQuery>;
export type SubjectsLazyQueryHookResult = ReturnType<typeof useSubjectsLazyQuery>;
export type SubjectsQueryResult = Apollo.QueryResult<Types.SubjectsQuery, Types.SubjectsQueryVariables>;

export type SubjectsLazyQueryFunction = typeof useSubjectsLazyQuery;

export type QueryFunctionsUnion = SubjectsLazyQueryFunction;
