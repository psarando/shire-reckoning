/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import { makeShireCalendarDates, ShireMonths } from "../../ShireReckoning";
import { RECKONING_RULES_TRADITIONAL } from "../../GondorReckoning";
import { datesMatch, fullYearDate, getFirstDay, getLastDay } from "../../Utils";

import ShireCalendar from "../../ui/ShireCalendar";
import "../../ui/tolkien-calendars.css";

import MonthViewLayout from "../controls/MonthViewLayout";
import MonthViewPicker from "../controls/MonthViewPicker";
import ShireRegionPicker from "../controls/ShireRegionPicker";

import StartReckoningDatePicker from "./StartReckoningDatePicker";

class ShireCalendarSimulated extends Component {
    constructor(props) {
        super(props);

        const today = props.date || new Date();
        const startDate = props.startDate || fullYearDate(0, 11, 23);

        const calendar = makeShireCalendarDates(
            today,
            startDate,
            RECKONING_RULES_TRADITIONAL
        );
        const monthView = calendar.todayShire.month;

        this.state = {
            startDate,
            today,
            viewDate: today,
            calendar,
            yearView: false,
            monthView,
            monthViewLayout: MonthViewLayout.VERTICAL,
            region: ShireCalendar.REGION_NAMES_SHIRE,
        };

        this.onMonthViewChange = this.onMonthViewChange.bind(this);
        this.onMonthViewLayoutChange = this.onMonthViewLayoutChange.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const today = nextProps.date || this.state.today;
        const startDate = nextProps.startDate || this.state.startDate;
        let calendar = this.state.calendar;

        if (
            !datesMatch(startDate, this.state.startDate)
            || !datesMatch(today, this.state.today)
            || !datesMatch(today, calendar.today)
        ) {
            calendar = makeShireCalendarDates(
                today,
                startDate,
                RECKONING_RULES_TRADITIONAL
            );
        }

        const monthView = calendar.todayShire.month;

        this.setState({
            today,
            viewDate: today,
            calendar,
            startDate,
            monthView,
        });
    }

    onMonthViewChange(viewDate, monthView, yearView) {
        let calendar = this.state.calendar;

        if (!datesMatch(this.state.viewDate, viewDate)) {
            calendar = makeShireCalendarDates(
                viewDate,
                this.state.startDate,
                RECKONING_RULES_TRADITIONAL
            );
            monthView = calendar.todayShire.month;
        }

        this.setState({
            calendar,
            viewDate,
            yearView,
            monthView,
        });
    }

    onMonthViewLayoutChange(event) {
        this.setState({ monthViewLayout: event.target.value });
    }

    onRegionChange(event) {
        this.setState({ region: event.target.value });
    }

    render() {
        const { className, onCalendarStartChange } = this.props;
        const {
            calendar,
            monthView,
            monthViewLayout,
            region,
            startDate,
            today,
            viewDate,
            yearView,
        } = this.state;

        let reckoningName = "Shire";
        let reckoningYearOffset = 1600;
        if (region === ShireCalendar.REGION_NAMES_BREE) {
            reckoningName = "Bree";
            reckoningYearOffset = 1299;
        }

        const thirdAgeYear = calendar.year - 3441;

        const reckoningYear = thirdAgeYear - reckoningYearOffset;
        const caption = `${reckoningName} Reckoning ${reckoningYear}`;

        const astron6 = calendar.dates[96];
        let blotmath2 = calendar.dates[305];
        if (blotmath2.day === 1) {
            // leap-year
            blotmath2 = calendar.dates[306];
        } else if (blotmath2.day === 30) {
            // millennial leap-year
            blotmath2 = calendar.dates[307];
        }

        if (thirdAgeYear < 3020) {
            // Force these days to the month's default colors, since they are not holidays until at least S.R. 1420.
            astron6.className = ShireMonths[3].className;
            blotmath2.className = ShireMonths[10].className;
        } else {
            delete astron6.className;
            delete blotmath2.className;
        }

        const months = ShireMonths.map(function(month) {
            return { emoji: month.emoji, name: month[region] };
        });

        const firstDay = getFirstDay(calendar);
        const lastDay = getLastDay(calendar);

        return (
            <table className={className}>
                <caption className="shire-caption">{caption}</caption>
                <thead>
                    <tr>
                        <th className="shire-calendar-controls">
                            <StartReckoningDatePicker
                                startDate={startDate}
                                onCalendarStartChange={onCalendarStartChange}
                            />
                        </th>
                        <th className="shire-calendar-controls month-picker-container">
                            <MonthViewPicker
                                months={months}
                                firstDay={firstDay}
                                lastDay={lastDay}
                                thisMonth={calendar.todayShire.month}
                                today={today}
                                viewDate={viewDate}
                                monthView={monthView}
                                yearView={yearView}
                                onMonthViewChange={this.onMonthViewChange}
                            />
                        </th>
                        <th className="shire-calendar-controls">
                            Reckon with:
                            <br />
                            <ShireRegionPicker
                                region={region}
                                onRegionChange={this.onRegionChange}
                            />
                        </th>
                        <th className="shire-calendar-controls">
                            <MonthViewLayout
                                layout={monthViewLayout}
                                onMonthViewLayoutChange={
                                    this.onMonthViewLayoutChange
                                }
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="4" className="shire-calendar-wrapper-cell">
                            <ShireCalendar
                                className="shire-calendar"
                                calendar={calendar}
                                date={today}
                                region={region}
                                monthViewLayout={monthViewLayout}
                                monthView={monthView}
                                yearView={yearView}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default ShireCalendarSimulated;
