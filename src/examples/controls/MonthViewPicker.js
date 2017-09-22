/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';
import '../../ui/tolkien-calendars.css';

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
        let month = parseInt(event.target.value, 10);

        let viewDate = this.props.viewDate;
        let yearView = (month < 0);
        let monthView = yearView ? this.props.monthView : month;

        this.props.onMonthViewChange(viewDate, monthView, yearView);
    }

    onViewThisYear(event) {
        let viewDate = this.props.today;
        let month = this.props.thisMonth;
        let yearView = true;

        this.props.onMonthViewChange(viewDate, month, yearView);
    }

    onViewThisMonth(event) {
        let viewDate = this.props.today;
        let month = this.props.thisMonth;
        let yearView = false;

        this.props.onMonthViewChange(viewDate, month, yearView);
    }

    prevMonthView() {
        let viewDate = this.props.viewDate;
        let month = this.props.monthView;
        let yearView = this.props.yearView;

        if (!yearView) {
            month--;
        }

        if (yearView || month < 0) {
            month = yearView ? month : this.props.monthNames.length - 1;

            // View the calendar for the previous year
            viewDate = new Date(this.props.firstDay);
            // add a buffer to the view date so the month doesn't change when startDate changes
            viewDate.setDate(viewDate.getDate() - 15);
        }

        this.props.onMonthViewChange(viewDate, month, yearView);
    }

    nextMonthView() {
        let viewDate = this.props.viewDate;
        let month = this.props.monthView;
        let yearView = this.props.yearView;

        if (!yearView) {
            month++;
        }

        if (yearView || month >= this.props.monthNames.length) {
            month = yearView ? month : 0;

            // View the calendar for the next year
            viewDate = new Date(this.props.lastDay);
            // add a buffer to the view date so the month doesn't change when startDate changes
            viewDate.setDate(viewDate.getDate() + 15);
        }

        this.props.onMonthViewChange(viewDate, month, yearView);
    }

    render() {
        let monthLabel = (this.props.monthLabel || "Month");
        let monthView = this.props.yearView ? -1 : this.props.monthView;

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
                                value={monthView}
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
