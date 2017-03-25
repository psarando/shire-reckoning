/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */

const GREGORIAN_DAYS_PER_4_YEARS = (365 * 4 + 1);
const GREGORIAN_DAYS_PER_100_YEARS = (GREGORIAN_DAYS_PER_4_YEARS * 25 - 1);
const GREGORIAN_DAYS_PER_400_YEARS = (GREGORIAN_DAYS_PER_100_YEARS * 4 + 1);

/**
 * @param {number} year
 * @return {boolean} True if the given year is a Gregorian leap-year.
 */
const isLeapYear = (year) => ( !((year % 4) || (!(year % 100) && (year % 400))) );

/**
 * @param {Date} fromDate - The starting Date (e.g. first New Year's Day)
 * @param {Date} toDate - The end Date (e.g. today)
 * @return {number} The total number of whole days elapsed.
 */
const toDaysElapsed = (fromDate, toDate) => ( Math.floor((toDate - fromDate) / (24 * 60 * 60 * 1000)) );

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
        daysRemainder: daysElapsed
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
    newYearDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate() - daysSinceNewYearsDay);

    return newYearDate;
};

/**
 * @param {Date} date1
 * @param {Date} date2
 * @return {boolean} True if the given dates have the same year, month, and date.
 */
const datesMatch = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth()    === date2.getMonth() &&
        date1.getDate()     === date2.getDate()
    );
};

/**
 * @param {number} fullYear
 * @param {number} month
 * @param {number} day
 * @return {Date} - A Date at midnight for the given year/month/day.
 */
const fullYearDate = (fullYear, month, day) => {
    let date = new Date(fullYear, month, day, 0,0,0);

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

export {
    toDaysElapsed,
    daysElapsedToGregorianYear,
    getNewYearDate,
    isLeapYear,
    datesMatch,
    fullYearDate,
    getNextDate
};
