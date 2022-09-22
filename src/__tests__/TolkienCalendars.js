/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 *
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from "react-dom";

import { TolkienCalendarsExample } from "../examples/TolkienCalendars";
import { SimulatedTolkienCalendars } from "../examples/simulation/TolkienCalendars";
import { ICalendarGenerator } from "../examples/ICalendarGenerator";

import { ShireCalendarMonthViewVerticalExample } from "../examples/shire/month-view/side-by-side";
import { ShireCalendarMonthViewHorizontalExample } from "../examples/shire/month-view-horizontal/side-by-side";
import { ShireCalendarYearViewExample } from "../examples/shire/year-view/side-by-side";
import { ShireCalendarNewYearsDaySyncExample } from "../examples/shire/new-years-day-sync/side-by-side";
import { ShireCalendarTraditionalRulesExample } from "../examples/shire/traditional-rules/side-by-side";

import { GondorCalendarMonthViewExample } from "../examples/gondor/month-view/side-by-side";
import { GondorCalendarMonthViewHorizontalExample } from "../examples/gondor/month-view-horizontal/side-by-side";
import { GondorCalendarYearViewExample } from "../examples/gondor/year-view/side-by-side";
import { GondorCalendarNewYearsDaySyncExample } from "../examples/gondor/new-years-day-sync/side-by-side";
import { GondorCalendarTraditionalRulesExample } from "../examples/gondor/traditional-rules/side-by-side";

import { RivendellCalendarSeasonViewExample } from "../examples/rivendell/season-view/side-by-side";
import { RivendellCalendarYearViewExample } from "../examples/rivendell/year-view/side-by-side";
import { RivendellCalendarHistoricExample } from "../examples/rivendell/historic/side-by-side";

import { fullYearDate } from "../Utils";
import ShireCalendar from "../ui/ShireCalendar";
import GondorCalendar from "../ui/GondorCalendar";
import RivendellCalendar from "../ui/RivendellCalendar";

it("renders TolkienCalendarsExample without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TolkienCalendarsExample />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders SimulatedTolkienCalendars without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SimulatedTolkienCalendars />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders ICalendarGenerator without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ICalendarGenerator />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders ShireCalendarMonthViewVerticalExample without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ShireCalendarMonthViewVerticalExample />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders ShireCalendarMonthViewHorizontalExample without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ShireCalendarMonthViewHorizontalExample />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders ShireCalendarYearViewExample without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ShireCalendarYearViewExample />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders ShireCalendarNewYearsDaySyncExample without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ShireCalendarNewYearsDaySyncExample />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders ShireCalendarTraditionalRulesExample without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ShireCalendarTraditionalRulesExample />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders GondorCalendarMonthViewExample without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<GondorCalendarMonthViewExample />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders GondorCalendarMonthViewHorizontalExample without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<GondorCalendarMonthViewHorizontalExample />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders GondorCalendarYearViewExample without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<GondorCalendarYearViewExample />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders GondorCalendarNewYearsDaySyncExample without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<GondorCalendarNewYearsDaySyncExample />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders GondorCalendarTraditionalRulesExample without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<GondorCalendarTraditionalRulesExample />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders RivendellCalendarSeasonViewExample without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<RivendellCalendarSeasonViewExample />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders RivendellCalendarYearViewExample without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<RivendellCalendarYearViewExample />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders RivendellCalendarHistoricExample without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<RivendellCalendarHistoricExample />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders ShireCalendar MONTH_VIEW_HORIZONTAL without crashing", () => {
    const div = document.createElement("div");

    [
        ShireCalendar.REGION_NAMES_TOLKIEN,
        ShireCalendar.REGION_NAMES_SHIRE,
        ShireCalendar.REGION_NAMES_BREE,
    ].forEach((region) => {
        for (let year = 2016; year < 2021; year++) {
            for (let month = 0; month < 12; month++) {
                let currentDate = fullYearDate(year, month, 1);

                ReactDOM.render(
                    <ShireCalendar
                        region={region}
                        monthViewLayout={ShireCalendar.MONTH_VIEW_HORIZONTAL}
                        date={currentDate}
                        className="shire-calendar"
                    />,
                    div
                );
            }
        }
    });

    ReactDOM.unmountComponentAtNode(div);
});

it("renders ShireCalendar MONTH_VIEW_VERTICAL without crashing", () => {
    const div = document.createElement("div");

    [
        ShireCalendar.REGION_NAMES_TOLKIEN,
        ShireCalendar.REGION_NAMES_SHIRE,
        ShireCalendar.REGION_NAMES_BREE,
    ].forEach((region) => {
        for (let year = 2016; year < 2021; year++) {
            for (let month = 0; month < 12; month++) {
                let currentDate = fullYearDate(year, month, 1);

                ReactDOM.render(
                    <ShireCalendar
                        region={region}
                        monthViewLayout={ShireCalendar.MONTH_VIEW_VERTICAL}
                        date={currentDate}
                        className="shire-calendar"
                    />,
                    div
                );
            }
        }
    });

    ReactDOM.unmountComponentAtNode(div);
});

it("renders GondorCalendar MONTH_VIEW_HORIZONTAL without crashing", () => {
    const div = document.createElement("div");

    [
        GondorCalendar.RECKONING_KINGS,
        GondorCalendar.RECKONING_STEWARDS,
        GondorCalendar.RECKONING_NEW,
    ].forEach((reckoning) => {
        [
            GondorCalendar.LANGUAGE_ENGLISH,
            GondorCalendar.LANGUAGE_QUENYA,
            GondorCalendar.LANGUAGE_SINDARIN,
        ].forEach((language) => {
            for (let year = 2016; year < 2021; year++) {
                for (let month = 0; month < 12; month++) {
                    let currentDate = fullYearDate(year, month, 1);

                    ReactDOM.render(
                        <GondorCalendar
                            reckoning={reckoning}
                            language={language}
                            monthViewLayout={
                                GondorCalendar.MONTH_VIEW_HORIZONTAL
                            }
                            date={currentDate}
                            className="shire-calendar"
                        />,
                        div
                    );
                }
            }
        });
    });

    ReactDOM.unmountComponentAtNode(div);
});

it("renders GondorCalendar MONTH_VIEW_VERTICAL without crashing", () => {
    const div = document.createElement("div");

    [
        GondorCalendar.RECKONING_KINGS,
        GondorCalendar.RECKONING_STEWARDS,
        GondorCalendar.RECKONING_NEW,
    ].forEach((reckoning) => {
        [
            GondorCalendar.LANGUAGE_ENGLISH,
            GondorCalendar.LANGUAGE_QUENYA,
            GondorCalendar.LANGUAGE_SINDARIN,
        ].forEach((language) => {
            for (let year = 2016; year < 2021; year++) {
                for (let month = 0; month < 12; month++) {
                    let currentDate = fullYearDate(year, month, 1);

                    ReactDOM.render(
                        <GondorCalendar
                            reckoning={reckoning}
                            language={language}
                            monthViewLayout={GondorCalendar.MONTH_VIEW_VERTICAL}
                            date={currentDate}
                            className="shire-calendar"
                        />,
                        div
                    );
                }
            }
        });
    });

    ReactDOM.unmountComponentAtNode(div);
});

it("renders RivendellCalendar MONTH_VIEW_HORIZONTAL without crashing", () => {
    const div = document.createElement("div");

    [
        RivendellCalendar.TRADITIONAL_RULES,
        RivendellCalendar.REFORMED_RULES,
    ].forEach((calendarRules) => {
        [
            RivendellCalendar.LANGUAGE_ENGLISH,
            RivendellCalendar.LANGUAGE_QUENYA,
            RivendellCalendar.LANGUAGE_SINDARIN,
        ].forEach((language) => {
            for (let year = 2016; year < 2029; year++) {
                for (let month = 0; month < 12; month++) {
                    let currentDate = fullYearDate(year, month, 1);

                    ReactDOM.render(
                        <RivendellCalendar
                            calendarRules={calendarRules}
                            language={language}
                            monthViewLayout={
                                RivendellCalendar.MONTH_VIEW_HORIZONTAL
                            }
                            date={currentDate}
                            className="shire-calendar"
                        />,
                        div
                    );
                }
            }
        });
    });

    ReactDOM.unmountComponentAtNode(div);
});

it("renders RivendellCalendar MONTH_VIEW_VERTICAL without crashing", () => {
    const div = document.createElement("div");

    [
        RivendellCalendar.TRADITIONAL_RULES,
        RivendellCalendar.REFORMED_RULES,
    ].forEach((calendarRules) => {
        [
            RivendellCalendar.LANGUAGE_ENGLISH,
            RivendellCalendar.LANGUAGE_QUENYA,
            RivendellCalendar.LANGUAGE_SINDARIN,
        ].forEach((language) => {
            for (let year = 2016; year < 2029; year++) {
                for (let month = 0; month < 12; month++) {
                    let currentDate = fullYearDate(year, month, 1);

                    ReactDOM.render(
                        <RivendellCalendar
                            calendarRules={calendarRules}
                            language={language}
                            monthViewLayout={
                                RivendellCalendar.MONTH_VIEW_VERTICAL
                            }
                            date={currentDate}
                            className="shire-calendar"
                        />,
                        div
                    );
                }
            }
        });
    });

    ReactDOM.unmountComponentAtNode(div);
});
