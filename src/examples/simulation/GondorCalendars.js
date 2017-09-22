/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import {
    GondorMonths,
    RECKONING_KINGS,
    RECKONING_STEWARDS,
    RECKONING_NEW,
    RECKONING_RULES_TRADITIONAL,
    makeGondorCalendarDates
} from '../../GondorReckoning';

import {
    daysElapsedToSecondAgeYear,
    daysElapsedToNewReckoningYear,
    toDaysElapsed,
    datesMatch,
    fullYearDate
} from '../../Utils';

import GondorCalendar from '../../ui/GondorCalendar';
import '../../ui/tolkien-calendars.css';

import LanguagePicker from '../controls/LanguagePicker';
import MonthViewLayout from '../controls/MonthViewLayout';
import MonthViewPicker from '../controls/MonthViewPicker';

import StartReckoningDatePicker from './StartReckoningDatePicker';

let getNewStyleYear = (startDate, today) => (
    daysElapsedToNewReckoningYear(daysElapsedToSecondAgeYear, toDaysElapsed(startDate, today)).year - 3441
);

let gondorReckoningForYear = (calendar, startDate, today) => {
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

        let today = props.date || new Date();
        let startDate = props.startDate || fullYearDate(0, 11, 23);

        let reckoning = GondorCalendar.RECKONING_STEWARDS;

        let calendar = makeGondorCalendarDates(today, startDate, reckoning, RECKONING_RULES_TRADITIONAL);

        let gondorReckoning = gondorReckoningForYear(calendar, startDate, today);
        if (reckoning !== gondorReckoning) {
            reckoning = gondorReckoning;

            calendar = makeGondorCalendarDates(today, startDate, reckoning, RECKONING_RULES_TRADITIONAL);
        }

        let monthView = calendar.todayGondor.month;

        this.state = {
            today:           today,
            viewDate:        today,
            startDate:       startDate,
            calendar:        calendar,
            reckoning:       reckoning,
            yearView:        false,
            monthView:       monthView,
            monthViewLayout: MonthViewLayout.VERTICAL,
            language:        LanguagePicker.QUENYA
        };

        this.onMonthViewChange       = this.onMonthViewChange.bind(this);
        this.onMonthViewLayoutChange = this.onMonthViewLayoutChange.bind(this);
        this.onLanguageChange        = this.onLanguageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let today     = nextProps.date || this.state.today;
        let startDate = nextProps.startDate || this.state.startDate;

        let reckoning = this.state.reckoning;
        let calendar  = this.state.calendar;

        if (!datesMatch(startDate, this.state.startDate) ||
            !datesMatch(today, this.state.today) ||
            !datesMatch(today, calendar.today)) {
            calendar = makeGondorCalendarDates(today, startDate, reckoning, RECKONING_RULES_TRADITIONAL);

            let gondorReckoning = gondorReckoningForYear(calendar, startDate, today);
            if (reckoning !== gondorReckoning) {
                reckoning = gondorReckoning;
                calendar = makeGondorCalendarDates(today, startDate, reckoning, RECKONING_RULES_TRADITIONAL);
            }
        }

        let monthView = calendar.todayGondor.month;

        this.setState({
            startDate: startDate,
            today:     today,
            viewDate:  today,
            calendar:  calendar,
            reckoning: reckoning,
            monthView: monthView
        });
    }

    onMonthViewChange(viewDate, monthView, yearView) {
        let reckoning = this.state.reckoning;
        let calendar = this.state.calendar;

        if (!datesMatch(this.state.viewDate, viewDate)) {
            calendar = makeGondorCalendarDates(viewDate,
                                               this.state.startDate,
                                               reckoning,
                                               RECKONING_RULES_TRADITIONAL);

            let gondorReckoning = gondorReckoningForYear(calendar, this.state.startDate, viewDate);
            if (reckoning !== gondorReckoning) {
                reckoning = gondorReckoning;
                calendar = makeGondorCalendarDates(viewDate,
                                                   this.state.startDate,
                                                   reckoning,
                                                   RECKONING_RULES_TRADITIONAL);
            }

            monthView = calendar.todayGondor.month;
        }

        this.setState({
            calendar:  calendar,
            reckoning: reckoning,
            viewDate:  viewDate,
            yearView:  yearView,
            monthView: monthView
        });
    }

    onMonthViewLayoutChange(event) {
        this.setState({monthViewLayout: event.target.value});
    }

    onLanguageChange(event) {
        this.setState({language: event.target.value});
    }

    renderCalendarControls() {
        let reckoning  = this.state.reckoning;
        let startMonth = reckoning === RECKONING_NEW ? 3 : 0;
        let language   = this.state.language;
        let monthNames = [];

        for (let i = startMonth; i < (GondorMonths.length + startMonth); i++) {
            monthNames.push(GondorMonths[i%12][language]);
        }

        let calendar = this.state.calendar;
        let firstDay = calendar.dates[0].gregorian;
        let lastDay = calendar.dates[calendar.dates.length - 1].gregorian;

        return (
            <tr>
                <th className='gondor-calendar-controls' >
                    <StartReckoningDatePicker startDate={this.state.startDate}
                                              onCalendarStartChange={this.props.onCalendarStartChange} />
                </th>
                <th className='gondor-calendar-controls month-picker-container' >
                    <MonthViewPicker monthNames={monthNames}
                                     firstDay={firstDay}
                                     lastDay={lastDay}
                                     thisMonth={calendar.todayGondor.month}
                                     today={this.state.today}
                                     viewDate={this.state.viewDate}
                                     monthView={this.state.monthView}
                                     yearView={this.state.yearView}
                                     onMonthViewChange={this.onMonthViewChange} />
                </th>
                <th className='gondor-calendar-controls' >
                    <LanguagePicker language={this.state.language}
                                    onLanguageChange={this.onLanguageChange} />
                </th>
                <th className='gondor-calendar-controls' >
                    <MonthViewLayout layout={this.state.monthViewLayout}
                                     onMonthViewLayoutChange={this.onMonthViewLayoutChange} />
                </th>
            </tr>
        );
    }

    render() {
        let year = this.state.calendar.year;
        let age = "II";
        let reckoningDisplay = "Kings'";
        if (year > 3441) {
            year -= 3441;
            age = "III";

            if (year > 2059) {
                reckoningDisplay = "Stewards'";

                if (year > 3019 || this.state.reckoning === RECKONING_NEW) {
                    reckoningDisplay = "New";

                    if (year > 3020) {
                        year -= 3020;
                        age = "IV";
                    }
                }
            }
        }

        return (
            <table className={this.props.className} >
                <caption className='shire-caption' >{
                    `${reckoningDisplay} Reckoning ${age} ${year}`
                }</caption>
                <thead>
                    {this.renderCalendarControls()}
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="4" className="shire-calendar-wrapper-cell" >
                            <GondorCalendar
                                className="shire-calendar gondor-calendar"
                                calendar={this.state.calendar}
                                date={this.state.today}
                                reckoning={this.state.reckoning}
                                language={this.state.language}
                                monthViewLayout={this.state.monthViewLayout}
                                monthView={this.state.monthView}
                                yearView={this.state.yearView} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default GondorCalendarSimulated;
