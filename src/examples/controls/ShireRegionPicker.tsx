/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { MenuItem } from "@mui/material";

import { ShireRegionEnum } from "../../ShireReckoning";

import { OutlinedSelect } from "../Common";

interface ShireRegionPickerProps {
    label?: string;
    region: string;
    onRegionChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const ShireRegionPicker = (props: ShireRegionPickerProps) => (
    <OutlinedSelect
        className="shire-region-select"
        label={props.label}
        style={{ width: "9.75rem", margin: "0.25rem 0" }}
        SelectProps={{ SelectDisplayProps: { style: { fontSize: "0.75rem" } } }}
        value={props.region}
        onChange={props.onRegionChange}
    >
        <MenuItem value={ShireRegionEnum.TOLKIEN}>Tolkien Names</MenuItem>
        <MenuItem value={ShireRegionEnum.SHIRE}>Shire Names</MenuItem>
        <MenuItem value={ShireRegionEnum.BREE}>Bree Names</MenuItem>
    </OutlinedSelect>
);

export default ShireRegionPicker;
