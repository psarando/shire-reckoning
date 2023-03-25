/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { RivendellCalendar } from "../../../../lib";

export default {
    title: "Shire Reckoning / Rivendell Calendar / Possible historic calendars / source / jsx",

    parameters: {
        options: { showPanel: true },
    },
};

export const ForT_A_3018_3019TheGreatYearsOfTheWarOfTheRingAndTheDownfallOfBarad_dûr =
    () => {
        const thirdAge3018 = new Date(590 + 3441 + 3018, 8, 22);

        return (
            <RivendellCalendar
                caption="The Calendar of Imladris in T.A. 3018 ~ 3019 (maybe)"
                language={RivendellCalendar.LANGUAGE_SINDARIN}
                yearView={true}
                date={thirdAge3018}
                startDay={21}
                className="shire-calendar"
            />
        );
    };

ForT_A_3018_3019TheGreatYearsOfTheWarOfTheRingAndTheDownfallOfBarad_dûr.storyName =
    'for T.A. 3018~3019: "The Great Years" of the War of the Ring and the downfall of Barad-dûr';
