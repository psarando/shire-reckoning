/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { makeShireCalendarDates, ShireMonths } from "../../ShireReckoning";
import { GondorLeapYearRuleEnum } from "../../GondorReckoning";
import { datesMatch, fullYearDate, getFirstDay, getLastDay } from "../../Utils";

import ShireCalendar from "../../ui/ShireCalendar";
import "../../ui/tolkien-calendars.css";

import MonthViewLayout from "../controls/MonthViewLayout";
import MonthViewPicker from "../controls/MonthViewPicker";
import ShireRegionPicker from "../controls/ShireRegionPicker";

import StartReckoningDatePicker from "./StartReckoningDatePicker";

const defaultStartDate = fullYearDate(0, 11, 23);

const ShireCalendarSimulated = (props) => {
    const { className, onCalendarStartChange } = props;

    const [yearView, setYearView] = React.useState(false);
    const [monthViewLayout, setMonthViewLayout] = React.useState(
        MonthViewLayout.VERTICAL
    );
    const [region, setRegion] = React.useState(
        ShireCalendar.REGION_NAMES_SHIRE
    );

    const nextDate = props.date || new Date();
    const [today, setToday] = React.useState(nextDate);
    const [viewDate, setViewDate] = React.useState(today);

    const nextStartDate = props.startDate || defaultStartDate;
    const [startDate, setStartDate] = React.useState(nextStartDate);

    const [calendar, setCalendar] = React.useState(() =>
        makeShireCalendarDates(
            today,
            startDate,
            GondorLeapYearRuleEnum.TRADITIONAL
        )
    );
    const [monthView, setMonthView] = React.useState(calendar.todayShire.month);

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
        const nextCalendar = makeShireCalendarDates(
            nextDate,
            nextStartDate,
            GondorLeapYearRuleEnum.TRADITIONAL
        );
        setCalendar(nextCalendar);
        setMonthView(nextCalendar.todayShire.month);
    }

    const onMonthViewChange = (nextViewDate, monthView, yearView) => {
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
            setViewDate(nextViewDate);
        }
    };

    const onMonthViewLayoutChange = (event) => {
        setMonthViewLayout(event.target.value);
    };

    const onRegionChange = (event) => {
        setRegion(event.target.value);
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
        <table className={className}>
            <caption className="shire-caption">{caption}</caption>
            <thead>
                <tr>
                    <th className="shire-calendar-controls">
                        <StartReckoningDatePicker
                            startDate={startDate}
                            onCalendarStartChange={onCalendarStartChange}
                        />
                    </th>
                    <th className="shire-calendar-controls month-picker-container">
                        <MonthViewPicker
                            months={months}
                            firstDay={firstDay}
                            lastDay={lastDay}
                            thisMonth={calendar.todayShire.month}
                            today={today}
                            viewDate={viewDate}
                            monthView={monthView}
                            yearView={yearView}
                            onMonthViewChange={onMonthViewChange}
                        />
                    </th>
                    <th className="shire-calendar-controls">
                        Reckon with:
                        <br />
                        <ShireRegionPicker
                            region={region}
                            onRegionChange={onRegionChange}
                        />
                    </th>
                    <th className="shire-calendar-controls">
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
