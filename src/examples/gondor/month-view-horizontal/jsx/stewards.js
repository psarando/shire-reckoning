/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import { GondorCalendar } from "../../../../lib";

storiesOf(
    "Shire Reckoning: Gondor Calendar / Month View Horizontal / source / jsx",
    module
).add("Stewards' Reckoning in Sindarin", () => (
    <GondorCalendar
        reckoning={GondorCalendar.RECKONING_STEWARDS}
        monthViewLayout={GondorCalendar.MONTH_VIEW_HORIZONTAL}
        language={GondorCalendar.LANGUAGE_SINDARIN}
        caption={true}
        className="shire-calendar"
    />
));
