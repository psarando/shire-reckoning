/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import {
    VERTICAL,
    HORIZONTAL
} from '../../ui/controls/MonthViewLayout';

import '../../ui/tolkien-calendars.css';

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

export default MonthViewLayout;
