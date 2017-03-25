/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

class StartDatePicker extends Component {
    constructor(props) {
        super(props);

        this.onDateChanged = this.onDateChanged.bind(this);
    }

    onDateChanged(event) {
        let startDay = event.target.value;

        let changedDate = new Date(this.props.startDate);
        changedDate.setDate(startDay);

        this.props.onCalendarStartChange(changedDate);
    }

    render() {
        let opts = [];
        for (let day = this.props.startRange; day <= this.props.endRange; day++) {
            opts.push(<option key={day} value={day}>{day}</option>);
        }

        return (
            <div>
                Start reckoning from
                <br />
                {this.props.month}
                <select className="first-day-select"
                        value={this.props.startDate.getDate()}
                        onChange={this.onDateChanged} >
                    {opts}
                </select>
            </div>
        );
    }
}

export default StartDatePicker;
