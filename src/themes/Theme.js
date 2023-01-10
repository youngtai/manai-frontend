import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#455a64',
      dark: '#263238',
    },
    secondary: {
      main: '#546e7a',
      dark: '#212121',
    },
  },
});