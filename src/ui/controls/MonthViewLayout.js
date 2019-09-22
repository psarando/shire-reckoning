/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import "../tolkien-calendars.css";

const VerticalLayoutFiller = props => {
    const weekdays = props.weekdays.map(function(weekday, i) {
        return <td key={i} className="vertical-layout-filler" />;
    });

    return <tr className="vertical-layout-filler">{weekdays}</tr>;
};

const VERTICAL = "vertical";
const HORIZONTAL = "horizontal";

export { VerticalLayoutFiller, VERTICAL, HORIZONTAL };
