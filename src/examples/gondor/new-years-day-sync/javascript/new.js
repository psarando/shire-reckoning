/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Gondor Calendar / What if our years began at the same seasonal point? / source / javascript",

    parameters: {
        chromatic: { disableSnapshot: true },
    },
};

export const NewReckoningInQuenya = () => {
    const gregorianStartDate = new Date(1, 0, 1, 0, 0, 0);
    gregorianStartDate.setFullYear(1, 0, 1);

    return React.createElement(TolkienCalendars.GondorCalendar, {
        reckoning: TolkienCalendars.GondorCalendar.RECKONING_NEW,
        yearView: true,
        caption: true,
        startDate: gregorianStartDate,
        className: "shire-calendar",
    });
};

NewReckoningInQuenya.storyName = "New Reckoning in Quenya";
