/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Rivendell Calendar / Year View / source / javascript",

    parameters: {
        chromatic: { disableSnapshot: true },
    },
};

export const WithReformedRulesStartingFromMarch25thInEnglish = () =>
    React.createElement(TolkienCalendars.RivendellCalendar, {
        caption: true,
        calendarRules: TolkienCalendars.RivendellCalendar.REFORMED_RULES,
        startDay: 25,
        language: TolkienCalendars.RivendellCalendar.LANGUAGE_ENGLISH,
        yearView: true,
        className: "shire-calendar",
    });

WithReformedRulesStartingFromMarch25thInEnglish.storyName =
    "with Reformed Rules starting from March 25th, in English";
