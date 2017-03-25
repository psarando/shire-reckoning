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

import LanguagePicker from './controls/LanguagePicker';
import MonthViewPicker from './controls/MonthViewPicker';
import StartDatePicker from './controls/StartDatePicker';

class RivendellCalendar extends Component {
    static get TRADITIONAL_RULES() { return TRADITIONAL_RULES; }
    static get REFORMED_RULES() { return REFORMED_RULES; }

    static get LANGUAGE_ENGLISH() { return LanguagePicker.ENGLISH; }
    static get LANGUAGE_QUENYA() { return LanguagePicker.QUENYA; }
    static get LANGUAGE_SINDARIN() { return LanguagePicker.SINDARIN; }

    constructor(props) {
        super(props);

        let calendarControls = props.calendarControls !== false;
        let language = props.language || LanguagePicker.QUENYA;
        let calendarRules = props.calendarRules || TRADITIONAL_RULES;
        let startDay = props.startDay || 22;
        let startDate = props.startDate || fullYearDate(1, 2, startDay);
        let today = props.date || new Date();

        let calendar = makeRivendellCalendarDates(today, startDate, calendarRules);
        let monthView = props.yearView ? -1 : calendar.todayRivendell.month;

        this.state = {
            calendarControls: calendarControls,
            calendar: calendar,
            today: today,
            monthView: monthView,
            calendarRules: calendarRules,
            startDate: startDate,
            language: language
        };

        this.makeCalendarDates     = this.makeCalendarDates.bind(this);
        this.onMonthViewChange     = this.onMonthViewChange.bind(this);
        this.onViewCalendarMonth   = this.onViewCalendarMonth.bind(this);
        this.onCalendarStartChange = this.onCalendarStartChange.bind(this);
        this.onCalendarRulesChange = this.onCalendarRulesChange.bind(this);
        this.onLanguageChange      = this.onLanguageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let today = nextProps.date || this.state.today;
        let startDate = nextProps.startDate || this.state.startDate;
        let language = nextProps.language || this.state.language;
        let calendarRules = nextProps.calendarRules || this.state.calendarRules;
        let calendar = this.state.calendar;

        if (nextProps.startDay && !nextProps.startDate) {
            startDate.setDate(nextProps.startDay);
        }

        if (!datesMatch(startDate, this.state.startDate) ||
            !datesMatch(today, this.state.today) ||
            !datesMatch(today, calendar.today)) {
            calendar = makeRivendellCalendarDates(today, startDate, calendarRules);
        }

        this.setState({
            today: today,
            calendar: calendar,
            calendarRules: calendarRules,
            startDate: startDate,
            language: language,
            monthView: this.state.monthView < 0 || nextProps.yearView ? -1 : calendar.todayRivendell.month
        });
    }

    makeCalendarDates(today, startDate) {
        return makeRivendellCalendarDates(today, startDate, this.state.calendarRules);
    }

    onMonthViewChange(calendar, monthView) {
        this.setState({
            calendar: calendar,
            monthView: monthView
        });
    }

    onViewCalendarMonth(calendar) {
        this.setState({
            calendar: calendar,
            monthView: calendar.todayRivendell.month
        });
    }

    onCalendarStartChange(startDate) {
        let calendar = makeRivendellCalendarDates(this.state.calendar.today, startDate, this.state.calendarRules);

        this.setState({
            startDate: startDate,
            calendar: calendar
        });
    }

    onCalendarRulesChange(event) {
        let calendarRules = event.target.value;
        let startDay = calendarRules === REFORMED_RULES ? 25 : 22;
        let startDate = this.state.startDate;
        startDate.setDate(startDay);
        let calendar = makeRivendellCalendarDates(this.state.calendar.today, startDate, calendarRules);

        this.setState({
            calendarRules: calendarRules,
            startDate: startDate,
            calendar: calendar
        });
    }

    onLanguageChange(event) {
        this.setState({language: event.target.value});
    }

    renderDay(date, today) {
        let language = this.state.language;

        switch (date.day) {
            case "Yestarë":
                return (
                    <IntercalaryDay key="RivendellNewYear"
                                    name={language === LanguagePicker.ENGLISH ? "First Day" : "Yestarë"}
                                    description="Rivendell New Year's Day!"
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            case "Enderë":
                return (
                    <IntercalaryDay key={"Middleday-" + date.weekDay}
                                    name={language === LanguagePicker.ENGLISH ? "Middleday" : "Enderë"}
                                    description="Middleday"
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            case "Reformed Enderë":
                return (
                    <IntercalaryDay key={"Middleday-" + date.weekDay}
                                    name={language === LanguagePicker.ENGLISH ? "Leap Middleday" : "Reformed Enderë"}
                                    description="Middleday"
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            case "Mettarë":
                return (
                    <IntercalaryDay key="RivendellNewYearsEve"
                                    name={language === LanguagePicker.ENGLISH ? "Last Day" : "Mettarë"}
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

        for (; i < dates.length && (monthView < 0 || monthView === date.month); i++, date = dates[i]) {
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

    renderCalendarControls() {
        let language = this.state.language;
        let monthNames = RivendellMonths.map(function(month) {
            return month[language];
        });

        return (
            <tr>
                <td className='rivendell-calendar-controls' colSpan='2'>
                    <StartDatePicker month="March"
                                     startRange={19}
                                     endRange={29}
                                     startDate={this.state.startDate}
                                     onCalendarStartChange={this.onCalendarStartChange} />
                    <select className="rivendell-rules-select"
                            value={this.state.calendarRules}
                            onChange={this.onCalendarRulesChange} >
                        <option value={TRADITIONAL_RULES}>Traditional Rules</option>
                        <option value={REFORMED_RULES}>Reformed Rules</option>
                    </select>
                </td>
                <td className='rivendell-calendar-controls month-picker-container' colSpan='3'>
                    <MonthViewPicker monthNames={monthNames}
                                     monthLabel="Season"
                                     today={this.state.today}
                                     calendar={this.state.calendar}
                                     startDate={this.state.startDate}
                                     monthView={this.state.monthView}
                                     makeCalendarDates={this.makeCalendarDates}
                                     onMonthViewChange={this.onMonthViewChange}
                                     onViewCalendarMonth={this.onViewCalendarMonth} />
                </td>
                <td className='rivendell-calendar-controls' >
                    <LanguagePicker language={this.state.language}
                                    onLanguageChange={this.onLanguageChange} />
                </td>
            </tr>
        );
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

        let weeks = this.state.monthView < 0 ? this.renderYear() : this.renderMonth();

        let controls = this.state.calendarControls ? this.renderCalendarControls() : null;
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
                    {controls}
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
