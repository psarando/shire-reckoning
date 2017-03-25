/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from 'react';
import GondorCalendar from './ui/GondorCalendar';

import * as ShireReckoning from './ShireReckoning';
import * as RivendellReckoning from './RivendellReckoning';
import * as GondorReckoning from './GondorReckoning';

const msgDeprecatedUseInstead = (deprecated, useInstead) => {
    return `Deprecation Warning: ${deprecated}: Use ${useInstead} instead.`;
};

const deprecate = function(fn, deprecatedMsg) {
    let warned = false;

    return function() {
        if (!warned) {
            console.warn(deprecatedMsg
                         + "\n"
                         + new Error().stack.split("\n")[2]);
            warned = true;
        }

        return fn.apply(this, arguments);
    };
};

const deprecatedGetter = (obj, value, deprecated, useInstead, stackIndex = 3) => {
    let warned = false;

    Object.defineProperty(obj, deprecated, {get: function () {
        if (!warned) {
            console.warn(msgDeprecatedUseInstead(deprecated, useInstead)
                         + "\n"
                         + new Error().stack.split("\n")[stackIndex]);
            warned = true;
        }
        return value;
    }});
};

deprecatedGetter(exports, ShireReckoning.ShireWeekdays, "ShireWeekdays", "ShireReckoning.ShireWeekdays");
deprecatedGetter(exports, ShireReckoning.ShireMonths, "ShireMonths", "ShireReckoning.ShireMonths");
deprecatedGetter(exports, RivendellReckoning.RivendellWeekdays, "RivendellWeekdays", "RivendellReckoning.RivendellWeekdays");
deprecatedGetter(exports, RivendellReckoning.RivendellMonths, "RivendellMonths", "RivendellReckoning.RivendellMonths");
deprecatedGetter(exports, RivendellReckoning.TRADITIONAL_RULES, "TRADITIONAL_RULES", "RivendellReckoning.TRADITIONAL_RULES");
deprecatedGetter(exports, RivendellReckoning.REFORMED_RULES, "REFORMED_RULES", "RivendellReckoning.REFORMED_RULES");
deprecatedGetter(exports, GondorReckoning.RECKONING_KINGS, "RECKONING_KINGS", "GondorReckoning.RECKONING_KINGS");
deprecatedGetter(exports, GondorReckoning.RECKONING_STEWARDS, "RECKONING_STEWARDS", "GondorReckoning.RECKONING_STEWARDS");
deprecatedGetter(exports, GondorReckoning.RECKONING_NEW, "RECKONING_NEW", "GondorReckoning.RECKONING_NEW");
deprecatedGetter(exports, GondorReckoning.GondorWeekdays, "NumenorWeekdays", "GondorReckoning.GondorWeekdays");
deprecatedGetter(exports, GondorReckoning.GondorMonths, "NumenorMonths", "GondorReckoning.GondorMonths");

const getStartDate = (startYear, startMonth, functionName) => {
    let warned = false;

    return function(startDate) {
        if (startDate instanceof Date) {
            return startDate;
        }

        if (!warned) {
            console.warn(
`${functionName} should be passed a Date object for startDate.
Passing an integer startDay is deprecated and will no longer be supported in a future release.
${new Error().stack.split("\n")[4]}`
            );
            warned = true;
        }

        let gregorianStartDate = new Date(startYear, startMonth, startDate, 0,0,0);
        gregorianStartDate.setFullYear(startYear, startMonth, startDate);

        return gregorianStartDate;
    }
};

const getShireCalendarStartDate = getStartDate(0, 11, "makeShireCalendarDates(today, startDate)");
const getShireNewYearStartDate = getStartDate(0, 11, "getShireNewYearDate(today, startDate)");

/**
 * @deprecated Use ShireReckoning.makeShireCalendarDates instead.
 */
const makeShireCalendarDates = deprecate((today, startDay) => {
    return ShireReckoning.makeShireCalendarDates(today, getShireCalendarStartDate(startDay));
}, msgDeprecatedUseInstead("makeShireCalendarDates", "ShireReckoning.makeShireCalendarDates"));
/**
 * @deprecated Use ShireReckoning.getShireNewYearDate instead.
 */
const getShireNewYearDate = deprecate((today, startDay) => {
    return ShireReckoning.getShireNewYearDate(today, getShireNewYearStartDate(startDay));
}, msgDeprecatedUseInstead("getShireNewYearDate", "ShireReckoning.getShireNewYearDate"));

const getRivendellCalendarStartDate = getStartDate(1, 2, "makeRivendellCalendarDates(today, startDate, calendarRules)");
const getRivendellNewYearDateStartDate = getStartDate(1, 2, "getRivendellNewYearDate(today, startDate, calendarRules)");

/**
 * @deprecated Use RivendellReckoning.makeRivendellCalendarDates instead.
 */
const makeRivendellCalendarDates = deprecate((today, startDay, calendarRules) => {
    let startDate = getRivendellCalendarStartDate(startDay);
    let calendarDates = RivendellReckoning.makeRivendellCalendarDates(today, startDate, calendarRules);

    calendarDates.dates = calendarDates.dates.map((date) => {
        deprecatedGetter(date, date.day, "date", "day", 2);
        return date;
    });

    return calendarDates;
}, msgDeprecatedUseInstead("makeRivendellCalendarDates", "RivendellReckoning.makeRivendellCalendarDates"));
/**
 * @deprecated Will be removed in a future release.
 */
const getRivendellNewYearDay = RivendellReckoning.getRivendellNewYearDay;
/**
 * @deprecated Use RivendellReckoning.getRivendellNewYearDate instead.
 */
const getRivendellNewYearDate = deprecate((today, startDay, calendarRules) => {
    let startDate = getRivendellNewYearDateStartDate(startDay);
    return RivendellReckoning.getRivendellNewYearDate(today, startDate, calendarRules);
}, msgDeprecatedUseInstead("getRivendellNewYearDate", "RivendellReckoning.getRivendellNewYearDate"));

let warnedRivendellLeapYearDateDeprecation = false;
/**
 * @deprecated Use RivendellReckoning.isRivendellLeapYear instead.
 */
const isRivendellLeapYear = deprecate((year) => {
    if (year instanceof Date){
        year = year.getFullYear();

        if (!warnedRivendellLeapYearDateDeprecation) {
            console.warn(
`Deprecation Warning: isRivendellLeapYear should be passed an integer year.
Passing a Date object is deprecated and will no longer be supported in a future release.
${new Error().stack.split("\n")[3]}`);
            warnedRivendellLeapYearDateDeprecation = true;
        }
    }

    return RivendellReckoning.isRivendellLeapYear(year);
}, msgDeprecatedUseInstead("isRivendellLeapYear", "RivendellReckoning.isRivendellLeapYear"));

const getGondorCalendarStartDate = getStartDate(0, 11, "makeGondorCalendarDates(today, startDate, reckoning)");

/**
 * @deprecated Use GondorReckoning.makeGondorCalendarDates instead.
 */
const makeNumenorCalendarDates = deprecate((today, startDay, reckoning) => {
    let startDate = getGondorCalendarStartDate(startDay);
    let calendarDates = GondorReckoning.makeGondorCalendarDates(today, startDate, reckoning);

    deprecatedGetter(calendarDates, calendarDates.todayGondor, "todayNumenor", "todayGondor", 2);

    calendarDates.dates = calendarDates.dates.map((date) => {
        deprecatedGetter(date, date.day, "date", "day", 2);
        return date;
    });

    return calendarDates;
}, msgDeprecatedUseInstead("makeNumenorCalendarDates", "GondorReckoning.makeGondorCalendarDates"));
/**
 * @deprecated Use GondorReckoning.convertGondorianMonthIndex instead.
 */
const convertGondorianMonthIndex = deprecate((fromReckoning, toReckoning, monthIndex) => {
    return GondorReckoning.convertGondorianMonthIndex(fromReckoning, toReckoning, monthIndex);
}, msgDeprecatedUseInstead("convertGondorianMonthIndex", "GondorReckoning.convertGondorianMonthIndex"));
/**
 * @deprecated Use GondorReckoning.convertGondorianMonthIndex instead.
 */
const convertMonthIndex = deprecate((fromReckoning, toReckoning, monthIndex) => {
    return GondorReckoning.convertGondorianMonthIndex(fromReckoning, toReckoning, monthIndex);
}, msgDeprecatedUseInstead("convertMonthIndex", "GondorReckoning.convertGondorianMonthIndex"));
/**
 * @deprecated Use GondorReckoning.convertGregorianToGondorianWeekday instead.
 */
const convertGregorianWeekday = deprecate((weekday) => {
    return GondorReckoning.convertGregorianToGondorianWeekday(weekday);
}, msgDeprecatedUseInstead("convertGregorianWeekday", "GondorReckoning.convertGregorianToGondorianWeekday"));
/**
 * @deprecated Use GondorReckoning.convertGregorianToGondorianWeekday instead.
 */
const convertGregorianToGondorianWeekday = deprecate((weekday) => {
    return GondorReckoning.convertGregorianToGondorianWeekday(weekday);
}, msgDeprecatedUseInstead("convertGregorianToGondorianWeekday", "GondorReckoning.convertGregorianToGondorianWeekday"));

const getGondorNewYearStartDate = getStartDate(0, 11, "getGondorNewYearDate(today, startDate)");
const getNewReckoningNewYearStartDate = getStartDate(0, 11, "getNewReckoningNewYearDate(today, startDate)");

/**
 * @deprecated Use GondorReckoning.getGondorNewYearDate instead.
 */
const getNumenorNewYearDate = deprecate((today, startDay) => {
    let startDate = getGondorNewYearStartDate(startDay);
    return GondorReckoning.getGondorNewYearDate(today, startDate);
}, msgDeprecatedUseInstead("getNumenorNewYearDate", "GondorReckoning.getGondorNewYearDate"));
/**
 * @deprecated Use GondorReckoning.getNewReckoningNewYearDate instead.
 */
const getNewReckoningNewYearDate = deprecate((today, startDay) => {
    let startDate = getNewReckoningNewYearStartDate(startDay);
    return GondorReckoning.getNewReckoningNewYearDate(today, startDate);
}, msgDeprecatedUseInstead("getNewReckoningNewYearDate", "GondorReckoning.getNewReckoningNewYearDate"));

const NumenorCalendarDeprecated = () => {
    let warned = false;

    return class extends React.Component {
        constructor(props) {
            super(props);

            if (!warned) {
                console.warn(msgDeprecatedUseInstead("NumenorCalendar", "GondorCalendar"));
                warned = true;
            }
        }

        render() {
            return (<GondorCalendar {...this.props} />);
        }
    }
};

const NumenorCalendar = NumenorCalendarDeprecated();

NumenorCalendar.RECKONING_KINGS = GondorCalendar.RECKONING_KINGS;
NumenorCalendar.RECKONING_STEWARDS = GondorCalendar.RECKONING_STEWARDS;
NumenorCalendar.RECKONING_NEW = GondorCalendar.RECKONING_NEW;
NumenorCalendar.MONTH_VIEW_HORIZONTAL = GondorCalendar.MONTH_VIEW_HORIZONTAL;
NumenorCalendar.MONTH_VIEW_VERTICAL = GondorCalendar.MONTH_VIEW_VERTICAL;
NumenorCalendar.LANGUAGE_ENGLISH = GondorCalendar.LANGUAGE_ENGLISH;
NumenorCalendar.LANGUAGE_QUENYA = GondorCalendar.LANGUAGE_QUENYA;
NumenorCalendar.LANGUAGE_SINDARIN = GondorCalendar.LANGUAGE_SINDARIN;

export {
    makeShireCalendarDates,
    getShireNewYearDate,

    makeRivendellCalendarDates,
    getRivendellNewYearDay,
    getRivendellNewYearDate,
    isRivendellLeapYear,

    makeNumenorCalendarDates,
    convertGondorianMonthIndex,
    convertGregorianToGondorianWeekday,
    convertMonthIndex,
    convertGregorianWeekday,
    getNumenorNewYearDate,
    getNewReckoningNewYearDate,

    NumenorCalendar
};
