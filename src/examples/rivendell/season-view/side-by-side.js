/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { useState } from "react";

import { RivendellCalendar } from "../../../lib";

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from "../../Common";

export const RivendellCalendarSeasonViewExample = () => {
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
                                    The Reckoning of Rivendell
                                    <br />
                                    with defaults (Traditional Rules starting
                                    from March 22nd, in Quenya)
                                </>
                            }
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <RivendellCalendar
                            caption={
                                <>
                                    The Reckoning of Rivendell
                                    <br />
                                    with Reformed Rules starting from March
                                    25th, in English
                                </>
                            }
                            calendarRules={RivendellCalendar.REFORMED_RULES}
                            startDay={25}
                            language={RivendellCalendar.LANGUAGE_ENGLISH}
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <RivendellCalendar
                            caption={
                                <>
                                    The Reckoning of Rivendell
                                    <br />
                                    with Reformed Rules starting from March
                                    20th, in Sindarin
                                </>
                            }
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
};

export default {
    title: "Shire Reckoning / Rivendell Calendar / Season View",

    parameters: {
        options: { showPanel: false },
    },

    excludeStories: ["RivendellCalendarSeasonViewExample"],
};

export const ComparingVariousRulesAndLanguages = () => (
    <RivendellCalendarSeasonViewExample />
);

ComparingVariousRulesAndLanguages.storyName =
    "comparing various rules and languages";
