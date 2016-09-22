/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import { datesMatch, getNextDate, isLeapYear } from './Utils';

const TRADITIONAL_RULES = "traditional";
const REFORMED_RULES = "reformed";

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

const isRivendellLeapYear = (today) => {
    let year = today.getFullYear();
    return ((year % 12 === 0) && (year % 432 !== 0));
};

const getRivendellNewYearDay = (startYear, startDay, calendarRules) => {
    if (calendarRules === REFORMED_RULES) {
        return startDay;
    }

    // adjust startDay according to leap year cycles.
    return (
        startDay
        - Math.floor(startYear / 4)
        + (Math.floor((startYear-1) / 12) * 3)
        + Math.floor(startYear / 100)
        - Math.floor(startYear / 400)
        - (Math.floor((startYear-1) / 432) * 3)
    );
};

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
    newYearDate.setFullYear(startYear);

    return newYearDate;
};

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
        "date": "Yestarë",
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
                        "date": "Enderë",
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
        "date": "Mettarë",
        "month": 5,
        "weekDay": weekDay % 6,
        "gregorian": gregorianDate
    });

    if (datesMatch(today, gregorianDate)) {
        todayRivendell = dates[dates.length - 1];
    }

    if (calendarRules === REFORMED_RULES && isLeapYear(gregorianDate)) {
        gregorianDate = getNextDate(gregorianDate);
        weekDay++;

        dates.push({
            "date": "Reformed Enderë",
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
