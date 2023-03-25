/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { DatesOfInterest } from "./DatesOfInterest";
import { DisplayTableRows } from "../Common";

const DatesOfInterestHistoryPerspectiveTable = () => {
    const table = [["Modern Year", "Middle-earth Year", "Event Description"]];

    DatesOfInterest.forEach((event) => {
        if (event.label === "") return;

        let year = event.year - 4441;
        let bce = "";
        if (year < 1) {
            year *= -1;
            year++;
            bce = " B.C.E.";
        }

        table.push([`${year}${bce}`, event.displayDate, event.label]);
    });

    return (
        <>
            <p>
                The following table will print the "Dates of Interest", which
                are used in the "Middle-earth simulation" examples, aligning
                them with a corresponding modern year so that III&nbsp;3019 =
                modern 2019, just for fun!
            </p>
            <p>
                In this table I'm using IV for Fourth Age years, III for Third
                Age years, II for Second Age years, and Iys for Years of the Sun
                in the First Age.
            </p>
            <DisplayTableRows rows={table} />
        </>
    );
};

export default {
    title: "Shire Reckoning / Middle-earth Simulation",

    parameters: {
        options: { showPanel: false },
    },
};

export const HistoryPerspective = {
    name: "Let's put the history of Middle-earth into perspective",
    render: DatesOfInterestHistoryPerspectiveTable,
};
