/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { useState } from "react";

import { ShireCalendar } from "../../../lib";

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from "../../Common";

export const ShireCalendarMonthViewVerticalExample = () => {
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
                        <ShireCalendar
                            caption="Shire Reckoning with Tolkien month and weekday names"
                            region={ShireCalendar.REGION_NAMES_TOLKIEN}
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar
                            caption="Shire Reckoning with Shire month and weekday names"
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar
                            caption="Shire Reckoning with Bree month and weekday names"
                            region={ShireCalendar.REGION_NAMES_BREE}
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
    title: "Shire Reckoning / Shire Calendar / Month View",

    parameters: {
        options: { showPanel: false },
    },

    excludeStories: ["ShireCalendarMonthViewVerticalExample"],
};

export const ComparingAllRegionNames = () => (
    <ShireCalendarMonthViewVerticalExample />
);

ComparingAllRegionNames.story = {
    name: "comparing all region names",
};
