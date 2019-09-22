/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import { ShireMonths, makeShireCalendarDates } from "../ShireReckoning";
import { RECKONING_RULES_GREGORIAN } from "../GondorReckoning";
import { fullYearDate, datesMatch, getFirstDay, getLastDay } from "../Utils";

import ShireCalendar from "../ui/ShireCalendar";
import "../ui/tolkien-calendars.css";

import MonthViewLayout from "./controls/MonthViewLayout";
import MonthViewPicker from "./controls/MonthViewPicker";
import ShireRegionPicker from "./controls/ShireRegionPicker";
import StartDatePicker from "./controls/StartDatePicker";

class ShireCalendarWithControls extends Component {
    constructor(props) {
        super(props);

        const today = props.date || new Date();
        const monthViewLayout =
            props.monthViewLayout || MonthViewLayout.VERTICAL;
        const region = props.region || ShireCalendar.REGION_NAMES_SHIRE;
        const calendarRules = props.calendarRules || RECKONING_RULES_GREGORIAN;
        const yearView = !!props.yearView;

        const startDay = props.startDay || 21;
        const startDate = props.startDate || fullYearDate(0, 11, startDay);

        const calendar = makeShireCalendarDates(
            today,
            startDate,
            calendarRules
        );
        const monthView = calendar.todayShire.month;

        this.state = {
            calendarRules,
            startDate,
            today,
            viewDate: today,
            calendar,
            yearView,
            monthView,
            monthViewLayout,
            region,
        };

        this.onMonthViewChange = this.onMonthViewChange.bind(this);
        this.onMonthViewLayoutChange = this.onMonthViewLayoutChange.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
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
            calendar = makeShireCalendarDates(
                today,
                startDate,
                this.state.calendarRules
            );
        }

        const monthView = calendar.todayShire.month;

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
            calendar = makeShireCalendarDates(
                viewDate,
                this.state.startDate,
                this.state.calendarRules
            );
            monthView = calendar.todayShire.month;
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

    onRegionChange(event) {
        this.setState({ region: event.target.value });
    }

    render() {
        const { className, onCalendarStartChange } = this.props;
        const {
            calendar,
            region,
            monthView,
            monthViewLayout,
            startDate,
            today,
            viewDate,
            yearView,
        } = this.state;

        const firstDay = getFirstDay(calendar);
        const lastDay = getLastDay(calendar);

        const months = ShireMonths.map(function(month) {
            return { emoji: month.emoji, name: month[region] };
        });

        return (
            <table className={className}>
                <caption className="shire-caption">Shire Reckoning</caption>
                <thead>
                    <tr>
                        <th className="shire-calendar-controls">
                            <StartDatePicker
                                month="December"
                                startRange={19}
                                endRange={25}
                                startDate={startDate}
                                onCalendarStartChange={onCalendarStartChange}
                            />
                            <ShireRegionPicker
                                region={region}
                                onRegionChange={this.onRegionChange}
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
                                onMonthViewChange={this.onMonthViewChange}
                            />
                        </th>
                        <th className="shire-calendar-controls">
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
                        <td colSpan="3" className="shire-calendar-wrapper-cell">
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
    }
}

export default ShireCalendarWithControls;
