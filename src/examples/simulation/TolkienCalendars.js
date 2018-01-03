/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";
import { storiesOf } from "@storybook/react";

import MenuItem from "@material-ui/core/MenuItem";
import { ThemeProvider } from "@material-ui/styles";

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

import { CalendarCellStyle, DatePicker, OutlinedSelect } from "../Common";
import theme from "../theme";
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
            <MenuItem key={i} value={i}>
                {event.label
                    ? `${event.displayDate} | ${event.label}`
                    : event.label}
            </MenuItem>
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
                            <OutlinedSelect
                                label="Synchronize"
                                style={{ width: "33rem" }}
                                value={this.state.calendarRules}
                                onChange={this.onCalendarRulesChange}
                            >
                                {SyncAges.map(function(sync, i) {
                                    return (
                                        <MenuItem key={i} value={i}>
                                            {sync.label}
                                        </MenuItem>
                                    );
                                })}
                            </OutlinedSelect>
                        </th>
                    </tr>
                    <tr>
                        <th colSpan="3" className="simulated-date-controls">
                            <OutlinedSelect
                                label="Dates of Interest"
                                style={{ width: "60rem" }}
                                value={selectedEvent}
                                onChange={this.onDatesOfInterestChange}
                            >
                                {eventOpts}
                            </OutlinedSelect>
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
                                className="shire-calendar shire-calendar-styled-example"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                startDate={gondorStartDate}
                                onCalendarStartChange={
                                    this.onGondorStartDateChange
                                }
                                date={currentDate}
                                className="shire-calendar gondor-calendar shire-calendar-styled-example"
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
                                className="shire-calendar rivendell-calendar shire-calendar-styled-example"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

const StyledSimulations = props => (
    <ThemeProvider theme={theme}>
        <SimulatedTolkienCalendars {...props} />
    </ThemeProvider>
);

storiesOf("Shire Reckoning: Middle-earth Simulation", module)
    .addParameters({ options: { showPanel: false } })
    .add("Elves' New Year's Day in T.A. 3019 (default example)", () => (
        <StyledSimulations />
    ))
    .add("2020-21 moon phase synchronized simulation", () => (
        <StyledSimulations calendarRules={3} selectedEvent={0} />
    ))
    .add("2017-18 moon phase synchronized simulation", () => (
        <StyledSimulations calendarRules={4} selectedEvent={0} />
    ))
    .add("1941-42 moon phase synchronized simulation", () => (
        <StyledSimulations calendarRules={5} selectedEvent={0} />
    ));

export default StyledSimulations;
