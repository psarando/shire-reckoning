/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import "./tolkien-calendars.css";

interface WeekDayHeaderCellProps {
    colSpan?: number;
    scope?: string;
    description?: string;
    name?: string;
    emoji?: string;
}

const WeekDayHeaderCell = (props: WeekDayHeaderCellProps) => {
    return (
        <th
            className="weekday-header"
            colSpan={props.colSpan}
            scope={props.scope}
            title={props.description}
        >
            {props.name && (
                <div className="weekday-name-container">
                    <div className="weekday-emoji">{props.emoji}</div>
                    <div className="weekday-name">{props.name}</div>
                </div>
            )}
        </th>
    );
};

const addMonthFiller = (week: React.JSX.Element[], upToWeekDay: number) => {
    for (let weekday = 0; weekday < upToWeekDay; weekday++) {
        week.push(<WeekDayHeaderCell key={"month-filler-" + weekday} />);
    }
};

const addVerticalMonthFiller = (
    weeks: React.JSX.Element[][],
    upToWeekDay: number
) => {
    for (let weekday = 0; weekday < upToWeekDay; weekday++) {
        weeks[weekday].push(
            <WeekDayHeaderCell key={"month-filler-" + weekday} />
        );
    }
};

export { addMonthFiller, addVerticalMonthFiller };
export default WeekDayHeaderCell;
