/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import { datesMatch, getNextDate, isLeapYear } from './Utils';

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
        description: "English: Stars Day\nQuenya: Elenya\nSindarin: Orgilion"
    },
    {
        english: "Sun Day",
        quenya: "Anarya",
        sindarin: "Oranor",
        description: "English: Sun Day\nQuenya: Anarya\nSindarin: Oranor"
    },
    {
        english: "Moon Day",
        quenya: "Isilya",
        sindarin: "Orithil",
        description: "English: Moon Day\nQuenya: Isilya\nSindarin: Orithil"
    },
    {
        english: "Two Trees Day",
        quenya: "Aldúya",
        sindarin: "Orgaladhad",
        description: "English: Two Trees of Valinor Day\nQuenya: Aldúya\nSindarin: Orgaladhad"
    },
    {
        english: "Heavens Day",
        quenya: "Menelya",
        sindarin: "Ormenel",
        description: "English: Heavens Day\nQuenya: Menelya\nSindarin: Ormenel"
    },
    {
        english: "Valar or Powers Day",
        quenya: "Valanya or Tárion",
        sindarin: "Orbelain or Rodyn",
        description: "English: Valar or Powers Day\nQuenya: Valanya or Tárion\nSindarin: Orbelain or Rodyn"
    }
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
        className: "spring"
    },
    {
        english: "Summer",
        quenya: "Lairë",
        sindarin: "Laer",
        description: "English: Summer\nQuenya: Lairë\nSindarin: Laer",
        className: "summer"
    },
    {
        english: "Autumn",
        quenya: "Yávië",
        sindarin: "Iavas",
        description: "English: Autumn\nQuenya: Yávië\nSindarin: Iavas",
        className: "autumn"
    },
    {
        english: "Fading",
        quenya: "Quellë",
        sindarin: "Firith",
        description: "English: Fading\nQuenya: Quellë or 'lasse-lanta'\nSindarin: Firith or 'narbeleth'",
        className: "fading"
    },
    {
        english: "Winter",
        quenya: "Hrívë",
        sindarin: "Rhîw",
        description: "English: Winter\nQuenya: Hrívë\nSindarin: Rhîw",
        className: "winter"
    },
    {
        english: "Stirring",
        quenya: "Coirë",
        sindarin: "Echuir",
        description: "English: Stirring\nQuenya: Coirë\nSindarin: Echuir",
        className: "stirring"
    }
];

/**
 * @param {Date} today
 * @return {boolean} True if the Rivendell year for the given `today` is a Rivendell leap-year.
 */
const isRivendellLeapYear = (today) => {
    let year = today.getFullYear();
    return ((year % 12 === 0) && (year % 432 !== 0));
};

/**
 * @param {number} year - The current year.
 * @param {number} startDay - Day of the month of the first Rivendell New Year Date.
 * @param {RivendellRulesEnum} calendarRules
 * @return {number} The day of the month of Rivendell's New Year Day for the given `year` and `calendarRules`.
 */
const getRivendellNewYearDay = (year, startDay, calendarRules) => {
    if (calendarRules === REFORMED_RULES) {
        return startDay;
    }

    // adjust startDay according to leap year cycles.
    return (
        startDay
        - Math.floor(year / 4)
        + (Math.floor((year-1) / 12) * 3)
        + Math.floor(year / 100)
        - Math.floor(year / 400)
        - (Math.floor((year-1) / 432) * 3)
    );
};

/**
 * @param {Date} today
 * @param {number} startDay
 * @param {RivendellRulesEnum} calendarRules
 *
 * @return {Date} The Gregorian Date corresponding to the Rivendell New Year's Day for the year of the given `today`
 *                and `startDay` in March.
 */
const getRivendellNewYearDate = (today, startDay, calendarRules) => {
    let startYear = today.getFullYear();

    let newyearMonth = 2;
    let newyearDay = getRivendellNewYearDay(startYear, startDay, calendarRules);

    let thisMonth = today.getMonth();
    let thisDay = today.getDate();

    if (thisMonth < newyearMonth || (thisMonth === newyearMonth && thisDay < newyearDay)) {
        startYear--;
        newyearDay = getRivendellNewYearDay(startYear, startDay, calendarRules);
    }

    let newYearDate = new Date(startYear, newyearMonth, newyearDay, 0,0,0);
    // reset full year for years 0-99
    newYearDate.setFullYear(startYear, newyearMonth, newyearDay);

    return newYearDate;
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
 * @property {RivendellDate[]} dates - The dates of this Rivendell calendar year.
 * @property {Date} today - The given Gregorian Date this calendar year was generated from.
 * @property {RivendellDate} todayRivendell - The current Rivendell date corresponding to the given [today]{@link RivendellCalendarYear#today}.
 */

/**
 * Generates a calendar year for the given Date `today`,
 * according to the given `startDay` in March and `calendarRules`.
 *
 * @param {Date} today
 * @param {number} startDay
 * @param {RivendellRulesEnum} calendarRules
 *
 * @return {RivendellCalendarYear} The calendar year for the given `today`.
 */
const makeRivendellCalendarDates = (today, startDay, calendarRules) => {
    let gregorianDate = getRivendellNewYearDate(today, startDay, calendarRules);
    let todayRivendell;

    let startYear = gregorianDate.getFullYear();
    let yearsElapsed = startYear - 1;
    let weekDay = (
        yearsElapsed * 365
        + (Math.floor(yearsElapsed / 12) * 3)
        - (Math.floor(yearsElapsed / 432) * 3)
    );

    if (calendarRules === REFORMED_RULES) {
        weekDay = (
            yearsElapsed * 365
            + Math.floor(startYear / 4)
            - Math.floor(startYear / 100)
            + Math.floor(startYear / 400)
        );
    }

    if (weekDay < 0) {
        weekDay = 6 + (weekDay % 6);
    }

    let dates = [{
        "day": "Yestarë",
        "month": 0,
        "weekDay": weekDay % 6,
        "gregorian": gregorianDate
    }];
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
                if (calendarRules === TRADITIONAL_RULES
                    && isRivendellLeapYear(gregorianDate)) {
                    enderiCount = 6;
                }
                for (let enderi = 0;
                     enderi < enderiCount;
                     enderi++, weekDay++, gregorianDate = getNextDate(gregorianDate)) {
                    dates.push({
                        "day": "Enderë",
                        "month": month,
                        "weekDay": weekDay % 6,
                        "gregorian": gregorianDate
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayRivendell = dates[dates.length - 1];
                    }
                }
                break;
        }

        for (let day = 1;
             day <= maxdays;
             day++, weekDay++, gregorianDate = getNextDate(gregorianDate)) {
            dates.push({
                "day": day,
                "month": month,
                "weekDay": weekDay % 6,
                "gregorian": gregorianDate
            });

            if (datesMatch(today, gregorianDate)) {
                todayRivendell = dates[dates.length - 1];
            }
        }
    }

    dates.push({
        "day": "Mettarë",
        "month": 5,
        "weekDay": weekDay % 6,
        "gregorian": gregorianDate
    });

    if (datesMatch(today, gregorianDate)) {
        todayRivendell = dates[dates.length - 1];
    }

    if (calendarRules === REFORMED_RULES && isLeapYear(gregorianDate.getFullYear())) {
        gregorianDate = getNextDate(gregorianDate);
        weekDay++;

        dates.push({
            "day": "Reformed Enderë",
            "month": 5,
            "weekDay": weekDay % 6,
            "gregorian": gregorianDate
        });

        if (datesMatch(today, gregorianDate)) {
            todayRivendell = dates[dates.length - 1];
        }
    }

    return {
        dates: dates,
        today: today,
        todayRivendell: todayRivendell
    };
};

export {
    TRADITIONAL_RULES,
    REFORMED_RULES,
    RivendellWeekdays,
    RivendellMonths,
    isRivendellLeapYear,
    getRivendellNewYearDay,
    getRivendellNewYearDate,
    makeRivendellCalendarDates
};
