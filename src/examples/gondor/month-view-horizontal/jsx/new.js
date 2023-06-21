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

export const NewReckoningInEnglish = () => (
    <GondorCalendar
        reckoning={GondorCalendar.RECKONING_NEW}
        monthViewLayout={GondorCalendar.MONTH_VIEW_HORIZONTAL}
        language={GondorCalendar.LANGUAGE_ENGLISH}
        caption={true}
        className="shire-calendar"
    />
);

NewReckoningInEnglish.storyName = "New Reckoning in English";
