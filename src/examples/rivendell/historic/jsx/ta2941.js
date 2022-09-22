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

export const ForT_A_2941TheYearBilboFindsTheOneRingOfTheDeathOfSmaugAndOfTheBattleOfFiveArmies =
    () => {
        const thirdAge2941 = new Date(590 + 3441 + 2941, 8, 22);

        return (
            <RivendellCalendar
                caption="The Calendar of Imladris in T.A. 2941 (maybe)"
                language={RivendellCalendar.LANGUAGE_ENGLISH}
                yearView={true}
                date={thirdAge2941}
                startDay={21}
                className="shire-calendar"
            />
        );
    };

ForT_A_2941TheYearBilboFindsTheOneRingOfTheDeathOfSmaugAndOfTheBattleOfFiveArmies.story =
    {
        name: "for T.A. 2941: the year Bilbo finds the One Ring, of the death of Smaug, and of The Battle of Five Armies",
    };
