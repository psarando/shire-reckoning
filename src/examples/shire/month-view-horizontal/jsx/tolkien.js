/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import { ShireCalendar } from "../../../../lib";

storiesOf(
    "Shire Reckoning: Shire Calendar / Month View Horizontal / source / jsx",
    module
).add("with Tolkien month and weekday names", () => (
    <ShireCalendar
        region={ShireCalendar.REGION_NAMES_TOLKIEN}
        monthViewLayout={ShireCalendar.MONTH_VIEW_HORIZONTAL}
        caption={true}
        className="shire-calendar"
    />
));
