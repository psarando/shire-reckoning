/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import {
    GondorMonths,
    RECKONING_KINGS,
    RECKONING_STEWARDS,
    RECKONING_NEW,
    RECKONING_RULES_TRADITIONAL,
    makeGondorCalendarDates,
} from "../../GondorReckoning";

import {
    daysElapsedToSecondAgeYear,
    daysElapsedToNewReckoningYear,
    toDaysElapsed,
    datesMatch,
    fullYearDate,
    getFirstDay,
    getLastDay,
} from "../../Utils";

import GondorCalendar from "../../ui/GondorCalendar";
import "../../ui/tolkien-calendars.css";

import LanguagePicker from "../controls/LanguagePicker";
import MonthViewLayout from "../controls/MonthViewLayout";
import MonthViewPicker from "../controls/MonthViewPicker";

import StartReckoningDatePicker from "./StartReckoningDatePicker";

const getNewStyleYear = (startDate, today) =>
    daysElapsedToNewReckoningYear(
        daysElapsedToSecondAgeYear,
        toDaysElapsed(startDate, today)
    ).year - 3441;

const gondorReckoningForYear = (calendar, startDate, today) => {
    let year = calendar.year;

    let gondorReckoning = RECKONING_KINGS;
    if (year > 3441) {
        year -= 3441;

        if (year > 2059) {
            gondorReckoning = RECKONING_STEWARDS;

            // For year 3019, New Reckoning doesn't start until 3/25 old style.
            if (year > 3019 || getNewStyleYear(startDate, today) >= 3019) {
                gondorReckoning = RECKONING_NEW;
            }
        }
    }

    return gondorReckoning;
};

class GondorCalendarSimulated extends Component {
    constructor(props) {
        super(props);

        const today = props.date || new Date();
        const startDate = props.startDate || fullYearDate(0, 11, 23);

        let reckoning = GondorCalendar.RECKONING_STEWARDS;

        let calendar = makeGondorCalendarDates(
            today,
            startDate,
            reckoning,
            RECKONING_RULES_TRADITIONAL
        );

        const gondorReckoning = gondorReckoningForYear(
            calendar,
            startDate,
            today
        );
        if (reckoning !== gondorReckoning) {
            reckoning = gondorReckoning;

            calendar = makeGondorCalendarDates(
                today,
                startDate,
                reckoning,
                RECKONING_RULES_TRADITIONAL
            );
        }

        const monthView = calendar.todayGondor.month;

        this.state = {
            today,
            viewDate: today,
            startDate,
            calendar,
            reckoning,
            yearView: false,
            monthView,
            monthViewLayout: MonthViewLayout.VERTICAL,
            language: LanguagePicker.QUENYA,
        };

        this.onMonthViewChange = this.onMonthViewChange.bind(this);
        this.onMonthViewLayoutChange = this.onMonthViewLayoutChange.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const today = nextProps.date || this.state.today;
        const startDate = nextProps.startDate || this.state.startDate;

        let reckoning = this.state.reckoning;
        let calendar = this.state.calendar;

        if (
            !datesMatch(startDate, this.state.startDate)
            || !datesMatch(today, this.state.today)
            || !datesMatch(today, calendar.today)
        ) {
            calendar = makeGondorCalendarDates(
                today,
                startDate,
                reckoning,
                RECKONING_RULES_TRADITIONAL
            );

            const gondorReckoning = gondorReckoningForYear(
                calendar,
                startDate,
                today
            );
            if (reckoning !== gondorReckoning) {
                reckoning = gondorReckoning;
                calendar = makeGondorCalendarDates(
                    today,
                    startDate,
                    reckoning,
                    RECKONING_RULES_TRADITIONAL
                );
            }
        }

        const monthView = calendar.todayGondor.month;

        this.setState({
            startDate,
            today,
            viewDate: today,
            calendar,
            reckoning,
            monthView,
        });
    }

    onMonthViewChange(viewDate, monthView, yearView) {
        let reckoning = this.state.reckoning;
        let calendar = this.state.calendar;

        if (!datesMatch(this.state.viewDate, viewDate)) {
            calendar = makeGondorCalendarDates(
                viewDate,
                this.state.startDate,
                reckoning,
                RECKONING_RULES_TRADITIONAL
            );

            const gondorReckoning = gondorReckoningForYear(
                calendar,
                this.state.startDate,
                viewDate
            );
            if (reckoning !== gondorReckoning) {
                reckoning = gondorReckoning;
                calendar = makeGondorCalendarDates(
                    viewDate,
                    this.state.startDate,
                    reckoning,
                    RECKONING_RULES_TRADITIONAL
                );
            }

            monthView = calendar.todayGondor.month;
        }

        this.setState({
            calendar,
            reckoning,
            viewDate,
            yearView,
            monthView,
        });
    }

    onMonthViewLayoutChange(event) {
        this.setState({ monthViewLayout: event.target.value });
    }

    onLanguageChange(event) {
        this.setState({ language: event.target.value });
    }

    render() {
        const { className, onCalendarStartChange } = this.props;
        const {
            language,
            calendar,
            startDate,
            today,
            viewDate,
            monthView,
            yearView,
            monthViewLayout,
            reckoning,
        } = this.state;

        let year = calendar.year;
        let age = "II";
        let reckoningDisplay = "Kings'";
        if (year > 3441) {
            year -= 3441;
            age = "III";

            if (year > 2059) {
                reckoningDisplay = "Stewards'";

                if (year > 3019 || reckoning === RECKONING_NEW) {
                    reckoningDisplay = "New";

                    if (year > 3020) {
                        year -= 3020;
                        age = "IV";
                    }
                }
            }
        }

        const caption = `${reckoningDisplay} Reckoning ${age} ${year}`;

        const startMonth = reckoning === RECKONING_NEW ? 3 : 0;
        const months = [];
        for (let i = startMonth; i < GondorMonths.length + startMonth; i++) {
            const gondorMonth = GondorMonths[i % 12];
            months.push({
                emoji: gondorMonth.emoji,
                name: gondorMonth[language],
            });
        }

        const firstDay = getFirstDay(calendar);
        const lastDay = getLastDay(calendar);

        return (
            <table className={className}>
                <caption className="shire-caption">{caption}</caption>
                <thead>
                    <tr>
                        <th className="gondor-calendar-controls">
                            <StartReckoningDatePicker
                                startDate={startDate}
                                onCalendarStartChange={onCalendarStartChange}
                            />
                        </th>
                        <th className="gondor-calendar-controls month-picker-container">
                            <MonthViewPicker
                                months={months}
                                firstDay={firstDay}
                                lastDay={lastDay}
                                thisMonth={calendar.todayGondor.month}
                                today={today}
                                viewDate={viewDate}
                                monthView={monthView}
                                yearView={yearView}
                                onMonthViewChange={this.onMonthViewChange}
                            />
                        </th>
                        <th className="gondor-calendar-controls">
                            <LanguagePicker
                                language={language}
                                onLanguageChange={this.onLanguageChange}
                            />
                        </th>
                        <th className="gondor-calendar-controls">
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
                            <GondorCalendar
                                className="shire-calendar gondor-calendar"
                                calendar={calendar}
                                date={today}
                                reckoning={reckoning}
                                language={language}
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

export default GondorCalendarSimulated;
