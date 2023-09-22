/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { datesMatch, getNextDate } from "../../Utils";
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
import ShireDatePicker from "./ShireDatePicker";

import { CalendarCellStyle, DatePicker } from "../Common";
import "../examples.css";

const blankEvent = <option key="blankEvent" value={-1}></option>;

enum DatePickerStyle {
    Gregorian = "gregorian-reckoning",
    Shire = "shire-reckoning",
}

enum TimeOfDay {
    BeforeSunrise,
    Daytime,
    AfterSunset,
}

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

    const [customSyncScheme, setCustomSyncScheme] =
        React.useState<SecondAgeSyncScheme>();

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

    const [gondorDate, setGondorDate] = React.useState(currentDate);
    const [rivendellDate, setRivendellDate] = React.useState(currentDate);

    const [datePickerView, setDatePickerView] = React.useState(
        DatePickerStyle.Shire
    );

    const [timeOfDay, setTimeOfDay] = React.useState(TimeOfDay.Daytime);

    const updateTodayState = (currentDate: Date, nextTimeOfDay: TimeOfDay) => {
        let gondorDate = currentDate;
        let rivendellDate = currentDate;

        if (nextTimeOfDay === TimeOfDay.BeforeSunrise) {
            gondorDate = new Date(currentDate);
            gondorDate.setDate(currentDate.getDate() - 1);
        }

        if (nextTimeOfDay === TimeOfDay.AfterSunset) {
            rivendellDate = getNextDate(currentDate);
        }

        setGondorDate(gondorDate);
        setRivendellDate(rivendellDate);
        setCurrentDate(currentDate);
    };

    const onCalendarRulesChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const calendarRules = parseInt(event.target.value, 10);

        const startDates =
            calendarRules < SyncAges.length
                ? SyncAges[calendarRules].startDates
                : customSyncScheme?.startDates || SyncAges[0].startDates;

        const nextRivendellStartDate = startDates.rivendell;
        const nextGondorStartDate = startDates.gondor;
        const nextShireStartDate = startDates.shire;

        if (selectedEvent >= 0) {
            const adjustedDate = adjustDateForCurrentEvent(
                currentDate,
                selectedEvent,
                nextShireStartDate,
                nextRivendellStartDate
            );
            if (currentDate !== adjustedDate) {
                updateTodayState(adjustedDate, timeOfDay);
            }
        } else {
            const foundEvent = findEventIndex(
                currentDate,
                nextShireStartDate,
                nextRivendellStartDate
            );
            if (selectedEvent !== foundEvent) {
                setSelectedEvent(foundEvent);
                setTimeOfDay(TimeOfDay.Daytime);
                updateTodayState(currentDate, TimeOfDay.Daytime);
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

        const adjustedDate = adjustDateForCurrentEvent(
            currentDate,
            selectedEvent,
            shireStartDate,
            rivendellStartDate
        );
        if (currentDate !== adjustedDate) {
            setTimeOfDay(TimeOfDay.Daytime);
            updateTodayState(adjustedDate, TimeOfDay.Daytime);
        }

        setSelectedEvent(selectedEvent);
    };

    const onDateChanged = (currentDate: Date) => {
        setTimeOfDay(TimeOfDay.Daytime);
        updateTodayState(currentDate, TimeOfDay.Daytime);
        setSelectedEvent(
            findEventIndex(currentDate, shireStartDate, rivendellStartDate)
        );
    };

    const onTimeOfDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nextTimeOfDay = parseInt(event.target.value) as TimeOfDay;

        updateTodayState(currentDate, nextTimeOfDay);
        setTimeOfDay(nextTimeOfDay);
    };

    const onShireStartDateChange = (shireStartDate: Date) => {
        setCalendarRules(SyncAges.length);

        const adjustedDate = adjustDateForCurrentEvent(
            currentDate,
            selectedEvent,
            shireStartDate,
            rivendellStartDate
        );
        if (currentDate !== adjustedDate) {
            updateTodayState(adjustedDate, timeOfDay);
        }

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

        const adjustedDate = adjustDateForCurrentEvent(
            currentDate,
            selectedEvent,
            shireStartDate,
            rivendellStartDate
        );
        if (currentDate !== adjustedDate) {
            updateTodayState(adjustedDate, timeOfDay);
        }

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

        const adjustedDate = adjustDateForCurrentEvent(
            currentDate,
            selectedEvent,
            shireStartDate,
            rivendellStartDate
        );
        if (currentDate !== adjustedDate) {
            updateTodayState(adjustedDate, timeOfDay);
        }

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
                    <th className="simulated-date-controls simulated-date-picker">
                        <select
                            value={datePickerView}
                            onChange={(
                                event: React.ChangeEvent<HTMLSelectElement>
                            ) =>
                                setDatePickerView(
                                    event.target.value as DatePickerStyle
                                )
                            }
                        >
                            <option value={DatePickerStyle.Gregorian}>
                                Gregorian Date
                            </option>
                            <option value={DatePickerStyle.Shire}>
                                Shire-reckoning
                            </option>
                        </select>
                        {datePickerView === DatePickerStyle.Gregorian && (
                            <DatePicker
                                date={currentDate}
                                onDateChanged={onDateChanged}
                                label=""
                                className="simulated-gregorian-date-picker"
                            />
                        )}
                        {datePickerView === DatePickerStyle.Shire && (
                            <ShireDatePicker
                                today={currentDate}
                                shireStartDate={shireStartDate}
                                onDateChanged={onDateChanged}
                            />
                        )}
                    </th>
                    <th className="simulated-date-controls">
                        Time of Day:&nbsp;
                        <select value={timeOfDay} onChange={onTimeOfDayChange}>
                            <option value={TimeOfDay.BeforeSunrise}>
                                Before Sunrise
                            </option>
                            <option value={TimeOfDay.Daytime}>Daytime</option>
                            <option value={TimeOfDay.AfterSunset}>
                                After Sunset
                            </option>
                        </select>
                    </th>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar
                            date={currentDate}
                            startDate={shireStartDate}
                            onCalendarStartChange={onShireStartDateChange}
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar
                            date={gondorDate}
                            startDate={gondorStartDate}
                            onCalendarStartChange={onGondorStartDateChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td style={CalendarCellStyle} colSpan={2}>
                        <RivendellCalendar
                            date={rivendellDate}
                            startDate={rivendellStartDate}
                            onCalendarStartChange={onRivendellStartDateChange}
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
