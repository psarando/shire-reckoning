/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { datesMatch } from "../Utils";
import "./tolkien-calendars.css";

const dateKey = (date, suffix) => `${date.month}/${date.day}${suffix}`;

const getDateColor = (monthColor, date1, date2) => {
    if (datesMatch(date1, date2)) {
        return "highlight";
    }

    return monthColor;
};

const GregorianDateDisplay = (props) => (
    <div className="gregorian-display">{props.date.toDateString()}</div>
);

const DateCell = (props) => {
    const {
        className,
        currentDate,
        date: { gregorian, day },
        description,
        emoji,
        month,
        weekday,
    } = props;

    const dayColor = getDateColor(className, gregorian, currentDate);

    const day1 = day === 1;

    const dateDisplay = day1 ? month : day;
    const dateDisplayClassName = day1 ? "month-name-display" : "date-display";

    return (
        <td className={dayColor} title={description + "\nWeekday: " + weekday}>
            <div className="date-container">
                <div className="date-display-emoji">{day1 && emoji}</div>
                <div className={dateDisplayClassName}>{dateDisplay}</div>
                <GregorianDateDisplay date={gregorian} />
            </div>
        </td>
    );
};

export { dateKey, getDateColor, GregorianDateDisplay };
export default DateCell;
