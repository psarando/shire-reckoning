/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import "./tolkien-calendars.css";

const WeekDayHeaderCell = props => {
    return (
        <td
            className="weekday-header"
            colSpan={props.colSpan}
            title={props.description}
        >
            {props.name}
        </td>
    );
};

const addMonthFiller = (week, upToWeekDay) => {
    for (let weekday = 0; weekday < upToWeekDay; weekday++) {
        week.push(<WeekDayHeaderCell key={"month-filler-" + weekday} />);
    }
};

const addVerticalMonthFiller = (weeks, upToWeekDay) => {
    for (let weekday = 0; weekday < upToWeekDay; weekday++) {
        weeks[weekday].push(
            <WeekDayHeaderCell key={"month-filler-" + weekday} />
        );
    }
};

export { addMonthFiller, addVerticalMonthFiller };
export default WeekDayHeaderCell;
