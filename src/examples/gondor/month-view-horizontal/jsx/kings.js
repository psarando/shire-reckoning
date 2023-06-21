/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { GondorCalendar } from "../../../../lib";

export default {
    title: "Shire Reckoning / Gondor Calendar / Month View Horizontal / source / jsx",

    parameters: {
        chromatic: { disableSnapshot: true },
    },
};

export const KingsReckoningInQuenya = () => (
    <GondorCalendar
        reckoning={GondorCalendar.RECKONING_KINGS}
        monthViewLayout={GondorCalendar.MONTH_VIEW_HORIZONTAL}
        caption={true}
        className="shire-calendar"
    />
);

KingsReckoningInQuenya.storyName = "Kings' Reckoning in Quenya";
