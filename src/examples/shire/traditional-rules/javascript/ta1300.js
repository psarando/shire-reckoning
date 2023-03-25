/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Shire Calendar / Traditional Rules / source / javascript",

    parameters: {
        options: { showPanel: true },
    },
};

export const ForT_A_1300TheYearHobbitsFirstSettledInBree = () => {
    const secondAgeStartDate = new Date(0, 11, 23, 0, 0, 0);
    secondAgeStartDate.setFullYear(0, 11, 23);

    const ta1300 = new Date(3441 + 1300, 5, 20);

    return React.createElement(TolkienCalendars.ShireCalendar, {
        caption: "Bree Reckoning for T.A. 1300",
        calendarRules:
            TolkienCalendars.GondorCalendar.RECKONING_RULES_TRADITIONAL,
        region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE,
        yearView: true,
        date: ta1300,
        startDate: secondAgeStartDate,
        className: "shire-calendar",
    });
};

ForT_A_1300TheYearHobbitsFirstSettledInBree.storyName =
    "for T.A. 1300: the year Hobbits first settled in Bree";
