/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import { RivendellCalendar } from "../../../lib";

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from "../../Common";

const RivendellCalendarYearViewExample = () => {
    const [currentDate, onDateChanged] = useState(new Date());

    return (
        <table>
            <tbody>
                <tr>
                    <td colSpan="3" style={CaptionCellStyle}>
                        <DatePicker
                            date={currentDate}
                            onDateChanged={onDateChanged}
                        />
                    </td>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <RivendellCalendar
                            caption={
                                <>
                                    The Calendar of Imladris
                                    <br />
                                    Year view with defaults (Traditional Rules
                                    starting from March 22nd, in Quenya)
                                </>
                            }
                            yearView={true}
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <RivendellCalendar
                            caption={
                                <>
                                    The Calendar of Imladris
                                    <br />
                                    Year view with Reformed Rules starting from
                                    March 25th, in English
                                </>
                            }
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
                            caption={
                                <>
                                    The Calendar of Imladris
                                    <br />
                                    Year view with Reformed Rules starting from
                                    March 29th, in Sindarin
                                </>
                            }
                            calendarRules={RivendellCalendar.REFORMED_RULES}
                            startDay={29}
                            language={RivendellCalendar.LANGUAGE_SINDARIN}
                            yearView={true}
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

storiesOf("Shire Reckoning: Rivendell Calendar / Year View", module)
    .addParameters({ options: { showPanel: false } })
    .add("comparing various rules and languages", () => (
        <RivendellCalendarYearViewExample />
    ));

export default RivendellCalendarYearViewExample;
