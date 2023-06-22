/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { datesMatch } from "../../Utils";
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

export const SimulatedTolkienCalendars = (props) => {
    const [calendarRules, setCalendarRules] = React.useState(
        props.calendarRules || 1 // Sync Gregorian years with Second Age years
    );
    const [selectedEvent, setSelectedEvent] = React.useState(
        props.selectedEvent >= 0 ? props.selectedEvent : 14 // III 3019 Astron 6 | Elves' New Year
    );
    const [currentDate, setCurrentDate] = React.useState(
        props.date || new Date()
    );

    const startDates = SyncAges[calendarRules].startDates;

    const [rivendellStartDate, setRivendellStartDate] = React.useState(
        startDates?.rivendell
    );
    const [gondorStartDate, setGondorStartDate] = React.useState(
        startDates?.gondor
    );
    const [shireStartDate, setShireStartDate] = React.useState(
        startDates?.shire
    );

    if (selectedEvent) {
        const adjustedDate = adjustDateForCurrentEvent(
            currentDate,
            selectedEvent,
            shireStartDate,
            rivendellStartDate
        );
        if (!datesMatch(currentDate, adjustedDate)) {
            setCurrentDate(adjustedDate);
        }
    } else {
        const foundEvent = findEventIndex(
            currentDate,
            shireStartDate,
            rivendellStartDate
        );
        if (selectedEvent !== foundEvent) {
            setSelectedEvent(foundEvent);
        }
    }

    const onCalendarRulesChange = (event) => {
        let calendarRules = event.target.value;
        let nextRivendellStartDate = rivendellStartDate;
        let nextGondorStartDate = gondorStartDate;
        let nextShireStartDate = shireStartDate;

        if (calendarRules > 0) {
            const startDates = SyncAges[calendarRules].startDates;

            nextRivendellStartDate = startDates.rivendell;
            nextGondorStartDate = startDates.gondor;
            nextShireStartDate = startDates.shire;
        }

        if (selectedEvent) {
            const adjustedDate = adjustDateForCurrentEvent(
                currentDate,
                selectedEvent,
                nextShireStartDate,
                nextRivendellStartDate
            );
            if (!datesMatch(currentDate, adjustedDate)) {
                setCurrentDate(adjustedDate);
            }
        } else {
            const foundEvent = findEventIndex(
                currentDate,
                nextShireStartDate,
                nextRivendellStartDate
            );
            if (selectedEvent !== foundEvent) {
                setSelectedEvent(foundEvent);
            }
        }

        setCalendarRules(calendarRules);
        setRivendellStartDate(nextRivendellStartDate);
        setGondorStartDate(nextGondorStartDate);
        setShireStartDate(nextShireStartDate);
    };

    const onDatesOfInterestChange = (event) => {
        let selectedEvent = event.target.value;

        setCurrentDate(
            adjustDateForCurrentEvent(
                currentDate,
                selectedEvent,
                shireStartDate,
                rivendellStartDate
            )
        );

        setSelectedEvent(selectedEvent);
    };

    const onDateChanged = (currentDate) => {
        setCurrentDate(currentDate);
        setSelectedEvent(
            findEventIndex(currentDate, shireStartDate, rivendellStartDate)
        );
    };

    const onShireStartDateChange = (shireStartDate) => {
        setCalendarRules(0);
        setCurrentDate(
            adjustDateForCurrentEvent(
                currentDate,
                selectedEvent,
                shireStartDate,
                rivendellStartDate
            )
        );
        setGondorStartDate(new Date(shireStartDate));
        setShireStartDate(shireStartDate);
    };

    const onGondorStartDateChange = (gondorStartDate) => {
        const shireStartDate = new Date(gondorStartDate);

        setCalendarRules(0);
        setCurrentDate(
            adjustDateForCurrentEvent(
                currentDate,
                selectedEvent,
                shireStartDate,
                rivendellStartDate
            )
        );
        setGondorStartDate(gondorStartDate);
        setShireStartDate(shireStartDate);
    };

    const onRivendellStartDateChange = (rivendellStartDate) => {
        setCalendarRules(0);
        setCurrentDate(
            adjustDateForCurrentEvent(
                currentDate,
                selectedEvent,
                shireStartDate,
                rivendellStartDate
            )
        );
        setRivendellStartDate(rivendellStartDate);
    };

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
                            value={calendarRules}
                            onChange={onCalendarRulesChange}
                        >
                            {SyncAges.map(function (sync, i) {
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
                            onChange={onDatesOfInterestChange}
                        >
                            {eventOpts}
                        </select>
                    </th>
                </tr>
                <tr>
                    <th className="simulated-date-controls" colSpan="2">
                        <DatePicker
                            date={currentDate}
                            onDateChanged={onDateChanged}
                            className="simulated-gregorian-date-picker"
                        />
                    </th>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar
                            startDate={shireStartDate}
                            onCalendarStartChange={onShireStartDateChange}
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar
                            startDate={gondorStartDate}
                            onCalendarStartChange={onGondorStartDateChange}
                            date={currentDate}
                            className="shire-calendar gondor-calendar"
                        />
                    </td>
                </tr>
                <tr>
                    <td style={CalendarCellStyle} colSpan="2">
                        <RivendellCalendar
                            startDate={rivendellStartDate}
                            onCalendarStartChange={onRivendellStartDateChange}
                            date={currentDate}
                            className="shire-calendar rivendell-calendar"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default {
    title: "Shire Reckoning / Middle-earth Simulation",

    parameters: {
        options: { showPanel: false },
    },

    component: SimulatedTolkienCalendars,
    excludeStories: ["SimulatedTolkienCalendars"],
};

export const Elves_NewYear_sDayInT_A_3019DefaultExample = {
    name: "Elves' New Year's Day in T.A. 3019 (default example)",
};

export const _2020_21MoonPhaseSynchronizedSimulation = {
    name: "2020-21 moon phase synchronized simulation",
    args: { calendarRules: 3, selectedEvent: 0 },
};

export const _2017_18MoonPhaseSynchronizedSimulation = {
    name: "2017-18 moon phase synchronized simulation",
    args: { calendarRules: 4, selectedEvent: 0 },
};

export const _1941_42MoonPhaseSynchronizedSimulation = {
    name: "1941-42 moon phase synchronized simulation",
    args: { calendarRules: 5, selectedEvent: 0 },
};
