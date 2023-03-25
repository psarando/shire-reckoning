/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as GondorReckoning from "../../GondorReckoning";
import {
    fullYearDate,
    getLastDay,
    getNextDate,
    toDaysElapsed,
} from "../../Utils";
import { DisplayTableMap } from "../Common";

const roundDecimals = (deficit) => {
    return Math.round(deficit * 100000000000) / 100000000000;
};

// prettier-ignore
// assuming year length 365:05:48:46 = 365.2421990740741
const yearLengthDays =
    365.0
    + 5 / 24
    + 48 / (24 * 60)
    + 46 / (24 * 60 * 60);

const formatDeficit = (deficit) => {
    let sign = deficit < 0 ? "-" : "+";

    let days = Math.abs(deficit);
    let remainder = days - Math.floor(days);
    days = Math.floor(days);

    let hours = remainder * 24;
    remainder = hours - Math.floor(hours);
    hours = Math.floor(hours);

    let mins = remainder * 60;
    remainder = mins - Math.floor(mins);
    mins = Math.floor(mins);

    let secs = Math.round(remainder * 60);

    return `${sign}${days}d:${hours}h:${mins}m:${secs}s`;
};

const DeficitTables = () => {
    const startDate = fullYearDate(0, 11, 21);

    const table = {};
    const rowKeys = [];
    const appendixTable = {};
    const appendixRowKeys = [];
    [
        1,
        100,
        500,
        1000,
        2000,
        3000,
        3441,
        3441 + 1,
        3441 + 3,
        3441 + 4,
        3441 + 1000,
        3441 + 2000,
        3441 + 2058,
        3441 + 2059,
        3441 + 2060,
        3441 + 2359,
        3441 + 2360,
        3441 + 2999,
        3441 + 3000,
        3441 + 3019,
        3441 + 3020,
    ].forEach((saYear) => {
        const calendarStewards = GondorReckoning.makeGondorCalendarDates(
            fullYearDate(saYear, 5, 21),
            startDate,
            GondorReckoning.RECKONING_KINGS,
            GondorReckoning.RECKONING_RULES_TRADITIONAL
        );

        const nextFirstDay = getNextDate(getLastDay(calendarStewards));

        // Get the Deficit for this year.
        const daysElapsed = toDaysElapsed(startDate, nextFirstDay);
        const realElapsed = calendarStewards.year * yearLengthDays;
        const deficit = roundDecimals(daysElapsed - realElapsed);

        const displayYear =
            calendarStewards.year > 3441
                ? `T.A. ${calendarStewards.year - 3441}`
                : `S.A. ${calendarStewards.year}`;

        table[displayYear] = {
            "Days Elapsed": daysElapsed,
            "Days per Solar Year": realElapsed,
            Deficit: deficit,
            "Deficit in days:hrs:min:sec": formatDeficit(deficit),
        };
        rowKeys.push(displayYear);

        if (
            calendarStewards.year === 3441 + 2060
            || calendarStewards.year === 3441 + 2360
        ) {
            appendixTable[displayYear] = {
                "Deficit minus 1 day": roundDecimals(deficit - 1.0),
                "in days:hrs:min:sec": formatDeficit(deficit - 1.0),
            };
            appendixRowKeys.push(displayYear);
        }
    });

    return (
        <>
            <p>
                The following table calculates the <em>Deficit</em> for select
                Second Age and Third Age years, using this project's Kings' and
                Stewards' Reckoning simulations. These calculations and the{" "}
                <em>Deficit</em> are explained in more detail in my post{" "}
                <a href="https://psarando.github.io/shire-reckoning/Kings_Reckoning_Rules_and_Deficit.html">
                    The Kings' Reckoning Rules and the Deficit
                </a>
                .
            </p>
            <DisplayTableMap
                rowKeys={rowKeys}
                colKeys={[
                    "Days Elapsed",
                    "Days per Solar Year",
                    "Deficit",
                    "Deficit in days:hrs:min:sec",
                ]}
                table={table}
            />
            <ul>
                <li>
                    <b>Days Elapsed</b> is the number of days elapsed since the
                    start of the Second Age through the end of the year given
                    for that row.
                </li>
                <li>
                    <b>Days per Solar Year</b> is the number of days in a solar
                    year (365 days, 5 hours, 48 minutes, 46 seconds given in
                    Appendix D) elapsed since the start of the Second Age
                    through the end of the year given for that row.
                </li>
                <li>
                    <b>Deficit</b> is the difference between the "Days Elapsed"
                    and "Days per Solar Year", which can be a deficit (negative
                    number) or a surplus (positive number).
                </li>
            </ul>
            <p>
                The following table calculates the <em>Deficit</em> around the
                years the Stewards made a "special addition" to their calendar
                (adding 2 days to T.A. 2059 and 1 day to T.A. 2360), but also
                subtracting 1 day from the <em>Deficit</em> calculated by my
                simulations, which closely matches Tolkien's statements in
                Appendix D about the <em>Deficit</em> for these years. I also
                explain why Tolkien may have come to these figures in my article{" "}
                <a href="https://psarando.github.io/shire-reckoning/Kings_Reckoning_Rules_and_Deficit.html#the-stewards-reckoning-tolkien-reckoned-mostly-correct">
                    The Stewards' Reckoning: Tolkien Reckoned Mostly Correct
                </a>
                .
            </p>
            <DisplayTableMap
                rowKeys={appendixRowKeys}
                colKeys={["Deficit minus 1 day", "in days:hrs:min:sec"]}
                table={appendixTable}
            />
        </>
    );
};

export default {
    title: "Shire Reckoning / Gondor Calendar",

    parameters: {
        options: { showPanel: false },
    },
};

export const Deficits = {
    render: DeficitTables,
};
