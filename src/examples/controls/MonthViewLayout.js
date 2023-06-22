/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { VERTICAL, HORIZONTAL } from "../../ui/controls/MonthViewLayout";

import "../../ui/tolkien-calendars.css";

const MonthViewLayout = ({ layout, onMonthViewLayoutChange }) => {
    return (
        <div>
            Month View:
            <br />
            <select
                className="month-layout-select"
                value={layout}
                onChange={onMonthViewLayoutChange}
            >
                <option value={VERTICAL}>Vertical</option>
                <option value={HORIZONTAL}>Horizontal</option>
            </select>
        </div>
    );
};

MonthViewLayout.VERTICAL = VERTICAL;
MonthViewLayout.HORIZONTAL = HORIZONTAL;

export default MonthViewLayout;
