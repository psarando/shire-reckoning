/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */

const isLeapYear = (date) => {
    let year = date.getFullYear();
    return !((year % 4) || (!(year % 100) && (year % 400)));
};

const datesMatch = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth()    === date2.getMonth() &&
        date1.getDate()     === date2.getDate()
    );
};

const getNextDate = (today) => {
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return tomorrow;
};

export { isLeapYear, datesMatch, getNextDate };
