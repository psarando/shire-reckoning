/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { GondorCalendar } from "../../../../lib";

export default {
    title: "Shire Reckoning / Gondor Calendar / Month View / source / jsx",

    parameters: {
        options: { showPanel: true },
    },
};

export const NewReckoningInSindarin = () => (
    <GondorCalendar
        reckoning={GondorCalendar.RECKONING_NEW}
        language={GondorCalendar.LANGUAGE_SINDARIN}
        caption={true}
        className="shire-calendar"
    />
);

NewReckoningInSindarin.storyName = "New Reckoning in Sindarin";
