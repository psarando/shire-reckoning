/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import {
    TRADITIONAL_RULES,
    REFORMED_RULES,
    RivendellWeekdays,
    RivendellMonths,
    makeRivendellCalendarDates
} from '../RivendellReckoning';

import { fullYearDate, datesMatch } from '../Utils';

import DateCell from './DateCell';
import IntercalaryDay from './IntercalaryDay';
import WeekDayHeaderCell, { addMonthFiller } from './WeekDayHeaderCell';
import './tolkien-calendars.css';

import {
    ENGLISH,
    QUENYA,
    SINDARIN
} from './controls/LanguagePicker';

class RivendellCalendar extends Component {
    static get TRADITIONAL_RULES() { return TRADITIONAL_RULES; }
    static get REFORMED_RULES() { return REFORMED_RULES; }

    static get LANGUAGE_ENGLISH() { return ENGLISH; }
    static get LANGUAGE_QUENYA() { return QUENYA; }
    static get LANGUAGE_SINDARIN() { return SINDARIN; }

    constructor(props) {
        super(props);

        let language = props.language || QUENYA;
        let calendarRules = props.calendarRules || TRADITIONAL_RULES;
        let startDay = props.startDay || 22;
        let startDate = props.startDate || fullYearDate(1, 2, startDay);
        let today = props.date || new Date();

        let calendar = props.calendar || makeRivendellCalendarDates(today, startDate, calendarRules);
        let monthView = props.monthView === undefined ? calendar.todayRivendell.month : props.monthView;
        let yearView = !!props.yearView;

        this.state = {
            calendar: calendar,
            today: today,
            yearView: yearView,
            monthView: monthView,
            calendarRules: calendarRules,
            startDate: startDate,
            language: language
        };
    }

    componentWillReceiveProps(nextProps) {
        let today = nextProps.date || this.state.today;
        let startDate = nextProps.startDate || this.state.startDate;
        let language = nextProps.language || this.state.language;
        let calendarRules = nextProps.calendarRules || this.state.calendarRules;
        let yearView = nextProps.yearView === undefined ? this.state.yearView : nextProps.yearView;

        let calendar = this.state.calendar;
        let monthView = this.state.monthView;

        if (nextProps.startDay && !nextProps.startDate) {
            startDate = new Date(startDate);
            startDate.setDate(nextProps.startDay);
        }

        if (nextProps.calendar) {
            calendar = nextProps.calendar;
        } else if (calendarRules !== this.state.calendarRules ||
            !datesMatch(startDate, this.state.startDate) ||
            !datesMatch(today, this.state.today) ||
            !datesMatch(today, calendar.today)) {
            calendar = makeRivendellCalendarDates(today, startDate, calendarRules);
            monthView = calendar.todayRivendell.month;
        }

        monthView = nextProps.monthView === undefined ? monthView : nextProps.monthView;

        this.setState({
            today: today,
            calendar: calendar,
            calendarRules: calendarRules,
            startDate: startDate,
            language: language,
            monthView: monthView,
            yearView: yearView
        });
    }

    renderDay(date, today) {
        let language = this.state.language;

        switch (date.day) {
            case "Yestarë":
                return (
                    <IntercalaryDay key="RivendellNewYear"
                                    name={language === ENGLISH ? "First Day" : "Yestarë"}
                                    description="Rivendell New Year's Day!"
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            case "Enderë":
                return (
                    <IntercalaryDay key={"Middleday-" + date.weekDay}
                                    name={language === ENGLISH ? "Middleday" : "Enderë"}
                                    description="Middleday"
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            case "Reformed Enderë":
                return (
                    <IntercalaryDay key={"Middleday-" + date.weekDay}
                                    name={language === ENGLISH ? "Leap Middleday" : "Reformed Enderë"}
                                    description="Middleday"
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            case "Mettarë":
                return (
                    <IntercalaryDay key="RivendellNewYearsEve"
                                    name={language === ENGLISH ? "Last Day" : "Mettarë"}
                                    description="Rivendell New Year's Eve!"
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            default:
                let month = RivendellMonths[date.month];
                let weekday = RivendellWeekdays[date.weekDay];

                return (
                    <DateCell key={date.day + month[language]}
                              date={date}
                              currentDate={today}
                              month={month[language]}
                              description={month.description}
                              weekday={weekday[language]}
                              className={month.className}/>
                );
        }
    }

    renderMonth() {
        let today = this.state.today;
        let dates = this.state.calendar.dates;
        let monthView = this.state.monthView;

        let week = [];
        let weeks = [];

        let i = 0, date = dates[i];
        for (;
            i < dates.length && date.month < monthView;
            i++, date = dates[i]) {
            // seek ahead to current month view
        }

        addMonthFiller(week, date.weekDay);

        for (; i < dates.length && monthView === date.month; i++, date = dates[i]) {
            week.push(this.renderDay(date, today));

            if ((date.weekDay + 1) % 6 === 0) {
                weeks.push(<tr key={weeks.length} >{week}</tr>);
                week = [];
            }
        }

        if (monthView === 2) {
            date = dates[i];
            for (; date.day === "Enderë"; i++, date = dates[i]) {
                week.push(this.renderDay(date, today));

                if ((date.weekDay + 1) % 6 === 0) {
                    weeks.push(<tr key={weeks.length} >{week}</tr>);
                    week = [];
                }
            }
        }

        if (week.length > 0) {
            weeks.push(<tr key={weeks.length} >{week}</tr>);
        }

        return weeks;
    }

    renderYear() {
        let today = this.state.today;
        let dates = this.state.calendar.dates;

        let week = [];
        let weeks = [];

        addMonthFiller(week, dates[0].weekDay);

        for (let i = 0, date = dates[i]; i < dates.length; i++, date = dates[i]) {
            week.push(this.renderDay(date, today));

            if ((date.weekDay + 1) % 6 === 0) {
                weeks.push(<tr key={weeks.length} >{week}</tr>);
                week = [];
            }
        }

        if (week.length > 0) {
            weeks.push(<tr key={weeks.length} >{week}</tr>);
        }

        return weeks;
    }

    render() {
        let language = this.state.language;
        let weekDayHeader = (
            <tr>
                {RivendellWeekdays.map(function (weekday) {
                    let weekdayName = weekday[language];
                    return (
                        <WeekDayHeaderCell key={weekdayName}
                                           name={weekdayName}
                                           description={weekday.description} />
                    );
                })}
            </tr>
        );

        let weeks = this.state.yearView ? this.renderYear() : this.renderMonth();

        let caption = null;
        if (this.props.caption) {
            caption = (
                <caption className='rivendell-caption'>{
                    this.props.caption === true ? "Rivendell Reckoning" : this.props.caption
                }</caption>
            );
        }

        return (
            <table className={this.props.className} >
                {caption}
                <thead>
                    {weekDayHeader}
                </thead>
                <tbody>
                    {weeks}
                </tbody>
            </table>
        );
    }
}

export default RivendellCalendar;
