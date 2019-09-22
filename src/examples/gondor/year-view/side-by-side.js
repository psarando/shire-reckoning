/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import { GondorCalendar } from "../../../lib";

import { CalendarCellStyle, CaptionCellStyle, DatePicker } from "../../Common";

const GondorCalendarYearViewExample = () => {
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
                            caption={
                                <>
                                    Kings' Reckoning
                                    <br />
                                    Year View in Sindarin
                                </>
                            }
                            reckoning={GondorCalendar.RECKONING_KINGS}
                            language={GondorCalendar.LANGUAGE_SINDARIN}
                            yearView={true}
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar
                            caption={
                                <>
                                    Stewards' Reckoning
                                    <br />
                                    Year View in English
                                </>
                            }
                            reckoning={GondorCalendar.RECKONING_STEWARDS}
                            language={GondorCalendar.LANGUAGE_ENGLISH}
                            yearView={true}
                            date={currentDate}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar
                            caption={
                                <>
                                    New Reckoning
                                    <br />
                                    Year View in Quenya
                                </>
                            }
                            reckoning={GondorCalendar.RECKONING_NEW}
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

storiesOf("Shire Reckoning: Gondor Calendar / Year View", module)
    .addParameters({ options: { showPanel: false } })
    .add("comparing all reckonings", () => <GondorCalendarYearViewExample />);

export default GondorCalendarYearViewExample;
