/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import { ShireCalendar } from "../../../lib";

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from "../../Common";

const ShireCalendarMonthViewHorizontalExample = () => {
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
                            caption="Shire Reckoning horizontal view with Tolkien month and weekday names"
                            region={ShireCalendar.REGION_NAMES_TOLKIEN}
                            monthViewLayout={
                                ShireCalendar.MONTH_VIEW_HORIZONTAL
                            }
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar
                            caption="Shire Reckoning horizontal view with Shire month and weekday names"
                            monthViewLayout={
                                ShireCalendar.MONTH_VIEW_HORIZONTAL
                            }
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar
                            caption="Shire Reckoning horizontal view with Bree month and weekday names"
                            region={ShireCalendar.REGION_NAMES_BREE}
                            monthViewLayout={
                                ShireCalendar.MONTH_VIEW_HORIZONTAL
                            }
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

storiesOf("Shire Reckoning: Shire Calendar / Month View Horizontal", module)
    .addParameters({ options: { showPanel: false } })
    .add("comparing all region names", () => (
        <ShireCalendarMonthViewHorizontalExample />
    ));

export default ShireCalendarMonthViewHorizontalExample;
