/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Shire Calendar / Year View / source / javascript",

    parameters: {
        options: { showPanel: true },
    },
};

export const WithShireMonthAndWeekdayNames = () =>
    React.createElement(TolkienCalendars.ShireCalendar, {
        yearView: true,
        caption: true,
        className: "shire-calendar",
    });

WithShireMonthAndWeekdayNames.storyName = "with Shire month and weekday names";
