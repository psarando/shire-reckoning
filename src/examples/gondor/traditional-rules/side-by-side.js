/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { GondorCalendar } from "../../../lib";
import { fullYearDate } from "../../../Utils";

import { CalendarCellStyle, CaptionCellStyle } from "../../Common";

export const GondorCalendarTraditionalRulesExample = () => {
    const secondAgeStartDate = fullYearDate(0, 11, 23);

    const sa32 = fullYearDate(32, 5, 22);
    const ta2060 = fullYearDate(3441 + 2060, 5, 22);
    const ta3019 = fullYearDate(3441 + 3019, 2, 14);

    return (
        <table>
            <tbody>
                <tr>
                    <th colSpan="3" style={CaptionCellStyle}>
                        In Appendix D, Tolkien described leap-day and leap-year
                        rules for the calendars of Gondor the that were similar
                        yet different compared to our Gregorian calendar. So
                        these calendars also include a "traditional" rules
                        setting that allows the Gondor calendars to reckon dates
                        according to their traditional leap-day and leap-year
                        rules as described in Appendix D, from any start date,
                        which will be considered the start of the Second Age in
                        these reckonings.
                    </th>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar
                            caption={
                                <>
                                    Kings' Reckoning for S.A. 32
                                    <br />
                                    (first King of Númenor crowned)
                                    <br />
                                    Year view in Sindarin
                                </>
                            }
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
                            caption={
                                <>
                                    Stewards' Reckoning for T.A. 2060
                                    <br />
                                    (first year of Stewards' Reckoning)
                                    <br />
                                    Year view in English
                                </>
                            }
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
                            caption={
                                <>
                                    New Reckoning for T.A. 3019
                                    <br />
                                    (date of the destruction of the One Ring)
                                    <br />
                                    Year view in Quenya
                                </>
                            }
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
};

export default {
    title: "Shire Reckoning / Gondor Calendar / Traditional Rules",

    parameters: {
        options: { showPanel: false },
    },

    excludeStories: ["GondorCalendarTraditionalRulesExample"],
};

export const ForSelectYearsInMiddleEarthHistory = () => (
    <GondorCalendarTraditionalRulesExample />
);

ForSelectYearsInMiddleEarthHistory.storyName = "for select years in Middle-earth history";
