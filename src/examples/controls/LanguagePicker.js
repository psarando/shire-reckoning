/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { ENGLISH, QUENYA, SINDARIN } from "../../ui/controls/LanguagePicker";

const LanguagePicker = ({ language, onLanguageChange }) => {
    return (
        <div>
            Language:
            <br />
            <select
                className="language-select"
                value={language}
                onChange={onLanguageChange}
            >
                <option value={ENGLISH}>English</option>
                <option value={QUENYA}>Quenya</option>
                <option value={SINDARIN}>Sindarin</option>
            </select>
        </div>
    );
};

LanguagePicker.ENGLISH = ENGLISH;
LanguagePicker.QUENYA = QUENYA;
LanguagePicker.SINDARIN = SINDARIN;

export default LanguagePicker;
