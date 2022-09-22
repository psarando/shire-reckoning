import { create } from "@storybook/theming";
import { addons } from "@storybook/addons";

const theme = create({
    base: "light",

    brandTitle: "Shire Reckoning",
    brandUrl: "https://psarando.github.io/shire-reckoning/",
});

addons.setConfig({
    theme,
});
