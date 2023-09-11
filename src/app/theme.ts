import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CustomTheme {
    danger?: {
      super?: string;
    };
  }

  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}
const theme = createTheme({
  palette: {
    primary: {
      main: "#ffe98a",
      light: "rgb(255,237,160)",
      dark: "#ffdf57",
    },
    secondary: {
      main: "#280b45",
      light: "#411271",
      dark: "#0e0419",
    },
    background: {
      paper: "#fff",
      default: "#fff",
    },
  },
  danger: {
    super: "#f00",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#ffe98a",
      light: "rgb(255,237,160)",
      dark: "#ffdf57",
    },
    primary: {
      main: "#280b45",
      light: "#411271",
      dark: "#0e0419",
    },
    background: {
      paper: "#121212",
      default: "#121212",
    },
  },
});
export default theme;
export { darkTheme };
