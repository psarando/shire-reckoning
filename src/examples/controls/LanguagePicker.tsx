/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { MenuItem } from "@mui/material";

import { LanguageEnum } from "../../ui/controls/LanguagePicker";
import { OutlinedSelect } from "../Common";
import { scriptFontFamily } from "../theme";

interface LanguagePickerProps {
    language: LanguageEnum;
    onLanguageChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const LanguagePicker = ({
    language,
    onLanguageChange,
}: LanguagePickerProps) => {
    return (
        <OutlinedSelect
            className="language-select"
            label="Language"
            style={{ width: "8rem", margin: "0.25rem 0" }}
            SelectProps={{
                SelectDisplayProps: {
                    style: {
                        fontSize: "1rem",
                        fontFamily: scriptFontFamily,
                    },
                },
            }}
            value={language}
            onChange={onLanguageChange}
        >
            <MenuItem value={LanguageEnum.ENGLISH}>English</MenuItem>
            <MenuItem value={LanguageEnum.QUENYA}>Quenya</MenuItem>
            <MenuItem value={LanguageEnum.SINDARIN}>Sindarin</MenuItem>
        </OutlinedSelect>
    );
};

export default LanguagePicker;
