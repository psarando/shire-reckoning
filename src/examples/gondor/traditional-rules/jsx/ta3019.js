/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { GondorCalendar } from "../../../../lib";

export default {
    title: "Shire Reckoning / Gondor Calendar / Traditional Rules / source / jsx",
};

export const ForT_A_3019DateOfTheDestructionOfTheOneRing = () => {
    const secondAgeStartDate = new Date(0, 11, 23, 0, 0, 0);
    secondAgeStartDate.setFullYear(0, 11, 23);

    const thirdAge3019 = new Date(3441 + 3019, 2, 14);

    return (
        <GondorCalendar
            caption="New Reckoning T.A. 3019"
            calendarRules={GondorCalendar.RECKONING_RULES_TRADITIONAL}
            reckoning={GondorCalendar.RECKONING_NEW}
            yearView={true}
            date={thirdAge3019}
            startDate={secondAgeStartDate}
            className="shire-calendar"
        />
    );
};

ForT_A_3019DateOfTheDestructionOfTheOneRing.storyName =
    "for T.A. 3019: date of the destruction of the One Ring";
