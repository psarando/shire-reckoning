import React from 'react';
import ReactDOM from 'react-dom';

import { makeShireCalendarDates } from './ShireReckoning';
import { makeRivendellCalendarDates, TRADITIONAL_RULES, REFORMED_RULES} from './RivendellReckoning';
import { makeNumenorCalendarDates, RECKONING_KINGS, RECKONING_STEWARDS, RECKONING_NEW } from './NumenorReckoning';
import { datesMatch, getNextDate } from './Utils';

import TolkienCalendarsExample from './examples/TolkienCalendars';
import ShireCalendarExample from './examples/ShireCalendars';
import RivendellCalendarExample from './examples/RivendellCalendars';
import NumenorCalendarExample from './examples/NumenorCalendars';

it('renders TolkienCalendarsExample without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TolkienCalendarsExample />, div);
});

it('renders ShireCalendarExample without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShireCalendarExample />, div);
});

it('renders RivendellCalendarExample without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RivendellCalendarExample />, div);
});

it('renders NumenorCalendarExample without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NumenorCalendarExample />, div);
});

function getFirstDay(calendar) {
    return calendar.dates[0].gregorian;
}

function getLastDay(calendar) {
    return calendar.dates[calendar.dates.length - 1].gregorian;
}

it('makes correct Shire Calendar Dates', () => {
    let nextDate = new Date(-3000, 11, 21);
    let calendar = makeShireCalendarDates(nextDate, 21);
    let lastDay = getLastDay(calendar);
    nextDate = getNextDate(lastDay);

    for (let i = -2999; i <= 3000; i++, nextDate = getNextDate(lastDay)) {
        calendar = makeShireCalendarDates(nextDate, 21);
        expect(datesMatch(getNextDate(lastDay), getFirstDay(calendar))).toBeTruthy();
        lastDay = getLastDay(calendar);
    }
});

it('makes correct Rivendell Calendar Dates', () => {
    let nextDate = new Date(-10800, 2, 22);
    let calendar = makeRivendellCalendarDates(nextDate, 22, TRADITIONAL_RULES);
    let lastDay = getLastDay(calendar);
    nextDate = getNextDate(lastDay);

    for (let i = -10799; i <= 10800; i++, nextDate = getNextDate(lastDay)) {
        calendar = makeRivendellCalendarDates(nextDate, 22, TRADITIONAL_RULES);
        expect(datesMatch(getNextDate(lastDay), getFirstDay(calendar))).toBeTruthy();
        lastDay = getLastDay(calendar);
    }
});

it('makes correct Reformed Rivendell Calendar Dates', () => {
    let nextDate = new Date(-3000, 2, 25);
    let calendar = makeRivendellCalendarDates(nextDate, 25, REFORMED_RULES);
    let lastDay = getLastDay(calendar);
    nextDate = getNextDate(lastDay);

    for (let i = -2999; i <= 3000; i++, nextDate = getNextDate(lastDay)) {
        calendar = makeRivendellCalendarDates(nextDate, 25, REFORMED_RULES);
        expect(datesMatch(getNextDate(lastDay), getFirstDay(calendar))).toBeTruthy();
        lastDay = getLastDay(calendar);
    }
});

it('makes correct Kings Calendar Dates', () => {
    let nextDate = new Date(-3000, 11, 21);
    let calendar = makeNumenorCalendarDates(nextDate, 21, RECKONING_KINGS);
    let lastDay = getLastDay(calendar);
    nextDate = getNextDate(lastDay);

    for (let i = -2999; i <= 3000; i++, nextDate = getNextDate(lastDay)) {
        calendar = makeNumenorCalendarDates(nextDate, 21, RECKONING_KINGS);
        expect(datesMatch(getNextDate(lastDay), getFirstDay(calendar))).toBeTruthy();
        lastDay = getLastDay(calendar);
    }
});

it('makes correct Stewards Calendar Dates', () => {
    let nextDate = new Date(-3000, 11, 21);
    let calendar = makeNumenorCalendarDates(nextDate, 21, RECKONING_STEWARDS);
    let lastDay = getLastDay(calendar);
    nextDate = getNextDate(lastDay);

    for (let i = -2999; i <= 3000; i++, nextDate = getNextDate(lastDay)) {
        calendar = makeNumenorCalendarDates(nextDate, 21, RECKONING_STEWARDS);
        expect(datesMatch(getNextDate(lastDay), getFirstDay(calendar))).toBeTruthy();
        lastDay = getLastDay(calendar);
    }
});

it('makes correct New Reckoning Calendar Dates', () => {
    let nextDate = new Date(-3000, 2, 15);
    let calendar = makeNumenorCalendarDates(nextDate, 21, RECKONING_NEW);
    let lastDay = getLastDay(calendar);
    nextDate = getNextDate(lastDay);

    for (let i = -2999; i <= 3000; i++, nextDate = getNextDate(lastDay)) {
        calendar = makeNumenorCalendarDates(nextDate, 21, RECKONING_NEW);
        expect(datesMatch(getNextDate(lastDay), getFirstDay(calendar))).toBeTruthy();
        lastDay = getLastDay(calendar);
    }
});
