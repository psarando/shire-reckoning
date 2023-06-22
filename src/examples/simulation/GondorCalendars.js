/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    GondorMonths,
    RECKONING_KINGS,
    RECKONING_STEWARDS,
    RECKONING_NEW,
    RECKONING_RULES_TRADITIONAL,
    makeGondorCalendarDates,
} from "../../GondorReckoning";

import {
    daysElapsedToSecondAgeYear,
    daysElapsedToNewReckoningYear,
    toDaysElapsed,
    datesMatch,
    fullYearDate,
    getFirstDay,
    getLastDay,
} from "../../Utils";

import GondorCalendar from "../../ui/GondorCalendar";
import "../../ui/tolkien-calendars.css";

import LanguagePicker from "../controls/LanguagePicker";
import MonthViewLayout from "../controls/MonthViewLayout";
import MonthViewPicker from "../controls/MonthViewPicker";

import StartReckoningDatePicker from "./StartReckoningDatePicker";

const getNewStyleYear = (startDate, today) =>
    daysElapsedToNewReckoningYear(
        daysElapsedToSecondAgeYear,
        toDaysElapsed(startDate, today)
    ).year - 3441;

const gondorReckoningForYear = (calendar, startDate, today) => {
    let year = calendar.year;

    let gondorReckoning = RECKONING_KINGS;
    if (year > 3441) {
        year -= 3441;

        if (year > 2059) {
            gondorReckoning = RECKONING_STEWARDS;

            // For year 3019, New Reckoning doesn't start until 3/25 old style.
            if (year > 3019 || getNewStyleYear(startDate, today) >= 3019) {
                gondorReckoning = RECKONING_NEW;
            }
        }
    }

    return gondorReckoning;
};

const defaultStartDate = fullYearDate(0, 11, 23);

const GondorCalendarSimulated = (props) => {
    const { className, onCalendarStartChange } = props;

    const [language, setLanguage] = React.useState(LanguagePicker.QUENYA);
    const [yearView, setYearView] = React.useState(false);
    const [monthViewLayout, setMonthViewLayout] = React.useState(
        MonthViewLayout.VERTICAL
    );

    const nextDate = props.date || new Date();
    const [today, setToday] = React.useState(nextDate);
    const [viewDate, setViewDate] = React.useState(today);

    const nextStartDate = props.startDate || defaultStartDate;
    const [startDate, setStartDate] = React.useState(nextStartDate);

    const [reckoning, setReckoning] = React.useState(
        GondorCalendar.RECKONING_STEWARDS
    );

    const [calendar, setCalendar] = React.useState(() =>
        makeGondorCalendarDates(
            today,
            startDate,
            reckoning,
            RECKONING_RULES_TRADITIONAL
        )
    );
    const [monthView, setMonthView] = React.useState(
        calendar.todayGondor.month
    );

    let gondorReckoning = gondorReckoningForYear(calendar, startDate, viewDate);

    const updateToday = !datesMatch(today, nextDate);
    if (updateToday) {
        setToday(nextDate);
        setViewDate(nextDate);
    }

    const updateStartDate = !datesMatch(startDate, nextStartDate);
    if (updateStartDate) {
        setStartDate(nextStartDate);
    }

    if (updateToday || updateStartDate) {
        const nextCalendar = makeGondorCalendarDates(
            nextDate,
            nextStartDate,
            reckoning,
            RECKONING_RULES_TRADITIONAL
        );
        setCalendar(nextCalendar);
        setMonthView(nextCalendar.todayGondor.month);

        gondorReckoning = gondorReckoningForYear(calendar, startDate, viewDate);
    }

    const updateReckoning = reckoning !== gondorReckoning;
    if (updateReckoning) {
        setReckoning(gondorReckoning);

        const nextCalendar = makeGondorCalendarDates(
            nextDate,
            nextStartDate,
            gondorReckoning,
            RECKONING_RULES_TRADITIONAL
        );
        setCalendar(nextCalendar);
        setMonthView(nextCalendar.todayGondor.month);
    }

    const onMonthViewChange = (nextViewDate, monthView, yearView) => {
        setMonthView(monthView);
        setYearView(yearView);

        if (!datesMatch(viewDate, nextViewDate)) {
            let nextCalendar = makeGondorCalendarDates(
                nextViewDate,
                startDate,
                reckoning,
                RECKONING_RULES_TRADITIONAL
            );

            gondorReckoning = gondorReckoningForYear(
                nextCalendar,
                startDate,
                nextViewDate
            );
            if (reckoning !== gondorReckoning) {
                setReckoning(gondorReckoning);
                nextCalendar = makeGondorCalendarDates(
                    nextViewDate,
                    startDate,
                    gondorReckoning,
                    RECKONING_RULES_TRADITIONAL
                );
            }

            setCalendar(nextCalendar);
            setMonthView(nextCalendar.todayGondor.month);
            setViewDate(nextViewDate);
        }
    };

    const onMonthViewLayoutChange = (event) => {
        setMonthViewLayout(event.target.value);
    };

    const onLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    let year = calendar.year;
    let age = "II";
    let reckoningDisplay = "Kings'";
    if (year > 3441) {
        year -= 3441;
        age = "III";

        if (year > 2059) {
            reckoningDisplay = "Stewards'";

            if (year > 3019 || reckoning === RECKONING_NEW) {
                reckoningDisplay = "New";

                if (year > 3020) {
                    year -= 3020;
                    age = "IV";
                }
            }
        }
    }

    const caption = `${reckoningDisplay} Reckoning ${age} ${year}`;

    const startMonth = reckoning === RECKONING_NEW ? 3 : 0;
    const months = [];
    for (let i = startMonth; i < GondorMonths.length + startMonth; i++) {
        const gondorMonth = GondorMonths[i % 12];
        months.push({
            emoji: gondorMonth.emoji,
            name: gondorMonth[language],
        });
    }

    const firstDay = getFirstDay(calendar);
    const lastDay = getLastDay(calendar);

    return (
        <table className={className}>
            <caption className="shire-caption">{caption}</caption>
            <thead>
                <tr>
                    <th className="gondor-calendar-controls">
                        <StartReckoningDatePicker
                            startDate={startDate}
                            onCalendarStartChange={onCalendarStartChange}
                        />
                    </th>
                    <th className="gondor-calendar-controls month-picker-container">
                        <MonthViewPicker
                            months={months}
                            firstDay={firstDay}
                            lastDay={lastDay}
                            thisMonth={calendar.todayGondor.month}
                            today={today}
                            viewDate={viewDate}
                            monthView={monthView}
                            yearView={yearView}
                            onMonthViewChange={onMonthViewChange}
                        />
                    </th>
                    <th className="gondor-calendar-controls">
                        <LanguagePicker
                            language={language}
                            onLanguageChange={onLanguageChange}
                        />
                    </th>
                    <th className="gondor-calendar-controls">
                        <MonthViewLayout
                            layout={monthViewLayout}
                            onMonthViewLayoutChange={onMonthViewLayoutChange}
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan="4" className="shire-calendar-wrapper-cell">
                        <GondorCalendar
                            className="shire-calendar gondor-calendar"
                            calendar={calendar}
                            date={today}
                            reckoning={reckoning}
                            language={language}
                            monthViewLayout={monthViewLayout}
                            monthView={monthView}
                            yearView={yearView}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default GondorCalendarSimulated;
