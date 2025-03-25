const path = require("path");

module.exports = {
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    // Use story store v6 for now,
    // since indexer not finding non-stories.js files,
    // and show/hide addon panel not working.
    features: {
        storyStoreV7: false,
    },
    staticDirs: ["../public/examples"],
    addons: [
        {
            name: "@storybook/addon-storysource",
            options: {
                rule: {
                    test: /\.jsx?$/,
                    include: path.resolve(__dirname, "../src/examples"),
                },
                loaderOptions: {
                    prettierConfig: {
                        tabWidth: 4,
                        trailingComma: "es5",
                    },
                },
            },
        },
    ],

    // Manually order stories for now...
    stories: [
        "../src/examples/TolkienCalendars.tsx",

        "../src/examples/simulation/TolkienCalendars.tsx",

        "../src/examples/ICalendarGenerator.tsx",

        "../src/examples/simulation/history-perspective-table.js",

        "../src/examples/shire/year-view/side-by-side.js",
        "../src/examples/shire/year-view/javascript/tolkien.js",
        "../src/examples/shire/year-view/javascript/shire.js",
        "../src/examples/shire/year-view/javascript/bree.js",
        "../src/examples/shire/year-view/jsx/tolkien.js",
        "../src/examples/shire/year-view/jsx/shire.js",
        "../src/examples/shire/year-view/jsx/bree.js",

        "../src/examples/shire/month-view/side-by-side.js",
        "../src/examples/shire/month-view/javascript/tolkien.js",
        "../src/examples/shire/month-view/javascript/shire.js",
        "../src/examples/shire/month-view/javascript/bree.js",
        "../src/examples/shire/month-view/jsx/tolkien.js",
        "../src/examples/shire/month-view/jsx/shire.js",
        "../src/examples/shire/month-view/jsx/bree.js",

        "../src/examples/shire/month-view-horizontal/side-by-side.js",
        "../src/examples/shire/month-view-horizontal/javascript/tolkien.js",
        "../src/examples/shire/month-view-horizontal/javascript/shire.js",
        "../src/examples/shire/month-view-horizontal/javascript/bree.js",
        "../src/examples/shire/month-view-horizontal/jsx/tolkien.js",
        "../src/examples/shire/month-view-horizontal/jsx/shire.js",
        "../src/examples/shire/month-view-horizontal/jsx/bree.js",

        "../src/examples/shire/new-years-day-sync/side-by-side.js",
        "../src/examples/shire/new-years-day-sync/javascript/tolkien.js",
        "../src/examples/shire/new-years-day-sync/javascript/shire.js",
        "../src/examples/shire/new-years-day-sync/javascript/bree.js",
        "../src/examples/shire/new-years-day-sync/jsx/tolkien.js",
        "../src/examples/shire/new-years-day-sync/jsx/shire.js",
        "../src/examples/shire/new-years-day-sync/jsx/bree.js",

        "../src/examples/shire/traditional-rules/side-by-side.js",
        "../src/examples/shire/traditional-rules/javascript/ta1300.js",
        "../src/examples/shire/traditional-rules/javascript/ta1601.js",
        "../src/examples/shire/traditional-rules/javascript/ta3019.js",
        "../src/examples/shire/traditional-rules/jsx/ta1300.js",
        "../src/examples/shire/traditional-rules/jsx/ta1601.js",
        "../src/examples/shire/traditional-rules/jsx/ta3019.js",

        "../src/examples/gondor/year-view/side-by-side.js",
        "../src/examples/gondor/year-view/javascript/kings.js",
        "../src/examples/gondor/year-view/javascript/stewards.js",
        "../src/examples/gondor/year-view/javascript/new.js",
        "../src/examples/gondor/year-view/jsx/kings.js",
        "../src/examples/gondor/year-view/jsx/stewards.js",
        "../src/examples/gondor/year-view/jsx/new.js",

        "../src/examples/gondor/month-view/side-by-side.js",
        "../src/examples/gondor/month-view/javascript/kings.js",
        "../src/examples/gondor/month-view/javascript/stewards.js",
        "../src/examples/gondor/month-view/javascript/new.js",
        "../src/examples/gondor/month-view/jsx/kings.js",
        "../src/examples/gondor/month-view/jsx/stewards.js",
        "../src/examples/gondor/month-view/jsx/new.js",

        "../src/examples/gondor/month-view-horizontal/side-by-side.js",
        "../src/examples/gondor/month-view-horizontal/javascript/kings.js",
        "../src/examples/gondor/month-view-horizontal/javascript/stewards.js",
        "../src/examples/gondor/month-view-horizontal/javascript/new.js",
        "../src/examples/gondor/month-view-horizontal/jsx/kings.js",
        "../src/examples/gondor/month-view-horizontal/jsx/stewards.js",
        "../src/examples/gondor/month-view-horizontal/jsx/new.js",

        "../src/examples/gondor/new-years-day-sync/side-by-side.js",
        "../src/examples/gondor/new-years-day-sync/javascript/kings.js",
        "../src/examples/gondor/new-years-day-sync/javascript/stewards.js",
        "../src/examples/gondor/new-years-day-sync/javascript/new.js",
        "../src/examples/gondor/new-years-day-sync/jsx/kings.js",
        "../src/examples/gondor/new-years-day-sync/jsx/stewards.js",
        "../src/examples/gondor/new-years-day-sync/jsx/new.js",

        "../src/examples/gondor/traditional-rules/side-by-side.js",
        "../src/examples/gondor/traditional-rules/javascript/sa32.js",
        "../src/examples/gondor/traditional-rules/javascript/ta2060.js",
        "../src/examples/gondor/traditional-rules/javascript/ta3019.js",
        "../src/examples/gondor/traditional-rules/jsx/sa32.js",
        "../src/examples/gondor/traditional-rules/jsx/ta2060.js",
        "../src/examples/gondor/traditional-rules/jsx/ta3019.js",

        "../src/examples/gondor/deficits.js",

        "../src/examples/rivendell/historic/side-by-side.js",
        "../src/examples/rivendell/historic/javascript/sa1697.js",
        "../src/examples/rivendell/historic/javascript/ta2941.js",
        "../src/examples/rivendell/historic/javascript/ta3018.js",
        "../src/examples/rivendell/historic/jsx/sa1697.js",
        "../src/examples/rivendell/historic/jsx/ta2941.js",
        "../src/examples/rivendell/historic/jsx/ta3018.js",

        "../src/examples/rivendell/year-view/side-by-side.js",
        "../src/examples/rivendell/year-view/javascript/default.js",
        "../src/examples/rivendell/year-view/javascript/reformed-3-25.js",
        "../src/examples/rivendell/year-view/javascript/reformed-3-29.js",
        "../src/examples/rivendell/year-view/jsx/default.js",
        "../src/examples/rivendell/year-view/jsx/reformed-3-25.js",
        "../src/examples/rivendell/year-view/jsx/reformed-3-29.js",

        "../src/examples/rivendell/season-view/side-by-side.js",
        "../src/examples/rivendell/season-view/javascript/default.js",
        "../src/examples/rivendell/season-view/javascript/reformed-3-25.js",
        "../src/examples/rivendell/season-view/javascript/reformed-3-20.js",
        "../src/examples/rivendell/season-view/jsx/default.js",
        "../src/examples/rivendell/season-view/jsx/reformed-3-25.js",
        "../src/examples/rivendell/season-view/jsx/reformed-3-20.js",

        "../src/examples/rivendell/yestare-tables.js",
    ],
};
