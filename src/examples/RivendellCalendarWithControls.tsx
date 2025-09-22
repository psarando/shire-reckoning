/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { MenuItem } from "@mui/material";

import {
    RivendellMonths,
    RivendellRulesEnum,
    makeRivendellCalendarDates,
} from "../RivendellReckoning";

import { datesMatch, getFirstDay, getLastDay } from "../Utils";

import RivendellCalendar from "../ui/RivendellCalendar";
import { LanguageEnum } from "../ui/controls/LanguagePicker";
import "../ui/tolkien-calendars.css";

import { OutlinedSelect } from "./Common";
import LanguagePicker from "./controls/LanguagePicker";
import MonthViewPicker from "./controls/MonthViewPicker";
import { RivendellStartDatePicker } from "./controls/StartDatePicker";

interface RivendellCalendarWithControlsProps {
    yearView: boolean;
    date: Date;
    startDate: Date;
    calendarRules: RivendellRulesEnum;
    onCalendarStartChange: (startDate: Date) => void;
    onCalendarRulesChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const RivendellCalendarWithControls = (
    props: RivendellCalendarWithControlsProps
) => {
    const {
        yearView: nextYearView,
        date: nextDate,
        startDate: nextStartDate,
        onCalendarStartChange,
        onCalendarRulesChange,
    } = props;

    const [language, setLanguage] = React.useState(LanguageEnum.QUENYA);
    const [propsYearView, setPropsYearView] = React.useState(nextYearView);
    const [yearView, setYearView] = React.useState(nextYearView);
    const [today, setToday] = React.useState(nextDate);
    const [startDate, setStartDate] = React.useState(nextStartDate);

    const nextRules = props.calendarRules || RivendellRulesEnum.TRADITIONAL;
    const [calendarRules, setCalendarRules] = React.useState(nextRules);

    const [calendar, setCalendar] = React.useState(() =>
        makeRivendellCalendarDates(today, startDate, calendarRules)
    );

    const viewDate = calendar.todayRivendell.gregorian;
    const thisMonth = calendar.todayRivendell.month;
    const [monthView, setMonthView] = React.useState(thisMonth);

    // Check object equality so views are updated anytime `Today` is clicked.
    const updateToday = today !== nextDate;
    if (updateToday) {
        setToday(nextDate);
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
        <table className="shire-calendar rivendell-calendar shire-calendar-styled-example">
            <caption className="rivendell-caption">Rivendell Reckoning</caption>
            <thead>
                <tr>
                    <th className="rivendell-calendar-controls">
                        <RivendellStartDatePicker
                            selectedDate={startDate}
                            onCalendarStartChange={onCalendarStartChange}
                        />
                        <OutlinedSelect
                            className="rivendell-rules-select"
                            style={{
                                width: "9.75rem",
                                margin: "0.25rem 0",
                            }}
                            SelectProps={{
                                SelectDisplayProps: {
                                    style: { fontSize: "0.72rem" },
                                },
                            }}
                            value={calendarRules}
                            onChange={onCalendarRulesChange}
                        >
                            <MenuItem value={RivendellRulesEnum.TRADITIONAL}>
                                Traditional Rules
                            </MenuItem>
                            <MenuItem value={RivendellRulesEnum.REFORMED}>
                                Reformed Rules
                            </MenuItem>
                        </OutlinedSelect>
                        <LanguagePicker
                            language={language}
                            onLanguageChange={onLanguageChange}
                        />
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
