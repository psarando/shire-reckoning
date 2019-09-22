/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import {
    REGION_NAMES_SHIRE,
    ShireMonths,
    ShireWeekdays,
    makeShireCalendarDates,
} from "../ShireReckoning";
import { toDaysElapsed, fullYearDate, getNextDate } from "../Utils";

import "../ui/tolkien-calendars.css";

import ShireRegionPicker from "./controls/ShireRegionPicker";
import StartDatePicker from "./controls/StartDatePicker";

/**
 * Element copy code borrowed from https://github.com/cyverse/troposphere/pull/514.
 */
const hasClipboardAPI = () => {
    let result = false;

    try {
        result =
            document.queryCommandSupported
            && document.queryCommandSupported("copy");
    } catch (e) {}

    return result;
};

/**
 * Safely copies the contents of an `element` that has been selected to the clipboard.
 */
const copySelection = () => {
    let copied = false;

    if (hasClipboardAPI()) {
        try {
            copied = document.execCommand("copy");
        } catch (e) {}
    }

    return copied;
};

const formatMonthDay = num =>
    num.toLocaleString("en-US", { minimumIntegerDigits: 2 });

const formatDate = date =>
    `${date.getFullYear()}${formatMonthDay(
        date.getMonth() + 1
    )}${formatMonthDay(date.getDate())}`;

const formatICalendar = calEvents => {
    let calDesc = `A calendar of J.R.R. Tolkien's 'Shire Reckoning' dates corresponding to our
  Gregorian dates\\, according to http://shire-reckoning.com/calendar.html\\, which
  suggests that we "anchor the Shire calendar on the solstice of one particular
  year\\, then add the Overlithe every four years thereafter. This ... could
  maintain a stable relationship between Shire and modern dates if Shire
  leap-years were coordinated with those of our own calendar... Under this
  system we always celebrate the Shire New Year upon our own 21 December."\\n\\n
 I chose to start this calendar on the 21st of December 1931\\, which places the
  majority of the Shire Reckoning dates in 1932\\, the year 'The Hobbit' was first
  completed\\, and also happens to be a leap-year\\, a good starting point for marking
  Overlithe leap-days. Month and weekday descriptions compiled from
  The Lord of the Rings: A Reader's Companion.\\n\\n
 Note: This calendar will erroneously mark '2 Lithe' as 'Overlithe' on
  centennial years which are not leap-years.`;

    return `BEGIN:VCALENDAR
PRODID:-//Paul Sarando//Shire Reckoning Calendar 1.0//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Shire Reckoning
X-WR-CALDESC:${calDesc}
${calEvents}
END:VCALENDAR`;
};

const formatCalString = str => str.replace(/,/g, "\\,").replace(/\n/g, "\\n");

const formatShireDate = (date, region) => {
    let month = "";
    let weekday = "";

    if (Number.isSafeInteger(date.day)) {
        month = " " + ShireMonths[date.month][region];
    }

    if (date.day !== "Midyear's Day" && date.day !== "Overlithe") {
        weekday = ", " + ShireWeekdays[date.weekDay][region];
    }

    return formatCalString(`${date.day}${month}${weekday}`);
};

const formatShireDateDescription = date => {
    switch (date.day) {
        case "1 Yule":
            return "Shire New Year's Eve!";
        case "2 Yule":
            return "Midwinter: Shire New Year!";
        case "1 Lithe":
            return "Midsummer's Eve!";
        case "Midyear's Day":
            return "Midsummer Day!";
        case "Overlithe":
            return "Shire Leap Day.";
        case "2 Lithe":
            return "Day after Midsummer.";
        default:
            let description = ShireMonths[date.month].description;
            let weekDayDescription = ShireWeekdays[date.weekDay].description;

            return formatCalString(
                `${description}

${weekDayDescription}`
            );
    }
};

const formatCalEvent = (date, sequence, summary, description, ruleExtra) =>
    `BEGIN:VEVENT
DTSTART;VALUE=DATE:${formatDate(date)}
DTEND;VALUE=DATE:${formatDate(getNextDate(date))}
RRULE:FREQ=YEARLY${ruleExtra}
DTSTAMP:20120922T115737Z
DESCRIPTION:${description}
UID:20120922T115737Z-${sequence}@psarando.github.io
SEQUENCE:${sequence}
STATUS:CONFIRMED
SUMMARY:${summary}
TRANSP:OPAQUE
END:VEVENT`;

class ICalendarGenerator extends Component {
    constructor(props) {
        super(props);

        let today = new Date(1931, 11, 21);
        let startDate = fullYearDate(0, 11, 21);
        let calendar = makeShireCalendarDates(today, startDate);

        this.state = {
            today: today,
            startDate: startDate,
            calendar: calendar,
            region: REGION_NAMES_SHIRE,
            btnTxt: "Copy",
        };

        this.onCalendarStartChange = this.onCalendarStartChange.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.onCopyText = this.onCopyText.bind(this);
    }

    onCalendarStartChange(startDate) {
        let today = new Date(this.state.calendar.today);
        today.setDate(startDate.getDate());

        let calendar = makeShireCalendarDates(today, startDate);

        this.setState({
            today: today,
            startDate: startDate,
            calendar: calendar,
            btnTxt: "Copy",
        });
    }

    onRegionChange(event) {
        this.setState({ region: event.target.value, btnTxt: "Copy" });
    }

    onCopyText(e) {
        e.preventDefault();

        this.refs.copyTextArea.select();
        if (copySelection()) {
            this.setState({ btnTxt: "Copied!" });
        }
    }

    renderCopyTextArea(text) {
        return (
            <textarea
                ref="copyTextArea"
                rows="32"
                cols="80"
                value={text}
                readOnly="readonly"
            />
        );
    }

    renderCopyButton(btnTxt) {
        if (hasClipboardAPI()) {
            return (
                <button
                    ref="copyTextBtn"
                    type="button"
                    style={{ height: "2rem", width: "8rem" }}
                    onClick={this.onCopyText}
                >
                    {btnTxt}
                </button>
            );
        }
    }

    renderCalendarControls() {
        return (
            <tr>
                <th className="shire-calendar-controls">
                    <StartDatePicker
                        month="December"
                        startRange={19}
                        endRange={25}
                        startDate={this.state.startDate}
                        onCalendarStartChange={this.onCalendarStartChange}
                    />
                </th>
                <th className="shire-calendar-controls">
                    <ShireRegionPicker
                        region={this.state.region}
                        onRegionChange={this.onRegionChange}
                    />
                </th>
            </tr>
        );
    }

    render() {
        let calendar = this.state.calendar;

        let gregorianNewYearsDay = new Date(this.state.today);
        gregorianNewYearsDay.setFullYear(
            gregorianNewYearsDay.getFullYear() + 1,
            0,
            1
        );

        let calEvents = calendar.dates
            .map((date, index) => {
                let sequence = index + 1;
                let ruleExtra = "";

                let dayOfYear =
                    1 + toDaysElapsed(gregorianNewYearsDay, date.gregorian);
                if (60 <= dayOfYear && sequence <= 184) {
                    let interval = date.day === "Overlithe" ? 4 : 1;

                    ruleExtra = `;INTERVAL=${interval};BYYEARDAY=${dayOfYear}`;
                }

                return formatCalEvent(
                    date.gregorian,
                    sequence,
                    formatShireDate(date, this.state.region),
                    formatShireDateDescription(date),
                    ruleExtra
                );
            })
            .join("\n");

        let controls = this.renderCalendarControls(),
            copyTextArea = this.renderCopyTextArea(formatICalendar(calEvents)),
            copyButton = this.renderCopyButton(this.state.btnTxt);

        return (
            <table className="shire-calendar">
                <caption className="shire-caption">
                    Shire Reckoning iCalendar Creator
                </caption>
                <thead>{controls}</thead>
                <tbody>
                    <tr>
                        <td colSpan="2" className="shire-calendar-wrapper-cell">
                            {copyTextArea}
                            {copyButton}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default ICalendarGenerator;
