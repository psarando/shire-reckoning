/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 *
 * @jest-environment jsdom
 */
import React from "react";
import { createRoot } from "react-dom/client";

import {
    StyledTolkienCalendars,
    TolkienCalendarsExample,
} from "../examples/TolkienCalendars";
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
    const root = createRoot(div);
    root.render(<TolkienCalendarsExample />);
    root.unmount();
});

it("renders StyledTolkienCalendars without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<StyledTolkienCalendars />);
    root.unmount();
});

it("renders SimulatedTolkienCalendars without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<SimulatedTolkienCalendars />);
    root.unmount();
});

it("renders ICalendarGenerator without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<ICalendarGenerator />);
    root.unmount();
});

it("renders ShireCalendarMonthViewVerticalExample without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<ShireCalendarMonthViewVerticalExample />);
    root.unmount();
});

it("renders ShireCalendarMonthViewHorizontalExample without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<ShireCalendarMonthViewHorizontalExample />);
    root.unmount();
});

it("renders ShireCalendarYearViewExample without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<ShireCalendarYearViewExample />);
    root.unmount();
});

it("renders ShireCalendarNewYearsDaySyncExample without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<ShireCalendarNewYearsDaySyncExample />);
    root.unmount();
});

it("renders ShireCalendarTraditionalRulesExample without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<ShireCalendarTraditionalRulesExample />);
    root.unmount();
});

it("renders GondorCalendarMonthViewExample without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<GondorCalendarMonthViewExample />);
    root.unmount();
});

it("renders GondorCalendarMonthViewHorizontalExample without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<GondorCalendarMonthViewHorizontalExample />);
    root.unmount();
});

it("renders GondorCalendarYearViewExample without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<GondorCalendarYearViewExample />);
    root.unmount();
});

it("renders GondorCalendarNewYearsDaySyncExample without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<GondorCalendarNewYearsDaySyncExample />);
    root.unmount();
});

it("renders GondorCalendarTraditionalRulesExample without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<GondorCalendarTraditionalRulesExample />);
    root.unmount();
});

it("renders RivendellCalendarSeasonViewExample without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<RivendellCalendarSeasonViewExample />);
    root.unmount();
});

it("renders RivendellCalendarYearViewExample without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<RivendellCalendarYearViewExample />);
    root.unmount();
});

it("renders RivendellCalendarHistoricExample without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<RivendellCalendarHistoricExample />);
    root.unmount();
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

                const root = createRoot(div);
                root.render(
                    <ShireCalendar
                        region={region}
                        monthViewLayout={ShireCalendar.MONTH_VIEW_HORIZONTAL}
                        date={currentDate}
                        className="shire-calendar"
                    />
                );
                root.unmount();
            }
        }
    });
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

                const root = createRoot(div);
                root.render(
                    <ShireCalendar
                        region={region}
                        monthViewLayout={ShireCalendar.MONTH_VIEW_VERTICAL}
                        date={currentDate}
                        className="shire-calendar"
                    />
                );
                root.unmount();
            }
        }
    });
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

                    const root = createRoot(div);
                    root.render(
                        <GondorCalendar
                            reckoning={reckoning}
                            language={language}
                            monthViewLayout={
                                GondorCalendar.MONTH_VIEW_HORIZONTAL
                            }
                            date={currentDate}
                            className="shire-calendar"
                        />
                    );
                    root.unmount();
                }
            }
        });
    });
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

                    const root = createRoot(div);
                    root.render(
                        <GondorCalendar
                            reckoning={reckoning}
                            language={language}
                            monthViewLayout={GondorCalendar.MONTH_VIEW_VERTICAL}
                            date={currentDate}
                            className="shire-calendar"
                        />
                    );
                    root.unmount();
                }
            }
        });
    });
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

                    const root = createRoot(div);
                    root.render(
                        <RivendellCalendar
                            calendarRules={calendarRules}
                            language={language}
                            monthViewLayout={
                                RivendellCalendar.MONTH_VIEW_HORIZONTAL
                            }
                            date={currentDate}
                            className="shire-calendar"
                        />
                    );
                    root.unmount();
                }
            }
        });
    });
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

                    const root = createRoot(div);
                    root.render(
                        <RivendellCalendar
                            calendarRules={calendarRules}
                            language={language}
                            monthViewLayout={
                                RivendellCalendar.MONTH_VIEW_VERTICAL
                            }
                            date={currentDate}
                            className="shire-calendar"
                        />
                    );
                    root.unmount();
                }
            }
        });
    });
});
