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
import { getNextDate, getPrevDate } from "../../Utils";

import { convertShireToGregorianDate } from "./DatesOfInterest";

import { ArrowKeyNavSelect, DateNumberInput } from "../Common";
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

    const onMonthChanged = (year: number, month: number) => {
        let day = todayShire.day;

        switch (day) {
            case "2 Yule":
            case "Overlithe":
            case "2 Lithe":
                day = 1;
                break;
            case "1 Yule":
            case "1 Lithe":
            case "Midyear's Day":
                day = 30;
                break;
            default:
                break;
        }

        onDateChanged(
            convertShireToGregorianDate(shireStartDate, year, month, day)
        );
    };

    const onMonthInc = () => {
        const month = todayShire.month;

        onMonthChanged(
            month === 11 ? year + 1 : year,
            month === 11 ? 0 : month + 1
        );
    };

    const onMonthDec = () => {
        const month = todayShire.month;

        onMonthChanged(
            month === 0 ? year - 1 : year,
            month === 0 ? 11 : month - 1
        );
    };

    const onDayChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const day = event.target.value;
        onDateChanged(new Date(day));
    };

    const onDayInc = () => {
        onDateChanged(getNextDate(todayShire.gregorian));
    };

    const onDayDec = () => {
        onDateChanged(getPrevDate(todayShire.gregorian));
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
            <ArrowKeyNavSelect
                className="date-time-input simulated-shire-month-picker"
                label="Month"
                value={todayShire.month}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    onMonthChanged(year, parseInt(event.target.value, 10))
                }
                onArrowUp={onMonthDec}
                onArrowLeft={onMonthDec}
                onArrowDown={onMonthInc}
                onArrowRight={onMonthInc}
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
            </ArrowKeyNavSelect>
            <ArrowKeyNavSelect
                className="date-time-input"
                label="Day"
                value={todayShire.gregorian.toISOString()}
                onChange={onDayChanged}
                onArrowUp={onDayDec}
                onArrowLeft={onDayDec}
                onArrowDown={onDayInc}
                onArrowRight={onDayInc}
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
            </ArrowKeyNavSelect>
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
