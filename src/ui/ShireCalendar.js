/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    ShireWeekdays,
    ShireMonths,
    ShireRegionEnum,
    makeShireCalendarDates,
} from "../ShireReckoning";
import { GondorLeapYearRuleEnum } from "../GondorReckoning";
import { fullYearDate, datesMatch } from "../Utils";

import DateCell, { dateKey } from "./DateCell";
import IntercalaryDay from "./IntercalaryDay";
import WeekDayHeaderCell, {
    addMonthFiller,
    addVerticalMonthFiller,
} from "./WeekDayHeaderCell";
import "./tolkien-calendars.css";

import {
    VerticalLayoutFiller,
    VERTICAL,
    HORIZONTAL,
} from "./controls/MonthViewLayout";

const getDateColor = (region, date, monthColor) => {
    if (date.className !== undefined) {
        return date.className;
    }

    const isHoliday =
        region !== ShireRegionEnum.BREE
        && ((date.month === 3 && date.day === 6)
            || (date.month === 10 && date.day === 2));

    return isHoliday ? "holiday" : monthColor;
};

const ShireDate = ({ dates, today, region }) => {
    const date = dates[0];

    let dayClassName = null;
    let dayExtraClassName = null;
    let dayExtra = null;
    let gregorianExtra = null;
    let description = null;

    if (dates.length > 1) {
        dayExtra = dates[1].region ? dates[1].region[region] : dates[1].day;
        gregorianExtra = dates[1].gregorian;
    }

    switch (date.day) {
        case "1 Yule":
            return (
                <IntercalaryDay
                    name={date.day}
                    description="Shire New Year's Eve!"
                    currentDate={today}
                    gregorian={date.gregorian}
                />
            );

        case "2 Yule":
            return (
                <IntercalaryDay
                    name={date.day}
                    description="Midwinter: Shire New Year!"
                    currentDate={today}
                    gregorian={date.gregorian}
                />
            );

        case "1 Lithe":
            description = "Midsummer's Eve";

            if (dayExtra === "Midyear's Day") {
                description = "Midsummer's Eve and Midsummer Day!";
                dayExtraClassName = "intercalary-midyears-day";
            } else if (dayExtra) {
                description = "Midsummer's Eve and Shire Leap Day!";
                dayExtraClassName = "intercalary-overlithe-day";
            }

            return (
                <IntercalaryDay
                    name={date.region[region]}
                    description={description}
                    currentDate={today}
                    gregorian={date.gregorian}
                    dayExtra={dayExtra}
                    dayExtraClassName={dayExtraClassName}
                    gregorianExtra={gregorianExtra}
                />
            );

        case "Midyear's Day":
            return (
                <IntercalaryDay
                    name={date.day}
                    description="Midsummer Day!"
                    currentDate={today}
                    gregorian={date.gregorian}
                />
            );

        case "Overlithe":
            description = "Shire Leap Day!";
            if (dayExtra) {
                dayClassName = "intercalary-overlithe-day";
                description = "Shire Leap Day and Day after Midsummer.";
            }

            return (
                <IntercalaryDay
                    name={date.region[region]}
                    description={description}
                    currentDate={today}
                    gregorian={date.gregorian}
                    dayClassName={dayClassName}
                    dayExtra={dayExtra}
                    gregorianExtra={gregorianExtra}
                />
            );

        case "2 Lithe":
            return (
                <IntercalaryDay
                    name={date.region[region]}
                    description="Day after Midsummer."
                    currentDate={today}
                    gregorian={date.gregorian}
                />
            );

        default:
            const month = ShireMonths[date.month];
            const weekday = ShireWeekdays[date.weekDay];
            const className = getDateColor(region, date, month.className);

            return (
                <DateCell
                    date={date}
                    currentDate={today}
                    month={month[region]}
                    emoji={month.emoji}
                    description={month.description}
                    weekday={weekday[region]}
                    className={className}
                />
            );
    }
};

const ShireMonth = ({ monthView, today, dates, region }) => {
    const weeks = [];
    let week = [];

    let i = 0,
        date = dates[i],
        overlithe = 1;

    for (; i < dates.length && date.month < monthView; i++, date = dates[i]) {
        // seek ahead to current month view
    }

    addMonthFiller(week, date.weekDay);

    for (; i < dates.length && monthView === date.month; i++, date = dates[i]) {
        const nextDates = [date];

        if (i + 1 < dates.length && date.weekDay === dates[i + 1].weekDay) {
            nextDates.push(dates[++i]);
        }

        week.push(
            <ShireDate
                key={dateKey(date, date.day === "Overlithe" ? overlithe++ : "")}
                dates={nextDates}
                today={today}
                region={region}
            />
        );

        if ((date.weekDay + 1) % 7 === 0) {
            weeks.push(<tr key={weeks.length}>{week}</tr>);
            week = [];
        }
    }

    // Check if simulating without Shire Reform
    if (monthView === 5 && date.day === "1 Lithe") {
        for (
            date = dates[i];
            date.day === "1 Lithe"
            || date.day === "Midyear's Day"
            || date.day === "Overlithe"
            || date.day === "2 Lithe";
            i++, date = dates[i]
        ) {
            week.push(
                <ShireDate
                    key={dateKey(
                        date,
                        date.day === "Overlithe" ? overlithe++ : ""
                    )}
                    dates={[date]}
                    today={today}
                    region={region}
                />
            );

            if ((date.weekDay + 1) % 7 === 0) {
                weeks.push(<tr key={weeks.length}>{week}</tr>);
                week = [];
            }
        }
    }

    if (week.length > 0) {
        weeks.push(<tr key={weeks.length}>{week}</tr>);
    }

    return weeks;
};

const ShireMonthVertical = ({ monthView, today, dates, region }) => {
    let weeks = ShireWeekdays.map(function (weekday) {
        const weekdayName = weekday[region];
        return [
            <WeekDayHeaderCell
                key={weekdayName}
                emoji={weekday.emoji}
                name={weekdayName}
                description={weekday.description}
                colSpan="2"
                scope="row"
            />,
        ];
    });

    let i = 0,
        date = dates[i],
        overlithe = 1;

    for (; i < dates.length && date.month < monthView; i++, date = dates[i]) {
        // seek ahead to current month view
    }

    addVerticalMonthFiller(weeks, date.weekDay);

    for (; i < dates.length && monthView === date.month; i++, date = dates[i]) {
        const nextDates = [date];

        if (i + 1 < dates.length && date.weekDay === dates[i + 1].weekDay) {
            nextDates.push(dates[++i]);
        }

        weeks[date.weekDay].push(
            <ShireDate
                key={dateKey(date, date.day === "Overlithe" ? overlithe++ : "")}
                dates={nextDates}
                today={today}
                region={region}
            />
        );
    }

    // Check if simulating without Shire Reform
    if (monthView === 5 && date.day === "1 Lithe") {
        for (
            date = dates[i];
            date.day === "1 Lithe"
            || date.day === "Midyear's Day"
            || date.day === "Overlithe"
            || date.day === "2 Lithe";
            i++, date = dates[i]
        ) {
            weeks[date.weekDay].push(
                <ShireDate
                    key={dateKey(
                        date,
                        date.day === "Overlithe" ? overlithe++ : ""
                    )}
                    dates={[date]}
                    today={today}
                    region={region}
                />
            );
        }
    }

    if (weeks[0].length > 6) {
        weeks = ShireWeekdays.map(function (weekday, i) {
            const week = weeks[i];
            const weekdayName = weekday[region];

            week.shift();
            week.unshift(
                <WeekDayHeaderCell
                    key={weekdayName}
                    emoji={weekday.emoji}
                    name={weekdayName}
                    description={weekday.description}
                    scope="row"
                />
            );

            return week;
        });
    }

    return weeks.map(function (week, i) {
        return <tr key={i}>{week}</tr>;
    });
};

const ShireYear = ({ today, dates, region }) => {
    const weeks = [];
    let week = [],
        overlithe = 1;

    addMonthFiller(week, dates[0].weekDay);

    for (let i = 0, date = dates[i]; i < dates.length; i++, date = dates[i]) {
        const nextDates = [date];

        if (i + 1 < dates.length && date.weekDay === dates[i + 1].weekDay) {
            nextDates.push(dates[++i]);
        }

        week.push(
            <ShireDate
                key={dateKey(date, date.day === "Overlithe" ? overlithe++ : "")}
                dates={nextDates}
                today={today}
                region={region}
            />
        );

        if ((date.weekDay + 1) % 7 === 0) {
            weeks.push(<tr key={weeks.length}>{week}</tr>);
            week = [];
        }
    }

    if (week.length > 0) {
        weeks.push(<tr key={weeks.length}>{week}</tr>);
    }

    return weeks;
};

const ShireCalendar = (props) => {
    const {
        caption,
        className,
        region = ShireRegionEnum.SHIRE,
        monthViewLayout = VERTICAL,
        startDay = 21,
        yearView = false,
    } = props;

    const nextDate = props.date || new Date();
    const [today, setToday] = React.useState(nextDate);

    const nextStartDate = props.startDate || fullYearDate(0, 11, startDay);
    const [startDate, setStartDate] = React.useState(nextStartDate);

    const nextRules = props.calendarRules || GondorLeapYearRuleEnum.GREGORIAN;
    const [calendarRules, setCalendarRules] = React.useState(nextRules);

    const [calendar, setCalendar] = React.useState(
        () =>
            props.calendar
            || makeShireCalendarDates(today, startDate, calendarRules)
    );

    const updateToday = !datesMatch(today, nextDate);
    if (updateToday) {
        setToday(nextDate);
    }

    const updateStartDate = !datesMatch(startDate, nextStartDate);
    if (updateStartDate) {
        setStartDate(nextStartDate);
    }

    const updateRules = calendarRules !== nextRules;
    if (updateRules) {
        setCalendarRules(nextRules);
    }

    const updateCalendar = props.calendar && props.calendar !== calendar;
    if (updateCalendar || updateToday || updateStartDate || updateRules) {
        setCalendar(
            props.calendar
                || makeShireCalendarDates(nextDate, nextStartDate, nextRules)
        );
    }

    const { dates, todayShire } = calendar;

    const monthView =
        props.monthView === undefined ? todayShire.month : props.monthView;

    return (
        <table className={className}>
            {caption && (
                <caption className="shire-caption">
                    {caption === true ? "Shire Reckoning" : caption}
                </caption>
            )}
            <thead>
                {monthViewLayout === VERTICAL && !yearView ? (
                    <VerticalLayoutFiller weekdays={ShireWeekdays} />
                ) : (
                    <tr>
                        {ShireWeekdays.map((weekday) => {
                            const weekdayName = weekday[region];
                            return (
                                <WeekDayHeaderCell
                                    key={weekdayName}
                                    emoji={weekday.emoji}
                                    name={weekdayName}
                                    description={weekday.description}
                                    scope="col"
                                />
                            );
                        })}
                    </tr>
                )}
            </thead>
            <tbody>
                {yearView ? (
                    <ShireYear today={today} dates={dates} region={region} />
                ) : monthViewLayout === VERTICAL ? (
                    <ShireMonthVertical
                        monthView={monthView}
                        today={today}
                        dates={dates}
                        region={region}
                    />
                ) : (
                    <ShireMonth
                        monthView={monthView}
                        today={today}
                        dates={dates}
                        region={region}
                    />
                )}
            </tbody>
        </table>
    );
};

ShireCalendar.REGION_NAMES_TOLKIEN = ShireRegionEnum.TOLKIEN;
ShireCalendar.REGION_NAMES_SHIRE = ShireRegionEnum.SHIRE;
ShireCalendar.REGION_NAMES_BREE = ShireRegionEnum.BREE;
ShireCalendar.MONTH_VIEW_VERTICAL = VERTICAL;
ShireCalendar.MONTH_VIEW_HORIZONTAL = HORIZONTAL;

export default ShireCalendar;
