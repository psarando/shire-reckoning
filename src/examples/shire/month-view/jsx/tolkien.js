/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { ShireCalendar } from "../../../../lib";

export default {
    title: "Shire Reckoning / Shire Calendar / Month View / source / jsx",

    parameters: {
        options: { showPanel: true },
    },
};

export const WithTolkienMonthAndWeekdayNames = () => (
    <ShireCalendar
        region={ShireCalendar.REGION_NAMES_TOLKIEN}
        caption={true}
        className="shire-calendar"
    />
);

WithTolkienMonthAndWeekdayNames.story = {
    name: "with Tolkien month and weekday names",
};
