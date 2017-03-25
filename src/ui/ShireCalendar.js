/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import { ShireWeekdays, ShireMonths, makeShireCalendarDates } from '../ShireReckoning';
import { fullYearDate, datesMatch } from '../Utils';

import DateCell from './DateCell';
import IntercalaryDay from './IntercalaryDay';
import WeekDayHeaderCell, { addMonthFiller, addVerticalMonthFiller } from './WeekDayHeaderCell';
import './tolkien-calendars.css';

import MonthViewLayout, { VerticalLayoutFiller } from './controls/MonthViewLayout';
import MonthViewPicker from './controls/MonthViewPicker';
import StartDatePicker from './controls/StartDatePicker';


const REGION_NAMES_TOLKIEN = "tolkien";
const REGION_NAMES_SHIRE = "shire";
const REGION_NAMES_BREE = "bree";

class ShireCalendar extends Component {
    static get REGION_NAMES_TOLKIEN() { return REGION_NAMES_TOLKIEN; }
    static get REGION_NAMES_SHIRE() { return REGION_NAMES_SHIRE; }
    static get REGION_NAMES_BREE() { return REGION_NAMES_BREE; }

    static get MONTH_VIEW_VERTICAL() { return MonthViewLayout.VERTICAL; }
    static get MONTH_VIEW_HORIZONTAL() { return MonthViewLayout.HORIZONTAL; }

    constructor(props) {
        super(props);

        let calendarControls = props.calendarControls !== false;
        let today = props.date || new Date();
        let monthViewLayout = props.monthViewLayout || MonthViewLayout.VERTICAL;
        let region = props.region || REGION_NAMES_SHIRE;

        let startDay = props.startDay || 21;
        let startDate = props.startDate || fullYearDate(0, 11, startDay);
        let calendar = makeShireCalendarDates(today, startDate);
        let monthView = props.yearView ? -1 : calendar.todayShire.month;

        this.state = {
            calendarControls: calendarControls,
            startDate: startDate,
            today: today,
            calendar: calendar,
            monthView: monthView,
            monthViewLayout: monthViewLayout,
            region: region
        };

        this.onMonthViewChange       = this.onMonthViewChange.bind(this);
        this.onViewCalendarMonth     = this.onViewCalendarMonth.bind(this);
        this.onCalendarStartChange   = this.onCalendarStartChange.bind(this);
        this.onMonthViewLayoutChange = this.onMonthViewLayoutChange.bind(this);
        this.onRegionChange          = this.onRegionChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let today = nextProps.date;
        let calendar = this.state.calendar;

        if (!today) {
            today = this.state.today;
        }

        if (!datesMatch(today, this.state.today) ||
            !datesMatch(today, this.state.calendar.today)) {
            calendar = makeShireCalendarDates(today, this.state.startDate);
        }

        this.setState({
            today: today,
            calendar: calendar,
            monthView: this.state.monthView < 0 || nextProps.yearView ? -1 : calendar.todayShire.month
        });
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

    onCalendarStartChange(startDate) {
        let calendar = makeShireCalendarDates(this.state.calendar.today, startDate);

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

    renderDay(dates, today) {
        let date = dates[0];
        let region = this.state.region;
        switch (date.day) {
            case "1 Yule":
                return (
                    <IntercalaryDay key="1-Yule"
                                    name={date.day}
                                    description="Shire New Year's Eve!"
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            case "2 Yule":
                return (
                    <IntercalaryDay key="2-Yule"
                                    name={date.day}
                                    description="Midwinter: Shire New Year!"
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            case "1 Lithe":
                return (
                    <IntercalaryDay key="Midsummer"
                                    name={date.region[region]}
                                    description="Midsummer's Eve and Midsummer Day!"
                                    currentDate={today}
                                    gregorian={date.gregorian}
                                    dayExtra={dates[1].day}
                                    gregorianExtra={dates[1].gregorian} />
                );

            case "Overlithe":
                return (
                    <IntercalaryDay key="Overlithe"
                                    name={date.region[region]}
                                    description="Shire Leap Day and Day after Midsummer."
                                    currentDate={today}
                                    gregorian={date.gregorian}
                                    dayExtra={dates[1].region[region]}
                                    gregorianExtra={dates[1].gregorian} />
                );

            case "2 Lithe":
                return (
                    <IntercalaryDay key="2-Lithe"
                                    name={date.region[region]}
                                    description="Day after Midsummer."
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            default:
                let month = ShireMonths[date.month];
                let weekday = ShireWeekdays[date.weekDay];

                return (
                    <DateCell key={date.day + month[region]}
                              date={date}
                              currentDate={today}
                              month={month[region]}
                              description={month.description}
                              weekday={weekday[region]}
                              className={month.className}/>
                );
        }
    }

    renderMonth() {
        let today = this.state.today;
        let dates = this.state.calendar.dates;
        let monthView = this.state.monthView;

        let week = [];
        let weeks = [];

        let i = 0, date = dates[i];
        for (;
            i < dates.length && date.month < monthView;
            i++, date = dates[i]) {
            // seek ahead to current month view
        }

        addMonthFiller(week, dates[i].weekDay);

        for (; i < dates.length && (monthView < 0 || monthView === dates[i].month); i++, date = dates[i]) {
            switch (date.day) {
                case "1 Lithe":
                    week.push(this.renderDay([date, dates[++i]], today));
                    weeks.push(<tr key={weeks.length} >{week}</tr>);
                    week = [];

                    break;

                case "Overlithe":
                    week.push(this.renderDay([date, dates[++i]], today));

                    break;

                default:
                    week.push(this.renderDay([date], today));

                    if ((date.weekDay + 1) % 7 === 0) {
                        weeks.push(<tr key={weeks.length} >{week}</tr>);
                        week = [];
                    }

                    break;
            }
        }

        if (week.length > 0) {
            weeks.push(<tr key={weeks.length} >{week}</tr>);
        }

        return weeks;
    }

    renderMonthVertical() {
        let today = this.state.today;
        let dates = this.state.calendar.dates;
        let monthView = this.state.monthView;
        let region = this.state.region;

        let weeks = ShireWeekdays.map(function (weekday) {
            let weekdayName = weekday[region];
            return [(
                <WeekDayHeaderCell key={weekdayName}
                                   name={weekdayName}
                                   description={weekday.description}
                                   colSpan='2' />
            )];
        });

        let i = 0, date = dates[i];
        for (;
            i < dates.length && date.month < monthView;
            i++, date = dates[i]) {
            // seek ahead to current month view
        }

        addVerticalMonthFiller(weeks, dates[i].weekDay);

        for (; i < dates.length && (monthView < 0 || monthView === dates[i].month); i++, date = dates[i]) {
            switch (date.day) {
                case "1 Lithe":
                    weeks[date.weekDay].push(this.renderDay([date, dates[++i]], today));

                    break;

                case "Overlithe":
                    weeks[date.weekDay].push(this.renderDay([date, dates[++i]], today));

                    break;

                default:
                    weeks[date.weekDay].push(this.renderDay([date], today));

                    break;
            }
        }

        return weeks.map(function (week, i) {
            return (<tr key={i} >{week}</tr>);
        });
    }

    renderYear() {
        let today = this.state.today;
        let dates = this.state.calendar.dates;

        let week = [];
        let weeks = [];

        for (let i = 0, date = dates[i]; i < dates.length; i++, date = dates[i]) {
            switch (date.day) {
                case "1 Lithe":
                    week.push(this.renderDay([date, dates[++i]], today));
                    weeks.push(<tr key={weeks.length} >{week}</tr>);
                    week = [];

                    break;

                case "Overlithe":
                    week.push(this.renderDay([date, dates[++i]], today));

                    break;

                default:
                    week.push(this.renderDay([date], today));

                    if ((date.weekDay + 1) % 7 === 0) {
                        weeks.push(<tr key={weeks.length} >{week}</tr>);
                        week = [];
                    }

                    break;
            }
        }

        if (week.length > 0) {
            weeks.push(<tr key={weeks.length} >{week}</tr>);
        }

        return weeks;
    }

    renderCalendarControls() {
        let region = this.state.region;
        let monthNames = ShireMonths.map(function(month) {
            return month[region];
        });
        return (
            <tr>
                <td colSpan='2' className='shire-calendar-controls' >
                    <StartDatePicker month="December"
                                     startRange={19}
                                     endRange={25}
                                     startDate={this.state.startDate}
                                     onCalendarStartChange={this.onCalendarStartChange} />
                    <select className="shire-region-select"
                            value={region}
                            onChange={this.onRegionChange} >
                        <option value={REGION_NAMES_TOLKIEN}>Tolkien Names</option>
                        <option value={REGION_NAMES_SHIRE}>Shire Names</option>
                        <option value={REGION_NAMES_BREE}>Bree Names</option>
                    </select>
                </td>
                <td colSpan='3' className='shire-calendar-controls month-picker-container' >
                    <MonthViewPicker monthNames={monthNames}
                                     today={this.state.today}
                                     calendar={this.state.calendar}
                                     startDate={this.state.startDate}
                                     monthView={this.state.monthView}
                                     makeCalendarDates={makeShireCalendarDates}
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
                    {weekDayHeader}
                </thead>
                <tbody>
                    {weeks}
                </tbody>
            </table>
        );
    }
}

export default ShireCalendar;
