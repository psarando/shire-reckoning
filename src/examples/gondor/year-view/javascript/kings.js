/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import * as TolkienCalendars from "../../../../lib";

storiesOf(
    "Shire Reckoning: Gondor Calendar / Year View / source / javascript",
    module
).add("Kings' Reckoning in Sindarin", () =>
    React.createElement(TolkienCalendars.GondorCalendar, {
        reckoning: TolkienCalendars.GondorCalendar.RECKONING_KINGS,
        language: TolkienCalendars.GondorCalendar.LANGUAGE_SINDARIN,
        yearView: true,
        caption: true,
        className: "shire-calendar",
    })
);
