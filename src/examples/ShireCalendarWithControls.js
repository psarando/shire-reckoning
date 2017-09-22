/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import { ShireMonths, makeShireCalendarDates } from '../ShireReckoning';
import { RECKONING_RULES_GREGORIAN } from '../GondorReckoning';
import { fullYearDate, datesMatch } from '../Utils';

import ShireCalendar from '../ui/ShireCalendar';
import '../ui/tolkien-calendars.css';

import MonthViewLayout from './controls/MonthViewLayout';
import MonthViewPicker from './controls/MonthViewPicker';
import ShireRegionPicker from './controls/ShireRegionPicker';
import StartDatePicker from './controls/StartDatePicker';


class ShireCalendarWithControls extends Component {
    constructor(props) {
        super(props);

        let calendarControls = props.calendarControls !== false;
        let today            = props.date || new Date();
        let monthViewLayout  = props.monthViewLayout || MonthViewLayout.VERTICAL;
        let region           = props.region || ShireCalendar.REGION_NAMES_SHIRE;
        let calendarRules    = props.calendarRules || RECKONING_RULES_GREGORIAN;
        let yearView         = !!props.yearView;

        let startDay  = props.startDay || 21;
        let startDate = props.startDate || fullYearDate(0, 11, startDay);

        let calendar = makeShireCalendarDates(today, startDate, calendarRules);
        let monthView = calendar.todayShire.month;

        this.state = {
            calendarControls: calendarControls,
            calendarRules:    calendarRules,
            startDate:        startDate,
            today:            today,
            viewDate:         today,
            calendar:         calendar,
            yearView:         yearView,
            monthView:        monthView,
            monthViewLayout:  monthViewLayout,
            region:           region
        };

        this.onMonthViewChange       = this.onMonthViewChange.bind(this);
        this.onCalendarStartChange   = this.onCalendarStartChange.bind(this);
        this.onMonthViewLayoutChange = this.onMonthViewLayoutChange.bind(this);
        this.onRegionChange          = this.onRegionChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let today = nextProps.date || this.state.today;
        let startDate = nextProps.startDate || this.state.startDate;
        let yearView = nextProps.yearView || this.state.yearView;

        let calendar = this.state.calendar;

        if (nextProps.startDay && !nextProps.startDate) {
            startDate = new Date(startDate);
            startDate.setDate(nextProps.startDay);
        }

        if (!datesMatch(startDate, this.state.startDate) ||
            !datesMatch(today, this.state.today) ||
            !datesMatch(today, calendar.today)) {
            calendar = makeShireCalendarDates(today, startDate, this.state.calendarRules);
        }

        let monthView = calendar.todayShire.month;

        this.setState({
            today:     today,
            viewDate:  today,
            calendar:  calendar,
            startDate: startDate,
            yearView:  yearView,
            monthView: monthView
        });
    }

    onMonthViewChange(viewDate, monthView, yearView) {
        let calendar = this.state.calendar;

        if (!datesMatch(this.state.viewDate, viewDate)) {
            calendar = makeShireCalendarDates(viewDate, this.state.startDate, this.state.calendarRules);
            monthView = calendar.todayShire.month;
        }

        this.setState({
            calendar:  calendar,
            viewDate:  viewDate,
            yearView:  yearView,
            monthView: monthView
        });
    }

    onCalendarStartChange(startDate) {
        let calendar = makeShireCalendarDates(this.state.calendar.today, startDate, this.state.calendarRules);

        this.setState({
            startDate: startDate,
            calendar: calendar
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
                    <StartDatePicker month="December"
                                     startRange={19}
                                     endRange={25}
                                     startDate={this.state.startDate}
                                     onCalendarStartChange={this.onCalendarStartChange} />
                    <ShireRegionPicker region={region}
                                       onRegionChange={this.onRegionChange} />
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
                    <MonthViewLayout layout={this.state.monthViewLayout}
                                     onMonthViewLayoutChange={this.onMonthViewLayoutChange} />
                </th>
            </tr>
        );
    }

    render() {
        let controls = this.state.calendarControls ? this.renderCalendarControls() : null;
        let caption = null;
        if (this.props.caption) {
            caption = (
                <caption className='shire-caption'>{
                    this.props.caption === true ? "Shire Reckoning" : this.props.caption
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

export default ShireCalendarWithControls;
