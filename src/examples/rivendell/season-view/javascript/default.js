/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import * as TolkienCalendars from "../../../../lib";

storiesOf(
    "Shire Reckoning: Rivendell Calendar / Season View / source / javascript",
    module
).add(
    "with defaults (Traditional Rules starting from March 22nd, in Quenya)",
    () =>
        React.createElement(TolkienCalendars.RivendellCalendar, {
            caption: true,
            className: "shire-calendar",
        })
);
