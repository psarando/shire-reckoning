import { addParameters, configure } from "@storybook/react";
import { create } from "@storybook/theming";

const theme = create({
    base: "light",

    brandTitle: "Shire Reckoning",
    brandUrl: "https://psarando.github.io/shire-reckoning/",
});

addParameters({
    options: {
        hierarchySeparator: /[:/]/,
        showPanel: true,
        theme,
    },
});

function loadStories() {
    // const req = require.context("../src/examples", true, /\.jsx?$/);
    // req.keys().forEach(filename => req(filename));

    // Manually order stories for now...
    require("../src/examples/TolkienCalendars");

    require("../src/examples/simulation/TolkienCalendars");

    require("../src/examples/ICalendarGenerator");

    require("../src/examples/shire/year-view/side-by-side");
    require("../src/examples/shire/year-view/javascript/tolkien");
    require("../src/examples/shire/year-view/javascript/shire");
    require("../src/examples/shire/year-view/javascript/bree");
    require("../src/examples/shire/year-view/jsx/tolkien");
    require("../src/examples/shire/year-view/jsx/shire");
    require("../src/examples/shire/year-view/jsx/bree");

    require("../src/examples/shire/month-view/side-by-side");
    require("../src/examples/shire/month-view/javascript/tolkien");
    require("../src/examples/shire/month-view/javascript/shire");
    require("../src/examples/shire/month-view/javascript/bree");
    require("../src/examples/shire/month-view/jsx/tolkien");
    require("../src/examples/shire/month-view/jsx/shire");
    require("../src/examples/shire/month-view/jsx/bree");

    require("../src/examples/shire/month-view-horizontal/side-by-side");
    require("../src/examples/shire/month-view-horizontal/javascript/tolkien");
    require("../src/examples/shire/month-view-horizontal/javascript/shire");
    require("../src/examples/shire/month-view-horizontal/javascript/bree");
    require("../src/examples/shire/month-view-horizontal/jsx/tolkien");
    require("../src/examples/shire/month-view-horizontal/jsx/shire");
    require("../src/examples/shire/month-view-horizontal/jsx/bree");

    require("../src/examples/shire/new-years-day-sync/side-by-side");
    require("../src/examples/shire/new-years-day-sync/javascript/tolkien");
    require("../src/examples/shire/new-years-day-sync/javascript/shire");
    require("../src/examples/shire/new-years-day-sync/javascript/bree");
    require("../src/examples/shire/new-years-day-sync/jsx/tolkien");
    require("../src/examples/shire/new-years-day-sync/jsx/shire");
    require("../src/examples/shire/new-years-day-sync/jsx/bree");

    require("../src/examples/shire/traditional-rules/side-by-side");
    require("../src/examples/shire/traditional-rules/javascript/ta1300");
    require("../src/examples/shire/traditional-rules/javascript/ta1601");
    require("../src/examples/shire/traditional-rules/javascript/ta3019");
    require("../src/examples/shire/traditional-rules/jsx/ta1300");
    require("../src/examples/shire/traditional-rules/jsx/ta1601");
    require("../src/examples/shire/traditional-rules/jsx/ta3019");

    require("../src/examples/gondor/year-view/side-by-side");
    require("../src/examples/gondor/year-view/javascript/kings");
    require("../src/examples/gondor/year-view/javascript/stewards");
    require("../src/examples/gondor/year-view/javascript/new");
    require("../src/examples/gondor/year-view/jsx/kings");
    require("../src/examples/gondor/year-view/jsx/stewards");
    require("../src/examples/gondor/year-view/jsx/new");

    require("../src/examples/gondor/month-view/side-by-side");
    require("../src/examples/gondor/month-view/javascript/kings");
    require("../src/examples/gondor/month-view/javascript/stewards");
    require("../src/examples/gondor/month-view/javascript/new");
    require("../src/examples/gondor/month-view/jsx/kings");
    require("../src/examples/gondor/month-view/jsx/stewards");
    require("../src/examples/gondor/month-view/jsx/new");

    require("../src/examples/gondor/month-view-horizontal/side-by-side");
    require("../src/examples/gondor/month-view-horizontal/javascript/kings");
    require("../src/examples/gondor/month-view-horizontal/javascript/stewards");
    require("../src/examples/gondor/month-view-horizontal/javascript/new");
    require("../src/examples/gondor/month-view-horizontal/jsx/kings");
    require("../src/examples/gondor/month-view-horizontal/jsx/stewards");
    require("../src/examples/gondor/month-view-horizontal/jsx/new");

    require("../src/examples/gondor/new-years-day-sync/side-by-side");
    require("../src/examples/gondor/new-years-day-sync/javascript/kings");
    require("../src/examples/gondor/new-years-day-sync/javascript/stewards");
    require("../src/examples/gondor/new-years-day-sync/javascript/new");
    require("../src/examples/gondor/new-years-day-sync/jsx/kings");
    require("../src/examples/gondor/new-years-day-sync/jsx/stewards");
    require("../src/examples/gondor/new-years-day-sync/jsx/new");

    require("../src/examples/gondor/traditional-rules/side-by-side");
    require("../src/examples/gondor/traditional-rules/javascript/sa32");
    require("../src/examples/gondor/traditional-rules/javascript/ta2060");
    require("../src/examples/gondor/traditional-rules/javascript/ta3019");
    require("../src/examples/gondor/traditional-rules/jsx/sa32");
    require("../src/examples/gondor/traditional-rules/jsx/ta2060");
    require("../src/examples/gondor/traditional-rules/jsx/ta3019");

    require("../src/examples/rivendell/historic/side-by-side");
    require("../src/examples/rivendell/historic/javascript/sa1697");
    require("../src/examples/rivendell/historic/javascript/ta2941");
    require("../src/examples/rivendell/historic/javascript/ta3018");
    require("../src/examples/rivendell/historic/jsx/sa1697");
    require("../src/examples/rivendell/historic/jsx/ta2941");
    require("../src/examples/rivendell/historic/jsx/ta3018");

    require("../src/examples/rivendell/year-view/side-by-side");
    require("../src/examples/rivendell/year-view/javascript/default");
    require("../src/examples/rivendell/year-view/javascript/reformed-3-25");
    require("../src/examples/rivendell/year-view/javascript/reformed-3-29");
    require("../src/examples/rivendell/year-view/jsx/default");
    require("../src/examples/rivendell/year-view/jsx/reformed-3-25");
    require("../src/examples/rivendell/year-view/jsx/reformed-3-29");

    require("../src/examples/rivendell/season-view/side-by-side");
    require("../src/examples/rivendell/season-view/javascript/default");
    require("../src/examples/rivendell/season-view/javascript/reformed-3-25");
    require("../src/examples/rivendell/season-view/javascript/reformed-3-20");
    require("../src/examples/rivendell/season-view/jsx/default");
    require("../src/examples/rivendell/season-view/jsx/reformed-3-25");
    require("../src/examples/rivendell/season-view/jsx/reformed-3-20");
}

configure(loadStories, module);
