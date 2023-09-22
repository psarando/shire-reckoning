/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { datesMatch } from "../../Utils";
import "../../ui/tolkien-calendars.css";

import ShireCalendar from "./ShireCalendar";
import RivendellCalendar from "./RivendellCalendar";
import GondorCalendar from "./GondorCalendars";
import {
    SyncAges,
    SecondAgeSyncScheme,
    DatesOfInterest,
    adjustDateForCurrentEvent,
    findEventIndex,
    findPreviousEventIndex,
} from "./DatesOfInterest";

import { CalendarCellStyle, DatePicker } from "../Common";
import "../examples.css";

const blankEvent = <option key="blankEvent" value={-1}></option>;

interface SimulatedTolkienCalendarsProps {
    calendarRules?: number;
    selectedEvent?: number;
    date?: Date;
}

export const SimulatedTolkienCalendars = (
    props: SimulatedTolkienCalendarsProps
) => {
    const initialDate = props.date || new Date();

    const initialSelectedEvent =
        props.selectedEvent
        && -1 <= props.selectedEvent
        && props.selectedEvent < DatesOfInterest.length
            ? props.selectedEvent
            : 13; // III 3019 Astron 6 | Elves' New Year

    const [calendarRules, setCalendarRules] = React.useState(
        props.calendarRules || 0 // Sync Gregorian years with Second Age years
    );

    const startDates = SyncAges[calendarRules]?.startDates;

    const [rivendellStartDate, setRivendellStartDate] = React.useState(
        startDates?.rivendell
    );
    const [gondorStartDate, setGondorStartDate] = React.useState(
        startDates?.gondor
    );
    const [shireStartDate, setShireStartDate] = React.useState(
        startDates?.shire
    );

    const [selectedEvent, setSelectedEvent] = React.useState(() => {
        if (initialSelectedEvent < 0) {
            return findEventIndex(
                initialDate,
                shireStartDate,
                rivendellStartDate
            );
        }

        return initialSelectedEvent;
    });

    const [currentDate, setCurrentDate] = React.useState(() => {
        if (initialSelectedEvent >= 0) {
            const adjustedDate = adjustDateForCurrentEvent(
                initialDate,
                initialSelectedEvent,
                shireStartDate,
                rivendellStartDate
            );
            if (!datesMatch(initialDate, adjustedDate)) {
                return adjustedDate;
            }
        }

        return initialDate;
    });

    const [customSyncScheme, setCustomSyncScheme] =
        React.useState<SecondAgeSyncScheme>();

    const onCalendarRulesChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const calendarRules = parseInt(event.target.value, 10);
        let nextRivendellStartDate = rivendellStartDate;
        let nextGondorStartDate = gondorStartDate;
        let nextShireStartDate = shireStartDate;

        const startDates =
            calendarRules < SyncAges.length
                ? SyncAges[calendarRules].startDates
                : customSyncScheme?.startDates || SyncAges[0].startDates;

        nextRivendellStartDate = startDates.rivendell;
        nextGondorStartDate = startDates.gondor;
        nextShireStartDate = startDates.shire;

        if (selectedEvent >= 0) {
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

    const onDatesOfInterestChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedEvent = parseInt(event.target.value, 10);

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

    const onDateChanged = (currentDate: Date) => {
        setCurrentDate(currentDate);
        setSelectedEvent(
            findEventIndex(currentDate, shireStartDate, rivendellStartDate)
        );
    };

    const onShireStartDateChange = (shireStartDate: Date) => {
        setCalendarRules(SyncAges.length);
        setCurrentDate(
            adjustDateForCurrentEvent(
                currentDate,
                selectedEvent,
                shireStartDate,
                rivendellStartDate
            )
        );
        const gondorStartDate = new Date(shireStartDate);
        setGondorStartDate(gondorStartDate);
        setShireStartDate(shireStartDate);

        setCustomSyncScheme({
            label: "Custom Reckoning",
            startDates: {
                rivendell: rivendellStartDate,
                gondor: gondorStartDate,
                shire: shireStartDate,
            },
        });
    };

    const onGondorStartDateChange = (gondorStartDate: Date) => {
        const shireStartDate = new Date(gondorStartDate);

        setCalendarRules(SyncAges.length);
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

        setCustomSyncScheme({
            label: "Custom Reckoning",
            startDates: {
                rivendell: rivendellStartDate,
                gondor: gondorStartDate,
                shire: shireStartDate,
            },
        });
    };

    const onRivendellStartDateChange = (rivendellStartDate: Date) => {
        setCalendarRules(SyncAges.length);
        setCurrentDate(
            adjustDateForCurrentEvent(
                currentDate,
                selectedEvent,
                shireStartDate,
                rivendellStartDate
            )
        );
        setRivendellStartDate(rivendellStartDate);

        setCustomSyncScheme({
            label: "Custom Reckoning",
            startDates: {
                rivendell: rivendellStartDate,
                gondor: gondorStartDate,
                shire: shireStartDate,
            },
        });
    };

    const eventOpts = DatesOfInterest.map((event, i) => (
        <option key={i} value={i}>
            {event.label
                ? `${event.displayDate} | ${event.label}`
                : event.label}
        </option>
    ));

    if (selectedEvent === -1) {
        const previousEvent = findPreviousEventIndex(
            currentDate,
            shireStartDate,
            rivendellStartDate
        );

        if (previousEvent >= 0) {
            eventOpts.splice(previousEvent, 0, blankEvent);
        } else {
            eventOpts.unshift(blankEvent);
        }
    }

    const syncSchemes = [...SyncAges];
    if (customSyncScheme) {
        syncSchemes.push(customSyncScheme);
    }
    const syncOptions = syncSchemes.map(function (sync, i) {
        return (
            <option key={i} value={i}>
                {sync.label}
            </option>
        );
    });

    return (
        <table className="simulated-calendar">
            <tbody>
                <tr>
                    <th colSpan={3} className="simulated-date-controls">
                        Synchronize &nbsp;
                        <select
                            value={calendarRules}
                            onChange={onCalendarRulesChange}
                        >
                            {syncOptions}
                        </select>
                    </th>
                </tr>
                <tr>
                    <th colSpan={3} className="simulated-date-controls">
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
                    <th className="simulated-date-controls" colSpan={2}>
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
                    <td style={CalendarCellStyle} colSpan={2}>
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

const meta = {
    title: "Shire Reckoning / Middle-earth Simulation",

    parameters: {
        options: { showPanel: false },
    },

    component: SimulatedTolkienCalendars,
    excludeStories: ["SimulatedTolkienCalendars"],
} satisfies Meta<typeof SimulatedTolkienCalendars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Elves_NewYear_sDayInT_A_3019DefaultExample: Story = {
    name: "Elves' New Year's Day in T.A. 3019 (default example)",
};

export const _2020_21MoonPhaseSynchronizedSimulation: Story = {
    name: "2020-21 moon phase synchronized simulation",
    args: { calendarRules: 2, selectedEvent: -1 },
};

export const _2017_18MoonPhaseSynchronizedSimulation: Story = {
    name: "2017-18 moon phase synchronized simulation",
    args: { calendarRules: 3, selectedEvent: -1 },
};

export const _1941_42MoonPhaseSynchronizedSimulation: Story = {
    name: "1941-42 moon phase synchronized simulation",
    args: { calendarRules: 4, selectedEvent: -1 },
};
