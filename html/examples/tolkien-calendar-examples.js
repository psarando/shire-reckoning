/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */

TolkienCalendars.ExampleCommon = React.createMixin({
    calendarCellStyle: {verticalAlign: 'top'},

    captionCellStyle: {
        verticalAlign: 'top',
        padding: 4,
        borderTopStyle: 'solid',
        borderLeftStyle: 'solid',
        borderRightStyle: 'solid'
    },

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

    renderDatePicker: function (currentDate, styles) {
        var style = styles || {margin: "auto"};
        return (
            React.createElement("table", {style: style}, 
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
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {caption: "Shire Reckoning", 
                                                        date: currentDate, 
                                                        className: shireClassName, 
                                                        yearView: shireAlign || rivendellAlign})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {caption: "Rivendell Reckoning", 
                                                            date: currentDate, 
                                                            className: rivendellClassName, 
                                                            yearView: shireAlign || rivendellAlign})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {caption: "Stewards' Reckoning", 
                                                          reckoning: TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS, 
                                                          language: TolkienCalendars.LanguagePicker.ENGLISH, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {caption: "New Reckoning", 
                                                          reckoning: TolkienCalendars.NumenorCalendar.RECKONING_NEW, 
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
        var dateString =
            "new Date("
            + [currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()].join(",")
            + ")";

        return (
            React.createElement("table", null, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("td", {colSpan: "3", style: this.captionCellStyle}, 
                        this.renderDatePicker(currentDate)
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Shire Reckoning year view with Tolkien month and weekday names", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.ShireCalendar,
    {region: TolkienCalendars.ShireCalendar.REGION_NAMES_TOLKIEN,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Shire Reckoning year view with Shire month and weekday names", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.ShireCalendar,
    {yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Shire Reckoning year view with Bree month and weekday names", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.ShireCalendar,
    {region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {region: TolkienCalendars.ShireCalendar.REGION_NAMES_TOLKIEN, 
                                                        yearView: true, 
                                                        calendarControls: false, 
                                                        date: currentDate, 
                                                        className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {yearView: true, 
                                                        calendarControls: false, 
                                                        date: currentDate, 
                                                        className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE, 
                                                        yearView: true, 
                                                        calendarControls: false, 
                                                        date: currentDate, 
                                                        className: "shire-calendar"})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Shire Reckoning with Tolkien month and weekday names", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.ShireCalendar,
    {region: TolkienCalendars.ShireCalendar.REGION_NAMES_TOLKIEN,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Shire Reckoning with Shire month and weekday names", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.ShireCalendar,
    {calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Shire Reckoning with Bree month and weekday names", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.ShireCalendar,
    {region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {region: TolkienCalendars.ShireCalendar.REGION_NAMES_TOLKIEN, 
                                                        calendarControls: false, 
                                                        date: currentDate, 
                                                        className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {calendarControls: false, 
                                                        date: currentDate, 
                                                        className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE, 
                                                        calendarControls: false, 
                                                        date: currentDate, 
                                                        className: "shire-calendar"})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Shire Reckoning horizontal view with Tolkien month and weekday names", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.ShireCalendar,
    {region: TolkienCalendars.ShireCalendar.REGION_NAMES_TOLKIEN,
     monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Shire Reckoning horizontal view with Shire month and weekday names", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.ShireCalendar,
    {monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Shire Reckoning horizontal view with Bree month and weekday names", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.ShireCalendar,
    {region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE,
     monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {region: TolkienCalendars.ShireCalendar.REGION_NAMES_TOLKIEN, 
                                                        monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL, 
                                                        calendarControls: false, 
                                                        date: currentDate, 
                                                        className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL, 
                                                        calendarControls: false, 
                                                        date: currentDate, 
                                                        className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.ShireCalendar, {region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE, 
                                                        monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL, 
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

TolkienCalendars.RivendellCalendarExample = React.createClass({displayName: "RivendellCalendarExample",
    mixins: [TolkienCalendars.ExampleCommon],

    getInitialState: function() {
        return ({date: new Date()});
    },

    render: function() {
        var currentDate = this.state.date;
        var dateString =
            "new Date("
            + [currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()].join(",")
            + ")";

        var sa1697 = new Date(590+1697, 8,22);
        var ta2941 = new Date(590+3441+2941, 8,22);
        var ta3018 = new Date(590+3441+3018, 8,22);

        var sa1697String = "new Date( 590+1697, 8,22 )";
        var ta2941String = "new Date( 590+3441+2941, 8,22 )";
        var ta3018String = "new Date( 590+3441+3018, 8,22 )";

        return (
            React.createElement("table", null, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Potential calendar (in Quenya) of the Second Age 1697:" + ' ' +
                        "the year Rivendell was founded.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(TolkienCalendars.RivendellCalendar,
                    {yearView: true,
                     date: ${sa1697String},
                     calendarControls: false,
                     className: "shire-calendar"})`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Potential calendar (in English) of the Third Age 2941:" + ' ' +
                        "the year Bilbo finds the One Ring, of the death of Smaug," + ' ' +
                        "and of The Battle of Five Armies.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.RivendellCalendar,
    {language: TolkienCalendars.LanguagePicker.ENGLISH,
     yearView: true,
     date: ${ta2941String},
     calendarControls: false,
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Potential calendar (in Sindarin) of the Third Age 3018~3019:" + ' ' +
                        "\"The Great Years\" of the War of the Ring and the downfall of Barad-dûr.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.RivendellCalendar,
    {language: TolkienCalendars.LanguagePicker.SINDARIN,
     yearView: true,
     date: ${ta3018String},
     calendarControls: false,
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {yearView: true, 
                                                            date: sa1697, 
                                                            calendarControls: false, 
                                                            className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {language: TolkienCalendars.LanguagePicker.ENGLISH, 
                                                            yearView: true, 
                                                            date: ta2941, 
                                                            calendarControls: false, 
                                                            className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {language: TolkienCalendars.LanguagePicker.SINDARIN, 
                                                            yearView: true, 
                                                            date: ta3018, 
                                                            calendarControls: false, 
                                                            className: "shire-calendar"})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {colSpan: "3", style: this.captionCellStyle}, 
                        this.renderDatePicker(currentDate, {margin: "auto", paddingTop: 12})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Rivendell Reckoning Year View with defaults:" + ' ' +
                        "Quenya, Traditional Rules starting from March 21st.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(TolkienCalendars.RivendellCalendar,
                    {yearView: true,
                     calendarControls: false,
                     date: ${dateString},
                     className: "shire-calendar"})`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Rivendell Reckoning Year View in English," + ' ' +
                        "Reformed Rules starting from March 25th.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.RivendellCalendar,
    {calendarRules:
        TolkienCalendars.RivendellCalendar.REFORMED_RULES,
     startDay: 25,
     language: TolkienCalendars.LanguagePicker.ENGLISH,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Rivendell Reckoning Year View in Sindarin," + ' ' +
                        "Reformed Rules starting from March 29th.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.RivendellCalendar,
    {calendarRules:
        TolkienCalendars.RivendellCalendar.REFORMED_RULES,
     startDay: 29,
     language: TolkienCalendars.LanguagePicker.SINDARIN,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {yearView: true, 
                                                            calendarControls: false, 
                                                            date: currentDate, 
                                                            className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {calendarRules: TolkienCalendars.RivendellCalendar.REFORMED_RULES, 
                                                            startDay: 25, 
                                                            language: TolkienCalendars.LanguagePicker.ENGLISH, 
                                                            yearView: true, 
                                                            calendarControls: false, 
                                                            date: currentDate, 
                                                            className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {calendarRules: TolkienCalendars.RivendellCalendar.REFORMED_RULES, 
                                                            startDay: 29, 
                                                            language: TolkienCalendars.LanguagePicker.SINDARIN, 
                                                            yearView: true, 
                                                            calendarControls: false, 
                                                            date: currentDate, 
                                                            className: "shire-calendar"})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Rivendell Reckoning Month View with default rules and language (Quenya).", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(TolkienCalendars.RivendellCalendar,
                    {calendarControls: false,
                     date: ${dateString},
                     className: "shire-calendar"})`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Rivendell Reckoning in English, Reformed Rules starting from March 25th.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.RivendellCalendar,
    {calendarRules:
        TolkienCalendars.RivendellCalendar.REFORMED_RULES,
     startDay: 25,
     language: TolkienCalendars.LanguagePicker.ENGLISH,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Rivendell Reckoning in Sindarin, Reformed Rules starting from March 20th.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.RivendellCalendar,
    {calendarRules:
        TolkienCalendars.RivendellCalendar.REFORMED_RULES,
     startDay: 20,
     language: TolkienCalendars.LanguagePicker.SINDARIN,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {calendarControls: false, 
                                                            date: currentDate, 
                                                            className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {calendarRules: TolkienCalendars.RivendellCalendar.REFORMED_RULES, 
                                                            startDay: 25, 
                                                            language: TolkienCalendars.LanguagePicker.ENGLISH, 
                                                            calendarControls: false, 
                                                            date: currentDate, 
                                                            className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.RivendellCalendar, {calendarRules: TolkienCalendars.RivendellCalendar.REFORMED_RULES, 
                                                            startDay: 20, 
                                                            language: TolkienCalendars.LanguagePicker.SINDARIN, 
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

TolkienCalendars.NumenorCalendarExample = React.createClass({displayName: "NumenorCalendarExample",
    mixins: [TolkienCalendars.ExampleCommon],

    getInitialState: function() {
        return ({date: new Date()});
    },

    render: function() {
        var currentDate = this.state.date;
        var dateString =
            "new Date("
            + [currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()].join(",")
            + ")";

        return (
            React.createElement("table", null, 
                React.createElement("tbody", null, 
                React.createElement("tr", null, 
                    React.createElement("td", {colSpan: "3", style: this.captionCellStyle}, 
                        this.renderDatePicker(currentDate)
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Kings' Reckoning: Year View in Sindarin.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {language: TolkienCalendars.LanguagePicker.SINDARIN,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Stewards' Reckoning: Year View in English.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS,
     language: TolkienCalendars.LanguagePicker.ENGLISH,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "New Reckoning: Year View in Quenya.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_NEW,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {language: TolkienCalendars.LanguagePicker.SINDARIN, 
                                                          yearView: true, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {reckoning: TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS, 
                                                          language: TolkienCalendars.LanguagePicker.ENGLISH, 
                                                          yearView: true, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {reckoning: TolkienCalendars.NumenorCalendar.RECKONING_NEW, 
                                                          yearView: true, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Kings' Reckoning in English.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {language: TolkienCalendars.LanguagePicker.ENGLISH,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Stewards' Reckoning in Quenya.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "New Reckoning in Sindarin.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_NEW,
     language: TolkienCalendars.LanguagePicker.SINDARIN,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {language: TolkienCalendars.LanguagePicker.ENGLISH, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {reckoning: TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {reckoning: TolkienCalendars.NumenorCalendar.RECKONING_NEW, 
                                                          language: TolkienCalendars.LanguagePicker.SINDARIN, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Kings' Reckoning: Horizontal Month View in Quenya.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "Stewards' Reckoning: Horizontal Month View in Sindarin.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS,
     monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL,
     language: TolkienCalendars.LanguagePicker.SINDARIN,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    ), 
                    React.createElement("td", {style: this.captionCellStyle}, 
                        "New Reckoning: Horizontal Month View in English.", 
                        React.createElement("pre", null, 
                            React.createElement("code", null, 
                                
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_NEW,
     monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL,
     language: TolkienCalendars.LanguagePicker.ENGLISH,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                
                            )
                        )
                    )
                ), 
                React.createElement("tr", null, 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {reckoning: TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS, 
                                                          monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL, 
                                                          language: TolkienCalendars.LanguagePicker.SINDARIN, 
                                                          calendarControls: false, 
                                                          date: currentDate, 
                                                          className: "shire-calendar"})
                    ), 
                    React.createElement("td", {style: this.calendarCellStyle}, 
                        React.createElement(TolkienCalendars.NumenorCalendar, {reckoning: TolkienCalendars.NumenorCalendar.RECKONING_NEW, 
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
