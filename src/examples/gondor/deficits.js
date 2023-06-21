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

export const Deficits = {
    render: () => {
        // prettier-ignore
        // Assuming a year length as given in Appendix D.
        // 365:05:48:46 = 365.2421990740741
        const yearLengthDays =
            365.0
            + 5 / 24
            + 48 / (24 * 60)
            + 46 / (24 * 60 * 60);

        // Need to round off deficit/surplus decimal digits,
        // since the `realElapsed` days per solar year should only be
        // 16 significant figures,
        // due to the year length precision calculated above.
        const roundDeficit = (daysElapsed, realElapsed) => {
            let factor = 1000;
            let fixedDigits = 13;
            while (realElapsed >= factor && fixedDigits) {
                fixedDigits--;
                factor *= 10;
            }

            return (daysElapsed - realElapsed).toFixed(fixedDigits);
        };

        const formatDurationDigits = (digits) =>
            Math.floor(digits).toString().padStart(2, "0");

        const formatDeficit = (deficit) => {
            let sign = deficit < 0 ? "-" : "+";

            let days = Math.abs(deficit);
            let remainder = days - Math.floor(days);
            days = Math.floor(days);

            let hours = remainder * 24;
            remainder = hours - Math.floor(hours);
            hours = formatDurationDigits(hours);

            let mins = remainder * 60;
            remainder = mins - Math.floor(mins);
            mins = formatDurationDigits(mins);

            let secs = Math.round(remainder * 60);
            if (secs === 60) {
                // Now have to round up the minutes,
                // so just add 1/2 second to the deficit
                // and reformat the whole thing.
                const halfSec = 0.5 / (24 * 60 * 60);
                deficit = Number.parseFloat(deficit);

                return formatDeficit(
                    deficit < 0 ? deficit - halfSec : deficit + halfSec
                );
            }

            secs = formatDurationDigits(secs);

            return `${sign}${days}d:${hours}h:${mins}m:${secs}s`;
        };

        const padDeficitValue = (deficit) => {
            if (deficit >= 0) {
                deficit = "+" + deficit.toString();
            }

            return deficit.toString().padEnd(16, " ");
        };

        const deficitDisplayYear = (year) => {
            let yearLabel = "S.A.";
            if (year > 3441) {
                yearLabel = "T.A.";
                year -= 3441;
            }
            return `${yearLabel} ${year.toString().padStart(4, " ")}`;
        };

        // Finds the number of days elapsed
        // since the start of the Second Age through the end of the given year,
        // always assuming a Second Age year and leap-year rules,
        // even beyond S.A. 3441.
        // This is only for the hypothetical Second Age deficits table.
        const saYearToDaysElapsed = (year) =>
            365 * year
            + Math.floor(year / 4)
            - Math.floor(year / 100)
            + Math.floor(year / 1000) * 2;

        const startDate = fullYearDate(0, 11, 21);

        const table = {};
        const rowKeys = [];
        const saTable = {};
        const saRowKeys = [];
        const deficitMinus1Table = {};
        const deficitMinus1RowKeys = [];

        // Calculate deficits for Second and Third Age years of interest.
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
                // Make the calendar around a date near the middle of the year.
                fullYearDate(saYear, 5, 21),
                startDate,
                GondorReckoning.RECKONING_STEWARDS,
                GondorReckoning.RECKONING_RULES_TRADITIONAL
            );

            const nextFirstDay = getNextDate(getLastDay(calendarStewards));

            // Get the Deficit for this year.
            const year = calendarStewards.year;
            const daysElapsed = toDaysElapsed(startDate, nextFirstDay);
            const realElapsed = year * yearLengthDays;
            const deficit = roundDeficit(daysElapsed, realElapsed);

            const displayYear = deficitDisplayYear(year);

            table[displayYear] = {
                "Days Elapsed": daysElapsed.toString().padStart(7, " "),
                "Days per Solar Year": realElapsed.toPrecision(16),
                Deficit: padDeficitValue(deficit),
                "Deficit in days:hrs:min:sec": formatDeficit(deficit),
            };
            rowKeys.push(displayYear);

            // Get deficits -1day for these Third Age years.
            if (year === 3441 + 2060 || year === 3441 + 2360) {
                const deficitMinus1 = roundDeficit(
                    daysElapsed - 1,
                    realElapsed
                );
                deficitMinus1Table[displayYear] = {
                    "Deficit minus 1 day": deficitMinus1,
                    "in days:hrs:min:sec": formatDeficit(deficitMinus1),
                };
                deficitMinus1RowKeys.push(displayYear);
            }

            // Get the hypothetical deficits for these Second Age years.
            if (
                year === 3445
                || year === 5500
                || year === 5501
                || year === 5801
                || year === 6461
            ) {
                const saDisplayYear = `S.A. ${year}`;
                const saDaysElapsed = saYearToDaysElapsed(year);
                const saDeficit = roundDeficit(saDaysElapsed, realElapsed);

                saTable[saDisplayYear] = {
                    "Days Elapsed": saDaysElapsed,
                    "Days per Solar Year": realElapsed.toPrecision(16),
                    Deficit: saDeficit,
                    "in days:hrs:min:sec": formatDeficit(saDeficit),
                };
                saRowKeys.push(saDisplayYear);
            }
        });

        return (
            <>
                <p>
                    The following table calculates the <em>Deficit</em> for
                    select Second Age and Third Age years, using this project's
                    Kings' and Stewards' Reckoning simulations. These
                    calculations and the <em>Deficit</em> are explained in more
                    detail in my post{" "}
                    <a href="https://psarando.github.io/shire-reckoning/Kings_Reckoning_Rules_and_Deficit.html">
                        The Kings' Reckoning Rules and the <em>Deficit</em>
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
                        <b>Days Elapsed</b> is the number of days elapsed since
                        the start of the Second Age through the end of the year
                        given for that row.
                    </li>
                    <li>
                        <b>Days per Solar Year</b> is the number of days in a
                        solar year (365 days, 5 hours, 48 minutes, 46 seconds as
                        given in Appendix D) elapsed since the start of the
                        Second Age through the end of the year given for that
                        row.
                    </li>
                    <li>
                        <b>Deficit</b> is the difference between the "Days
                        Elapsed" and "Days per Solar Year", which can be a
                        deficit (negative number) or a surplus (positive
                        number).
                    </li>
                </ul>
                <p>
                    The following table calculates the <em>Deficit</em> around
                    the years the Stewards made a "special addition" to their
                    calendar (adding 2 days to T.A. 2059 and 1 day to T.A.
                    2360), but also subtracting 1 day from the <em>Deficit</em>{" "}
                    calculated by my simulations, which some readers have
                    suggested may explain Tolkien's statements in Appendix D
                    about the <em>Deficit</em> for these years.
                </p>
                <DisplayTableMap
                    rowKeys={deficitMinus1RowKeys}
                    colKeys={["Deficit minus 1 day", "in days:hrs:min:sec"]}
                    table={deficitMinus1Table}
                />
                <p>
                    The following table shows hypothetical deficit calculations
                    for some Second Age years, if the Second Age had continued
                    through to the end of S.A. 6461 (T.A. 3020), and without the
                    Stewards' adjustments in T.A. 2059 (S.A. 5500) and T.A. 2360
                    (S.A. 5801). Of course, this table includes the 2-day
                    millennial adjustment that would have been due in S.A. 6000
                    (T.A. 2559).
                </p>
                <DisplayTableMap
                    rowKeys={saRowKeys}
                    colKeys={[
                        "Days Elapsed",
                        "Days per Solar Year",
                        "Deficit",
                        "in days:hrs:min:sec",
                    ]}
                    table={saTable}
                />
                <ul>
                    <li>
                        Note that if Steward Mardil's 2 day addition to T.A.
                        2059 (S.A. 5500) were taken into account, then the
                        deficit for S.A. 5501 would match the deficit for T.A.
                        2060, if the leap-day was dropped in T.A. 2060 (matching
                        the "Deficit minus 1 day" figure above).
                    </li>
                    <li>
                        If Mardil's 2 day addition to T.A. 2059 (S.A. 5500) and
                        Steward Hador's 1 day addition to T.A. 2360 (S.A. 5801)
                        were taken into account, then the deficit for S.A. 5801
                        would match the deficit for T.A. 2360, if the leap-day
                        was dropped in T.A. 2360 (matching the "Deficit minus 1
                        day" figure above).
                    </li>
                    <li>
                        Finally, note that the deficit for S.A. 6461 would match
                        the deficit for T.A. 3020 if Hador's 1 day addition to
                        T.A. 2360 (S.A. 5801) were taken into account (Mardil's
                        2 day addition to T.A. 2059 does not need to be taken
                        into account since 2 days would have been added to S.A.
                        6000).
                    </li>
                </ul>
                <p>
                    So rather than Tolkien forgetting about (or intentionally
                    dropping) the leap-days in T.A. 2060 and T.A. 2360 when
                    discussing the <em>Deficit</em> figures in Appendix D, I
                    think he mistakenly used a shortcut of calculating deficits
                    for Second Age years and adjusted those with the Stewards'
                    special additions. This is explained in more detail in my
                    article{" "}
                    <a href="https://psarando.github.io/shire-reckoning/Kings_Reckoning_Rules_and_Deficit.html#the-stewards-reckoning-tolkien-reckoned-mostly-correct">
                        The Stewards' Reckoning: Tolkien Reckoned Mostly Correct
                    </a>
                    .
                </p>
            </>
        );
    },
};

export default {
    title: "Shire Reckoning / Gondor Calendar",
};
