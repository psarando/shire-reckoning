/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { Toolbar, Typography } from "@mui/material";

import {
    DateMonthSelect,
    DayInput,
    YearInput,
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
        <>
            <Typography variant="subtitle1" gutterBottom>
                Start reckoning from
            </Typography>
            <Toolbar
                variant="dense"
                disableGutters
                style={{
                    margin: "0 auto 0.25rem",
                    justifyContent: "center",
                    fontWeight: "normal",
                }}
            >
                <DateMonthSelect
                    SelectProps={{
                        SelectDisplayProps: {
                            style: { fontSize: "0.75rem" },
                        },
                    }}
                    value={currentDate.getMonth()}
                    onChange={onMonthChanged}
                />
                <DayInput
                    style={{ width: "4rem" }}
                    inputProps={{ style: { fontSize: "0.75rem" } }}
                    value={currentDate.getDate()}
                    onChange={onDayChanged}
                />
                <YearInput
                    inputProps={{ style: { fontSize: "0.75rem" } }}
                    value={currentDate.getFullYear()}
                    onChange={onYearChanged}
                />
            </Toolbar>
        </>
    );
};

export default StartReckoningDatePicker;
