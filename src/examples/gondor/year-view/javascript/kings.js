/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Gondor Calendar / Year View / source / javascript",

    parameters: {
        options: { showPanel: true },
    },
};

export const KingsReckoningInSindarin = () =>
    React.createElement(TolkienCalendars.GondorCalendar, {
        reckoning: TolkienCalendars.GondorCalendar.RECKONING_KINGS,
        language: TolkienCalendars.GondorCalendar.LANGUAGE_SINDARIN,
        yearView: true,
        caption: true,
        className: "shire-calendar",
    });

KingsReckoningInSindarin.storyName = "Kings' Reckoning in Sindarin";
