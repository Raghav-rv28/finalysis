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
            main: "#ffe98a",
            light: "#fff3bd",
            dark: "#ffdf57",
        },
        secondary:{
          main: "#280b45",
          light: "#411271",
          dark: "#0e0419",
        }  
    },
    danger:{
        super: "#f00",
    }
  });
  
export default theme;