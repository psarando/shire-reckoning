/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Gondor Calendar / Month View / source / javascript",

    parameters: {
        options: { showPanel: true },
    },
};

export const NewReckoningInSindarin = () =>
    React.createElement(TolkienCalendars.GondorCalendar, {
        reckoning: TolkienCalendars.GondorCalendar.RECKONING_NEW,
        language: TolkienCalendars.GondorCalendar.LANGUAGE_SINDARIN,
        caption: true,
        className: "shire-calendar",
    });

NewReckoningInSindarin.storyName = "New Reckoning in Sindarin";
