import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface CustomTheme {
      danger?: {
        super?: string;
      };
    }
  
    interface Theme extends CustomTheme {}
    interface ThemeOptions extends CustomTheme {}
  }
const theme = createTheme({
    palette:{
        primary:{
            main: "#fff",
        },  
    },
    danger:{
        super: "#f00",
    }
  });
  
export default theme;