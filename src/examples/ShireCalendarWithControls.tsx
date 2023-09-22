/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    ShireMonths,
    ShireRegionEnum,
    makeShireCalendarDates,
} from "../ShireReckoning";
import { fullYearDate, datesMatch, getFirstDay, getLastDay } from "../Utils";

import ShireCalendar from "../ui/ShireCalendar";
import { MonthLayoutEnum } from "../ui/controls/MonthViewLayout";
import "../ui/tolkien-calendars.css";

import MonthViewLayout from "./controls/MonthViewLayout";
import MonthViewPicker from "./controls/MonthViewPicker";
import ShireRegionPicker from "./controls/ShireRegionPicker";
import { ShireStartDatePicker } from "./controls/StartDatePicker";

interface ShireCalendarWithControlsProps {
    className: string;
    region: ShireRegionEnum;
    monthViewLayout: MonthLayoutEnum;
    yearView: boolean;
    date: Date;
    startDate: Date;
    onCalendarStartChange: (startDate: Date) => void;
    onRegionChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const defaultStartDate = fullYearDate(0, 11, 21);

const ShireCalendarWithControls = (props: ShireCalendarWithControlsProps) => {
    const { className, region, onCalendarStartChange, onRegionChange } = props;

    const [monthViewLayout, setMonthViewLayout] = React.useState(
        props.monthViewLayout || MonthLayoutEnum.VERTICAL
    );

    const nextYearView = !!props.yearView;
    const [propsYearView, setPropsYearView] = React.useState(nextYearView);
    const [yearView, setYearView] = React.useState(nextYearView);

    const nextDate = props.date || new Date();
    const [today, setToday] = React.useState(nextDate);
    const [viewDate, setViewDate] = React.useState(today);

    const nextStartDate = props.startDate || defaultStartDate;
    const [startDate, setStartDate] = React.useState(nextStartDate);

    const [calendar, setCalendar] = React.useState(() =>
        makeShireCalendarDates(today, startDate)
    );

    const thisMonth = calendar.todayShire?.month || 0;
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

    if (updateToday || updateStartDate) {
        const nextCalendar = makeShireCalendarDates(nextDate, nextStartDate);
        setCalendar(nextCalendar);
        setMonthView(nextCalendar.todayShire?.month || 0);
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
            const nextCalendar = makeShireCalendarDates(
                nextViewDate,
                startDate
            );
            setCalendar(nextCalendar);
            setMonthView(nextCalendar.todayShire?.month || 0);
            setViewDate(nextViewDate);
        }
    };

    const onMonthViewLayoutChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setMonthViewLayout(event.target.value as MonthLayoutEnum);
    };

    const firstDay = getFirstDay(calendar);
    const lastDay = getLastDay(calendar);

    const months = ShireMonths.map(function (month) {
        return { emoji: month.emoji, name: month[region] };
    });

    return (
        <table className={className}>
            <caption className="shire-caption">Shire Reckoning</caption>
            <thead>
                <tr>
                    <th className="shire-calendar-controls">
                        <ShireStartDatePicker
                            selectedDate={startDate}
                            onCalendarStartChange={onCalendarStartChange}
                        />
                        <ShireRegionPicker
                            region={region}
                            onRegionChange={onRegionChange}
                        />
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

export default ShireCalendarWithControls;
