/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Rivendell Calendar / Year View / source / javascript",

    parameters: {
        options: { showPanel: true },
    },
};

export const WithDefaultsTraditionalRulesStartingFromMarch22ndInQuenya = () =>
    React.createElement(TolkienCalendars.RivendellCalendar, {
        caption: true,
        yearView: true,
        className: "shire-calendar",
    });

WithDefaultsTraditionalRulesStartingFromMarch22ndInQuenya.storyName = "with defaults (Traditional Rules starting from March 22nd, in Quenya)";
