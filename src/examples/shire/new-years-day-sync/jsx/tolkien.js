/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { ShireCalendar } from "../../../../lib";

export default {
    title: "Shire Reckoning / Shire Calendar / What if our years began at the same seasonal point? / source / jsx",

    parameters: {
        chromatic: { disableSnapshot: true },
    },
};

export const WithTolkienMonthAndWeekdayNames = () => {
    const gregorianStartDate = new Date(1, 0, 1, 0, 0, 0);
    gregorianStartDate.setFullYear(1, 0, 1);

    return (
        <ShireCalendar
            region={ShireCalendar.REGION_NAMES_TOLKIEN}
            startDate={gregorianStartDate}
            yearView={true}
            caption={true}
            className="shire-calendar"
        />
    );
};

WithTolkienMonthAndWeekdayNames.storyName =
    "with Tolkien month and weekday names";
