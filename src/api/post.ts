
// import { useCustomMutation } from 'src/modules/Redux';

// import {
//   useCreateTagMutation
// } from 'src/generated/apollo';

const api = () => {
  console.log('api post')
};

export type PostApiType = typeof api;

export type PostApiResultType = ReturnType<PostApiType>;

export default api;
