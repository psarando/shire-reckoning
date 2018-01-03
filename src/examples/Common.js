/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { fullYearDate } from "../Utils";
import "./examples.css";

const CalendarCellStyle = {
    verticalAlign: "top",
};

const CaptionCellStyle = {
    verticalAlign: "top",
    padding: "1rem",
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
};

const OutlinedSelect = ({ label, ...props }) => {
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <FormControl variant="outlined" style={{ margin: ".25rem" }}>
            <InputLabel ref={inputLabel}>{label}</InputLabel>
            <Select
                variant="outlined"
                autoWidth={false}
                input={<OutlinedInput labelWidth={labelWidth} />}
                {...props}
            />
        </FormControl>
    );
};

const MonthInput = props => {
    return (
        <OutlinedSelect className="date-time-input" label="Month" {...props}>
            <MenuItem value={0}>Jan</MenuItem>
            <MenuItem value={1}>Feb</MenuItem>
            <MenuItem value={2}>Mar</MenuItem>
            <MenuItem value={3}>Apr</MenuItem>
            <MenuItem value={4}>May</MenuItem>
            <MenuItem value={5}>Jun</MenuItem>
            <MenuItem value={6}>Jul</MenuItem>
            <MenuItem value={7}>Aug</MenuItem>
            <MenuItem value={8}>Sep</MenuItem>
            <MenuItem value={9}>Oct</MenuItem>
            <MenuItem value={10}>Nov</MenuItem>
            <MenuItem value={11}>Dec</MenuItem>
        </OutlinedSelect>
    );
};

const DayInput = props => {
    return (
        <TextField
            className="date-time-input"
            variant="outlined"
            label="Day"
            type="number"
            step="1"
            {...props}
        />
    );
};

const YearInput = props => {
    return (
        <TextField
            className="date-time-input"
            variant="outlined"
            label="Year"
            type="number"
            step="1"
            {...props}
        />
    );
};

class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.resetDate = this.resetDate.bind(this);
        this.onMonthChanged = this.onMonthChanged.bind(this);
        this.onDayChanged = this.onDayChanged.bind(this);
        this.onYearChanged = this.onYearChanged.bind(this);
        this.onDateChanged = this.onDateChanged.bind(this);
    }

    resetDate() {
        this.props.onDateChanged(new Date());
    }

    onMonthChanged(event) {
        const year = this.props.date.getFullYear();
        const month = parseInt(event.target.value, 10);
        const day = this.props.date.getDate();

        this.onDateChanged(year, month, day);
    }

    onDayChanged(event) {
        const year = this.props.date.getFullYear();
        const month = this.props.date.getMonth();
        const day = parseInt(event.target.value, 10);

        this.onDateChanged(year, month, day);
    }

    onYearChanged(event) {
        const year = parseInt(event.target.value, 10);
        const month = this.props.date.getMonth();
        const day = this.props.date.getDate();

        this.onDateChanged(year, month, day);
    }

    onDateChanged(year, month, day) {
        if (0 <= day && day <= 32) {
            const currentDate = fullYearDate(year, month, day);

            if (!isNaN(currentDate.getFullYear())) {
                this.props.onDateChanged(currentDate);
            }
        }
    }

    render() {
        const currentDate = this.props.date;
        const className = this.props.className || "gregorian-date-picker";

        return (
            <Toolbar className={className} style={{ width: "37rem" }}>
                <Typography variant="h6">Gregorian Date:</Typography>
                <MonthInput
                    style={{ width: "6rem" }}
                    value={currentDate.getMonth()}
                    onChange={this.onMonthChanged}
                />
                <DayInput
                    value={currentDate.getDate()}
                    onChange={this.onDayChanged}
                />
                <YearInput
                    style={{ width: "6rem" }}
                    value={currentDate.getFullYear()}
                    onChange={this.onYearChanged}
                />
                <Button
                    variant="outlined"
                    size="large"
                    className="today-button"
                    onClick={this.resetDate}
                >
                    <span className="today-button-txt">Today</span>
                </Button>
            </Toolbar>
        );
    }
}

const Badges = props => (
    <>
        <a
            href="https://www.npmjs.org/package/shire-reckoning"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                src="https://img.shields.io/npm/v/shire-reckoning.svg?logo=npm"
                alt="[npm version]"
            />
        </a>
        &nbsp;
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            <img
                src="https://img.shields.io/npm/dependency-version/shire-reckoning/peer/react.svg?logo=react"
                alt="[react dependency version]"
            />
        </a>
    </>
);

export {
    Badges,
    CalendarCellStyle,
    CaptionCellStyle,
    DatePicker,
    MonthInput,
    DayInput,
    YearInput,
    OutlinedSelect,
};
