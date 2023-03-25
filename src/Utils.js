/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */

const GREGORIAN_DAYS_PER_4_YEARS = 365 * 4 + 1;
const GREGORIAN_DAYS_PER_100_YEARS = GREGORIAN_DAYS_PER_4_YEARS * 25 - 1;
const GREGORIAN_DAYS_PER_400_YEARS = GREGORIAN_DAYS_PER_100_YEARS * 4 + 1;

const GONDOR_DAYS_PER_4_YEARS = GREGORIAN_DAYS_PER_4_YEARS;
const GONDOR_DAYS_PER_100_YEARS = GREGORIAN_DAYS_PER_100_YEARS;
const GONDOR_DAYS_PER_1000_YEARS = GONDOR_DAYS_PER_100_YEARS * 10 + 2;

const SECOND_AGE_TOTAL_DAYS =
    GONDOR_DAYS_PER_1000_YEARS * 3
    + GONDOR_DAYS_PER_100_YEARS * 4
    + GONDOR_DAYS_PER_4_YEARS * 10
    + 365;

const THIRD_AGE_2059_TOTAL_DAYS =
    SECOND_AGE_TOTAL_DAYS
    + GONDOR_DAYS_PER_1000_YEARS * 2
    + GONDOR_DAYS_PER_4_YEARS * 14
    + 365 * 3
    + 2;

const THIRD_AGE_2360_TOTAL_DAYS =
    SECOND_AGE_TOTAL_DAYS
    + GONDOR_DAYS_PER_1000_YEARS * 2
    + GONDOR_DAYS_PER_100_YEARS * 3
    + GONDOR_DAYS_PER_4_YEARS * 15
    + 3;

/**
 * @param {number} year
 * @return {boolean} True if the given year is a Gregorian leap-year.
 */
const isLeapYear = (year) => !(year % 4 || (!(year % 100) && year % 400));

/**
 * @param {Date} fromDate - The starting Date (e.g. first New Year's Day)
 * @param {Date} toDate - The end Date (e.g. today)
 * @return {number} The total number of whole days elapsed.
 */
const toDaysElapsed = (fromDate, toDate) => {
    // reset to/from hours to avoid DST problems
    let fromDateMidnight = new Date(fromDate);
    fromDateMidnight.setHours(0, 0, 0);

    let toDateNoon = new Date(toDate);
    toDateNoon.setHours(12, 0, 0);

    return Math.floor((toDateNoon - fromDateMidnight) / (24 * 60 * 60 * 1000));
};

/**
 * @typedef {Object} YearWithRemainder
 * @property {number} year - The current year (including 0).
 * @property {number} daysRemainder - The number of days elapsed since the current New Year's Day.
 */

/**
 * @param {number} daysElapsed - The total number of whole days elapsed since the first New Year Date.
 * @return {YearWithRemainder} The current Gregorian year for the given `daysElapsed`.
 */
const daysElapsedToGregorianYear = (daysElapsed) => {
    let negativeOffset = 0;

    let year = Math.floor(daysElapsed / GREGORIAN_DAYS_PER_400_YEARS) * 400;
    daysElapsed %= GREGORIAN_DAYS_PER_400_YEARS;

    if (year < 0) {
        negativeOffset = year;
        year = 0;
        if (daysElapsed < 0) {
            daysElapsed += GREGORIAN_DAYS_PER_400_YEARS;
        }
    }

    if (daysElapsed > GREGORIAN_DAYS_PER_100_YEARS * 3) {
        year += 300;
        daysElapsed %= GREGORIAN_DAYS_PER_100_YEARS * 3;
    } else {
        year += Math.floor(daysElapsed / GREGORIAN_DAYS_PER_100_YEARS) * 100;
        daysElapsed %= GREGORIAN_DAYS_PER_100_YEARS;
    }

    year += Math.floor(daysElapsed / GREGORIAN_DAYS_PER_4_YEARS) * 4;
    daysElapsed %= GREGORIAN_DAYS_PER_4_YEARS;

    if (daysElapsed > 365 * 3) {
        year += 3;
        daysElapsed %= 365 * 3;
    } else {
        year += Math.floor(daysElapsed / 365);
        daysElapsed %= 365;
    }

    year += negativeOffset + 1;

    return {
        year: year,
        daysRemainder: daysElapsed,
    };
};

/**
 * @param {Date} today
 * @param {Date} startDate - The first New Year's Day (e.g. 1/1/1 12:00AM)
 * @param {number} daysSinceNewYearsDay - The number of whole days elapsed since today's New Year's Day.
 * @return {Date} The New Year Date for the year of the given `today`.
 */
const getNewYearDate = (startDate, today, daysSinceNewYearsDay) => {
    let newYearDate = new Date(startDate);
    newYearDate.setFullYear(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - daysSinceNewYearsDay
    );

    return newYearDate;
};

/**
 * @param {number} daysElapsed - The total number of whole days elapsed since the first New Year Date.
 * @param {number} daysSinceNewYearsDay - The number of whole days elapsed since the current New Year's Day.
 * @param {number} daysPerWeek - The number of days in a week.
 * @return {number} The current day of the week.
 */
const getWeekDay = (daysElapsed, daysSinceNewYearsDay, daysPerWeek) => {
    let weekDay = (daysElapsed - daysSinceNewYearsDay) % daysPerWeek;

    if (weekDay < 0) {
        weekDay += daysPerWeek;
    }

    return weekDay;
};

const offsetThirdAgeDaysElapsed = (daysElapsed) => {
    if (daysElapsed >= THIRD_AGE_2059_TOTAL_DAYS) {
        if (daysElapsed >= THIRD_AGE_2360_TOTAL_DAYS) {
            daysElapsed--;
        }
        // 2 days were added to T.A.2059, but 2 were not added in T.A.3000
        if (
            daysElapsed
            < 3 * GONDOR_DAYS_PER_1000_YEARS + SECOND_AGE_TOTAL_DAYS
        ) {
            daysElapsed -= 2;
        }
    }

    daysElapsed -= SECOND_AGE_TOTAL_DAYS;

    return daysElapsed;
};

/**
 * @param {number} daysElapsed - The total number of whole days elapsed since the first New Year Date.
 * @return {YearWithRemainder} The current Gondor (S.A.) year for the given `daysElapsed`.
 */
const daysElapsedToSecondAgeYear = (daysElapsed) => {
    let year = 0;

    if (
        THIRD_AGE_2059_TOTAL_DAYS - 367 <= daysElapsed
        && daysElapsed < THIRD_AGE_2059_TOTAL_DAYS
    ) {
        // The last couple of days of T.A.2059 need to be handled as a special case
        year = 2059 + 3441;
        daysElapsed %= THIRD_AGE_2059_TOTAL_DAYS - 367;
    } else if (
        THIRD_AGE_2360_TOTAL_DAYS - 367 <= daysElapsed
        && daysElapsed < THIRD_AGE_2360_TOTAL_DAYS
    ) {
        // The last day of T.A.2360 needs to be handled as a special case
        year = 2360 + 3441;
        daysElapsed %= THIRD_AGE_2360_TOTAL_DAYS - 367;
    } else {
        let negativeOffset = 0;

        if (daysElapsed > SECOND_AGE_TOTAL_DAYS) {
            year = 3441;
            daysElapsed = offsetThirdAgeDaysElapsed(daysElapsed);
        }

        year += Math.floor(daysElapsed / GONDOR_DAYS_PER_1000_YEARS) * 1000;
        daysElapsed %= GONDOR_DAYS_PER_1000_YEARS;

        if (year < 0) {
            negativeOffset = year;
            year = 0;
            if (daysElapsed < 0) {
                daysElapsed += GONDOR_DAYS_PER_1000_YEARS;
            }
        }

        if (daysElapsed > GONDOR_DAYS_PER_100_YEARS * 9) {
            year += 900;
            daysElapsed %= GONDOR_DAYS_PER_100_YEARS * 9;
        } else {
            year += Math.floor(daysElapsed / GONDOR_DAYS_PER_100_YEARS) * 100;
            daysElapsed %= GONDOR_DAYS_PER_100_YEARS;
        }

        if (daysElapsed > GONDOR_DAYS_PER_4_YEARS * 24) {
            year += 96;
            daysElapsed %= GONDOR_DAYS_PER_4_YEARS * 24;
        } else {
            year += Math.floor(daysElapsed / GONDOR_DAYS_PER_4_YEARS) * 4;
            daysElapsed %= GONDOR_DAYS_PER_4_YEARS;
        }

        if (daysElapsed > 365 * 3) {
            year += 3;
            daysElapsed %= 365 * 3;
        } else {
            year += Math.floor(daysElapsed / 365);
            daysElapsed %= 365;
        }

        year += negativeOffset + 1;
    }

    return {
        year: year,
        daysRemainder: daysElapsed,
    };
};

/**
 * @param {(daysElapsedToGregorianYear|daysElapsedToSecondAgeYear)} getYearWithRemainder
 * @param {number} daysElapsed - The total number of whole days elapsed since the first New Year Date.
 * @return {YearWithRemainder} The current Gondor (S.A.) year, with daysRemainder since the current New Reckoning
 *                             New Year's Day.
 */
const daysElapsedToNewReckoningYear = (getYearWithRemainder, daysElapsed) => {
    let yearWithRemainder = getYearWithRemainder(daysElapsed);

    // New Reckoning always starts 85 days after old style New Year's Day.
    if (yearWithRemainder.daysRemainder < 85) {
        yearWithRemainder = getYearWithRemainder(daysElapsed - 365);
        yearWithRemainder.daysRemainder += 365;
    }

    yearWithRemainder.daysRemainder -= 85;

    return yearWithRemainder;
};

/**
 * @param {Date} date1
 * @param {Date} date2
 * @return {boolean} True if the given dates have the same year, month, and date.
 */
const datesMatch = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate()
    );
};

/**
 * @param {number} fullYear
 * @param {number} month
 * @param {number} day
 * @return {Date} - A Date at midnight for the given year/month/day.
 */
const fullYearDate = (fullYear, month, day) => {
    let date = new Date(fullYear, month, day, 0, 0, 0);

    // reset full year, month, and day for years 0-99
    date.setFullYear(fullYear, month, day);

    return date;
};

/**
 * @param {Date} today
 * @return {Date} tomorrow - A new Date instance that is 1 day after the given `today`.
 */
const getNextDate = (today) => {
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return tomorrow;
};

const getFirstDate = (calendar) => calendar.dates[0];
const getLastDate = (calendar) => calendar.dates[calendar.dates.length - 1];

const getFirstDay = (calendar) => getFirstDate(calendar).gregorian;
const getLastDay = (calendar) => getLastDate(calendar).gregorian;

export {
    GREGORIAN_DAYS_PER_4_YEARS,
    GREGORIAN_DAYS_PER_100_YEARS,
    GREGORIAN_DAYS_PER_400_YEARS,
    GONDOR_DAYS_PER_4_YEARS,
    GONDOR_DAYS_PER_100_YEARS,
    GONDOR_DAYS_PER_1000_YEARS,
    SECOND_AGE_TOTAL_DAYS,
    THIRD_AGE_2059_TOTAL_DAYS,
    THIRD_AGE_2360_TOTAL_DAYS,
    toDaysElapsed,
    daysElapsedToGregorianYear,
    daysElapsedToSecondAgeYear,
    daysElapsedToNewReckoningYear,
    getNewYearDate,
    getWeekDay,
    isLeapYear,
    datesMatch,
    fullYearDate,
    getNextDate,
    getFirstDate,
    getLastDate,
    getFirstDay,
    getLastDay,
};
