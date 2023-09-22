/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    RivendellCalendarYear,
    RivendellDate,
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

import { LanguageEnum } from "./controls/LanguagePicker";

import {
    MonthLayoutEnum,
    VerticalLayoutFiller,
} from "./controls/MonthViewLayout";

interface RivendellCalendarProps {
    caption?: string | boolean;
    className?: string;
    language?: LanguageEnum;
    monthView?: number;
    monthViewLayout?: MonthLayoutEnum;
    startDay?: number;
    yearView?: boolean;
    date?: Date;
    startDate?: Date;
    calendarRules?: RivendellRulesEnum;
    calendar?: RivendellCalendarYear;
}

interface RivendellDateProps {
    date: RivendellDate;
    today: Date;
    language: LanguageEnum;
}

interface RivendellYearProps {
    dates: RivendellDate[];
    today: Date;
    language: LanguageEnum;
}

interface RivendellMonthProps extends RivendellYearProps {
    monthView: number;
}

const RivendellDateCell = ({ date, today, language }: RivendellDateProps) => {
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

const RivendellMonth = ({
    monthView,
    dates,
    today,
    language,
}: RivendellMonthProps) => {
    const weeks: React.JSX.Element[] = [];
    let week: React.JSX.Element[] = [];

    let i = 0,
        date = dates[i],
        endere = 1;

    for (; i < dates.length && date.month < monthView; i++, date = dates[i]) {
        // seek ahead to current month view
    }

    addMonthFiller(week, date.weekDay);

    for (; i < dates.length && monthView === date.month; i++, date = dates[i]) {
        week.push(
            <RivendellDateCell
                key={dateKey(date, date.day === "Enderë" ? endere++ : "")}
                date={date}
                today={today}
                language={language}
            />
        );

        if (date.weekDay === 5) {
            weeks.push(<tr key={weeks.length}>{week}</tr>);
            week = [];
        }
    }

    if (monthView === 2) {
        date = dates[i];
        for (; date.day === "Enderë"; i++, date = dates[i]) {
            week.push(
                <RivendellDateCell
                    key={dateKey(date, endere++)}
                    date={date}
                    today={today}
                    language={language}
                />
            );

            if (date.weekDay === 5) {
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

const RivendellMonthVertical = ({
    monthView,
    dates,
    today,
    language,
}: RivendellMonthProps) => {
    const weeks = RivendellWeekdays.map(function (weekday) {
        const weekdayName = weekday[language];
        return [
            <WeekDayHeaderCell
                key={weekdayName}
                emoji={weekday.emoji}
                name={weekdayName}
                description={weekday.description}
                colSpan={2}
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
            <RivendellDateCell
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
                <RivendellDateCell
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

const RivendellYear = ({ dates, today, language }: RivendellYearProps) => {
    const weeks: React.JSX.Element[] = [];
    let week: React.JSX.Element[] = [],
        endere = 1;

    addMonthFiller(week, dates[0].weekDay);

    for (let i = 0, date = dates[i]; i < dates.length; i++, date = dates[i]) {
        week.push(
            <RivendellDateCell
                key={dateKey(date, date.day === "Enderë" ? endere++ : "")}
                date={date}
                today={today}
                language={language}
            />
        );

        if (date.weekDay === 5) {
            weeks.push(<tr key={weeks.length}>{week}</tr>);
            week = [];
        }
    }

    if (week.length > 0) {
        weeks.push(<tr key={weeks.length}>{week}</tr>);
    }

    return weeks;
};

const RivendellCalendar = (props: RivendellCalendarProps) => {
    const {
        caption,
        className,
        language = LanguageEnum.QUENYA,
        monthViewLayout = MonthLayoutEnum.HORIZONTAL,
        startDay = 22,
        yearView = false,
    } = props;

    const nextDate = props.date || new Date();
    const [today, setToday] = React.useState(nextDate);

    const nextStartDate = props.startDate || fullYearDate(1, 2, startDay);
    const [startDate, setStartDate] = React.useState(nextStartDate);

    const nextRules = props.calendarRules || RivendellRulesEnum.TRADITIONAL;
    const [calendarRules, setCalendarRules] = React.useState(nextRules);

    const [calendar, setCalendar] = React.useState(
        () =>
            props.calendar
            || makeRivendellCalendarDates(today, startDate, calendarRules)
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
                || makeRivendellCalendarDates(
                    nextDate,
                    nextStartDate,
                    nextRules
                )
        );
    }

    const { dates, todayRivendell } = calendar;

    const monthView =
        props.monthView === undefined
            ? todayRivendell?.month || 0
            : props.monthView;

    return (
        <table className={className}>
            {caption && (
                <caption className="rivendell-caption">
                    {caption === true ? "Rivendell Reckoning" : caption}
                </caption>
            )}
            <thead>
                {monthViewLayout === MonthLayoutEnum.VERTICAL && !yearView ? (
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
                ) : monthViewLayout === MonthLayoutEnum.VERTICAL ? (
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

RivendellCalendar.LANGUAGE_ENGLISH = LanguageEnum.ENGLISH;
RivendellCalendar.LANGUAGE_QUENYA = LanguageEnum.QUENYA;
RivendellCalendar.LANGUAGE_SINDARIN = LanguageEnum.SINDARIN;

RivendellCalendar.MONTH_VIEW_VERTICAL = MonthLayoutEnum.VERTICAL;
RivendellCalendar.MONTH_VIEW_HORIZONTAL = MonthLayoutEnum.HORIZONTAL;

export default RivendellCalendar;
