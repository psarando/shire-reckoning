/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import ShireCalendar from '../ui/ShireCalendar';
import '../ui/tolkien-calendars.css';

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from './Common';

class ShireCalendarExample extends Component {

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
                        Shire Reckoning year view with Tolkien month and weekday names
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.ShireCalendar,
    {region: TolkienCalendars.ShireCalendar.REGION_NAMES_TOLKIEN,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<ShireCalendar region={ShireCalendar.REGION_NAMES_TOLKIEN}
               yearView={true}
               calendarControls={false}
               date={${dateString}}
               className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        Shire Reckoning year view with Shire month and weekday names
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.ShireCalendar,
    {yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<ShireCalendar yearView={true}
               calendarControls={false}
               date={${dateString}}
               className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        Shire Reckoning year view with Bree month and weekday names
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.ShireCalendar,
    {region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<ShireCalendar region={ShireCalendar.REGION_NAMES_BREE}
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
                        <ShireCalendar region={ShireCalendar.REGION_NAMES_TOLKIEN}
                                       yearView={true}
                                       calendarControls={false}
                                       date={currentDate}
                                       className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar yearView={true}
                                       calendarControls={false}
                                       date={currentDate}
                                       className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar region={ShireCalendar.REGION_NAMES_BREE}
                                       yearView={true}
                                       calendarControls={false}
                                       date={currentDate}
                                       className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <td style={CaptionCellStyle}>
                        Shire Reckoning with Tolkien month and weekday names
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.ShireCalendar,
    {region: TolkienCalendars.ShireCalendar.REGION_NAMES_TOLKIEN,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<ShireCalendar region={ShireCalendar.REGION_NAMES_TOLKIEN}
               calendarControls={false}
               date={${dateString}}
               className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        Shire Reckoning with Shire month and weekday names
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.ShireCalendar,
    {calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<ShireCalendar calendarControls={false}
               date={${dateString}}
               className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        Shire Reckoning with Bree month and weekday names
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.ShireCalendar,
    {region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<ShireCalendar region={ShireCalendar.REGION_NAMES_BREE}
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
                        <ShireCalendar region={ShireCalendar.REGION_NAMES_TOLKIEN}
                                       calendarControls={false}
                                       date={currentDate}
                                       className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar calendarControls={false}
                                       date={currentDate}
                                       className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar region={ShireCalendar.REGION_NAMES_BREE}
                                       calendarControls={false}
                                       date={currentDate}
                                       className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <td style={CaptionCellStyle}>
                        Shire Reckoning horizontal view with Tolkien month and weekday names
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.ShireCalendar,
    {region: TolkienCalendars.ShireCalendar.REGION_NAMES_TOLKIEN,
     monthViewLayout:
         TolkienCalendars.ShireCalendar.MONTH_VIEW_HORIZONTAL,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<ShireCalendar region={ShireCalendar.REGION_NAMES_TOLKIEN}
               monthViewLayout={ShireCalendar.MONTH_VIEW_HORIZONTAL}
               calendarControls={false}
               date={${dateString}}
               className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        Shire Reckoning horizontal view with Shire month and weekday names
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.ShireCalendar,
    {monthViewLayout:
        TolkienCalendars.ShireCalendar.MONTH_VIEW_HORIZONTAL,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<ShireCalendar monthViewLayout={ShireCalendar.MONTH_VIEW_HORIZONTAL}
               calendarControls={false}
               date={${dateString}}
               className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        Shire Reckoning horizontal view with Bree month and weekday names
                        <pre>
                            <code>
                                {
`JavaScript:
React.createElement(
    TolkienCalendars.ShireCalendar,
    {region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE,
     monthViewLayout:
         TolkienCalendars.ShireCalendar.MONTH_VIEW_HORIZONTAL,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<ShireCalendar region={ShireCalendar.REGION_NAMES_BREE}
               monthViewLayout={ShireCalendar.MONTH_VIEW_HORIZONTAL}
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
                        <ShireCalendar region={ShireCalendar.REGION_NAMES_TOLKIEN}
                                       monthViewLayout={ShireCalendar.MONTH_VIEW_HORIZONTAL}
                                       calendarControls={false}
                                       date={currentDate}
                                       className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar monthViewLayout={ShireCalendar.MONTH_VIEW_HORIZONTAL}
                                       calendarControls={false}
                                       date={currentDate}
                                       className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar region={ShireCalendar.REGION_NAMES_BREE}
                                       monthViewLayout={ShireCalendar.MONTH_VIEW_HORIZONTAL}
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

export default ShireCalendarExample;
