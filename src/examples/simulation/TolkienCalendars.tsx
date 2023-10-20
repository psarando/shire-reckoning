/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { datesMatch, getNextDate, getPrevDate } from "../../Utils";
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

import {
    ArrowKeyNavSelect,
    CalendarCellStyle,
    DatePicker,
    OutlinedSelect,
} from "../Common";
import theme from "../theme";
import "../examples.css";

const ta3019_4_6_EventIndex = DatesOfInterest.findIndex(
    ({ year, month, day }) => 3019 + 3441 === year && 3 === month && 6 === day
);

const blankEvent = (
    <MenuItem key="blankEvent" value={-1}>
        &nbsp;
    </MenuItem>
);

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
            : -1;

    const [calendarRules, setCalendarRules] = React.useState(
        props.calendarRules || props.calendarRules === 0
            ? props.calendarRules
            : 2 // Sync 2020-21 Moon phases with T.A. 3018-19
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
        DatePickerStyle.Gregorian
    );

    const [timeOfDay, setTimeOfDay] = React.useState(TimeOfDay.Daytime);

    const toggleDatePickerView = () => {
        if (datePickerView === DatePickerStyle.Shire) {
            setDatePickerView(DatePickerStyle.Gregorian);
        } else {
            setDatePickerView(DatePickerStyle.Shire);
        }
    };

    const updateTodayState = (currentDate: Date, nextTimeOfDay: TimeOfDay) => {
        let gondorDate = currentDate;
        let rivendellDate = currentDate;

        if (nextTimeOfDay === TimeOfDay.BeforeSunrise) {
            gondorDate = getPrevDate(currentDate);
        }

        if (nextTimeOfDay === TimeOfDay.AfterSunset) {
            rivendellDate = getNextDate(currentDate);
        }

        setGondorDate(gondorDate);
        setRivendellDate(rivendellDate);
        setCurrentDate(currentDate);
    };

    const onCalendarRulesChange = (calendarRules: number) => {
        const startDates =
            calendarRules < SyncAges.length
                ? SyncAges[calendarRules].startDates
                : customSyncScheme?.startDates || SyncAges[0].startDates;

        const nextRivendellStartDate = startDates.rivendell;
        const nextGondorStartDate = startDates.gondor;
        const nextShireStartDate = startDates.shire;

        let adjustedDate = currentDate;
        let nextSelectedEvent = selectedEvent;
        if (nextSelectedEvent === -1 && calendarRules === 0) {
            nextSelectedEvent = ta3019_4_6_EventIndex;
        }

        if (nextSelectedEvent >= 0) {
            adjustedDate = adjustDateForCurrentEvent(
                currentDate,
                nextSelectedEvent,
                nextShireStartDate,
                nextRivendellStartDate
            );
            if (currentDate !== adjustedDate) {
                updateTodayState(adjustedDate, timeOfDay);
            }
        } else {
            nextSelectedEvent = findEventIndex(
                currentDate,
                nextShireStartDate,
                nextRivendellStartDate
            );
        }

        if (selectedEvent !== nextSelectedEvent) {
            setSelectedEvent(nextSelectedEvent);
            setTimeOfDay(TimeOfDay.Daytime);
            updateTodayState(adjustedDate, TimeOfDay.Daytime);
        }

        setCalendarRules(calendarRules);
        setRivendellStartDate(nextRivendellStartDate);
        setGondorStartDate(nextGondorStartDate);
        setShireStartDate(nextShireStartDate);
    };

    const prevSyncScheme = () => {
        if (calendarRules > 0) {
            onCalendarRulesChange(calendarRules - 1);
        }
    };

    const nextSyncScheme = () => {
        if (calendarRules < SyncAges.length - 1) {
            onCalendarRulesChange(calendarRules + 1);
        }
    };

    const onDatesOfInterestChange = (selectedEvent: number) => {
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

    const prevEventOfInterest = () => {
        if (selectedEvent === -1) {
            const nextEvent = findPreviousEventIndex(
                currentDate,
                shireStartDate,
                rivendellStartDate
            );
            if (nextEvent > 0) {
                onDatesOfInterestChange(nextEvent - 1);
            }
        } else if (selectedEvent > 0) {
            onDatesOfInterestChange(selectedEvent - 1);
        }
    };

    const nextEventOfInterest = () => {
        if (selectedEvent === -1) {
            onDatesOfInterestChange(
                findPreviousEventIndex(
                    currentDate,
                    shireStartDate,
                    rivendellStartDate
                )
            );
        } else if (selectedEvent < DatesOfInterest.length - 1) {
            onDatesOfInterestChange(selectedEvent + 1);
        }
    };

    const onDateChanged = (currentDate: Date) => {
        setTimeOfDay(TimeOfDay.Daytime);
        updateTodayState(currentDate, TimeOfDay.Daytime);
        setSelectedEvent(
            findEventIndex(currentDate, shireStartDate, rivendellStartDate)
        );
    };

    const onTimeOfDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <MenuItem key={i} value={i}>
            {event.label ? (
                `${event.displayDate} | ${event.label}`
            ) : (
                <>&nbsp;</>
            )}
        </MenuItem>
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
            <MenuItem key={i} value={i}>
                {sync.label}
            </MenuItem>
        );
    });

    return (
        <table className="simulated-calendar">
            <tbody>
                <tr>
                    <th colSpan={3} className="simulated-date-controls">
                        <ArrowKeyNavSelect
                            label="Synchronize"
                            style={{ width: "33rem" }}
                            value={calendarRules}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                onCalendarRulesChange(
                                    parseInt(event.target.value, 10)
                                )
                            }
                            onArrowUp={prevSyncScheme}
                            onArrowLeft={prevSyncScheme}
                            onArrowDown={nextSyncScheme}
                            onArrowRight={nextSyncScheme}
                        >
                            {syncOptions}
                        </ArrowKeyNavSelect>
                    </th>
                </tr>
                <tr>
                    <th colSpan={3} className="simulated-date-controls">
                        <ArrowKeyNavSelect
                            label="Dates of Interest"
                            style={{ width: "60rem", marginTop: ".33rem" }}
                            value={selectedEvent}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                onDatesOfInterestChange(
                                    parseInt(event.target.value, 10)
                                )
                            }
                            onArrowUp={prevEventOfInterest}
                            onArrowLeft={prevEventOfInterest}
                            onArrowDown={nextEventOfInterest}
                            onArrowRight={nextEventOfInterest}
                        >
                            {eventOpts}
                        </ArrowKeyNavSelect>
                    </th>
                </tr>
                <tr>
                    <th className="simulated-date-controls" colSpan={2}>
                        <Stack direction="row" mt={1}>
                            <Toolbar style={{ paddingRight: 0 }}>
                                <ArrowKeyNavSelect
                                    color="success"
                                    value={datePickerView}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLSelectElement>
                                    ) =>
                                        setDatePickerView(
                                            event.target
                                                .value as DatePickerStyle
                                        )
                                    }
                                    onArrowUp={toggleDatePickerView}
                                    onArrowLeft={toggleDatePickerView}
                                    onArrowDown={toggleDatePickerView}
                                    onArrowRight={toggleDatePickerView}
                                >
                                    <MenuItem value={DatePickerStyle.Gregorian}>
                                        <Typography variant="h6">
                                            Gregorian Date
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem value={DatePickerStyle.Shire}>
                                        <Typography variant="h6">
                                            Shire-reckoning
                                        </Typography>
                                    </MenuItem>
                                </ArrowKeyNavSelect>
                            </Toolbar>
                            {datePickerView === DatePickerStyle.Gregorian && (
                                <DatePicker
                                    date={currentDate}
                                    onDateChanged={onDateChanged}
                                    todayEnabled={!!calendarRules}
                                    label=""
                                    className="simulated-gregorian-date-picker"
                                />
                            )}
                            {datePickerView === DatePickerStyle.Shire && (
                                <ShireDatePicker
                                    today={currentDate}
                                    shireStartDate={shireStartDate}
                                    onDateChanged={onDateChanged}
                                    todayEnabled={!!calendarRules}
                                />
                            )}
                            <Toolbar>
                                <OutlinedSelect
                                    label="Time of Day"
                                    value={timeOfDay}
                                    onChange={onTimeOfDayChange}
                                >
                                    <MenuItem value={TimeOfDay.BeforeSunrise}>
                                        Before Sunrise
                                    </MenuItem>
                                    <MenuItem value={TimeOfDay.Daytime}>
                                        Daytime
                                    </MenuItem>
                                    <MenuItem value={TimeOfDay.AfterSunset}>
                                        After Sunset
                                    </MenuItem>
                                </OutlinedSelect>
                            </Toolbar>
                        </Stack>
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

export const StyledSimulations = (props: SimulatedTolkienCalendarsProps) => (
    <ThemeProvider theme={theme}>
        <SimulatedTolkienCalendars {...props} />
    </ThemeProvider>
);

const meta = {
    title: "Shire Reckoning / Middle-earth Simulation",

    parameters: {
        options: { showPanel: false },
    },

    component: StyledSimulations,
    excludeStories: ["SimulatedTolkienCalendars", "StyledSimulations"],
} satisfies Meta<typeof StyledSimulations>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Elves_NewYear_sDayInT_A_3019DefaultExample: Story = {
    name: "Elves' New Year's Day in T.A. 3019",
    args: { calendarRules: 0, selectedEvent: ta3019_4_6_EventIndex },
};

export const _2020_21MoonPhaseSynchronizedSimulation: Story = {
    name: "2020-21 moon phase synchronized simulation (default example)",
};

export const _2017_18MoonPhaseSynchronizedSimulation: Story = {
    name: "2017-18 moon phase synchronized simulation",
    args: { calendarRules: 3, selectedEvent: -1 },
};

export const _1941_42MoonPhaseSynchronizedSimulation: Story = {
    name: "1941-42 moon phase synchronized simulation",
    args: { calendarRules: 4, selectedEvent: -1 },
};
