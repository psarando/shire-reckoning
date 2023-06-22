/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    RECKONING_KINGS,
    RECKONING_STEWARDS,
    RECKONING_NEW,
    GondorMonths,
    convertGondorianMonthIndex,
    makeGondorCalendarDates,
} from "../GondorReckoning";

import { fullYearDate, datesMatch, getFirstDay, getLastDay } from "../Utils";

import GondorCalendar, { defaultCaption } from "../ui/GondorCalendar";
import "../ui/tolkien-calendars.css";

import LanguagePicker from "./controls/LanguagePicker";
import MonthViewLayout from "./controls/MonthViewLayout";
import MonthViewPicker from "./controls/MonthViewPicker";
import { ShireStartDatePicker } from "./controls/StartDatePicker";

const defaultStartDate = fullYearDate(0, 11, 21);

const GondorCalendarWithControls = (props) => {
    const { className, onCalendarStartChange } = props;

    const [language, setLanguage] = React.useState(
        props.language || LanguagePicker.QUENYA
    );
    const [monthViewLayout, setMonthViewLayout] = React.useState(
        props.monthViewLayout || MonthViewLayout.VERTICAL
    );
    const [yearView, setYearView] = React.useState(false);

    const nextDate = props.date || new Date();
    const [today, setToday] = React.useState(nextDate);
    const [viewDate, setViewDate] = React.useState(today);

    const nextStartDate = props.startDate || defaultStartDate;
    const [startDate, setStartDate] = React.useState(nextStartDate);

    const [reckoning, setReckoning] = React.useState(
        props.reckoning || GondorCalendar.RECKONING_STEWARDS
    );

    const [calendar, setCalendar] = React.useState(() =>
        makeGondorCalendarDates(today, startDate, reckoning)
    );
    const [monthView, setMonthView] = React.useState(
        calendar.todayGondor.month
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
        const nextCalendar = makeGondorCalendarDates(
            nextDate,
            nextStartDate,
            reckoning
        );
        setCalendar(nextCalendar);
        setMonthView(nextCalendar.todayGondor.month);
    }

    const onMonthViewChange = (nextViewDate, monthView, yearView) => {
        setMonthView(monthView);
        setYearView(yearView);

        if (!datesMatch(viewDate, nextViewDate)) {
            const nextCalendar = makeGondorCalendarDates(
                nextViewDate,
                startDate,
                reckoning
            );
            setCalendar(nextCalendar);
            setMonthView(nextCalendar.todayGondor.month);
            setViewDate(nextViewDate);
        }
    };

    const onStartMonthChange = (event) => {
        const nextReckoning = event.target.value;
        const convertedMonthView = convertGondorianMonthIndex(
            reckoning,
            nextReckoning,
            monthView
        );

        setReckoning(nextReckoning);
        setMonthView(monthView < 0 ? -1 : convertedMonthView);
        setCalendar(
            makeGondorCalendarDates(viewDate, startDate, nextReckoning)
        );
    };

    const onMonthViewLayoutChange = (event) => {
        setMonthViewLayout(event.target.value);
    };

    const onLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const firstDay = getFirstDay(calendar);
    const lastDay = getLastDay(calendar);

    const startMonth = reckoning === RECKONING_NEW ? 3 : 0;
    const months = [];
    for (let i = startMonth; i < GondorMonths.length + startMonth; i++) {
        const gondorMonth = GondorMonths[i % 12];
        months.push({
            emoji: gondorMonth.emoji,
            name: gondorMonth[language],
        });
    }

    return (
        <table className={className}>
            <caption className="gondor-caption">
                {defaultCaption(reckoning)}
            </caption>
            <thead>
                <tr>
                    <th className="gondor-calendar-controls">
                        <ShireStartDatePicker
                            selectedDate={startDate}
                            onCalendarStartChange={onCalendarStartChange}
                        />
                        <select
                            className="gondor-rules-select"
                            value={reckoning}
                            onChange={onStartMonthChange}
                        >
                            <option value={RECKONING_KINGS}>
                                Kings' Reckoning
                            </option>
                            <option value={RECKONING_STEWARDS}>
                                Stewards' Reckoning
                            </option>
                            <option value={RECKONING_NEW}>New Reckoning</option>
                        </select>
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

export default GondorCalendarWithControls;
