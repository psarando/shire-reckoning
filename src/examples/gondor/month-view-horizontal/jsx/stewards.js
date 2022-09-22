/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { GondorCalendar } from "../../../../lib";

export default {
    title: "Shire Reckoning / Gondor Calendar / Month View Horizontal / source / jsx",

    parameters: {
        options: { showPanel: true },
    },
};

export const StewardsReckoningInSindarin = () => (
    <GondorCalendar
        reckoning={GondorCalendar.RECKONING_STEWARDS}
        monthViewLayout={GondorCalendar.MONTH_VIEW_HORIZONTAL}
        language={GondorCalendar.LANGUAGE_SINDARIN}
        caption={true}
        className="shire-calendar"
    />
);

StewardsReckoningInSindarin.story = {
    name: "Stewards' Reckoning in Sindarin",
};
