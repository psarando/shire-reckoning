/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { ShireCalendar, GondorCalendar } from "../../../lib";
import { fullYearDate } from "../../../Utils";

import { CalendarCellStyle, CaptionCellStyle } from "../../Common";

export const ShireCalendarTraditionalRulesExample = () => {
    const secondAgeStartDate = fullYearDate(0, 11, 23);

    const ta1300 = fullYearDate(3441 + 1300, 5, 20);
    const ta1601 = fullYearDate(3441 + 1601, 5, 19);
    const ta3019 = fullYearDate(3441 + 3019, 2, 14);

    return (
        <table>
            <tbody>
                <tr>
                    <th colSpan="3" style={CaptionCellStyle}>
                        In Appendix D, Tolkien described leap-day and leap-year
                        rules for the calendars of Gondor the that were similar
                        yet different compared to our Gregorian calendar. Since
                        the Shire calendars were in sync with the calendars of
                        Gondor by the end of the Third Age, these calendars also
                        include a "traditional" rules setting that allows the
                        Shire calendars to reckon dates according to the
                        traditional leap-day and leap-year rules of Gondor as
                        described in Appendix D, from any start date, which will
                        be considered the start of the Second Age in these
                        reckonings. When reckoning with these traditional rules,
                        the Shire calendars will also only display according to
                        Shire-reform on or after T.A. 2703 (
                        <a href="https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html#shire-reform">
                            the approximate year Shire-reform was enacted
                        </a>
                        ). Note that these Shire calendars will mark Astron 6
                        and Blotmath 2 as holidays by default, but these were
                        not holidays in the Shire until after T.A. 3019. See the{" "}
                        <a href="https://github.com/psarando/shire-reckoning/blob/master/CHANGELOG.md#320-2018-03-25">
                            3.2.0 Changelog entry
                        </a>{" "}
                        for details on how to override a date cell's CSS class
                        (to override or unset its background color).
                    </th>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar
                            caption={
                                <>
                                    Bree Reckoning for T.A. 1300
                                    <br />
                                    (the year Hobbits first settled in Bree)
                                    <br />
                                    Year view with Bree month and weekday names.
                                </>
                            }
                            calendarRules={
                                GondorCalendar.RECKONING_RULES_TRADITIONAL
                            }
                            region={ShireCalendar.REGION_NAMES_BREE}
                            yearView={true}
                            date={ta1300}
                            startDate={secondAgeStartDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar
                            caption={
                                <>
                                    Shire Reckoning for T.A. 1601
                                    <br />
                                    (the year Hobbits first colonized the Shire)
                                    <br />
                                    Year view with Shire month and weekday
                                    names.
                                </>
                            }
                            calendarRules={
                                GondorCalendar.RECKONING_RULES_TRADITIONAL
                            }
                            yearView={true}
                            date={ta1601}
                            startDate={secondAgeStartDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar
                            caption={
                                <>
                                    Shire Reckoning for T.A. 3019
                                    <br />
                                    (date of the destruction of the One Ring)
                                    <br />
                                    Year view with Tolkien month and weekday
                                    names.
                                </>
                            }
                            calendarRules={
                                GondorCalendar.RECKONING_RULES_TRADITIONAL
                            }
                            region={ShireCalendar.REGION_NAMES_TOLKIEN}
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
    title: "Shire Reckoning / Shire Calendar / Traditional Rules",

    parameters: {
        options: { showPanel: false },
    },

    excludeStories: ["ShireCalendarTraditionalRulesExample"],
};

export const ForSelectYearsInHobbitHistory = () => (
    <ShireCalendarTraditionalRulesExample />
);

ForSelectYearsInHobbitHistory.storyName = "for select years in Hobbit history";
