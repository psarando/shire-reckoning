/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import { GondorCalendar, ShireCalendar } from "../../../../lib";

const secondAgeStartDate = new Date(0, 11, 23, 0, 0, 0);
secondAgeStartDate.setFullYear(0, 11, 23);

const ta1601 = new Date(3441 + 1601, 5, 19);

storiesOf(
    "Shire Reckoning: Shire Calendar / Traditional Rules / source / jsx",
    module
).add("for T.A. 1601: the year Hobbits first colonized the Shire", () => (
    <ShireCalendar
        caption="Shire Reckoning for T.A. 1601"
        calendarRules={GondorCalendar.RECKONING_RULES_TRADITIONAL}
        yearView={true}
        date={ta1601}
        startDate={secondAgeStartDate}
        className="shire-calendar"
    />
));
