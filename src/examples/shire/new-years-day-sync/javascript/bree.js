/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import * as TolkienCalendars from "../../../../lib";

const gregorianStartDate = new Date(1, 0, 1, 0, 0, 0);
gregorianStartDate.setFullYear(1, 0, 1);

storiesOf(
    "Shire Reckoning: Shire Calendar / What if our years began at the same seasonal point? / source / javascript",
    module
).add("with Bree month and weekday names", () =>
    React.createElement(TolkienCalendars.ShireCalendar, {
        region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE,
        startDate: gregorianStartDate,
        yearView: true,
        caption: true,
        className: "shire-calendar",
    })
);
