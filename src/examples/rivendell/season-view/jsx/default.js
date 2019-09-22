/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import { RivendellCalendar } from "../../../../lib";

storiesOf(
    "Shire Reckoning: Rivendell Calendar / Season View / source / jsx",
    module
).add(
    "with defaults (Traditional Rules starting from March 22nd, in Quenya)",
    () => <RivendellCalendar caption={true} className="shire-calendar" />
);
