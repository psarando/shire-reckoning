/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    TRADITIONAL_RULES,
    RivendellMonths,
    makeRivendellCalendarDates,
} from "../../RivendellReckoning";
import { datesMatch, fullYearDate, getFirstDay, getLastDay } from "../../Utils";

import RivendellCalendar from "../../ui/RivendellCalendar";
import "../../ui/tolkien-calendars.css";

import LanguagePicker from "../controls/LanguagePicker";
import MonthViewLayout from "../controls/MonthViewLayout";
import MonthViewPicker from "../controls/MonthViewPicker";

import "../examples.css";

import StartReckoningDatePicker from "./StartReckoningDatePicker";

const defaultStartDate = fullYearDate(-589, 2, 23);

const RivendellCalendarSimulated = (props) => {
    const { className, onCalendarStartChange } = props;

    const [language, setLanguage] = React.useState(LanguagePicker.QUENYA);
    const [yearView, setYearView] = React.useState(false);
    const [monthViewLayout, setMonthViewLayout] = React.useState(
        MonthViewLayout.VERTICAL
    );

    const nextStartDate = props.startDate || defaultStartDate;
    const [startDate, setStartDate] = React.useState(nextStartDate);
    const nextDate = props.date || new Date();
    const [today, setToday] = React.useState(nextDate);
    const [viewDate, setViewDate] = React.useState(today);

    const [calendar, setCalendar] = React.useState(() =>
        makeRivendellCalendarDates(today, startDate, TRADITIONAL_RULES)
    );
    const [monthView, setMonthView] = React.useState(
        calendar.todayRivendell.month
    );

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
        const nextCalendar = makeRivendellCalendarDates(
            nextDate,
            nextStartDate,
            TRADITIONAL_RULES
        );
        setCalendar(nextCalendar);
        setMonthView(nextCalendar.todayRivendell.month);
    }

    const onMonthViewChange = (nextViewDate, monthView, yearView) => {
        setMonthView(monthView);
        setYearView(yearView);

        if (!datesMatch(viewDate, nextViewDate)) {
            const nextCalendar = makeRivendellCalendarDates(
                nextViewDate,
                startDate,
                TRADITIONAL_RULES
            );
            setCalendar(nextCalendar);
            setMonthView(nextCalendar.todayRivendell.month);
            setViewDate(nextViewDate);
        }
    };

    const onMonthViewLayoutChange = (event) => {
        setMonthViewLayout(event.target.value);
    };

    const onLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const year = calendar.year;
    const yen = Math.ceil(year / 144);
    const loa = year > 0 ? ((year - 1) % 144) + 1 : year % 144;
    const caption = `Rivendell Reckoning ${year} (yén ${yen}, loa ${loa})`;

    const months = RivendellMonths.map(function (month) {
        return { emoji: month.emoji, name: month[language] };
    });

    const firstDay = getFirstDay(calendar);
    const lastDay = getLastDay(calendar);

    let calendarClassName = "shire-calendar rivendell-calendar";
    if (!yearView && monthViewLayout === MonthViewLayout.VERTICAL) {
        calendarClassName += " rivendell-calendar-vertical-weeks";
    }

    return (
        <table className={className}>
            <caption className="rivendell-caption">{caption}</caption>
            <thead>
                <tr>
                    <th className="rivendell-calendar-controls">
                        <StartReckoningDatePicker
                            startDate={startDate}
                            onCalendarStartChange={onCalendarStartChange}
                        />
                    </th>
                    <th className="rivendell-calendar-controls month-picker-container">
                        <MonthViewPicker
                            months={months}
                            monthLabel="Season"
                            firstDay={firstDay}
                            lastDay={lastDay}
                            thisMonth={calendar.todayRivendell.month}
                            today={today}
                            viewDate={viewDate}
                            monthView={monthView}
                            yearView={yearView}
                            onMonthViewChange={onMonthViewChange}
                        />
                    </th>
                    <th className="rivendell-calendar-controls">
                        <LanguagePicker
                            language={language}
                            onLanguageChange={onLanguageChange}
                        />
                    </th>
                    <th className="rivendell-calendar-controls">
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
                        <RivendellCalendar
                            className={calendarClassName}
                            calendar={calendar}
                            date={today}
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

export default RivendellCalendarSimulated;
