/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from 'react';
import ReactDOM from 'react-dom';

import TolkienCalendarsExample from '../examples/TolkienCalendars';
import ShireCalendarExample from '../examples/ShireCalendars';
import RivendellCalendarExample from '../examples/RivendellCalendars';
import GondorCalendarExample from '../examples/GondorCalendars';

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

it('renders GondorCalendarExample without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GondorCalendarExample />, div);
});
