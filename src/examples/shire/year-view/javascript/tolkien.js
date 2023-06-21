/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Shire Calendar / Year View / source / javascript",

    parameters: {
        chromatic: { disableSnapshot: true },
    },
};

export const WithTolkienMonthAndWeekdayNames = () =>
    React.createElement(TolkienCalendars.ShireCalendar, {
        region: TolkienCalendars.ShireCalendar.REGION_NAMES_TOLKIEN,
        yearView: true,
        caption: true,
        className: "shire-calendar",
    });

WithTolkienMonthAndWeekdayNames.storyName =
    "with Tolkien month and weekday names";
