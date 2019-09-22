import React from "react";
import ReactDOM from "react-dom";

window.React = React;
window.ReactDOM = ReactDOM;

export {
    default as TolkienCalendarsExample,
} from "./examples/TolkienCalendars";
export {
    default as SimulatedTolkienCalendars,
} from "./examples/simulation/TolkienCalendars";

export { default as ShireCalendarExample } from "./examples/ShireCalendars";
export { default as RivendellCalendarExample } from "./examples/RivendellCalendars"; // prettier-ignore
export { default as GondorCalendarExample } from "./examples/GondorCalendars";

export { default as ICalendarGenerator } from "./examples/ICalendarGenerator";

export * from "./lib";
