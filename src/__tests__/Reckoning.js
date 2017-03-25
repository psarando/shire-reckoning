/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import { makeShireCalendarDates } from '../ShireReckoning';
import { makeRivendellCalendarDates, TRADITIONAL_RULES, REFORMED_RULES} from '../RivendellReckoning';
import { makeGondorCalendarDates, RECKONING_KINGS, RECKONING_STEWARDS, RECKONING_NEW } from '../GondorReckoning';
import { getNextDate } from '../Utils';

const getFirstDay = (calendar) => (calendar.dates[0].gregorian);
const getLastDay = (calendar) => (calendar.dates[calendar.dates.length - 1].gregorian);

let reckonTests = (nextFirstDay, reckonCalendar, reckonFrom, reckonTo) => {
    let calendar = reckonCalendar(nextFirstDay);

    for (let i = reckonFrom; i < reckonTo; i++) {
        nextFirstDay = getNextDate(getLastDay(calendar));
        calendar = reckonCalendar(nextFirstDay);
        expect(getFirstDay(calendar).toDateString()).toEqual(nextFirstDay.toDateString());
    }
};

describe('ShireReckoning', () => {
    it('makes correct Calendar Dates', () => {
        let nextFirstDay = new Date(-3000,11,21, 0,0,0);
        let reckonCalendar = (nextFirstDay) => (makeShireCalendarDates(nextFirstDay, 21));
        reckonTests(nextFirstDay, reckonCalendar, -3000, 3000);
    });
});

describe('RivendellReckoning', () => {
    it('makes correct Traditional Calendar Dates', () => {
        let nextFirstDay = new Date(-10800,2,23, 0,0,0);
        let reckonCalendar = (nextFirstDay) => (makeRivendellCalendarDates(nextFirstDay, 22, TRADITIONAL_RULES));
        reckonTests(nextFirstDay, reckonCalendar, -10800, 10800);
    });

    it('makes correct Reformed Calendar Dates', () => {
        let nextFirstDay = new Date(-3000,2,25, 0,0,0);
        let reckonCalendar = (nextFirstDay) => (makeRivendellCalendarDates(nextFirstDay, 22, REFORMED_RULES));
        reckonTests(nextFirstDay, reckonCalendar, -3000, 3000);
    });
});

describe('GondorReckoning', () => {
    it('makes correct Kings Calendar Dates', () => {
        let nextFirstDay = new Date(-3000,11,21, 0,0,0);
        let reckonCalendar = (nextFirstDay) => (makeGondorCalendarDates(nextFirstDay, 21, RECKONING_KINGS));
        reckonTests(nextFirstDay, reckonCalendar, -3000, 3000);
    });

    it('makes correct Stewards Calendar Dates', () => {
        let nextFirstDay = new Date(-3000,11,21, 0,0,0);
        let reckonCalendar = (nextFirstDay) => (makeGondorCalendarDates(nextFirstDay, 21, RECKONING_STEWARDS));
        reckonTests(nextFirstDay, reckonCalendar, -3000, 3000);
    });

    it('makes correct New Reckoning Calendar Dates', () => {
        let nextFirstDay = new Date(-3000,2,16, 0,0,0);
        let reckonCalendar = (nextFirstDay) => (makeGondorCalendarDates(nextFirstDay, 21, RECKONING_NEW));
        reckonTests(nextFirstDay, reckonCalendar, -3000, 3000);
    });
});
