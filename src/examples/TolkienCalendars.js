/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import ShireCalendar from '../ui/ShireCalendar';
import RivendellCalendar from '../ui/RivendellCalendar';
import NumenorCalendar from '../ui/NumenorCalendar';
import '../ui/tolkien-calendars.css';

import LanguagePicker from '../ui/controls/LanguagePicker';

import { CalendarCellStyle, DatePicker } from './Common';
import './examples.css';

class TolkienCalendarsExample extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            shireAlign: false,
            rivendellAlign: false
        };
        this.onDateChanged = this.onDateChanged.bind(this);
        this.alignChanged = this.alignChanged.bind(this);
    }

    onDateChanged(currentDate) {
        this.setState({date: currentDate});
    }

    alignChanged(event) {
        let checked = event.target.checked;
        let shireAlign = event.target.value === "shire" ? checked : false;
        let rivendellAlign = event.target.value === "rivendell" ? checked : false;
        this.setState({
            shireAlign: shireAlign,
            rivendellAlign: rivendellAlign
        });
    }

    render() {
        let currentDate = this.state.date;
        let shireAlign = this.state.shireAlign;
        let rivendellAlign = this.state.rivendellAlign;

        let shireClassName = "shire-calendar";
        if (shireAlign) {
            shireClassName += " align-shire-calendar";
        }
        let rivendellClassName = "shire-calendar rivendell-calendar";
        if (rivendellAlign) {
            rivendellClassName += " align-rivendell-calendar";
        }

        return (
            <table>
                <tbody>
                <tr>
                    <td colSpan='2'>
                        <DatePicker date={currentDate} onDateChanged={this.onDateChanged} />
                    </td>
                </tr>
                <tr>
                    <th>
                        <input type="checkbox"
                               value="shire"
                               checked={shireAlign}
                               onChange={this.alignChanged} />
                        Try to align Shire Year with Rivendell Year?
                    </th>
                    <th>
                        <input type="checkbox"
                               value="rivendell"
                               checked={rivendellAlign}
                               onChange={this.alignChanged} />
                        Try to align Rivendell Year with Shire Year?
                    </th>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar caption="Shire Reckoning"
                                       date={currentDate}
                                       className={shireClassName}
                                       yearView={shireAlign || rivendellAlign} />
                    </td>
                    <td style={CalendarCellStyle}>
                        <RivendellCalendar caption="Rivendell Reckoning"
                                           date={currentDate}
                                           className={rivendellClassName}
                                           yearView={shireAlign || rivendellAlign} />
                    </td>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <NumenorCalendar caption="Stewards' Reckoning"
                                         reckoning={NumenorCalendar.RECKONING_STEWARDS}
                                         language={LanguagePicker.ENGLISH}
                                         date={currentDate}
                                         className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <NumenorCalendar caption="New Reckoning"
                                         reckoning={NumenorCalendar.RECKONING_NEW}
                                         date={currentDate}
                                         className="shire-calendar" />
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default TolkienCalendarsExample;
