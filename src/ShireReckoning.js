/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import {
    toDaysElapsed,
    daysElapsedToGregorianYear,
    daysElapsedToSecondAgeYear,
    getNewYearDate,
    getWeekDay,
    datesMatch,
    fullYearDate,
    getNextDate
} from './Utils';

import {
    RECKONING_RULES_GREGORIAN,
    RECKONING_RULES_TRADITIONAL,
    isMillennialLeapYear,
    isGondorLeapYear
} from './GondorReckoning';

/**
 * @typedef {Object} ShireWeekday
 * @property {string} tolkien - The Gregorian substitution Tolkien used for this weekday name.
 * @property {string} shire - The Shire name for this weekday.
 * @property {string} bree - The Bree name for this weekday.
 * @property {string} description
 */

/**
 * Weekday names and descriptions
 * @constant
 * @type {ShireWeekday[]}
 */
const ShireWeekdays = [
    {
        tolkien: 'Saturday',
        shire: 'Sterday',
        bree: 'Sterday',
        description:
`Tolkien: Saturday
Shire: Sterday
Star Day. From the archaic Sterrendei (from Old English steorra dæg).`
    },
    {
        tolkien: 'Sunday',
        shire: 'Sunday',
        bree: 'Sunday',
        description:
`Tolkien: Sunday
Shire: Sunday
Sun Day. From the archaic Sunnendei (from Old English sunne dæg).`
    },
    {
        tolkien: 'Monday',
        shire: 'Monday',
        bree: 'Monday',
        description:
`Tolkien: Monday
Shire: Monday
Moon Day. From the archaic Monendei (from Old English mōna dæg).`
    },
    {
        tolkien: 'Tuesday',
        shire: 'Trewsday',
        bree: 'Trewsday',
        description:
`Tolkien: Tuesday
Shire: Trewsday
Trees Day. From the archaic Trewesdei (from Old English trēow dæg).`
    },
    {
        tolkien: 'Wednesday',
        shire: 'Hevensday',
        bree: 'Hevensday',
        description:
`Tolkien: Wednesday
Shire: Hevensday
Heavens Day. From the archaic Hevensdei (from Old English heofen dæg).`
    },
    {
        tolkien: 'Thursday',
        shire: 'Mersday',
        bree: 'Mersday',
        description:
`Tolkien: Thursday
Shire: Mersday
Sea Day. From the archaic Meresdei (from Old English mere dæg).`
    },
    {
        tolkien: 'Friday',
        shire: 'Highday',
        bree: 'Highday',
        description:
`Tolkien: Friday
Shire: Highday
High Day. From the archaic Hihdei (from Old English hēah dæg).`
    }
];

/**
 * @typedef {Object} ShireMonth
 * @property {string} tolkien - The Gregorian substitution Tolkien used for this month name.
 * @property {string} shire - The Shire name for this month.
 * @property {string} bree - The Bree name for this month.
 * @property {string} description
 * @property {string} className - UI-hint for styling this month.
 */

/**
 * Month names and descriptions.
 * @constant
 * @type {ShireMonth[]}
 */
const ShireMonths = [
    {
        tolkien: 'January',
        shire: 'Afteryule',
        bree: 'Frery',
        description:
`Tolkien: January
Shire: Afteryule
Bree: Frery
The month after the winter solstice (Midwinter),
from æfter Gēola 'after Winter Solstice',
and from frēorig 'freezing, frigid'.`,
        className: "afteryule"
    },
    {
        tolkien: 'February',
        shire: 'Solmath',
        bree: 'Solmath',
        description:
`Tolkien: February
Shire: Solmath
Bree: Solmath
From Solmōnað, perhaps from the Old English word for mud, 'sol'.
Muddy Month.`,
        className: "solmath"
    },
    {
        tolkien: 'March',
        shire: 'Rethe',
        bree: 'Rethe',
        description:
`Tolkien: March
Shire: Rethe
Bree: Rethe
From Hrēðmōnað 'glory-month'. Month of the Goddess Hrēþ or Hretha, according to the Venerable Bede.
Month of Wildness or Roaring Winds.`,
        className: "rethe"
    },
    {
        tolkien: 'April',
        shire: 'Astron',
        bree: 'Chithing',
        description:
`Tolkien: April
Shire: Astron
Bree: Chithing
From Ēastermōnað 'Easter-month', named after the Goddess Ēostre,
and from cīþing 'growing thing' (cīþ 'young shoot, sprout').
Spring Month.`,
        className: "astron"
    },
    {
        tolkien: 'May',
        shire: 'Thrimidge',
        bree: 'Thrimidge',
        description:
`Tolkien: May
Shire: Thrimidge
Bree: Thrimidge
The month of plenty, when cows were given three milkings (þri-milce) daily.`,
        className: "thrimidge"
    },
    {
        tolkien: 'June',
        shire: 'Forelithe',
        bree: 'Lithe',
        description:
`Tolkien: June
Shire: Forelithe
Bree: Lithe
The month before the summer solstice (Midsummer), when litha (gentle, mild) weather encouraged voyages.
From ǣrra Līða 'before Litha'.
Calm or Navigable Month.`,
        className: "forelithe"
    },
    {
        tolkien: 'July',
        shire: 'Afterlithe',
        bree: 'Mede',
        description:
`Tolkien: July
Shire: Afterlithe
Bree: Mede
The month after the summer solstice (Midsummer), from æfter Līða, and from mǣd 'mead, meadow'.
Meadow Month.`,
        className: "afterlithe"
    },
    {
        tolkien: 'August',
        shire: 'Wedmath',
        bree: 'Wedmath',
        description:
`Tolkien: August
Shire: Wedmath
Bree: Wedmath
When fields were beset by weeds, from Wēodmōnað 'weed-month'.
Plant Month.`,
        className: "wedmath"
    },
    {
        tolkien: 'September',
        shire: 'Halimath',
        bree: 'Harvestmath',
        description:
`Tolkien: September
Shire: Halimath
Bree: Harvestmath
The holy month of offerings, from Hāligmōnað 'holy-month', and from Hærfestmōnað 'harvest-month'.
Harvest Month.`,
        className: "halimath"
    },
    {
        tolkien: 'October',
        shire: 'Winterfilth',
        bree: 'Wintring',
        description:
`Tolkien: October
Shire: Winterfilth
Bree: Wintring
The filling of winter's first full moon, according to the Venerable Bede.
Tolkien instead suggests the "filling" or completion of the year before Winter, after the harvest.
From Winterfylleð 'winter fullness', and wintrig 'wintry, winter'.
Wine Month.`,
        className: "winterfilth"
    },
    {
        tolkien: 'November',
        shire: 'Blotmath',
        bree: 'Blooting',
        description:
`Tolkien: November
Shire: Blotmath
Bree: Blooting
The Month of Sacrifice, from Blōtmōnað 'sacrifice-month'.`,
        className: "blotmath"
    },
    {
        tolkien: 'December',
        shire: 'Foreyule',
        bree: 'Yulemath',
        description:
`Tolkien: December
Shire: Foreyule
Bree: Yulemath
The month before the winter solstice (Midwinter),
from ǣrra Gēola 'before Winter Solstice', and from Gēolamōnað 'Yule-month'.`,
        className: "foreyule"
    }
];

/**
 * @typedef {Date} FirstShireNewYearDate
 * @default new Date(0, 11, 21, 0,0,0)
 *
 * The Gregorian Date corresponding to the first Shire New Year Date.
 * The default year is 0 in order to keep Shire leap-years in sync with Gregorian leap-years.
 */

/**
 * @param {FirstShireNewYearDate} [startDate]
 * @return {FirstShireNewYearDate} startDate if not null, otherwise the default first New Year Date.
 */
function getStartDate(startDate) {
    if (!startDate) {
        startDate = fullYearDate(0, 11, 21);
    }

    return startDate;
}

/**
 * @param {Date} today
 * @param {FirstShireNewYearDate} [startDate]
 * @param {GondorLeapYearRuleEnum} [rules=RECKONING_RULES_GREGORIAN]
 *
 * @return {Date} The Gregorian Date corresponding to the Shire New Year Date
 *                for the year of the given `today`.
 */
const getShireNewYearDate = (today, startDate, rules = RECKONING_RULES_GREGORIAN) => {
    startDate = getStartDate(startDate);

    let getYearWithRemainder =
            rules === RECKONING_RULES_TRADITIONAL ?
                daysElapsedToSecondAgeYear :
                daysElapsedToGregorianYear;

    let daysSinceNewYearsDay = getYearWithRemainder(toDaysElapsed(startDate, today)).daysRemainder;

    return getNewYearDate(startDate, today, daysSinceNewYearsDay);
};

/**
 * @typedef {Object} ShireDate
 * @property {(number|string)} day - The number of the day of the month, if this date is not intercalary; otherwise, the name of the intercalary date.
 * @property {number} month - The month index of {@link ShireMonths}.
 * @property {number} weekDay - The weekday index of {@link ShireWeekdays}.
 * @property {Date} gregorian - The corresponding Gregorian date.
 */

/**
 * @typedef {Object} ShireCalendarYear
 * @property {number} year - The current Shire year.
 * @property {ShireDate[]} dates - The dates of this Shire calendar year.
 * @property {Date} today - The given Gregorian Date this calendar year was generated from.
 * @property {ShireDate} todayShire - The current Shire date corresponding to the given [today]{@link ShireCalendarYear#today}.
 */

/**
 * Generates a calendar year for the given Date `today`, according to the given `startDate`.
 *
 * @param {Date} today
 * @param {FirstShireNewYearDate} [startDate]
 * @param {GondorLeapYearRuleEnum} [rules=RECKONING_RULES_GREGORIAN]
 *
 * @return {ShireCalendarYear} The calendar year for the given `today`.
 */
const makeShireCalendarDates = (today, startDate, rules = RECKONING_RULES_GREGORIAN) => {
    startDate = getStartDate(startDate);

    let reckonTraditional = (rules === RECKONING_RULES_TRADITIONAL);

    let getYearWithRemainder = reckonTraditional ? daysElapsedToSecondAgeYear : daysElapsedToGregorianYear;

    let daysElapsed = toDaysElapsed(startDate, today);
    let yearWithRemainder = getYearWithRemainder(daysElapsed);

    let gregorianDate = getNewYearDate(startDate, today, yearWithRemainder.daysRemainder);

    let todayShire;
    let weekDay = 0;
    let shireReform = true;
    let year = yearWithRemainder.year;

    if (reckonTraditional) {
        // Shire Reform was enacted during the time of Isengrim II, sometime between T.A. 2683 - 2722.
        // So probably starting with one of these years (if Kings' weekdays were reckoned continuously from S.A. 1):
        // 2685 2691 2703 2714 2720
        shireReform = (year >= 2685+3441);

        if (!shireReform) {
            weekDay = getWeekDay(daysElapsed, yearWithRemainder.daysRemainder, 7);
        }
    }

    let dates = [{
        "day": "2 Yule",
        "month": 0,
        "weekDay": (weekDay++ % 7),
        "gregorian": gregorianDate
    }];

    if (datesMatch(today, gregorianDate)) {
        todayShire = dates[0];
    }

    gregorianDate = getNextDate(gregorianDate);

    for (let month = 0; month < 12; month++) {
        for (let day = 1; day <= 30; day++, weekDay++, gregorianDate = getNextDate(gregorianDate)) {
            dates.push({
                "day": day,
                "month": month,
                "weekDay": weekDay % 7,
                "gregorian": gregorianDate
            });

            if (datesMatch(today, gregorianDate)) {
                todayShire = dates[dates.length-1];
            }
        }

        if (month === 5) {
            let millennialLeapYear = (reckonTraditional && isMillennialLeapYear(year));

            dates.push({
                "day": "1 Lithe",
                "region": {
                    "tolkien": "1 Lithe",
                    "shire": "1 Lithe",
                    "bree": "1 Summerday"
                },
                "month": shireReform ? month : month + 1,
                "weekDay": weekDay % 7,
                "gregorian": gregorianDate
            });

            if (datesMatch(today, gregorianDate)) {
                todayShire = dates[dates.length-1];
            }

            let summerday = 2;
            if (millennialLeapYear) {
                if (!shireReform) {
                    weekDay++;
                }

                gregorianDate = getNextDate(gregorianDate);
                dates.push({
                    "day": "Overlithe",
                    "region": {
                        "tolkien": "Overlithe",
                        "shire": "Overlithe",
                        "bree": `${summerday++} Summerday`
                    },
                    "month": shireReform ? month : month + 1,
                    "weekDay": weekDay % 7,
                    "gregorian": gregorianDate
                });

                if (datesMatch(today, gregorianDate)) {
                    todayShire = dates[dates.length-1];
                }
            }

            if (!shireReform) {
                weekDay++;
            }

            gregorianDate = getNextDate(gregorianDate);
            dates.push({
                "day": "Midyear's Day",
                "month": (shireReform && !millennialLeapYear) ? month : month + 1,
                "weekDay": weekDay % 7,
                "gregorian": gregorianDate
            });

            if (datesMatch(today, gregorianDate)) {
                todayShire = dates[dates.length-1];
            }

            summerday++;
            weekDay++;
            let leapYear = isGondorLeapYear(year, rules);
            if (leapYear) {
                gregorianDate = getNextDate(gregorianDate);
                dates.push({
                    "day": "Overlithe",
                    "region": {
                        "tolkien": "Overlithe",
                        "shire": "Overlithe",
                        "bree": `${summerday++} Summerday`
                    },
                    "month": month+1,
                    "weekDay": weekDay % 7,
                    "gregorian": gregorianDate
                });

                if (datesMatch(today, gregorianDate)) {
                    todayShire = dates[dates.length-1];
                }

                if (!shireReform) {
                    weekDay++;
                }
            }

            gregorianDate = getNextDate(gregorianDate);
            dates.push({
                "day": "2 Lithe",
                "region": {
                    "tolkien": "2 Lithe",
                    "shire": "2 Lithe",
                    "bree": `${summerday++} Summerday`
                },
                "month": month+1,
                "weekDay": weekDay % 7,
                "gregorian": gregorianDate
            });

            if (datesMatch(today, gregorianDate)) {
                todayShire = dates[dates.length-1];
            }

            gregorianDate = getNextDate(gregorianDate);
            weekDay++;
        }
    }

    dates.push({
        "day": "1 Yule",
        "month": 11,
        "weekDay": weekDay % 7,
        "gregorian": gregorianDate
    });

    if (datesMatch(today, gregorianDate)) {
        todayShire = dates[dates.length-1];
    }

    return {
        year: year,
        dates: dates,
        today: today,
        todayShire: todayShire
    };
};

export { ShireWeekdays, ShireMonths, getShireNewYearDate, makeShireCalendarDates };
