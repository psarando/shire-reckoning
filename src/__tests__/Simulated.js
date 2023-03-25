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

const getFirstWeekDay = (calendar) => getFirstDate(calendar).weekDay;
const getLastWeekDay = (calendar) => getLastDate(calendar).weekDay;
const weekDayString = (date, weekDay) =>
    `${date.toDateString()} weekDay: ${weekDay}`;

it("makes traditional Shire Calendar Dates", () => {
    let startDate = fullYearDate(0, 11, 23);
    let nextFirstDay = fullYearDate(-405, 11, 23);
    let makeCalendar = (nextFirstDay) =>
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
    const startDate = fullYearDate(0, 11, 21);
    let nextFirstDay = fullYearDate(-405, 11, 21);

    const gondorDaysElapsed = (today) => toDaysElapsed(startDate, today);
    const reckonGondorYear = (daysElapsed) =>
        daysElapsedToSecondAgeYear(daysElapsed);
    const reckonNewReckoningYear = (daysElapsed) =>
        daysElapsedToNewReckoningYear(daysElapsedToSecondAgeYear, daysElapsed);
    const reckonNewYearsDay = (today, daysRemainder) =>
        getNewYearDate(startDate, today, daysRemainder);
    const reckonWeekDay = (daysElapsed, daysRemainder) =>
        getWeekDay(daysElapsed, daysRemainder, 7);
    const reckonNewYearTests = (calendar, getYearWithRemainder) => {
        const newYearsDayString = (year, date, firstDay) =>
            `${year}: ${date.toDateString()} => ${firstDay.toDateString()}`;
        const firstWeekDayString = weekDayString(
            getFirstDay(calendar),
            getFirstWeekDay(calendar)
        );
        for (let day = 0; day < calendar.dates.length; day++) {
            const nextGondorDate = calendar.dates[day];
            const nextDay = nextGondorDate.gregorian;
            const daysElapsed = gondorDaysElapsed(nextDay);
            const yearWithRemainder = getYearWithRemainder(daysElapsed);
            const nextNewYearsDay = reckonNewYearsDay(
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

    const makeCalendarKings = (nextFirstDay) =>
        GondorReckoning.makeGondorCalendarDates(
            nextFirstDay,
            startDate,
            GondorReckoning.RECKONING_KINGS,
            GondorReckoning.RECKONING_RULES_TRADITIONAL
        );
    const makeCalendarStewards = (nextFirstDay) =>
        GondorReckoning.makeGondorCalendarDates(
            nextFirstDay,
            startDate,
            GondorReckoning.RECKONING_STEWARDS,
            GondorReckoning.RECKONING_RULES_TRADITIONAL
        );
    const makeCalendarNew = (nextFirstDay) =>
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

    let gondorWeekDayString = (todayGondor) =>
        `${todayGondor.gregorian.toDateString()} weekDay: ${
            todayGondor.weekDay
        }`;

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
    }
});

it("keeps Dates of Interest in sync", () => {
    const meDatesMatch = (d1, d2) => d1.day === d2.day && d1.month === d2.month;
    DatesOfInterest.forEach((event) => {
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
    });
});
