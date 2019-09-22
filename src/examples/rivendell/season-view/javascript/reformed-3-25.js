/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import * as TolkienCalendars from "../../../../lib";

storiesOf(
    "Shire Reckoning: Rivendell Calendar / Season View / source / javascript",
    module
).add("with Reformed Rules starting from March 25th, in English", () =>
    React.createElement(TolkienCalendars.RivendellCalendar, {
        caption: true,
        calendarRules: TolkienCalendars.RivendellCalendar.REFORMED_RULES,
        startDay: 25,
        language: TolkienCalendars.RivendellCalendar.LANGUAGE_ENGLISH,
        className: "shire-calendar",
    })
);
