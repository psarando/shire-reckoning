/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import MenuItem from "@material-ui/core/MenuItem";

import {
    REGION_NAMES_TOLKIEN,
    REGION_NAMES_SHIRE,
    REGION_NAMES_BREE,
} from "../../ShireReckoning";

import { OutlinedSelect } from "../Common";

const ShireRegionPicker = props => (
    <OutlinedSelect
        className="shire-region-select"
        label={props.label}
        style={{ width: "9.75rem", fontSize: "0.75rem" }}
        value={props.region}
        onChange={props.onRegionChange}
    >
        <MenuItem value={REGION_NAMES_TOLKIEN}>Tolkien Names</MenuItem>
        <MenuItem value={REGION_NAMES_SHIRE}>Shire Names</MenuItem>
        <MenuItem value={REGION_NAMES_BREE}>Bree Names</MenuItem>
    </OutlinedSelect>
);

export default ShireRegionPicker;
