/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Shire Calendar / Month View Horizontal / source / javascript",

    parameters: {
        options: { showPanel: true },
    },
};

export const WithBreeMonthAndWeekdayNames = () =>
    React.createElement(TolkienCalendars.ShireCalendar, {
        region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE,
        monthViewLayout: TolkienCalendars.ShireCalendar.MONTH_VIEW_HORIZONTAL,
        caption: true,
        className: "shire-calendar",
    });

WithBreeMonthAndWeekdayNames.storyName = "with Bree month and weekday names";
