/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import {
    TRADITIONAL_RULES,
    REFORMED_RULES,
    RivendellWeekdays,
    RivendellMonths,
    RivendellHolidays,
    makeRivendellCalendarDates,
} from "../RivendellReckoning";

import { fullYearDate, datesMatch } from "../Utils";

import DateCell, { dateKey } from "./DateCell";
import IntercalaryDay from "./IntercalaryDay";
import WeekDayHeaderCell, {
    addMonthFiller,
    addVerticalMonthFiller,
} from "./WeekDayHeaderCell";
import "./tolkien-calendars.css";

import { ENGLISH, QUENYA, SINDARIN } from "./controls/LanguagePicker";

import {
    VerticalLayoutFiller,
    VERTICAL,
    HORIZONTAL,
} from "./controls/MonthViewLayout";

const RivendellDate = ({ date, today, language }) => {
    switch (date.day) {
        case "Yestarë":
        case "Enderë":
        case "Reformed Enderë":
        case "Mettarë":
            const holiday = RivendellHolidays[date.day];

            return (
                <IntercalaryDay
                    name={holiday[language]}
                    description={holiday.description}
                    currentDate={today}
                    gregorian={date.gregorian}
                />
            );

        default:
            const month = RivendellMonths[date.month];
            const weekday = RivendellWeekdays[date.weekDay];
            const className =
                date.className === undefined ? month.className : date.className;

            return (
                <DateCell
                    date={date}
                    currentDate={today}
                    month={month[language]}
                    emoji={month.emoji}
                    description={month.description}
                    weekday={weekday[language]}
                    className={className}
                />
            );
    }
};

const RivendellMonth = ({ monthView, dates, today, language }) => {
    const weeks = [];
    let week = [];

    let i = 0,
        date = dates[i],
        endere = 1;

    for (; i < dates.length && date.month < monthView; i++, date = dates[i]) {
        // seek ahead to current month view
    }

    addMonthFiller(week, date.weekDay);

    for (; i < dates.length && monthView === date.month; i++, date = dates[i]) {
        week.push(
            <RivendellDate
                key={dateKey(date, date.day === "Enderë" ? endere++ : "")}
                date={date}
                today={today}
                language={language}
            />
        );

        if ((date.weekDay + 1) % 6 === 0) {
            weeks.push(<tr key={weeks.length}>{week}</tr>);
            week = [];
        }
    }

    if (monthView === 2) {
        date = dates[i];
        for (; date.day === "Enderë"; i++, date = dates[i]) {
            week.push(
                <RivendellDate
                    key={dateKey(date, endere++)}
                    date={date}
                    today={today}
                    language={language}
                />
            );

            if ((date.weekDay + 1) % 6 === 0) {
                weeks.push(<tr key={weeks.length}>{week}</tr>);
                week = [];
            }
        }
    }

    if (week.length > 0) {
        weeks.push(<tr key={weeks.length}>{week}</tr>);
    }

    return weeks;
};

const RivendellMonthVertical = ({ monthView, dates, today, language }) => {
    const weeks = RivendellWeekdays.map(function (weekday) {
        const weekdayName = weekday[language];
        return [
            <WeekDayHeaderCell
                key={weekdayName}
                emoji={weekday.emoji}
                name={weekdayName}
                description={weekday.description}
                colSpan="2"
                scope="row"
            />,
        ];
    });

    let i = 0,
        date = dates[i],
        endere = 1;

    for (; i < dates.length && date.month < monthView; i++, date = dates[i]) {
        // seek ahead to current month view
    }

    addVerticalMonthFiller(weeks, date.weekDay);

    for (; i < dates.length && monthView === date.month; i++, date = dates[i]) {
        weeks[date.weekDay].push(
            <RivendellDate
                key={dateKey(date, date.day === "Enderë" ? endere++ : "")}
                date={date}
                today={today}
                language={language}
            />
        );
    }

    if (monthView === 2) {
        date = dates[i];
        for (; date.day === "Enderë"; i++, date = dates[i]) {
            weeks[date.weekDay].push(
                <RivendellDate
                    key={dateKey(date, endere++)}
                    date={date}
                    today={today}
                    language={language}
                />
            );
        }
    }

    return weeks.map(function (week, i) {
        return <tr key={i}>{week}</tr>;
    });
};

const RivendellYear = ({ dates, today, language }) => {
    const weeks = [];
    let week = [],
        endere = 1;

    addMonthFiller(week, dates[0].weekDay);

    for (let i = 0, date = dates[i]; i < dates.length; i++, date = dates[i]) {
        week.push(
            <RivendellDate
                key={dateKey(date, date.day === "Enderë" ? endere++ : "")}
                date={date}
                today={today}
                language={language}
            />
        );

        if ((date.weekDay + 1) % 6 === 0) {
            weeks.push(<tr key={weeks.length}>{week}</tr>);
            week = [];
        }
    }

    if (week.length > 0) {
        weeks.push(<tr key={weeks.length}>{week}</tr>);
    }

    return weeks;
};

class RivendellCalendar extends Component {
    static get TRADITIONAL_RULES() {
        return TRADITIONAL_RULES;
    }
    static get REFORMED_RULES() {
        return REFORMED_RULES;
    }

    static get LANGUAGE_ENGLISH() {
        return ENGLISH;
    }
    static get LANGUAGE_QUENYA() {
        return QUENYA;
    }
    static get LANGUAGE_SINDARIN() {
        return SINDARIN;
    }

    static get MONTH_VIEW_VERTICAL() {
        return VERTICAL;
    }
    static get MONTH_VIEW_HORIZONTAL() {
        return HORIZONTAL;
    }

    constructor(props) {
        super(props);

        const language = props.language || QUENYA;
        const monthViewLayout = props.monthViewLayout || HORIZONTAL;
        const calendarRules = props.calendarRules || TRADITIONAL_RULES;
        const startDay = props.startDay || 22;
        const startDate = props.startDate || fullYearDate(1, 2, startDay);
        const today = props.date || new Date();

        const calendar =
            props.calendar
            || makeRivendellCalendarDates(today, startDate, calendarRules);
        const monthView =
            props.monthView === undefined
                ? calendar.todayRivendell.month
                : props.monthView;
        const yearView = !!props.yearView;

        this.state = {
            calendar,
            today,
            yearView,
            monthView,
            monthViewLayout,
            calendarRules,
            startDate,
            language,
        };
    }

    componentWillReceiveProps(nextProps) {
        const today = nextProps.date || this.state.today;
        const language = nextProps.language || this.state.language;
        const monthViewLayout =
            nextProps.monthViewLayout || this.state.monthViewLayout;
        const calendarRules =
            nextProps.calendarRules || this.state.calendarRules;
        const yearView =
            nextProps.yearView === undefined
                ? this.state.yearView
                : nextProps.yearView;

        let startDate = nextProps.startDate || this.state.startDate;
        let calendar = this.state.calendar;
        let monthView = this.state.monthView;

        if (nextProps.startDay && !nextProps.startDate) {
            startDate = new Date(startDate);
            startDate.setDate(nextProps.startDay);
        }

        if (nextProps.calendar) {
            calendar = nextProps.calendar;
        } else if (
            calendarRules !== this.state.calendarRules
            || !datesMatch(startDate, this.state.startDate)
            || !datesMatch(today, this.state.today)
            || !datesMatch(today, calendar.today)
        ) {
            calendar = makeRivendellCalendarDates(
                today,
                startDate,
                calendarRules
            );
            monthView = calendar.todayRivendell.month;
        }

        monthView =
            nextProps.monthView === undefined ? monthView : nextProps.monthView;

        this.setState({
            today,
            calendar,
            calendarRules,
            startDate,
            language,
            monthViewLayout,
            monthView,
            yearView,
        });
    }

    render() {
        const { caption, className } = this.props;
        const {
            calendar: { dates },
            language,
            monthView,
            monthViewLayout,
            today,
            yearView,
        } = this.state;

        let weekDayHeader = (
            <tr>
                {RivendellWeekdays.map(function (weekday) {
                    let weekdayName = weekday[language];
                    return (
                        <WeekDayHeaderCell
                            key={weekdayName}
                            emoji={weekday.emoji}
                            name={weekdayName}
                            description={weekday.description}
                            scope="col"
                        />
                    );
                })}
            </tr>
        );

        let weeks;
        if (yearView) {
            weeks = (
                <RivendellYear
                    dates={dates}
                    today={today}
                    language={language}
                />
            );
        } else if (monthViewLayout === VERTICAL) {
            weeks = (
                <RivendellMonthVertical
                    monthView={monthView}
                    dates={dates}
                    today={today}
                    language={language}
                />
            );
            weekDayHeader = (
                <VerticalLayoutFiller weekdays={RivendellWeekdays} />
            );
        } else {
            weeks = (
                <RivendellMonth
                    monthView={monthView}
                    dates={dates}
                    today={today}
                    language={language}
                />
            );
        }

        return (
            <table className={className}>
                {caption && (
                    <caption className="rivendell-caption">
                        {caption === true ? "Rivendell Reckoning" : caption}
                    </caption>
                )}
                <thead>{weekDayHeader}</thead>
                <tbody>{weeks}</tbody>
            </table>
        );
    }
}

export default RivendellCalendar;
