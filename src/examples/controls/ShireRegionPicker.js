/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from 'react';

import {
    REGION_NAMES_TOLKIEN,
    REGION_NAMES_SHIRE,
    REGION_NAMES_BREE
} from '../../ShireReckoning';

const ShireRegionPicker = (props) =>
    (
        <select className="shire-region-select"
                value={props.region}
                onChange={props.onRegionChange} >
            <option value={REGION_NAMES_TOLKIEN}>Tolkien Names</option>
            <option value={REGION_NAMES_SHIRE}>Shire Names</option>
            <option value={REGION_NAMES_BREE}>Bree Names</option>
        </select>
    );

export default ShireRegionPicker;
