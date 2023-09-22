/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    TRADITIONAL_RULES,
    REFORMED_RULES,
    RivendellMonths,
    RivendellRulesEnum,
    makeRivendellCalendarDates,
} from "../RivendellReckoning";

import { fullYearDate, datesMatch, getFirstDay, getLastDay } from "../Utils";

import RivendellCalendar from "../ui/RivendellCalendar";
import { LanguageEnum } from "../ui/controls/LanguagePicker";
import "../ui/tolkien-calendars.css";

import LanguagePicker from "./controls/LanguagePicker";
import MonthViewPicker from "./controls/MonthViewPicker";
import { RivendellStartDatePicker } from "./controls/StartDatePicker";

interface RivendellCalendarWithControlsProps {
    className: string;
    yearView: boolean;
    date: Date;
    startDate: Date;
    calendarRules: RivendellRulesEnum;
    onCalendarStartChange: (startDate: Date) => void;
    onCalendarRulesChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const defaultStartDate = fullYearDate(1, 2, 22);

const RivendellCalendarWithControls = (
    props: RivendellCalendarWithControlsProps
) => {
    const { className, onCalendarStartChange, onCalendarRulesChange } = props;

    const [language, setLanguage] = React.useState(LanguageEnum.QUENYA);

    const nextYearView = !!props.yearView;
    const [propsYearView, setPropsYearView] = React.useState(nextYearView);
    const [yearView, setYearView] = React.useState(nextYearView);

    const nextDate = props.date || new Date();
    const [today, setToday] = React.useState(nextDate);
    const [viewDate, setViewDate] = React.useState(today);

    const nextStartDate = props.startDate || defaultStartDate;
    const [startDate, setStartDate] = React.useState(nextStartDate);

    const nextRules = props.calendarRules || RivendellRulesEnum.TRADITIONAL;
    const [calendarRules, setCalendarRules] = React.useState(nextRules);

    const [calendar, setCalendar] = React.useState(() =>
        makeRivendellCalendarDates(today, startDate, calendarRules)
    );

    const thisMonth = calendar.todayRivendell.month;
    const [monthView, setMonthView] = React.useState(thisMonth);

    const updateToday = !datesMatch(today, nextDate);
    if (updateToday) {
        setToday(nextDate);
        setViewDate(nextDate);
    }

    const updateStartDate = !datesMatch(startDate, nextStartDate);
    if (updateStartDate) {
        setStartDate(nextStartDate);
    }

    const updateRules = calendarRules !== nextRules;
    if (updateRules) {
        setCalendarRules(nextRules);
    }

    if (updateToday || updateStartDate || updateRules) {
        const nextCalendar = makeRivendellCalendarDates(
            nextDate,
            nextStartDate,
            nextRules
        );
        setCalendar(nextCalendar);
        setMonthView(nextCalendar.todayRivendell.month);
    }

    // If yearView from props changes, or is on, it should override this state.
    if (propsYearView !== nextYearView || (propsYearView && !yearView)) {
        setPropsYearView(nextYearView);
        setYearView(nextYearView);
    }

    const onMonthViewChange = (
        nextViewDate: Date,
        monthView: number,
        yearView: boolean
    ) => {
        setMonthView(monthView);
        setYearView(yearView);

        if (!datesMatch(viewDate, nextViewDate)) {
            const nextCalendar = makeRivendellCalendarDates(
                nextViewDate,
                startDate,
                calendarRules
            );
            setCalendar(nextCalendar);
            setMonthView(nextCalendar.todayRivendell.month);
            setViewDate(nextViewDate);
        }
    };

    const onLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as LanguageEnum);
    };

    const firstDay = getFirstDay(calendar);
    const lastDay = getLastDay(calendar);

    const months = RivendellMonths.map(function (month) {
        return { emoji: month.emoji, name: month[language] };
    });

    return (
        <table className={className}>
            <caption className="rivendell-caption">Rivendell Reckoning</caption>
            <thead>
                <tr>
                    <th className="rivendell-calendar-controls">
                        <RivendellStartDatePicker
                            selectedDate={startDate}
                            onCalendarStartChange={onCalendarStartChange}
                        />
                        <select
                            className="rivendell-rules-select"
                            value={calendarRules}
                            onChange={onCalendarRulesChange}
                        >
                            <option value={TRADITIONAL_RULES}>
                                Traditional Rules
                            </option>
                            <option value={REFORMED_RULES}>
                                Reformed Rules
                            </option>
                        </select>
                    </th>
                    <th className="rivendell-calendar-controls month-picker-container">
                        <MonthViewPicker
                            months={months}
                            monthLabel="Season"
                            firstDay={firstDay}
                            lastDay={lastDay}
                            thisMonth={thisMonth}
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
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={3} className="shire-calendar-wrapper-cell">
                        <RivendellCalendar
                            className="shire-calendar rivendell-calendar"
                            calendar={calendar}
                            date={today}
                            language={language}
                            monthView={monthView}
                            yearView={yearView}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default RivendellCalendarWithControls;
