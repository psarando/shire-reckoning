/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    Button,
    MenuItem,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";

import { fullYearDate } from "../Utils";
import "./examples.css";

const CalendarCellStyle = {
    verticalAlign: "top",
};

const CaptionCellStyle = {
    verticalAlign: "top",
    padding: "1rem",
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
};

const DateNumberInput = (props: any) => (
    <TextField type="number" className="date-time-input" step={1} {...props} />
);

const OutlinedSelect = (props: any) => <TextField select {...props} />;

const DateMonthSelect = ({ monthFormat = "short", ...props }: any) => {
    const monthFormatter = new Intl.DateTimeFormat("en", {
        month: monthFormat,
    });

    const style = monthFormat === "long" ? { width: "8.5rem" } : undefined;

    return (
        <OutlinedSelect
            label="Month"
            className="gregorian-month-picker"
            style={style}
            {...props}
        >
            {[...Array(12)].map((_, m) => (
                <MenuItem key={m} value={m}>
                    {monthFormatter.format(new Date(2000, m, 1))}
                </MenuItem>
            ))}
        </OutlinedSelect>
    );
};

const DayInput = (props: any) => {
    return <DateNumberInput label="Day" {...props} />;
};

const YearInput = (props: any) => {
    return <DateNumberInput label="Year" {...props} />;
};

const parseDatePickerChangedDate = (
    year: number,
    month: number,
    day: number
) => {
    if (0 <= day && day <= 32) {
        const currentDate = fullYearDate(year, month, day);

        if (!isNaN(currentDate.getFullYear())) {
            return currentDate;
        }
    }

    return null;
};

interface DatePickerProps {
    date: Date;
    onDateChanged: (date: Date) => void;
    todayEnabled?: boolean;
    label?: string;
    className?: string;
}

const DatePicker = (props: DatePickerProps) => {
    const {
        date: currentDate,
        todayEnabled = true,
        label = "Gregorian Date:",
        className = "gregorian-date-picker",
    } = props;

    const resetDate = () => {
        props.onDateChanged(new Date());
    };

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
            props.onDateChanged(currentDate);
        }
    };

    return (
        <Toolbar className={className} style={{ paddingLeft: 0 }}>
            {label && <Typography variant="h6">{label}</Typography>}
            <DateMonthSelect
                value={currentDate.getMonth()}
                onChange={onMonthChanged}
                monthFormat="long"
            />
            <DayInput value={currentDate.getDate()} onChange={onDayChanged} />
            <YearInput
                style={{ width: "6.2rem" }}
                value={currentDate.getFullYear()}
                onChange={onYearChanged}
            />
            {todayEnabled && (
                <Button
                    variant="outlined"
                    size="large"
                    className="today-button"
                    onClick={resetDate}
                >
                    <span className="today-button-txt">Today</span>
                </Button>
            )}
        </Toolbar>
    );
};

const Badges = () => (
    <>
        <a
            href="https://www.npmjs.org/package/shire-reckoning"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                src="https://img.shields.io/npm/v/shire-reckoning.svg?logo=npm"
                alt="[npm version]"
            />
        </a>
        &nbsp;
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            <img
                src="https://img.shields.io/npm/dependency-version/shire-reckoning/peer/react.svg?logo=react"
                alt="[react dependency version]"
            />
        </a>
    </>
);

const DisplayTableRows = ({ rows }: { rows: React.ReactNode[][] }) => (
    <table
        border={1}
        cellPadding={2}
        style={{ margin: "1em", fontFamily: "monospace" }}
    >
        <tbody>
            {rows.map((row, index) => (
                <tr key={index}>
                    {row.map((cell, index) => (
                        <td key={index}>{cell}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

interface DisplayTableMapProps {
    rowKeys: string[];
    colKeys: string[];
    table: { [row: string]: { [col: string]: React.ReactNode } };
}
const DisplayTableMap = ({ rowKeys, colKeys, table }: DisplayTableMapProps) => (
    <table
        border={1}
        cellPadding={2}
        style={{ margin: "1em", fontFamily: "monospace", whiteSpace: "pre" }}
    >
        <tbody>
            <tr>
                <th></th>
                {colKeys.map((head) => (
                    <th key={head}>{head}</th>
                ))}
            </tr>
            {rowKeys.map((row) => (
                <tr key={row} style={{ textAlign: "right" }}>
                    <th>{row}</th>
                    {colKeys.map((col) => (
                        <td key={col}>{table[row][col]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

export {
    Badges,
    CalendarCellStyle,
    CaptionCellStyle,
    DateMonthSelect,
    DateNumberInput,
    DatePicker,
    DisplayTableMap,
    DisplayTableRows,
    DayInput,
    YearInput,
    OutlinedSelect,
    parseDatePickerChangedDate,
};
