/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from 'react';
import ReactDOM from 'react-dom';

import * as TolkienCalendars from '../lib';

describe('ShireReckoning deprecated logs', () => {
    let today = new Date();

    it('warns makeShireCalendarDates deprecated', () => {
        console.log("TolkienCalendars.ShireReckoning.makeShireCalendarDates");
        let calendar = TolkienCalendars.ShireReckoning.makeShireCalendarDates(today, 21);
        console.log("TolkienCalendars.makeShireCalendarDates");
        let calendarDeprecated = TolkienCalendars.makeShireCalendarDates(today, 21);
        calendarDeprecated = TolkienCalendars.makeShireCalendarDates(today, 21);
        calendarDeprecated = TolkienCalendars.makeShireCalendarDates(today, 21);
    });

    it('warns ShireWeekdays deprecated', () => {
        console.log("TolkienCalendars.ShireReckoning.ShireWeekdays");
        let ShireWeekdays = TolkienCalendars.ShireReckoning.ShireWeekdays;
        console.log("TolkienCalendars.ShireWeekdays");
        let ShireWeekdaysDeprecated = TolkienCalendars.ShireWeekdays;
        ShireWeekdaysDeprecated = TolkienCalendars.ShireWeekdays;
        ShireWeekdaysDeprecated = TolkienCalendars.ShireWeekdays;
    });

    it('warns ShireMonths deprecated', () => {
        console.log("TolkienCalendars.ShireReckoning.ShireMonths");
        let ShireMonths = TolkienCalendars.ShireReckoning.ShireMonths;
        console.log("TolkienCalendars.ShireMonths");
        let ShireMonthsDeprecated = TolkienCalendars.ShireMonths;
        ShireMonthsDeprecated = TolkienCalendars.ShireMonths;
        ShireMonthsDeprecated = TolkienCalendars.ShireMonths;
    });

    it('warns getShireNewYearDate deprecated', () => {
        console.log("TolkienCalendars.ShireReckoning.getShireNewYearDate");
        let newYearDay = TolkienCalendars.ShireReckoning.getShireNewYearDate(today, 21);
        console.log("TolkienCalendars.getShireNewYearDate");
        let newYearDayDeprecated = TolkienCalendars.getShireNewYearDate(today, 21);
        newYearDayDeprecated = TolkienCalendars.getShireNewYearDate(today, 21);
        newYearDayDeprecated = TolkienCalendars.getShireNewYearDate(today, 21);
    });
});

describe('RivendellReckoning deprecated logs', () => {
    let today = new Date();

    it('warns makeRivendellCalendarDates deprecated', () => {
        console.log("TolkienCalendars.RivendellReckoning.makeRivendellCalendarDates");
        let rivendellCalendar = TolkienCalendars.RivendellReckoning.makeRivendellCalendarDates(today, 22, TolkienCalendars.RivendellReckoning.TRADITIONAL_RULES);
        rivendellCalendar = TolkienCalendars.RivendellReckoning.makeRivendellCalendarDates(today, 22, TolkienCalendars.RivendellReckoning.REFORMED_RULES);
        console.log("TolkienCalendars.makeRivendellCalendarDates");
        let rivendellCalendarDeprecated = TolkienCalendars.makeRivendellCalendarDates(today, 22, TolkienCalendars.TRADITIONAL_RULES);
        rivendellCalendarDeprecated = TolkienCalendars.makeRivendellCalendarDates(today, 22, TolkienCalendars.REFORMED_RULES);
        rivendellCalendarDeprecated = TolkienCalendars.makeRivendellCalendarDates(today, 22, TolkienCalendars.TRADITIONAL_RULES);
        console.log("makeRivendellCalendarDates.dates[0].day");
        let date = rivendellCalendarDeprecated.dates[0].day;
        console.log("makeRivendellCalendarDates.dates[0].date");
        date = rivendellCalendarDeprecated.dates[0].date;
        date = rivendellCalendarDeprecated.dates[0].date;
        date = rivendellCalendarDeprecated.dates[0].date;
    });

    it('warns RivendellWeekdays deprecated', () => {
        console.log("TolkienCalendars.RivendellReckoning.RivendellWeekdays");
        let RivendellWeekdays = TolkienCalendars.RivendellReckoning.RivendellWeekdays;
        console.log("TolkienCalendars.RivendellWeekdays");
        let RivendellWeekdaysDeprecated = TolkienCalendars.RivendellWeekdays;
        RivendellWeekdaysDeprecated = TolkienCalendars.RivendellWeekdays;
        RivendellWeekdaysDeprecated = TolkienCalendars.RivendellWeekdays;
    });

    it('warns RivendellMonths deprecated', () => {
        console.log("TolkienCalendars.RivendellReckoning.RivendellMonths");
        let RivendellMonths = TolkienCalendars.RivendellReckoning.RivendellMonths;
        console.log("TolkienCalendars.RivendellMonths");
        let RivendellMonthsDeprecated = TolkienCalendars.RivendellMonths;
        RivendellMonthsDeprecated = TolkienCalendars.RivendellMonths;
        RivendellMonthsDeprecated = TolkienCalendars.RivendellMonths;
    });

    it('warns getRivendellNewYearDay deprecated', () => {
        console.log("TolkienCalendars.RivendellReckoning.getRivendellNewYearDay");
        let rivendellNewYearDayDeprecated = TolkienCalendars.RivendellReckoning.getRivendellNewYearDay(today.getFullYear(), 22, TolkienCalendars.RivendellReckoning.TRADITIONAL_RULES);
        rivendellNewYearDayDeprecated = TolkienCalendars.RivendellReckoning.getRivendellNewYearDay(today.getFullYear(), 22, TolkienCalendars.RivendellReckoning.REFORMED_RULES);
        console.log("TolkienCalendars.getRivendellNewYearDay");
        rivendellNewYearDayDeprecated = TolkienCalendars.getRivendellNewYearDay(today.getFullYear(), 22, TolkienCalendars.TRADITIONAL_RULES);
        rivendellNewYearDayDeprecated = TolkienCalendars.getRivendellNewYearDay(today.getFullYear(), 22, TolkienCalendars.REFORMED_RULES);
    });

    it('warns getRivendellNewYearDate deprecated', () => {
        console.log("TolkienCalendars.RivendellReckoning.getRivendellNewYearDate");
        let rivendellNewYearDate = TolkienCalendars.RivendellReckoning.getRivendellNewYearDate(today, 22, TolkienCalendars.RivendellReckoning.TRADITIONAL_RULES);
        rivendellNewYearDate = TolkienCalendars.RivendellReckoning.getRivendellNewYearDate(today, 22, TolkienCalendars.RivendellReckoning.REFORMED_RULES);
        console.log("TolkienCalendars.getRivendellNewYearDate");
        let rivendellNewYearDateDeprecated = TolkienCalendars.getRivendellNewYearDate(today, 22, TolkienCalendars.TRADITIONAL_RULES);
        rivendellNewYearDateDeprecated = TolkienCalendars.getRivendellNewYearDate(today, 22, TolkienCalendars.REFORMED_RULES);
        rivendellNewYearDateDeprecated = TolkienCalendars.getRivendellNewYearDate(today, 22, TolkienCalendars.TRADITIONAL_RULES);
        rivendellNewYearDateDeprecated = TolkienCalendars.getRivendellNewYearDate(today, 22, TolkienCalendars.REFORMED_RULES);
    });

    it('warns isRivendellLeapYear deprecated', () => {
        console.log("TolkienCalendars.RivendellReckoning.isRivendellLeapYear");
        let isRivendellLeapYear = TolkienCalendars.RivendellReckoning.isRivendellLeapYear(today);
        console.log("TolkienCalendars.isRivendellLeapYear");
        let isRivendellLeapYearDeprecated = TolkienCalendars.isRivendellLeapYear(today);
        isRivendellLeapYearDeprecated = TolkienCalendars.isRivendellLeapYear(today);
        isRivendellLeapYearDeprecated = TolkienCalendars.isRivendellLeapYear(today);
    });
});

describe('GondorReckoning deprecated logs', () => {
    let today = new Date();

    it('warns makeGondorCalendarDates deprecated', () => {
        console.log("TolkienCalendars.GondorReckoning.makeGondorCalendarDates");
        let gondorCalendar = TolkienCalendars.GondorReckoning.makeGondorCalendarDates(today, 21, TolkienCalendars.GondorReckoning.RECKONING_KINGS);
        gondorCalendar = TolkienCalendars.GondorReckoning.makeGondorCalendarDates(today, 21, TolkienCalendars.GondorReckoning.RECKONING_STEWARDS);
        gondorCalendar = TolkienCalendars.GondorReckoning.makeGondorCalendarDates(today, 21, TolkienCalendars.GondorReckoning.RECKONING_NEW);
        console.log("makeGondorCalendarDates.todayGondor");
        let todayGondor = gondorCalendar.todayGondor;
        todayGondor = gondorCalendar.todayGondor;
        todayGondor = gondorCalendar.todayGondor;
        console.log("TolkienCalendars.makeNumenorCalendarDates");
        let numenorCalendarDeprecated = TolkienCalendars.makeNumenorCalendarDates(today, 21, TolkienCalendars.RECKONING_KINGS);
        numenorCalendarDeprecated = TolkienCalendars.makeNumenorCalendarDates(today, 21, TolkienCalendars.RECKONING_STEWARDS);
        numenorCalendarDeprecated = TolkienCalendars.makeNumenorCalendarDates(today, 21, TolkienCalendars.RECKONING_NEW);
        console.log("makeNumenorCalendarDates.todayNumenor");
        let todayNumenor = numenorCalendarDeprecated.todayNumenor;
        todayNumenor = numenorCalendarDeprecated.todayNumenor;
        todayNumenor = numenorCalendarDeprecated.todayNumenor;
        console.log("makeNumenorCalendarDates.dates[0].day");
        let date = numenorCalendarDeprecated.dates[0].day;
        console.log("makeNumenorCalendarDates.dates[0].date");
        date = numenorCalendarDeprecated.dates[0].date;
        date = numenorCalendarDeprecated.dates[0].date;
        date = numenorCalendarDeprecated.dates[0].date;
    });

    it('warns NumenorWeekdays deprecated', () => {
        console.log("TolkienCalendars.GondorReckoning.GondorWeekdays");
        let GondorWeekdays = TolkienCalendars.GondorReckoning.GondorWeekdays;
        console.log("TolkienCalendars.NumenorWeekdays");
        let NumenorWeekdaysDeprecated = TolkienCalendars.NumenorWeekdays;
        NumenorWeekdaysDeprecated = TolkienCalendars.NumenorWeekdays;
        NumenorWeekdaysDeprecated = TolkienCalendars.NumenorWeekdays;
    });

    it('warns GondorMonths deprecated', () => {
        console.log("TolkienCalendars.GondorReckoning.GondorMonths");
        let GondorMonths = TolkienCalendars.GondorReckoning.GondorMonths;
        console.log("TolkienCalendars.NumenorMonths");
        let NumenorMonthsDeprecated = TolkienCalendars.NumenorMonths;
        NumenorMonthsDeprecated = TolkienCalendars.NumenorMonths;
        NumenorMonthsDeprecated = TolkienCalendars.NumenorMonths;
    });

    it('warns convertMonthIndex/convertGondorianMonthIndex deprecated', () => {
        console.log("TolkienCalendars.GondorReckoning.convertGondorianMonthIndex");
        let monthIndexDeprecated = TolkienCalendars.GondorReckoning.convertGondorianMonthIndex(TolkienCalendars.GondorReckoning.RECKONING_KINGS, TolkienCalendars.GondorReckoning.RECKONING_NEW, 0);

        console.log("TolkienCalendars.convertMonthIndex");
        monthIndexDeprecated = TolkienCalendars.convertMonthIndex(TolkienCalendars.RECKONING_KINGS, TolkienCalendars.RECKONING_STEWARDS, 0);
        monthIndexDeprecated = TolkienCalendars.convertMonthIndex(TolkienCalendars.RECKONING_STEWARDS, TolkienCalendars.RECKONING_NEW, 0);
        monthIndexDeprecated = TolkienCalendars.convertMonthIndex(TolkienCalendars.RECKONING_NEW, TolkienCalendars.RECKONING_KINGS, 0);

        console.log("TolkienCalendars.convertGondorianMonthIndex");
        monthIndexDeprecated = TolkienCalendars.convertGondorianMonthIndex(TolkienCalendars.RECKONING_KINGS, TolkienCalendars.RECKONING_STEWARDS, 0);
        monthIndexDeprecated = TolkienCalendars.convertGondorianMonthIndex(TolkienCalendars.RECKONING_STEWARDS, TolkienCalendars.RECKONING_NEW, 0);
        monthIndexDeprecated = TolkienCalendars.convertGondorianMonthIndex(TolkienCalendars.RECKONING_NEW, TolkienCalendars.RECKONING_KINGS, 0);
    });

    it('warns convertGregorianWeekday/convertGregorianToGondorianWeekday deprecated', () => {
        console.log("TolkienCalendars.GondorReckoning.convertGregorianToGondorianWeekday");
        let weekdayDeprecated = TolkienCalendars.GondorReckoning.convertGregorianToGondorianWeekday(0);

        console.log("TolkienCalendars.convertGregorianWeekday");
        weekdayDeprecated = TolkienCalendars.convertGregorianWeekday(0);
        weekdayDeprecated = TolkienCalendars.convertGregorianWeekday(0);
        weekdayDeprecated = TolkienCalendars.convertGregorianWeekday(0);

        console.log("TolkienCalendars.convertGregorianToGondorianWeekday");
        weekdayDeprecated = TolkienCalendars.convertGregorianToGondorianWeekday(0);
        weekdayDeprecated = TolkienCalendars.convertGregorianToGondorianWeekday(0);
        weekdayDeprecated = TolkienCalendars.convertGregorianToGondorianWeekday(0);
    });

    it('warns getGondorNewYearDate deprecated', () => {
        console.log("TolkienCalendars.GondorReckoning.getGondorNewYearDate");
        let gondorNewYearDate = TolkienCalendars.GondorReckoning.getGondorNewYearDate(today, 21);
        gondorNewYearDate = TolkienCalendars.GondorReckoning.getGondorNewYearDate(today, 21);
        console.log("TolkienCalendars.getNumenorNewYearDate");
        let numenorNewYearDateDeprecated = TolkienCalendars.getNumenorNewYearDate(today, 21);
        numenorNewYearDateDeprecated = TolkienCalendars.getNumenorNewYearDate(today, 21);
        numenorNewYearDateDeprecated = TolkienCalendars.getNumenorNewYearDate(today, 21);
    });

    it('warns getNewReckoningNewYearDate deprecated', () => {
        console.log("TolkienCalendars.GondorReckoning.getNewReckoningNewYearDate");
        let gondorNewReckoningNewYearDate = TolkienCalendars.GondorReckoning.getNewReckoningNewYearDate(today, 21);
        gondorNewReckoningNewYearDate = TolkienCalendars.GondorReckoning.getNewReckoningNewYearDate(today, 21);
        console.log("TolkienCalendars.getNewReckoningNewYearDate");
        let numenorNewReckoningNewYearDateDeprecated = TolkienCalendars.getNewReckoningNewYearDate(today, 21);
        numenorNewReckoningNewYearDateDeprecated = TolkienCalendars.getNewReckoningNewYearDate(today, 21);
        numenorNewReckoningNewYearDateDeprecated = TolkienCalendars.getNewReckoningNewYearDate(today, 21);
    });
});

describe('GondorCalendar deprecated logs', () => {
    it('warns NumenorCalendar deprecated', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TolkienCalendars.NumenorCalendar />, div);
        ReactDOM.render(<TolkienCalendars.NumenorCalendar language={TolkienCalendars.NumenorCalendar.LANGUAGE_ENGLISH} />, div);
        ReactDOM.render(<TolkienCalendars.NumenorCalendar reckoning={TolkienCalendars.NumenorCalendar.RECKONING_NEW} />, div);
    });
});
