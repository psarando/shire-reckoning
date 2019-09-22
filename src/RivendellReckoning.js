/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import {
    toDaysElapsed,
    daysElapsedToGregorianYear,
    getNewYearDate,
    getWeekDay,
    isLeapYear,
    datesMatch,
    fullYearDate,
    getNextDate,
} from "./Utils";

const RIVENDELL_DAYS_PER_12_YEARS = 365 * 12 + 3;
const RIVENDELL_DAYS_PER_432_YEARS = RIVENDELL_DAYS_PER_12_YEARS * 12 * 3 - 3;

/**
 * Traditional Rivendell Reckoning rules enum
 * @constant
 */
const TRADITIONAL_RULES = "traditional";

/**
 * Reformed Rivendell Reckoning rules enum
 * @constant
 */
const REFORMED_RULES = "reformed";

/**
 * @typedef {(TRADITIONAL_RULES|REFORMED_RULES)} RivendellRulesEnum
 */

/**
 * @typedef {Object} RivendellWeekday
 * @property {string} english - The English translation of this weekday name.
 * @property {string} quenya - The Quenya name for this weekday.
 * @property {string} sindarin - The Sindarin name for this weekday.
 * @property {string} description
 */

/**
 * Weekday names and descriptions
 * @constant
 * @type {RivendellWeekday[]}
 */
const RivendellWeekdays = [
    {
        english: "Stars Day",
        quenya: "Elenya",
        sindarin: "Orgilion",
        description: "English: Stars Day\nQuenya: Elenya\nSindarin: Orgilion",
    },
    {
        english: "Sun Day",
        quenya: "Anarya",
        sindarin: "Oranor",
        description: "English: Sun Day\nQuenya: Anarya\nSindarin: Oranor",
    },
    {
        english: "Moon Day",
        quenya: "Isilya",
        sindarin: "Orithil",
        description: "English: Moon Day\nQuenya: Isilya\nSindarin: Orithil",
    },
    {
        english: "Two Trees Day",
        quenya: "Aldúya",
        sindarin: "Orgaladhad",
        description:
            "English: Two Trees of Valinor Day\nQuenya: Aldúya\nSindarin: Orgaladhad",
    },
    {
        english: "Heavens Day",
        quenya: "Menelya",
        sindarin: "Ormenel",
        description: "English: Heavens Day\nQuenya: Menelya\nSindarin: Ormenel",
    },
    {
        english: "Valar or Powers Day",
        quenya: "Valanya or Tárion",
        sindarin: "Orbelain or Rodyn",
        description:
            "English: Valar or Powers Day\nQuenya: Valanya or Tárion\nSindarin: Orbelain or Rodyn",
    },
];

/**
 * @typedef {Object} RivendellMonth
 * @property {string} english - The English translation of this month name.
 * @property {string} quenya - The Quenya name for this month.
 * @property {string} sindarin - The Sindarin name for this month.
 * @property {string} description
 * @property {string} className - UI-hint for styling this month.
 */

/**
 * Month names and descriptions.
 * @constant
 * @type {RivendellMonth[]}
 */
const RivendellMonths = [
    {
        english: "Spring",
        quenya: "Tuilë",
        sindarin: "Ethuil",
        description: "English: Spring\nQuenya: Tuilë\nSindarin: Ethuil",
        className: "spring",
    },
    {
        english: "Summer",
        quenya: "Lairë",
        sindarin: "Laer",
        description: "English: Summer\nQuenya: Lairë\nSindarin: Laer",
        className: "summer",
    },
    {
        english: "Autumn",
        quenya: "Yávië",
        sindarin: "Iavas",
        description: "English: Autumn\nQuenya: Yávië\nSindarin: Iavas",
        className: "autumn",
    },
    {
        english: "Fading",
        quenya: "Quellë",
        sindarin: "Firith",
        description:
            "English: Fading\nQuenya: Quellë or 'lasse-lanta'\nSindarin: Firith or 'narbeleth'",
        className: "fading",
    },
    {
        english: "Winter",
        quenya: "Hrívë",
        sindarin: "Rhîw",
        description: "English: Winter\nQuenya: Hrívë\nSindarin: Rhîw",
        className: "winter",
    },
    {
        english: "Stirring",
        quenya: "Coirë",
        sindarin: "Echuir",
        description: "English: Stirring\nQuenya: Coirë\nSindarin: Echuir",
        className: "stirring",
    },
];

/**
 * @param {number} year - The Rivendell year to check.
 * @return {boolean} True if the given `year` is a Rivendell leap-year.
 */
const isRivendellLeapYear = year => {
    return year % 12 === 0 && year % 432 !== 0;
};

/**
 * @typedef {Date} FirstRivendellNewYearDate
 * @default new Date(1, 2, 22, 0,0,0)
 *
 * The Gregorian Date corresponding to the first Rivendell New Year Date.
 * The default year is 1 in order to keep Rivendell leap-years in sync with Gregorian leap-years.
 */

/**
 * @param {FirstRivendellNewYearDate} [startDate]
 * @return {FirstRivendellNewYearDate} startDate if not null, otherwise the default first New Year Date.
 */
let getStartDate = startDate => {
    if (!startDate) {
        startDate = fullYearDate(1, 2, 22);
    }

    return startDate;
};

/**
 * @param {number} daysElapsed - The total number of whole days elapsed since the first New Year Date.
 * @return {YearWithRemainder} The current Rivendell year (including 0) for the given `daysElapsed`.
 */
const daysElapsedToRivendellYear = daysElapsed => {
    let negativeOffset = 0;

    let year = Math.floor(daysElapsed / RIVENDELL_DAYS_PER_432_YEARS) * 432;
    daysElapsed %= RIVENDELL_DAYS_PER_432_YEARS;

    if (year < 0) {
        negativeOffset = year;
        year = 0;
        if (daysElapsed < 0) {
            daysElapsed += RIVENDELL_DAYS_PER_432_YEARS;
        }
    }

    year += Math.floor(daysElapsed / RIVENDELL_DAYS_PER_12_YEARS) * 12;
    daysElapsed %= RIVENDELL_DAYS_PER_12_YEARS;

    if (daysElapsed > 365 * 11) {
        year += 11;
        daysElapsed %= 365 * 11;
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
 * @param {FirstRivendellNewYearDate} [startDate]
 * @param {RivendellRulesEnum} [calendarRules=TRADITIONAL_RULES]
 *
 * @return {Date} The Gregorian Date corresponding to the Rivendell New Year's Day for the year of the given `today`.
 */
const getRivendellNewYearDate = (
    today,
    startDate,
    calendarRules = TRADITIONAL_RULES
) => {
    startDate = getStartDate(startDate);

    let getYearWithRemainder =
        calendarRules === TRADITIONAL_RULES
            ? daysElapsedToRivendellYear
            : daysElapsedToGregorianYear;

    let daysSinceNewYearsDay = getYearWithRemainder(
        toDaysElapsed(startDate, today)
    ).daysRemainder;

    return getNewYearDate(startDate, today, daysSinceNewYearsDay);
};

/**
 * @typedef {Object} RivendellDate
 * @property {(number|string)} day - The number of the day of the month, if this date is not intercalary; otherwise, the name of the intercalary date.
 * @property {number} month - The month index of {@link RivendellMonths}.
 * @property {number} weekDay - The weekday index of {@link RivendellWeekdays}.
 * @property {Date} gregorian - The corresponding Gregorian date.
 */

/**
 * @typedef {Object} RivendellCalendarYear
 * @property {number} year - The current Rivendell year.
 * @property {RivendellDate[]} dates - The dates of this Rivendell calendar year.
 * @property {Date} today - The given Gregorian Date this calendar year was generated from.
 * @property {RivendellDate} todayRivendell - The current Rivendell date corresponding to the given [today]{@link RivendellCalendarYear#today}.
 */

/**
 * Generates a calendar year for the given Date `today`,
 * according to the given `startDate` and `calendarRules`.
 *
 * @param {Date} today
 * @param {FirstRivendellNewYearDate} [startDate]
 * @param {RivendellRulesEnum} [calendarRules=TRADITIONAL_RULES]
 *
 * @return {RivendellCalendarYear} The calendar year for the given `today`.
 */
const makeRivendellCalendarDates = (
    today,
    startDate,
    calendarRules = TRADITIONAL_RULES
) => {
    startDate = getStartDate(startDate);

    let todayRivendell;
    let getYearWithRemainder =
        calendarRules === TRADITIONAL_RULES
            ? daysElapsedToRivendellYear
            : daysElapsedToGregorianYear;

    let daysElapsed = toDaysElapsed(startDate, today);
    let yearWithRemainder = getYearWithRemainder(daysElapsed);

    let gregorianDate = getNewYearDate(
        startDate,
        today,
        yearWithRemainder.daysRemainder
    );

    let rivendellYear = yearWithRemainder.year;
    let weekDay = getWeekDay(daysElapsed, yearWithRemainder.daysRemainder, 6);

    let dates = [];
    if (calendarRules === REFORMED_RULES && isLeapYear(rivendellYear)) {
        dates.push({
            day: "Reformed Enderë",
            month: 0,
            weekDay: weekDay % 6,
            gregorian: gregorianDate,
        });

        if (datesMatch(today, gregorianDate)) {
            todayRivendell = dates[dates.length - 1];
        }
        gregorianDate = getNextDate(gregorianDate);
        weekDay++;
    }

    dates.push({
        day: "Yestarë",
        month: 0,
        weekDay: weekDay % 6,
        gregorian: gregorianDate,
    });
    weekDay++;

    if (datesMatch(today, gregorianDate)) {
        todayRivendell = dates[0];
    }

    gregorianDate = getNextDate(gregorianDate);

    for (let month = 0; month < 6; month++) {
        let maxdays = 54;

        // eslint-disable-next-line
        switch (month) {
            // no default case required
            case 1:
            case 4:
                maxdays = 72;
                break;
            case 3:
                let enderiCount = 3;
                if (
                    calendarRules === TRADITIONAL_RULES
                    && isRivendellLeapYear(rivendellYear)
                ) {
                    enderiCount = 6;
                }
                for (
                    let enderi = 0;
                    enderi < enderiCount;
                    enderi++,
                        weekDay++,
                        gregorianDate = getNextDate(gregorianDate)
                ) {
                    dates.push({
                        day: "Enderë",
                        month: month,
                        weekDay: weekDay % 6,
                        gregorian: gregorianDate,
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayRivendell = dates[dates.length - 1];
                    }
                }
                break;
        }

        for (
            let day = 1;
            day <= maxdays;
            day++, weekDay++, gregorianDate = getNextDate(gregorianDate)
        ) {
            dates.push({
                day: day,
                month: month,
                weekDay: weekDay % 6,
                gregorian: gregorianDate,
            });

            if (datesMatch(today, gregorianDate)) {
                todayRivendell = dates[dates.length - 1];
            }
        }
    }

    dates.push({
        day: "Mettarë",
        month: 5,
        weekDay: weekDay % 6,
        gregorian: gregorianDate,
    });

    if (datesMatch(today, gregorianDate)) {
        todayRivendell = dates[dates.length - 1];
    }

    return {
        year: rivendellYear,
        dates: dates,
        today: today,
        todayRivendell: todayRivendell,
    };
};

export {
    TRADITIONAL_RULES,
    REFORMED_RULES,
    RivendellWeekdays,
    RivendellMonths,
    isRivendellLeapYear,
    getRivendellNewYearDate,
    makeRivendellCalendarDates,
};
