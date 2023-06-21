/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { ShireCalendar } from "../../../../lib";

export default {
    title: "Shire Reckoning / Shire Calendar / Month View Horizontal / source / jsx",

    parameters: {
        chromatic: { disableSnapshot: true },
    },
};

export const WithShireMonthAndWeekdayNames = () => (
    <ShireCalendar
        monthViewLayout={ShireCalendar.MONTH_VIEW_HORIZONTAL}
        caption={true}
        className="shire-calendar"
    />
);

WithShireMonthAndWeekdayNames.storyName = "with Shire month and weekday names";
