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
).add("New Reckoning in English", () => (
    <GondorCalendar
        reckoning={GondorCalendar.RECKONING_NEW}
        monthViewLayout={GondorCalendar.MONTH_VIEW_HORIZONTAL}
        language={GondorCalendar.LANGUAGE_ENGLISH}
        caption={true}
        className="shire-calendar"
    />
));
