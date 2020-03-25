/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import * as TolkienCalendars from "../../../../lib";

storiesOf(
    "Shire Reckoning: Shire Calendar / Month View Horizontal / source / javascript",
    module
).add("with Shire month and weekday names", () =>
    React.createElement(TolkienCalendars.ShireCalendar, {
        monthViewLayout: TolkienCalendars.ShireCalendar.MONTH_VIEW_HORIZONTAL,
        caption: true,
        className: "shire-calendar",
    })
);