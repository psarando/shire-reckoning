/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    makeShireCalendarDates,
    ShireMonths,
    ShireRegionEnum,
} from "../../ShireReckoning";
import { GondorLeapYearRuleEnum } from "../../GondorReckoning";
import { datesMatch, getFirstDay, getLastDay } from "../../Utils";

import ShireCalendar from "../../ui/ShireCalendar";
import { MonthLayoutEnum } from "../../ui/controls/MonthViewLayout";
import "../../ui/tolkien-calendars.css";

import MonthViewLayout from "../controls/MonthViewLayout";
import MonthViewPicker from "../controls/MonthViewPicker";
import ShireRegionPicker from "../controls/ShireRegionPicker";

import StartReckoningDatePicker from "./StartReckoningDatePicker";

import { Grid } from "@mui/material";

interface ShireCalendarSimulatedProps {
    date: Date;
    startDate: Date;
    onCalendarStartChange: (startDate: Date) => void;
}

const ShireCalendarSimulated = (props: ShireCalendarSimulatedProps) => {
    const {
        date: nextDate,
        startDate: nextStartDate,
        onCalendarStartChange,
    } = props;

    const [yearView, setYearView] = React.useState(false);
    const [monthViewLayout, setMonthViewLayout] = React.useState(
        MonthLayoutEnum.VERTICAL
    );
    const [region, setRegion] = React.useState(ShireRegionEnum.SHIRE);
    const [today, setToday] = React.useState(nextDate);
    const [startDate, setStartDate] = React.useState(nextStartDate);

    const [calendar, setCalendar] = React.useState(() =>
        makeShireCalendarDates(
            today,
            startDate,
            GondorLeapYearRuleEnum.TRADITIONAL
        )
    );

    const viewDate = calendar.todayShire.gregorian;
    const thisMonth = calendar.todayShire.month;
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
        const nextCalendar = makeShireCalendarDates(
            nextDate,
            nextStartDate,
            GondorLeapYearRuleEnum.TRADITIONAL
        );
        setCalendar(nextCalendar);
        setMonthView(nextCalendar.todayShire.month);
    }

    const onMonthViewChange = (
        nextViewDate: Date,
        monthView: number,
        yearView: boolean
    ) => {
        setMonthView(monthView);
        setYearView(yearView);

        if (!datesMatch(viewDate, nextViewDate)) {
            const nextCalendar = makeShireCalendarDates(
                nextViewDate,
                startDate,
                GondorLeapYearRuleEnum.TRADITIONAL
            );
            setCalendar(nextCalendar);
            setMonthView(nextCalendar.todayShire.month);
        }
    };

    const onMonthViewLayoutChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setMonthViewLayout(event.target.value as MonthLayoutEnum);
    };

    const onRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRegion(event.target.value as ShireRegionEnum);
    };

    let reckoningName = "Shire";
    let reckoningYearOffset = 1600;
    if (region === ShireCalendar.REGION_NAMES_BREE) {
        reckoningName = "Bree";
        reckoningYearOffset = 1299;
    }

    const thirdAgeYear = calendar.year - 3441;

    const reckoningYear = thirdAgeYear - reckoningYearOffset;
    const caption = `${reckoningName} Reckoning ${reckoningYear}`;

    const astron6 = calendar.dates[96];
    let blotmath2 = calendar.dates[305];
    if (blotmath2.day === 1) {
        // leap-year
        blotmath2 = calendar.dates[306];
    } else if (blotmath2.day === 30) {
        // millennial leap-year
        blotmath2 = calendar.dates[307];
    }

    if (thirdAgeYear < 3020) {
        // Force these days to the month's default colors, since they are not holidays until at least S.R. 1420.
        astron6.className = ShireMonths[3].className;
        blotmath2.className = ShireMonths[10].className;
    } else {
        delete astron6.className;
        delete blotmath2.className;
    }

    const months = ShireMonths.map(function (month) {
        return { emoji: month.emoji, name: month[region] };
    });

    const firstDay = getFirstDay(calendar);
    const lastDay = getLastDay(calendar);

    return (
        <table className="shire-calendar shire-calendar-styled-example">
            <caption className="shire-caption">{caption}</caption>
            <thead>
                <tr>
                    <th className="shire-calendar-controls">
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
                            <ShireRegionPicker
                                label="Reckon with"
                                region={region}
                                onRegionChange={onRegionChange}
                            />
                            <MonthViewLayout
                                layout={monthViewLayout}
                                onMonthViewLayoutChange={
                                    onMonthViewLayoutChange
                                }
                            />
                        </Grid>
                    </th>
                    <th className="shire-calendar-controls month-picker-container">
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
                        <ShireCalendar
                            className="shire-calendar"
                            calendar={calendar}
                            date={today}
                            region={region}
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

export default ShireCalendarSimulated;
