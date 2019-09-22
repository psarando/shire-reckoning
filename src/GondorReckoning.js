/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import { CommonElvishHolidays } from "./RivendellReckoning";
import {
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
} from "./Utils";

/**
 * Kings' Reckoning leap-year rules enum
 * @constant
 */
const RECKONING_KINGS = "kings";

/**
 * Stewards' Reckoning leap-year rules enum
 * @constant
 */
const RECKONING_STEWARDS = "stewards";

/**
 * New Reckoning leap-year rules enum
 * @constant
 */
const RECKONING_NEW = "new";

/**
 * @typedef {(RECKONING_KINGS|RECKONING_STEWARDS|RECKONING_NEW)} GondorReckoningEnum
 */

const RECKONING_RULES_TRADITIONAL = "traditional";
const RECKONING_RULES_GREGORIAN = "reformed";

/**
 * @typedef {(RECKONING_RULES_TRADITIONAL|RECKONING_RULES_GREGORIAN)} GondorLeapYearRuleEnum
 */

/**
 * @typedef {Object} GondorWeekday
 * @property {string} emoji - An icon representing this weekday.
 * @property {string} english - The English translation of this weekday name.
 * @property {string} quenya - The Quenya name for this weekday.
 * @property {string} sindarin - The Sindarin name for this weekday.
 * @property {string} description
 */

/**
 * Weekday names and descriptions
 * @constant
 * @type {GondorWeekday[]}
 */
const GondorWeekdays = [
    {
        emoji: "⭐",
        english: "Stars Day",
        quenya: "Elenya",
        sindarin: "Orgilion",
        description: "English: Stars Day\nQuenya: Elenya\nSindarin: Orgilion",
    },
    {
        emoji: "☀️",
        english: "Sun Day",
        quenya: "Anarya",
        sindarin: "Oranor",
        description: "English: Sun Day\nQuenya: Anarya\nSindarin: Oranor",
    },
    {
        emoji: "🌙",
        english: "Moon Day",
        quenya: "Isilya",
        sindarin: "Orithil",
        description: "English: Moon Day\nQuenya: Isilya\nSindarin: Orithil",
    },
    {
        emoji: "🌳",
        english: "White Tree's Day",
        quenya: "Aldëa",
        sindarin: "Orgaladh",
        description:
            "English: White Tree's Day\nQuenya: Aldëa\nSindarin: Orgaladh",
    },
    {
        emoji: "🌌",
        english: "Heavens Day",
        quenya: "Menelya",
        sindarin: "Ormenel",
        description: "English: Heavens Day\nQuenya: Menelya\nSindarin: Ormenel",
    },
    {
        emoji: "🌊",
        english: "Sea Day",
        quenya: "Eärenya",
        sindarin: "Oraearon",
        description: "English: Sea Day\nQuenya: Eärenya\nSindarin: Oraearon",
    },
    {
        emoji: "🏔",
        english: "Valar or Powers Day",
        quenya: "Valanya or Tárion",
        sindarin: "Orbelain or Rodyn",
        description:
            "English: Valar or Powers Day\nQuenya: Valanya or Tárion\nSindarin: Orbelain or Rodyn",
    },
];

/**
 * @typedef {Object} GondorMonth
 * @property {string} emoji - An icon representing this month.
 * @property {string} english - The English translation of this month name.
 * @property {string} quenya - The Quenya name for this month.
 * @property {string} sindarin - The Sindarin name for this month.
 * @property {string} description
 * @property {string} className - UI-hint for styling this month.
 */

/**
 * Month names and descriptions.
 * @constant
 * @type {GondorMonth[]}
 */
const GondorMonths = [
    {
        emoji: "🌄",
        english: "New Sun",
        quenya: "Narvinyë",
        sindarin: "Narwain",
        description: "English: New Sun\nQuenya: Narvinyë\nSindarin: Narwain",
        className: "afteryule",
    },
    {
        emoji: "🌧",
        english: "Wet Month",
        quenya: "Nénimë",
        sindarin: "Nínui",
        description: "English: Wet Month\nQuenya: Nénimë\nSindarin: Nínui",
        className: "solmath",
    },
    {
        emoji: "🌬",
        english: "Windy Month",
        quenya: "Súlimë",
        sindarin: "Gwaeron",
        description: "English: Windy Month\nQuenya: Súlimë\nSindarin: Gwaeron",
        className: "rethe",
    },
    {
        emoji: "🌱",
        english: "Budding Month",
        quenya: "Víressë",
        sindarin: "Gwirith",
        description:
            "English: Spring/Budding Month\nQuenya: Víressë\nSindarin: Gwirith",
        className: "astron",
    },
    {
        emoji: "🌼",
        english: "Flower Month",
        quenya: "Lótessë",
        sindarin: "Lothron",
        description:
            "English: Flower Month\nQuenya: Lótessë\nSindarin: Lothron",
        className: "thrimidge",
    },
    {
        emoji: "☀️",
        english: "Sunny Month",
        quenya: "Nárië",
        sindarin: "Nórui",
        description: "English: Sunny Month\nQuenya: Nárië\nSindarin: Nórui",
        className: "forelithe",
    },
    {
        emoji: "🍃",
        english: "Reaping Month",
        quenya: "Cermië",
        sindarin: "Cerveth",
        description:
            "English: Reaping Month\nQuenya: Cermië\nSindarin: Cerveth",
        className: "afterlithe",
    },
    {
        emoji: "🌿",
        english: "Hot Month",
        quenya: "Urimë",
        sindarin: "Urui",
        description: "English: Hot Month\nQuenya: Urimë\nSindarin: Urui",
        className: "wedmath",
    },
    {
        emoji: "🍇",
        english: "Fruit Giving",
        quenya: "Yavannië",
        sindarin: "Ivanneth",
        description:
            "English: Fruit-giving Month\nQuenya: Yavannië\nSindarin: Ivanneth",
        className: "halimath",
    },
    {
        emoji: "🍂",
        english: "Sun Waning",
        quenya: "Narquelië",
        sindarin: "Narbeleth",
        description:
            "English: Sun Waning/Fading\nQuenya: Narquelië\nSindarin: Narbeleth",
        className: "winterfilth",
    },
    {
        emoji: "🌫",
        english: "Misty Month",
        quenya: "Hísimë",
        sindarin: "Hithui",
        description: "English: Misty Month\nQuenya: Hísimë\nSindarin: Hithui",
        className: "blotmath",
    },
    {
        emoji: "❄️",
        english: "Cold Month",
        quenya: "Ringarë",
        sindarin: "Girithron",
        description:
            "English: Cold/Shivering Month\nQuenya: Ringarë\nSindarin: Girithron",
        className: "foreyule",
    },
];

/**
 * Gondor Holiday names and descriptions.
 * @constant
 * @type {ElvishHolidays}
 */
const GondorHolidays = {
    ...CommonElvishHolidays,
    Loëndë: {
        english: "Midyear's Day",
        quenya: "Loëndë",
        sindarin: "Lawenedh",
        description: "Midyear's Day",
    },
    Tuilérë: {
        english: "Spring-day",
        quenya: "Tuilérë",
        sindarin: "Ethuilor",
        description: "Stewards' Midspring Day",
    },
    Yáviérë: {
        english: "Autumn-day",
        quenya: "Yáviérë",
        sindarin: "Iavassor",
        description: "Stewards' Midautumn Day",
    },
    Cormarë: {
        english: "Ringday",
        quenya: "Cormarë",
        sindarin: "Corvor",
        description: "Ring-bearer's Day",
    },
};

/**
 * @typedef {Date} FirstNumenorNewYearDate
 * @default new Date(0, 11, 21, 0,0,0)
 *
 * The Gregorian Date corresponding to the first Númenor New Year Date.
 * The default year is 0 in order to keep Gondor leap-years in sync with Gregorian leap-years.
 */

/**
 * @param {FirstNumenorNewYearDate} [startDate]
 * @return {FirstNumenorNewYearDate} startDate if not null, otherwise the default first New Year Date.
 */
const getStartDate = startDate => {
    if (!startDate) {
        startDate = fullYearDate(0, 11, 21);
    }

    return startDate;
};

/**
 * @param {number} gondorYear
 * @return {boolean} True if the given `gondorYear` is a millennial year that requires an additional leap-day adjustment.
 */
const isMillennialLeapYear = gondorYear => {
    if (gondorYear > 3441) {
        gondorYear -= 3441;

        if (2000 < gondorYear && gondorYear < 4000) {
            return gondorYear === 2059 || gondorYear === 2360;
        }
    }

    return !(gondorYear % 1000);
};

/**
 * @param {number} gondorYear
 * @param {GondorLeapYearRuleEnum} [rules=RECKONING_RULES_GREGORIAN]
 *
 * @return {boolean} True if the given `gondorYear` is a leap-year (standard or millennial).
 */
const isGondorLeapYear = (gondorYear, rules = RECKONING_RULES_GREGORIAN) => {
    if (rules === RECKONING_RULES_GREGORIAN) {
        return isLeapYear(gondorYear);
    }

    const millennialLeapYear = isMillennialLeapYear(gondorYear);

    if (gondorYear > 3441) {
        gondorYear -= 3441;
    }

    return (
        (gondorYear % 4 === 0 && gondorYear % 100 !== 0) || millennialLeapYear
    );
};

/**
 * @param {Date} today
 * @param {FirstNumenorNewYearDate} [startDate]
 * @param {GondorLeapYearRuleEnum} [rules=RECKONING_RULES_GREGORIAN]
 *
 * @return {Date} The Gregorian Date corresponding to the Gondor New Year Date
 *                for the year of the given `today`.
 */
const getGondorNewYearDate = (
    today,
    startDate,
    rules = RECKONING_RULES_GREGORIAN
) => {
    startDate = getStartDate(startDate);

    const getYearWithRemainder =
        rules === RECKONING_RULES_TRADITIONAL
            ? daysElapsedToSecondAgeYear
            : daysElapsedToGregorianYear;

    const yearWithRemainder = getYearWithRemainder(
        toDaysElapsed(startDate, today)
    );

    return getNewYearDate(startDate, today, yearWithRemainder.daysRemainder);
};

/**
 * @param {Date} today
 * @param {FirstNumenorNewYearDate} [startDate]
 * @param {GondorLeapYearRuleEnum} [rules=RECKONING_RULES_GREGORIAN]
 *
 * @return {Date} The Gregorian Date corresponding to the Gondor New Year Date
 *                in the New Reckoning calendar for the year of the given `today`.
 */
const getNewReckoningNewYearDate = (today, startDate, rules) => {
    startDate = getStartDate(startDate);

    const getYearWithRemainder =
        rules === RECKONING_RULES_TRADITIONAL
            ? daysElapsedToSecondAgeYear
            : daysElapsedToGregorianYear;

    const daysElapsed = toDaysElapsed(startDate, today);
    const yearWithRemainder = daysElapsedToNewReckoningYear(
        getYearWithRemainder,
        daysElapsed
    );

    return getNewYearDate(startDate, today, yearWithRemainder.daysRemainder);
};

/**
 * @param {GondorReckoningEnum} fromReckoning
 * @param {GondorReckoningEnum} toReckoning
 * @param {number} monthIndex The current {@link GondorMonths} index for the given `fromReckoning`.
 *
 * @return {number} The index to use with {@link GondorMonths} for the given `toReckoning`
 *                  that most closely matches the given `monthIndex`.
 */
const convertGondorianMonthIndex = (fromReckoning, toReckoning, monthIndex) => {
    const fromNewReckoning = fromReckoning === RECKONING_NEW;
    const toNewReckoning = toReckoning === RECKONING_NEW;
    if (fromNewReckoning !== toNewReckoning) {
        fromNewReckoning ? (monthIndex += 3) : (monthIndex -= 3);

        // handle values less than 0 or greater than 12
        monthIndex = (monthIndex + 12) % 12;
    }

    return monthIndex;
};

/**
 * @param {number} weekday - The current Gregorian weekday index (Sunday = 0).
 * @return {number} The Gondorian weekday index, for use with {@link GondorWeekdays},
 *                  that is the cultural equivalent for the given Gregorian weekday index.
 */
const convertGregorianToGondorianWeekday = weekday => {
    return (weekday + 6) % 7;
};

/**
 * @typedef {Object} GondorDate
 * @property {(number|string)} day - The number of the day of the month, if this date is not intercalary; otherwise, the name of the intercalary date.
 * @property {number} month - The month index of {@link GondorMonths}.
 * @property {number} weekDay - The weekday index of {@link GondorWeekdays}.
 * @property {Date} gregorian - The corresponding Gregorian date.
 */

/**
 * @typedef {Object} GondorCalendarYear
 * @property {number} year - The current Gondor year.
 * @property {GondorDate[]} dates - The dates of this Gondor calendar year.
 * @property {Date} today - The given Gregorian Date this calendar year was generated from.
 * @property {GondorDate} todayGondor - The current Gondor date corresponding to the given [today]{@link GondorCalendarYear#today}.
 */

/**
 * Generates a calendar year for the given Date `today`,
 * according to the given `startDate` and `reckoning` rules.
 *
 * @param {Date} today
 * @param {FirstNumenorNewYearDate} [startDate]
 * @param {GondorReckoningEnum} [reckoning=RECKONING_STEWARDS]
 * @param {GondorLeapYearRuleEnum} [rules=RECKONING_RULES_GREGORIAN]
 *
 * @return {GondorCalendarYear} The calendar year for the given `today`.
 */
const makeGondorCalendarDates = (
    today,
    startDate,
    reckoning = RECKONING_STEWARDS,
    rules = RECKONING_RULES_GREGORIAN
) => {
    startDate = getStartDate(startDate);

    const kingsReckoning = reckoning === RECKONING_KINGS;
    const stewardsReckoning = reckoning === RECKONING_STEWARDS;
    const newReckoning = reckoning === RECKONING_NEW;

    const getYearWithRemainder =
        rules === RECKONING_RULES_TRADITIONAL
            ? daysElapsedToSecondAgeYear
            : daysElapsedToGregorianYear;

    const daysElapsed = toDaysElapsed(startDate, today);

    const yearWithRemainder = newReckoning
        ? daysElapsedToNewReckoningYear(getYearWithRemainder, daysElapsed)
        : getYearWithRemainder(daysElapsed);

    const year = yearWithRemainder.year;

    let gregorianDate = getNewYearDate(
        startDate,
        today,
        yearWithRemainder.daysRemainder
    );

    let todayGondor;
    let weekDay = convertGregorianToGondorianWeekday(gregorianDate.getDay());

    if (rules === RECKONING_RULES_TRADITIONAL) {
        weekDay = getWeekDay(daysElapsed, yearWithRemainder.daysRemainder, 7);
    }

    const dates = [];

    for (let month = 0; month < 12; month++) {
        let maxdays = 30;

        switch (month) {
            case 0:
                dates.push({
                    day: "Yestarë",
                    month: 0,
                    weekDay: weekDay++ % 7,
                    gregorian: gregorianDate,
                });

                if (datesMatch(today, gregorianDate)) {
                    todayGondor = dates[0];
                }
                gregorianDate = getNextDate(gregorianDate);

                break;

            case 5:
            case 6:
                if (kingsReckoning) maxdays = 31;
                break;

            default:
                break;
        }

        for (
            let day = 1;
            day <= maxdays;
            day++, gregorianDate = getNextDate(gregorianDate)
        ) {
            dates.push({
                day: day,
                month: month,
                weekDay: weekDay++ % 7,
                gregorian: gregorianDate,
            });

            if (datesMatch(today, gregorianDate)) {
                todayGondor = dates[dates.length - 1];
            }
        }

        switch (month) {
            case 2:
                if (stewardsReckoning) {
                    dates.push({
                        day: "Tuilérë",
                        month: month + 1,
                        weekDay: weekDay++ % 7,
                        gregorian: gregorianDate,
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayGondor = dates[dates.length - 1];
                    }
                    gregorianDate = getNextDate(gregorianDate);
                }

                break;

            case 5:
                const leapYear = isGondorLeapYear(year, rules);

                if (leapYear && newReckoning) {
                    dates.push({
                        day: "Cormarë",
                        month: month,
                        weekDay: weekDay++ % 7,
                        gregorian: gregorianDate,
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayGondor = dates[dates.length - 1];
                    }
                    gregorianDate = getNextDate(gregorianDate);
                }

                if (
                    rules === RECKONING_RULES_TRADITIONAL
                    && isMillennialLeapYear(year)
                ) {
                    dates.push({
                        day: newReckoning ? "Cormarë" : "Enderë",
                        month: newReckoning ? month : month + 1,
                        weekDay: weekDay++ % 7,
                        gregorian: gregorianDate,
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayGondor = dates[dates.length - 1];
                    }
                    gregorianDate = getNextDate(gregorianDate);
                }

                if (leapYear || newReckoning) {
                    dates.push({
                        day: "Enderë",
                        month: month + 1,
                        weekDay: weekDay++ % 7,
                        gregorian: gregorianDate,
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayGondor = dates[dates.length - 1];
                    }
                    gregorianDate = getNextDate(gregorianDate);
                }

                if (!leapYear || newReckoning) {
                    dates.push({
                        day: "Loëndë",
                        month: month + 1,
                        weekDay: weekDay++ % 7,
                        gregorian: gregorianDate,
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayGondor = dates[dates.length - 1];
                    }
                    gregorianDate = getNextDate(gregorianDate);
                }

                if (leapYear || newReckoning) {
                    dates.push({
                        day: "Enderë",
                        month: month + 1,
                        weekDay: weekDay++ % 7,
                        gregorian: gregorianDate,
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayGondor = dates[dates.length - 1];
                    }
                    gregorianDate = getNextDate(gregorianDate);
                }

                break;

            case 8:
                if (stewardsReckoning) {
                    dates.push({
                        day: "Yáviérë",
                        month: month + 1,
                        weekDay: weekDay++ % 7,
                        gregorian: gregorianDate,
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayGondor = dates[dates.length - 1];
                    }
                    gregorianDate = getNextDate(gregorianDate);
                }

                break;

            case 11:
                dates.push({
                    day: "Mettarë",
                    month: 11,
                    weekDay: weekDay++ % 7,
                    gregorian: gregorianDate,
                });

                if (datesMatch(today, gregorianDate)) {
                    todayGondor = dates[dates.length - 1];
                }
                gregorianDate = getNextDate(gregorianDate);

                break;

            default:
                break;
        }
    }

    return {
        year,
        dates,
        today,
        todayGondor,
    };
};

export {
    RECKONING_KINGS,
    RECKONING_STEWARDS,
    RECKONING_NEW,
    RECKONING_RULES_TRADITIONAL,
    RECKONING_RULES_GREGORIAN,
    GondorWeekdays,
    GondorMonths,
    GondorHolidays,
    getGondorNewYearDate,
    getNewReckoningNewYearDate,
    isGondorLeapYear,
    isMillennialLeapYear,
    convertGondorianMonthIndex,
    convertGregorianToGondorianWeekday,
    makeGondorCalendarDates,
};
