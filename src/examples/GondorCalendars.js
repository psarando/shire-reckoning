/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import { fullYearDate } from '../Utils';

import GondorCalendar from '../ui/GondorCalendar';
import '../ui/tolkien-calendars.css';

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from './Common';

class GondorCalendarExample extends Component {

    constructor(props) {
        super(props);

        this.state = {date: new Date()};
        this.onDateChanged = this.onDateChanged.bind(this);
    }

    onDateChanged(currentDate) {
        this.setState({date: currentDate});
    }

    render() {
        let currentDate = this.state.date;
        let dateString =
            "new Date("
            + [currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()].join(",")
            + ")";

        let newYearSyncDate = fullYearDate(1,0,1);

        return (
            <table>
                <tbody>
                <tr>
                    <td colSpan='3' style={CaptionCellStyle}>
                        <DatePicker date={currentDate} onDateChanged={this.onDateChanged} />
                    </td>
                </tr>
                <tr>
                    <td style={CaptionCellStyle}>
                        Kings' Reckoning: Year View in Sindarin.
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_KINGS,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_SINDARIN,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_KINGS}
                language={GondorCalendar.LANGUAGE_SINDARIN}
                yearView={true}
                calendarControls={false}
                date={${dateString}}
                className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        Stewards' Reckoning: Year View in English.
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_STEWARDS,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_ENGLISH,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_STEWARDS}
                language={GondorCalendar.LANGUAGE_ENGLISH}
                yearView={true}
                calendarControls={false}
                date={${dateString}}
                className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        New Reckoning: Year View in Quenya.
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_NEW,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_NEW}
                yearView={true}
                calendarControls={false}
                date={${dateString}}
                className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar reckoning={GondorCalendar.RECKONING_KINGS}
                                        language={GondorCalendar.LANGUAGE_SINDARIN}
                                        yearView={true}
                                        calendarControls={false}
                                        date={currentDate}
                                        className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar reckoning={GondorCalendar.RECKONING_STEWARDS}
                                        language={GondorCalendar.LANGUAGE_ENGLISH}
                                        yearView={true}
                                        calendarControls={false}
                                        date={currentDate}
                                        className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar reckoning={GondorCalendar.RECKONING_NEW}
                                        yearView={true}
                                        calendarControls={false}
                                        date={currentDate}
                                        className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <td style={CaptionCellStyle}>
                        Kings' Reckoning in English.
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_KINGS,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_ENGLISH,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_KINGS}
                language={GondorCalendar.LANGUAGE_ENGLISH}
                calendarControls={false}
                date={${dateString}}
                className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        Stewards' Reckoning in Quenya.
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_STEWARDS,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_STEWARDS}
                calendarControls={false}
                date={${dateString}}
                className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        New Reckoning in Sindarin.
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_NEW,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_SINDARIN,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_NEW}
                language={GondorCalendar.LANGUAGE_SINDARIN}
                calendarControls={false}
                date={${dateString}}
                className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar reckoning={GondorCalendar.RECKONING_KINGS}
                                        language={GondorCalendar.LANGUAGE_ENGLISH}
                                        calendarControls={false}
                                        date={currentDate}
                                        className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar reckoning={GondorCalendar.RECKONING_STEWARDS}
                                        calendarControls={false}
                                        date={currentDate}
                                        className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar reckoning={GondorCalendar.RECKONING_NEW}
                                        language={GondorCalendar.LANGUAGE_SINDARIN}
                                        calendarControls={false}
                                        date={currentDate}
                                        className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <td style={CaptionCellStyle}>
                        Kings' Reckoning: Horizontal Month View in Quenya.
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_KINGS,
     monthViewLayout:
        TolkienCalendars.GondorCalendar.MONTH_VIEW_HORIZONTAL,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_KINGS}
                monthViewLayout={GondorCalendar.MONTH_VIEW_HORIZONTAL}
                calendarControls={false}
                date={${dateString}}
                className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        Stewards' Reckoning: Horizontal Month View in Sindarin.
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_STEWARDS,
     monthViewLayout:
        TolkienCalendars.GondorCalendar.MONTH_VIEW_HORIZONTAL,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_SINDARIN,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_STEWARDS}
                monthViewLayout={GondorCalendar.MONTH_VIEW_HORIZONTAL}
                language={GondorCalendar.LANGUAGE_SINDARIN}
                calendarControls={false}
                date={${dateString}}
                className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        New Reckoning: Horizontal Month View in English.
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_NEW,
     monthViewLayout:
        TolkienCalendars.GondorCalendar.MONTH_VIEW_HORIZONTAL,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_ENGLISH,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_NEW}
                monthViewLayout={GondorCalendar.MONTH_VIEW_HORIZONTAL}
                language={GondorCalendar.LANGUAGE_ENGLISH}
                calendarControls={false}
                date={${dateString}}
                className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar reckoning={GondorCalendar.RECKONING_KINGS}
                                        monthViewLayout={GondorCalendar.MONTH_VIEW_HORIZONTAL}
                                        calendarControls={false}
                                        date={currentDate}
                                        className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar reckoning={GondorCalendar.RECKONING_STEWARDS}
                                        monthViewLayout={GondorCalendar.MONTH_VIEW_HORIZONTAL}
                                        language={GondorCalendar.LANGUAGE_SINDARIN}
                                        calendarControls={false}
                                        date={currentDate}
                                        className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar reckoning={GondorCalendar.RECKONING_NEW}
                                        monthViewLayout={GondorCalendar.MONTH_VIEW_HORIZONTAL}
                                        language={GondorCalendar.LANGUAGE_ENGLISH}
                                        calendarControls={false}
                                        date={currentDate}
                                        className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <th colSpan="3" style={CaptionCellStyle}>
                        In Appendix D, Tolkien made a brief comparison of our calendar with the Shire calendar
                        "if our years began at the same seasonal point".
                        Presented below is a similar hypothetical alignment of our calendar with the calendars of Gondor.
                    </th>
                </tr>
                <tr>
                    <td style={CaptionCellStyle}>
                        Seasonal Sync Kings' Reckoning: Year View in Sindarin.
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_KINGS,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_SINDARIN,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     startDate: new Date(1,0,1, 0,0,0),
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_KINGS}
                language={GondorCalendar.LANGUAGE_SINDARIN}
                yearView={true}
                calendarControls={false}
                date={${dateString}}
                startDate={new Date(1,0,1, 0,0,0)}
                className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        Seasonal Sync Stewards' Reckoning: Year View in English.
                        <pre>
                            <code>
                                {
                                    `JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_STEWARDS,
     language: TolkienCalendars.GondorCalendar.LANGUAGE_ENGLISH,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     startDate: new Date(1,0,1, 0,0,0),
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_STEWARDS}
                language={GondorCalendar.LANGUAGE_ENGLISH}
                yearView={true}
                calendarControls={false}
                date={${dateString}}
                startDate={new Date(1,0,1, 0,0,0)}
                className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        Seasonal Sync New Reckoning: Year View in Quenya.
                        <pre>
                            <code>
                                {
                                    `JavaScript:
React.createElement(
    TolkienCalendars.GondorCalendar,
    {reckoning:
        TolkienCalendars.GondorCalendar.RECKONING_NEW,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     startDate: new Date(1,0,1, 0,0,0),
     className: "shire-calendar"}
)

JSX:
<GondorCalendar reckoning={GondorCalendar.RECKONING_NEW}
                yearView={true}
                calendarControls={false}
                date={${dateString}}
                startDate={new Date(1,0,1, 0,0,0)}
                className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar reckoning={GondorCalendar.RECKONING_KINGS}
                                        language={GondorCalendar.LANGUAGE_SINDARIN}
                                        yearView={true}
                                        calendarControls={false}
                                        date={currentDate}
                                        startDate={newYearSyncDate}
                                        className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar reckoning={GondorCalendar.RECKONING_STEWARDS}
                                        language={GondorCalendar.LANGUAGE_ENGLISH}
                                        yearView={true}
                                        calendarControls={false}
                                        date={currentDate}
                                        startDate={newYearSyncDate}
                                        className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar reckoning={GondorCalendar.RECKONING_NEW}
                                        yearView={true}
                                        calendarControls={false}
                                        date={currentDate}
                                        startDate={newYearSyncDate}
                                        className="shire-calendar" />
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default GondorCalendarExample;
