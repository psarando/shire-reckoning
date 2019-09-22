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

import { fullYearDate, datesMatch } from "../Utils";

import GondorCalendar from "../ui/GondorCalendar";
import "../ui/tolkien-calendars.css";

import LanguagePicker from "./controls/LanguagePicker";
import MonthViewLayout from "./controls/MonthViewLayout";
import MonthViewPicker from "./controls/MonthViewPicker";
import StartDatePicker from "./controls/StartDatePicker";

class GondorCalendarWithControls extends Component {
    constructor(props) {
        super(props);

        let calendarControls = props.calendarControls !== false;
        let language = props.language || LanguagePicker.QUENYA;
        let calendarRules = props.calendarRules || RECKONING_RULES_GREGORIAN;
        let today = props.date || new Date();
        let monthViewLayout = props.monthViewLayout || MonthViewLayout.VERTICAL;
        let reckoning = props.reckoning || GondorCalendar.RECKONING_STEWARDS;
        let yearView = !!props.yearView;

        let startDay = props.startDay || 21;
        let startDate = props.startDate || fullYearDate(0, 11, startDay);

        let calendar = makeGondorCalendarDates(
            today,
            startDate,
            reckoning,
            calendarRules
        );
        let monthView = calendar.todayGondor.month;

        this.state = {
            calendarControls: calendarControls,
            startDate: startDate,
            calendar: calendar,
            today: today,
            viewDate: today,
            yearView: yearView,
            monthView: monthView,
            monthViewLayout: monthViewLayout,
            reckoning: reckoning,
            calendarRules: calendarRules,
            language: language,
        };

        this.onMonthViewChange = this.onMonthViewChange.bind(this);
        this.onStartMonthChange = this.onStartMonthChange.bind(this);
        this.onMonthViewLayoutChange = this.onMonthViewLayoutChange.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let today = nextProps.date || this.state.today;
        let startDate = nextProps.startDate || this.state.startDate;
        let yearView = nextProps.yearView || this.state.yearView;

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

        let monthView = calendar.todayGondor.month;

        this.setState({
            today: today,
            viewDate: today,
            calendar: calendar,
            startDate: startDate,
            yearView: yearView,
            monthView: monthView,
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
            calendar: calendar,
            viewDate: viewDate,
            yearView: yearView,
            monthView: monthView,
        });
    }

    onStartMonthChange(event) {
        let reckoning = event.target.value;
        let calendar = makeGondorCalendarDates(
            this.state.calendar.today,
            this.state.startDate,
            reckoning,
            this.state.calendarRules
        );
        let monthView = convertGondorianMonthIndex(
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

    renderCalendarControls() {
        let reckoning = this.state.reckoning;
        let startMonth = reckoning === RECKONING_NEW ? 3 : 0;
        let language = this.state.language;
        let monthNames = [];
        for (let i = startMonth; i < GondorMonths.length + startMonth; i++) {
            monthNames.push(GondorMonths[i % 12][language]);
        }

        let calendar = this.state.calendar;
        let firstDay = calendar.dates[0].gregorian;
        let lastDay = calendar.dates[calendar.dates.length - 1].gregorian;

        return (
            <tr>
                <th className="gondor-calendar-controls">
                    <StartDatePicker
                        month="December"
                        startRange={18}
                        endRange={25}
                        startDate={this.state.startDate}
                        onCalendarStartChange={this.props.onCalendarStartChange}
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
                        <option value={RECKONING_NEW}>New Reckoning</option>
                    </select>
                </th>
                <th className="gondor-calendar-controls month-picker-container">
                    <MonthViewPicker
                        monthNames={monthNames}
                        firstDay={firstDay}
                        lastDay={lastDay}
                        thisMonth={calendar.todayGondor.month}
                        today={this.state.today}
                        viewDate={this.state.viewDate}
                        monthView={this.state.monthView}
                        yearView={this.state.yearView}
                        onMonthViewChange={this.onMonthViewChange}
                    />
                </th>
                <th className="gondor-calendar-controls">
                    <LanguagePicker
                        language={this.state.language}
                        onLanguageChange={this.onLanguageChange}
                    />
                </th>
                <th className="gondor-calendar-controls">
                    <MonthViewLayout
                        layout={this.state.monthViewLayout}
                        onMonthViewLayoutChange={this.onMonthViewLayoutChange}
                    />
                </th>
            </tr>
        );
    }

    render() {
        let controls = this.state.calendarControls
            ? this.renderCalendarControls()
            : null;

        let caption = null;
        if (this.props.caption) {
            let captionDisplay = this.props.caption;
            if (this.props.caption === true) {
                switch (this.state.reckoning) {
                    case RECKONING_KINGS:
                        captionDisplay = "Kings' Reckoning";
                        break;
                    case RECKONING_STEWARDS:
                        captionDisplay = "Stewards' Reckoning";
                        break;
                    case RECKONING_NEW:
                        captionDisplay = "New Reckoning";
                        break;
                    default:
                        captionDisplay = "Gondor Reckoning";
                        break;
                }
            }

            caption = (
                <caption className="gondor-caption">{captionDisplay}</caption>
            );
        }

        return (
            <table className={this.props.className}>
                {caption}
                <thead>{controls}</thead>
                <tbody>
                    <tr>
                        <td colSpan="4" className="shire-calendar-wrapper-cell">
                            <GondorCalendar
                                className="shire-calendar gondor-calendar"
                                calendar={this.state.calendar}
                                date={this.state.today}
                                reckoning={this.state.reckoning}
                                language={this.state.language}
                                monthViewLayout={this.state.monthViewLayout}
                                monthView={this.state.monthView}
                                yearView={this.state.yearView}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default GondorCalendarWithControls;
