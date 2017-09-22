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

        let monthView = props.yearView ? -1 : calendar.todayGondor.month;

        this.state = {
            today:           today,
            startDate:       startDate,
            calendar:        calendar,
            reckoning:       reckoning,
            monthView:       monthView,
            monthViewLayout: MonthViewLayout.VERTICAL,
            language:        LanguagePicker.QUENYA
        };

        this.makeCalendarDates       = this.makeCalendarDates.bind(this);
        this.onMonthViewChange       = this.onMonthViewChange.bind(this);
        this.onViewCalendarMonth     = this.onViewCalendarMonth.bind(this);
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
        }

        let gondorReckoning = gondorReckoningForYear(calendar, startDate, today);
        if (reckoning !== gondorReckoning) {
            reckoning = gondorReckoning;
            calendar = makeGondorCalendarDates(today, startDate, reckoning, RECKONING_RULES_TRADITIONAL);
        }

        this.setState({
            startDate: startDate,
            today:     today,
            calendar:  calendar,
            reckoning: reckoning,
            monthView: this.state.monthView < 0 || nextProps.yearView ? -1 : calendar.todayGondor.month
        });
    }

    makeCalendarDates(today, startDate) {
        let reckoning = this.state.reckoning;
        let calendar = makeGondorCalendarDates(today, startDate, reckoning, RECKONING_RULES_TRADITIONAL);

        let gondorReckoning = gondorReckoningForYear(calendar, startDate, today);
        if (reckoning !== gondorReckoning) {
            reckoning = gondorReckoning;
            calendar = makeGondorCalendarDates(today, startDate, reckoning, RECKONING_RULES_TRADITIONAL);
            this.setState({reckoning: reckoning});
        }

        return calendar;
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
            monthView: calendar.todayGondor.month
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

        return (
            <tr>
                <th className='gondor-calendar-controls' >
                    <StartReckoningDatePicker startDate={this.state.startDate}
                                              onCalendarStartChange={this.props.onCalendarStartChange} />
                </th>
                <th className='gondor-calendar-controls month-picker-container' >
                    <MonthViewPicker monthNames={monthNames}
                                     today={this.state.today}
                                     calendar={this.state.calendar}
                                     startDate={this.state.startDate}
                                     monthView={this.state.monthView}
                                     makeCalendarDates={this.makeCalendarDates}
                                     onMonthViewChange={this.onMonthViewChange}
                                     onViewCalendarMonth={this.onViewCalendarMonth} />
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
                                yearView={this.state.monthView < 0} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default GondorCalendarSimulated;
