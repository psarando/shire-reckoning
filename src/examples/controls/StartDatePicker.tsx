/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { datesMatch, fullYearDate } from "../../Utils";

interface StartDatePickerItem {
    label: string;
    date: Date;
}

interface StartDatePickerProps {
    onCalendarStartChange: (startDate: Date) => void;
    selectedDate: Date;
}

const StartDatePicker = (
    props: StartDatePickerProps & { startDates: StartDatePickerItem[] }
) => {
    const onDateChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const changedDate = event.target.value;
        props.onCalendarStartChange(new Date(changedDate));
    };

    const selectedDate = props.startDates.find((startDate) =>
        datesMatch(startDate.date, props.selectedDate)
    );

    const opts = props.startDates.map((startDate) => (
        <option key={startDate.label} value={startDate.date.toISOString()}>
            {startDate.label}
        </option>
    ));

    return (
        <div>
            Start reckoning from
            <select
                className="first-day-select"
                value={selectedDate && selectedDate.date.toISOString()}
                onChange={onDateChanged}
            >
                {opts}
            </select>
        </div>
    );
};

const getStartDates = (
    monthLabel: string,
    year: number,
    month: number,
    startRange: number,
    endRange: number
) => {
    const startDates = [];
    for (let day = startRange; day <= endRange; day++) {
        const date = fullYearDate(year, month, day);

        // avoid TZ or DST issues in onDateChanged handler
        date.setHours(12, 0, 0);

        startDates.push({ label: `${monthLabel} ${day}`, date });
    }

    return startDates;
};

const ShireStartDatePicker = (props: StartDatePickerProps) => {
    const { onCalendarStartChange, selectedDate } = props;
    const startDates = [
        ...getStartDates("December", 0, 11, 18, 25),
        ...getStartDates("June", 0, 5, 18, 26),
    ];

    return (
        <StartDatePicker
            selectedDate={selectedDate}
            startDates={startDates}
            onCalendarStartChange={onCalendarStartChange}
        />
    );
};

const ICalendarStartDatePicker = (props: StartDatePickerProps) => {
    const { onCalendarStartChange, selectedDate } = props;
    const startDates = getStartDates("December", 0, 11, 18, 25);

    return (
        <StartDatePicker
            selectedDate={selectedDate}
            startDates={startDates}
            onCalendarStartChange={onCalendarStartChange}
        />
    );
};

const RivendellStartDatePicker = (props: StartDatePickerProps) => {
    const { onCalendarStartChange, selectedDate } = props;
    const startDates = [
        ...getStartDates("March", 1, 2, 17, 29),
        ...getStartDates("September", 0, 8, 17, 29),
    ];

    return (
        <StartDatePicker
            selectedDate={selectedDate}
            startDates={startDates}
            onCalendarStartChange={onCalendarStartChange}
        />
    );
};

export {
    ShireStartDatePicker,
    RivendellStartDatePicker,
    ICalendarStartDatePicker,
};
