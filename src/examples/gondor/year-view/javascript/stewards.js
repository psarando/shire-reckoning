/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Gondor Calendar / Year View / source / javascript",

    parameters: {
        chromatic: { disableSnapshot: true },
    },
};

export const StewardsReckoningInEnglish = () =>
    React.createElement(TolkienCalendars.GondorCalendar, {
        reckoning: TolkienCalendars.GondorCalendar.RECKONING_STEWARDS,
        language: TolkienCalendars.GondorCalendar.LANGUAGE_ENGLISH,
        yearView: true,
        caption: true,
        className: "shire-calendar",
    });

StewardsReckoningInEnglish.storyName = "Stewards' Reckoning in English";
