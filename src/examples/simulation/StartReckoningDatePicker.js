/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { fullYearDate } from "../../Utils";
import { MonthInput, DayInput, YearInput } from "../Common";

class StartReckoningDatePicker extends Component {
    constructor(props) {
        super(props);

        this.onMonthChanged = this.onMonthChanged.bind(this);
        this.onDayChanged = this.onDayChanged.bind(this);
        this.onYearChanged = this.onYearChanged.bind(this);
        this.onDateChanged = this.onDateChanged.bind(this);
    }

    onMonthChanged(event) {
        let year = this.props.startDate.getFullYear();
        let month = parseInt(event.target.value, 10);
        let day = this.props.startDate.getDate();

        this.onDateChanged(year, month, day);
    }

    onDayChanged(event) {
        let year = this.props.startDate.getFullYear();
        let month = this.props.startDate.getMonth();
        let day = parseInt(event.target.value, 10);

        this.onDateChanged(year, month, day);
    }

    onYearChanged(event) {
        let year = parseInt(event.target.value, 10);
        let month = this.props.startDate.getMonth();
        let day = this.props.startDate.getDate();

        this.onDateChanged(year, month, day);
    }

    onDateChanged(year, month, day) {
        if (0 <= day && day <= 32) {
            let currentDate = fullYearDate(year, month, day);

            if (!isNaN(currentDate.getFullYear())) {
                this.props.onCalendarStartChange(currentDate);
            }
        }
    }

    render() {
        let currentDate = this.props.startDate;

        return (
            <>
                <Typography variant="subtitle1" gutterBottom>
                    Start reckoning from
                </Typography>
                <Toolbar
                    variant="dense"
                    disableGutters
                    style={{
                        margin: "auto",
                        justifyContent: "center",
                        fontWeight: "normal",
                    }}
                >
                    <MonthInput
                        style={{ width: "5rem", fontSize: "0.75rem" }}
                        value={currentDate.getMonth()}
                        onChange={this.onMonthChanged}
                    />
                    <DayInput
                        InputProps={{ style: { fontSize: "0.75rem" } }}
                        value={currentDate.getDate()}
                        onChange={this.onDayChanged}
                    />
                    <YearInput
                        style={{ width: "5rem" }}
                        InputProps={{ style: { fontSize: "0.75rem" } }}
                        value={currentDate.getFullYear()}
                        onChange={this.onYearChanged}
                    />
                </Toolbar>
            </>
        );
    }
}

export default StartReckoningDatePicker;
