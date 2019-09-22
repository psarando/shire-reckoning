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

const GregorianDateDisplay = props => (
    <div className="gregorian-display">{props.date.toDateString()}</div>
);

const DateCell = props => {
    const {
        className,
        currentDate,
        date: { gregorian, day },
        description,
        month,
        weekday,
    } = props;

    const dayColor = getDateColor(className, gregorian, currentDate);

    return (
        <td className={dayColor} title={description + "\nWeekday: " + weekday}>
            <div className="date-display">
                {day}
                {day === 1 && ` ${month}`}
            </div>
            <GregorianDateDisplay date={gregorian} />
        </td>
    );
};

export { dateKey, getDateColor, GregorianDateDisplay };
export default DateCell;
