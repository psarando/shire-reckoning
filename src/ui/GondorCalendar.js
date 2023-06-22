/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    GondorHolidays,
    GondorMonths,
    GondorWeekdays,
    GondorLeapYearRuleEnum,
    GondorReckoningEnum,
    makeGondorCalendarDates,
} from "../GondorReckoning";

import { datesMatch, fullYearDate } from "../Utils";

import DateCell, { dateKey } from "./DateCell";
import IntercalaryDay from "./IntercalaryDay";
import WeekDayHeaderCell, {
    addMonthFiller,
    addVerticalMonthFiller,
} from "./WeekDayHeaderCell";
import "./tolkien-calendars.css";

import { ENGLISH, QUENYA, SINDARIN } from "./controls/LanguagePicker";

import {
    HORIZONTAL,
    VERTICAL,
    VerticalLayoutFiller,
} from "./controls/MonthViewLayout";

const defaultCaption = (reckoning) => {
    switch (reckoning) {
        case GondorReckoningEnum.KINGS:
            return "Kings' Reckoning";
        case GondorReckoningEnum.STEWARDS:
            return "Stewards' Reckoning";
        case GondorReckoningEnum.NEW:
            return "New Reckoning";
        default:
            // should never happen
            return "Gondor Reckoning";
    }
};

const getDateColor = (reckoning, date, monthColor) => {
    if (date.className !== undefined) {
        return date.className;
    }

    if (
        reckoning === GondorReckoningEnum.NEW
        && date.month === 5
        && date.day === 30
    ) {
        return "holiday";
    }

    return monthColor;
};

const GondorDate = ({ date, today, language, reckoning }) => {
    switch (date.day) {
        case "Yestarë":
        case "Tuilérë":
        case "Cormarë":
        case "Loëndë":
        case "Enderë":
        case "Yáviérë":
        case "Mettarë":
            const holiday = GondorHolidays[date.day];

            return (
                <IntercalaryDay
                    name={holiday[language]}
                    description={holiday.description}
                    currentDate={today}
                    gregorian={date.gregorian}
                />
            );

        default:
            const startMonth = reckoning === GondorReckoningEnum.NEW ? 3 : 0;
            const month = GondorMonths[(date.month + startMonth) % 12];
            const weekday = GondorWeekdays[date.weekDay];
            const className = getDateColor(reckoning, date, month.className);

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

const GondorMonth = ({ monthView, dates, today, language, reckoning }) => {
    const weeks = [];
    let week = [];

    let i = 0,
        date = dates[i],
        endere = 1;

    for (; i < dates.length && date.month !== monthView; i++, date = dates[i]) {
        // seek ahead to current month view
    }

    addMonthFiller(week, date.weekDay);

    for (; i < dates.length && monthView === date.month; i++, date = dates[i]) {
        week.push(
            <GondorDate
                key={dateKey(date, date.day === "Enderë" ? endere++ : "")}
                date={date}
                today={today}
                language={language}
                reckoning={reckoning}
            />
        );

        if ((date.weekDay + 1) % 7 === 0) {
            weeks.push(<tr key={weeks.length}>{week}</tr>);
            week = [];
        }
    }

    switch (monthView) {
        case 2:
            if (date.day === "Tuilérë") {
                week.push(
                    <GondorDate
                        key={dateKey(date)}
                        date={date}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                );
            }

            break;

        case 5:
            date = dates[i];
            for (
                ;
                date.day === "Enderë" || date.day === "Loëndë";
                i++, date = dates[i]
            ) {
                week.push(
                    <GondorDate
                        key={dateKey(
                            date,
                            date.day === "Enderë" ? endere++ : ""
                        )}
                        date={date}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                );

                if ((date.weekDay + 1) % 7 === 0) {
                    weeks.push(<tr key={weeks.length}>{week}</tr>);
                    week = [];
                }
            }

            break;

        case 8:
            if (date.day === "Yáviérë") {
                week.push(
                    <GondorDate
                        key={dateKey(date)}
                        date={date}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                );
            }

            break;

        default:
            break;
    }

    if (week.length > 0) {
        weeks.push(<tr key={weeks.length}>{week}</tr>);
    }

    return weeks;
};

const GondorMonthVertical = ({
    monthView,
    dates,
    today,
    language,
    reckoning,
}) => {
    let weeks = GondorWeekdays.map(function (weekday) {
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

    for (; i < dates.length && date.month !== monthView; i++, date = dates[i]) {
        // seek ahead to current month view
    }

    addVerticalMonthFiller(weeks, date.weekDay);

    for (; i < dates.length && monthView === date.month; i++, date = dates[i]) {
        weeks[date.weekDay].push(
            <GondorDate
                key={dateKey(date, date.day === "Enderë" ? endere++ : "")}
                date={date}
                today={today}
                language={language}
                reckoning={reckoning}
            />
        );
    }

    switch (monthView) {
        case 2:
            if (date.day === "Tuilérë") {
                weeks[date.weekDay].push(
                    <GondorDate
                        key={dateKey(date)}
                        date={date}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                );
            }

            break;

        case 5:
            date = dates[i];
            for (
                ;
                date.day === "Enderë" || date.day === "Loëndë";
                i++, date = dates[i]
            ) {
                weeks[date.weekDay].push(
                    <GondorDate
                        key={dateKey(
                            date,
                            date.day === "Enderë" ? endere++ : ""
                        )}
                        date={date}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                );
            }

            break;
        case 8:
            if (date.day === "Yáviérë") {
                weeks[date.weekDay].push(
                    <GondorDate
                        key={dateKey(date)}
                        date={date}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                );
            }

            break;

        default:
            break;
    }

    if (weeks[0].length > 6) {
        weeks = GondorWeekdays.map(function (weekday, i) {
            const week = weeks[i];
            const weekdayName = weekday[language];

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

const GondorYear = ({ dates, today, language, reckoning }) => {
    const weeks = [];
    let week = [],
        endere = 1;

    addMonthFiller(week, dates[0].weekDay);

    for (let i = 0, date = dates[i]; i < dates.length; i++, date = dates[i]) {
        week.push(
            <GondorDate
                key={dateKey(date, date.day === "Enderë" ? endere++ : "")}
                date={date}
                today={today}
                language={language}
                reckoning={reckoning}
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

const GondorCalendar = (props) => {
    const {
        caption,
        className,
        language = QUENYA,
        monthViewLayout = VERTICAL,
        startDay = 21,
        yearView = false,
    } = props;

    const nextDate = props.date || new Date();
    const [today, setToday] = React.useState(nextDate);

    const nextStartDate = props.startDate || fullYearDate(0, 11, startDay);
    const [startDate, setStartDate] = React.useState(nextStartDate);

    const nextReckoning = props.reckoning || GondorReckoningEnum.STEWARDS;
    const [reckoning, setReckoning] = React.useState(nextReckoning);

    const nextRules = props.calendarRules || GondorLeapYearRuleEnum.GREGORIAN;
    const [calendarRules, setCalendarRules] = React.useState(nextRules);

    const [calendar, setCalendar] = React.useState(
        () =>
            props.calendar
            || makeGondorCalendarDates(
                today,
                startDate,
                reckoning,
                calendarRules
            )
    );

    const updateToday = !datesMatch(today, nextDate);
    if (updateToday) {
        setToday(nextDate);
    }

    const updateStartDate = !datesMatch(startDate, nextStartDate);
    if (updateStartDate) {
        setStartDate(nextStartDate);
    }

    const updateReckoning = reckoning !== nextReckoning;
    if (updateReckoning) {
        setReckoning(nextReckoning);
    }

    const updateRules = calendarRules !== nextRules;
    if (updateRules) {
        setCalendarRules(nextRules);
    }

    const updateCalendar = props.calendar && props.calendar !== calendar;
    if (
        updateCalendar
        || updateToday
        || updateStartDate
        || updateReckoning
        || updateRules
    ) {
        setCalendar(
            props.calendar
                || makeGondorCalendarDates(
                    nextDate,
                    nextStartDate,
                    nextReckoning,
                    nextRules
                )
        );
    }

    const { dates, todayGondor } = calendar;

    const monthView =
        props.monthView === undefined ? todayGondor.month : props.monthView;

    return (
        <table className={className}>
            {caption && (
                <caption className="gondor-caption">
                    {caption === true ? defaultCaption(reckoning) : caption}
                </caption>
            )}
            <thead>
                {monthViewLayout === VERTICAL && !yearView ? (
                    <VerticalLayoutFiller weekdays={GondorWeekdays} />
                ) : (
                    <tr>
                        {GondorWeekdays.map(function (weekday) {
                            const weekdayName = weekday[language];
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
                    <GondorYear
                        dates={dates}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                ) : monthViewLayout === VERTICAL ? (
                    <GondorMonthVertical
                        monthView={monthView}
                        dates={dates}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                ) : (
                    <GondorMonth
                        monthView={monthView}
                        dates={dates}
                        today={today}
                        language={language}
                        reckoning={reckoning}
                    />
                )}
            </tbody>
        </table>
    );
};

GondorCalendar.RECKONING_KINGS = GondorReckoningEnum.KINGS;
GondorCalendar.RECKONING_STEWARDS = GondorReckoningEnum.STEWARDS;
GondorCalendar.RECKONING_NEW = GondorReckoningEnum.NEW;

GondorCalendar.RECKONING_RULES_TRADITIONAL = GondorLeapYearRuleEnum.TRADITIONAL;
GondorCalendar.RECKONING_RULES_GREGORIAN = GondorLeapYearRuleEnum.GREGORIAN;

GondorCalendar.MONTH_VIEW_VERTICAL = VERTICAL;
GondorCalendar.MONTH_VIEW_HORIZONTAL = HORIZONTAL;

GondorCalendar.LANGUAGE_ENGLISH = ENGLISH;
GondorCalendar.LANGUAGE_QUENYA = QUENYA;
GondorCalendar.LANGUAGE_SINDARIN = SINDARIN;

export default GondorCalendar;
export { defaultCaption };
