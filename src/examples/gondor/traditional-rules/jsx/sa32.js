/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import { GondorCalendar } from "../../../../lib";

const secondAgeStartDate = new Date(0, 11, 23, 0, 0, 0);
secondAgeStartDate.setFullYear(0, 11, 23);

const secondAge32 = new Date(32, 5, 22, 0, 0, 0);
secondAge32.setFullYear(32, 5, 22);

storiesOf(
    "Shire Reckoning: Gondor Calendar / Traditional Rules / source / jsx",
    module
).add("for S.A. 32: first King of Númenor crowned", () => (
    <GondorCalendar
        caption="Kings' Reckoning S.A. 32"
        calendarRules={GondorCalendar.RECKONING_RULES_TRADITIONAL}
        reckoning={GondorCalendar.RECKONING_KINGS}
        language={GondorCalendar.LANGUAGE_SINDARIN}
        yearView={true}
        date={secondAge32}
        startDate={secondAgeStartDate}
        className="shire-calendar"
    />
));
