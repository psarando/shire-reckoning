/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */

/**
 * @param {number} year
 * @return {boolean} True if the given year is a Gregorian leap-year.
 */
const isLeapYear = (year) => ( !((year % 4) || (!(year % 100) && (year % 400))) );

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
    isLeapYear,
    datesMatch,
    fullYearDate,
    getNextDate
};
