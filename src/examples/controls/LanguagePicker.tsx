/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { LanguageEnum } from "../../ui/controls/LanguagePicker";

interface LanguagePickerProps {
    language: LanguageEnum;
    onLanguageChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const LanguagePicker = ({
    language,
    onLanguageChange,
}: LanguagePickerProps) => {
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

export default LanguagePicker;
