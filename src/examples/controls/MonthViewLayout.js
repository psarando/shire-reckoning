/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import MenuItem from "@material-ui/core/MenuItem";

import { VERTICAL, HORIZONTAL } from "../../ui/controls/MonthViewLayout";
import { OutlinedSelect } from "../Common";

import "../../ui/tolkien-calendars.css";

class MonthViewLayout extends Component {
    static get VERTICAL() {
        return VERTICAL;
    }

    static get HORIZONTAL() {
        return HORIZONTAL;
    }

    render() {
        return (
            <OutlinedSelect
                className="month-layout-select"
                label="Month View"
                style={{
                    width: "8rem",
                    fontSize: "0.75rem",
                    fontWeight: "normal",
                }}
                value={this.props.layout}
                onChange={this.props.onMonthViewLayoutChange}
            >
                <MenuItem value={VERTICAL}>Vertical</MenuItem>
                <MenuItem value={HORIZONTAL}>Horizontal</MenuItem>
            </OutlinedSelect>
        );
    }
}

export default MonthViewLayout;
