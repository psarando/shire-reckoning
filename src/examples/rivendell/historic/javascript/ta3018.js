/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import * as TolkienCalendars from "../../../../lib";

const thirdAge3018 = new Date(590 + 3441 + 3018, 8, 22);

storiesOf(
    "Shire Reckoning: Rivendell Calendar / Possible historic calendars / source / javascript",
    module
).add(
    'for T.A. 3018~3019: "The Great Years" of the War of the Ring and the downfall of Barad-dûr',
    () =>
        React.createElement(TolkienCalendars.RivendellCalendar, {
            caption: "The Calendar of Imladris in T.A. 3018 ~ 3019 (maybe)",
            language: TolkienCalendars.RivendellCalendar.LANGUAGE_SINDARIN,
            yearView: true,
            date: thirdAge3018,
            startDay: 21,
            className: "shire-calendar",
        })
);
