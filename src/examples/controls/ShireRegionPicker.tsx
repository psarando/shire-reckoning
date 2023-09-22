/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { ShireRegionEnum } from "../../ShireReckoning";

interface ShireRegionPickerProps {
    region: string;
    onRegionChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const ShireRegionPicker = (props: ShireRegionPickerProps) => (
    <select
        className="shire-region-select"
        value={props.region}
        onChange={props.onRegionChange}
    >
        <option value={ShireRegionEnum.TOLKIEN}>Tolkien Names</option>
        <option value={ShireRegionEnum.SHIRE}>Shire Names</option>
        <option value={ShireRegionEnum.BREE}>Bree Names</option>
    </select>
);

export default ShireRegionPicker;
