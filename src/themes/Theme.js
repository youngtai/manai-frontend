import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#37474f',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#78909c',
    },
    secondary: {
      main: '#f50057',
    },
  },
});