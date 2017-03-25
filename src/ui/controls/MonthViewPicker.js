/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';
import { datesMatch } from '../../Utils';
import '../tolkien-calendars.css';

class MonthViewPicker extends Component {
    constructor(props) {
        super(props);

        this.onMonthViewChange = this.onMonthViewChange.bind(this);
        this.onViewThisYear = this.onViewThisYear.bind(this);
        this.onViewThisMonth = this.onViewThisMonth.bind(this);
        this.prevMonthView = this.prevMonthView.bind(this);
        this.nextMonthView = this.nextMonthView.bind(this);
    }

    onMonthViewChange(event) {
        this.props.onMonthViewChange(this.props.calendar, parseInt(event.target.value, 10));
    }

    onViewThisYear(event) {
        var today = this.props.today;
        var calendar = this.props.calendar;
        if (!datesMatch(today, calendar.today)) {
            calendar = this.props.makeCalendarDates(today, this.props.startDate);
        }

        this.props.onMonthViewChange(calendar, -1);
    }

    onViewThisMonth(event) {
        var today = this.props.today;
        var calendar = this.props.calendar;
        if (!datesMatch(today, calendar.today)) {
            calendar = this.props.makeCalendarDates(today, this.props.startDate);
        }

        this.props.onViewCalendarMonth(calendar);
    }

    prevMonthView() {
        var month = this.props.monthView;
        var yearView = (month === -1);
        var calendar = this.props.calendar;

        if (!yearView) {
            month--;
        }

        if (month < 0) {
            month = yearView ? month : this.props.monthNames.length - 1;

            // View the calendar for the previous year
            var viewDate = calendar.dates[0].gregorian;
            // add a buffer to the view date so the month doesn't change when startDate changes
            viewDate.setDate(viewDate.getDate() - 15);

            calendar = this.props.makeCalendarDates(viewDate, this.props.startDate);
        }

        this.props.onMonthViewChange(calendar, month);
    }

    nextMonthView() {
        var month = this.props.monthView;
        var yearView = (month === -1);
        var calendar = this.props.calendar;

        if (!yearView) {
            month++;
        }

        if (yearView || month >= this.props.monthNames.length) {
            month = yearView ? month : 0;

            // View the calendar for the next year
            var viewDate = calendar.dates[calendar.dates.length - 1].gregorian;
            // add a buffer to the view date so the month doesn't change when startDate changes
            viewDate.setDate(viewDate.getDate() + 15);

            calendar = this.props.makeCalendarDates(viewDate, this.props.startDate);
        }

        this.props.onMonthViewChange(calendar, month);
    }

    render() {
        let monthLabel = (this.props.monthLabel || "Month");

        return (
            <table className="month-picker" >
                <tbody>
                <tr>
                    <td />
                    <td>
                        <button className="this-year-button"
                                value=""
                                onClick={this.onViewThisYear} >
                            <span className="this-year-button-txt">This Year</span>
                        </button>
                    </td>
                    <td />
                </tr>
                <tr>
                    <td style={{textAlign: "right"}}>
                        <button className="prev-month-button"
                                onClick={this.prevMonthView} >
                            <span className="prev-month-button-txt">{ "<<" }</span>
                        </button>
                    </td>
                    <td>
                        <select ref='monthViewSelect'
                                className="month-view-select"
                                value={this.props.monthView}
                                onChange={this.onMonthViewChange} >
                            <option value="-1">Year Calendar</option>
                            {this.props.monthNames.map(function (month, i) {
                                return (
                                    <option key={i} value={i}>
                                        {month}
                                    </option>
                                );
                            })}
                        </select>
                    </td>
                    <td style={{textAlign: "left"}}>
                        <button className="next-month-button"
                                onClick={this.nextMonthView} >
                            <span className="next-month-button-txt">{ ">>" }</span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td />
                    <td>
                        <button className="this-month-button"
                                onClick={this.onViewThisMonth} >
                            <span className="this-month-button-txt">{ "This " + monthLabel }</span>
                        </button>
                    </td>
                    <td />
                </tr>
                </tbody>
            </table>
        );
    }
}

export default MonthViewPicker;
