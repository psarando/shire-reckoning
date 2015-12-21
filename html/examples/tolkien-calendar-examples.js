TolkienCalendars.ExampleCommon = React.createMixin({
    resetDate: function() {
        this.setState({date: new Date()});
    },

    onDateChanged: function(event) {
        var year = React.findDOMNode(this.refs.currentYear).value;
        var month = React.findDOMNode(this.refs.currentMonth).value;
        var day = React.findDOMNode(this.refs.currentDay).value;
        var currentDate = new Date(year, month, day);

        if (currentDate.getFullYear() > 100) {
            this.setState({date: currentDate});
        }
    },

    createDateInput: function(ref, value, min) {
        return (
            React.createElement("input", {type: "number", 
                   className: "date-time-input", 
                   ref: ref, 
                   step: "1", 
                   min: min, 
                   onChange: this.onDateChanged, 
                   value: value})
        );
    },

    renderDatePicker: function (currentDate) {
        return (
            React.createElement("table", {style: {margin: "auto"}}, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("th", null, "Gregorian Date:"), 
                    React.createElement("th", null, 
                        React.createElement("select", {className: "date-time-input", 
                                ref: "currentMonth", 
                                value: currentDate.getMonth(), 
                                onChange: this.onDateChanged}, 
                            React.createElement("option", {value: "0"}, "Jan"), 
                            React.createElement("option", {value: "1"}, "Feb"), 
                            React.createElement("option", {value: "2"}, "Mar"), 
                            React.createElement("option", {value: "3"}, "Apr"), 
                            React.createElement("option", {value: "4"}, "May"), 
                            React.createElement("option", {value: "5"}, "Jun"), 
                            React.createElement("option", {value: "6"}, "Jul"), 
                            React.createElement("option", {value: "7"}, "Aug"), 
                            React.createElement("option", {value: "8"}, "Sep"), 
                            React.createElement("option", {value: "9"}, "Oct"), 
                            React.createElement("option", {value: "10"}, "Nov"), 
                            React.createElement("option", {value: "11"}, "Dec")
                        )
                    ), 
                    React.createElement("th", null, 
                        this.createDateInput('currentDay', currentDate.getDate(), 0)
                    ), 
                    React.createElement("th", null, 
                        this.createDateInput('currentYear', currentDate.getFullYear(), 101)
                    ), 
                    React.createElement("th", null, 
                        React.createElement("input", {type: "button", 
                               value: "Today", 
                               onClick: this.resetDate})
                    )
                )
                )
            )
        );
    }
});

TolkienCalendars.Example = React.createClass({displayName: "Example",
    mixins: [TolkienCalendars.ExampleCommon],

    getInitialState: function() {
        return ({
            date: new Date(),
            shireAlign: false,
            rivendellAlign: false
        });
    },

    alignChanged: function (event) {
        var checked = event.target.checked;
        var shireAlign = event.target.value == "shire" ? checked : false;
        var rivendellAlign = event.target.value == "rivendell" ? checked : false;
        this.setState({
            shireAlign: shireAlign,
            rivendellAlign: rivendellAlign
        });
    },

    render: function() {
        var currentDate = this.state.date;
        var shireAlign = this.state.shireAlign;
        var rivendellAlign = this.state.rivendellAlign;

        var shireClassName = "shire-calendar";
        if (shireAlign) {
            shireClassName += " align-shire-calendar";
        }
        var rivendellClassName = "shire-calendar rivendell-calendar";
        if (rivendellAlign) {
            rivendellClassName += " align-rivendell-calendar";
        }

        return (
            React.createElement("table", null, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("td", {colSpan: "2"}, 
                        this.renderDatePicker(currentDate)
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("th", null, 
                        React.createElement("input", {type: "checkbox", 
                               value: "shire", 
                               checked: shireAlign, 
                               onChange: this.alignChanged}), 
                        "Try to align Shire Year with Rivendell Year?"
                    ), 
                    React.createElement("th", null, 
                        React.createElement("input", {type: "checkbox", 
                               value: "rivendell", 
                               checked: rivendellAlign, 
                               onChange: this.alignChanged}), 
                        "Try to align Rivendell Year with Shire Year?"
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {caption: "Shire Reckoning", 
                                                        date: currentDate, 
                                                        className: shireClassName, 
                                                        yearView: shireAlign || rivendellAlign})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {caption: "Rivendell Reckoning", 
                                                            date: currentDate, 
                                                            className: rivendellClassName, 
                                                            yearView: shireAlign || rivendellAlign})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {caption: "Kings' Reckoning", 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {caption: "Stewards' Reckoning", 
                                                          reckoning: TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    )
                )
                )
            )
        );
    }
});

TolkienCalendars.ShireCalendarExample = React.createClass({displayName: "ShireCalendarExample",
    mixins: [TolkienCalendars.ExampleCommon],

    getInitialState: function() {
        return ({date: new Date()});
    },

    render: function() {
        var currentDate = this.state.date;

        return (
            React.createElement("table", null, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("td", {colSpan: "2"}, 
                        this.renderDatePicker(currentDate)
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {caption: "Shire Reckoning with CSS styling", 
                                                        date: currentDate, 
                                                        className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {caption: "Shire Reckoning with Bree month and day names", 
                                                        date: currentDate, 
                                                        calendarControls: false, 
                                                        region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE, 
                                                        className: "shire-calendar"})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {caption: "Shire Reckoning: Year view", 
                                                        date: currentDate, 
                                                        calendarControls: false, 
                                                        className: "shire-calendar", 
                                                        yearView: true})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {caption: "Shire Reckoning: Horizontal Month View", 
                                                        date: currentDate, 
                                                        calendarControls: false, 
                                                        monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL, 
                                                        className: "shire-calendar"})
                    )
                )
                )
            )
        );
    }
});

TolkienCalendars.RivendellCalendarExample = React.createClass({displayName: "RivendellCalendarExample",
    mixins: [TolkienCalendars.ExampleCommon],

    getInitialState: function() {
        return ({date: new Date()});
    },

    render: function() {
        var currentDate = this.state.date;

        return (
            React.createElement("table", null, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("td", {colSpan: "3"}, 
                        this.renderDatePicker(currentDate)
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {caption: "Rivendell Reckoning Year View with defaults: Quenya, Traditional Rules starting from March 21st", 
                                                            yearView: true, 
                                                            date: currentDate, 
                                                            calendarControls: false, 
                                                            className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {caption: "Rivendell Reckoning Year View in English, Reformed Rules starting from March 25th", 
                                                            calendarRules: TolkienCalendars.RivendellCalendar.REFORMED_RULES, 
                                                            startDay: 25, 
                                                            yearView: true, 
                                                            language: TolkienCalendars.LanguagePicker.ENGLISH, 
                                                            calendarControls: false, 
                                                            date: currentDate, 
                                                            className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {caption: "Rivendell Reckoning Year View in Sindarin, Reformed Rules starting from March 29th", 
                                                            calendarRules: TolkienCalendars.RivendellCalendar.REFORMED_RULES, 
                                                            startDay: 29, 
                                                            yearView: true, 
                                                            language: TolkienCalendars.LanguagePicker.SINDARIN, 
                                                            calendarControls: false, 
                                                            date: currentDate, 
                                                            className: "shire-calendar"})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {caption: "Rivendell Reckoning Month View with default rules and language (Quenya)", 
                                                            calendarControls: false, 
                                                            date: currentDate, 
                                                            className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {caption: "Rivendell Reckoning in English, Reformed Rules starting from March 25th", 
                                                            language: TolkienCalendars.LanguagePicker.ENGLISH, 
                                                            calendarRules: TolkienCalendars.RivendellCalendar.REFORMED_RULES, 
                                                            startDay: 25, 
                                                            calendarControls: false, 
                                                            date: currentDate, 
                                                            className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {caption: "Rivendell Reckoning in Sindarin, Reformed Rules starting from March 20th", 
                                                            language: TolkienCalendars.LanguagePicker.SINDARIN, 
                                                            calendarRules: TolkienCalendars.RivendellCalendar.REFORMED_RULES, 
                                                            startDay: 20, 
                                                            calendarControls: false, 
                                                            date: currentDate, 
                                                            className: "shire-calendar"})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {caption: "Rivendell Reckoning in Quenya, Traditional Rules starting from March 25th", 
                                                            startDay: 25, 
                                                            date: currentDate, 
                                                            calendarControls: false, 
                                                            className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {caption: "Rivendell Reckoning in English, Traditional Rules starting from March 27th", 
                                                            language: TolkienCalendars.LanguagePicker.ENGLISH, 
                                                            startDay: 27, 
                                                            date: currentDate, 
                                                            calendarControls: false, 
                                                            className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {caption: "Rivendell Reckoning in Sindarin, Traditional Rules starting from March 29th", 
                                                            language: TolkienCalendars.LanguagePicker.SINDARIN, 
                                                            startDay: 29, 
                                                            date: currentDate, 
                                                            calendarControls: false, 
                                                            className: "shire-calendar"})
                    )
                )
                )
            )
        );
    }
});

TolkienCalendars.NumenorCalendarExample = React.createClass({displayName: "NumenorCalendarExample",
    mixins: [TolkienCalendars.ExampleCommon],

    getInitialState: function() {
        return ({date: new Date()});
    },

    render: function() {
        var currentDate = this.state.date;

        return (
            React.createElement("table", null, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("td", {colSpan: "3"}, 
                        this.renderDatePicker(currentDate)
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {caption: "Kings' Reckoning: Year View in Sindarin", 
                                                          language: TolkienCalendars.LanguagePicker.SINDARIN, 
                                                          yearView: true, 
                                                          date: currentDate, 
                                                          calendarControls: false, 
                                                          className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {caption: "Stewards' Reckoning: Year View in English", 
                                                          reckoning: TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS, 
                                                          language: TolkienCalendars.LanguagePicker.ENGLISH, 
                                                          yearView: true, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {caption: "New Reckoning: Year View in Quenya", 
                                                          reckoning: TolkienCalendars.NumenorCalendar.RECKONING_NEW, 
                                                          yearView: true, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {caption: "Kings' Reckoning in English", 
                                                          language: TolkienCalendars.LanguagePicker.ENGLISH, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {caption: "Stewards' Reckoning in Quenya", 
                                                          reckoning: TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {caption: "New Reckoning in Sindarin", 
                                                          reckoning: TolkienCalendars.NumenorCalendar.RECKONING_NEW, 
                                                          language: TolkienCalendars.LanguagePicker.SINDARIN, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {caption: "Kings' Reckoning: Horizontal Month View in Quenya", 
                                                          monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL, 
                                                          date: currentDate, 
                                                          calendarControls: false, 
                                                          className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {caption: "Stewards' Reckoning: Horizontal Month View in Sindarin", 
                                                          reckoning: TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS, 
                                                          monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL, 
                                                          language: TolkienCalendars.LanguagePicker.SINDARIN, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: {verticalAlign: 'top'}}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {caption: "New Reckoning: Horizontal Month View in English", 
                                                          reckoning: TolkienCalendars.NumenorCalendar.RECKONING_NEW, 
                                                          monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL, 
                                                          language: TolkienCalendars.LanguagePicker.ENGLISH, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    )
                )
                )
            )
        );
    }
});
