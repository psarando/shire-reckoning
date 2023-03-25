/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Shire Calendar / What if our years began at the same seasonal point? / source / javascript",

    parameters: {
        options: { showPanel: true },
    },
};

export const WithShireMonthAndWeekdayNames = () => {
    const gregorianStartDate = new Date(1, 0, 1, 0, 0, 0);
    gregorianStartDate.setFullYear(1, 0, 1);

    return React.createElement(TolkienCalendars.ShireCalendar, {
        startDate: gregorianStartDate,
        yearView: true,
        caption: true,
        className: "shire-calendar",
    });
};

WithShireMonthAndWeekdayNames.storyName = "with Shire month and weekday names";
