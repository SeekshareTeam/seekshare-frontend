export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Content = {
  __typename?: 'Content';
  id?: Maybe<Scalars['ID']>;
  body?: Maybe<Scalars['String']>;
};

export type HashToken = {
  __typename?: 'HashToken';
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createContent?: Maybe<Scalars['String']>;
  createPost?: Maybe<Post>;
  createUser?: Maybe<User>;
  loginWithHash?: Maybe<HashToken>;
  createWorkspace?: Maybe<Workspace>;
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
  type: Scalars['String'];
  body: Scalars['String'];
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationLoginWithHashArgs = {
  email: Scalars['String'];
  toBeHash: Scalars['String'];
};


export type MutationCreateWorkspaceArgs = {
  name: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  post_id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  content?: Maybe<Content>;
};

export type Query = {
  __typename?: 'Query';
  fetchContent?: Maybe<Scalars['String']>;
  fetchPosts?: Maybe<Scalars['String']>;
  fetchPost?: Maybe<Post>;
  fetchAllPosts?: Maybe<Array<Maybe<Post>>>;
  subjects?: Maybe<Array<Maybe<Subject>>>;
  workspace?: Maybe<Array<Maybe<Workspace>>>;
};


export type QueryFetchPostArgs = {
  pid: Scalars['ID'];
};

export type Subject = {
  __typename?: 'Subject';
  code?: Maybe<Scalars['String']>;
  digit?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  workspaces: Array<Scalars['ID']>;
  subpsaces: Array<Scalars['ID']>;
};

export type UserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  phoneNumber?: Maybe<Scalars['Int']>;
  toBeHash: Scalars['String'];
};

export type Workspace = {
  __typename?: 'Workspace';
  id: Scalars['ID'];
  name: Scalars['String'];
  workspacePermissions: WorkspacePermissions;
};

export type WorkspacePermissions = {
  __typename?: 'WorkspacePermissions';
  view: Scalars['Boolean'];
  write: Scalars['Boolean'];
};
