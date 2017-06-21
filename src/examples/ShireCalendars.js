/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import { fullYearDate } from '../Utils';

import ShireCalendar from '../ui/ShireCalendar';
import GondorCalendar from '../ui/GondorCalendar';
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

        let newYearSyncDate = fullYearDate(1,0,1);
        let secondAgeStartDate = fullYearDate(0,11,23);

        let ta1300 = fullYearDate(3441+1300, 5,20);
        let ta1601 = fullYearDate(3441+1601, 5,19);
        let ta3019 = fullYearDate(3441+3019, 2,14);

        let ta1300String = "new Date( 3441+1300, 5,20 )";
        let ta1601String = "new Date( 3441+1601, 5,19 )";
        let ta3019String = "new Date( 3441+3019, 2,14 )";

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
                                       className="shire-calendar example-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar yearView={true}
                                       calendarControls={false}
                                       date={currentDate}
                                       className="shire-calendar example-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar region={ShireCalendar.REGION_NAMES_BREE}
                                       yearView={true}
                                       calendarControls={false}
                                       date={currentDate}
                                       className="shire-calendar example-calendar" />
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
                                       className="shire-calendar example-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar calendarControls={false}
                                       date={currentDate}
                                       className="shire-calendar example-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar region={ShireCalendar.REGION_NAMES_BREE}
                                       calendarControls={false}
                                       date={currentDate}
                                       className="shire-calendar example-calendar" />
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
                                       className="shire-calendar example-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar monthViewLayout={ShireCalendar.MONTH_VIEW_HORIZONTAL}
                                       calendarControls={false}
                                       date={currentDate}
                                       className="shire-calendar example-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar region={ShireCalendar.REGION_NAMES_BREE}
                                       monthViewLayout={ShireCalendar.MONTH_VIEW_HORIZONTAL}
                                       calendarControls={false}
                                       date={currentDate}
                                       className="shire-calendar example-calendar" />
                    </td>
                </tr>
                <tr id="new-year-sync">
                    <th colSpan="3" style={CaptionCellStyle}>
                        In Appendix D, Tolkien made a brief comparison of our calendar with the Shire calendar
                        "if our years began at the same seasonal point".
                        Presented below is an example of this hypothetical alignment.
                    </th>
                </tr>
                <tr>
                    <td style={CaptionCellStyle}>
                        New Year's Day Sync: Shire Reckoning year view with Tolkien month and weekday names
                        <pre>
                            <code>
                                {
`JavaScript:
let gregorianStartDate = new Date(1,0,1, 0,0,0);
gregorianStartDate.setFullYear(1,0,1);

React.createElement(
    TolkienCalendars.ShireCalendar,
    {region: TolkienCalendars.ShireCalendar.REGION_NAMES_TOLKIEN,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     startDate: gregorianStartDate,
     className: "shire-calendar"}
)

JSX:
<ShireCalendar region={ShireCalendar.REGION_NAMES_TOLKIEN}
               yearView={true}
               calendarControls={false}
               date={${dateString}}
               startDate={gregorianStartDate}
               className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        New Year's Day Sync: Shire Reckoning year view with Shire month and weekday names
                        <pre>
                            <code>
                                {
`JavaScript:
let gregorianStartDate = new Date(1,0,1, 0,0,0);
gregorianStartDate.setFullYear(1,0,1);

React.createElement(
    TolkienCalendars.ShireCalendar,
    {yearView: true,
     calendarControls: false,
     date: ${dateString},
     startDate: gregorianStartDate,
     className: "shire-calendar"}
)

JSX:
<ShireCalendar yearView={true}
               calendarControls={false}
               date={${dateString}}
               startDate={gregorianStartDate}
               className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        New Year's Day Sync: Shire Reckoning year view with Bree month and weekday names
                        <pre>
                            <code>
                                {
`JavaScript:
let gregorianStartDate = new Date(1,0,1, 0,0,0);
gregorianStartDate.setFullYear(1,0,1);

React.createElement(
    TolkienCalendars.ShireCalendar,
    {region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     startDate: gregorianStartDate,
     className: "shire-calendar"}
)

JSX:
<ShireCalendar region={ShireCalendar.REGION_NAMES_BREE}
               yearView={true}
               calendarControls={false}
               date={${dateString}}
               startDate={gregorianStartDate}
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
                                       startDate={newYearSyncDate}
                                       className="shire-calendar example-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar yearView={true}
                                       calendarControls={false}
                                       date={currentDate}
                                       startDate={newYearSyncDate}
                                       className="shire-calendar example-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar region={ShireCalendar.REGION_NAMES_BREE}
                                       yearView={true}
                                       calendarControls={false}
                                       date={currentDate}
                                       startDate={newYearSyncDate}
                                       className="shire-calendar example-calendar" />
                    </td>
                </tr>
                <tr id="traditional-rules">
                    <th colSpan="3" style={CaptionCellStyle}>
                        In Appendix D, Tolkien described leap-day and leap-year rules for the calendars of Gondor
                        the that were similar yet different compared to our Gregorian calendar.
                        Since the Shire calendars were in sync with the calendars of Gondor,
                        these calendars also include a "traditional" rules setting that allows the Shire calendars to
                        reckon dates according to the "traditional" leap-day and leap-year rules as described in Appendix D,
                        from any start date, which will be considered the start of the Second Age in these reckonings.
                        When reckoning with these "traditional" rules,
                        the Shire calendars will also only display according Shire Reform on or after T.A. 2685.
                    </th>
                </tr>
                <tr>
                    <td style={CaptionCellStyle}>
                        Traditional Shire Reckoning for T.A. 1300 (the year Hobbits first settled in Bree).
                        Year view with Bree month and weekday names.
                        <pre>
                            <code>
                                {
`JavaScript:
let secondAgeStartDate = new Date(0,11,23, 0,0,0);
secondAgeStartDate.setFullYear(0,11,23);

React.createElement(
    TolkienCalendars.ShireCalendar,
    {calendarRules:
        TolkienCalendars.GondorCalendar.RECKONING_RULES_TRADITIONAL,
     region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE,
     yearView: true,
     calendarControls: false,
     date: ${ta1300String},
     startDate: secondAgeStartDate,
     className: "shire-calendar"}
)

JSX:
<ShireCalendar calendarRules={
                   GondorCalendar.RECKONING_RULES_TRADITIONAL
               }
               region={ShireCalendar.REGION_NAMES_BREE}
               yearView={true}
               calendarControls={false}
               date={${ta1300String}}
               startDate={secondAgeStartDate}
               className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        Traditional Shire Reckoning for T.A. 1601 (the year Hobbits first settled in the Shire).
                        Year view with Shire month and weekday names.
                        <pre>
                            <code>
                                {
`JavaScript:
let secondAgeStartDate = new Date(0,11,23, 0,0,0);
secondAgeStartDate.setFullYear(0,11,23);

React.createElement(
    TolkienCalendars.ShireCalendar,
    {calendarRules:
        TolkienCalendars.GondorCalendar.RECKONING_RULES_TRADITIONAL,
     yearView: true,
     calendarControls: false,
     date: ${ta1601String},
     startDate: secondAgeStartDate,
     className: "shire-calendar"}
)

JSX:
<ShireCalendar calendarRules={
                   GondorCalendar.RECKONING_RULES_TRADITIONAL
               }
               yearView={true}
               calendarControls={false}
               date={${ta1601String}}
               startDate={secondAgeStartDate}
               className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={CaptionCellStyle}>
                        Traditional Shire Reckoning for T.A. 3019 (date of the destruction of the One Ring).
                        Year view with Tolkien month and weekday names.
                        <pre>
                            <code>
                                {
`JavaScript:
let secondAgeStartDate = new Date(0,11,23, 0,0,0);
secondAgeStartDate.setFullYear(0,11,23);

React.createElement(
    TolkienCalendars.ShireCalendar,
    {calendarRules:
        TolkienCalendars.GondorCalendar.RECKONING_RULES_TRADITIONAL,
     region: TolkienCalendars.ShireCalendar.REGION_NAMES_TOLKIEN,
     yearView: true,
     calendarControls: false,
     date: ${ta3019String},
     startDate: secondAgeStartDate,
     className: "shire-calendar"}
)

JSX:
<ShireCalendar calendarRules={
                   GondorCalendar.RECKONING_RULES_TRADITIONAL
               }
               region={ShireCalendar.REGION_NAMES_TOLKIEN}
               yearView={true}
               calendarControls={false}
               date={${ta3019String}}
               startDate={secondAgeStartDate}
               className="shire-calendar" />`
                                }
                            </code>
                        </pre>
                    </td>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar calendarRules={GondorCalendar.RECKONING_RULES_TRADITIONAL}
                                       region={ShireCalendar.REGION_NAMES_BREE}
                                       yearView={true}
                                       calendarControls={false}
                                       date={ta1300}
                                       startDate={secondAgeStartDate}
                                       className="shire-calendar example-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar calendarRules={GondorCalendar.RECKONING_RULES_TRADITIONAL}
                                       yearView={true}
                                       calendarControls={false}
                                       date={ta1601}
                                       startDate={secondAgeStartDate}
                                       className="shire-calendar example-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar calendarRules={GondorCalendar.RECKONING_RULES_TRADITIONAL}
                                       region={ShireCalendar.REGION_NAMES_TOLKIEN}
                                       yearView={true}
                                       calendarControls={false}
                                       date={ta3019}
                                       startDate={secondAgeStartDate}
                                       className="shire-calendar example-calendar" />
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default ShireCalendarExample;
