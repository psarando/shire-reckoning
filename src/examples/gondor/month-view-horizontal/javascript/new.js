/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Gondor Calendar / Month View Horizontal / source / javascript",

    parameters: {
        options: { showPanel: true },
    },
};

export const NewReckoningInEnglish = () =>
    React.createElement(TolkienCalendars.GondorCalendar, {
        reckoning: TolkienCalendars.GondorCalendar.RECKONING_NEW,
        monthViewLayout: TolkienCalendars.GondorCalendar.MONTH_VIEW_HORIZONTAL,
        language: TolkienCalendars.GondorCalendar.LANGUAGE_ENGLISH,
        caption: true,
        className: "shire-calendar",
    });

NewReckoningInEnglish.story = {
    name: "New Reckoning in English",
};
