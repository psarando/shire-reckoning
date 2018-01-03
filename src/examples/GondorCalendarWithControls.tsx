/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { MenuItem } from "@mui/material";

import {
    GondorMonths,
    GondorReckoningEnum,
    convertGondorianMonthIndex,
    makeGondorCalendarDates,
} from "../GondorReckoning";

import { datesMatch, getFirstDay, getLastDay } from "../Utils";

import GondorCalendar, { defaultCaption } from "../ui/GondorCalendar";
import { LanguageEnum } from "../ui/controls/LanguagePicker";
import { MonthLayoutEnum } from "../ui/controls/MonthViewLayout";
import "../ui/tolkien-calendars.css";

import { OutlinedSelect } from "./Common";
import LanguagePicker from "./controls/LanguagePicker";
import MonthViewLayout from "./controls/MonthViewLayout";
import MonthViewPicker from "./controls/MonthViewPicker";
import { ShireStartDatePicker } from "./controls/StartDatePicker";
import { scriptFontFamily } from "./theme";

import { Grid } from "@mui/material";

interface GondorCalendarWithControlsProps {
    className: string;
    language?: LanguageEnum;
    monthViewLayout?: MonthLayoutEnum;
    reckoning?: GondorReckoningEnum;
    date: Date;
    startDate: Date;
    onCalendarStartChange: (startDate: Date) => void;
}

const GondorCalendarWithControls = (props: GondorCalendarWithControlsProps) => {
    const {
        className,
        date: nextDate,
        startDate: nextStartDate,
        onCalendarStartChange,
    } = props;

    const [language, setLanguage] = React.useState(
        props.language || LanguageEnum.QUENYA
    );
    const [monthViewLayout, setMonthViewLayout] = React.useState(
        props.monthViewLayout || MonthLayoutEnum.VERTICAL
    );
    const [yearView, setYearView] = React.useState(false);
    const [today, setToday] = React.useState(nextDate);
    const [startDate, setStartDate] = React.useState(nextStartDate);

    const [reckoning, setReckoning] = React.useState(
        props.reckoning || GondorReckoningEnum.STEWARDS
    );

    const [calendar, setCalendar] = React.useState(() =>
        makeGondorCalendarDates(today, startDate, reckoning)
    );

    const viewDate = calendar.todayGondor.gregorian;
    const thisMonth = calendar.todayGondor.month;
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
        const nextCalendar = makeGondorCalendarDates(
            nextDate,
            nextStartDate,
            reckoning
        );
        setCalendar(nextCalendar);
        setMonthView(nextCalendar.todayGondor.month);
    }

    const onMonthViewChange = (
        nextViewDate: Date,
        monthView: number,
        yearView: boolean
    ) => {
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
        }
    };

    const onStartMonthChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const nextReckoning = event.target.value as GondorReckoningEnum;
        const convertedMonthView = convertGondorianMonthIndex(
            reckoning,
            nextReckoning,
            monthView
        );

        setReckoning(nextReckoning);
        setMonthView(convertedMonthView);
        setCalendar(
            makeGondorCalendarDates(viewDate, startDate, nextReckoning)
        );
    };

    const onMonthViewLayoutChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setMonthViewLayout(event.target.value as MonthLayoutEnum);
    };

    const onLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as LanguageEnum);
    };

    const firstDay = getFirstDay(calendar);
    const lastDay = getLastDay(calendar);

    const startMonth = reckoning === GondorReckoningEnum.NEW ? 3 : 0;
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
                        <OutlinedSelect
                            className="gondor-rules-select"
                            style={{
                                width: "9.75rem",
                                margin: "0.25rem 0",
                            }}
                            SelectProps={{
                                SelectDisplayProps: {
                                    style: {
                                        fontSize: "0.72rem",
                                        fontWeight: "normal",
                                        fontFamily: scriptFontFamily,
                                    },
                                },
                            }}
                            value={reckoning}
                            onChange={onStartMonthChange}
                        >
                            <MenuItem value={GondorReckoningEnum.KINGS}>
                                Kings' Reckoning
                            </MenuItem>
                            <MenuItem value={GondorReckoningEnum.STEWARDS}>
                                Stewards' Reckoning
                            </MenuItem>
                            <MenuItem value={GondorReckoningEnum.NEW}>
                                New Reckoning
                            </MenuItem>
                        </OutlinedSelect>
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
                    <th className="gondor-calendar-controls month-picker-container">
                        <MonthViewPicker
                            months={months}
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
