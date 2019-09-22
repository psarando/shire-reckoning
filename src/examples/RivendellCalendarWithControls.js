/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import {
    TRADITIONAL_RULES,
    REFORMED_RULES,
    RivendellMonths,
    makeRivendellCalendarDates,
} from "../RivendellReckoning";

import { fullYearDate, datesMatch, getFirstDay, getLastDay } from "../Utils";

import RivendellCalendar from "../ui/RivendellCalendar";
import "../ui/tolkien-calendars.css";

import LanguagePicker from "./controls/LanguagePicker";
import MonthViewPicker from "./controls/MonthViewPicker";
import StartDatePicker from "./controls/StartDatePicker";

class RivendellCalendarWithControls extends Component {
    constructor(props) {
        super(props);

        const calendarControls = props.calendarControls !== false;
        const language = props.language || LanguagePicker.QUENYA;
        const calendarRules =
            props.calendarRules || RivendellCalendar.TRADITIONAL_RULES;
        const startDay = props.startDay || 22;
        const startDate = props.startDate || fullYearDate(1, 2, startDay);
        const today = props.date || new Date();
        const yearView = !!props.yearView;

        const calendar = makeRivendellCalendarDates(
            today,
            startDate,
            calendarRules
        );
        const monthView = calendar.todayRivendell.month;

        this.state = {
            calendarControls,
            calendar,
            today,
            viewDate: today,
            yearView,
            monthView,
            calendarRules,
            startDate,
            language,
        };

        this.onMonthViewChange = this.onMonthViewChange.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const today = nextProps.date || this.state.today;
        const yearView = nextProps.yearView || this.state.yearView;
        const calendarRules =
            nextProps.calendarRules || this.state.calendarRules;

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
            || calendarRules !== this.state.calendarRules
        ) {
            calendar = makeRivendellCalendarDates(
                today,
                startDate,
                calendarRules
            );
        }

        const monthView = calendar.todayRivendell.month;

        this.setState({
            today,
            viewDate: today,
            calendarRules,
            calendar,
            startDate,
            yearView,
            monthView,
        });
    }

    onMonthViewChange(viewDate, monthView, yearView) {
        let calendar = this.state.calendar;

        if (!datesMatch(this.state.viewDate, viewDate)) {
            calendar = makeRivendellCalendarDates(
                viewDate,
                this.state.startDate,
                this.state.calendarRules
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

    onLanguageChange(event) {
        this.setState({ language: event.target.value });
    }

    render() {
        const {
            className,
            onCalendarStartChange,
            onCalendarRulesChange,
        } = this.props;

        const {
            calendar,
            language,
            calendarRules,
            monthView,
            startDate,
            today,
            viewDate,
            yearView,
        } = this.state;

        const firstDay = getFirstDay(calendar);
        const lastDay = getLastDay(calendar);

        const months = RivendellMonths.map(function(month) {
            return { emoji: month.emoji, name: month[language] };
        });

        return (
            <table className={className}>
                <caption className="rivendell-caption">
                    Rivendell Reckoning
                </caption>
                <thead>
                    <tr>
                        <th className="rivendell-calendar-controls">
                            <StartDatePicker
                                month="March"
                                startRange={19}
                                endRange={29}
                                startDate={startDate}
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="3" className="shire-calendar-wrapper-cell">
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
    }
}

export default RivendellCalendarWithControls;
