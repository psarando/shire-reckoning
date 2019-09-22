/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import { fullYearDate } from "../../Utils";

class StartReckoningDatePicker extends Component {
    constructor(props) {
        super(props);

        this.onDateChanged = this.onDateChanged.bind(this);
    }

    onDateChanged(event) {
        let year = this.refs.currentYear.value;
        let month = this.refs.currentMonth.value;
        let day = this.refs.currentDay.value;

        this.props.onCalendarStartChange(fullYearDate(year, month, day));
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
        let currentDate = this.props.startDate;
        let style = this.props.styles || { margin: "auto" };

        return (
            <table style={style}>
                <tbody>
                    <tr>
                        <th colSpan="2">Start reckoning from</th>
                    </tr>
                    <tr>
                        <th>Year:</th>
                        <th>
                            {this.createDateInput(
                                "currentYear",
                                currentDate.getFullYear()
                            )}
                        </th>
                    </tr>
                    <tr>
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
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default StartReckoningDatePicker;
