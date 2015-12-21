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
            <input type="number"
                   className="date-time-input"
                   ref={ref}
                   step='1'
                   min={min}
                   onChange={this.onDateChanged}
                   value={value} />
        );
    },

    renderDatePicker: function (currentDate) {
        return (
            <table style={{margin: "auto"}}>
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
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.ShireCalendar caption="Shire Reckoning"
                                                        date={currentDate}
                                                        className={shireClassName}
                                                        yearView={shireAlign || rivendellAlign} />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.RivendellCalendar caption="Rivendell Reckoning"
                                                            date={currentDate}
                                                            className={rivendellClassName}
                                                            yearView={shireAlign || rivendellAlign} />
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.NumenorCalendar caption="Kings' Reckoning"
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.NumenorCalendar caption="Stewards' Reckoning"
                                                          reckoning={TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS}
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

        return (
            <table>
                <tbody>
                <tr>
                    <td colSpan='2'>
                        {this.renderDatePicker(currentDate)}
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.ShireCalendar caption="Shire Reckoning with CSS styling"
                                                        date={currentDate}
                                                        className="shire-calendar" />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.ShireCalendar caption="Shire Reckoning with Bree month and day names"
                                                        date={currentDate}
                                                        calendarControls={false}
                                                        region={TolkienCalendars.ShireCalendar.REGION_NAMES_BREE}
                                                        className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.ShireCalendar caption="Shire Reckoning: Year view"
                                                        date={currentDate}
                                                        calendarControls={false}
                                                        className="shire-calendar"
                                                        yearView={true} />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
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

        return (
            <table>
                <tbody>
                <tr>
                    <td colSpan='3'>
                        {this.renderDatePicker(currentDate)}
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.RivendellCalendar caption="Rivendell Reckoning Year View with defaults: Quenya, Traditional Rules starting from March 21st"
                                                            yearView={true}
                                                            date={currentDate}
                                                            calendarControls={false}
                                                            className="shire-calendar" />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.RivendellCalendar caption="Rivendell Reckoning Year View in English, Reformed Rules starting from March 25th"
                                                            calendarRules={TolkienCalendars.RivendellCalendar.REFORMED_RULES}
                                                            startDay={25}
                                                            yearView={true}
                                                            language={TolkienCalendars.LanguagePicker.ENGLISH}
                                                            calendarControls={false}
                                                            date={currentDate}
                                                            className="shire-calendar" />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.RivendellCalendar caption="Rivendell Reckoning Year View in Sindarin, Reformed Rules starting from March 29th"
                                                            calendarRules={TolkienCalendars.RivendellCalendar.REFORMED_RULES}
                                                            startDay={29}
                                                            yearView={true}
                                                            language={TolkienCalendars.LanguagePicker.SINDARIN}
                                                            calendarControls={false}
                                                            date={currentDate}
                                                            className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.RivendellCalendar caption="Rivendell Reckoning Month View with default rules and language (Quenya)"
                                                            calendarControls={false}
                                                            date={currentDate}
                                                            className="shire-calendar" />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.RivendellCalendar caption="Rivendell Reckoning in English, Reformed Rules starting from March 25th"
                                                            language={TolkienCalendars.LanguagePicker.ENGLISH}
                                                            calendarRules={TolkienCalendars.RivendellCalendar.REFORMED_RULES}
                                                            startDay={25}
                                                            calendarControls={false}
                                                            date={currentDate}
                                                            className="shire-calendar" />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.RivendellCalendar caption="Rivendell Reckoning in Sindarin, Reformed Rules starting from March 20th"
                                                            language={TolkienCalendars.LanguagePicker.SINDARIN}
                                                            calendarRules={TolkienCalendars.RivendellCalendar.REFORMED_RULES}
                                                            startDay={20}
                                                            calendarControls={false}
                                                            date={currentDate}
                                                            className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.RivendellCalendar caption="Rivendell Reckoning in Quenya, Traditional Rules starting from March 25th"
                                                            startDay={25}
                                                            date={currentDate}
                                                            calendarControls={false}
                                                            className="shire-calendar" />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.RivendellCalendar caption="Rivendell Reckoning in English, Traditional Rules starting from March 27th"
                                                            language={TolkienCalendars.LanguagePicker.ENGLISH}
                                                            startDay={27}
                                                            date={currentDate}
                                                            calendarControls={false}
                                                            className="shire-calendar" />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.RivendellCalendar caption="Rivendell Reckoning in Sindarin, Traditional Rules starting from March 29th"
                                                            language={TolkienCalendars.LanguagePicker.SINDARIN}
                                                            startDay={29}
                                                            date={currentDate}
                                                            calendarControls={false}
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

        return (
            <table>
                <tbody>
                <tr>
                    <td colSpan='3'>
                        {this.renderDatePicker(currentDate)}
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.NumenorCalendar caption="Kings' Reckoning: Year View in Sindarin"
                                                          language={TolkienCalendars.LanguagePicker.SINDARIN}
                                                          yearView={true}
                                                          date={currentDate}
                                                          calendarControls={false}
                                                          className="shire-calendar" />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.NumenorCalendar caption="Stewards' Reckoning: Year View in English"
                                                          reckoning={TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS}
                                                          language={TolkienCalendars.LanguagePicker.ENGLISH}
                                                          yearView={true}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.NumenorCalendar caption="New Reckoning: Year View in Quenya"
                                                          reckoning={TolkienCalendars.NumenorCalendar.RECKONING_NEW}
                                                          yearView={true}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.NumenorCalendar caption="Kings' Reckoning in English"
                                                          language={TolkienCalendars.LanguagePicker.ENGLISH}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.NumenorCalendar caption="Stewards' Reckoning in Quenya"
                                                          reckoning={TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.NumenorCalendar caption="New Reckoning in Sindarin"
                                                          reckoning={TolkienCalendars.NumenorCalendar.RECKONING_NEW}
                                                          language={TolkienCalendars.LanguagePicker.SINDARIN}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                </tr>
                <tr>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.NumenorCalendar caption="Kings' Reckoning: Horizontal Month View in Quenya"
                                                          monthViewLayout={TolkienCalendars.MonthViewLayout.HORIZONTAL}
                                                          date={currentDate}
                                                          calendarControls={false}
                                                          className="shire-calendar" />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.NumenorCalendar caption="Stewards' Reckoning: Horizontal Month View in Sindarin"
                                                          reckoning={TolkienCalendars.NumenorCalendar.RECKONING_STEWARDS}
                                                          monthViewLayout={TolkienCalendars.MonthViewLayout.HORIZONTAL}
                                                          language={TolkienCalendars.LanguagePicker.SINDARIN}
                                                          calendarControls={false}
                                                          date={currentDate}
                                                          className="shire-calendar" />
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <TolkienCalendars.NumenorCalendar caption="New Reckoning: Horizontal Month View in English"
                                                          reckoning={TolkienCalendars.NumenorCalendar.RECKONING_NEW}
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
