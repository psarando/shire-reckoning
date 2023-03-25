/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { useState } from "react";

import { GondorCalendar } from "../../../lib";

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from "../../Common";
import { fullYearDate } from "../../../Utils";

export const GondorCalendarNewYearsDaySyncExample = () => {
    const [currentDate, onDateChanged] = useState(new Date());
    const newYearSyncDate = fullYearDate(1, 0, 1);

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
                    <th colSpan="3" style={CaptionCellStyle}>
                        In Appendix D, Tolkien made a brief comparison of our
                        calendar with the Shire calendar "if our years began at
                        the same seasonal point". Presented below is a similar
                        hypothetical alignment of our calendar with the
                        calendars of Gondor.
                    </th>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar
                            caption="New Year's Day Sync: Kings' Reckoning year view in Sindarin"
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
                            caption="New Year's Day Sync: Stewards' Reckoning year view in English"
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
                            caption="New Year's Day Sync: New Reckoning year view in Quenya"
                            reckoning={GondorCalendar.RECKONING_NEW}
                            yearView={true}
                            date={currentDate}
                            startDate={newYearSyncDate}
                            className="shire-calendar"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default {
    title: "Shire Reckoning / Gondor Calendar / What if our years began at the same seasonal point?",

    parameters: {
        options: { showPanel: false },
    },

    component: GondorCalendarNewYearsDaySyncExample,
    excludeStories: ["GondorCalendarNewYearsDaySyncExample"],
};

export const ComparingAllReckonings = {
    name: "comparing all reckonings",
};
