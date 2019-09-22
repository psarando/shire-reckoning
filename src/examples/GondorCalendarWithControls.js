/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import {
    RECKONING_KINGS,
    RECKONING_STEWARDS,
    RECKONING_NEW,
    RECKONING_RULES_GREGORIAN,
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
import StartDatePicker from "./controls/StartDatePicker";

class GondorCalendarWithControls extends Component {
    constructor(props) {
        super(props);

        const language = props.language || LanguagePicker.QUENYA;
        const calendarRules = props.calendarRules || RECKONING_RULES_GREGORIAN;
        const today = props.date || new Date();
        const monthViewLayout =
            props.monthViewLayout || MonthViewLayout.VERTICAL;
        const reckoning = props.reckoning || GondorCalendar.RECKONING_STEWARDS;
        const yearView = !!props.yearView;

        const startDay = props.startDay || 21;
        const startDate = props.startDate || fullYearDate(0, 11, startDay);

        const calendar = makeGondorCalendarDates(
            today,
            startDate,
            reckoning,
            calendarRules
        );
        const monthView = calendar.todayGondor.month;

        this.state = {
            startDate,
            calendar,
            today,
            viewDate: today,
            yearView,
            monthView,
            monthViewLayout,
            reckoning,
            calendarRules,
            language,
        };

        this.onMonthViewChange = this.onMonthViewChange.bind(this);
        this.onStartMonthChange = this.onStartMonthChange.bind(this);
        this.onMonthViewLayoutChange = this.onMonthViewLayoutChange.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const today = nextProps.date || this.state.today;
        const yearView = nextProps.yearView || this.state.yearView;

        let startDate = nextProps.startDate || this.state.startDate;
        let calendar = this.state.calendar;

        if (nextProps.startDay && !nextProps.startDate) {
            startDate = new Date(startDate);
            startDate.setDate(nextProps.startDay);
        }

        if (
            !datesMatch(startDate, this.state.startDate)
            || !datesMatch(today, this.state.today)
            || !datesMatch(today, calendar.today)
        ) {
            calendar = makeGondorCalendarDates(
                today,
                startDate,
                this.state.reckoning,
                this.state.calendarRules
            );
        }

        const monthView = calendar.todayGondor.month;

        this.setState({
            today,
            viewDate: today,
            calendar,
            startDate,
            yearView,
            monthView,
        });
    }

    onMonthViewChange(viewDate, monthView, yearView) {
        let calendar = this.state.calendar;

        if (!datesMatch(this.state.viewDate, viewDate)) {
            calendar = makeGondorCalendarDates(
                viewDate,
                this.state.startDate,
                this.state.reckoning,
                this.state.calendarRules
            );
            monthView = calendar.todayGondor.month;
        }

        this.setState({
            calendar,
            viewDate,
            yearView,
            monthView,
        });
    }

    onStartMonthChange(event) {
        const reckoning = event.target.value;
        const calendar = makeGondorCalendarDates(
            this.state.calendar.today,
            this.state.startDate,
            reckoning,
            this.state.calendarRules
        );
        const monthView = convertGondorianMonthIndex(
            this.state.reckoning,
            reckoning,
            this.state.monthView
        );

        this.setState({
            calendar: calendar,
            monthView: this.state.monthView < 0 ? -1 : monthView,
            reckoning: reckoning,
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
            reckoning,
            monthView,
            monthViewLayout,
            startDate,
            today,
            viewDate,
            yearView,
        } = this.state;

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
                            <StartDatePicker
                                month="December"
                                startRange={18}
                                endRange={25}
                                startDate={startDate}
                                onCalendarStartChange={onCalendarStartChange}
                            />
                            <select
                                className="gondor-rules-select"
                                value={reckoning}
                                onChange={this.onStartMonthChange}
                            >
                                <option value={RECKONING_KINGS}>
                                    Kings' Reckoning
                                </option>
                                <option value={RECKONING_STEWARDS}>
                                    Stewards' Reckoning
                                </option>
                                <option value={RECKONING_NEW}>
                                    New Reckoning
                                </option>
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
                                onMonthViewChange={this.onMonthViewChange}
                            />
                        </th>
                        <th className="gondor-calendar-controls">
                            <LanguagePicker
                                language={language}
                                onLanguageChange={this.onLanguageChange}
                            />
                        </th>
                        <th className="gondor-calendar-controls">
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
    }
}

export default GondorCalendarWithControls;
