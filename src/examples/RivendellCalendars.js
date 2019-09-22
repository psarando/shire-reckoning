/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import RivendellCalendar from "../ui/RivendellCalendar";
import "../ui/tolkien-calendars.css";

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from "./Common";

class RivendellCalendarExample extends Component {
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

        let sa1697 = new Date(590 + 1697, 8, 22);
        let ta2941 = new Date(590 + 3441 + 2941, 8, 22);
        let ta3018 = new Date(590 + 3441 + 3018, 8, 22);

        let sa1697String = "new Date( 590+1697, 8,22 )";
        let ta2941String = "new Date( 590+3441+2941, 8,22 )";
        let ta3018String = "new Date( 590+3441+3018, 8,22 )";

        return (
            <table>
                <tbody>
                    <tr>
                        <td style={CaptionCellStyle}>
                            Potential calendar (in Quenya) of the Second Age
                            1697: the year Rivendell was founded.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(TolkienCalendars.RivendellCalendar,
                    {yearView: true,
                     date: ${sa1697String},
                     startDay: 21,
                     className: "shire-calendar"})

JSX:
<RivendellCalendar yearView={true}
                   date={${sa1697String}}
                   startDay={21}
                   className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            Potential calendar (in English) of the Third Age
                            2941: the year Bilbo finds the One Ring, of the
                            death of Smaug, and of The Battle of Five Armies.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.RivendellCalendar,
    {language:
        TolkienCalendars.RivendellCalendar.LANGUAGE_ENGLISH,
     yearView: true,
     date: ${ta2941String},
     startDay: 21,
     className: "shire-calendar"}
)

JSX:
<RivendellCalendar language={
                       RivendellCalendar.LANGUAGE_ENGLISH
                   }
                   yearView={true}
                   date={${ta2941String}}
                   startDay={21}
                   className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            Potential calendar (in Sindarin) of the Third Age
                            3018~3019: "The Great Years" of the War of the Ring
                            and the downfall of Barad-dûr.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.RivendellCalendar,
    {language:
        TolkienCalendars.RivendellCalendar.LANGUAGE_SINDARIN,
     yearView: true,
     date: ${ta3018String},
     startDay: 21,
     className: "shire-calendar"}
)

JSX:
<RivendellCalendar language={
                       RivendellCalendar.LANGUAGE_SINDARIN
                   }
                   yearView={true}
                   date={${ta3018String}}
                   startDay={21}
                   className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td style={CalendarCellStyle}>
                            <RivendellCalendar
                                yearView={true}
                                date={sa1697}
                                startDay={21}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <RivendellCalendar
                                language={RivendellCalendar.LANGUAGE_ENGLISH}
                                yearView={true}
                                date={ta2941}
                                startDay={21}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <RivendellCalendar
                                language={RivendellCalendar.LANGUAGE_SINDARIN}
                                yearView={true}
                                date={ta3018}
                                startDay={21}
                                className="shire-calendar"
                            />
                        </td>
                    </tr>
                    <tr id="date-picker">
                        <td colSpan="3" style={CaptionCellStyle}>
                            <DatePicker
                                date={currentDate}
                                onDateChanged={this.onDateChanged}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={CaptionCellStyle}>
                            Rivendell Reckoning Year View with defaults: Quenya,
                            Traditional Rules starting from March 22nd.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(TolkienCalendars.RivendellCalendar,
                    {yearView: true,
                     date: ${dateString},
                     className: "shire-calendar"})

JSX:
<RivendellCalendar yearView={true}
                   date={${dateString}}
                   className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            Rivendell Reckoning Year View in English, Reformed
                            Rules starting from March 25th.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.RivendellCalendar,
    {calendarRules:
        TolkienCalendars.RivendellCalendar.REFORMED_RULES,
     startDay: 25,
     language:
        TolkienCalendars.RivendellCalendar.LANGUAGE_ENGLISH,
     yearView: true,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<RivendellCalendar calendarRules={
                       RivendellCalendar.REFORMED_RULES
                   }
                   startDay={25}
                   language={
                       RivendellCalendar.LANGUAGE_ENGLISH
                   }
                   yearView={true}
                   date={${dateString}}
                   className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            Rivendell Reckoning Year View in Sindarin, Reformed
                            Rules starting from March 29th.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.RivendellCalendar,
    {calendarRules:
        TolkienCalendars.RivendellCalendar.REFORMED_RULES,
     startDay: 29,
     language:
        TolkienCalendars.RivendellCalendar.LANGUAGE_SINDARIN,
     yearView: true,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<RivendellCalendar calendarRules={
                       RivendellCalendar.REFORMED_RULES
                   }
                   startDay={29}
                   language={
                       RivendellCalendar.LANGUAGE_SINDARIN
                   }
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
                            <RivendellCalendar
                                yearView={true}
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <RivendellCalendar
                                calendarRules={RivendellCalendar.REFORMED_RULES}
                                startDay={25}
                                language={RivendellCalendar.LANGUAGE_ENGLISH}
                                yearView={true}
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <RivendellCalendar
                                calendarRules={RivendellCalendar.REFORMED_RULES}
                                startDay={29}
                                language={RivendellCalendar.LANGUAGE_SINDARIN}
                                yearView={true}
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={CaptionCellStyle}>
                            Rivendell Reckoning Month View with default rules
                            and language (Quenya).
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(TolkienCalendars.RivendellCalendar,
                    {date: ${dateString},
                     className: "shire-calendar"})

JSX:
<RivendellCalendar date={${dateString}}
                   className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            Rivendell Reckoning in English, Reformed Rules
                            starting from March 25th.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.RivendellCalendar,
    {calendarRules:
        TolkienCalendars.RivendellCalendar.REFORMED_RULES,
     startDay: 25,
     language:
        TolkienCalendars.RivendellCalendar.LANGUAGE_ENGLISH,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<RivendellCalendar calendarRules={
                       RivendellCalendar.REFORMED_RULES
                   }
                   startDay={25}
                   language={
                       RivendellCalendar.LANGUAGE_ENGLISH
                   }
                   date={${dateString}}
                   className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                        <td style={CaptionCellStyle}>
                            Rivendell Reckoning in Sindarin, Reformed Rules
                            starting from March 20th.
                            <pre>
                                <code>
                                    {`
JavaScript:
React.createElement(
    TolkienCalendars.RivendellCalendar,
    {calendarRules:
        TolkienCalendars.RivendellCalendar.REFORMED_RULES,
     startDay: 20,
     language:
        TolkienCalendars.RivendellCalendar.LANGUAGE_SINDARIN,
     date: ${dateString},
     className: "shire-calendar"}
)

JSX:
<RivendellCalendar calendarRules={
                       RivendellCalendar.REFORMED_RULES
                   }
                   startDay={20}
                   language={
                       RivendellCalendar.LANGUAGE_SINDARIN
                   }
                   date={${dateString}}
                   className="shire-calendar" />
                                    `}
                                </code>
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td style={CalendarCellStyle}>
                            <RivendellCalendar
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <RivendellCalendar
                                calendarRules={RivendellCalendar.REFORMED_RULES}
                                startDay={25}
                                language={RivendellCalendar.LANGUAGE_ENGLISH}
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                        <td style={CalendarCellStyle}>
                            <RivendellCalendar
                                calendarRules={RivendellCalendar.REFORMED_RULES}
                                startDay={20}
                                language={RivendellCalendar.LANGUAGE_SINDARIN}
                                date={currentDate}
                                className="shire-calendar"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default RivendellCalendarExample;
