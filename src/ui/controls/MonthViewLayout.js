/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";
import "../tolkien-calendars.css";

class VerticalLayoutFiller extends Component {
    render() {
        let weekdays = this.props.weekdays.map(function(weekday, i) {
            return <td key={i} className="vertical-layout-filler" />;
        });

        return <tr className="vertical-layout-filler">{weekdays}</tr>;
    }
}

const VERTICAL = "vertical";
const HORIZONTAL = "horizontal";

export { VerticalLayoutFiller, VERTICAL, HORIZONTAL };
