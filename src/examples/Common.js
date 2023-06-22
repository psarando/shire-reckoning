/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

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

const DatePicker = (props) => {
    const { date: currentDate, className = "gregorian-date-picker" } = props;

    const currentYear = React.useRef();
    const currentMonth = React.useRef();
    const currentDay = React.useRef();

    const resetDate = () => {
        props.onDateChanged(new Date());
    };

    const onDateChanged = () => {
        const year = parseInt(currentYear.current.value, 10);
        const month = parseInt(currentMonth.current.value, 10);
        const day = parseInt(currentDay.current.value, 10);

        if (0 <= day && day <= 32) {
            const currentDate = fullYearDate(year, month, day);

            if (!isNaN(currentDate.getFullYear())) {
                props.onDateChanged(currentDate);
            }
        }
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

    return (
        <table className={className}>
            <tbody>
                <tr>
                    <th>Gregorian Date:</th>
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
                    <th>
                        {createDateInput(
                            currentYear,
                            currentDate.getFullYear()
                        )}
                    </th>
                    <th>
                        <button className="today-button" onClick={resetDate}>
                            <span className="today-button-txt">Today</span>
                        </button>
                    </th>
                </tr>
            </tbody>
        </table>
    );
};

const Badges = (props) => (
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

const DisplayTableRows = ({ rows }) => (
    <table
        border="1rm"
        cellPadding="2rm"
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

const DisplayTableMap = ({ rowKeys, colKeys, table }) => (
    <table
        border="1rm"
        cellPadding="2rm"
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
    DatePicker,
    DisplayTableMap,
    DisplayTableRows,
};
