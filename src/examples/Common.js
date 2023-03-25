/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import { fullYearDate } from "../Utils";
import "./examples.css";

const CalendarCellStyle = {
    verticalAlign: "top",
};

const CaptionCellStyle = {
    verticalAlign: "top",
    padding: "1rem",
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
};

class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.resetDate = this.resetDate.bind(this);
        this.onDateChanged = this.onDateChanged.bind(this);
    }

    resetDate() {
        this.props.onDateChanged(new Date());
    }

    onDateChanged(event) {
        let year = parseInt(this.refs.currentYear.value, 10);
        let month = parseInt(this.refs.currentMonth.value, 10);
        let day = parseInt(this.refs.currentDay.value, 10);

        if (0 <= day && day <= 32) {
            let currentDate = fullYearDate(year, month, day);

            if (!isNaN(currentDate.getFullYear())) {
                this.props.onDateChanged(currentDate);
            }
        }
    }

    createDateInput(ref, value) {
        return (
            <input
                type="number"
                className="date-time-input"
                ref={ref}
                step="1"
                onChange={this.onDateChanged}
                value={value}
            />
        );
    }

    render() {
        let currentDate = this.props.date;
        let className = this.props.className || "gregorian-date-picker";

        return (
            <table className={className}>
                <tbody>
                    <tr>
                        <th>Gregorian Date:</th>
                        <th>
                            <select
                                className="date-time-input"
                                ref="currentMonth"
                                value={currentDate.getMonth()}
                                onChange={this.onDateChanged}
                            >
                                <option value="0">Jan</option>
                                <option value="1">Feb</option>
                                <option value="2">Mar</option>
                                <option value="3">Apr</option>
                                <option value="4">May</option>
                                <option value="5">Jun</option>
                                <option value="6">Jul</option>
                                <option value="7">Aug</option>
                                <option value="8">Sep</option>
                                <option value="9">Oct</option>
                                <option value="10">Nov</option>
                                <option value="11">Dec</option>
                            </select>
                        </th>
                        <th>
                            {this.createDateInput(
                                "currentDay",
                                currentDate.getDate()
                            )}
                        </th>
                        <th>
                            {this.createDateInput(
                                "currentYear",
                                currentDate.getFullYear()
                            )}
                        </th>
                        <th>
                            <button
                                className="today-button"
                                onClick={this.resetDate}
                            >
                                <span className="today-button-txt">Today</span>
                            </button>
                        </th>
                    </tr>
                </tbody>
            </table>
        );
    }
}

const Badges = (props) => (
    <>
        <a
            href="https://www.npmjs.org/package/shire-reckoning"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                src="https://img.shields.io/npm/v/shire-reckoning.svg?logo=npm"
                alt="[npm version]"
            />
        </a>
        &nbsp;
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            <img
                src="https://img.shields.io/npm/dependency-version/shire-reckoning/peer/react.svg?logo=react"
                alt="[react dependency version]"
            />
        </a>
    </>
);

export { Badges, CalendarCellStyle, CaptionCellStyle, DatePicker };
