/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { LanguageEnum } from "../../ui/controls/LanguagePicker";

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
                <option value={LanguageEnum.ENGLISH}>English</option>
                <option value={LanguageEnum.QUENYA}>Quenya</option>
                <option value={LanguageEnum.SINDARIN}>Sindarin</option>
            </select>
        </div>
    );
};

LanguagePicker.ENGLISH = LanguageEnum.ENGLISH;
LanguagePicker.QUENYA = LanguageEnum.QUENYA;
LanguagePicker.SINDARIN = LanguageEnum.SINDARIN;

export default LanguagePicker;
