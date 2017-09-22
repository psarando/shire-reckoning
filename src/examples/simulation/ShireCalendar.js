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
        let monthView = calendar.todayShire.month;

        this.state = {
            startDate:       startDate,
            today:           today,
            viewDate:        today,
            calendar:        calendar,
            yearView:        false,
            monthView:       monthView,
            monthViewLayout: MonthViewLayout.VERTICAL,
            region:          ShireCalendar.REGION_NAMES_SHIRE
        };

        this.onMonthViewChange       = this.onMonthViewChange.bind(this);
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

        let monthView = calendar.todayShire.month;

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
            calendar = makeShireCalendarDates(viewDate, this.state.startDate, RECKONING_RULES_TRADITIONAL);
            monthView = calendar.todayShire.month;
        }

        this.setState({
            calendar:  calendar,
            viewDate:  viewDate,
            yearView:  yearView,
            monthView: monthView
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

        let calendar = this.state.calendar;
        let firstDay = calendar.dates[0].gregorian;
        let lastDay = calendar.dates[calendar.dates.length - 1].gregorian;

        return (
            <tr>
                <th className='shire-calendar-controls' >
                    <StartReckoningDatePicker startDate={this.state.startDate}
                                              onCalendarStartChange={this.props.onCalendarStartChange} />
                </th>
                <th className='shire-calendar-controls month-picker-container' >
                    <MonthViewPicker monthNames={monthNames}
                                     firstDay={firstDay}
                                     lastDay={lastDay}
                                     thisMonth={calendar.todayShire.month}
                                     today={this.state.today}
                                     viewDate={this.state.viewDate}
                                     monthView={this.state.monthView}
                                     yearView={this.state.yearView}
                                     onMonthViewChange={this.onMonthViewChange} />
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
                                yearView={this.state.yearView} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default ShireCalendarSimulated;
