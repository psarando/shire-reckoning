/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import { GondorCalendar } from "../../../../lib";

storiesOf(
    "Shire Reckoning: Gondor Calendar / Year View / source / jsx",
    module
).add("Kings' Reckoning in Sindarin", () => (
    <GondorCalendar
        reckoning={GondorCalendar.RECKONING_KINGS}
        language={GondorCalendar.LANGUAGE_SINDARIN}
        yearView={true}
        caption={true}
        className="shire-calendar"
    />
));
