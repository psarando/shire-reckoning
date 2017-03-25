/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from 'react';

import {
    GondorMonths,
    GondorWeekdays,
    RECKONING_KINGS,
    RECKONING_STEWARDS,
    RECKONING_NEW,
    makeGondorCalendarDates
} from '../../GondorReckoning';

import {
    daysElapsedToSecondAgeYear,
    daysElapsedToNewReckoningYear,
    toDaysElapsed,
    datesMatch
} from '../../Utils';

import GondorCalendar from '../../ui/GondorCalendar';
import WeekDayHeaderCell from '../../ui/WeekDayHeaderCell';
import '../../ui/tolkien-calendars.css';

import LanguagePicker from '../../ui/controls/LanguagePicker';
import MonthViewLayout, { VerticalLayoutFiller } from '../../ui/controls/MonthViewLayout';
import MonthViewPicker from '../../ui/controls/MonthViewPicker';

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

/**
 * FIXME: refactor into components (instead of inheritance)?
 * Hobbit Day '17?
 */
class GondorCalendarSimulated extends GondorCalendar {
    constructor(props) {
        super(props);

        let gondorReckoning = gondorReckoningForYear(this.state.calendar, this.state.startDate, this.state.today);
        if (this.state.reckoning !== gondorReckoning) {
            this.state.reckoning = gondorReckoning;

            this.state.calendar = makeGondorCalendarDates(this.state.today,
                                                          this.state.startDate,
                                                          this.state.reckoning,
                                                          this.state.calendarRules);

            this.state.monthView = props.yearView ? -1 : this.state.calendar.todayGondor.month;
        }
    }

    componentWillReceiveProps(nextProps) {
        let today         = nextProps.date || this.state.today;
        let startDate     = nextProps.startDate || this.state.startDate;
        let reckoning     = nextProps.reckoning || this.state.reckoning;
        let calendarRules = nextProps.calendarRules || this.state.calendarRules;
        let calendar      = this.state.calendar;

        if (!datesMatch(startDate, this.state.startDate) ||
            !datesMatch(today, this.state.today) ||
            !datesMatch(today, calendar.today)) {
            calendar = makeGondorCalendarDates(today, startDate, reckoning, calendarRules);
        }

        let gondorReckoning = gondorReckoningForYear(calendar, startDate, today);
        if (reckoning !== gondorReckoning) {
            reckoning = gondorReckoning;
            calendar = makeGondorCalendarDates(today, startDate, reckoning, calendarRules);
        }

        this.setState({
            startDate:     startDate,
            today:         today,
            calendar:      calendar,
            reckoning:     reckoning,
            calendarRules: calendarRules,
            monthView:     this.state.monthView < 0 || nextProps.yearView ? -1 : calendar.todayGondor.month
        });
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
                <td colSpan='2' className='gondor-calendar-controls' >
                    <StartReckoningDatePicker startDate={this.state.startDate}
                                              onCalendarStartChange={this.props.onCalendarStartChange} />
                    <select className="gondor-rules-select"
                            value={reckoning}
                            onChange={this.onStartMonthChange} >
                        <option value={RECKONING_KINGS}>Kings' Reckoning</option>
                        <option value={RECKONING_STEWARDS}>Stewards' Reckoning</option>
                        <option value={RECKONING_NEW}>New Reckoning</option>
                    </select>
                </td>
                <td colSpan='3' className='gondor-calendar-controls month-picker-container' >
                    <MonthViewPicker monthNames={monthNames}
                                     today={this.state.today}
                                     calendar={this.state.calendar}
                                     startDate={this.state.startDate}
                                     monthView={this.state.monthView}
                                     makeCalendarDates={this.makeCalendarDates}
                                     onMonthViewChange={this.onMonthViewChange}
                                     onViewCalendarMonth={this.onViewCalendarMonth} />
                </td>
                <td className='gondor-calendar-controls' >
                    <LanguagePicker language={this.state.language}
                                    onLanguageChange={this.onLanguageChange} />
                </td>
                <td className='gondor-calendar-controls' >
                    <MonthViewLayout layout={this.state.monthViewLayout}
                                     onMonthViewLayoutChange={this.onMonthViewLayoutChange} />
                </td>
            </tr>
        );
    }

    render() {
        let language = this.state.language;
        let weekDayHeader = (
            <tr>
                {GondorWeekdays.map(function (weekday) {
                    let weekdayName = weekday[language];
                    return (
                        <WeekDayHeaderCell key={weekdayName}
                                           name={weekdayName}
                                           description={weekday.description} />
                    );
                })}
            </tr>
        );

        let weeks;
        if (this.state.monthView < 0) {
            weeks = this.renderYear();
        } else if (this.state.monthViewLayout === MonthViewLayout.VERTICAL) {
            weeks = this.renderMonthVertical();
            weekDayHeader = <VerticalLayoutFiller weekdays={GondorWeekdays} />;
        } else {
            weeks = this.renderMonth();
        }

        let controls = this.renderCalendarControls();

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

        let caption = (
            <caption className='shire-caption' >{
                `${reckoningDisplay} Reckoning ${age} ${year}`
            }</caption>
        );

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

export default GondorCalendarSimulated;
