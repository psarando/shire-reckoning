/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { useState } from "react";

import { GondorCalendar } from "../../../lib";

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from "../../Common";

export const GondorCalendarMonthViewExample = () => {
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
                        <GondorCalendar
                            caption="Kings' Reckoning in English."
                            reckoning={GondorCalendar.RECKONING_KINGS}
                            language={GondorCalendar.LANGUAGE_ENGLISH}
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar
                            caption="Stewards' Reckoning in Quenya."
                            reckoning={GondorCalendar.RECKONING_STEWARDS}
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar
                            caption="New Reckoning in Sindarin."
                            reckoning={GondorCalendar.RECKONING_NEW}
                            language={GondorCalendar.LANGUAGE_SINDARIN}
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
    title: "Shire Reckoning / Gondor Calendar / Month View",

    parameters: {
        options: { showPanel: false },
    },

    excludeStories: ["GondorCalendarMonthViewExample"],
};

export const ComparingAllReckonings = () => <GondorCalendarMonthViewExample />;

ComparingAllReckonings.story = {
    name: "comparing all reckonings",
};
