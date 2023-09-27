import { purple, yellow } from "@mui/material/colors";
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
      main: yellow[300],
      light: "#ffe98a",
      dark: "#ffdf57",
    },
    secondary: {
      main: purple[900],
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
    primary: {
      main: purple[900],
      light: "#411271",
      dark: "#0e0419",
    },
    text: {
      primary: "#fff",
      secondary: "#808080",
    },
    secondary: {
      main: yellow[300],
      light: "rgb(255,237,160)",
      dark: "#ffdf57",
    },
    background: {
      paper: "#121212",
      default: "#121212",
    },
  },
});
export default theme;
export { darkTheme };
