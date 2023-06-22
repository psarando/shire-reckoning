/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { CalendarDate, datesMatch } from "../Utils";
import "./tolkien-calendars.css";

interface DateCellProps {
    className: string;
    currentDate: Date;
    date: CalendarDate;
    description: string;
    emoji: string;
    month: string;
    weekday: string;
}

interface GregorianDateDisplayProps {
    date: Date;
}

const dateKey = (date: CalendarDate, suffix?: string | number) =>
    `${date.month}/${date.day}${suffix}`;

const getDateColor = (
    monthColor: string,
    date1: Date | undefined,
    date2: Date
) => {
    if (date1 && datesMatch(date1, date2)) {
        return "highlight";
    }

    return monthColor;
};

const GregorianDateDisplay = (props: GregorianDateDisplayProps) => (
    <div className="gregorian-display">{props.date.toDateString()}</div>
);

const DateCell = (props: DateCellProps) => {
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
