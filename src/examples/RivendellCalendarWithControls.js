/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import {
    TRADITIONAL_RULES,
    REFORMED_RULES,
    RivendellMonths,
    makeRivendellCalendarDates
} from '../RivendellReckoning';

import { fullYearDate, datesMatch } from '../Utils';

import RivendellCalendar from '../ui/RivendellCalendar';
import '../ui/tolkien-calendars.css';

import LanguagePicker from './controls/LanguagePicker';
import MonthViewPicker from './controls/MonthViewPicker';
import StartDatePicker from './controls/StartDatePicker';

class RivendellCalendarWithControls extends Component {
    constructor(props) {
        super(props);

        let calendarControls = props.calendarControls !== false;
        let language         = props.language || LanguagePicker.QUENYA;
        let calendarRules    = props.calendarRules || RivendellCalendar.TRADITIONAL_RULES;
        let startDay         = props.startDay || 22;
        let startDate        = props.startDate || fullYearDate(1, 2, startDay);
        let today            = props.date || new Date();
        let yearView         = !!props.yearView;

        let calendar = makeRivendellCalendarDates(today, startDate, calendarRules);
        let monthView = calendar.todayRivendell.month;

        this.state = {
            calendarControls,
            calendar,
            today,
            viewDate: today,
            yearView,
            monthView,
            calendarRules,
            startDate,
            language,
        };

        this.onMonthViewChange     = this.onMonthViewChange.bind(this);
        this.onLanguageChange      = this.onLanguageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let today = nextProps.date || this.state.today;
        let startDate = nextProps.startDate || this.state.startDate;
        let yearView = nextProps.yearView || this.state.yearView;
        let calendarRules = nextProps.calendarRules || this.state.calendarRules;

        let calendar = this.state.calendar;

        if (nextProps.startDay && !nextProps.startDate) {
            startDate = new Date(startDate);
            startDate.setDate(nextProps.startDay);
        }

        if (!datesMatch(startDate, this.state.startDate) ||
            !datesMatch(today, this.state.today) ||
            !datesMatch(today, calendar.today) ||
            calendarRules !== this.state.calendarRules) {
            calendar = makeRivendellCalendarDates(today, startDate, calendarRules);
        }

        let monthView = calendar.todayRivendell.month;

        this.setState({
            today,
            viewDate: today,
            calendarRules,
            calendar,
            startDate,
            yearView,
            monthView,
        });
    }

    onMonthViewChange(viewDate, monthView, yearView) {
        let calendar = this.state.calendar;

        if (!datesMatch(this.state.viewDate, viewDate)) {
            calendar = makeRivendellCalendarDates(viewDate, this.state.startDate, this.state.calendarRules);
            monthView = calendar.todayRivendell.month;
    }

        this.setState({
            calendar: calendar,
            viewDate: viewDate,
            yearView: yearView,
            monthView: monthView
        });
    }

    onLanguageChange(event) {
        this.setState({language: event.target.value});
    }

    renderCalendarControls() {
        let language = this.state.language;
        let monthNames = RivendellMonths.map(function(month) {
            return month[language];
        });

        let calendar = this.state.calendar;
        let firstDay = calendar.dates[0].gregorian;
        let lastDay = calendar.dates[calendar.dates.length - 1].gregorian;

        return (
            <tr>
                <th className='rivendell-calendar-controls'>
                    <StartDatePicker month="March"
                                     startRange={19}
                                     endRange={29}
                                     startDate={this.state.startDate}
                                     onCalendarStartChange={this.props.onCalendarStartChange} />
                    <select className="rivendell-rules-select"
                            value={this.state.calendarRules}
                            onChange={this.props.onCalendarRulesChange} >
                        <option value={TRADITIONAL_RULES}>Traditional Rules</option>
                        <option value={REFORMED_RULES}>Reformed Rules</option>
                    </select>
                </th>
                <th className='rivendell-calendar-controls month-picker-container'>
                    <MonthViewPicker monthNames={monthNames}
                                     monthLabel="Season"
                                     firstDay={firstDay}
                                     lastDay={lastDay}
                                     thisMonth={calendar.todayRivendell.month}
                                     today={this.state.today}
                                     viewDate={this.state.viewDate}
                                     monthView={this.state.monthView}
                                     yearView={this.state.yearView}
                                     onMonthViewChange={this.onMonthViewChange} />
                </th>
                <th className='rivendell-calendar-controls' >
                    <LanguagePicker language={this.state.language}
                                    onLanguageChange={this.onLanguageChange} />
                </th>
            </tr>
        );
    }

    render() {
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
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="3" className="shire-calendar-wrapper-cell" >
                            <RivendellCalendar
                                className="shire-calendar rivendell-calendar"
                                calendar={this.state.calendar}
                                date={this.state.today}
                                language={this.state.language}
                                monthView={this.state.monthView}
                                yearView={this.state.yearView} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default RivendellCalendarWithControls;
