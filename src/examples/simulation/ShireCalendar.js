/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from 'react';

import { ShireMonths, ShireWeekdays } from '../../ShireReckoning';

import ShireCalendar from '../../ui/ShireCalendar';
import WeekDayHeaderCell from '../../ui/WeekDayHeaderCell';
import '../../ui/tolkien-calendars.css';

import MonthViewLayout, { VerticalLayoutFiller } from '../../ui/controls/MonthViewLayout';
import MonthViewPicker from '../../ui/controls/MonthViewPicker';

import StartReckoningDatePicker from './StartReckoningDatePicker';

/**
 * FIXME: refactor into components (instead of inheritance)?
 * Hobbit Day '17?
 */
class ShireCalendarSimulated extends ShireCalendar {
    renderCalendarControls() {
        let region = this.state.region;
        let monthNames = ShireMonths.map(function(month) {
            return month[region];
        });

        return (
            <tr>
                <td colSpan='2' className='shire-calendar-controls' >
                    <StartReckoningDatePicker startDate={this.state.startDate}
                                              onCalendarStartChange={this.props.onCalendarStartChange} />
                    <select className="shire-region-select"
                            value={region}
                            onChange={this.onRegionChange} >
                        <option value={ShireCalendar.REGION_NAMES_TOLKIEN}>Tolkien Names</option>
                        <option value={ShireCalendar.REGION_NAMES_SHIRE}>Shire Names</option>
                        <option value={ShireCalendar.REGION_NAMES_BREE}>Bree Names</option>
                    </select>
                </td>
                <td colSpan='3' className='shire-calendar-controls month-picker-container' >
                    <MonthViewPicker monthNames={monthNames}
                                     today={this.state.today}
                                     calendar={this.state.calendar}
                                     startDate={this.state.startDate}
                                     monthView={this.state.monthView}
                                     makeCalendarDates={this.makeCalendarDates}
                                     onMonthViewChange={this.onMonthViewChange}
                                     onViewCalendarMonth={this.onViewCalendarMonth} />
                </td>
                <td colSpan='2' className='shire-calendar-controls' >
                    <MonthViewLayout layout={this.state.monthViewLayout}
                                     onMonthViewLayoutChange={this.onMonthViewLayoutChange} />
                </td>
            </tr>
        );
    }

    render() {
        let region = this.state.region;
        let weekDayHeader = (
            <tr>
                {ShireWeekdays.map(function (weekday) {
                    let weekdayName = weekday[region];
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
            weekDayHeader = <VerticalLayoutFiller weekdays={ShireWeekdays} />;
        } else {
            weeks = this.renderMonth();
        }

        let controls = this.renderCalendarControls();

        let reckoningName = "Shire";
        let reckoningYearOffset = 1600;
        if (region === ShireCalendar.REGION_NAMES_BREE) {
            reckoningName = "Bree";
            reckoningYearOffset = 1299;
        }
        let caption = (
            <caption className='shire-caption' >{
                `${reckoningName} Reckoning ${this.state.calendar.year - 3441 - reckoningYearOffset}`
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

export default ShireCalendarSimulated;
