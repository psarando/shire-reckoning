/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import {
    TRADITIONAL_RULES,
    RivendellMonths,
    makeRivendellCalendarDates
} from '../../RivendellReckoning';
import { datesMatch, fullYearDate } from '../../Utils';

import RivendellCalendar from '../../ui/RivendellCalendar';
import '../../ui/tolkien-calendars.css';

import LanguagePicker from '../controls/LanguagePicker';
import MonthViewPicker from '../controls/MonthViewPicker';

import StartReckoningDatePicker from './StartReckoningDatePicker';

class RivendellCalendarSimulated extends Component {
    constructor(props) {
        super(props);

        let startDate = props.startDate || fullYearDate(-589, 2, 23);
        let today = props.date || new Date();

        let calendar = makeRivendellCalendarDates(today, startDate, TRADITIONAL_RULES);
        let monthView = props.yearView ? -1 : calendar.todayRivendell.month;

        this.state = {
            calendar:  calendar,
            today:     today,
            monthView: monthView,
            startDate: startDate,
            language:  LanguagePicker.QUENYA
        };

        this.makeCalendarDates   = this.makeCalendarDates.bind(this);
        this.onMonthViewChange   = this.onMonthViewChange.bind(this);
        this.onViewCalendarMonth = this.onViewCalendarMonth.bind(this);
        this.onLanguageChange    = this.onLanguageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let today = nextProps.date || this.state.today;
        let startDate = nextProps.startDate || this.state.startDate;
        let calendar = this.state.calendar;

        if (!datesMatch(startDate, this.state.startDate) ||
            !datesMatch(today, this.state.today) ||
            !datesMatch(today, calendar.today)) {
            calendar = makeRivendellCalendarDates(today, startDate, TRADITIONAL_RULES);
        }

        this.setState({
            today:     today,
            calendar:  calendar,
            startDate: startDate,
            monthView: this.state.monthView < 0 || nextProps.yearView ? -1 : calendar.todayRivendell.month
        });
    }

    makeCalendarDates(today, startDate) {
        return makeRivendellCalendarDates(today, startDate, TRADITIONAL_RULES);
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

    onLanguageChange(event) {
        this.setState({language: event.target.value});
    }

    renderCalendarControls() {
        let language = this.state.language;
        let monthNames = RivendellMonths.map(function(month) {
            return month[language];
        });

        return (
            <tr>
                <th className='rivendell-calendar-controls'>
                    <StartReckoningDatePicker startDate={this.state.startDate}
                                              onCalendarStartChange={this.props.onCalendarStartChange} />
                </th>
                <th className='rivendell-calendar-controls month-picker-container'>
                    <MonthViewPicker monthNames={monthNames}
                                     monthLabel="Season"
                                     today={this.state.today}
                                     calendar={this.state.calendar}
                                     startDate={this.state.startDate}
                                     monthView={this.state.monthView}
                                     makeCalendarDates={this.makeCalendarDates}
                                     onMonthViewChange={this.onMonthViewChange}
                                     onViewCalendarMonth={this.onViewCalendarMonth} />
                </th>
                <th className='rivendell-calendar-controls' >
                    <LanguagePicker language={this.state.language}
                                    onLanguageChange={this.onLanguageChange} />
                </th>
            </tr>
        );
    }

    render() {
        let year = this.state.calendar.year;
        let yen = Math.ceil(year / 144);
        let loa = year > 0 ? (year - 1) % 144 + 1 : year % 144 ;

        return (
            <table className={this.props.className} >
                <caption className='rivendell-caption' >
                    <span>Rivendell Reckoning {year} (yén {yen}, loa {loa})</span>
                </caption>
                <thead>
                    {this.renderCalendarControls()}
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
                                yearView={this.state.monthView < 0} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default RivendellCalendarSimulated;
