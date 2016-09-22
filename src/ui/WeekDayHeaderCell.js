/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';
import './tolkien-calendars.css';

class WeekDayHeaderCell extends Component {
    render() {
        return (
            <td className='weekday-header'
                colSpan={this.props.colSpan}
                title={this.props.description} >
                {this.props.name}
            </td>
        );
    }
}

const addMonthFiller = (week, upToWeekDay) => {
    for (let weekday = 0; weekday < upToWeekDay; weekday++) {
        week.push(<WeekDayHeaderCell key={'month-filler-' + weekday} />);
    }
};

const addVerticalMonthFiller = (weeks, upToWeekDay) => {
    for (let weekday = 0; weekday < upToWeekDay; weekday++) {
        weeks[weekday].push(<WeekDayHeaderCell key={'month-filler-' + weekday} />);
    }
};

export { addMonthFiller, addVerticalMonthFiller };
export default WeekDayHeaderCell;
