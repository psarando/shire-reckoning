/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import "../../ui/tolkien-calendars.css";

import ShireCalendar from "./ShireCalendar";
import RivendellCalendar from "./RivendellCalendar";
import GondorCalendar from "./GondorCalendars";
import {
    SyncAges,
    DatesOfInterest,
    adjustDateForCurrentEvent,
    findEventIndex,
    findPreviousEventIndex,
} from "./DatesOfInterest";

import { CalendarCellStyle, DatePicker } from "../Common";
import "../examples.css";

class SimulatedTolkienCalendars extends Component {
    constructor(props) {
        super(props);

        let calendarRules = props.calendarRules || 1; // Sync Gregorian years with Second Age years
        let selectedEvent = props.selectedEvent >= 0 ? props.selectedEvent : 14; // III 3019 Astron 6 | Elves' New Year
        let currentDate = props.date || new Date();
        let startDates = SyncAges[calendarRules].startDates;

        if (selectedEvent) {
            currentDate = adjustDateForCurrentEvent(
                currentDate,
                selectedEvent,
                startDates.shire,
                startDates.rivendell
            );
        } else {
            selectedEvent = findEventIndex(
                currentDate,
                startDates.shire,
                startDates.rivendell
            );
        }

        this.state = {
            date: currentDate,
            calendarRules: calendarRules,
            rivendellStartDate: startDates.rivendell,
            gondorStartDate: startDates.gondor,
            shireStartDate: startDates.shire,
            selectedEvent: selectedEvent,
        };

        this.onCalendarRulesChange = this.onCalendarRulesChange.bind(this);
        this.onDatesOfInterestChange = this.onDatesOfInterestChange.bind(this);
        this.onDateChanged = this.onDateChanged.bind(this);
        this.onShireStartDateChange = this.onShireStartDateChange.bind(this);
        this.onGondorStartDateChange = this.onGondorStartDateChange.bind(this);
        this.onRivendellStartDateChange = this.onRivendellStartDateChange.bind(
            this
        );
    }

    onCalendarRulesChange(event) {
        let calendarRules = event.target.value;
        let rivendellStartDate = this.state.rivendellStartDate;
        let gondorStartDate = this.state.gondorStartDate;
        let shireStartDate = this.state.shireStartDate;
        let currentDate = this.state.date;
        let selectedEvent = this.state.selectedEvent;

        if (calendarRules > 0) {
            let startDates = SyncAges[calendarRules].startDates;

            rivendellStartDate = startDates.rivendell;
            gondorStartDate = startDates.gondor;
            shireStartDate = startDates.shire;
        }

        if (selectedEvent) {
            currentDate = adjustDateForCurrentEvent(
                currentDate,
                selectedEvent,
                shireStartDate,
                rivendellStartDate
            );
        } else {
            selectedEvent = findEventIndex(
                currentDate,
                shireStartDate,
                rivendellStartDate
            );
        }

        this.setState({
            date: currentDate,
            calendarRules: calendarRules,
            selectedEvent: selectedEvent,
            rivendellStartDate: rivendellStartDate,
            gondorStartDate: gondorStartDate,
            shireStartDate: shireStartDate,
        });
    }

    onDatesOfInterestChange(event) {
        let selectedEvent = event.target.value;
        let currentDate = this.state.date;
        let shireStartDate = this.state.shireStartDate;
        let rivendellStartDate = this.state.rivendellStartDate;

        currentDate = adjustDateForCurrentEvent(
            currentDate,
            selectedEvent,
            shireStartDate,
            rivendellStartDate
        );

        this.setState({
            date: currentDate,
            selectedEvent: selectedEvent,
        });
    }

    onDateChanged(currentDate) {
        let shireStartDate = this.state.shireStartDate;
        let rivendellStartDate = this.state.rivendellStartDate;

        let selectedEvent = findEventIndex(
            currentDate,
            shireStartDate,
            rivendellStartDate
        );

        this.setState({
            date: currentDate,
            selectedEvent: selectedEvent,
        });
    }

    onShireStartDateChange(shireStartDate) {
        let gondorStartDate = new Date(shireStartDate);
        let rivendellStartDate = this.state.rivendellStartDate;
        let selectedEvent = this.state.selectedEvent;
        let currentDate = this.state.date;

        currentDate = adjustDateForCurrentEvent(
            currentDate,
            selectedEvent,
            shireStartDate,
            rivendellStartDate
        );

        this.setState({
            calendarRules: 0,
            date: currentDate,
            gondorStartDate: gondorStartDate,
            shireStartDate: shireStartDate,
        });
    }

    onGondorStartDateChange(gondorStartDate) {
        let shireStartDate = new Date(gondorStartDate);
        let rivendellStartDate = this.state.rivendellStartDate;
        let selectedEvent = this.state.selectedEvent;
        let currentDate = this.state.date;

        currentDate = adjustDateForCurrentEvent(
            currentDate,
            selectedEvent,
            shireStartDate,
            rivendellStartDate
        );

        this.setState({
            calendarRules: 0,
            date: currentDate,
            gondorStartDate: gondorStartDate,
            shireStartDate: shireStartDate,
        });
    }

    onRivendellStartDateChange(rivendellStartDate) {
        let shireStartDate = this.state.shireStartDate;
        let selectedEvent = this.state.selectedEvent;
        let currentDate = this.state.date;

        currentDate = adjustDateForCurrentEvent(
            currentDate,
            selectedEvent,
            shireStartDate,
            rivendellStartDate
        );

        this.setState({
            calendarRules: 0,
            date: currentDate,
            rivendellStartDate: rivendellStartDate,
        });
    }

    render() {
        let currentDate = this.state.date;
        let shireStartDate = this.state.shireStartDate;
        let gondorStartDate = this.state.gondorStartDate;
        let rivendellStartDate = this.state.rivendellStartDate;
        let selectedEvent = this.state.selectedEvent;

        let eventOpts = DatesOfInterest.map((event, i) => (
            <option key={i} value={i}>
                {event.label
                    ? `${event.displayDate} | ${event.label}`
                    : event.label}
            </option>
        ));

        if (selectedEvent < 1) {
            let previousEvent = findPreviousEventIndex(
                currentDate,
                shireStartDate,
                rivendellStartDate
            );

            if (previousEvent > 0) {
                let blankEvent = eventOpts.shift();
                eventOpts.splice(previousEvent - 1, 0, blankEvent);
            }
        }

        return (
            <table className="simulated-calendar">
                <tbody>
                    <tr>
                        <th colSpan="3" className="simulated-date-controls">
                            Synchronize &nbsp;
                            <select
                                value={this.state.calendarRules}
                                onChange={this.onCalendarRulesChange}
                            >
                                {SyncAges.map(function(sync, i) {
                                    return (
                                        <option key={i} value={i}>
                                            {sync.label}
                                        </option>
                                    );
                                })}
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th colSpan="3" className="simulated-date-controls">
                            Dates of Interest:&nbsp;
                            <select
                                value={selectedEvent}
                                onChange={this.onDatesOfInterestChange}
                            >
                                {eventOpts}
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th className="simulated-date-controls" colSpan="2">
                            <DatePicker
                                date={currentDate}
                                onDateChanged={this.onDateChanged}
                                className="simulated-gregorian-date-picker"
                            />
                        </th>
                    </tr>
                    <tr>
                        <td style={CalendarCellStyle}>
                            <ShireCalendar
                                startDate={shireStartDate}
                                onCalendarStartChange={
                                    this.onShireStartDateChange
                                }
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                startDate={gondorStartDate}
                                onCalendarStartChange={
                                    this.onGondorStartDateChange
                                }
                                date={currentDate}
                                className="shire-calendar gondor-calendar"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={CalendarCellStyle} colSpan="2">
                            <RivendellCalendar
                                startDate={rivendellStartDate}
                                onCalendarStartChange={
                                    this.onRivendellStartDateChange
                                }
                                date={currentDate}
                                className="shire-calendar rivendell-calendar"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default SimulatedTolkienCalendars;
