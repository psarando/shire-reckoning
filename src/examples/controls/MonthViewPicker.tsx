/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { Button, IconButton, MenuItem } from "@mui/material";
import {
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

import { OutlinedSelect } from "../Common";
import "../../ui/tolkien-calendars.css";
import { scriptFontFamily } from "../theme";

export interface MonthViewDisplayItem {
    emoji: string;
    name: string;
}

interface MonthViewPickerProps {
    months: MonthViewDisplayItem[];
    firstDay: Date;
    lastDay: Date;
    thisMonth: number;
    today: Date;
    viewDate: Date;
    monthView: number;
    yearView: boolean;
    onMonthViewChange: (
        viewDate: Date,
        monthView: number,
        yearView: boolean
    ) => void;
    monthLabel?: string;
}

const MonthViewPicker = (props: MonthViewPickerProps) => {
    const onMonthViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const month = parseInt(event.target.value, 10);

        const viewDate = props.viewDate;
        const yearView = month < 0;
        const monthView = yearView ? props.monthView : month;

        props.onMonthViewChange(viewDate, monthView, yearView);
    };

    const onViewThisYear = () => {
        const viewDate = props.today;
        const month = props.thisMonth;
        const yearView = true;

        props.onMonthViewChange(viewDate, month, yearView);
    };

    const onViewThisMonth = () => {
        const viewDate = props.today;
        const month = props.thisMonth;
        const yearView = false;

        props.onMonthViewChange(viewDate, month, yearView);
    };

    const prevMonthView = () => {
        let viewDate = props.viewDate;
        let month = props.monthView;
        const yearView = props.yearView;

        if (!yearView) {
            month--;
        }

        if (yearView || month < 0) {
            month = yearView ? month : props.months.length - 1;

            // View the calendar for the previous year
            viewDate = new Date(props.firstDay);
            // add a buffer to the view date so the month doesn't change when startDate changes
            viewDate.setDate(viewDate.getDate() - 15);
        }

        props.onMonthViewChange(viewDate, month, yearView);
    };

    const nextMonthView = () => {
        let viewDate = props.viewDate;
        let month = props.monthView;
        const yearView = props.yearView;

        if (!yearView) {
            month++;
        }

        if (yearView || month >= props.months.length) {
            month = yearView ? month : 0;

            // View the calendar for the next year
            viewDate = new Date(props.lastDay);
            // add a buffer to the view date so the month doesn't change when startDate changes
            viewDate.setDate(viewDate.getDate() + 15);
        }

        props.onMonthViewChange(viewDate, month, yearView);
    };

    const monthLabel = props.monthLabel || "Month";
    const monthView = props.yearView ? -1 : props.monthView;

    const monthViewSelectOptions = props.months.map((month, i) => (
        <MenuItem key={i} value={i}>
            {month.emoji} {month.name}
        </MenuItem>
    ));

    return (
        <table className="month-picker">
            <tbody>
                <tr>
                    <td />
                    <td>
                        <Button
                            color="secondary"
                            variant="outlined"
                            className="this-year-button"
                            style={{ fontSize: "0.75rem" }}
                            fullWidth={true}
                            onClick={onViewThisYear}
                        >
                            <span className="this-year-button-txt">
                                This Year
                            </span>
                        </Button>
                    </td>
                    <td />
                </tr>
                <tr>
                    <td style={{ textAlign: "right" }}>
                        <IconButton
                            color="secondary"
                            className="prev-month-button"
                            onClick={prevMonthView}
                        >
                            <ArrowBackIcon className="prev-month-button-txt" />
                        </IconButton>
                    </td>
                    <td>
                        <OutlinedSelect
                            className="month-view-select"
                            style={{ width: "10.75rem" }}
                            SelectProps={{
                                SelectDisplayProps: {
                                    style: {
                                        fontWeight: "normal",
                                        fontFamily: scriptFontFamily,
                                    },
                                },
                            }}
                            value={monthView}
                            onChange={onMonthViewChange}
                        >
                            <MenuItem value={-1}>Year Calendar</MenuItem>
                            {monthViewSelectOptions}
                        </OutlinedSelect>
                    </td>
                    <td style={{ textAlign: "left" }}>
                        <IconButton
                            color="secondary"
                            className="next-month-button"
                            onClick={nextMonthView}
                        >
                            <ArrowForwardIcon className="next-month-button-txt" />
                        </IconButton>
                    </td>
                </tr>
                <tr>
                    <td />
                    <td>
                        <Button
                            color="secondary"
                            variant="outlined"
                            className="this-month-button"
                            style={{ fontSize: "0.75rem" }}
                            fullWidth={true}
                            onClick={onViewThisMonth}
                        >
                            <span className="this-month-button-txt">
                                {"This " + monthLabel}
                            </span>
                        </Button>
                    </td>
                    <td />
                </tr>
            </tbody>
        </table>
    );
};

export default MonthViewPicker;
