/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Gondor Calendar / Traditional Rules / source / javascript",
};

export const ForS_A_32FirstKingOfNúmenorCrowned = () => {
    const secondAgeStartDate = new Date(0, 11, 23, 0, 0, 0);
    secondAgeStartDate.setFullYear(0, 11, 23);

    const secondAge32 = new Date(32, 5, 22, 0, 0, 0);
    secondAge32.setFullYear(32, 5, 22);

    return React.createElement(TolkienCalendars.GondorCalendar, {
        caption: "Kings' Reckoning S.A. 32",
        calendarRules:
            TolkienCalendars.GondorCalendar.RECKONING_RULES_TRADITIONAL,
        reckoning: TolkienCalendars.GondorCalendar.RECKONING_KINGS,
        language: TolkienCalendars.GondorCalendar.LANGUAGE_SINDARIN,
        yearView: true,
        date: secondAge32,
        startDate: secondAgeStartDate,
        className: "shire-calendar",
    });
};

ForS_A_32FirstKingOfNúmenorCrowned.storyName =
    "for S.A. 32: first King of Númenor crowned";
