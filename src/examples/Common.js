/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';
import './examples.css';

const CalendarCellStyle = {
    verticalAlign: 'top'
};

const CaptionCellStyle = {
    verticalAlign: 'top',
    padding: 4,
    borderTopStyle: 'solid',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid'
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
        let year = this.refs.currentYear.value;
        let month = this.refs.currentMonth.value;
        let day = this.refs.currentDay.value;
        let currentDate = new Date(year, month, day);

        // reset full year, month, and day for years 0-99
        currentDate.setFullYear(year);
        currentDate.setMonth(month);
        currentDate.setDate(day);

        this.props.onDateChanged(currentDate);
    }

    createDateInput(ref, value) {
        return (
            <input type="number"
                   className="date-time-input"
                   ref={ref}
                   step='1'
                   onChange={this.onDateChanged}
                   value={value} />
        );
    }

    render() {
        let currentDate = this.props.date;
        let style = this.props.styles || {margin: "auto"};

        return (
            <table style={style}>
                <tbody>
                <tr>
                    <th>Gregorian Date:</th>
                    <th>
                        <select className="date-time-input"
                                ref='currentMonth'
                                value={currentDate.getMonth()}
                                onChange={this.onDateChanged} >
                            <option value='0'>Jan</option>
                            <option value='1'>Feb</option>
                            <option value='2'>Mar</option>
                            <option value='3'>Apr</option>
                            <option value='4'>May</option>
                            <option value='5'>Jun</option>
                            <option value='6'>Jul</option>
                            <option value='7'>Aug</option>
                            <option value='8'>Sep</option>
                            <option value='9'>Oct</option>
                            <option value='10'>Nov</option>
                            <option value='11'>Dec</option>
                        </select>
                    </th>
                    <th>
                        {this.createDateInput('currentDay', currentDate.getDate())}
                    </th>
                    <th>
                        {this.createDateInput('currentYear', currentDate.getFullYear())}
                    </th>
                    <th>
                        <button className="today-button"
                                onClick={this.resetDate} >
                            <span className="today-button-txt">Today</span>
                        </button>
                    </th>
                </tr>
                </tbody>
            </table>
        );
    }
}

export { CalendarCellStyle, CaptionCellStyle, DatePicker };
