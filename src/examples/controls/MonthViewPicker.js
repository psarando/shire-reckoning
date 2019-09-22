/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import "../../ui/tolkien-calendars.css";

const MonthViewPicker = props => {
    const onMonthViewChange = event => {
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
        <option key={i} value={i}>
            {month.emoji} {month.name}
        </option>
    ));

    return (
        <table className="month-picker">
            <tbody>
                <tr>
                    <td />
                    <td>
                        <button
                            className="this-year-button"
                            value=""
                            onClick={onViewThisYear}
                        >
                            <span className="this-year-button-txt">
                                This Year
                            </span>
                        </button>
                    </td>
                    <td />
                </tr>
                <tr>
                    <td style={{ textAlign: "right" }}>
                        <button
                            className="prev-month-button"
                            onClick={prevMonthView}
                        >
                            <span className="prev-month-button-txt">
                                {"<<"}
                            </span>
                        </button>
                    </td>
                    <td>
                        <select
                            className="month-view-select"
                            value={monthView}
                            onChange={onMonthViewChange}
                        >
                            <option value="-1">Year Calendar</option>
                            {monthViewSelectOptions}
                        </select>
                    </td>
                    <td style={{ textAlign: "left" }}>
                        <button
                            className="next-month-button"
                            onClick={nextMonthView}
                        >
                            <span className="next-month-button-txt">
                                {">>"}
                            </span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td />
                    <td>
                        <button
                            className="this-month-button"
                            onClick={onViewThisMonth}
                        >
                            <span className="this-month-button-txt">
                                {"This " + monthLabel}
                            </span>
                        </button>
                    </td>
                    <td />
                </tr>
            </tbody>
        </table>
    );
};

export default MonthViewPicker;
