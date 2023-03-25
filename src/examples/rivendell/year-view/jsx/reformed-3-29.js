/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { RivendellCalendar } from "../../../../lib";

export default {
    title: "Shire Reckoning / Rivendell Calendar / Year View / source / jsx",

    parameters: {
        options: { showPanel: true },
    },
};

export const WithReformedRulesStartingFromMarch29thInSindarin = () => (
    <RivendellCalendar
        caption={true}
        calendarRules={RivendellCalendar.REFORMED_RULES}
        startDay={29}
        language={RivendellCalendar.LANGUAGE_SINDARIN}
        yearView={true}
        className="shire-calendar"
    />
);

WithReformedRulesStartingFromMarch29thInSindarin.storyName =
    "with Reformed Rules starting from March 29th, in Sindarin";
