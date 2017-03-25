/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import * as ShireReckoning from './ShireReckoning';
import * as RivendellReckoning from './RivendellReckoning';
import * as GondorReckoning from './GondorReckoning';

import ShireCalendar from './ui/ShireCalendar';
import RivendellCalendar from './ui/RivendellCalendar';
import GondorCalendar from './ui/GondorCalendar';

export {
    ShireReckoning,
    RivendellReckoning,
    GondorReckoning,

    ShireCalendar,
    RivendellCalendar,
    GondorCalendar
};

/**
 * Deprecated exports
 */
export {
    makeShireCalendarDates,
    ShireWeekdays,
    ShireMonths,
    getShireNewYearDate,

    makeRivendellCalendarDates,
    TRADITIONAL_RULES,
    REFORMED_RULES,
    RivendellWeekdays,
    RivendellMonths,
    getRivendellNewYearDay,
    getRivendellNewYearDate,
    isRivendellLeapYear,

    makeNumenorCalendarDates,
    RECKONING_KINGS,
    RECKONING_STEWARDS,
    RECKONING_NEW,
    NumenorWeekdays,
    NumenorMonths,
    convertGondorianMonthIndex,
    convertGregorianToGondorianWeekday,
    convertMonthIndex,
    convertGregorianWeekday,
    getNumenorNewYearDate,
    getNewReckoningNewYearDate,

    NumenorCalendar
} from './deprecated';
