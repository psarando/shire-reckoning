/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { fullYearDate } from "../../Utils";

const StartReckoningDatePicker = (props) => {
    const currentYear = React.useRef();
    const currentMonth = React.useRef();
    const currentDay = React.useRef();

    const onDateChanged = () => {
        const year = currentYear.current.value;
        const month = currentMonth.current.value;
        const day = currentDay.current.value;

        props.onCalendarStartChange(fullYearDate(year, month, day));
    };

    const createDateInput = (ref, value) => {
        return (
            <input
                type="number"
                className="date-time-input"
                ref={ref}
                step="1"
                onChange={onDateChanged}
                value={value}
            />
        );
    };

    const currentDate = props.startDate;
    const style = props.styles || { margin: "auto" };

    return (
        <table style={style}>
            <tbody>
                <tr>
                    <th colSpan="2">Start reckoning from</th>
                </tr>
                <tr>
                    <th>Year:</th>
                    <th>
                        {createDateInput(
                            currentYear,
                            currentDate.getFullYear()
                        )}
                    </th>
                </tr>
                <tr>
                    <th>
                        <select
                            className="date-time-input"
                            ref={currentMonth}
                            value={currentDate.getMonth()}
                            onChange={onDateChanged}
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
                        {createDateInput(currentDay, currentDate.getDate())}
                    </th>
                </tr>
            </tbody>
        </table>
    );
};

export default StartReckoningDatePicker;
