/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    RivendellMonths,
    RivendellRulesEnum,
    makeRivendellCalendarDates,
} from "../../RivendellReckoning";
import { datesMatch, getFirstDay, getLastDay } from "../../Utils";

import RivendellCalendar from "../../ui/RivendellCalendar";
import { LanguageEnum } from "../../ui/controls/LanguagePicker";
import { MonthLayoutEnum } from "../../ui/controls/MonthViewLayout";
import "../../ui/tolkien-calendars.css";

import LanguagePicker from "../controls/LanguagePicker";
import MonthViewLayout from "../controls/MonthViewLayout";
import MonthViewPicker from "../controls/MonthViewPicker";

import "../examples.css";

import StartReckoningDatePicker from "./StartReckoningDatePicker";

import { Grid } from "@mui/material";

interface RivendellCalendarSimulatedProps {
    date: Date;
    startDate: Date;
    onCalendarStartChange: (startDate: Date) => void;
}

const RivendellCalendarSimulated = (props: RivendellCalendarSimulatedProps) => {
    const {
        date: nextDate,
        startDate: nextStartDate,
        onCalendarStartChange,
    } = props;

    const [language, setLanguage] = React.useState(LanguageEnum.QUENYA);
    const [yearView, setYearView] = React.useState(false);
    const [monthViewLayout, setMonthViewLayout] = React.useState(
        MonthLayoutEnum.VERTICAL
    );
    const [startDate, setStartDate] = React.useState(nextStartDate);
    const [today, setToday] = React.useState(nextDate);

    const [calendar, setCalendar] = React.useState(() =>
        makeRivendellCalendarDates(
            today,
            startDate,
            RivendellRulesEnum.TRADITIONAL
        )
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

    if (updateToday || updateStartDate) {
        const nextCalendar = makeRivendellCalendarDates(
            nextDate,
            nextStartDate,
            RivendellRulesEnum.TRADITIONAL
        );
        setCalendar(nextCalendar);
        setMonthView(nextCalendar.todayRivendell.month);
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
                RivendellRulesEnum.TRADITIONAL
            );
            setCalendar(nextCalendar);
            setMonthView(nextCalendar.todayRivendell.month);
        }
    };

    const onMonthViewLayoutChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setMonthViewLayout(event.target.value as MonthLayoutEnum);
    };

    const onLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as LanguageEnum);
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
    if (!yearView && monthViewLayout === MonthLayoutEnum.VERTICAL) {
        calendarClassName += " rivendell-calendar-vertical-weeks";
    }

    return (
        <table className="shire-calendar rivendell-calendar shire-calendar-styled-example">
            <caption className="rivendell-caption">{caption}</caption>
            <thead>
                <tr>
                    <th className="rivendell-calendar-controls">
                        <StartReckoningDatePicker
                            startDate={startDate}
                            onCalendarStartChange={onCalendarStartChange}
                        />
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-end"
                            wrap="nowrap"
                        >
                            <LanguagePicker
                                language={language}
                                onLanguageChange={onLanguageChange}
                            />
                            <MonthViewLayout
                                layout={monthViewLayout}
                                onMonthViewLayoutChange={
                                    onMonthViewLayoutChange
                                }
                            />
                        </Grid>
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
