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
            <input type="number"
                   className="date-time-input"
                   ref={ref}
                   step='1'
                   min={min}
                   onChange={this.onDateChanged}
                   value={value} />
        );
    },

    renderDatePicker: function (currentDate, styles) {
        var style = styles || {margin: "auto"};
        return (
            <table style={style}>
                <tbody>
                <tr>
                    <th>Gregorian Date:</th>
                    <th>
                        <select className="date-time-input"
                                ref='currentMonth'
                                value={currentDate.getMonth()}
                                onChange={this.onDateChanged} >
                            <option value='0'>Jan</option>
                            <option value='1'>Feb</option>
                            <option value='2'>Mar</option>
                            <option value='3'>Apr</option>
                            <option value='4'>May</option>
                            <option value='5'>Jun</option>
                            <option value='6'>Jul</option>
                            <option value='7'>Aug</option>
                            <option value='8'>Sep</option>
                            <option value='9'>Oct</option>
                            <option value='10'>Nov</option>
                            <option value='11'>Dec</option>
                        </select>
                    </th>
                    <th>
                        {this.createDateInput('currentDay', currentDate.getDate(), 0)}
                    </th>
                    <th>
                        {this.createDateInput('currentYear', currentDate.getFullYear(), 101)}
                    </th>
                    <th>
                        <input type="button"
                               value="Today"
                               onClick={this.resetDate} />
                    </th>
                </tr>
                </tbody>
            </table>
        );
    }
});

TolkienCalendars.Example = React.createClass({
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
            <table>
                <tbody>
                <tr>
                    <td colSpan='2'>
                        {this.renderDatePicker(currentDate)}
                    </td>
                </tr>
                <tr>
                    <th>
                        <input type="checkbox"
                               value="shire"
                               checked={shireAlign}
                               onChange={this.alignChanged} />
                        Try to align Shire Year with Rivendell Year?
                    </th>
                    <th>
                        <input type="checkbox"
                               value="rivendell"
                               checked={rivendellAlign}
                               onChange={this.alignChanged} />
                        Try to align Rivendell Year with Shire Year?
                    </th>
                </tr>
                <tr>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.ShireCalendar caption="Shire Reckoning"
                                                        date={currentDate}
                                                        className={shireClassName}
                                                        yearView={shireAlign || rivendellAlign} />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.RivendellCalendar caption="Rivendell Reckoning"
                                                            date={currentDate}
                                                            className={rivendellClassName}
                                                            yearView={shireAlign || rivendellAlign} />
                    </td>
                </tr>
                <tr>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.NumenorCalendar caption="Stewards' Reckoning"
                                                          reckoning={TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS}
                                                          language={TolkienCalendars.LanguagePicker.ENGLISH}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.NumenorCalendar caption="New Reckoning"
                                                          reckoning={TolkienCalendars.NumenorCalendar.RECKONING_NEW}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
});

TolkienCalendars.ShireCalendarExample = React.createClass({
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
            <table>
                <tbody>
                <tr>
                    <td colSpan='2' style={this.captionCellStyle}>
                        {this.renderDatePicker(currentDate)}
                    </td>
                </tr>
                <tr>
                    <td style={this.captionCellStyle}>
                        <pre>
                            <code>
                                {
`React.createElement(
    TolkienCalendars.ShireCalendar,
    {caption: "Shire Reckoning with CSS styling",
     date: ${dateString},
     className: "shire-calendar"}
)`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={this.captionCellStyle}>
                        <pre>
                            <code>
                                {
`React.createElement(
    TolkienCalendars.ShireCalendar,
    {caption: "Shire Reckoning with Bree month and day names",
     date: ${dateString},
     calendarControls: false,
     region: TolkienCalendars.ShireCalendar.REGION_NAMES_BREE,
     className: "shire-calendar"}
)`
                                }
                            </code>
                        </pre>
                    </td>
                </tr>
                <tr>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.ShireCalendar caption="Shire Reckoning with CSS styling"
                                                        date={currentDate}
                                                        className="shire-calendar" />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.ShireCalendar caption="Shire Reckoning with Bree month and day names"
                                                        date={currentDate}
                                                        calendarControls={false}
                                                        region={TolkienCalendars.ShireCalendar.REGION_NAMES_BREE}
                                                        className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <td style={this.captionCellStyle}>
                        <pre>
                            <code>
                                {
`React.createElement(
    TolkienCalendars.ShireCalendar,
    {caption: "Shire Reckoning: Year view",
     date: ${dateString},
     calendarControls: false,
     className: "shire-calendar",
     yearView: true}
)`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={this.captionCellStyle}>
                        <pre>
                            <code>
                                {
`React.createElement(
    TolkienCalendars.ShireCalendar,
    {caption: "Shire Reckoning: Horizontal Month View",
     date: ${dateString},
     calendarControls: false,
     monthViewLayout: TolkienCalendars.MonthViewLayout.HORIZONTAL,
     className: "shire-calendar"}
)`
                                }
                            </code>
                        </pre>
                    </td>
                </tr>
                <tr>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.ShireCalendar caption="Shire Reckoning: Year view"
                                                        date={currentDate}
                                                        calendarControls={false}
                                                        className="shire-calendar"
                                                        yearView={true} />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.ShireCalendar caption="Shire Reckoning: Horizontal Month View"
                                                        date={currentDate}
                                                        calendarControls={false}
                                                        monthViewLayout={TolkienCalendars.MonthViewLayout.HORIZONTAL}
                                                        className="shire-calendar" />
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
});

TolkienCalendars.RivendellCalendarExample = React.createClass({
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
            <table>
                <tbody>
                <tr>
                    <td style={this.captionCellStyle}>
                        Potential calendar (in Quenya) of the Second Age 1697:
                        the year Rivendell was founded.
                        <pre>
                            <code>
                                {
`React.createElement(TolkienCalendars.RivendellCalendar,
                    {yearView: true,
                     date: ${sa1697String},
                     calendarControls: false,
                     className: "shire-calendar"})`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={this.captionCellStyle}>
                        Potential calendar (in English) of the Third Age 2941:
                        the year Bilbo finds the One Ring, of the death of Smaug,
                        and of The Battle of Five Armies.
                        <pre>
                            <code>
                                {
`React.createElement(
    TolkienCalendars.RivendellCalendar,
    {language: TolkienCalendars.LanguagePicker.ENGLISH,
     yearView: true,
     date: ${ta2941String},
     calendarControls: false,
     className: "shire-calendar"}
)`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={this.captionCellStyle}>
                        Potential calendar (in Sindarin) of the Third Age 3018~3019:
                        "The Great Years" of the War of the Ring and the downfall of Barad-dûr.
                        <pre>
                            <code>
                                {
`React.createElement(
    TolkienCalendars.RivendellCalendar,
    {language: TolkienCalendars.LanguagePicker.SINDARIN,
     yearView: true,
     date: ${ta3018String},
     calendarControls: false,
     className: "shire-calendar"}
)`
                                }
                            </code>
                        </pre>
                    </td>
                </tr>
                <tr>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.RivendellCalendar yearView={true}
                                                            date={sa1697}
                                                            calendarControls={false}
                                                            className="shire-calendar" />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.RivendellCalendar language={TolkienCalendars.LanguagePicker.ENGLISH}
                                                            yearView={true}
                                                            date={ta2941}
                                                            calendarControls={false}
                                                            className="shire-calendar" />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.RivendellCalendar language={TolkienCalendars.LanguagePicker.SINDARIN}
                                                            yearView={true}
                                                            date={ta3018}
                                                            calendarControls={false}
                                                            className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <td colSpan='3' style={this.captionCellStyle}>
                        {this.renderDatePicker(currentDate, {margin: "auto", paddingTop: 12})}
                    </td>
                </tr>
                <tr>
                    <td style={this.captionCellStyle}>
                        Rivendell Reckoning Year View with defaults:
                        Quenya, Traditional Rules starting from March 21st.
                        <pre>
                            <code>
                                {
`React.createElement(TolkienCalendars.RivendellCalendar,
                    {yearView: true,
                     calendarControls: false,
                     date: ${dateString},
                     className: "shire-calendar"})`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={this.captionCellStyle}>
                        Rivendell Reckoning Year View in English,
                        Reformed Rules starting from March 25th.
                        <pre>
                            <code>
                                {
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
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={this.captionCellStyle}>
                        Rivendell Reckoning Year View in Sindarin,
                        Reformed Rules starting from March 29th.
                        <pre>
                            <code>
                                {
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
                                }
                            </code>
                        </pre>
                    </td>
                </tr>
                <tr>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.RivendellCalendar yearView={true}
                                                            calendarControls={false}
                                                            date={currentDate}
                                                            className="shire-calendar" />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.RivendellCalendar calendarRules={TolkienCalendars.RivendellCalendar.REFORMED_RULES}
                                                            startDay={25}
                                                            language={TolkienCalendars.LanguagePicker.ENGLISH}
                                                            yearView={true}
                                                            calendarControls={false}
                                                            date={currentDate}
                                                            className="shire-calendar" />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.RivendellCalendar calendarRules={TolkienCalendars.RivendellCalendar.REFORMED_RULES}
                                                            startDay={29}
                                                            language={TolkienCalendars.LanguagePicker.SINDARIN}
                                                            yearView={true}
                                                            calendarControls={false}
                                                            date={currentDate}
                                                            className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <td style={this.captionCellStyle}>
                        Rivendell Reckoning Month View with default rules and language (Quenya).
                        <pre>
                            <code>
                                {
`React.createElement(TolkienCalendars.RivendellCalendar,
                    {calendarControls: false,
                     date: ${dateString},
                     className: "shire-calendar"})`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={this.captionCellStyle}>
                        Rivendell Reckoning in English, Reformed Rules starting from March 25th.
                        <pre>
                            <code>
                                {
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
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={this.captionCellStyle}>
                        Rivendell Reckoning in Sindarin, Reformed Rules starting from March 20th.
                        <pre>
                            <code>
                                {
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
                                }
                            </code>
                        </pre>
                    </td>
                </tr>
                <tr>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.RivendellCalendar calendarControls={false}
                                                            date={currentDate}
                                                            className="shire-calendar" />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.RivendellCalendar calendarRules={TolkienCalendars.RivendellCalendar.REFORMED_RULES}
                                                            startDay={25}
                                                            language={TolkienCalendars.LanguagePicker.ENGLISH}
                                                            calendarControls={false}
                                                            date={currentDate}
                                                            className="shire-calendar" />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.RivendellCalendar calendarRules={TolkienCalendars.RivendellCalendar.REFORMED_RULES}
                                                            startDay={20}
                                                            language={TolkienCalendars.LanguagePicker.SINDARIN}
                                                            calendarControls={false}
                                                            date={currentDate}
                                                            className="shire-calendar" />
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
});

TolkienCalendars.NumenorCalendarExample = React.createClass({
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
            <table>
                <tbody>
                <tr>
                    <td colSpan='3' style={this.captionCellStyle}>
                        {this.renderDatePicker(currentDate)}
                    </td>
                </tr>
                <tr>
                    <td style={this.captionCellStyle}>
                        Kings' Reckoning: Year View in Sindarin.
                        <pre>
                            <code>
                                {
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {language: TolkienCalendars.LanguagePicker.SINDARIN,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={this.captionCellStyle}>
                        Stewards' Reckoning: Year View in English.
                        <pre>
                            <code>
                                {
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
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={this.captionCellStyle}>
                        New Reckoning: Year View in Quenya.
                        <pre>
                            <code>
                                {
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_NEW,
     yearView: true,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                }
                            </code>
                        </pre>
                    </td>
                </tr>
                <tr>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.NumenorCalendar language={TolkienCalendars.LanguagePicker.SINDARIN}
                                                          yearView={true}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.NumenorCalendar reckoning={TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS}
                                                          language={TolkienCalendars.LanguagePicker.ENGLISH}
                                                          yearView={true}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.NumenorCalendar reckoning={TolkienCalendars.NumenorCalendar.RECKONING_NEW}
                                                          yearView={true}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <td style={this.captionCellStyle}>
                        Kings' Reckoning in English.
                        <pre>
                            <code>
                                {
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {language: TolkienCalendars.LanguagePicker.ENGLISH,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={this.captionCellStyle}>
                        Stewards' Reckoning in Quenya.
                        <pre>
                            <code>
                                {
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={this.captionCellStyle}>
                        New Reckoning in Sindarin.
                        <pre>
                            <code>
                                {
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_NEW,
     language: TolkienCalendars.LanguagePicker.SINDARIN,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                }
                            </code>
                        </pre>
                    </td>
                </tr>
                <tr>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.NumenorCalendar language={TolkienCalendars.LanguagePicker.ENGLISH}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.NumenorCalendar reckoning={TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.NumenorCalendar reckoning={TolkienCalendars.NumenorCalendar.RECKONING_NEW}
                                                          language={TolkienCalendars.LanguagePicker.SINDARIN}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <td style={this.captionCellStyle}>
                        Kings' Reckoning: Horizontal Month View in Quenya.
                        <pre>
                            <code>
                                {
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {monthViewLayout:
        TolkienCalendars.MonthViewLayout.HORIZONTAL,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={this.captionCellStyle}>
                        Stewards' Reckoning: Horizontal Month View in Sindarin.
                        <pre>
                            <code>
                                {
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS,
     monthViewLayout:
        TolkienCalendars.MonthViewLayout.HORIZONTAL,
     language: TolkienCalendars.LanguagePicker.SINDARIN,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                }
                            </code>
                        </pre>
                    </td>
                    <td style={this.captionCellStyle}>
                        New Reckoning: Horizontal Month View in English.
                        <pre>
                            <code>
                                {
`React.createElement(
    TolkienCalendars.NumenorCalendar,
    {reckoning:
        TolkienCalendars.NumenorCalendar.RECKONING_NEW,
     monthViewLayout:
        TolkienCalendars.MonthViewLayout.HORIZONTAL,
     language: TolkienCalendars.LanguagePicker.ENGLISH,
     calendarControls: false,
     date: ${dateString},
     className: "shire-calendar"}
)`
                                }
                            </code>
                        </pre>
                    </td>
                </tr>
                <tr>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.NumenorCalendar monthViewLayout={TolkienCalendars.MonthViewLayout.HORIZONTAL}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.NumenorCalendar reckoning={TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS}
                                                          monthViewLayout={TolkienCalendars.MonthViewLayout.HORIZONTAL}
                                                          language={TolkienCalendars.LanguagePicker.SINDARIN}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                    <td style={this.calendarCellStyle}>
                        <TolkienCalendars.NumenorCalendar reckoning={TolkienCalendars.NumenorCalendar.RECKONING_NEW}
                                                          monthViewLayout={TolkienCalendars.MonthViewLayout.HORIZONTAL}
                                                          language={TolkienCalendars.LanguagePicker.ENGLISH}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
});
