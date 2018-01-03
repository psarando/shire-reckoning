/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { MenuItem } from "@mui/material";

import { MonthLayoutEnum } from "../../ui/controls/MonthViewLayout";
import { OutlinedSelect } from "../Common";

import "../../ui/tolkien-calendars.css";

interface MonthViewLayoutProps {
    layout: MonthLayoutEnum;
    onMonthViewLayoutChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const MonthViewLayout = ({
    layout,
    onMonthViewLayoutChange,
}: MonthViewLayoutProps) => {
    return (
        <OutlinedSelect
            className="month-layout-select"
            label="Month View"
            style={{
                width: "8rem",
                margin: "0.25rem 0",
            }}
            SelectProps={{
                SelectDisplayProps: {
                    style: {
                        fontSize: "0.75rem",
                        fontWeight: "normal",
                    },
                },
            }}
            value={layout}
            onChange={onMonthViewLayoutChange}
        >
            <MenuItem value={MonthLayoutEnum.VERTICAL}>Vertical</MenuItem>
            <MenuItem value={MonthLayoutEnum.HORIZONTAL}>Horizontal</MenuItem>
        </OutlinedSelect>
    );
};

export default MonthViewLayout;
