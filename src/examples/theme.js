import { blue, green } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const baseFonts = ["Libre Baskerville", "Georgia", "serif"];

const theme = createMuiTheme({
    typography: {
        fontFamily: baseFonts.join(","),
    },
    palette: {
        primary: blue,
        secondary: green,
    },
});

const scriptFontFamily = ["Fondamento", ...baseFonts].join(",");

export default theme;
export { scriptFontFamily };
