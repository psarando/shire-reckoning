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
        let monthView = calendar.todayRivendell.month;

        this.state = {
            calendar:  calendar,
            today:     today,
            viewDate:  today,
            yearView:  false,
            monthView: monthView,
            startDate: startDate,
            language:  LanguagePicker.QUENYA
        };

        this.onMonthViewChange   = this.onMonthViewChange.bind(this);
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

        let monthView = calendar.todayRivendell.month;

        this.setState({
            today:     today,
            viewDate:  today,
            calendar:  calendar,
            startDate: startDate,
            monthView: monthView
        });
    }

    onMonthViewChange(viewDate, monthView, yearView) {
        let calendar = this.state.calendar;

        if (!datesMatch(this.state.viewDate, viewDate)) {
            calendar = makeRivendellCalendarDates(viewDate, this.state.startDate, TRADITIONAL_RULES);
            monthView = calendar.todayRivendell.month;
        }

        this.setState({
            calendar:  calendar,
            viewDate:  viewDate,
            yearView:  yearView,
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
                    <StartReckoningDatePicker startDate={this.state.startDate}
                                              onCalendarStartChange={this.props.onCalendarStartChange} />
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
                                yearView={this.state.yearView} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default RivendellCalendarSimulated;
