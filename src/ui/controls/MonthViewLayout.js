/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';
import '../tolkien-calendars.css';

class VerticalLayoutFiller extends Component {
    render() {
        let weekdays = this.props.weekdays.map(function (weekday, i) {
            return (
                <td key={i} className="vertical-layout-filler" />
            );
        });

        return (<tr className="vertical-layout-filler">{weekdays}</tr>);
    }
}

const VERTICAL = "vertical";
const HORIZONTAL = "horizontal";

class MonthViewLayout extends Component {
    static get VERTICAL() {
        return VERTICAL;
    }

    static get HORIZONTAL() {
        return HORIZONTAL;
    }

    render() {
        return (
            <div>
                Month View:
                <br />
                <select className="month-layout-select"
                        value={this.props.layout}
                        onChange={this.props.onMonthViewLayoutChange} >
                    <option value={VERTICAL}>Vertical</option>
                    <option value={HORIZONTAL}>Horizontal</option>
                </select>
            </div>
        );
    }
}

export { VerticalLayoutFiller };
export default MonthViewLayout;
