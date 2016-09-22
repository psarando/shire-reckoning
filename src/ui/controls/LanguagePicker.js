/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

const ENGLISH = 'english';
const QUENYA = 'quenya';
const SINDARIN = 'sindarin';

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
