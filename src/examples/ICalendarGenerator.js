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

import { Badges } from "./Common";
import ShireRegionPicker from "./controls/ShireRegionPicker";
import { ICalendarStartDatePicker } from "./controls/StartDatePicker";

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

const formatMonthDay = (num) =>
    num.toLocaleString("en-US", { minimumIntegerDigits: 2 });

const formatDate = (date) =>
    `${date.getFullYear()}${formatMonthDay(
        date.getMonth() + 1
    )}${formatMonthDay(date.getDate())}`;

const formatICalendar = (calEvents) => {
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

const formatCalString = (str) => str.replace(/,/g, "\\,").replace(/\n/g, "\\n");

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

const formatShireDateDescription = (date) => {
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

export class ICalendarGenerator extends Component {
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

        return (
            <table className="shire-calendar">
                <caption className="shire-caption">
                    Shire Reckoning iCalendar Creator
                </caption>
                <thead>
                    <tr>
                        <th className="shire-calendar-controls">
                            <ICalendarStartDatePicker
                                selectedDate={this.state.startDate}
                                onCalendarStartChange={
                                    this.onCalendarStartChange
                                }
                            />
                        </th>
                        <th className="shire-calendar-controls">
                            <ShireRegionPicker
                                region={this.state.region}
                                onRegionChange={this.onRegionChange}
                            />
                        </th>
                        <th className="shire-calendar-controls">
                            {hasClipboardAPI() && (
                                <button
                                    ref="copyTextBtn"
                                    type="button"
                                    style={{ height: "2rem", width: "8rem" }}
                                    onClick={this.onCopyText}
                                >
                                    {this.state.btnTxt}
                                </button>
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="3" className="shire-calendar-wrapper-cell">
                            <textarea
                                ref="copyTextArea"
                                rows="32"
                                cols="80"
                                value={formatICalendar(calEvents)}
                                readOnly="readonly"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

const srcStyle = {
    border: "1px solid",
    margin: "auto",
    padding: 8,
};

const ICalendarGeneratorWithInstructions = () => (
    <>
        <p>
            This project's library also exports the base calendar functions for{" "}
            <code>ShireReckoning</code>, <code>RivendellReckoning</code>, and{" "}
            <code>GondorReckoning</code> so that these calendars can be
            displayed in any other view.
        </p>
        <p>
            The following example can generate an iCalendar with a corresponding
            Shire Calendar date for each day of the year. An iCalendar can be
            created for{" "}
            <a href="https://psarando.github.io/shire-reckoning/#reckoning-start-dates">
                various start dates
            </a>{" "}
            for the Shire Calendar's New Year's Day and with{" "}
            <a href="https://psarando.github.io/shire-reckoning/#shire-reckoning-notes">
                the different names of months and weekdays
            </a>{" "}
            given in <em>The Lord of the Rings</em>. The iCalendar text can be
            copied from this text-box and saved as an <em>.ics</em> file (such
            as the{" "}
            <a href="https://psarando.github.io/shire-reckoning/shire-reckoning.ics">
                shire-reckoning.ics
            </a>{" "}
            file already included in this project) then imported into a
            calendaring program, such as Google Calendar or Apple's iCal.
        </p>
        <ul>
            <li>
                <em>Hint for Google Calendar users</em>: You probably want to
                create a new, empty calendar (it could be named "Shire
                Reckoning"), then import the{" "}
                <a href="https://psarando.github.io/shire-reckoning/shire-reckoning.ics">
                    shire-reckoning.ics
                </a>{" "}
                events into that calendar. This way you can easily hide all
                these events, or delete this new calendar to remove all the
                events at once, without affecting events in your default
                calendar, and without having to remove these shire dates one at
                a time.
            </li>
        </ul>
        <ICalendarGenerator />
        <br />
        <br />
        The following example shows how to create a Shire Calendar for today's
        date and parse the name of each day into a list. Note that React and
        this library's modules are linked from{" "}
        <a href="https://www.jsdelivr.com/">jsDelivr</a>.
        <pre style={srcStyle}>
            <code>
                {`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />

        <title>Shire Reckoning</title>

        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/react@17/umd/react.production.min.js"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/shire-reckoning/lib/TolkienCalendars.js"></script>
    </head>
    <body>
        <div id="shire-dates"></div>
        <script type="text/javascript">
            const calendar = TolkienCalendars.ShireReckoning.makeShireCalendarDates(new Date());
            const dateListText = calendar.dates
                .map((date, index) => {
                    switch (date.day) {
                        case "1 Yule":
                        case "2 Yule":
                        case "1 Lithe":
                        case "Midyear's Day":
                        case "Overlithe":
                        case "2 Lithe":
                            return date.day;
                        default:
                            return \`\${date.day} \${TolkienCalendars.ShireReckoning.ShireMonths[date.month].shire}\`;
                    }
                })
                .join("\\n");

            document.getElementById("shire-dates").innerText = dateListText;
        </script>
    </body>
</html>
                `}
            </code>
        </pre>
        <br />
        <Badges />
        <br />
        To use this library as an ES6 module, for example in an app created by{" "}
        <a href="https://reactjs.org/docs/installation.html#creating-a-new-application">
            create-react-app
        </a>
        , first install this library as a dependency by adding{" "}
        <a href="https://www.npmjs.com/package/shire-reckoning">
            shire-reckoning
        </a>{" "}
        to your app's{" "}
        <a href="https://docs.npmjs.com/files/package.json#dependencies">
            package.json
        </a>
        , then run '<code>npm install</code>'. Then update the default{" "}
        <code>App.js</code> file with the following code, which will render a
        list of each day's name in the Shire Calendar for this year:
        <pre style={srcStyle}>
            <code>
                {`
import React from "react";

import { ShireReckoning } from "shire-reckoning";

import "./App.css";

function App() {
    const calendar = ShireReckoning.makeShireCalendarDates(new Date());

    const dateStrings = calendar.dates.map((date, index) => {
        switch (date.day) {
            case "1 Yule":
            case "2 Yule":
            case "1 Lithe":
            case "Midyear's Day":
            case "Overlithe":
            case "2 Lithe":
                return date.day;
            default:
                return \`\${date.day} \${ShireReckoning.ShireMonths[date.month].shire}\`;
        }
    });

    return (
        <div className="App">
            {dateStrings.join("\\n")}
        </div>
    );
}

export default App;
                `}
            </code>
        </pre>
        <br />
        Also available are the <code>RivendellReckoning</code> and{" "}
        <code>GondorReckoning</code> exports.
    </>
);

export default {
    title: "Shire Reckoning / Shire Calendar",

    parameters: {
        options: { showPanel: false },
    },

    excludeStories: ["ICalendarGenerator"],
};

export const IcalendarCreatorForImportingIntoYourCalendar = () => (
    <ICalendarGeneratorWithInstructions />
);

IcalendarCreatorForImportingIntoYourCalendar.storyName =
    "iCalendar creator for importing into your calendar";
