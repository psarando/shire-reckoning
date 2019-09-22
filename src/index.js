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

export * from "./lib";
