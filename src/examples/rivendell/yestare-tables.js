/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    getRivendellNewYearDate,
    makeRivendellCalendarDates,
} from "../../RivendellReckoning";
import { makeShireCalendarDates } from "../../ShireReckoning";
import { RECKONING_RULES_TRADITIONAL } from "../../GondorReckoning";
import {
    datesMatch,
    fullYearDate,
    getFirstDay,
    getLastDay,
    getNextDate,
} from "../../Utils";

const startDateSA = fullYearDate(0, 11, 23);
const makeShireCalendar = (nextFirstDay) =>
    makeShireCalendarDates(
        nextFirstDay,
        startDateSA,
        RECKONING_RULES_TRADITIONAL
    );

const findElvesNewYear = (elvesStartDate, shireCalendar) => {
    let myd = shireCalendar.dates[183].gregorian;
    let elvesNewYear = getRivendellNewYearDate(myd, elvesStartDate);
    return shireCalendar.dates.find((date) =>
        datesMatch(date.gregorian, elvesNewYear)
    );
};

const displayYear = (year) =>
    year > 3441 + 3020
        ? `IV ${year - 3441 - 3020}`
        : year > 3441
        ? `III ${year - 3441}`
        : year > 0
        ? `II ${year}`
        : `Iys ${590 + year}`;

const DisplayTableRows = ({ rows }) => (
    <table border="1rm" cellPadding="2rm" style={{ margin: "1em" }}>
        <tbody>
            {rows.map((row, index) => (
                <tr key={index}>
                    {row.map((cell, index) => (
                        <td key={index}>{cell}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

const DisplayTableMap = ({ rowKeys, colKeys, table }) => (
    <table border="1rm" cellPadding="2rm" style={{ margin: "1em" }}>
        <tbody>
            <tr>
                <th></th>
                {colKeys.map((head) => (
                    <th key={head}>{head}</th>
                ))}
            </tr>
            {rowKeys.map((row) => (
                <tr key={row} style={{ textAlign: "right" }}>
                    <th>{row}</th>
                    {colKeys.map((col) => (
                        <td key={col}>{table[row][col]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

const RivendellReckoningNewYearsDayTables = () => {
    const gregorianTables = [];
    let table = [];
    let row = [`Years 1 - 12`];

    let elvesStartDate = fullYearDate(1, 2, 22);
    let calendar = makeRivendellCalendarDates(elvesStartDate, elvesStartDate);
    let nextFirstDay = getFirstDay(calendar);

    for (let year = 1; year <= 3024; year++) {
        const elvesNewYear = getFirstDay(calendar);
        row.push(`${elvesNewYear.getMonth() + 1}/${elvesNewYear.getDate()}`);

        nextFirstDay = getNextDate(getLastDay(calendar));
        calendar = makeRivendellCalendarDates(nextFirstDay, elvesStartDate);

        if (year % 12 === 0) {
            table.push(row);
            row = [`Years ${year + 1} - ${year + 12}`];
        }
        if (year % 432 === 0) {
            gregorianTables.push(table);
            table = [];
        }
    }

    return (
        <>
            <p>
                The following tables print the corresponding Gregorian month/day
                of Rivendell Reckoning New Year's Days, for a range of years,
                when the leap-year cycles of both calendars are in sync. In
                other words, if Year 1 of both calendars occur in the same year.
                For these tables, the 1st Rivendell New Year's Day falls on a
                Gregorian March 22.
            </p>
            {gregorianTables.map((table, index) => (
                <DisplayTableRows key={index} rows={table} />
            ))}
        </>
    );
};

const RivendellShireNewYearsDayTables = () => {
    const shireTables = [];
    let table = [];
    let row = [`Years 1 - 12`];

    let elvesStartDate = fullYearDate(1, 2, 29);
    let calendar = makeShireCalendar(startDateSA);
    let nextFirstDay = getFirstDay(calendar);

    for (let year = 1; year <= 3024; year++) {
        const elvesNewYearShire = findElvesNewYear(elvesStartDate, calendar);
        row.push(`${elvesNewYearShire.month + 1}/${elvesNewYearShire.day}`);

        nextFirstDay = getNextDate(getLastDay(calendar));
        calendar = makeShireCalendar(nextFirstDay);

        if (year % 12 === 0) {
            table.push(row);
            row = [`Years ${year + 1} - ${year + 12}`];
        }
        if (year % 432 === 0) {
            shireTables.push(table);
            table = [];
        }
    }

    return (
        <>
            <p>
                The following tables print the corresponding Shire month/day of
                Rivendell Reckoning New Year's Days, for a range of years, when
                the leap-year cycles of both of these calendars are in sync. In
                other words, if Year 1 of both calendars occur in the same year.
                For these tables, the 1st Rivendell New Year's Day falls on a
                Shire 'April' (Astron) 6, and the Shire Calendar incorporates
                the Kings' Reckoning millennial leap-days.
            </p>
            {shireTables.map((table, index) => (
                <DisplayTableRows key={index} rows={table} />
            ))}
        </>
    );
};

const RivendellReckoningNewYearsDayShireAlignments = () => {
    const yearRange = 12;

    const table = {};
    const yearsOfInterest = [];
    const reckoningFirstYears = [];
    let firstLoop = true;

    [
        fullYearDate(-589, 2, 23),
        fullYearDate(1, 2, 20),
        fullYearDate(1697, 2, 25),
        fullYearDate(3442, 2, 23),
        fullYearDate(5042, 2, 25),
    ].forEach((elvesStartDate) => {
        let calendar = makeShireCalendar(elvesStartDate);
        let elvesNewYearShire = findElvesNewYear(elvesStartDate, calendar);
        const elvesFirstNewYear = `${displayYear(
            elvesStartDate.getFullYear()
        )}, ${elvesNewYearShire.month + 1}/${elvesNewYearShire.day}`;
        reckoningFirstYears.push(elvesFirstNewYear);

        const lastTAYear = 3441 + 3020;
        let nextFirstDay = fullYearDate(lastTAYear - yearRange - 1, 11, 21);
        calendar = makeShireCalendar(nextFirstDay);

        for (let i = lastTAYear - yearRange; i < lastTAYear + yearRange; i++) {
            nextFirstDay = getNextDate(getLastDay(calendar));
            calendar = makeShireCalendar(nextFirstDay);
            elvesNewYearShire = findElvesNewYear(elvesStartDate, calendar);

            const shireYear = displayYear(calendar.year);
            const shireDisplayDate = `${elvesNewYearShire.month + 1}/${
                elvesNewYearShire.day
            }`;

            if (firstLoop) {
                yearsOfInterest.push(shireYear);
                table[shireYear] = {
                    [elvesFirstNewYear]: shireDisplayDate,
                };
            } else {
                table[shireYear][elvesFirstNewYear] = shireDisplayDate;
            }
        }

        firstLoop = false;
    });

    return (
        <>
            <p>
                The following table finds some possible alignments of the
                Rivendell Reckoning's Yestarë to Shire dates around the end of
                the Third Age. In this table I'm using IV for Fourth Age years,
                III for Third Age years, II for Second Age years, and Iys for
                Years of the Sun in the First Age. The first row displays a
                potential first Yestarë for year 1 of the Rivendell Reckoning
                calendar, given as a proleptic Shire Reckoning or Kings'
                Reckoning date. The first column displays a year around the end
                of the Third Age, and the following columns display the Shire
                Reckoning month/day for Yestarë in that year.
            </p>
            <DisplayTableMap
                rowKeys={yearsOfInterest}
                colKeys={reckoningFirstYears}
                table={table}
            />
        </>
    );
};

export default {
    title: "Shire Reckoning / Rivendell Calendar / New Year's Day Alignments",

    parameters: {
        options: { showPanel: false },
    },
};

export const ForGregorianDates = {
    name: "for Gregorian Dates",
    render: RivendellReckoningNewYearsDayTables,
};

export const ForShireDates = {
    name: "for Shire Dates",
    render: RivendellShireNewYearsDayTables,
};

export const PossibleShireAlignments = {
    name: "Possible Shire Alignments",
    render: RivendellReckoningNewYearsDayShireAlignments,
};
