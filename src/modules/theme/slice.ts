import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  primary: {
    color: 'green',
    main: '700',
    light: '500',
    dark: '900',
  },
  secondary: {
    color: 'yellow',
    main: '700',
    light: '500',
    dark: '900',
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    createTheme: (state) => {
      return {
        ...state,
      };
    },
  },
});

export default themeSlice.reducer;
