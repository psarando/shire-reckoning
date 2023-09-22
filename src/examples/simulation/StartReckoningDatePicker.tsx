/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    DateNumberInput,
    DateMonthSelect,
    parseDatePickerChangedDate,
} from "../Common";

interface StartDatePickerProps {
    startDate: Date;
    onCalendarStartChange: (startDate: Date) => void;
}

const StartReckoningDatePicker = (props: StartDatePickerProps) => {
    const { startDate: currentDate } = props;

    const onMonthChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const year = currentDate.getFullYear();
        const month = parseInt(event.target.value, 10);
        const day = currentDate.getDate();

        onDateChanged(year, month, day);
    };

    const onDayChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = parseInt(event.target.value, 10);

        onDateChanged(year, month, day);
    };

    const onYearChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const year = parseInt(event.target.value, 10);
        const month = currentDate.getMonth();
        const day = currentDate.getDate();

        onDateChanged(year, month, day);
    };

    const onDateChanged = (year: number, month: number, day: number) => {
        const currentDate = parseDatePickerChangedDate(year, month, day);

        if (currentDate) {
            props.onCalendarStartChange(currentDate);
        }
    };

    return (
        <table style={{ margin: "auto" }}>
            <tbody>
                <tr>
                    <th colSpan={2}>Start reckoning from</th>
                </tr>
                <tr>
                    <th>Year:</th>
                    <th>
                        <DateNumberInput
                            value={currentDate.getFullYear()}
                            onChange={onYearChanged}
                        />
                    </th>
                </tr>
                <tr>
                    <th>
                        <DateMonthSelect
                            value={currentDate.getMonth()}
                            onChange={onMonthChanged}
                        />
                    </th>
                    <th>
                        <DateNumberInput
                            value={currentDate.getDate()}
                            onChange={onDayChanged}
                        />
                    </th>
                </tr>
            </tbody>
        </table>
    );
};

export default StartReckoningDatePicker;
