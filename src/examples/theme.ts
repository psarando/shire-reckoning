import {
    blue,
    blueGrey,
    cyan,
    deepOrange,
    green,
    red,
} from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const baseFonts = ["Libre Baskerville", "Georgia", "serif"];

const theme = createTheme({
    typography: {
        fontFamily: baseFonts.join(","),
    },
    palette: {
        primary: { main: blue[800] },
        secondary: { main: blueGrey[700] },
        success: { main: green[600] },
        error: { main: red[900] },
        warning: { main: deepOrange[800] },
        info: cyan,
    },
});

const scriptFontFamily = ["Fondamento", ...baseFonts].join(",");

export default theme;
export { scriptFontFamily };
