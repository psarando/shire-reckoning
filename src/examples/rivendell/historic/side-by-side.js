/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import { RivendellCalendar } from "../../../lib";

import { CalendarCellStyle } from "../../Common";

const RivendellCalendarHistoricExample = () => {
    const sa1697 = new Date(590 + 1697, 8, 22);
    const ta2941 = new Date(590 + 3441 + 2941, 8, 22);
    const ta3018 = new Date(590 + 3441 + 3018, 8, 22);

    return (
        <table>
            <tbody>
                <tr>
                    <td style={CalendarCellStyle}>
                        <RivendellCalendar
                            caption={
                                <>
                                    Potential calendar (in Quenya)
                                    <br />
                                    of the Second Age 1697:
                                    <br />
                                    the year Rivendell was founded
                                    <br />
                                    <br />
                                    <br />
                                </>
                            }
                            yearView={true}
                            date={sa1697}
                            startDay={21}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <RivendellCalendar
                            caption={
                                <>
                                    Potential calendar (in English)
                                    <br />
                                    of the Third Age 2941:
                                    <br />
                                    the year Bilbo finds the One Ring, of the
                                    death of Smaug, and of The Battle of Five
                                    Armies.
                                </>
                            }
                            language={RivendellCalendar.LANGUAGE_ENGLISH}
                            yearView={true}
                            date={ta2941}
                            startDay={21}
                            className="shire-calendar"
                        />
                    </td>
                    <td style={CalendarCellStyle}>
                        <RivendellCalendar
                            caption={
                                <>
                                    Potential calendar (in Sindarin)
                                    <br />
                                    of the Third Age 3018~3019:
                                    <br />
                                    "The Great Years" of the War of the Ring and
                                    the downfall of Barad-dûr.
                                    <br />
                                    <br />
                                </>
                            }
                            language={RivendellCalendar.LANGUAGE_SINDARIN}
                            yearView={true}
                            date={ta3018}
                            startDay={21}
                            className="shire-calendar"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

storiesOf(
    "Shire Reckoning: Rivendell Calendar / Possible historic calendars",
    module
)
    .addParameters({ options: { showPanel: false } })
    .add("for select years in Middle-earth history", () => (
        <RivendellCalendarHistoricExample />
    ));

export default RivendellCalendarHistoricExample;
