import "@storybook/addon-storysource/register";

import addons from "@storybook/addons";
import { STORY_RENDERED } from "@storybook/core-events";

addons.register("TitleAddon", api => {
    api.on(STORY_RENDERED, story => {
        const storyData = api.getCurrentStoryData();
        document.title = `${storyData.kind} - ${storyData.name}`;
    });
});
