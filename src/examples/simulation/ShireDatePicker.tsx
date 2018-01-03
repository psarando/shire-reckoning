/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { Button, ListItemText, MenuItem, Toolbar } from "@mui/material";

import { ShireMonths, makeShireCalendarDates } from "../../ShireReckoning";
import {
    GondorLeapYearRuleEnum,
    isGondorLeapYear,
} from "../../GondorReckoning";

import { convertShireToGregorianDate } from "./DatesOfInterest";

import { DateNumberInput, OutlinedSelect } from "../Common";
import "../examples.css";

interface ShireDatePickerProps {
    today: Date;
    shireStartDate: Date;
    onDateChanged: (date: Date) => void;
    todayEnabled?: boolean;
}

const ShireDatePicker = (props: ShireDatePickerProps) => {
    const { today, shireStartDate, onDateChanged, todayEnabled = true } = props;

    const calendar = makeShireCalendarDates(
        today,
        shireStartDate,
        GondorLeapYearRuleEnum.TRADITIONAL
    );
    const { year, todayShire } = calendar;

    const resetDate = () => onDateChanged(new Date());

    const onMonthChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const month = parseInt(event.target.value, 10);
        let day = todayShire.day;

        switch (day) {
            case "1 Yule":
            case "2 Yule":
            case "1 Lithe":
            case "Midyear's Day":
            case "Overlithe":
            case "2 Lithe":
                day = month < todayShire.month ? 30 : 1;
                break;
            default:
                break;
        }

        onDateChanged(
            convertShireToGregorianDate(shireStartDate, year, month, day)
        );
    };

    const onDayChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const day = event.target.value;
        onDateChanged(new Date(day));
    };

    const onYearChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const year = parseInt(event.target.value, 10) + 1600 + 3441;
        const month = todayShire.month;
        let day = todayShire.day;

        if (
            day === "Overlithe"
            && !isGondorLeapYear(year, GondorLeapYearRuleEnum.TRADITIONAL)
        ) {
            day = "2 Lithe";
        }

        onDateChanged(
            convertShireToGregorianDate(shireStartDate, year, month, day)
        );
    };

    return (
        <Toolbar
            className="simulated-shire-date-picker"
            style={{ paddingLeft: 0 }}
        >
            <OutlinedSelect
                className="date-time-input simulated-shire-month-picker"
                label="Month"
                value={todayShire.month}
                onChange={onMonthChanged}
                SelectProps={{
                    renderValue: (value: number) => ShireMonths[value].tolkien,
                }}
            >
                {ShireMonths.map((month, i) => (
                    <MenuItem key={month.shire} value={i}>
                        <ListItemText
                            primary={month.tolkien}
                            secondary={month.shire}
                        />
                    </MenuItem>
                ))}
            </OutlinedSelect>
            <OutlinedSelect
                className="date-time-input"
                label="Day"
                value={todayShire.gregorian.toISOString()}
                onChange={onDayChanged}
            >
                {calendar.dates
                    .filter((date) => date.month === todayShire.month)
                    .map((date) => (
                        <MenuItem
                            key={date.gregorian.toISOString()}
                            value={date.gregorian.toISOString()}
                        >
                            {date.day}
                        </MenuItem>
                    ))}
            </OutlinedSelect>
            <DateNumberInput
                label="Year"
                value={year - 1600 - 3441}
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

export default ShireDatePicker;
