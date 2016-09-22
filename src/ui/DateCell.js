/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';
import { datesMatch } from '../Utils';
import './tolkien-calendars.css';

const getDateColor = (monthColor, date1, date2) => {
    if (datesMatch(date1, date2)) {
        return "highlight";
    }

    return monthColor;
};

class GregorianDateDisplay extends Component {
    render() {
        return (<span className='gregorian-display' >{this.props.date.toDateString()}</span>);
    }
}

class DateCell extends Component {
    render() {
        let date = this.props.date;
        let dateTitle = this.props.description;
        let className = this.props.className;
        let currentDate = this.props.currentDate;
        let gregorianDate = date.gregorian;
        let dayColor = getDateColor(className, gregorianDate, currentDate);

        return (
            <td className={dayColor} title={dateTitle + "\nWeekday: " + this.props.weekday} >
                {date.day} {(date.day === 1) ? this.props.month : ''}
                <br />
                <GregorianDateDisplay date={gregorianDate} />
            </td>
        );
    }
}

export { getDateColor, GregorianDateDisplay };
export default DateCell;
