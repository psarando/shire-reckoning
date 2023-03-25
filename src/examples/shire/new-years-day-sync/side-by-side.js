/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { useState } from "react";

import { ShireCalendar } from "../../../lib";
import { fullYearDate } from "../../../Utils";

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from "../../Common";

export const ShireCalendarNewYearsDaySyncExample = () => {
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
                        the same seasonal point". Presented below is an example
                        of this hypothetical alignment.
                    </th>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar
                            caption="New Year's Day Sync: Shire Reckoning year view with Tolkien month and weekday names"
                            region={ShireCalendar.REGION_NAMES_TOLKIEN}
                            yearView={true}
                            date={currentDate}
                            startDate={newYearSyncDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar
                            caption="New Year's Day Sync: Shire Reckoning year view with Shire month and weekday names"
                            yearView={true}
                            date={currentDate}
                            startDate={newYearSyncDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar
                            caption="New Year's Day Sync: Shire Reckoning year view with Bree month and weekday names"
                            region={ShireCalendar.REGION_NAMES_BREE}
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
    title: "Shire Reckoning / Shire Calendar / What if our years began at the same seasonal point?",

    parameters: {
        options: { showPanel: false },
    },

    excludeStories: ["ShireCalendarNewYearsDaySyncExample"],
};

export const ComparingAllRegionNames = () => (
    <ShireCalendarNewYearsDaySyncExample />
);

ComparingAllRegionNames.storyName = "comparing all region names";
