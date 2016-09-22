import React from 'react';
import ReactDOM from 'react-dom';

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
