/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { useState } from "react";

import { ShireCalendar } from "../../../lib";

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from "../../Common";

export const ShireCalendarYearViewExample = (props) => {
    const [currentDate, onDateChanged] = useState(props.date || new Date());

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
                            caption="Shire Reckoning year view with Tolkien month and weekday names"
                            region={ShireCalendar.REGION_NAMES_TOLKIEN}
                            yearView={true}
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar
                            caption="Shire Reckoning year view with Shire month and weekday names"
                            yearView={true}
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar
                            caption="Shire Reckoning year view with Bree month and weekday names"
                            region={ShireCalendar.REGION_NAMES_BREE}
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

export default {
    title: "Shire Reckoning / Shire Calendar / Year View",

    parameters: {
        options: { showPanel: false },
    },

    component: ShireCalendarYearViewExample,
    excludeStories: ["ShireCalendarYearViewExample"],
};

export const ComparingAllRegionNames = {
    name: "comparing all region names",
};
