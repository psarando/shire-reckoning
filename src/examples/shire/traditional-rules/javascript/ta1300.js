/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import * as TolkienCalendars from "../../../../lib";

const secondAgeStartDate = new Date(0, 11, 23, 0, 0, 0);
secondAgeStartDate.setFullYear(0, 11, 23);

const ta1300 = new Date(3441 + 1300, 5, 20);

storiesOf(
    "Shire Reckoning: Shire Calendar / Traditional Rules / source / javascript",
    module
).add("for T.A. 1300: the year Hobbits first settled in Bree", () =>
    React.createElement(TolkienCalendars.ShireCalendar, {
        caption: "Bree Reckoning for T.A. 1300",
        calendarRules:
            TolkienCalendars.GondorCalendar.RECKONING_RULES_TRADITIONAL,
        region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE,
        yearView: true,
        date: ta1300,
        startDate: secondAgeStartDate,
        className: "shire-calendar",
    })
);
