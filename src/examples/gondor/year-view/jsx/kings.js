/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { GondorCalendar } from "../../../../lib";

export default {
    title: "Shire Reckoning / Gondor Calendar / Year View / source / jsx",

    parameters: {
        options: { showPanel: true },
    },
};

export const KingsReckoningInSindarin = () => (
    <GondorCalendar
        reckoning={GondorCalendar.RECKONING_KINGS}
        language={GondorCalendar.LANGUAGE_SINDARIN}
        yearView={true}
        caption={true}
        className="shire-calendar"
    />
);

KingsReckoningInSindarin.story = {
    name: "Kings' Reckoning in Sindarin",
};
