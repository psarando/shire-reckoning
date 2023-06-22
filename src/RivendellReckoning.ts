/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import {
    Calendar,
    CalendarDate,
    YearWithRemainder,
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

enum RivendellRulesEnum {
    TRADITIONAL = "traditional",
    REFORMED = "reformed",
}

/**
 * @property emoji - An icon representing this weekday.
 * @property english - The English translation of this weekday name.
 * @property quenya - The Quenya name for this weekday.
 * @property sindarin - The Sindarin name for this weekday.
 */
interface RivendellWeekday {
    emoji: string;
    english: string;
    quenya: string;
    sindarin: string;
    description: string;
}

/**
 * Weekday names and descriptions
 * @constant
 */
const RivendellWeekdays: RivendellWeekday[] = [
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
        english: "Two Trees Day",
        quenya: "Aldúya",
        sindarin: "Orgaladhad",
        description:
            "English: Two Trees of Valinor Day\nQuenya: Aldúya\nSindarin: Orgaladhad",
    },
    {
        emoji: "🌌",
        english: "Heavens Day",
        quenya: "Menelya",
        sindarin: "Ormenel",
        description: "English: Heavens Day\nQuenya: Menelya\nSindarin: Ormenel",
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
 * @property emoji - An icon representing this month.
 * @property english - The English translation of this month name.
 * @property quenya - The Quenya name for this month.
 * @property sindarin - The Sindarin name for this month.
 * @property description
 * @property className - UI-hint for styling this month.
 */
interface RivendellMonth {
    emoji: string;
    english: string;
    quenya: string;
    sindarin: string;
    description: string;
    className: string;
}

/**
 * Month names and descriptions.
 * @constant
 */
const RivendellMonths: RivendellMonth[] = [
    {
        emoji: "🌼",
        english: "Spring",
        quenya: "Tuilë",
        sindarin: "Ethuil",
        description: "English: Spring\nQuenya: Tuilë\nSindarin: Ethuil",
        className: "spring",
    },
    {
        emoji: "☀️",
        english: "Summer",
        quenya: "Lairë",
        sindarin: "Laer",
        description: "English: Summer\nQuenya: Lairë\nSindarin: Laer",
        className: "summer",
    },
    {
        emoji: "🍇",
        english: "Autumn",
        quenya: "Yávië",
        sindarin: "Iavas",
        description: "English: Autumn\nQuenya: Yávië\nSindarin: Iavas",
        className: "autumn",
    },
    {
        emoji: "🍂",
        english: "Fading",
        quenya: "Quellë",
        sindarin: "Firith",
        description:
            "English: Fading\nQuenya: Quellë or 'lasse-lanta'\nSindarin: Firith or 'narbeleth'",
        className: "fading",
    },
    {
        emoji: "❄️",
        english: "Winter",
        quenya: "Hrívë",
        sindarin: "Rhîw",
        description: "English: Winter\nQuenya: Hrívë\nSindarin: Rhîw",
        className: "winter",
    },
    {
        emoji: "🌱",
        english: "Stirring",
        quenya: "Coirë",
        sindarin: "Echuir",
        description: "English: Stirring\nQuenya: Coirë\nSindarin: Echuir",
        className: "stirring",
    },
];

/**
 * @property english - The English translation of this holiday name.
 * @property quenya - The Quenya name for this holiday.
 * @property sindarin - The Sindarin name for this holiday.
 * @property description
 */
interface ElvishHoliday {
    english: string;
    quenya: string;
    sindarin: string;
    description: string;
}

type ElvishHolidays = Record<string, ElvishHoliday>;

/**
 * Elvish Holiday names and descriptions.
 * @constant
 */
const CommonElvishHolidays: ElvishHolidays = {
    Yestarë: {
        english: "First Day",
        quenya: "Yestarë",
        sindarin: "Iestor",
        description: "New Year's Day!",
    },
    Enderë: {
        english: "Middleday",
        quenya: "Enderë",
        sindarin: "Enedhor",
        description: "Middleday",
    },
    Mettarë: {
        english: "Last Day",
        quenya: "Mettarë",
        sindarin: "Methor",
        description: "New Year's Eve!",
    },
};

/**
 * Rivendell Holiday names and descriptions.
 * @constant
 */
const RivendellHolidays: ElvishHolidays = {
    ...CommonElvishHolidays,
    "Reformed Enderë": {
        english: "Leap Middleday",
        quenya: "Reformed Enderë",
        sindarin: "Reformed Enedhor",
        description: "Leap Middleday",
    },
};

/**
 * @param {number} year - The Rivendell year to check.
 * @return {boolean} True if the given `year` is a Rivendell leap-year.
 */
const isRivendellLeapYear = (year: number): boolean => {
    return year % 12 === 0 && year % 432 !== 0;
};

/**
 * @default new Date(1, 2, 22, 0,0,0)
 *
 * The Gregorian Date corresponding to the first Rivendell New Year Date.
 * The default year is 1 in order to keep Rivendell leap-years in sync with Gregorian leap-years.
 */
type FirstRivendellNewYearDate = Date;

/**
 * @param {FirstRivendellNewYearDate} [startDate]
 * @return {FirstRivendellNewYearDate} startDate if not null, otherwise the default first New Year Date.
 */
const getStartDate = (
    startDate?: FirstRivendellNewYearDate
): FirstRivendellNewYearDate => {
    if (!startDate) {
        startDate = fullYearDate(1, 2, 22);
    }

    return startDate;
};

/**
 * @param {number} daysElapsed - The total number of whole days elapsed since the first New Year Date.
 * @return {YearWithRemainder} The current Rivendell year (including 0) for the given `daysElapsed`.
 */
const daysElapsedToRivendellYear = (daysElapsed: number): YearWithRemainder => {
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
    today: Date,
    startDate: FirstRivendellNewYearDate,
    calendarRules: RivendellRulesEnum = TRADITIONAL_RULES
): Date => {
    startDate = getStartDate(startDate);

    const getYearWithRemainder =
        calendarRules === TRADITIONAL_RULES
            ? daysElapsedToRivendellYear
            : daysElapsedToGregorianYear;

    const yearWithRemainder = getYearWithRemainder(
        toDaysElapsed(startDate, today)
    );

    return getNewYearDate(startDate, today, yearWithRemainder.daysRemainder);
};

/**
 * @property month - The month index of {@link RivendellMonths}.
 * @property weekDay - The weekday index of {@link RivendellWeekdays}.
 */
interface RivendellDate extends CalendarDate {
    className?: string;
}

/**
 * @property year - The current Rivendell year.
 * @property dates - The dates of this Rivendell calendar year.
 * @property todayRivendell - The current Rivendell date corresponding to the given
 *     [today]{@link RivendellCalendarYear.today}.
 */
interface RivendellCalendarYear extends Calendar {
    dates: RivendellDate[];
    todayRivendell: RivendellDate | undefined;
}

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
    today: Date,
    startDate?: FirstRivendellNewYearDate,
    calendarRules: RivendellRulesEnum = TRADITIONAL_RULES
): RivendellCalendarYear => {
    startDate = getStartDate(startDate);

    let todayRivendell;
    const getYearWithRemainder =
        calendarRules === TRADITIONAL_RULES
            ? daysElapsedToRivendellYear
            : daysElapsedToGregorianYear;

    const daysElapsed = toDaysElapsed(startDate, today);
    const yearWithRemainder = getYearWithRemainder(daysElapsed);
    const year = yearWithRemainder.year;

    let gregorianDate = getNewYearDate(
        startDate,
        today,
        yearWithRemainder.daysRemainder
    );

    let weekDay = getWeekDay(daysElapsed, yearWithRemainder.daysRemainder, 6);

    const dates: RivendellDate[] = [];
    if (calendarRules === REFORMED_RULES && isLeapYear(year)) {
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

        switch (month) {
            case 1:
            case 4:
                maxdays = 72;
                break;
            case 3:
                let enderiCount = 3;
                if (
                    calendarRules === TRADITIONAL_RULES
                    && isRivendellLeapYear(year)
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

            default:
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
        year,
        dates,
        today,
        todayRivendell,
    };
};

const { TRADITIONAL: TRADITIONAL_RULES, REFORMED: REFORMED_RULES } =
    RivendellRulesEnum;

export {
    TRADITIONAL_RULES,
    REFORMED_RULES,
    RivendellRulesEnum,
    ElvishHolidays,
    RivendellCalendarYear,
    RivendellDate,
    RivendellWeekdays,
    RivendellMonths,
    RivendellHolidays,
    CommonElvishHolidays,
    isRivendellLeapYear,
    getRivendellNewYearDate,
    makeRivendellCalendarDates,
};
