/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { MonthLayoutEnum } from "../../ui/controls/MonthViewLayout";

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
                <option value={MonthLayoutEnum.VERTICAL}>Vertical</option>
                <option value={MonthLayoutEnum.HORIZONTAL}>Horizontal</option>
            </select>
        </div>
    );
};

MonthViewLayout.VERTICAL = MonthLayoutEnum.VERTICAL;
MonthViewLayout.HORIZONTAL = MonthLayoutEnum.HORIZONTAL;

export default MonthViewLayout;
