/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Gondor Calendar / Traditional Rules / source / javascript",

    parameters: {
        options: { showPanel: true },
    },
};

export const ForT_A_2060FirstYearOfStewardsReckoning = () => {
    const secondAgeStartDate = new Date(0, 11, 23, 0, 0, 0);
    secondAgeStartDate.setFullYear(0, 11, 23);

    const thirdAge2060 = new Date(3441 + 2060, 5, 22);

    return React.createElement(TolkienCalendars.GondorCalendar, {
        caption: "Stewards' Reckoning T.A. 2060",
        calendarRules:
            TolkienCalendars.GondorCalendar.RECKONING_RULES_TRADITIONAL,
        reckoning: TolkienCalendars.GondorCalendar.RECKONING_STEWARDS,
        language: TolkienCalendars.GondorCalendar.LANGUAGE_ENGLISH,
        yearView: true,
        date: thirdAge2060,
        startDate: secondAgeStartDate,
        className: "shire-calendar",
    });
};

ForT_A_2060FirstYearOfStewardsReckoning.storyName =
    "for T.A. 2060: first year of Stewards' Reckoning";
