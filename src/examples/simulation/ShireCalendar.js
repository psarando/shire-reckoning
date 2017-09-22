/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import { ShireMonths, makeShireCalendarDates } from '../../ShireReckoning';
import { RECKONING_RULES_TRADITIONAL } from '../../GondorReckoning';
import { datesMatch, fullYearDate } from '../../Utils';

import ShireCalendar from '../../ui/ShireCalendar';
import '../../ui/tolkien-calendars.css';

import MonthViewLayout from '../controls/MonthViewLayout';
import MonthViewPicker from '../controls/MonthViewPicker';

import StartReckoningDatePicker from './StartReckoningDatePicker';

class ShireCalendarSimulated extends Component {
    constructor(props) {
        super(props);

        let today = props.date || new Date();
        let startDate = props.startDate || fullYearDate(0, 11, 23);

        let calendar = makeShireCalendarDates(today, startDate, RECKONING_RULES_TRADITIONAL);
        let monthView = props.yearView ? -1 : calendar.todayShire.month;

        this.state = {
            startDate:       startDate,
            today:           today,
            calendar:        calendar,
            monthView:       monthView,
            monthViewLayout: MonthViewLayout.VERTICAL,
            region:          ShireCalendar.REGION_NAMES_SHIRE
        };

        this.makeCalendarDates       = this.makeCalendarDates.bind(this);
        this.onMonthViewChange       = this.onMonthViewChange.bind(this);
        this.onViewCalendarMonth     = this.onViewCalendarMonth.bind(this);
        this.onMonthViewLayoutChange = this.onMonthViewLayoutChange.bind(this);
        this.onRegionChange          = this.onRegionChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let today = nextProps.date || this.state.today;
        let startDate = nextProps.startDate || this.state.startDate;

        let calendar = this.state.calendar;

        if (!datesMatch(startDate, this.state.startDate) ||
            !datesMatch(today, this.state.today) ||
            !datesMatch(today, calendar.today)) {
            calendar = makeShireCalendarDates(today, startDate, RECKONING_RULES_TRADITIONAL);
        }

        this.setState({
            today:     today,
            calendar:  calendar,
            startDate: startDate,
            monthView: this.state.monthView < 0 || nextProps.yearView ? -1 : calendar.todayShire.month
        });
    }

    makeCalendarDates(today, startDate) {
        return makeShireCalendarDates(today, startDate, RECKONING_RULES_TRADITIONAL);
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
            monthView: calendar.todayShire.month
        });
    }

    onMonthViewLayoutChange(event) {
        this.setState({monthViewLayout: event.target.value});
    }

    onRegionChange(event) {
        this.setState({region: event.target.value});
    }

    renderCalendarControls() {
        let region = this.state.region;
        let monthNames = ShireMonths.map(function(month) {
            return month[region];
        });

        return (
            <tr>
                <th className='shire-calendar-controls' >
                    <StartReckoningDatePicker startDate={this.state.startDate}
                                              onCalendarStartChange={this.props.onCalendarStartChange} />
                </th>
                <th className='shire-calendar-controls month-picker-container' >
                    <MonthViewPicker monthNames={monthNames}
                                     today={this.state.today}
                                     calendar={this.state.calendar}
                                     startDate={this.state.startDate}
                                     monthView={this.state.monthView}
                                     makeCalendarDates={this.makeCalendarDates}
                                     onMonthViewChange={this.onMonthViewChange}
                                     onViewCalendarMonth={this.onViewCalendarMonth} />
                </th>
                <th className='shire-calendar-controls' >
                    Reckon with:
                    <br />
                    <select className="shire-region-select"
                            value={region}
                            onChange={this.onRegionChange} >
                        <option value={ShireCalendar.REGION_NAMES_TOLKIEN}>Tolkien Names</option>
                        <option value={ShireCalendar.REGION_NAMES_SHIRE}>Shire Names</option>
                        <option value={ShireCalendar.REGION_NAMES_BREE}>Bree Names</option>
                    </select>
                </th>
                <th className='shire-calendar-controls' >
                    <MonthViewLayout layout={this.state.monthViewLayout}
                                     onMonthViewLayoutChange={this.onMonthViewLayoutChange} />
                </th>
            </tr>
        );
    }

    render() {
        let region = this.state.region;

        let reckoningName = "Shire";
        let reckoningYearOffset = 1600;
        if (region === ShireCalendar.REGION_NAMES_BREE) {
            reckoningName = "Bree";
            reckoningYearOffset = 1299;
        }

        return (
            <table className={this.props.className} >
                <caption className='shire-caption' >{
                    `${reckoningName} Reckoning ${this.state.calendar.year - 3441 - reckoningYearOffset}`
                }</caption>
                <thead>
                    {this.renderCalendarControls()}
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="4" className="shire-calendar-wrapper-cell" >
                            <ShireCalendar
                                className="shire-calendar"
                                calendar={this.state.calendar}
                                date={this.state.today}
                                region={this.state.region}
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

export default ShireCalendarSimulated;
