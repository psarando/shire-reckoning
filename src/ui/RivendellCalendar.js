/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    RivendellWeekdays,
    RivendellMonths,
    RivendellHolidays,
    RivendellRulesEnum,
    makeRivendellCalendarDates,
} from "../RivendellReckoning";

import { fullYearDate, datesMatch } from "../Utils";

import DateCell, { dateKey } from "./DateCell";
import IntercalaryDay from "./IntercalaryDay";
import WeekDayHeaderCell, {
    addMonthFiller,
    addVerticalMonthFiller,
} from "./WeekDayHeaderCell";
import "./tolkien-calendars.css";

import { ENGLISH, QUENYA, SINDARIN } from "./controls/LanguagePicker";

import {
    VerticalLayoutFiller,
    VERTICAL,
    HORIZONTAL,
} from "./controls/MonthViewLayout";

const RivendellDate = ({ date, today, language }) => {
    switch (date.day) {
        case "Yestarë":
        case "Enderë":
        case "Reformed Enderë":
        case "Mettarë":
            const holiday = RivendellHolidays[date.day];

            return (
                <IntercalaryDay
                    name={holiday[language]}
                    description={holiday.description}
                    currentDate={today}
                    gregorian={date.gregorian}
                />
            );

        default:
            const month = RivendellMonths[date.month];
            const weekday = RivendellWeekdays[date.weekDay];
            const className =
                date.className === undefined ? month.className : date.className;

            return (
                <DateCell
                    date={date}
                    currentDate={today}
                    month={month[language]}
                    emoji={month.emoji}
                    description={month.description}
                    weekday={weekday[language]}
                    className={className}
                />
            );
    }
};

const RivendellMonth = ({ monthView, dates, today, language }) => {
    const weeks = [];
    let week = [];

    let i = 0,
        date = dates[i],
        endere = 1;

    for (; i < dates.length && date.month < monthView; i++, date = dates[i]) {
        // seek ahead to current month view
    }

    addMonthFiller(week, date.weekDay);

    for (; i < dates.length && monthView === date.month; i++, date = dates[i]) {
        week.push(
            <RivendellDate
                key={dateKey(date, date.day === "Enderë" ? endere++ : "")}
                date={date}
                today={today}
                language={language}
            />
        );

        if ((date.weekDay + 1) % 6 === 0) {
            weeks.push(<tr key={weeks.length}>{week}</tr>);
            week = [];
        }
    }

    if (monthView === 2) {
        date = dates[i];
        for (; date.day === "Enderë"; i++, date = dates[i]) {
            week.push(
                <RivendellDate
                    key={dateKey(date, endere++)}
                    date={date}
                    today={today}
                    language={language}
                />
            );

            if ((date.weekDay + 1) % 6 === 0) {
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

const RivendellMonthVertical = ({ monthView, dates, today, language }) => {
    const weeks = RivendellWeekdays.map(function (weekday) {
        const weekdayName = weekday[language];
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
        endere = 1;

    for (; i < dates.length && date.month < monthView; i++, date = dates[i]) {
        // seek ahead to current month view
    }

    addVerticalMonthFiller(weeks, date.weekDay);

    for (; i < dates.length && monthView === date.month; i++, date = dates[i]) {
        weeks[date.weekDay].push(
            <RivendellDate
                key={dateKey(date, date.day === "Enderë" ? endere++ : "")}
                date={date}
                today={today}
                language={language}
            />
        );
    }

    if (monthView === 2) {
        date = dates[i];
        for (; date.day === "Enderë"; i++, date = dates[i]) {
            weeks[date.weekDay].push(
                <RivendellDate
                    key={dateKey(date, endere++)}
                    date={date}
                    today={today}
                    language={language}
                />
            );
        }
    }

    return weeks.map(function (week, i) {
        return <tr key={i}>{week}</tr>;
    });
};

const RivendellYear = ({ dates, today, language }) => {
    const weeks = [];
    let week = [],
        endere = 1;

    addMonthFiller(week, dates[0].weekDay);

    for (let i = 0, date = dates[i]; i < dates.length; i++, date = dates[i]) {
        week.push(
            <RivendellDate
                key={dateKey(date, date.day === "Enderë" ? endere++ : "")}
                date={date}
                today={today}
                language={language}
            />
        );

        if ((date.weekDay + 1) % 6 === 0) {
            weeks.push(<tr key={weeks.length}>{week}</tr>);
            week = [];
        }
    }

    if (week.length > 0) {
        weeks.push(<tr key={weeks.length}>{week}</tr>);
    }

    return weeks;
};

const RivendellCalendar = (props) => {
    const { caption, className } = props;

    const language = props.language || QUENYA;
    const yearView = !!props.yearView;
    const monthViewLayout = props.monthViewLayout || HORIZONTAL;

    const [today, setToday] = React.useState(props.date || new Date());

    const [calendarRules, setCalendarRules] = React.useState(
        props.calendarRules || RivendellRulesEnum.TRADITIONAL
    );

    const startDay = props.startDay || 22;
    const [startDate, setStartDate] = React.useState(
        props.startDate || fullYearDate(1, 2, startDay)
    );

    const [calendar, setCalendar] = React.useState(
        props.calendar
            || makeRivendellCalendarDates(today, startDate, calendarRules)
    );

    React.useEffect(() => {
        const newDate = props.date || new Date();
        if (!datesMatch(today, newDate)) {
            setToday(newDate);
        }
    }, [props.date]);

    React.useEffect(() => {
        const newStartDate = props.startDate || fullYearDate(1, 2, startDay);
        if (!datesMatch(startDate, newStartDate)) {
            setStartDate(newStartDate);
        }
    }, [props.startDate, props.startDay]);

    React.useEffect(() => {
        setCalendarRules(props.calendarRules || RivendellRulesEnum.TRADITIONAL);
    }, [props.calendarRules]);

    React.useEffect(() => {
        setCalendar(
            props.calendar
                || makeRivendellCalendarDates(today, startDate, calendarRules)
        );
    }, [props.calendar, today, startDate, calendarRules]);

    const { dates, todayRivendell } = calendar;

    const monthView =
        props.monthView === undefined ? todayRivendell.month : props.monthView;

    return (
        <table className={className}>
            {caption && (
                <caption className="rivendell-caption">
                    {caption === true ? "Rivendell Reckoning" : caption}
                </caption>
            )}
            <thead>
                {monthViewLayout === VERTICAL && !yearView ? (
                    <VerticalLayoutFiller weekdays={RivendellWeekdays} />
                ) : (
                    <tr>
                        {RivendellWeekdays.map(function (weekday) {
                            let weekdayName = weekday[language];
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
                    <RivendellYear
                        dates={dates}
                        today={today}
                        language={language}
                    />
                ) : monthViewLayout === VERTICAL ? (
                    <RivendellMonthVertical
                        monthView={monthView}
                        dates={dates}
                        today={today}
                        language={language}
                    />
                ) : (
                    <RivendellMonth
                        monthView={monthView}
                        dates={dates}
                        today={today}
                        language={language}
                    />
                )}
            </tbody>
        </table>
    );
};

RivendellCalendar.TRADITIONAL_RULES = RivendellRulesEnum.TRADITIONAL;
RivendellCalendar.REFORMED_RULES = RivendellRulesEnum.REFORMED;

RivendellCalendar.LANGUAGE_ENGLISH = ENGLISH;
RivendellCalendar.LANGUAGE_QUENYA = QUENYA;
RivendellCalendar.LANGUAGE_SINDARIN = SINDARIN;

RivendellCalendar.MONTH_VIEW_VERTICAL = VERTICAL;
RivendellCalendar.MONTH_VIEW_HORIZONTAL = HORIZONTAL;

export default RivendellCalendar;
