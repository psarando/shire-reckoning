/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import * as TolkienCalendars from "../../../../lib";

storiesOf(
    "Shire Reckoning: Gondor Calendar / Month View Horizontal / source / javascript",
    module
).add("Kings' Reckoning in Quenya", () =>
    React.createElement(TolkienCalendars.GondorCalendar, {
        reckoning: TolkienCalendars.GondorCalendar.RECKONING_KINGS,
        monthViewLayout: TolkienCalendars.GondorCalendar.MONTH_VIEW_HORIZONTAL,
        caption: true,
        className: "shire-calendar",
    })
);
