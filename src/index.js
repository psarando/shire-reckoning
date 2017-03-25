import React from 'react';
import ReactDOM from 'react-dom';

import TolkienCalendarsExample from './examples/TolkienCalendars';
import SimulatedTolkienCalendars from './examples/simulation/TolkienCalendars';
import ShireCalendar from './ui/ShireCalendar';
import ShireCalendarExample from './examples/ShireCalendars';
import RivendellCalendar from './ui/RivendellCalendar';
import RivendellCalendarExample from './examples/RivendellCalendars';
import GondorCalendar from './ui/GondorCalendar';
import GondorCalendarExample from './examples/GondorCalendars';

const renderTolkienCalendarsExample = (elementID) => {
    ReactDOM.render(
        <TolkienCalendarsExample />,
        document.getElementById(elementID)
    );
};

const renderSimulatedTolkienCalendars = (elementID) => {
    ReactDOM.render(
        <SimulatedTolkienCalendars />,
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

const renderGondorCalendar = (elementID, className) => {
    ReactDOM.render(
        <GondorCalendar className={className} />,
        document.getElementById(elementID)
    );
};

const renderGondorCalendarExample = (elementID) => {
    ReactDOM.render(
        <GondorCalendarExample />,
        document.getElementById(elementID)
    );
};

export {
    renderTolkienCalendarsExample,
    renderSimulatedTolkienCalendars,
    renderShireCalendar,
    renderShireCalendarExample,
    renderRivendellCalendar,
    renderRivendellCalendarExample,
    renderGondorCalendar,
    renderGondorCalendarExample
};
