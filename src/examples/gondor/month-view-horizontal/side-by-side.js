/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { useState } from "react";

import { GondorCalendar } from "../../../lib";

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from "../../Common";

export const GondorCalendarMonthViewHorizontalExample = (props) => {
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
                        <GondorCalendar
                            caption="Kings' Reckoning in Quenya"
                            reckoning={GondorCalendar.RECKONING_KINGS}
                            monthViewLayout={
                                GondorCalendar.MONTH_VIEW_HORIZONTAL
                            }
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar
                            caption="Stewards' Reckoning in Sindarin"
                            reckoning={GondorCalendar.RECKONING_STEWARDS}
                            monthViewLayout={
                                GondorCalendar.MONTH_VIEW_HORIZONTAL
                            }
                            language={GondorCalendar.LANGUAGE_SINDARIN}
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar
                            caption="New Reckoning in English"
                            reckoning={GondorCalendar.RECKONING_NEW}
                            monthViewLayout={
                                GondorCalendar.MONTH_VIEW_HORIZONTAL
                            }
                            language={GondorCalendar.LANGUAGE_ENGLISH}
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
    title: "Shire Reckoning / Gondor Calendar / Month View Horizontal",

    parameters: {
        options: { showPanel: false },
    },

    component: GondorCalendarMonthViewHorizontalExample,
    excludeStories: ["GondorCalendarMonthViewHorizontalExample"],
};

export const ComparingAllReckonings = {
    name: "comparing all reckonings",
};
