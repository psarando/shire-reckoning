/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import {
    GondorCalendarYear,
    GondorMonths,
    GondorLeapYearRuleEnum,
    GondorReckoningEnum,
    makeGondorCalendarDates,
} from "../../GondorReckoning";

import {
    daysElapsedToSecondAgeYear,
    daysElapsedToNewReckoningYear,
    toDaysElapsed,
    datesMatch,
    getFirstDay,
    getLastDay,
} from "../../Utils";

import GondorCalendar from "../../ui/GondorCalendar";
import { LanguageEnum } from "../../ui/controls/LanguagePicker";
import { MonthLayoutEnum } from "../../ui/controls/MonthViewLayout";
import "../../ui/tolkien-calendars.css";

import LanguagePicker from "../controls/LanguagePicker";
import MonthViewLayout from "../controls/MonthViewLayout";
import MonthViewPicker from "../controls/MonthViewPicker";

import StartReckoningDatePicker from "./StartReckoningDatePicker";

const getNewStyleYear = (startDate: Date, today: Date) =>
    daysElapsedToNewReckoningYear(
        daysElapsedToSecondAgeYear,
        toDaysElapsed(startDate, today)
    ).year - 3441;

const gondorReckoningForYear = (
    calendar: GondorCalendarYear,
    startDate: Date,
    today: Date
) => {
    let year = calendar.year;

    let gondorReckoning = GondorReckoningEnum.KINGS;
    if (year > 3441) {
        year -= 3441;

        if (year > 2059) {
            gondorReckoning = GondorReckoningEnum.STEWARDS;

            // For year 3019, New Reckoning doesn't start until 3/25 old style.
            if (year > 3019 || getNewStyleYear(startDate, today) >= 3019) {
                gondorReckoning = GondorReckoningEnum.NEW;
            }
        }
    }

    return gondorReckoning;
};

interface GondorCalendarSimulatedProps {
    date: Date;
    startDate: Date;
    onCalendarStartChange: (startDate: Date) => void;
}

const GondorCalendarSimulated = (props: GondorCalendarSimulatedProps) => {
    const {
        date: nextDate,
        startDate: nextStartDate,
        onCalendarStartChange,
    } = props;

    const [language, setLanguage] = React.useState(LanguageEnum.QUENYA);
    const [yearView, setYearView] = React.useState(false);
    const [monthViewLayout, setMonthViewLayout] = React.useState(
        MonthLayoutEnum.VERTICAL
    );
    const [today, setToday] = React.useState(nextDate);
    const [startDate, setStartDate] = React.useState(nextStartDate);
    const [reckoning, setReckoning] = React.useState(
        GondorCalendar.RECKONING_STEWARDS
    );

    const [calendar, setCalendar] = React.useState(() =>
        makeGondorCalendarDates(
            today,
            startDate,
            reckoning,
            GondorLeapYearRuleEnum.TRADITIONAL
        )
    );

    const viewDate = calendar.todayGondor.gregorian;
    const thisMonth = calendar.todayGondor.month;
    const [monthView, setMonthView] = React.useState(thisMonth);

    const updateCalendarState = (
        today: Date,
        startDate: Date,
        reckoning: GondorReckoningEnum
    ) => {
        const nextCalendar = makeGondorCalendarDates(
            today,
            startDate,
            reckoning,
            GondorLeapYearRuleEnum.TRADITIONAL
        );
        setCalendar(nextCalendar);
        setMonthView(nextCalendar.todayGondor.month);

        return nextCalendar;
    };

    let gondorReckoning = gondorReckoningForYear(calendar, startDate, viewDate);

    // Check object equality so views are updated anytime `Today` is clicked.
    const updateToday = today !== nextDate;
    if (updateToday) {
        setToday(nextDate);
    }

    const updateStartDate = !datesMatch(startDate, nextStartDate);
    if (updateStartDate) {
        setStartDate(nextStartDate);
    }

    if (updateToday || updateStartDate) {
        const nextCalendar = updateCalendarState(
            nextDate,
            nextStartDate,
            reckoning
        );
        gondorReckoning = gondorReckoningForYear(
            nextCalendar,
            nextStartDate,
            nextDate
        );
    }

    const updateReckoning = reckoning !== gondorReckoning;
    if (updateReckoning) {
        setReckoning(gondorReckoning);
        updateCalendarState(nextDate, nextStartDate, gondorReckoning);
    }

    const onMonthViewChange = (
        nextViewDate: Date,
        monthView: number,
        yearView: boolean
    ) => {
        setMonthView(monthView);
        setYearView(yearView);

        if (!datesMatch(viewDate, nextViewDate)) {
            const nextCalendar = updateCalendarState(
                nextViewDate,
                startDate,
                reckoning
            );

            gondorReckoning = gondorReckoningForYear(
                nextCalendar,
                startDate,
                nextViewDate
            );
            if (reckoning !== gondorReckoning) {
                setReckoning(gondorReckoning);
                updateCalendarState(nextViewDate, startDate, gondorReckoning);
            }
        }
    };

    const onMonthViewLayoutChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setMonthViewLayout(event.target.value as MonthLayoutEnum);
    };

    const onLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as LanguageEnum);
    };

    let year = calendar.year;
    let age = "II";
    let reckoningDisplay = "Kings'";
    if (year > 3441) {
        year -= 3441;
        age = "III";

        if (year > 2059) {
            reckoningDisplay = "Stewards'";

            if (year > 3019 || reckoning === GondorReckoningEnum.NEW) {
                reckoningDisplay = "New";

                if (year > 3020) {
                    year -= 3020;
                    age = "IV";
                }
            }
        }
    }

    const caption = `${reckoningDisplay} Reckoning ${age} ${year}`;

    const startMonth = reckoning === GondorReckoningEnum.NEW ? 3 : 0;
    const months = [];
    for (let i = startMonth; i < GondorMonths.length + startMonth; i++) {
        const gondorMonth = GondorMonths[i % 12];
        months.push({
            emoji: gondorMonth.emoji,
            name: gondorMonth[language],
        });
    }

    const firstDay = getFirstDay(calendar);
    const lastDay = getLastDay(calendar);

    return (
        <table className="shire-calendar gondor-calendar">
            <caption className="shire-caption">{caption}</caption>
            <thead>
                <tr>
                    <th className="gondor-calendar-controls">
                        <StartReckoningDatePicker
                            startDate={startDate}
                            onCalendarStartChange={onCalendarStartChange}
                        />
                    </th>
                    <th className="gondor-calendar-controls month-picker-container">
                        <MonthViewPicker
                            months={months}
                            firstDay={firstDay}
                            lastDay={lastDay}
                            thisMonth={thisMonth}
                            today={today}
                            viewDate={viewDate}
                            monthView={monthView}
                            yearView={yearView}
                            onMonthViewChange={onMonthViewChange}
                        />
                    </th>
                    <th className="gondor-calendar-controls">
                        <LanguagePicker
                            language={language}
                            onLanguageChange={onLanguageChange}
                        />
                    </th>
                    <th className="gondor-calendar-controls">
                        <MonthViewLayout
                            layout={monthViewLayout}
                            onMonthViewLayoutChange={onMonthViewLayoutChange}
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={4} className="shire-calendar-wrapper-cell">
                        <GondorCalendar
                            className="shire-calendar gondor-calendar"
                            calendar={calendar}
                            date={today}
                            reckoning={reckoning}
                            language={language}
                            monthViewLayout={monthViewLayout}
                            monthView={monthView}
                            yearView={yearView}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default GondorCalendarSimulated;
