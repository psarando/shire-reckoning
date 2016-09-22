/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import NumenorCalendar from '../ui/NumenorCalendar';
import '../ui/tolkien-calendars.css';

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from './Common';

class NumenorCalendarExample extends Component {

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
    TolkienCalendars.NumenorCalendar,
    {language: TolkienCalendars.NumenorCalendar.LANGUAGE_SINDARIN,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<NumenorCalendar language={NumenorCalendar.LANGUAGE_SINDARIN}
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
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS,
     language: TolkienCalendars.NumenorCalendar.LANGUAGE_ENGLISH,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<NumenorCalendar reckoning={NumenorCalendar.RECKONING_STEWARDS}
                 language={NumenorCalendar.LANGUAGE_ENGLISH}
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
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_NEW,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<NumenorCalendar reckoning={NumenorCalendar.RECKONING_NEW}
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
                        <NumenorCalendar language={NumenorCalendar.LANGUAGE_SINDARIN}
                                         yearView={true}
                                         calendarControls={false}
                                         date={currentDate}
                                         className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <NumenorCalendar reckoning={NumenorCalendar.RECKONING_STEWARDS}
                                         language={NumenorCalendar.LANGUAGE_ENGLISH}
                                         yearView={true}
                                         calendarControls={false}
                                         date={currentDate}
                                         className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <NumenorCalendar reckoning={NumenorCalendar.RECKONING_NEW}
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
    TolkienCalendars.NumenorCalendar,
    {language: TolkienCalendars.NumenorCalendar.LANGUAGE_ENGLISH,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<NumenorCalendar language={NumenorCalendar.LANGUAGE_ENGLISH}
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
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<NumenorCalendar reckoning={NumenorCalendar.RECKONING_STEWARDS}
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
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_NEW,
     language: TolkienCalendars.NumenorCalendar.LANGUAGE_SINDARIN,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<NumenorCalendar reckoning={NumenorCalendar.RECKONING_NEW}
                 language={NumenorCalendar.LANGUAGE_SINDARIN}
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
                        <NumenorCalendar language={NumenorCalendar.LANGUAGE_ENGLISH}
                                         calendarControls={false}
                                         date={currentDate}
                                         className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <NumenorCalendar reckoning={NumenorCalendar.RECKONING_STEWARDS}
                                         calendarControls={false}
                                         date={currentDate}
                                         className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <NumenorCalendar reckoning={NumenorCalendar.RECKONING_NEW}
                                         language={NumenorCalendar.LANGUAGE_SINDARIN}
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
    TolkienCalendars.NumenorCalendar,
    {monthViewLayout:
        TolkienCalendars.NumenorCalendar.MONTH_VIEW_HORIZONTAL,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<NumenorCalendar monthViewLayout={NumenorCalendar.MONTH_VIEW_HORIZONTAL}
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
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS,
     monthViewLayout:
        TolkienCalendars.NumenorCalendar.MONTH_VIEW_HORIZONTAL,
     language: TolkienCalendars.NumenorCalendar.LANGUAGE_SINDARIN,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<NumenorCalendar reckoning={NumenorCalendar.RECKONING_STEWARDS}
                 monthViewLayout={NumenorCalendar.MONTH_VIEW_HORIZONTAL}
                 language={NumenorCalendar.LANGUAGE_SINDARIN}
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
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_NEW,
     monthViewLayout:
        TolkienCalendars.NumenorCalendar.MONTH_VIEW_HORIZONTAL,
     language: TolkienCalendars.NumenorCalendar.LANGUAGE_ENGLISH,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<NumenorCalendar reckoning={NumenorCalendar.RECKONING_NEW}
                 monthViewLayout={NumenorCalendar.MONTH_VIEW_HORIZONTAL}
                 language={NumenorCalendar.LANGUAGE_ENGLISH}
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
                        <NumenorCalendar monthViewLayout={NumenorCalendar.MONTH_VIEW_HORIZONTAL}
                                         calendarControls={false}
                                         date={currentDate}
                                         className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <NumenorCalendar reckoning={NumenorCalendar.RECKONING_STEWARDS}
                                         monthViewLayout={NumenorCalendar.MONTH_VIEW_HORIZONTAL}
                                         language={NumenorCalendar.LANGUAGE_SINDARIN}
                                         calendarControls={false}
                                         date={currentDate}
                                         className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <NumenorCalendar reckoning={NumenorCalendar.RECKONING_NEW}
                                         monthViewLayout={NumenorCalendar.MONTH_VIEW_HORIZONTAL}
                                         language={NumenorCalendar.LANGUAGE_ENGLISH}
                                         calendarControls={false}
                                         date={currentDate}
                                         className="shire-calendar" />
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default NumenorCalendarExample;
