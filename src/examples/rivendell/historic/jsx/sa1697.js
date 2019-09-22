/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import { RivendellCalendar } from "../../../../lib";

const secondAge1697 = new Date(590 + 1697, 8, 22);

storiesOf(
    "Shire Reckoning: Rivendell Calendar / Possible historic calendars / source / jsx",
    module
).add("for S.A. 1697: the year Rivendell was founded", () => (
    <RivendellCalendar
        caption="The Calendar of Imladris in S.A. 1697 (maybe)"
        yearView={true}
        date={secondAge1697}
        startDay={21}
        className="shire-calendar"
    />
));
