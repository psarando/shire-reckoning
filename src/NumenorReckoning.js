/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import { datesMatch, getNextDate, isLeapYear } from './Utils';

const RECKONING_KINGS = "kings";
const RECKONING_STEWARDS = "stewards";
const RECKONING_NEW = "new";

const NumenorWeekdays = [
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
        english: "White Tree's Day",
        quenya: "Aldëa",
        sindarin: "Orgaladh",
        description: "English: White Tree's Day\nQuenya: Aldëa\nSindarin: Orgaladh"
    },
    {
        english: "Heavens Day",
        quenya: "Menelya",
        sindarin: "Ormenel",
        description: "English: Heavens Day\nQuenya: Menelya\nSindarin: Ormenel"
    },
    {
        english: "Sea Day",
        quenya: "Eärenya",
        sindarin: "Oraearon",
        description: "English: Sea Day\nQuenya: Eärenya\nSindarin: Oraearon"
    },
    {
        english: "Valar or Powers Day",
        quenya: "Valanya or Tárion",
        sindarin: "Orbelain or Rodyn",
        description: "English: Valar or Powers Day\nQuenya: Valanya or Tárion\nSindarin: Orbelain or Rodyn"
    }
];

const NumenorMonths = [
    {
        english: "New Sun",
        quenya: "Narvinyë",
        sindarin: "Narwain",
        description: "English: New Sun\nQuenya: Narvinyë\nSindarin: Narwain",
        className: "afteryule"
    },
    {
        english: "Wet Month",
        quenya: "Nénimë",
        sindarin: "Nínui",
        description: "English: Wet Month\nQuenya: Nénimë\nSindarin: Nínui",
        className: "solmath"
    },
    {
        english: "Windy Month",
        quenya: "Súlimë",
        sindarin: "Gwaeron",
        description: "English: Windy Month\nQuenya: Súlimë\nSindarin: Gwaeron",
        className: "rethe"
    },
    {
        english: "Budding Month",
        quenya: "Víressë",
        sindarin: "Gwirith",
        description: "English: Spring/Budding Month\nQuenya: Víressë\nSindarin: Gwirith",
        className: "astron"
    },
    {
        english: "Flower Month",
        quenya: "Lótessë",
        sindarin: "Lothron",
        description: "English: Flower Month\nQuenya: Lótessë\nSindarin: Lothron",
        className: "thrimidge"
    },
    {
        english: "Sunny Month",
        quenya: "Nárië",
        sindarin: "Nórui",
        description: "English: Sunny Month\nQuenya: Nárië\nSindarin: Nórui",
        className: "forelithe"
    },
    {
        english: "Cutting Month",
        quenya: "Cermië",
        sindarin: "Cerveth",
        description: "English: Cutting Month\nQuenya: Cermië\nSindarin: Cerveth",
        className: "afterlithe"
    },
    {
        english: "Hot Month",
        quenya: "Urimë",
        sindarin: "Urui",
        description: "English: Hot Month\nQuenya: Urimë\nSindarin: Urui",
        className: "wedmath"
    },
    {
        english: "Harvest Month",
        quenya: "Yavannië",
        sindarin: "Ivanneth",
        description: "English: Harvest/Fruit-giving Month\nQuenya: Yavannië\nSindarin: Ivanneth",
        className: "halimath"
    },
    {
        english: "Sun Waning",
        quenya: "Narquelië",
        sindarin: "Narbeleth",
        description: "English: Sun Waning/Fading\nQuenya: Narquelië\nSindarin: Narbeleth",
        className: "winterfilth"
    },
    {
        english: "Misty Month",
        quenya: "Hísimë",
        sindarin: "Hithui",
        description: "English: Misty Month\nQuenya: Hísimë\nSindarin: Hithui",
        className: "blotmath"
    },
    {
        english: "Cold Month",
        quenya: "Ringarë",
        sindarin: "Girithron",
        description: "English: Cold/Shivering Month\nQuenya: Ringarë\nSindarin: Girithron",
        className: "foreyule"
    }
];

const getNumenorNewYearDate = (today, startDay) => {
    let startYear = today.getFullYear();
    if (today.getMonth() < 11 || today.getDate() < startDay) {
        startYear--;
    }

    let newYearDate = new Date(startYear, 11, startDay, 0, 0, 0);
    // reset full year for years 0-99
    newYearDate.setFullYear(startYear);

    return newYearDate;
};

const convertMonthIndex = (fromReckoning, toReckoning, monthIndex) => {
    let fromNewReckoning = fromReckoning === RECKONING_NEW;
    let toNewReckoning = toReckoning === RECKONING_NEW;
    if (fromNewReckoning !== toNewReckoning) {
        fromNewReckoning ? monthIndex += 3 : monthIndex -= 3;

        // handle values less than 0 or greater than 12
        monthIndex = (monthIndex+12)%12;
    }

    return monthIndex;
};

const convertGregorianWeekday = (weekday) => {
    return (weekday+6)%7;
};

const getNewReckoningNewYearDate = (today, startDay) => {
    let startYear = today.getFullYear();
    let thisMonth = today.getMonth();
    let thisDate = today.getDate();
    let dayOffset = startDay - 21;

    if (thisMonth < 2) {
        startYear--;
    } else if (thisMonth === 2) {
        if (thisDate < 15+dayOffset || (!isLeapYear(today) && thisDate < 16+dayOffset)) {
            startYear--;
        }
    }

    let newYearDate = new Date(startYear, 2, 16+dayOffset, 0, 0, 0);
    // reset full year for years 0-99
    newYearDate.setFullYear(startYear);

    if (isLeapYear(newYearDate)) {
        newYearDate.setDate(15+dayOffset);
    }

    return newYearDate;
};

const makeNumenorCalendarDates = (today, startDay, reckoning) => {
    let kingsReckoning = reckoning === RECKONING_KINGS;
    let stewardsReckoning = reckoning === RECKONING_STEWARDS;
    let newReckoning = reckoning === RECKONING_NEW;
    let gregorianDate =
        newReckoning ?
            getNewReckoningNewYearDate(today, startDay) :
            getNumenorNewYearDate(today, startDay);
    let todayNumenor;

    let dates = [];

    for (let month = 0; month < 12; month++) {
        let maxdays = 30;

        // eslint-disable-next-line
        switch (month) {
            // no default case required
            case 0:
                dates.push({
                    "date": "Yestarë",
                    "month": 0,
                    "weekDay": convertGregorianWeekday(gregorianDate.getDay()),
                    "gregorian": gregorianDate
                });

                if (datesMatch(today, gregorianDate)) {
                    todayNumenor = dates[0];
                }
                gregorianDate = getNextDate(gregorianDate);

                break;

            case 5:
            case 6:
                if (kingsReckoning) maxdays = 31;
                break;
        }

        for (let day = 1;
             day <= maxdays;
             day++, gregorianDate = getNextDate(gregorianDate)) {
            dates.push({
                "day": day,
                "month": month,
                "weekDay": convertGregorianWeekday(gregorianDate.getDay()),
                "gregorian": gregorianDate
            });

            if (datesMatch(today, gregorianDate)) {
                todayNumenor = dates[dates.length-1];
            }
        }

        // eslint-disable-next-line
        switch (month) {
            // no default case required
            case 2:
                if (stewardsReckoning) {
                    dates.push({
                        "date": "Tuilérë",
                        "month": month + 1,
                        "weekDay": convertGregorianWeekday(gregorianDate.getDay()),
                        "gregorian": gregorianDate
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayNumenor = dates[dates.length-1];
                    }
                    gregorianDate = getNextDate(gregorianDate);
                }

                break;

            case 5:
                let leapYear = isLeapYear(gregorianDate);

                if (leapYear && newReckoning) {
                    dates.push({
                        "date": "Cormarë",
                        "month": month,
                        "weekDay": convertGregorianWeekday(gregorianDate.getDay()),
                        "gregorian": gregorianDate
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayNumenor = dates[dates.length-1];
                    }
                    gregorianDate = getNextDate(gregorianDate);
                }

                if (leapYear || newReckoning) {
                    dates.push({
                        "date": "Enderë",
                        "month": month + 1,
                        "weekDay": convertGregorianWeekday(gregorianDate.getDay()),
                        "gregorian": gregorianDate
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayNumenor = dates[dates.length-1];
                    }
                    gregorianDate = getNextDate(gregorianDate);
                }

                if (!leapYear || newReckoning) {
                    dates.push({
                        "date": "Loëndë",
                        "month": month + 1,
                        "weekDay": convertGregorianWeekday(gregorianDate.getDay()),
                        "gregorian": gregorianDate
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayNumenor = dates[dates.length-1];
                    }
                    gregorianDate = getNextDate(gregorianDate);
                }

                if (leapYear || newReckoning) {
                    dates.push({
                        "date": "Enderë",
                        "month": month + 1,
                        "weekDay": convertGregorianWeekday(gregorianDate.getDay()),
                        "gregorian": gregorianDate
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayNumenor = dates[dates.length-1];
                    }
                    gregorianDate = getNextDate(gregorianDate);
                }

                break;

            case 8:
                if (stewardsReckoning) {
                    dates.push({
                        "date": "Yáviérë",
                        "month": month + 1,
                        "weekDay": convertGregorianWeekday(gregorianDate.getDay()),
                        "gregorian": gregorianDate
                    });

                    if (datesMatch(today, gregorianDate)) {
                        todayNumenor = dates[dates.length-1];
                    }
                    gregorianDate = getNextDate(gregorianDate);
                }

                break;

            case 11:
                dates.push({
                    "date": "Mettarë",
                    "month": 11,
                    "weekDay": convertGregorianWeekday(gregorianDate.getDay()),
                    "gregorian": gregorianDate
                });

                if (datesMatch(today, gregorianDate)) {
                    todayNumenor = dates[dates.length-1];
                }
                gregorianDate = getNextDate(gregorianDate);

                break;
        }
    }

    return {
        dates: dates,
        today: today,
        todayNumenor: todayNumenor
    };
};

export {
    RECKONING_KINGS,
    RECKONING_STEWARDS,
    RECKONING_NEW,
    NumenorWeekdays,
    NumenorMonths,
    getNumenorNewYearDate,
    getNewReckoningNewYearDate,
    convertMonthIndex,
    convertGregorianWeekday,
    makeNumenorCalendarDates
};
