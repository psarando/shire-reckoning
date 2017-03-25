/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from 'react';

import { RivendellMonths, RivendellWeekdays, TRADITIONAL_RULES, REFORMED_RULES } from '../../RivendellReckoning';

import RivendellCalendar from '../../ui/RivendellCalendar';
import WeekDayHeaderCell from '../../ui/WeekDayHeaderCell';
import '../../ui/tolkien-calendars.css';

import LanguagePicker from '../../ui/controls/LanguagePicker';
import MonthViewPicker from '../../ui/controls/MonthViewPicker';

import StartReckoningDatePicker from './StartReckoningDatePicker';

/**
 * FIXME: refactor into components (instead of inheritance)?
 * Hobbit Day '17?
 */
class RivendellCalendarSimulated extends RivendellCalendar {
    renderCalendarControls() {
        let language = this.state.language;
        let monthNames = RivendellMonths.map(function(month) {
            return month[language];
        });

        return (
            <tr>
                <td className='rivendell-calendar-controls' colSpan='2'>
                    <StartReckoningDatePicker startDate={this.state.startDate}
                                              onCalendarStartChange={this.props.onCalendarStartChange} />
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

        let controls = this.renderCalendarControls();

        let year = this.state.calendar.year;
        let yen = Math.ceil(year / 144);
        let loa = year > 0 ? (year - 1) % 144 + 1 : year % 144 ;

        let caption = (
            <caption className='rivendell-caption' >
                <span>Rivendell Reckoning {year} (yén {yen}, loa {loa})</span>
            </caption>
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

export default RivendellCalendarSimulated;
