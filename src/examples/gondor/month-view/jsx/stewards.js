/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { GondorCalendar } from "../../../../lib";

export default {
    title: "Shire Reckoning / Gondor Calendar / Month View / source / jsx",

    parameters: {
        chromatic: { disableSnapshot: true },
    },
};

export const StewardsReckoningInQuenya = () => (
    <GondorCalendar
        reckoning={GondorCalendar.RECKONING_STEWARDS}
        caption={true}
        className="shire-calendar"
    />
);

StewardsReckoningInQuenya.storyName = "Stewards' Reckoning in Quenya";
