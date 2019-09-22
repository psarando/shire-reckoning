/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import { makeShireCalendarDates } from "../ShireReckoning";
import {
    getRivendellNewYearDate,
    makeRivendellCalendarDates,
} from "../RivendellReckoning";
import * as GondorReckoning from "../GondorReckoning";
import {
    RECKONING_RULES_TRADITIONAL,
    RECKONING_STEWARDS,
    makeGondorCalendarDates,
} from "../GondorReckoning";
import {
    daysElapsedToSecondAgeYear,
    daysElapsedToNewReckoningYear,
    toDaysElapsed,
    getNewYearDate,
    getWeekDay,
    getNextDate,
    fullYearDate,
    datesMatch,
    getFirstDate,
    getLastDate,
    getFirstDay,
    getLastDay,
} from "../Utils";

import {
    SyncAges,
    DatesOfInterest,
    eventOfInterestToDate,
} from "../examples/simulation/DatesOfInterest";

const getFirstWeekDay = calendar => getFirstDate(calendar).weekDay;
const getLastWeekDay = calendar => getLastDate(calendar).weekDay;
const weekDayString = (date, weekDay) =>
    `${date.toDateString()} weekDay: ${weekDay}`;

it("makes traditional Shire Calendar Dates", () => {
    let startDate = fullYearDate(0, 11, 23);
    let nextFirstDay = fullYearDate(-405, 11, 23);
    let makeCalendar = nextFirstDay =>
        makeShireCalendarDates(
            nextFirstDay,
            startDate,
            GondorReckoning.RECKONING_RULES_TRADITIONAL
        );
    let calendar = makeCalendar(nextFirstDay);

    nextFirstDay = getNextDate(getLastDay(calendar));

    for (let i = 1; i <= 8000; i++) {
        nextFirstDay = getNextDate(getLastDay(calendar));
        let nextWeekDayString = weekDayString(
            nextFirstDay,
            (getLastWeekDay(calendar) + 1) % 7
        );

        calendar = makeCalendar(nextFirstDay);
        expect(getFirstDay(calendar).toDateString()).toEqual(
            nextFirstDay.toDateString()
        );
        expect(
            weekDayString(getFirstDay(calendar), getFirstWeekDay(calendar))
        ).toEqual(nextWeekDayString);
    }
});

it("makes correct Gondor Traditional Dates", () => {
    let startDate = fullYearDate(0, 11, 21);
    let nextFirstDay = fullYearDate(-405, 11, 21);

    let gondorDaysElapsed = today => toDaysElapsed(startDate, today);
    let reckonGondorYear = daysElapsed =>
        daysElapsedToSecondAgeYear(daysElapsed);
    let reckonNewReckoningYear = daysElapsed =>
        daysElapsedToNewReckoningYear(daysElapsedToSecondAgeYear, daysElapsed);
    let reckonNewYearsDay = (today, daysRemainder) =>
        getNewYearDate(startDate, today, daysRemainder);
    let reckonWeekDay = (daysElapsed, daysRemainder) =>
        getWeekDay(daysElapsed, daysRemainder, 7);
    let reckonNewYearTests = (calendar, getYearWithRemainder) => {
        let newYearsDayString = (year, date, firstDay) =>
            `${year}: ${date.toDateString()} => ${firstDay.toDateString()}`;
        let firstWeekDayString = weekDayString(
            getFirstDay(calendar),
            getFirstWeekDay(calendar)
        );
        for (let day = 0; day < calendar.dates.length; day++) {
            let nextGondorDate = calendar.dates[day];
            let nextDay = nextGondorDate.gregorian;
            let daysElapsed = gondorDaysElapsed(nextDay);
            let yearWithRemainder = getYearWithRemainder(daysElapsed);
            let nextNewYearsDay = reckonNewYearsDay(
                nextDay,
                yearWithRemainder.daysRemainder
            );

            expect(
                newYearsDayString(
                    yearWithRemainder.year,
                    nextDay,
                    nextNewYearsDay
                )
            ).toEqual(
                newYearsDayString(calendar.year, nextDay, getFirstDay(calendar))
            );
            expect(
                weekDayString(
                    nextNewYearsDay,
                    reckonWeekDay(daysElapsed, yearWithRemainder.daysRemainder)
                )
            ).toEqual(firstWeekDayString);
        }
    };

    let makeCalendarKings = nextFirstDay =>
        GondorReckoning.makeGondorCalendarDates(
            nextFirstDay,
            startDate,
            GondorReckoning.RECKONING_KINGS,
            GondorReckoning.RECKONING_RULES_TRADITIONAL
        );
    let makeCalendarStewards = nextFirstDay =>
        GondorReckoning.makeGondorCalendarDates(
            nextFirstDay,
            startDate,
            GondorReckoning.RECKONING_STEWARDS,
            GondorReckoning.RECKONING_RULES_TRADITIONAL
        );
    let makeCalendarNew = nextFirstDay =>
        GondorReckoning.makeGondorCalendarDates(
            nextFirstDay,
            startDate,
            GondorReckoning.RECKONING_NEW,
            GondorReckoning.RECKONING_RULES_TRADITIONAL
        );

    let calendarKings = makeCalendarKings(nextFirstDay);
    let calendarStewards = makeCalendarStewards(nextFirstDay);
    nextFirstDay.setFullYear(-404, 2, 16);
    let calendarNew = makeCalendarNew(nextFirstDay);

    let gondorWeekDayString = todayGondor =>
        `${todayGondor.gregorian.toDateString()} weekDay: ${
            todayGondor.weekDay
        }`;

    const roundDecimals = deficit => {
        return Math.round(deficit * 100000000000) / 100000000000;
    };

    // prettier-ignore
    // assuming year length 365:05:48:46 = 365.2421990740741
    const yearLengthDays =
        365.0
        + 5 / 24
        + 48 / (24 * 60)
        + 46 / (24 * 60 * 60);

    const formatDeficit = deficit => {
        let deficitSign = deficit < 0 ? "-" : "+";

        let deficitDays = Math.abs(deficit);
        let deficitR = deficitDays - Math.floor(deficitDays);
        deficitDays = Math.floor(deficitDays);

        let deficitHours = deficitR * 24;
        deficitR = deficitHours - Math.floor(deficitHours);
        deficitHours = Math.floor(deficitHours);

        let deficitMins = deficitR * 60;
        deficitR = deficitMins - Math.floor(deficitMins);
        deficitMins = Math.floor(deficitMins);

        let deficitSecs = Math.round(deficitR * 60);

        return `${deficitSign}${deficitDays}d:${deficitHours}h:${deficitMins}m:${deficitSecs}s`;
    };

    let logs = [];
    let appendixLogs = [];
    for (let i = 0; i < 8000; i++) {
        nextFirstDay = getNextDate(getLastDay(calendarNew));
        calendarNew = makeCalendarNew(nextFirstDay);
        expect(getFirstDay(calendarNew).toDateString()).toEqual(
            nextFirstDay.toDateString()
        );

        let todayGondor = calendarNew.todayGondor;

        nextFirstDay = getNextDate(getLastDay(calendarKings));
        calendarKings = makeCalendarKings(todayGondor.gregorian);
        expect(getFirstDay(calendarKings).toDateString()).toEqual(
            nextFirstDay.toDateString()
        );

        nextFirstDay = getNextDate(getLastDay(calendarStewards));
        calendarStewards = makeCalendarStewards(todayGondor.gregorian);
        expect(getFirstDay(calendarStewards).toDateString()).toEqual(
            nextFirstDay.toDateString()
        );

        expect(gondorWeekDayString(calendarKings.todayGondor)).toEqual(
            gondorWeekDayString(calendarStewards.todayGondor)
        );
        expect(gondorWeekDayString(calendarStewards.todayGondor)).toEqual(
            gondorWeekDayString(calendarNew.todayGondor)
        );

        if (
            GondorReckoning.isMillennialLeapYear(calendarStewards.year)
            || calendarStewards.year === 3441 + 2999
            || calendarStewards.year === 3441 + 3000
            || calendarStewards.year === 3441 + 3001
            || (-405 <= calendarStewards.year && calendarStewards.year <= 405)
        ) {
            reckonNewYearTests(calendarStewards, reckonGondorYear);
            reckonNewYearTests(calendarNew, reckonNewReckoningYear);
        }

        if (
            calendarStewards.year <= 3441 + 3021
            && (GondorReckoning.isMillennialLeapYear(calendarStewards.year - 1)
                || calendarStewards.year === 2
                || calendarStewards.year === 101
                || calendarStewards.year === 501
                || calendarStewards.year === 3441 + 1
                || calendarStewards.year === 3441 + 2
                || calendarStewards.year === 3441 + 4
                || calendarStewards.year === 3441 + 5
                || calendarStewards.year === 3441 + 2059
                || calendarStewards.year === 3441 + 2061
                || calendarStewards.year === 3441 + 2360
                || calendarStewards.year === 3441 + 3000
                || calendarStewards.year === 3441 + 3001
                || calendarStewards.year === 3441 + 3020
                || calendarStewards.year === 3441 + 3021)
        ) {
            // Print the Deficit for this year.
            const displayYear =
                calendarStewards.year > 3441 + 1
                    ? `T.A. ${calendarStewards.year - 3441 - 1}`
                    : `S.A. ${calendarStewards.year - 1}`;
            const daysElapsed = toDaysElapsed(startDate, nextFirstDay);
            const realElapsed = (calendarStewards.year - 1) * yearLengthDays;
            const deficit = roundDecimals(daysElapsed - realElapsed);
            logs[displayYear] = {
                "Days Elapsed": daysElapsed,
                "Real Elapsed": realElapsed,
                Deficit: deficit,
                "Defict Formatted": formatDeficit(deficit),
            };

            if (
                calendarStewards.year === 3441 + 2061
                || calendarStewards.year === 3441 + 2361
            ) {
                appendixLogs.push(
                    `\t${displayYear} deficit - 1day = ${roundDecimals(
                        deficit - 1.0
                    )} ---> ${formatDeficit(deficit - 1.0)}`
                );
            }
        }
    }

    console.table(logs);
    console.log(appendixLogs.join("\n"));
});

describe("print only", () => {
    const startDateSA = fullYearDate(0, 11, 23);
    const makeShireCalendar = nextFirstDay =>
        makeShireCalendarDates(
            nextFirstDay,
            startDateSA,
            GondorReckoning.RECKONING_RULES_TRADITIONAL
        );
    const findElvesNewYear = (elvesStartDate, shireCalendar) => {
        let myd = shireCalendar.dates[183].gregorian;
        let elvesNewYear = getRivendellNewYearDate(myd, elvesStartDate);
        return shireCalendar.dates.find(date =>
            datesMatch(date.gregorian, elvesNewYear)
        );
    };
    const displayYear = year =>
        year > 3441 + 3020
            ? `IV ${year - 3441 - 3020}`
            : year > 3441
            ? `III ${year - 3441}`
            : year > 0
            ? `II ${year}`
            : `Iys ${590 + year}`;

    it("lists Rivendell New Year Dates on Shire Dates", () => {
        console.log(
            [
                "The following tables print the corresponding Gregorian month/day of Rivendell Reckoning New Year's Days,",
                "for a range of years, when the leap-year cycles of both calendars are in sync.",
                "In other words, if Year 1 of both calendars occur in the same year.",
                "For these tables, the 1st Rivendell New Year's Day falls on a Gregorian March 22.",
            ].join("\n")
        );

        let table = [];
        let row = `Years 1 - 12`;
        table[row] = [];

        let elvesStartDate = fullYearDate(1, 2, 22);
        let calendar = makeRivendellCalendarDates(
            elvesStartDate,
            elvesStartDate
        );
        let nextFirstDay = getFirstDay(calendar);

        for (let year = 1; year <= 3024; year++) {
            if (year % 12 === 1) {
                row = `Years ${year} - ${year + 11}`;
                table[row] = [];
            }

            const elvesNewYear = getFirstDay(calendar);
            table[row].push(
                `${elvesNewYear.getMonth() + 1}/${elvesNewYear.getDate()}`
            );

            nextFirstDay = getNextDate(getLastDay(calendar));
            calendar = makeRivendellCalendarDates(nextFirstDay, elvesStartDate);

            if (year % 432 === 0) {
                console.table(table);
                table = [];
            }
        }

        console.log(
            [
                "The following tables print the corresponding Shire month/day of Rivendell Reckoning New Year's Days,",
                "for a range of years, when the leap-year cycles of both of these calendars are in sync.",
                "In other words, if Year 1 of both calendars occur in the same year.",
                "For these tables, the 1st Rivendell New Year's Day falls on a Shire 'April' (Astron) 6,",
                "and the Shire Calendar incorporates the Kings' Reckoning millennial leap-days.",
            ].join("\n")
        );

        elvesStartDate = fullYearDate(1, 2, 29);
        calendar = makeShireCalendar(startDateSA);
        nextFirstDay = getFirstDay(calendar);

        for (let year = 1; year <= 3024; year++) {
            if (year % 12 === 1) {
                row = `Years ${year} - ${year + 11}`;
                table[row] = [];
            }

            const elvesNewYearShire = findElvesNewYear(
                elvesStartDate,
                calendar
            );
            table[row].push(
                `${elvesNewYearShire.month + 1}/${elvesNewYearShire.day}`
            );

            nextFirstDay = getNextDate(getLastDay(calendar));
            calendar = makeShireCalendar(nextFirstDay);

            if (year % 432 === 0) {
                console.table(table);
                table = [];
            }
        }
    });

    it("finds Rivendell New Year Dates as Shire Dates", () => {
        const yearRange = 12;

        const table = [];
        let firstLoop = true;
        [
            fullYearDate(-589, 2, 23),
            fullYearDate(1, 2, 20),
            fullYearDate(1697, 2, 25),
            fullYearDate(3442, 2, 23),
            fullYearDate(5042, 2, 25),
        ].forEach(elvesStartDate => {
            let calendar = makeShireCalendar(elvesStartDate);
            let elvesNewYearShire = findElvesNewYear(elvesStartDate, calendar);
            const elvesFirstNewYear = `${displayYear(
                elvesStartDate.getFullYear()
            )}, ${elvesNewYearShire.month + 1}/${elvesNewYearShire.day}`;

            const lastTAYear = 3441 + 3020;
            let nextFirstDay = fullYearDate(lastTAYear - yearRange - 1, 11, 21);
            calendar = makeShireCalendar(nextFirstDay);

            for (
                let i = lastTAYear - yearRange;
                i < lastTAYear + yearRange;
                i++
            ) {
                nextFirstDay = getNextDate(getLastDay(calendar));
                calendar = makeShireCalendar(nextFirstDay);
                elvesNewYearShire = findElvesNewYear(elvesStartDate, calendar);

                const shireYear = displayYear(calendar.year);
                const shireDisplayDate = `${elvesNewYearShire.month + 1}/${
                    elvesNewYearShire.day
                }`;
                if (firstLoop) {
                    table[shireYear] = {
                        [elvesFirstNewYear]: shireDisplayDate,
                    };
                } else {
                    table[shireYear][elvesFirstNewYear] = shireDisplayDate;
                }
            }

            firstLoop = false;
        });

        console.log(
            [
                "The following table finds some possible alignments of the Rivendell Reckoning's Yestarë",
                "to Shire dates around the end of the Third Age.",
                "In this table I'm using IV for Fourth Age years, III for Third Age years, II for Second Age years,",
                "and Iys for Years of the Sun in the First Age.",
                "The first row displays a potential first Yestarë for year 1 of the Rivendell Reckoning calendar,",
                "given as a proleptic Shire Reckoning or Kings' Reckoning date.",
                "The first column displays a year around the end of the Third Age,",
                "and the following columns display the Shire Reckoning month/day for Yestarë in that year.",
            ].join("\n")
        );
        console.table(table);
    });
});

it("keeps Dates of Interest in sync", () => {
    const meDatesMatch = (d1, d2) => d1.day === d2.day && d1.month === d2.month;
    const logs = [];
    DatesOfInterest.forEach(event => {
        if (event.label === "") return;

        let startDatesGSA = SyncAges[1].startDates;
        let gregorianGSA = eventOfInterestToDate(
            event,
            startDatesGSA.shire,
            startDatesGSA.rivendell
        );
        let shireGSA = makeShireCalendarDates(
            gregorianGSA,
            startDatesGSA.shire,
            RECKONING_RULES_TRADITIONAL
        );
        let gondorGSA = makeGondorCalendarDates(
            gregorianGSA,
            startDatesGSA.shire,
            RECKONING_STEWARDS,
            RECKONING_RULES_TRADITIONAL
        );
        let rivendellGSA = makeRivendellCalendarDates(
            gregorianGSA,
            startDatesGSA.rivendell
        );
        for (let i = 2; i < SyncAges.length; i++) {
            let startDatesNext = SyncAges[i].startDates;
            let gregorianNext = eventOfInterestToDate(
                event,
                startDatesNext.shire,
                startDatesNext.rivendell
            );
            let shireNext = makeShireCalendarDates(
                gregorianNext,
                startDatesNext.shire,
                RECKONING_RULES_TRADITIONAL
            );
            let gondorNext = makeGondorCalendarDates(
                gregorianNext,
                startDatesNext.shire,
                RECKONING_STEWARDS,
                RECKONING_RULES_TRADITIONAL
            );
            let rivendellNext = makeRivendellCalendarDates(
                gregorianNext,
                startDatesNext.rivendell
            );

            expect(
                meDatesMatch(shireGSA.todayShire, shireNext.todayShire)
            ).toBeTruthy();
            expect(
                meDatesMatch(gondorGSA.todayGondor, gondorNext.todayGondor)
            ).toBeTruthy();
            expect(
                meDatesMatch(
                    rivendellGSA.todayRivendell,
                    rivendellNext.todayRivendell
                )
            ).toBeTruthy();
        }

        // Also print Dates of Interest aligned so that III 3019 = modern 2019,
        // for fun!
        let year = event.year - 4441;
        let bce = "";
        if (year < 1) {
            year *= -1;
            year++;
            bce = " B.C.E.";
        }
        logs.push({
            "Modern Year": `${year}${bce}`,
            "Middle-earth Year": event.displayDate,
            "Event Description": event.label,
        });
    });

    console.log(
        [
            "The following table will print the Dates of Interest",
            "aligned with a corresponding modern year so that III 3019 = modern 2019,",
            "just for fun!",
        ].join("\n")
    );
    console.table(logs);
});
