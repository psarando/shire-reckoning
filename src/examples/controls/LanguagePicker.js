/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import {
    ENGLISH,
    QUENYA,
    SINDARIN
} from '../../ui/controls/LanguagePicker'

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
                Language:
                <br />
                <select className="language-select"
                        value={this.props.language}
                        onChange={this.props.onLanguageChange} >
                    <option value={ENGLISH}>English</option>
                    <option value={QUENYA}>Quenya</option>
                    <option value={SINDARIN}>Sindarin</option>
                </select>
            </div>
        );
    }
}

export default LanguagePicker;
