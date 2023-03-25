/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import { makeShireCalendarDates, getShireNewYearDate } from "../ShireReckoning";
import {
    makeRivendellCalendarDates,
    getRivendellNewYearDate,
    TRADITIONAL_RULES,
    REFORMED_RULES,
} from "../RivendellReckoning";
import {
    makeGondorCalendarDates,
    getGondorNewYearDate,
    getNewReckoningNewYearDate,
    RECKONING_KINGS,
    RECKONING_STEWARDS,
    RECKONING_NEW,
} from "../GondorReckoning";
import { fullYearDate, getNextDate } from "../Utils";

const getFirstDay = (calendar) => calendar.dates[0].gregorian;
const getLastDay = (calendar) =>
    calendar.dates[calendar.dates.length - 1].gregorian;
let weekDayString = (date, weekDay) =>
    `${date.toDateString()} weekDay: ${weekDay}`;
let getFirstWeekDay = (calendar) => calendar.dates[0].weekDay;
let getLastWeekDay = (calendar) =>
    calendar.dates[calendar.dates.length - 1].weekDay;

let reckonTests = (nextFirstDay, reckonCalendar, reckonFrom, reckonTo) => {
    let calendar = reckonCalendar(nextFirstDay);

    for (let i = reckonFrom; i < reckonTo; i++) {
        nextFirstDay = getNextDate(getLastDay(calendar));
        calendar = reckonCalendar(nextFirstDay);
        expect(getFirstDay(calendar).toDateString()).toEqual(
            nextFirstDay.toDateString()
        );
    }
};

let reckonNewYearTests = (
    nextFirstDay,
    reckonCalendar,
    reckonNewYearsDay,
    reckonFrom,
    reckonTo
) => {
    let calendar = reckonCalendar(nextFirstDay);

    for (let i = reckonFrom; i <= reckonTo; i++) {
        for (let day = 0; day < calendar.dates.length; day++) {
            let nextDay = calendar.dates[day].gregorian;
            let firstDay = reckonNewYearsDay(nextDay);
            expect(firstDay.toDateString()).toEqual(
                getFirstDay(calendar).toDateString()
            );
        }
        nextFirstDay = getNextDate(getLastDay(calendar));

        calendar = reckonCalendar(nextFirstDay);
        expect(getFirstDay(calendar).toDateString()).toEqual(
            nextFirstDay.toDateString()
        );
    }
};

describe("ShireReckoning", () => {
    let startDate = fullYearDate(0, 11, 21);

    it("makes correct Calendar Dates", () => {
        let nextFirstDay = fullYearDate(-3000, 11, 21);
        let reckonCalendar = (nextFirstDay) =>
            makeShireCalendarDates(nextFirstDay, startDate);
        reckonTests(nextFirstDay, reckonCalendar, -3000, 3000);
    });

    it("makes correct Shire New Year Dates", () => {
        let nextFirstDay = fullYearDate(-401, 11, 31);
        let reckonCalendar = (nextFirstDay) =>
            makeShireCalendarDates(nextFirstDay, startDate);
        let reckonNewYearsDay = (nextDay) =>
            getShireNewYearDate(nextDay, startDate);

        reckonNewYearTests(
            nextFirstDay,
            reckonCalendar,
            reckonNewYearsDay,
            -405,
            405
        );
    });
});

describe("RivendellReckoning", () => {
    let startDate = fullYearDate(1, 2, 22);

    it("makes correct Traditional Calendar Dates", () => {
        let nextFirstDay = fullYearDate(-10800, 2, 23);
        let reckonCalendar = (nextFirstDay) =>
            makeRivendellCalendarDates(
                nextFirstDay,
                startDate,
                TRADITIONAL_RULES
            );
        reckonTests(nextFirstDay, reckonCalendar, -10800, 10800);
    });

    it("makes correct Reformed Calendar Dates", () => {
        let nextFirstDay = fullYearDate(-3000, 2, 25);
        let reckonCalendar = (nextFirstDay) =>
            makeRivendellCalendarDates(nextFirstDay, startDate, REFORMED_RULES);
        reckonTests(nextFirstDay, reckonCalendar, -3000, 3000);
    });

    let reckonRivendellNewYearTests = (
        nextFirstDay,
        reckonCalendar,
        reckonNewYearsDay,
        reckonFrom,
        reckonTo
    ) => {
        let calendar = reckonCalendar(nextFirstDay);

        for (let i = reckonFrom; i <= reckonTo; i++) {
            for (let day = 0; day < calendar.dates.length; day++) {
                let nextDay = calendar.dates[day].gregorian;
                let firstDay = reckonNewYearsDay(nextDay);
                expect(firstDay.toDateString()).toEqual(
                    getFirstDay(calendar).toDateString()
                );
            }
            nextFirstDay = getNextDate(getLastDay(calendar));
            let nextWeekDay = weekDayString(
                nextFirstDay,
                (getLastWeekDay(calendar) + 1) % 6
            );

            calendar = reckonCalendar(nextFirstDay);
            expect(getFirstDay(calendar).toDateString()).toEqual(
                nextFirstDay.toDateString()
            );
            expect(
                weekDayString(getFirstDay(calendar), getFirstWeekDay(calendar))
            ).toEqual(nextWeekDay);
        }
    };

    it("makes correct Traditional New Year Dates", () => {
        let nextFirstDay = fullYearDate(-433, 2, 23);
        let reckonCalendar = (nextFirstDay) =>
            makeRivendellCalendarDates(nextFirstDay, startDate);
        let reckonNewYearsDay = (nextDay) =>
            getRivendellNewYearDate(nextDay, startDate);

        reckonRivendellNewYearTests(
            nextFirstDay,
            reckonCalendar,
            reckonNewYearsDay,
            -444,
            444
        );
    });

    it("makes correct Traditional New Year Dates", () => {
        let nextFirstDay = fullYearDate(-433, 2, 23);
        let reckonCalendar = (nextFirstDay) =>
            makeRivendellCalendarDates(nextFirstDay, startDate, REFORMED_RULES);
        let reckonNewYearsDay = (nextDay) =>
            getRivendellNewYearDate(nextDay, startDate, REFORMED_RULES);

        reckonRivendellNewYearTests(
            nextFirstDay,
            reckonCalendar,
            reckonNewYearsDay,
            -405,
            405
        );
    });
});

describe("GondorReckoning", () => {
    let startDate = fullYearDate(0, 11, 21);

    it("makes correct Kings Calendar Dates", () => {
        let nextFirstDay = fullYearDate(-3000, 11, 21);
        let reckonCalendar = (nextFirstDay) =>
            makeGondorCalendarDates(nextFirstDay, startDate, RECKONING_KINGS);
        reckonTests(nextFirstDay, reckonCalendar, -3000, 3000);
    });

    it("makes correct Stewards Calendar Dates", () => {
        let nextFirstDay = fullYearDate(-3000, 11, 21);
        let reckonCalendar = (nextFirstDay) =>
            makeGondorCalendarDates(
                nextFirstDay,
                startDate,
                RECKONING_STEWARDS
            );
        reckonTests(nextFirstDay, reckonCalendar, -3000, 3000);
    });

    it("makes correct New Reckoning Calendar Dates", () => {
        let nextFirstDay = fullYearDate(-3000, 2, 16);
        let reckonCalendar = (nextFirstDay) =>
            makeGondorCalendarDates(nextFirstDay, startDate, RECKONING_NEW);
        reckonTests(nextFirstDay, reckonCalendar, -3000, 3000);
    });

    it("makes correct Stewards Reckoning New Year Dates", () => {
        let nextFirstDay = fullYearDate(-401, 11, 31);
        let reckonCalendar = (nextFirstDay) =>
            makeGondorCalendarDates(nextFirstDay, startDate);
        let reckonNewYearsDay = (nextDay) =>
            getGondorNewYearDate(nextDay, startDate);

        reckonNewYearTests(
            nextFirstDay,
            reckonCalendar,
            reckonNewYearsDay,
            -405,
            405
        );
    });

    it("makes correct New Reckoning New Year Dates", () => {
        let nextFirstDay = fullYearDate(-401, 11, 31);
        let reckonCalendar = (nextFirstDay) =>
            makeGondorCalendarDates(nextFirstDay, startDate, RECKONING_NEW);
        let reckonNewYearsDay = (nextDay) =>
            getNewReckoningNewYearDate(nextDay, startDate);

        reckonNewYearTests(
            nextFirstDay,
            reckonCalendar,
            reckonNewYearsDay,
            -405,
            405
        );
    });
});
