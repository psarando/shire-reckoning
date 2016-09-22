import React from 'react';
import ReactDOM from 'react-dom';

import TolkienCalendarsExample from './examples/TolkienCalendars';
import ShireCalendar from './ui/ShireCalendar';
import ShireCalendarExample from './examples/ShireCalendars';
import RivendellCalendar from './ui/RivendellCalendar';
import RivendellCalendarExample from './examples/RivendellCalendars';
import NumenorCalendar from './ui/NumenorCalendar';
import NumenorCalendarExample from './examples/NumenorCalendars';

const renderTolkienCalendarsExample = (elementID) => {
    ReactDOM.render(
        <TolkienCalendarsExample />,
        document.getElementById(elementID)
    );
};

const renderShireCalendar = (elementID, className) => {
    ReactDOM.render(
        <ShireCalendar className={className} />,
        document.getElementById(elementID)
    );
};

const renderShireCalendarExample = (elementID) => {
    ReactDOM.render(
        <ShireCalendarExample />,
        document.getElementById(elementID)
    );
};

const renderRivendellCalendar = (elementID, className) => {
    ReactDOM.render(
        <RivendellCalendar className={className} />,
        document.getElementById(elementID)
    );
};

const renderRivendellCalendarExample = (elementID) => {
    ReactDOM.render(
        <RivendellCalendarExample />,
        document.getElementById(elementID)
    );
};

const renderNumenorCalendar = (elementID, className) => {
    ReactDOM.render(
        <NumenorCalendar className={className} />,
        document.getElementById(elementID)
    );
};

const renderNumenorCalendarExample = (elementID) => {
    ReactDOM.render(
        <NumenorCalendarExample />,
        document.getElementById(elementID)
    );
};

export {
    renderTolkienCalendarsExample,
    renderShireCalendar,
    renderShireCalendarExample,
    renderRivendellCalendar,
    renderRivendellCalendarExample,
    renderNumenorCalendar,
    renderNumenorCalendarExample
};
