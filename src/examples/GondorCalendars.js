/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import { fullYearDate } from "../Utils";

import GondorCalendar from "../ui/GondorCalendar";
import "../ui/tolkien-calendars.css";

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from "./Common";

class GondorCalendarExample extends Component {
    constructor(props) {
        super(props);

        this.state = { date: new Date() };
        this.onDateChanged = this.onDateChanged.bind(this);
    }

    onDateChanged(currentDate) {
        this.setState({ date: currentDate });
    }

    render() {
        let currentDate = this.state.date;
        let dateString =
            "new Date("
            + [
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate(),
            ].join(", ")
            + ")";

        let newYearSyncDate = fullYearDate(1, 0, 1);
        let secondAgeStartDate = fullYearDate(0, 11, 23);

        let sa32 = fullYearDate(32, 5, 22);
        let ta2060 = fullYearDate(3441 + 2060, 5, 22);
        let ta3019 = fullYearDate(3441 + 3019, 2, 14);

        let ta2060String = "new Date( 3441+2060, 5,22 )";
        let ta3019String = "new Date( 3441+3019, 2,14 )";

        return (
            <table>
                <tbody>
                    <tr>
                        <td colSpan="3" style={CaptionCellStyle}>
                            <DatePicker
                                date={currentDate}
                                onDateChanged={this.onDateChanged}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={CaptionCellStyle}>
                            Kings' Reckoning: Year View in Sindarin.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_KINGS,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_SINDARIN,
     yearView: true,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_KINGS}
                language={GondorCalendar.LANGUAGE_SINDARIN}
                yearView={true}
                date={${dateString}}
                className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            Stewards' Reckoning: Year View in English.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_STEWARDS,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_ENGLISH,
     yearView: true,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_STEWARDS}
                language={GondorCalendar.LANGUAGE_ENGLISH}
                yearView={true}
                date={${dateString}}
                className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            New Reckoning: Year View in Quenya.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_NEW,
     yearView: true,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_NEW}
                yearView={true}
                date={${dateString}}
                className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                reckoning={GondorCalendar.RECKONING_KINGS}
                                language={GondorCalendar.LANGUAGE_SINDARIN}
                                yearView={true}
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                reckoning={GondorCalendar.RECKONING_STEWARDS}
                                language={GondorCalendar.LANGUAGE_ENGLISH}
                                yearView={true}
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                reckoning={GondorCalendar.RECKONING_NEW}
                                yearView={true}
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={CaptionCellStyle}>
                            Kings' Reckoning in English.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_KINGS,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_ENGLISH,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_KINGS}
                language={GondorCalendar.LANGUAGE_ENGLISH}
                date={${dateString}}
                className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            Stewards' Reckoning in Quenya.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_STEWARDS,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_STEWARDS}
                date={${dateString}}
                className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            New Reckoning in Sindarin.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_NEW,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_SINDARIN,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_NEW}
                language={GondorCalendar.LANGUAGE_SINDARIN}
                date={${dateString}}
                className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                reckoning={GondorCalendar.RECKONING_KINGS}
                                language={GondorCalendar.LANGUAGE_ENGLISH}
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                reckoning={GondorCalendar.RECKONING_STEWARDS}
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                reckoning={GondorCalendar.RECKONING_NEW}
                                language={GondorCalendar.LANGUAGE_SINDARIN}
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={CaptionCellStyle}>
                            Kings' Reckoning: Horizontal Month View in Quenya.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_KINGS,
     monthViewLayout:
        TolkienCalendars.GondorCalendar.MONTH_VIEW_HORIZONTAL,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_KINGS}
                monthViewLayout={GondorCalendar.MONTH_VIEW_HORIZONTAL}
                date={${dateString}}
                className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            Stewards' Reckoning: Horizontal Month View in
                            Sindarin.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_STEWARDS,
     monthViewLayout:
        TolkienCalendars.GondorCalendar.MONTH_VIEW_HORIZONTAL,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_SINDARIN,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_STEWARDS}
                monthViewLayout={GondorCalendar.MONTH_VIEW_HORIZONTAL}
                language={GondorCalendar.LANGUAGE_SINDARIN}
                date={${dateString}}
                className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            New Reckoning: Horizontal Month View in English.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_NEW,
     monthViewLayout:
        TolkienCalendars.GondorCalendar.MONTH_VIEW_HORIZONTAL,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_ENGLISH,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_NEW}
                monthViewLayout={GondorCalendar.MONTH_VIEW_HORIZONTAL}
                language={GondorCalendar.LANGUAGE_ENGLISH}
                date={${dateString}}
                className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                reckoning={GondorCalendar.RECKONING_KINGS}
                                monthViewLayout={
                                    GondorCalendar.MONTH_VIEW_HORIZONTAL
                                }
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                reckoning={GondorCalendar.RECKONING_STEWARDS}
                                monthViewLayout={
                                    GondorCalendar.MONTH_VIEW_HORIZONTAL
                                }
                                language={GondorCalendar.LANGUAGE_SINDARIN}
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                reckoning={GondorCalendar.RECKONING_NEW}
                                monthViewLayout={
                                    GondorCalendar.MONTH_VIEW_HORIZONTAL
                                }
                                language={GondorCalendar.LANGUAGE_ENGLISH}
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                    </tr>
                    <tr id="new-year-sync">
                        <th colSpan="3" style={CaptionCellStyle}>
                            In Appendix D, Tolkien made a brief comparison of
                            our calendar with the Shire calendar "if our years
                            began at the same seasonal point". Presented below
                            is a similar hypothetical alignment of our calendar
                            with the calendars of Gondor.
                        </th>
                    </tr>
                    <tr>
                        <td style={CaptionCellStyle}>
                            New Year's Day Sync: Kings' Reckoning Year View in
                            Sindarin.
                            <pre>
                                <code>
                                    {`
JavaScript:
let gregorianStartDate = new Date(1,0,1, 0,0,0);
gregorianStartDate.setFullYear(1,0,1);

React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_KINGS,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_SINDARIN,
     yearView: true,
     date: ${dateString},
     startDate: gregorianStartDate,
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_KINGS}
                language={GondorCalendar.LANGUAGE_SINDARIN}
                yearView={true}
                date={${dateString}}
                startDate={gregorianStartDate}
                className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            New Year's Day Sync: Stewards' Reckoning Year View
                            in English.
                            <pre>
                                <code>
                                    {`
JavaScript:
let gregorianStartDate = new Date(1,0,1, 0,0,0);
gregorianStartDate.setFullYear(1,0,1);

React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_STEWARDS,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_ENGLISH,
     yearView: true,
     date: ${dateString},
     startDate: gregorianStartDate,
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_STEWARDS}
                language={GondorCalendar.LANGUAGE_ENGLISH}
                yearView={true}
                date={${dateString}}
                startDate={gregorianStartDate}
                className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            New Year's Day Sync: New Reckoning Year View in
                            Quenya.
                            <pre>
                                <code>
                                    {`
JavaScript:
let gregorianStartDate = new Date(1,0,1, 0,0,0);
gregorianStartDate.setFullYear(1,0,1);

React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_NEW,
     yearView: true,
     date: ${dateString},
     startDate: gregorianStartDate,
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_NEW}
                yearView={true}
                date={${dateString}}
                startDate={gregorianStartDate}
                className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                reckoning={GondorCalendar.RECKONING_KINGS}
                                language={GondorCalendar.LANGUAGE_SINDARIN}
                                yearView={true}
                                date={currentDate}
                                startDate={newYearSyncDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                reckoning={GondorCalendar.RECKONING_STEWARDS}
                                language={GondorCalendar.LANGUAGE_ENGLISH}
                                yearView={true}
                                date={currentDate}
                                startDate={newYearSyncDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                reckoning={GondorCalendar.RECKONING_NEW}
                                yearView={true}
                                date={currentDate}
                                startDate={newYearSyncDate}
                                className="shire-calendar"
                            />
                        </td>
                    </tr>
                    <tr id="traditional-rules">
                        <th colSpan="3" style={CaptionCellStyle}>
                            In Appendix D, Tolkien described leap-day and
                            leap-year rules for the calendars of Gondor the that
                            were similar yet different compared to our Gregorian
                            calendar. So these calendars also include a
                            "traditional" rules setting that allows the Gondor
                            calendars to reckon dates according to the
                            "traditional" leap-day and leap-year rules as
                            described in Appendix D, from any start date, which
                            will be considered the start of the Second Age in
                            these reckonings.
                        </th>
                    </tr>
                    <tr>
                        <td style={CaptionCellStyle}>
                            Traditional Kings' Reckoning for S.A. 32 (First King
                            of Númenor crowned). Year View in Sindarin.
                            <pre>
                                <code>
                                    {`
JavaScript:
let secondAgeStartDate = new Date(0,11,23, 0,0,0);
secondAgeStartDate.setFullYear(0,11,23);
let secondAge32 = new Date(32, 5, 22, 0,0,0);
secondAge32.setFullYear(32, 5, 22);

React.createElement(
    TolkienCalendars.GondorCalendar,
    {calendarRules:
        TolkienCalendars.GondorCalendar.RECKONING_RULES_TRADITIONAL,
     reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_KINGS,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_SINDARIN,
     yearView: true,
     date: secondAge32,
     startDate: secondAgeStartDate,
     className: "shire-calendar"}
)

JSX:
<GondorCalendar calendarRules={
                    GondorCalendar.RECKONING_RULES_TRADITIONAL
                }
                reckoning={GondorCalendar.RECKONING_KINGS}
                language={GondorCalendar.LANGUAGE_SINDARIN}
                yearView={true}
                date={secondAge32}
                startDate={secondAgeStartDate}
                className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            Traditional Stewards' Reckoning for T.A. 2060 (First
                            year of Stewards' Reckoning). Year View in English.
                            <pre>
                                <code>
                                    {`JavaScript:
let secondAgeStartDate = new Date(0,11,23, 0,0,0);
secondAgeStartDate.setFullYear(0,11,23);

React.createElement(
    TolkienCalendars.GondorCalendar,
    {calendarRules:
        TolkienCalendars.GondorCalendar.RECKONING_RULES_TRADITIONAL,
     reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_STEWARDS,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_ENGLISH,
     yearView: true,
     date: ${ta2060String},
     startDate: secondAgeStartDate,
     className: "shire-calendar"}
)

JSX:
<GondorCalendar calendarRules={
                    GondorCalendar.RECKONING_RULES_TRADITIONAL
                }
                reckoning={GondorCalendar.RECKONING_STEWARDS}
                language={GondorCalendar.LANGUAGE_ENGLISH}
                yearView={true}
                date={${ta2060String}}
                startDate={secondAgeStartDate}
                className="shire-calendar" />`}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            Traditional New Reckoning for T.A. 3019 (date of the
                            destruction of the One Ring). Year View in Quenya.
                            <pre>
                                <code>
                                    {`JavaScript:
let secondAgeStartDate = new Date(0,11,23, 0,0,0);
secondAgeStartDate.setFullYear(0,11,23);

React.createElement(
    TolkienCalendars.GondorCalendar,
    {calendarRules:
        TolkienCalendars.GondorCalendar.RECKONING_RULES_TRADITIONAL,
     reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_NEW,
     yearView: true,
     date: ${ta3019String},
     startDate: secondAgeStartDate,
     className: "shire-calendar"}
)

JSX:
<GondorCalendar calendarRules={
                    GondorCalendar.RECKONING_RULES_TRADITIONAL
                }
                reckoning={GondorCalendar.RECKONING_NEW}
                yearView={true}
                date={${ta3019String}}
                startDate={secondAgeStartDate}
                className="shire-calendar" />`}
                                </code>
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                calendarRules={
                                    GondorCalendar.RECKONING_RULES_TRADITIONAL
                                }
                                reckoning={GondorCalendar.RECKONING_KINGS}
                                language={GondorCalendar.LANGUAGE_SINDARIN}
                                yearView={true}
                                date={sa32}
                                startDate={secondAgeStartDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                calendarRules={
                                    GondorCalendar.RECKONING_RULES_TRADITIONAL
                                }
                                reckoning={GondorCalendar.RECKONING_STEWARDS}
                                language={GondorCalendar.LANGUAGE_ENGLISH}
                                yearView={true}
                                date={ta2060}
                                startDate={secondAgeStartDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <GondorCalendar
                                calendarRules={
                                    GondorCalendar.RECKONING_RULES_TRADITIONAL
                                }
                                reckoning={GondorCalendar.RECKONING_NEW}
                                yearView={true}
                                date={ta3019}
                                startDate={secondAgeStartDate}
                                className="shire-calendar"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default GondorCalendarExample;
