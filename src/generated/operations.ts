import * as Types from './types';

export type CreatePostMutationVariables = Types.Exact<{
  title: Types.Scalars['String'];
  type: Types.Scalars['String'];
  body: Types.Scalars['String'];
}>;


export type CreatePostMutation = { createPost?: Types.Maybe<{ title?: Types.Maybe<string>, type?: Types.Maybe<string>, post_id?: Types.Maybe<string>, content?: Types.Maybe<{ body?: Types.Maybe<string>, id?: Types.Maybe<string> }> }> };

export type FetchPostQueryVariables = Types.Exact<{
  pid: Types.Scalars['ID'];
}>;


export type FetchPostQuery = { fetchPost?: Types.Maybe<{ title?: Types.Maybe<string>, type?: Types.Maybe<string>, post_id?: Types.Maybe<string>, content?: Types.Maybe<{ id?: Types.Maybe<string>, body?: Types.Maybe<string> }> }> };

export type SubjectsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SubjectsQuery = { subjects?: Types.Maybe<Array<Types.Maybe<{ code?: Types.Maybe<string>, digit?: Types.Maybe<string>, name?: Types.Maybe<string> }>>> };


export type QueryVariablesUnion = undefined | FetchPostQueryVariables | SubjectsQueryVariables;
