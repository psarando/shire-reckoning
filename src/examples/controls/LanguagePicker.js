/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import MenuItem from "@material-ui/core/MenuItem";

import { ENGLISH, QUENYA, SINDARIN } from "../../ui/controls/LanguagePicker";
import { OutlinedSelect } from "../Common";
import { scriptFontFamily } from "../theme";

class LanguagePicker extends Component {
    static get ENGLISH() {
        return ENGLISH;
    }

    static get QUENYA() {
        return QUENYA;
    }

    static get SINDARIN() {
        return SINDARIN;
    }

    render() {
        return (
            <div>
                <OutlinedSelect
                    className="language-select"
                    label="Language"
                    style={{
                        width: "8rem",
                        fontSize: "1rem",
                        fontFamily: scriptFontFamily,
                    }}
                    value={this.props.language}
                    onChange={this.props.onLanguageChange}
                >
                    <MenuItem value={ENGLISH}>English</MenuItem>
                    <MenuItem value={QUENYA}>Quenya</MenuItem>
                    <MenuItem value={SINDARIN}>Sindarin</MenuItem>
                </OutlinedSelect>
            </div>
        );
    }
}

export default LanguagePicker;
