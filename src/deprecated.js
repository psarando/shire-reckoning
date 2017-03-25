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

/**
 * @deprecated Use ShireReckoning.makeShireCalendarDates instead.
 */
const makeShireCalendarDates = deprecate((today, startDay) => {
    return ShireReckoning.makeShireCalendarDates(today, startDay);
}, msgDeprecatedUseInstead("makeShireCalendarDates", "ShireReckoning.makeShireCalendarDates"));
/**
 * @deprecated Use ShireReckoning.getShireNewYearDate instead.
 */
const getShireNewYearDate = deprecate((today, startDay) => {
    return ShireReckoning.getShireNewYearDate(today, startDay);
}, msgDeprecatedUseInstead("getShireNewYearDate", "ShireReckoning.getShireNewYearDate"));

/**
 * @deprecated Use RivendellReckoning.makeRivendellCalendarDates instead.
 */
const makeRivendellCalendarDates = deprecate((today, startDay, calendarRules) => {
    let calendarDates = RivendellReckoning.makeRivendellCalendarDates(today, startDay, calendarRules);

    calendarDates.dates = calendarDates.dates.map((date) => {
        deprecatedGetter(date, date.day, "date", "day", 2);
        return date;
    });

    return calendarDates;
}, msgDeprecatedUseInstead("makeRivendellCalendarDates", "RivendellReckoning.makeRivendellCalendarDates"));
/**
 * @deprecated Use RivendellReckoning.getRivendellNewYearDay instead.
 */
const getRivendellNewYearDay = deprecate((year, startDay, calendarRules) => {
    return RivendellReckoning.getRivendellNewYearDay(year, startDay, calendarRules);
}, msgDeprecatedUseInstead("getRivendellNewYearDay", "RivendellReckoning.getRivendellNewYearDay"));
/**
 * @deprecated Use RivendellReckoning.getRivendellNewYearDate instead.
 */
const getRivendellNewYearDate = deprecate((today, startDay, calendarRules) => {
    return RivendellReckoning.getRivendellNewYearDate(today, startDay, calendarRules);
}, msgDeprecatedUseInstead("getRivendellNewYearDate", "RivendellReckoning.getRivendellNewYearDate"));
/**
 * @deprecated Use RivendellReckoning.isRivendellLeapYear instead.
 */
const isRivendellLeapYear = deprecate((today) => {
    return RivendellReckoning.isRivendellLeapYear(today);
}, msgDeprecatedUseInstead("isRivendellLeapYear", "RivendellReckoning.isRivendellLeapYear"));

/**
 * @deprecated Use GondorReckoning.makeGondorCalendarDates instead.
 */
const makeNumenorCalendarDates = deprecate((today, startDay, reckoning) => {
    let calendarDates = GondorReckoning.makeGondorCalendarDates(today, startDay, reckoning);

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

/**
 * @deprecated Use GondorReckoning.getGondorNewYearDate instead.
 */
const getNumenorNewYearDate = deprecate((today, startDay) => {
    return GondorReckoning.getGondorNewYearDate(today, startDay);
}, msgDeprecatedUseInstead("getNumenorNewYearDate", "GondorReckoning.getGondorNewYearDate"));
/**
 * @deprecated Use GondorReckoning.getNewReckoningNewYearDate instead.
 */
const getNewReckoningNewYearDate = deprecate((today, startDay) => {
    return GondorReckoning.getNewReckoningNewYearDate(today, startDay);
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
