import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}

export const CreatePostDocument = gql`
    mutation createPost($title: String!, $type: String!, $body: String!) {
  createPost(title: $title, type: $type, body: $body) {
    title
    type
    post_id
    content {
      body
      id
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<Types.CreatePostMutation, Types.CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      type: // value for 'type'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreatePostMutation, Types.CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreatePostMutation, Types.CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<Types.CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<Types.CreatePostMutation, Types.CreatePostMutationVariables>;
export const FetchPostDocument = gql`
    query fetchPost($pid: ID!) {
  fetchPost(pid: $pid) {
    title
    type
    post_id
    content {
      id
      body
    }
  }
}
    `;

/**
 * __useFetchPostQuery__
 *
 * To run a query within a React component, call `useFetchPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPostQuery({
 *   variables: {
 *      pid: // value for 'pid'
 *   },
 * });
 */
export function useFetchPostQuery(baseOptions: Apollo.QueryHookOptions<Types.FetchPostQuery, Types.FetchPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.FetchPostQuery, Types.FetchPostQueryVariables>(FetchPostDocument, options);
      }
export function useFetchPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.FetchPostQuery, Types.FetchPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.FetchPostQuery, Types.FetchPostQueryVariables>(FetchPostDocument, options);
        }
export type FetchPostQueryHookResult = ReturnType<typeof useFetchPostQuery>;
export type FetchPostLazyQueryHookResult = ReturnType<typeof useFetchPostLazyQuery>;
export type FetchPostQueryResult = Apollo.QueryResult<Types.FetchPostQuery, Types.FetchPostQueryVariables>;
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

export type FetchPostLazyQueryFunction = typeof useFetchPostLazyQuery;
export type SubjectsLazyQueryFunction = typeof useSubjectsLazyQuery;

export type QueryFunctionsUnion = FetchPostLazyQueryFunction | SubjectsLazyQueryFunction;
