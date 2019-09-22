/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

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

class RivendellCalendarSimulated extends Component {
    constructor(props) {
        super(props);

        const startDate = props.startDate || fullYearDate(-589, 2, 23);
        const today = props.date || new Date();

        const calendar = makeRivendellCalendarDates(
            today,
            startDate,
            TRADITIONAL_RULES
        );

        const monthView = calendar.todayRivendell.month;

        this.state = {
            calendar,
            startDate,
            today,
            viewDate: today,
            yearView: false,
            monthView,
            monthViewLayout: MonthViewLayout.VERTICAL,
            language: LanguagePicker.QUENYA,
        };

        this.onMonthViewChange = this.onMonthViewChange.bind(this);
        this.onMonthViewLayoutChange = this.onMonthViewLayoutChange.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const today = nextProps.date || this.state.today;
        const startDate = nextProps.startDate || this.state.startDate;

        let calendar = this.state.calendar;

        if (
            !datesMatch(startDate, this.state.startDate)
            || !datesMatch(today, this.state.today)
            || !datesMatch(today, calendar.today)
        ) {
            calendar = makeRivendellCalendarDates(
                today,
                startDate,
                TRADITIONAL_RULES
            );
        }

        const monthView = calendar.todayRivendell.month;

        this.setState({
            today,
            viewDate: today,
            calendar,
            startDate,
            monthView,
        });
    }

    onMonthViewChange(viewDate, monthView, yearView) {
        let calendar = this.state.calendar;

        if (!datesMatch(this.state.viewDate, viewDate)) {
            calendar = makeRivendellCalendarDates(
                viewDate,
                this.state.startDate,
                TRADITIONAL_RULES
            );
            monthView = calendar.todayRivendell.month;
        }

        this.setState({
            calendar,
            viewDate,
            yearView,
            monthView,
        });
    }

    onMonthViewLayoutChange(event) {
        this.setState({ monthViewLayout: event.target.value });
    }

    onLanguageChange(event) {
        this.setState({ language: event.target.value });
    }

    render() {
        const { className, onCalendarStartChange } = this.props;
        const {
            calendar,
            language,
            monthView,
            monthViewLayout,
            startDate,
            today,
            viewDate,
            yearView,
        } = this.state;

        const year = calendar.year;
        const yen = Math.ceil(year / 144);
        const loa = year > 0 ? ((year - 1) % 144) + 1 : year % 144;
        const caption = `Rivendell Reckoning ${year} (yén ${yen}, loa ${loa})`;

        const months = RivendellMonths.map(function(month) {
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
                                onMonthViewChange={this.onMonthViewChange}
                            />
                        </th>
                        <th className="rivendell-calendar-controls">
                            <LanguagePicker
                                language={language}
                                onLanguageChange={this.onLanguageChange}
                            />
                        </th>
                        <th className="rivendell-calendar-controls">
                            <MonthViewLayout
                                layout={monthViewLayout}
                                onMonthViewLayoutChange={
                                    this.onMonthViewLayoutChange
                                }
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
    }
}

export default RivendellCalendarSimulated;
