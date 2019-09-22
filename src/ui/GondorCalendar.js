/**
 * Copyright (C) 2016 Paul Sarando
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

import DateCell from "./DateCell";
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

const getDateColor = (reckoning, date, monthColor) => {
    if (date.className !== undefined) {
        return date.className;
    }

    if (reckoning === RECKONING_NEW && date.month === 5 && date.day === 30) {
        return "holiday";
    }

    return monthColor;
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

        let language = props.language || QUENYA;
        let calendarRules = props.calendarRules || RECKONING_RULES_GREGORIAN;
        let today = props.date || new Date();
        let monthViewLayout = props.monthViewLayout || VERTICAL;
        let reckoning = props.reckoning || RECKONING_STEWARDS;

        let startDay = props.startDay || 21;
        let startDate = props.startDate || fullYearDate(0, 11, startDay);

        let calendar =
            props.calendar
            || makeGondorCalendarDates(
                today,
                startDate,
                reckoning,
                calendarRules
            );
        let monthView =
            props.monthView === undefined
                ? calendar.todayGondor.month
                : props.monthView;
        let yearView = !!props.yearView;

        this.state = {
            startDate: startDate,
            calendar: calendar,
            today: today,
            yearView: yearView,
            monthView: monthView,
            monthViewLayout: monthViewLayout,
            reckoning: reckoning,
            calendarRules: calendarRules,
            language: language,
        };
    }

    componentWillReceiveProps(nextProps) {
        let today = nextProps.date || this.state.today;
        let startDate = nextProps.startDate || this.state.startDate;
        let language = nextProps.language || this.state.language;
        let reckoning = nextProps.reckoning || this.state.reckoning;
        let monthViewLayout =
            nextProps.monthViewLayout || this.state.monthViewLayout;
        let calendarRules = nextProps.calendarRules || this.state.calendarRules;
        let yearView =
            nextProps.yearView === undefined
                ? this.state.yearView
                : nextProps.yearView;

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
            today: today,
            calendar: calendar,
            language: language,
            calendarRules: calendarRules,
            reckoning: reckoning,
            startDate: startDate,
            monthViewLayout: monthViewLayout,
            monthView: monthView,
            yearView: yearView,
        });
    }

    renderDay(date, today) {
        let language = this.state.language;
        let reckoning = this.state.reckoning;
        let isNewReckoning = reckoning === RECKONING_NEW;

        let reckoningDesc = isNewReckoning
            ? "New Reckoning"
            : reckoning === RECKONING_KINGS
            ? "Kings' Reckoning"
            : "Stewards' Reckoning";

        switch (date.day) {
            case "Yestarë":
                return (
                    <IntercalaryDay
                        key="GondorianNewYear"
                        name={language === ENGLISH ? "First Day" : "Yestarë"}
                        description={reckoningDesc + " New Year's Day!"}
                        currentDate={today}
                        gregorian={date.gregorian}
                    />
                );

            case "Tuilérë":
                return (
                    <IntercalaryDay
                        key="Stewards-Midspring"
                        name={language === ENGLISH ? "Spring-day" : "Tuilérë"}
                        description="Stewards' Midspring Day"
                        currentDate={today}
                        gregorian={date.gregorian}
                    />
                );

            case "Cormarë":
                return (
                    <IntercalaryDay
                        key={"Gondorian-Leapday" + date.weekDay}
                        name={language === ENGLISH ? "Ringday" : "Cormarë"}
                        description="Ring-bearer's Day"
                        currentDate={today}
                        gregorian={date.gregorian}
                    />
                );

            case "Loëndë":
                return (
                    <IntercalaryDay
                        key={"Gondorian-Midyear" + date.weekDay}
                        name={language === ENGLISH ? "Midyear's Day" : "Loëndë"}
                        description="Midyear's Day"
                        currentDate={today}
                        gregorian={date.gregorian}
                    />
                );

            case "Enderë":
                return (
                    <IntercalaryDay
                        key={"GondorianMiddleday-" + date.weekDay}
                        name={language === ENGLISH ? "Middleday" : "Enderë"}
                        description="Middleday"
                        currentDate={today}
                        gregorian={date.gregorian}
                    />
                );

            case "Yáviérë":
                return (
                    <IntercalaryDay
                        key={"Stewards-Midautumn"}
                        name={language === ENGLISH ? "Autumn-day" : "Yáviérë"}
                        description="Stewards' Midautumn Day"
                        currentDate={today}
                        gregorian={date.gregorian}
                    />
                );

            case "Mettarë":
                return (
                    <IntercalaryDay
                        key="GondorianNewYearsEve"
                        name={language === ENGLISH ? "Last Day" : "Mettarë"}
                        description={reckoningDesc + " New Year's Eve!"}
                        currentDate={today}
                        gregorian={date.gregorian}
                    />
                );

            default:
                let startMonth = isNewReckoning ? 3 : 0;
                let month = GondorMonths[(date.month + startMonth) % 12];
                let weekday = GondorWeekdays[date.weekDay];
                let className = getDateColor(reckoning, date, month.className);

                return (
                    <DateCell
                        key={date.day + month[language]}
                        date={date}
                        currentDate={today}
                        month={month[language]}
                        description={month.description}
                        weekday={weekday[language]}
                        className={className}
                    />
                );
        }
    }

    renderMonth() {
        let today = this.state.today;
        let dates = this.state.calendar.dates;
        let monthView = this.state.monthView;

        let week = [];
        let weeks = [];

        let i = 0,
            date = dates[i];
        for (
            ;
            i < dates.length && date.month !== monthView;
            i++, date = dates[i]
        ) {
            // seek ahead to current month view
        }

        addMonthFiller(week, date.weekDay);

        for (
            ;
            i < dates.length && monthView === date.month;
            i++, date = dates[i]
        ) {
            week.push(this.renderDay(date, today));

            if ((date.weekDay + 1) % 7 === 0) {
                weeks.push(<tr key={weeks.length}>{week}</tr>);
                week = [];
            }
        }

        // eslint-disable-next-line
        switch (monthView) {
            // no default case required
            case 2:
                if (date.day === "Tuilérë") {
                    week.push(this.renderDay(date, today));
                }

                break;

            case 5:
                date = dates[i];
                for (
                    ;
                    date.day === "Enderë" || date.day === "Loëndë";
                    i++, date = dates[i]
                ) {
                    week.push(this.renderDay(date, today));

                    if ((date.weekDay + 1) % 7 === 0) {
                        weeks.push(<tr key={weeks.length}>{week}</tr>);
                        week = [];
                    }
                }

                break;

            case 8:
                if (date.day === "Yáviérë") {
                    week.push(this.renderDay(date, today));
                }

                break;
        }

        if (week.length > 0) {
            weeks.push(<tr key={weeks.length}>{week}</tr>);
        }

        return weeks;
    }

    renderMonthVertical() {
        let today = this.state.today;
        let dates = this.state.calendar.dates;
        let monthView = this.state.monthView;
        let language = this.state.language;

        let weeks = GondorWeekdays.map(function(weekday) {
            let weekdayName = weekday[language];
            return [
                <WeekDayHeaderCell
                    key={weekdayName}
                    name={weekdayName}
                    description={weekday.description}
                    colSpan="2"
                />,
            ];
        });

        let i = 0,
            date = dates[i];
        for (
            ;
            i < dates.length && date.month !== monthView;
            i++, date = dates[i]
        ) {
            // seek ahead to current month view
        }

        addVerticalMonthFiller(weeks, date.weekDay);

        for (
            ;
            i < dates.length && monthView === date.month;
            i++, date = dates[i]
        ) {
            weeks[date.weekDay].push(this.renderDay(date, today));
        }

        // eslint-disable-next-line
        switch (monthView) {
            // no default case required
            case 2:
                if (date.day === "Tuilérë") {
                    weeks[date.weekDay].push(this.renderDay(date, today));
                }

                break;

            case 5:
                date = dates[i];
                for (
                    ;
                    date.day === "Enderë" || date.day === "Loëndë";
                    i++, date = dates[i]
                ) {
                    weeks[date.weekDay].push(this.renderDay(date, today));
                }

                break;
            case 8:
                if (date.day === "Yáviérë") {
                    weeks[date.weekDay].push(this.renderDay(date, today));
                }

                break;
        }

        if (weeks[0].length > 6) {
            weeks = GondorWeekdays.map(function(weekday, i) {
                let week = weeks[i];
                let weekdayName = weekday[language];

                week.shift();
                week.unshift(
                    <WeekDayHeaderCell
                        key={weekdayName}
                        name={weekdayName}
                        description={weekday.description}
                    />
                );

                return week;
            });
        }

        return weeks.map(function(week, i) {
            return <tr key={i}>{week}</tr>;
        });
    }

    renderYear() {
        let today = this.state.today;
        let dates = this.state.calendar.dates;

        let week = [];
        let weeks = [];

        addMonthFiller(week, dates[0].weekDay);

        for (
            let i = 0, date = dates[i];
            i < dates.length;
            i++, date = dates[i]
        ) {
            week.push(this.renderDay(date, today));

            if ((date.weekDay + 1) % 7 === 0) {
                weeks.push(<tr key={weeks.length}>{week}</tr>);
                week = [];
            }
        }

        if (week.length > 0) {
            weeks.push(<tr key={weeks.length}>{week}</tr>);
        }

        return weeks;
    }

    render() {
        let language = this.state.language;
        let weekDayHeader = (
            <tr>
                {GondorWeekdays.map(function(weekday) {
                    let weekdayName = weekday[language];
                    return (
                        <WeekDayHeaderCell
                            key={weekdayName}
                            name={weekdayName}
                            description={weekday.description}
                        />
                    );
                })}
            </tr>
        );

        let weeks;
        if (this.state.yearView) {
            weeks = this.renderYear();
        } else if (this.state.monthViewLayout === VERTICAL) {
            weeks = this.renderMonthVertical();
            weekDayHeader = <VerticalLayoutFiller weekdays={GondorWeekdays} />;
        } else {
            weeks = this.renderMonth();
        }

        let caption = null;
        if (this.props.caption) {
            let captionDisplay = this.props.caption;
            if (this.props.caption === true) {
                switch (this.state.reckoning) {
                    case RECKONING_KINGS:
                        captionDisplay = "Kings' Reckoning";
                        break;
                    case RECKONING_STEWARDS:
                        captionDisplay = "Stewards' Reckoning";
                        break;
                    case RECKONING_NEW:
                        captionDisplay = "New Reckoning";
                        break;
                    default:
                        captionDisplay = "Gondor Reckoning";
                        break;
                }
            }

            caption = (
                <caption className="gondor-caption">{captionDisplay}</caption>
            );
        }

        return (
            <table className={this.props.className}>
                {caption}
                <thead>{weekDayHeader}</thead>
                <tbody>{weeks}</tbody>
            </table>
        );
    }
}

export default GondorCalendar;
