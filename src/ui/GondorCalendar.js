/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import {
    RECKONING_KINGS,
    RECKONING_STEWARDS,
    RECKONING_NEW,
    RECKONING_RULES_TRADITIONAL,
    RECKONING_RULES_GREGORIAN,
    GondorWeekdays,
    GondorMonths,
    makeGondorCalendarDates,
} from "../GondorReckoning";

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

const defaultCaption = reckoning => {
    switch (reckoning) {
        case RECKONING_KINGS:
            return "Kings' Reckoning";
        case RECKONING_STEWARDS:
            return "Stewards' Reckoning";
        case RECKONING_NEW:
            return "New Reckoning";
        default:
            // should never happen
            return "Gondor Reckoning";
    }
};

const getDateColor = (reckoning, date, monthColor) => {
    if (date.className !== undefined) {
        return date.className;
    }

    if (reckoning === RECKONING_NEW && date.month === 5 && date.day === 30) {
        return "holiday";
    }

    return monthColor;
};

const GondorDate = ({ date, today, language, reckoning }) => {
    const isNewReckoning = reckoning === RECKONING_NEW;

    const reckoningDesc = isNewReckoning
        ? "New Reckoning"
        : reckoning === RECKONING_KINGS
        ? "Kings' Reckoning"
        : "Stewards' Reckoning";

    switch (date.day) {
        case "Yestarë":
            return (
                <IntercalaryDay
                    name={language === ENGLISH ? "First Day" : "Yestarë"}
                    description={reckoningDesc + " New Year's Day!"}
                    currentDate={today}
                    gregorian={date.gregorian}
                />
            );

        case "Tuilérë":
            return (
                <IntercalaryDay
                    name={language === ENGLISH ? "Spring-day" : "Tuilérë"}
                    description="Stewards' Midspring Day"
                    currentDate={today}
                    gregorian={date.gregorian}
                />
            );

        case "Cormarë":
            return (
                <IntercalaryDay
                    name={language === ENGLISH ? "Ringday" : "Cormarë"}
                    description="Ring-bearer's Day"
                    currentDate={today}
                    gregorian={date.gregorian}
                />
            );

        case "Loëndë":
            return (
                <IntercalaryDay
                    name={language === ENGLISH ? "Midyear's Day" : "Loëndë"}
                    description="Midyear's Day"
                    currentDate={today}
                    gregorian={date.gregorian}
                />
            );

        case "Enderë":
            return (
                <IntercalaryDay
                    name={language === ENGLISH ? "Middleday" : "Enderë"}
                    description="Middleday"
                    currentDate={today}
                    gregorian={date.gregorian}
                />
            );

        case "Yáviérë":
            return (
                <IntercalaryDay
                    name={language === ENGLISH ? "Autumn-day" : "Yáviérë"}
                    description="Stewards' Midautumn Day"
                    currentDate={today}
                    gregorian={date.gregorian}
                />
            );

        case "Mettarë":
            return (
                <IntercalaryDay
                    name={language === ENGLISH ? "Last Day" : "Mettarë"}
                    description={reckoningDesc + " New Year's Eve!"}
                    currentDate={today}
                    gregorian={date.gregorian}
                />
            );

        default:
            const startMonth = isNewReckoning ? 3 : 0;
            const month = GondorMonths[(date.month + startMonth) % 12];
            const weekday = GondorWeekdays[date.weekDay];
            const className = getDateColor(reckoning, date, month.className);

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

const GondorMonth = ({ monthView, dates, today, language, reckoning }) => {
    const weeks = [];
    let week = [];

    let i = 0,
        date = dates[i],
        endere = 1;

    for (; i < dates.length && date.month !== monthView; i++, date = dates[i]) {
        // seek ahead to current month view
    }

    addMonthFiller(week, date.weekDay);

    for (; i < dates.length && monthView === date.month; i++, date = dates[i]) {
        week.push(
            <GondorDate
                key={dateKey(date, date.day === "Enderë" ? endere++ : "")}
                date={date}
                today={today}
                language={language}
                reckoning={reckoning}
            />
        );

        if ((date.weekDay + 1) % 7 === 0) {
            weeks.push(<tr key={weeks.length}>{week}</tr>);
            week = [];
        }
    }

    switch (monthView) {
        case 2:
            if (date.day === "Tuilérë") {
                week.push(
                    <GondorDate
                        key={dateKey(date)}
                        date={date}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                );
            }

            break;

        case 5:
            date = dates[i];
            for (
                ;
                date.day === "Enderë" || date.day === "Loëndë";
                i++, date = dates[i]
            ) {
                week.push(
                    <GondorDate
                        key={dateKey(
                            date,
                            date.day === "Enderë" ? endere++ : ""
                        )}
                        date={date}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                );

                if ((date.weekDay + 1) % 7 === 0) {
                    weeks.push(<tr key={weeks.length}>{week}</tr>);
                    week = [];
                }
            }

            break;

        case 8:
            if (date.day === "Yáviérë") {
                week.push(
                    <GondorDate
                        key={dateKey(date)}
                        date={date}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                );
            }

            break;

        default:
            break;
    }

    if (week.length > 0) {
        weeks.push(<tr key={weeks.length}>{week}</tr>);
    }

    return weeks;
};

const GondorMonthVertical = ({
    monthView,
    dates,
    today,
    language,
    reckoning,
}) => {
    let weeks = GondorWeekdays.map(function(weekday) {
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

    for (; i < dates.length && date.month !== monthView; i++, date = dates[i]) {
        // seek ahead to current month view
    }

    addVerticalMonthFiller(weeks, date.weekDay);

    for (; i < dates.length && monthView === date.month; i++, date = dates[i]) {
        weeks[date.weekDay].push(
            <GondorDate
                key={dateKey(date, date.day === "Enderë" ? endere++ : "")}
                date={date}
                today={today}
                language={language}
                reckoning={reckoning}
            />
        );
    }

    switch (monthView) {
        case 2:
            if (date.day === "Tuilérë") {
                weeks[date.weekDay].push(
                    <GondorDate
                        key={dateKey(date)}
                        date={date}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                );
            }

            break;

        case 5:
            date = dates[i];
            for (
                ;
                date.day === "Enderë" || date.day === "Loëndë";
                i++, date = dates[i]
            ) {
                weeks[date.weekDay].push(
                    <GondorDate
                        key={dateKey(
                            date,
                            date.day === "Enderë" ? endere++ : ""
                        )}
                        date={date}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                );
            }

            break;
        case 8:
            if (date.day === "Yáviérë") {
                weeks[date.weekDay].push(
                    <GondorDate
                        key={dateKey(date)}
                        date={date}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                );
            }

            break;

        default:
            break;
    }

    if (weeks[0].length > 6) {
        weeks = GondorWeekdays.map(function(weekday, i) {
            const week = weeks[i];
            const weekdayName = weekday[language];

            week.shift();
            week.unshift(
                <WeekDayHeaderCell
                    key={weekdayName}
                    emoji={weekday.emoji}
                    name={weekdayName}
                    description={weekday.description}
                    scope="row"
                />
            );

            return week;
        });
    }

    return weeks.map(function(week, i) {
        return <tr key={i}>{week}</tr>;
    });
};

const GondorYear = ({ dates, today, language, reckoning }) => {
    const weeks = [];
    let week = [],
        endere = 1;

    addMonthFiller(week, dates[0].weekDay);

    for (let i = 0, date = dates[i]; i < dates.length; i++, date = dates[i]) {
        week.push(
            <GondorDate
                key={dateKey(date, date.day === "Enderë" ? endere++ : "")}
                date={date}
                today={today}
                language={language}
                reckoning={reckoning}
            />
        );

        if ((date.weekDay + 1) % 7 === 0) {
            weeks.push(<tr key={weeks.length}>{week}</tr>);
            week = [];
        }
    }

    if (week.length > 0) {
        weeks.push(<tr key={weeks.length}>{week}</tr>);
    }

    return weeks;
};

class GondorCalendar extends Component {
    static get RECKONING_KINGS() {
        return RECKONING_KINGS;
    }
    static get RECKONING_STEWARDS() {
        return RECKONING_STEWARDS;
    }
    static get RECKONING_NEW() {
        return RECKONING_NEW;
    }

    static get RECKONING_RULES_TRADITIONAL() {
        return RECKONING_RULES_TRADITIONAL;
    }
    static get RECKONING_RULES_GREGORIAN() {
        return RECKONING_RULES_GREGORIAN;
    }

    static get MONTH_VIEW_VERTICAL() {
        return VERTICAL;
    }
    static get MONTH_VIEW_HORIZONTAL() {
        return HORIZONTAL;
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

    constructor(props) {
        super(props);

        const language = props.language || QUENYA;
        const calendarRules = props.calendarRules || RECKONING_RULES_GREGORIAN;
        const today = props.date || new Date();
        const monthViewLayout = props.monthViewLayout || VERTICAL;
        const reckoning = props.reckoning || RECKONING_STEWARDS;

        const startDay = props.startDay || 21;
        const startDate = props.startDate || fullYearDate(0, 11, startDay);

        const calendar =
            props.calendar
            || makeGondorCalendarDates(
                today,
                startDate,
                reckoning,
                calendarRules
            );
        const monthView =
            props.monthView === undefined
                ? calendar.todayGondor.month
                : props.monthView;
        const yearView = !!props.yearView;

        this.state = {
            startDate,
            calendar,
            today,
            yearView,
            monthView,
            monthViewLayout,
            reckoning,
            calendarRules,
            language,
        };
    }

    componentWillReceiveProps(nextProps) {
        const today = nextProps.date || this.state.today;
        const language = nextProps.language || this.state.language;
        const reckoning = nextProps.reckoning || this.state.reckoning;
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
            calendar = makeGondorCalendarDates(
                today,
                startDate,
                reckoning,
                calendarRules
            );
            monthView = calendar.todayGondor.month;
        }

        monthView =
            nextProps.monthView === undefined ? monthView : nextProps.monthView;

        this.setState({
            today,
            calendar,
            language,
            calendarRules,
            reckoning,
            startDate,
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
            reckoning,
            today,
            yearView,
        } = this.state;

        let weekDayHeader = (
            <tr>
                {GondorWeekdays.map(function(weekday) {
                    const weekdayName = weekday[language];
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
                <GondorYear
                    dates={dates}
                    today={today}
                    language={language}
                    reckoning={reckoning}
                />
            );
        } else if (monthViewLayout === VERTICAL) {
            weeks = (
                <GondorMonthVertical
                    monthView={monthView}
                    dates={dates}
                    today={today}
                    language={language}
                    reckoning={reckoning}
                />
            );
            weekDayHeader = <VerticalLayoutFiller weekdays={GondorWeekdays} />;
        } else {
            weeks = (
                <GondorMonth
                    monthView={monthView}
                    dates={dates}
                    today={today}
                    language={language}
                    reckoning={reckoning}
                />
            );
        }

        return (
            <table className={className}>
                {caption && (
                    <caption className="gondor-caption">
                        {caption === true ? defaultCaption(reckoning) : caption}
                    </caption>
                )}
                <thead>{weekDayHeader}</thead>
                <tbody>{weeks}</tbody>
            </table>
        );
    }
}

export default GondorCalendar;
export { defaultCaption };
