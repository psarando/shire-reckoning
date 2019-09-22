/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import * as TolkienCalendars from "../../../../lib";

storiesOf(
    "Shire Reckoning: Rivendell Calendar / Year View / source / javascript",
    module
).add("with Reformed Rules starting from March 29th, in Sindarin", () =>
    React.createElement(TolkienCalendars.RivendellCalendar, {
        caption: true,
        calendarRules: TolkienCalendars.RivendellCalendar.REFORMED_RULES,
        startDay: 29,
        language: TolkienCalendars.RivendellCalendar.LANGUAGE_SINDARIN,
        yearView: true,
        className: "shire-calendar",
    })
);
