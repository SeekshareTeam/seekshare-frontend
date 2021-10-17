import * as Types from './types';

export type SubjectsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SubjectsQuery = { subjects?: Types.Maybe<Array<Types.Maybe<{ code?: Types.Maybe<string>, digit?: Types.Maybe<string>, name?: Types.Maybe<string> }>>> };


export type QueryVariablesUnion = undefined | SubjectsQueryVariables;
