/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import { datesMatch, fullYearDate } from "../Utils";

import ShireCalendar from "../ui/ShireCalendar";
import GondorCalendar from "../ui/GondorCalendar";
import RivendellCalendar from "../ui/RivendellCalendar";
import "../ui/tolkien-calendars.css";

import ShireCalendarWithControls from "./ShireCalendarWithControls";
import RivendellCalendarWithControls from "./RivendellCalendarWithControls";
import GondorCalendarWithControls from "./GondorCalendarWithControls";

import { CalendarCellStyle, DatePicker } from "./Common";
import "./examples.css";

/**
 * @typedef {Object} ShireCalendarSyncScheme
 * @property {string} label - Display label for this synchronization scheme.
 * @property {Date} startDate - The Gregorian Date of the first Shire New Year Date.
 */

/**
 * Shire Calendar synchronization schemes.
 * @constant
 * @type {ShireCalendarSyncScheme[]}
 */
const SyncShireCalendar = [
    { label: "Custom Reckoning" },
    {
        label: "Mid-year's Day with the modern summer solstice.",
        startDate: fullYearDate(0, 11, 21),
    },
    {
        label: "Shire 'January' 9 with modern New Year's Day.",
        startDate: fullYearDate(0, 11, 23),
    },
    {
        label: "Shire New Year's Day with modern Christmas Day.",
        startDate: fullYearDate(0, 11, 25),
    },
];

/**
 * @typedef {Object} RivendellCalendarSyncScheme
 * @property {string} label - Display label for this synchronization scheme.
 * @property {string} subtitle - Extra display info for this synchronization scheme.
 * @property {Date} startDate - The Gregorian Date of the first Rivendell New Year Date.
 * @property {RivendellRulesEnum} calendarRules
 */

/**
 * Rivendell Calendar synchronization schemes.
 * @constant
 * @type {RivendellCalendarSyncScheme[]}
 */
const SyncRivendellCalendar = [
    { label: "Custom Reckoning" },
    {
        label: `Enderi with "Hobbit Day"`,
        subtitle: "modern September 22, as Tolkien could have intended",
        startDate: fullYearDate(1, 2, 22),
        calendarRules: RivendellCalendar.TRADITIONAL_RULES,
    },
    {
        label: "Yestarë with modern March 25",
        subtitle: `as Tolkien probably intended, but with "Reformed" rules`,
        startDate: fullYearDate(1, 2, 25),
        calendarRules: RivendellCalendar.REFORMED_RULES,
    },
    {
        label: `Yestarë with Shire 'April' 6, "more or less"`,
        subtitle: "the way it may have been by the end of the Third Age",
        startDate: fullYearDate(1, 2, 25),
        calendarRules: RivendellCalendar.TRADITIONAL_RULES,
    },
    {
        label: `with Boris Shapiro's "7th Age" Reckoning`,
        subtitle: "as used by Quenya101.com",
        startDate: fullYearDate(1, 2, 27),
        calendarRules: RivendellCalendar.TRADITIONAL_RULES,
    },
];

const findRivendellSyncIndex = (rivendellStartDate, rivendellCalendarRules) => {
    let rivendellSyncScheme = SyncRivendellCalendar.findIndex(
        syncScheme =>
            syncScheme.calendarRules === rivendellCalendarRules
            && syncScheme.startDate
            && datesMatch(syncScheme.startDate, rivendellStartDate)
    );

    if (rivendellSyncScheme < 0) {
        rivendellSyncScheme = 0;
    }

    return rivendellSyncScheme;
};

const adjustRivendellAprilSyncScheme = (
    shireStartDate,
    rivendellStartDate,
    rivendellSyncScheme
) => {
    const rivendellAprilSyncScheme = SyncRivendellCalendar[3];
    rivendellAprilSyncScheme.startDate = new Date(
        rivendellAprilSyncScheme.startDate
    );
    rivendellAprilSyncScheme.startDate.setDate(
        25 + shireStartDate.getDate() - 21
    );

    if (
        SyncRivendellCalendar[rivendellSyncScheme] === rivendellAprilSyncScheme
    ) {
        rivendellStartDate = rivendellAprilSyncScheme.startDate;
    }

    return rivendellStartDate;
};

class TolkienCalendarsExample extends Component {
    constructor(props) {
        super(props);

        const currentDate = props.date || new Date();

        const shireSyncScheme =
            props.shireSyncScheme > 0 ? props.shireSyncScheme : 1;
        const shireStartDate = SyncShireCalendar[shireSyncScheme].startDate;

        const gondorLeftStartDate = new Date(shireStartDate);
        const gondorRightStartDate = new Date(shireStartDate);

        const rivendellSyncScheme =
            props.rivendellSyncScheme > 0 ? props.rivendellSyncScheme : 1;
        const rivendellSync = SyncRivendellCalendar[rivendellSyncScheme];
        const rivendellStartDate = rivendellSync.startDate;
        const rivendellCalendarRules = rivendellSync.calendarRules;

        this.state = {
            date: currentDate,
            shireAlign: false,
            rivendellAlign: false,
            shireSyncScheme,
            shireStartDate,
            gondorLeftStartDate,
            gondorRightStartDate,
            rivendellSyncScheme,
            rivendellStartDate,
            rivendellCalendarRules,
        };

        this.onDateChanged = this.onDateChanged.bind(this);
        this.alignChanged = this.alignChanged.bind(this);
        this.onShireSyncChange = this.onShireSyncChange.bind(this);
        this.onShireStartDateChange = this.onShireStartDateChange.bind(this);
        this.onGondorLeftStartDateChange = this.onGondorLeftStartDateChange.bind(
            this
        );
        this.onGondorRightStartDateChange = this.onGondorRightStartDateChange.bind(
            this
        );
        this.onRivendellSyncChange = this.onRivendellSyncChange.bind(this);
        this.onRivendellStartDateChange = this.onRivendellStartDateChange.bind(
            this
        );
        this.onRivendellRulesChange = this.onRivendellRulesChange.bind(this);
    }

    onDateChanged(currentDate) {
        this.setState({ date: currentDate });
    }

    alignChanged(event) {
        let checked = event.target.checked;
        let shireAlign = event.target.value === "shire" && checked;
        let rivendellAlign = event.target.value === "rivendell" && checked;

        this.setState({
            shireAlign,
            rivendellAlign,
        });
    }

    onShireSyncChange(event) {
        const shireSyncScheme = event.target.value;

        let {
            shireStartDate,
            gondorLeftStartDate,
            gondorRightStartDate,
            rivendellStartDate,
            rivendellSyncScheme,
        } = this.state;

        if (shireSyncScheme > 0) {
            shireStartDate = SyncShireCalendar[shireSyncScheme].startDate;

            gondorLeftStartDate = new Date(shireStartDate);
            gondorRightStartDate = new Date(shireStartDate);

            rivendellStartDate = adjustRivendellAprilSyncScheme(
                shireStartDate,
                rivendellStartDate,
                rivendellSyncScheme
            );
        }

        this.setState({
            shireSyncScheme,
            shireStartDate,
            gondorLeftStartDate,
            gondorRightStartDate,
            rivendellStartDate,
        });
    }

    onShireStartDateChange(shireStartDate) {
        const { gondorLeftStartDate, gondorRightStartDate } = this.state;
        this.adjustShireSyncScheme(
            shireStartDate,
            gondorLeftStartDate,
            gondorRightStartDate
        );
    }

    onGondorLeftStartDateChange(gondorLeftStartDate) {
        const { shireStartDate, gondorRightStartDate } = this.state;
        this.adjustShireSyncScheme(
            shireStartDate,
            gondorLeftStartDate,
            gondorRightStartDate
        );
    }

    onGondorRightStartDateChange(gondorRightStartDate) {
        const { shireStartDate, gondorLeftStartDate } = this.state;
        this.adjustShireSyncScheme(
            shireStartDate,
            gondorLeftStartDate,
            gondorRightStartDate
        );
    }

    adjustShireSyncScheme(
        shireStartDate,
        gondorLeftStartDate,
        gondorRightStartDate
    ) {
        let shireSyncScheme = SyncShireCalendar.findIndex(
            syncScheme =>
                syncScheme.startDate
                && datesMatch(syncScheme.startDate, shireStartDate)
        );

        if (
            shireSyncScheme < 0
            || !datesMatch(shireStartDate, gondorLeftStartDate)
            || !datesMatch(shireStartDate, gondorRightStartDate)
        ) {
            shireSyncScheme = 0;
        }

        let { rivendellStartDate } = this.state;

        rivendellStartDate = adjustRivendellAprilSyncScheme(
            shireStartDate,
            rivendellStartDate,
            this.state.rivendellSyncScheme
        );

        this.setState({
            shireStartDate,
            gondorLeftStartDate,
            gondorRightStartDate,
            shireSyncScheme,
            rivendellStartDate,
        });
    }

    onRivendellSyncChange(event) {
        const rivendellSyncScheme = event.target.value;
        let { rivendellStartDate, rivendellCalendarRules } = this.state;

        if (rivendellSyncScheme > 0) {
            const syncScheme = SyncRivendellCalendar[rivendellSyncScheme];
            rivendellStartDate = syncScheme.startDate;
            rivendellCalendarRules = syncScheme.calendarRules;
        }

        this.setState({
            rivendellSyncScheme,
            rivendellStartDate,
            rivendellCalendarRules,
        });
    }

    onRivendellStartDateChange(rivendellStartDate) {
        const { rivendellCalendarRules } = this.state;
        const rivendellSyncScheme = findRivendellSyncIndex(
            rivendellStartDate,
            rivendellCalendarRules
        );

        this.setState({
            rivendellStartDate,
            rivendellSyncScheme,
        });
    }

    onRivendellRulesChange(event) {
        const rivendellCalendarRules = event.target.value;
        const rivendellSyncScheme = findRivendellSyncIndex(
            this.state.rivendellStartDate,
            rivendellCalendarRules
        );

        this.setState({
            rivendellCalendarRules,
            rivendellSyncScheme,
        });
    }

    render() {
        const {
            date: currentDate,
            shireAlign,
            rivendellAlign,
            shireSyncScheme,
            shireStartDate,
            gondorLeftStartDate,
            gondorRightStartDate,
            rivendellSyncScheme,
            rivendellStartDate,
            rivendellCalendarRules,
        } = this.state;

        let shireCellClassName = "";
        if (shireAlign) {
            shireCellClassName = " align-shire-calendar";
        }
        let rivendellCellClassName = "";
        if (rivendellAlign) {
            rivendellCellClassName = " align-rivendell-calendar";
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <td colSpan="2">
                            <DatePicker
                                date={currentDate}
                                onDateChanged={this.onDateChanged}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th className="sync-calendar-controls">
                            Synchronize
                            <br />
                            <select
                                value={shireSyncScheme}
                                onChange={this.onShireSyncChange}
                            >
                                {SyncShireCalendar.map(function(sync, i) {
                                    return (
                                        <option key={i} value={i}>
                                            {sync.label}
                                        </option>
                                    );
                                })}
                            </select>
                        </th>
                        <th className="sync-calendar-controls">
                            Synchronize
                            <br />
                            <select
                                value={rivendellSyncScheme}
                                onChange={this.onRivendellSyncChange}
                            >
                                {SyncRivendellCalendar.map(function(sync, i) {
                                    return (
                                        <option key={i} value={i}>
                                            {sync.subtitle
                                                ? `${sync.label} (${
                                                      sync.subtitle
                                                  }).`
                                                : sync.label}
                                        </option>
                                    );
                                })}
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                value="shire"
                                checked={shireAlign}
                                onChange={this.alignChanged}
                            />
                            Try to align Shire Year with Rivendell Year?
                        </th>
                        <th>
                            <input
                                type="checkbox"
                                value="rivendell"
                                checked={rivendellAlign}
                                onChange={this.alignChanged}
                            />
                            Try to align Rivendell Year with Shire Year?
                        </th>
                    </tr>
                    <tr>
                        <td
                            style={CalendarCellStyle}
                            className={shireCellClassName}
                        >
                            <ShireCalendarWithControls
                                caption={true}
                                region={ShireCalendar.REGION_NAMES_TOLKIEN}
                                monthViewLayout={
                                    ShireCalendar.MONTH_VIEW_HORIZONTAL
                                }
                                date={currentDate}
                                startDate={shireStartDate}
                                onCalendarStartChange={
                                    this.onShireStartDateChange
                                }
                                className="shire-calendar"
                                yearView={shireAlign || rivendellAlign}
                            />
                        </td>
                        <td
                            style={CalendarCellStyle}
                            className={rivendellCellClassName}
                        >
                            <RivendellCalendarWithControls
                                caption={true}
                                date={currentDate}
                                startDate={rivendellStartDate}
                                calendarRules={rivendellCalendarRules}
                                onCalendarStartChange={
                                    this.onRivendellStartDateChange
                                }
                                onCalendarRulesChange={
                                    this.onRivendellRulesChange
                                }
                                className="shire-calendar rivendell-calendar"
                                yearView={shireAlign || rivendellAlign}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={CalendarCellStyle}>
                            <GondorCalendarWithControls
                                caption={true}
                                language={GondorCalendar.LANGUAGE_ENGLISH}
                                monthViewLayout={
                                    GondorCalendar.MONTH_VIEW_HORIZONTAL
                                }
                                date={currentDate}
                                startDate={gondorLeftStartDate}
                                onCalendarStartChange={
                                    this.onGondorLeftStartDateChange
                                }
                                className="shire-calendar gondor-calendar stewards-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <GondorCalendarWithControls
                                caption={true}
                                reckoning={GondorCalendar.RECKONING_NEW}
                                date={currentDate}
                                startDate={gondorRightStartDate}
                                onCalendarStartChange={
                                    this.onGondorRightStartDateChange
                                }
                                className="shire-calendar gondor-calendar new-reckoning-calendar"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default TolkienCalendarsExample;
