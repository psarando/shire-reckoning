/**
 * Copyright (C) 2015 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */

$(document).ready(function() {
    var CalendarCommon = React.createMixin({
        getGregorianDateDisplay: function(gregorianDate) {
            return (<span className='gregorian-display' >{gregorianDate.toDateString()}</span>);
        },

        getDateColor: function(monthColor, date1, date2) {
            if (this.datesMatch(date1, date2)) {
                return "highlight";
            }

            return monthColor;
        },

        datesMatch: function(date1, date2) {
            return date1.getFullYear() == date2.getFullYear() &&
                date1.getMonth() == date2.getMonth() &&
                date1.getDate() == date2.getDate();
        },

        getNextDate: function(today) {
            var tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            return tomorrow;
        },

        isLeapYear: function(date) {
            var year = date.getFullYear();
            return !((year % 4) || (!(year % 100) && (year % 400)));
        }
    });

    var MonthViewPicker = React.createMixin({
        onMonthViewChange: function(event) {
            this.setState({monthView: event.target.value});
        },

        getUpdatedMonthView: function(month) {
            if (this.state.monthView < 0) {
                return this.state.monthView;
            }

            return month;
        },

        prevMonthView: function () {
            var month = React.findDOMNode(this.refs.monthViewSelect).value;
            month--;
            if (month < 0) {
                month = this.getMonths().length - 1;
            }
            this.setState({monthView: month});
        },

        nextMonthView: function () {
            var month = React.findDOMNode(this.refs.monthViewSelect).value;
            month++;
            if (month >= this.getMonths().length) {
                month = 0;
            }
            this.setState({monthView: month});
        },

        renderMonthViewPicker: function(monthNames) {
            return (
                <table className="month-picker" >
                    <tbody>
                    <tr>
                        <td style={{textAlign: "right"}}>
                            <input type="button"
                                   value="<<"
                                   onClick={this.prevMonthView} />
                        </td>
                        <td>
                            <select ref='monthViewSelect'
                                    value={this.state.monthView}
                                    onChange={this.onMonthViewChange} >
                                <option value="-1">Year Calendar</option>
                                {monthNames.map(function (month, i) {
                                    return (
                                        <option key={'month-view-opt' + i} value={i}>
                                            {month}
                                        </option>
                                    );
                                })}
                            </select>
                        </td>
                        <td style={{textAlign: "left"}}>
                            <input type="button"
                                   value=">>"
                                   onClick={this.nextMonthView} />
                        </td>
                    </tr>
                    </tbody>
                </table>
            );
        }
    });

    var MonthViewLayout = React.createMixin({
        VERTICAL: "vertical",
        HORIZONTAL: "horizontal",

        onMonthViewLayoutChange: function (event) {
            this.setState({monthViewLayout: event.target.value});
        },

        renderMonthVerticalHeader: function (className) {
            var weekdays = this.getWeekdays().map(function (weekday, i) {
                return (
                    <td key={className + i}
                        className={className} >
                    </td>
                );
            });

            return (<tr className={className} >{weekdays}</tr>);
        },

        renderMonthViewLayoutControls: function () {
            return (
                <div>
                    Month View Layout:
                    <br />
                    <select value={this.state.monthViewLayout}
                            onChange={this.onMonthViewLayoutChange} >
                        <option value={MonthViewLayout.VERTICAL}>Vertical</option>
                        <option value={MonthViewLayout.HORIZONTAL}>Horizontal</option>
                    </select>
                </div>
            );
        }
    });

    var ShireCalendar = React.createClass({
        mixins: [CalendarCommon, MonthViewPicker, MonthViewLayout],

        statics: {
            REGION_NAMES_SHIRE: "shire",
            REGION_NAMES_BREE: "bree",

            weekdays: [
                {name: 'Sterday',   description: "Stars of Varda Day. From the archaic Sterrendei."},
                {name: 'Sunday',    description: "Sun Day. From the archaic Sunnendei."},
                {name: 'Monday',    description: "Moon Day. From the archaic Monendei."},
                {name: 'Trewsday',  description: "Two Trees of Valinor Day. From the archaic Trewesdei."},
                {name: 'Hevensday', description: "Heavens Day. From the archaic Hevensdei."},
                {name: 'Mersday',   description: "Sea Day. From the archaic Meresdei."},
                {name: 'Highday',   description: "Valar Day. From the archaic Hihdei."}
            ],

            months: [
                {
                    shire: 'Afteryule',
                    bree: 'Frery',
                    description: "The month after the winter solstice (Midwinter) feast of Gēola or Giúl (Yule).",
                    className: "afteryule"
                },
                {
                    shire: 'Solmath',
                    bree: 'Solmath',
                    description: "Sol Month. The return of the sun (sol), or perhaps from the Old English word for mud.\nMuddy Month.",
                    className: "solmath"
                },
                {
                    shire: 'Rethe',
                    bree: 'Rethe',
                    description: "Month of the Goddess Hrēþ or Hretha.\nMonth of Wildness.",
                    className: "rethe"
                },
                {
                    shire: 'Astron',
                    bree: 'Chithing',
                    description: "Spring month.\nNamed after the Goddess Ēostre.",
                    className: "astron"
                },
                {
                    shire: 'Thrimidge',
                    bree: 'Thrimidge',
                    description: "The month of plenty, when cows were given three milkings (thri+milching) daily.",
                    className: "thrimidge"
                },
                {
                    shire: 'Forelithe',
                    bree: 'Lithe',
                    description: "The month before the summer solstice (Midsummer), when gentle (Litha) weather encouraged voyages.\nCalm or Navigable Month.",
                    className: "forelithe"
                },
                {
                    shire: 'Afterlithe',
                    bree: 'Mede',
                    description: "The month after the summer solstice (Midsummer).\nMeadow Month.",
                    className: "afterlithe"
                },
                {
                    shire: 'Wedmath',
                    bree: 'Wedmath',
                    description: "When fields were beset by weeds (weod).\nPlant Month.",
                    className: "wedmath"
                },
                {
                    shire: 'Halimath',
                    bree: 'Harvestmath',
                    description: "The holy (haleg) month of sacred rites.\nHarvest Month.",
                    className: "halimath"
                },
                {
                    shire: 'Winterfilth',
                    bree: 'Wintring',
                    description: "The filling (fylleth) of winter's first full moon, according to Bede; Tolkien instead suggests the \"filling\" or completion of the year before Winter, after the harvest.\nWine Month.",
                    className: "winterfilth"
                },
                {
                    shire: 'Blotmath',
                    bree: 'Blooting',
                    description: "The month of blood (blod).\nMonth of Sacrifice or Slaughter.",
                    className: "blotmath"
                },
                {
                    shire: 'Foreyule',
                    bree: 'Yulemath',
                    description: "The month before the solstice (Midwinter) feast of Gēola or Giúl (Yule).",
                    className: "foreyule"
                }
            ]
        },

        getWeekdays: function () {
            return ShireCalendar.weekdays;
        },
        getMonths: function () {
            return ShireCalendar.months;
        },

        getInitialState: function() {
            var calendarControls = this.props.calendarControls !== false;
            var today = this.props.date || new Date();
            var monthViewLayout = this.props.monthViewLayout || MonthViewLayout.VERTICAL;
            var region = this.props.region || ShireCalendar.REGION_NAMES_SHIRE;

            var calendar = this.makeCalendarDates(today);
            var monthView = this.props.yearView ? -1 : calendar.todayShire.month;

            return {
                calendarControls: calendarControls,
                calendar: calendar,
                monthView: monthView,
                monthViewLayout: monthViewLayout,
                region: region
            };
        },

        componentWillReceiveProps: function(nextProps) {
            var today = nextProps.date;
            var calendar = this.state.calendar;

            if (today && !this.datesMatch(today, calendar.today)) {
                calendar = this.makeCalendarDates(today);
            }
            this.setState({
                calendar: calendar,
                monthView: this.state.monthView < 0 || nextProps.yearView ? -1 : calendar.todayShire.month
            });
        },

        getNewYearDate: function (today) {
            var startYear = today.getFullYear();
            if (today.getMonth() < 11 || today.getDate() < 21) {
                startYear--;
            }

            return new Date(startYear,11,21, 0,0,0);
        },

        makeCalendarDates: function(today) {
            var gregorianDate = this.getNewYearDate(today);
            var todayShire;

            var dates = [{
                "day": "2 Yule",
                "month": 0,
                "weekDay": 0,
                "gregorian": gregorianDate
            }];

            if (this.datesMatch(today, gregorianDate)) {
                todayShire = dates[0];
            }

            gregorianDate = this.getNextDate(gregorianDate);

            for (var month = 0, weekDay = 1; month < 12; month++) {
                for (var day = 1; day <= 30; day++, weekDay++, gregorianDate = this.getNextDate(gregorianDate)) {
                    dates.push({
                        "day": day,
                        "month": month,
                        "weekDay": weekDay % 7,
                        "gregorian": gregorianDate
                    });

                    if (this.datesMatch(today, gregorianDate)) {
                        todayShire = dates[dates.length-1];
                    }
                }

                if (month == 5) {
                    dates.push({
                        "day": "1 Lithe",
                        "region": {
                            "shire": "1 Lithe",
                            "bree": "1 Summerday"
                        },
                        "month": month,
                        "weekDay": weekDay % 7,
                        "gregorian": gregorianDate
                    });

                    if (this.datesMatch(today, gregorianDate)) {
                        todayShire = dates[dates.length-1];
                    }

                    gregorianDate = this.getNextDate(gregorianDate);
                    dates.push({
                        "day": "Midyear's Day",
                        "month": month,
                        "weekDay": weekDay % 7,
                        "gregorian": gregorianDate
                    });

                    if (this.datesMatch(today, gregorianDate)) {
                        todayShire = dates[dates.length-1];
                    }

                    weekDay++;
                    var leapYear = this.isLeapYear(gregorianDate);
                    if (leapYear) {
                        gregorianDate = this.getNextDate(gregorianDate);
                        dates.push({
                            "day": "OverLithe",
                            "region": {
                                "shire": "OverLithe",
                                "bree": "3 Summerday"
                            },
                            "month": month+1,
                            "weekDay": weekDay % 7,
                            "gregorian": gregorianDate
                        });

                        if (this.datesMatch(today, gregorianDate)) {
                            todayShire = dates[dates.length-1];
                        }
                    }

                    gregorianDate = this.getNextDate(gregorianDate);
                    dates.push({
                        "day": "2 Lithe",
                        "region": {
                            "shire": "2 Lithe",
                            "bree": leapYear ? "4 Summerday" : "3 Summerday"
                        },
                        "month": month+1,
                        "weekDay": weekDay % 7,
                        "gregorian": gregorianDate
                    });

                    if (this.datesMatch(today, gregorianDate)) {
                        todayShire = dates[dates.length-1];
                    }

                    gregorianDate = this.getNextDate(gregorianDate);
                    weekDay++;
                }
            }

            dates.push({
                "day": "1 Yule",
                "month": 11,
                "weekDay": 6,
                "gregorian": gregorianDate
            });

            if (this.datesMatch(today, gregorianDate)) {
                todayShire = dates[dates.length-1];
            }

            return {
                dates: dates,
                today: today,
                todayShire: todayShire
            };
        },

        onRegionChange: function (event) {
            this.setState({region: event.target.value});
        },

        renderDay: function(dates, today) {
            var date = dates[0];
            var region = this.state.region;
            switch (date.day) {
                case "1 Yule":
                    return (
                        <IntercalaryDay key="1-Yule"
                                        name={date.day}
                                        description="Shire New Year's Eve!"
                                        currentDate={today}
                                        gregorian={date.gregorian} />
                    );

                case "2 Yule":
                    return (
                        <IntercalaryDay key="2-Yule"
                                        name={date.day}
                                        description="Midwinter: Shire New Year!"
                                        currentDate={today}
                                        gregorian={date.gregorian} />
                    );

                case "1 Lithe":
                    return (
                        <IntercalaryDay key="Midsummer"
                                        name={date.region[region]}
                                        description="Midsummer's Eve and Midsummer Day!"
                                        currentDate={today}
                                        gregorian={date.gregorian}
                                        dayExtra={dates[1].day}
                                        gregorianExtra={dates[1].gregorian} />
                    );

                case "OverLithe":
                    return (
                        <IntercalaryDay key="OverLithe"
                                        name={date.region[region]}
                                        description="Shire Leap Day and Day after Midsummer."
                                        currentDate={today}
                                        gregorian={date.gregorian}
                                        dayExtra={dates[1].region[region]}
                                        gregorianExtra={dates[1].gregorian} />
                    );

                case "2 Lithe":
                    return (
                        <IntercalaryDay key="2-Lithe"
                                        name={date.region[region]}
                                        description="Day after Midsummer."
                                        currentDate={today}
                                        gregorian={date.gregorian} />
                    );

                default:
                    var month = ShireCalendar.months[date.month];
                    var weekday = ShireCalendar.weekdays[date.weekDay];

                    return (
                        <DateCell key={date.day + month[region]}
                                  date={date}
                                  currentDate={today}
                                  month={month[region]}
                                  description={month.description}
                                  weekday={weekday.name}
                                  className={month.className}/>
                    );
            }
        },

        renderMonth: function() {
            var today = this.state.calendar.today;
            var dates = this.state.calendar.dates;
            var monthView = this.state.monthView;

            var week = [];
            var weeks = [];

            for (var i = 0, date = dates[i];
                 i < dates.length && date.month < monthView;
                 i++, date = dates[i]) {
                // seek ahead to current month view
            }

            for (var weekday = 0; weekday < dates[i].weekDay; weekday++) {
                week.push(<WeekDayHeaderCell key={'shire-month-filler-' + weekday} />);
            }

            for (; i < dates.length && (monthView < 0 || monthView == dates[i].month); i++, date = dates[i]) {
                switch (date.day) {
                    case "1 Lithe":
                        week.push(this.renderDay([date, dates[++i]], today));
                        weeks.push(<tr key={"shire-week-" + (weeks.length + 1)} >{week}</tr>);
                        week = [];

                        break;

                    case "OverLithe":
                        week.push(this.renderDay([date, dates[++i]], today));

                        break;

                    default:
                        week.push(this.renderDay([date], today));

                        if ((date.weekDay + 1) % 7 === 0) {
                            weeks.push(<tr key={"shire-week-" + (weeks.length + 1)} >{week}</tr>);
                            week = [];
                        }

                        break;
                }
            }

            if (week.length > 0) {
                weeks.push(<tr key={"shire-week-" + (weeks.length + 1)} >{week}</tr>);
            }

            return weeks;
        },

        renderMonthVertical: function() {
            var today = this.state.calendar.today;
            var dates = this.state.calendar.dates;
            var monthView = this.state.monthView;

            var weeks = ShireCalendar.weekdays.map(function (weekday) {
                return [(
                    <WeekDayHeaderCell key={weekday.name}
                                       name={weekday.name}
                                       description={weekday.description}
                                       colSpan='2' />
                )];
            });

            for (var i = 0, date = dates[i];
                 i < dates.length && date.month < monthView;
                 i++, date = dates[i]) {
                // seek ahead to current month view
            }

            for (var weekday = 0; weekday < dates[i].weekDay; weekday++) {
                weeks[weekday].push(<WeekDayHeaderCell key={'shire-month-filler-' + weekday} />);
            }

            for (; i < dates.length && (monthView < 0 || monthView == dates[i].month); i++, date = dates[i]) {
                switch (date.day) {
                    case "1 Lithe":
                        weeks[date.weekDay].push(this.renderDay([date, dates[++i]], today));

                        break;

                    case "OverLithe":
                        weeks[date.weekDay].push(this.renderDay([date, dates[++i]], today));

                        break;

                    default:
                        weeks[date.weekDay].push(this.renderDay([date], today));

                        break;
                }
            }

            return weeks.map(function (week, i) {
                return (<tr key={"shire-week-" + (i + 1)} >{week}</tr>);
            });
        },

        renderYear: function() {
            var today = this.state.calendar.today;
            var dates = this.state.calendar.dates;

            var week = [];
            var weeks = [];

            for (var i = 0, date = dates[i]; i < dates.length; i++, date = dates[i]) {
                switch (date.day) {
                    case "1 Lithe":
                        week.push(this.renderDay([date, dates[++i]], today));
                        weeks.push(<tr key={"shire-week-" + (weeks.length + 1)} >{week}</tr>);
                        week = [];

                        break;

                    case "OverLithe":
                        week.push(this.renderDay([date, dates[++i]], today));

                        break;

                    default:
                        week.push(this.renderDay([date], today));

                        if ((date.weekDay + 1) % 7 === 0) {
                            weeks.push(<tr key={"shire-week-" + (weeks.length + 1)} >{week}</tr>);
                            week = [];
                        }

                        break;
                }
            }

            if (week.length > 0) {
                weeks.push(<tr key={"shire-week-" + (weeks.length + 1)} >{week}</tr>);
            }

            return weeks;
        },

        renderCalendarControls: function () {
            var region = this.state.region;
            var monthNames = ShireCalendar.months.map(function(month) {
                return month[region];
            });
            return (
                <tr>
                    <td colSpan='2' className='shire-calendar-controls' >
                        <select value={region}
                                onChange={this.onRegionChange} >
                            <option value={ShireCalendar.REGION_NAMES_SHIRE}>Shire Names</option>
                            <option value={ShireCalendar.REGION_NAMES_BREE}>Bree Names</option>
                        </select>
                    </td>
                    <td colSpan='3' className='shire-calendar-controls month-picker-container' >
                        {this.renderMonthViewPicker(monthNames)}
                    </td>
                    <td colSpan='2' className='shire-calendar-controls' >
                        {this.renderMonthViewLayoutControls()}
                    </td>
                </tr>
            );
        },

        render: function () {
            var weekDayHeader = (
                <tr>
                    {ShireCalendar.weekdays.map(function (weekday) {
                        return (
                            <WeekDayHeaderCell key={weekday.name}
                                               name={weekday.name}
                                               description={weekday.description} />
                        );
                    })}
                </tr>
            );

            var weeks;
            if (this.state.monthView < 0) {
                weeks = this.renderYear();
            } else if (this.state.monthViewLayout == MonthViewLayout.VERTICAL) {
                weeks = this.renderMonthVertical();
                weekDayHeader = this.renderMonthVerticalHeader('shire-vertical-header-filler');
            } else {
                weeks = this.renderMonth();
            }

            var controls = this.state.calendarControls ? this.renderCalendarControls() : null;
            var caption = this.props.caption ?
                (<caption className='shire-caption'>{this.props.caption}</caption>)
                : null;

            return (
                <table className={this.props.className} >
                    {caption}
                    <thead>
                        {controls}
                        {weekDayHeader}
                    </thead>
                    <tbody>
                        {weeks}
                    </tbody>
                </table>
            );
        }
    });

    var LanguagePicker = React.createMixin({
        ENGLISH: 'english',
        QUENYA: 'quenya',
        SINDARIN: 'sindarin',

        onLanguageChange: function (event) {
            this.setState({language: event.target.value});
        },

        renderLanguagePicker: function () {
            return (
                <div>
                    Language:
                    <br />
                    <select value={this.state.language}
                            onChange={this.onLanguageChange} >
                        <option value={LanguagePicker.ENGLISH}>English</option>
                        <option value={LanguagePicker.QUENYA}>Quenya</option>
                        <option value={LanguagePicker.SINDARIN}>Sindarin</option>
                    </select>
                </div>
            );
        }
    });

    var RivendellCalendar = React.createClass({
        mixins: [CalendarCommon, MonthViewPicker, LanguagePicker],

        statics: {
            TRADITIONAL_RULES: "traditional",
            REFORMED_RULES: "reformed",

            weekdays: [
                {
                    english: "Stars Day",
                    quenya: "Elenya",
                    sindarin: "Orgilion",
                    description: "English: Stars Day\nQuenya: Elenya\nSindarin: Orgilion"
                },
                {
                    english: "Sun Day",
                    quenya: "Anarya",
                    sindarin: "Oranor",
                    description: "English: Sun Day\nQuenya: Anarya\nSindarin: Oranor"
                },
                {
                    english: "Moon Day",
                    quenya: "Isilya",
                    sindarin: "Orithil",
                    description: "English: Moon Day\nQuenya: Isilya\nSindarin: Orithil"
                },
                {
                    english: "Two Trees Day",
                    quenya: "Aldúya",
                    sindarin: "Orgaladhad",
                    description: "English: Two Trees of Valinor Day\nQuenya: Aldúya\nSindarin: Orgaladhad"
                },
                {
                    english: "Heavens Day",
                    quenya: "Menelya",
                    sindarin: "Ormenel",
                    description: "English: Heavens Day\nQuenya: Menelya\nSindarin: Ormenel"
                },
                {
                    english: "Valar Day",
                    quenya: "Valanya or Tárion",
                    sindarin: "Orbelain or Rodyn",
                    description: "English: Valar Day\nQuenya: Valanya or Tárion\nSindarin: Orbelain or Rodyn"
                }
            ],

            months: [
                {
                    english: "Spring",
                    quenya: "Tuilë",
                    sindarin: "Ethuil",
                    description: "English: Spring\nQuenya: Tuilë\nSindarin: Ethuil",
                    className: "spring"
                },
                {
                    english: "Summer",
                    quenya: "Lairë",
                    sindarin: "Laer",
                    description: "English: Summer\nQuenya: Lairë\nSindarin: Laer",
                    className: "summer"
                },
                {
                    english: "Autumn",
                    quenya: "Yávië",
                    sindarin: "Iavas",
                    description: "English: Autumn\nQuenya: Yávië\nSindarin: Iavas",
                    className: "autumn"
                },
                {
                    english: "Fading",
                    quenya: "Quellë",
                    sindarin: "Firith",
                    description: "English: Fading\nQuenya: Quellë or 'lasse-lanta'\nSindarin: Firith or 'narbeleth'",
                    className: "fading"
                },
                {
                    english: "Winter",
                    quenya: "Hrívë",
                    sindarin: "Rhîw",
                    description: "English: Winter\nQuenya: Hrívë\nSindarin: Rhîw",
                    className: "winter"
                },
                {
                    english: "Stirring",
                    quenya: "Coirë",
                    sindarin: "Echuir",
                    description: "English: Stirring\nQuenya: Coirë\nSindarin: Echuir",
                    className: "stirring"
                }
            ]
        },

        getWeekdays: function () {
            return RivendellCalendar.weekdays;
        },
        getMonths: function () {
            return RivendellCalendar.months;
        },

        getInitialState: function() {
            var calendarControls = this.props.calendarControls !== false;
            var language = this.props.language || LanguagePicker.QUENYA;
            var calendarRules = this.props.calendarRules || RivendellCalendar.TRADITIONAL_RULES;
            var startDay = this.props.startDay || 21;
            var today = this.props.date || new Date();

            var calendar = this.makeCalendarDates(today, calendarRules, startDay);
            var monthView = this.props.yearView ? -1 : calendar.todayRivendell.month;

            return {
                calendarControls: calendarControls,
                calendar: calendar,
                monthView: monthView,
                calendarRules: calendarRules,
                startDay: startDay,
                language: language
            };
        },

        componentWillReceiveProps: function(nextProps) {
            var today = nextProps.date;
            var calendar = this.state.calendar;

            if (today && !this.datesMatch(today, calendar.today)) {
                calendar = this.makeCalendarDates(today, this.state.calendarRules, this.state.startDay);
            }
            this.setState({
                calendar: calendar,
                monthView: nextProps.yearView ? -1 : this.getUpdatedMonthView(calendar.todayRivendell.month)
            });
        },

        getNewYearDate: function (today, calendarRules, startDay) {
            var startYear = today.getFullYear();

            var newyearMonth = 2;
            var newyearDay = this.getNewYearDay(startYear, calendarRules, startDay);

            var thisMonth = today.getMonth();
            var thisDay = today.getDate();

            if (thisMonth < newyearMonth || (thisMonth == newyearMonth && thisDay < newyearDay)) {
                startYear--;
                newyearDay = this.getNewYearDay(startYear, calendarRules, startDay);
            }

            return new Date(startYear, newyearMonth, newyearDay, 0,0,0);
        },

        getNewYearDay: function(startYear, calendarRules, startDay) {
            if (calendarRules == RivendellCalendar.REFORMED_RULES) {
                return startDay;
            }

            // adjust startDay according to leap year cycles.
            return (
                startDay
                - Math.floor((((startYear-1) % 12) + 1) / 4)
                + Math.floor(startYear / 100)
                - Math.floor(startYear / 400)
                - (Math.floor((startYear-1) / 432) * 3)
            );
        },

        isRivendellLeapYear: function(today) {
            var year = today.getFullYear();
            return ((year % 12 == 0) && (year % 432 != 0));
        },

        makeCalendarDates: function(today, calendarRules, startDay) {
            var gregorianDate = this.getNewYearDate(today, calendarRules, startDay);
            var todayRivendell;

            var startYear = gregorianDate.getFullYear();
            var yearsElapsed = startYear - 1;
            var weekDay = (
                yearsElapsed * 365
                + (Math.floor(yearsElapsed / 12) * 3)
                - (Math.floor(yearsElapsed / 432) * 3)
            );

            if (calendarRules == RivendellCalendar.REFORMED_RULES) {
                weekDay = (
                    yearsElapsed * 365
                    + Math.floor(startYear / 4)
                    - Math.floor(startYear / 100)
                    + Math.floor(startYear / 400)
                );
            }

            var dates = [{
                "date": "Yestarë",
                "month": 0,
                "weekDay": weekDay % 6,
                "gregorian": gregorianDate
            }];
            weekDay++;

            if (this.datesMatch(today, gregorianDate)) {
                todayRivendell = dates[0];
            }

            gregorianDate = this.getNextDate(gregorianDate);

            for (var month = 0; month < 6; month++) {
                var maxdays = 54;

                switch (month) {
                    case 1:
                    case 4:
                        maxdays = 72;
                        break;
                    case 3:
                        var enderiCount = 3;
                        if (calendarRules == RivendellCalendar.TRADITIONAL_RULES
                            && this.isRivendellLeapYear(gregorianDate)) {
                            enderiCount = 6;
                        }
                        for (var enderi = 0;
                             enderi < enderiCount;
                             enderi++, weekDay++, gregorianDate = this.getNextDate(gregorianDate)) {
                            dates.push({
                                "date": "Enderë",
                                "month": month,
                                "weekDay": weekDay % 6,
                                "gregorian": gregorianDate
                            });

                            if (this.datesMatch(today, gregorianDate)) {
                                todayRivendell = dates[dates.length - 1];
                            }
                        }
                        break;
                }

                for (var day = 1;
                     day <= maxdays;
                     day++, weekDay++, gregorianDate = this.getNextDate(gregorianDate)) {
                    dates.push({
                        "day": day,
                        "month": month,
                        "weekDay": weekDay % 6,
                        "gregorian": gregorianDate
                    });

                    if (this.datesMatch(today, gregorianDate)) {
                        todayRivendell = dates[dates.length - 1];
                    }
                }
            }

            dates.push({
                "date": "Mettarë",
                "month": 5,
                "weekDay": weekDay % 6,
                "gregorian": gregorianDate
            });

            if (this.datesMatch(today, gregorianDate)) {
                todayRivendell = dates[dates.length - 1];
            }

            if (calendarRules == RivendellCalendar.REFORMED_RULES && this.isLeapYear(gregorianDate)) {
                gregorianDate = this.getNextDate(gregorianDate);
                weekDay++;

                dates.push({
                    "date": "Leap Enderë",
                    "month": 5,
                    "weekDay": weekDay % 6,
                    "gregorian": gregorianDate
                });

                if (this.datesMatch(today, gregorianDate)) {
                    todayRivendell = dates[dates.length - 1];
                }
            }

            return {
                dates: dates,
                today: today,
                todayRivendell: todayRivendell
            };
        },

        onCalendarStartChange: function(event) {
            var startDay = event.target.value;
            var calendar = this.makeCalendarDates(this.state.calendar.today, this.state.calendarRules, startDay);
            this.setState({
                startDay: startDay,
                calendar: calendar,
                monthView: this.getUpdatedMonthView(calendar.todayRivendell.month)
            });
        },

        onCalendarRulesChange: function(event) {
            var calendarRules = event.target.value;
            var startDay = calendarRules == RivendellCalendar.REFORMED_RULES ? 25 : this.state.startDay;
            var calendar = this.makeCalendarDates(this.state.calendar.today, calendarRules, startDay);
            this.setState({
                calendarRules: calendarRules,
                startDay: startDay,
                calendar: calendar,
                monthView: this.getUpdatedMonthView(calendar.todayRivendell.month)
            });
        },

        renderDay: function(date, today) {
            var language = this.state.language;

            switch (date.date) {
                case "Yestarë":
                    return (
                        <IntercalaryDay key="RivendellNewYear"
                                        name={language == LanguagePicker.ENGLISH ? "First Day" : "Yestarë"}
                                        description="Rivendell New Year's Day!"
                                        currentDate={today}
                                        gregorian={date.gregorian} />
                    );

                case "Enderë":
                    return (
                        <IntercalaryDay key={"Middleday-" + date.weekDay}
                                        name={language == LanguagePicker.ENGLISH ? "Middleday" : "Enderë"}
                                        description="Middleday"
                                        currentDate={today}
                                        gregorian={date.gregorian} />
                    );

                case "Leap Enderë":
                    return (
                        <IntercalaryDay key={"Middleday-" + date.weekDay}
                                        name={language == LanguagePicker.ENGLISH ? "Leap Middleday" : "Leap Enderë"}
                                        description="Middleday"
                                        currentDate={today}
                                        gregorian={date.gregorian} />
                    );

                case "Mettarë":
                    return (
                        <IntercalaryDay key="RivendellNewYearsEve"
                                        name={language == LanguagePicker.ENGLISH ? "Last Day" : "Mettarë"}
                                        description="Rivendell New Year's Eve!"
                                        currentDate={today}
                                        gregorian={date.gregorian} />
                    );

                default:
                    var month = RivendellCalendar.months[date.month];
                    var weekday = RivendellCalendar.weekdays[date.weekDay];

                    return (
                        <DateCell key={date.day + month[language]}
                                  date={date}
                                  currentDate={today}
                                  month={month[language]}
                                  description={month.description}
                                  weekday={weekday[language]}
                                  className={month.className}/>
                    );
            }
        },

        renderMonth: function() {
            var today = this.state.calendar.today;
            var dates = this.state.calendar.dates;
            var monthView = this.state.monthView;

            var week = [];
            var weeks = [];

            for (var i = 0, date = dates[i];
                 i < dates.length && date.month < monthView;
                 i++, date = dates[i]) {
                // seek ahead to current month view
            }

            for (var weekday = 0; weekday < date.weekDay; weekday++) {
                week.push(<WeekDayHeaderCell key={'rivendell-month-filler-' + weekday} />);
            }

            for (; i < dates.length && (monthView < 0 || monthView == date.month); i++, date = dates[i]) {
                week.push(this.renderDay(date, today));

                if ((date.weekDay + 1) % 6 === 0) {
                    weeks.push(<tr key={"rivendell-week-" + (weeks.length + 1)} >{week}</tr>);
                    week = [];
                }
            }

            if (monthView == 2) {
                date = dates[i];
                for (; date.date == "Enderë"; i++, date = dates[i]) {
                    week.push(this.renderDay(date, today));

                    if ((date.weekDay + 1) % 6 === 0) {
                        weeks.push(<tr key={"rivendell-week-" + (weeks.length + 1)} >{week}</tr>);
                        week = [];
                    }
                }
            }

            if (week.length > 0) {
                weeks.push(<tr key={"rivendell-week-" + (weeks.length + 1)} >{week}</tr>);
            }

            return weeks;
        },

        renderYear: function() {
            var today = this.state.calendar.today;
            var dates = this.state.calendar.dates;

            var week = [];
            var weeks = [];

            for (var weekday = 0; weekday < dates[0].weekDay; weekday++) {
                week.push(<WeekDayHeaderCell key={'rivendell-month-filler-' + weekday} />);
            }

            for (var i = 0, date = dates[i]; i < dates.length; i++, date = dates[i]) {
                week.push(this.renderDay(date, today));

                if ((date.weekDay + 1) % 6 === 0) {
                    weeks.push(<tr key={"rivendell-week-" + (weeks.length + 1)} >{week}</tr>);
                    week = [];
                }
            }

            if (week.length > 0) {
                weeks.push(<tr key={"rivendell-week-" + (weeks.length + 1)} >{week}</tr>);
            }

            return weeks;
        },

        renderCalendarControls: function () {
            var language = this.state.language;
            var monthNames = RivendellCalendar.months.map(function(month) {
                return month[language];
            });

            return (
                <tr>
                    <td className='rivendell-calendar-controls' >
                        {this.renderLanguagePicker()}
                    </td>
                    <td className='rivendell-calendar-controls month-picker-container' colSpan='3'>
                        {this.renderMonthViewPicker(monthNames)}
                    </td>
                    <td className='rivendell-calendar-controls' colSpan='2'>
                        Start reckoning from
                        <br />
                        March
                        <select value={this.state.startDay}
                                onChange={this.onCalendarStartChange} >
                            <option value='20'>20th</option>
                            <option value='21'>21st</option>
                            <option value='22'>22nd</option>
                            <option value='23'>23rd</option>
                            <option value='24'>24th</option>
                            <option value='25'>25th</option>
                            <option value='26'>26th</option>
                            <option value='27'>27th</option>
                            <option value='28'>28th</option>
                            <option value='29'>29th</option>
                        </select>
                        <select value={this.state.calendarRules}
                                onChange={this.onCalendarRulesChange} >
                            <option value={RivendellCalendar.TRADITIONAL_RULES}>Traditional Rules</option>
                            <option value={RivendellCalendar.REFORMED_RULES}>Reformed Rules</option>
                        </select>
                    </td>
                </tr>
            );
        },

        render: function () {
            var language = this.state.language;
            var weekDayHeader = (
                <tr>
                    {RivendellCalendar.weekdays.map(function (weekday) {
                        var weekdayName = weekday[language];
                        return (
                            <WeekDayHeaderCell key={weekdayName}
                                               name={weekdayName}
                                               description={weekday.description} />
                        );
                    })}
                </tr>
            );

            var weeks = this.state.monthView < 0 ? this.renderYear() : this.renderMonth();

            var controls = this.state.calendarControls ? this.renderCalendarControls() : null;
            var caption = this.props.caption ?
                (<caption className='rivendell-caption'>{this.props.caption}</caption>)
                : null;

            return (
                <table className={this.props.className} >
                    {caption}
                    <thead>
                        {controls}
                        {weekDayHeader}
                    </thead>
                    <tbody>
                        {weeks}
                    </tbody>
                </table>
            );
        }
    });

    var NumenorCalendar = React.createClass({
        mixins: [CalendarCommon, MonthViewPicker, MonthViewLayout, LanguagePicker],

        statics: {
            RECKONING_KINGS: "kings",
            RECKONING_STEWARDS: "stewards",
            RECKONING_NEW: "new",

            weekdays: [
                {
                    english: "Stars Day",
                    quenya: "Elenya",
                    sindarin: "Orgilion",
                    description: "English: Stars Day\nQuenya: Elenya\nSindarin: Orgilion"
                },
                {
                    english: "Sun Day",
                    quenya: "Anarya",
                    sindarin: "Oranor",
                    description: "English: Sun Day\nQuenya: Anarya\nSindarin: Oranor"
                },
                {
                    english: "Moon Day",
                    quenya: "Isilya",
                    sindarin: "Orithil",
                    description: "English: Moon Day\nQuenya: Isilya\nSindarin: Orithil"
                },
                {
                    english: "White Tree's Day",
                    quenya: "Aldëa",
                    sindarin: "Orgaladh",
                    description: "English: White Tree's Day\nQuenya: Aldëa\nSindarin: Orgaladh"
                },
                {
                    english: "Heavens Day",
                    quenya: "Menelya",
                    sindarin: "Ormenel",
                    description: "English: Heavens Day\nQuenya: Menelya\nSindarin: Ormenel"
                },
                {
                    english: "Sea Day",
                    quenya: "Eärenya",
                    sindarin: "Oraearon",
                    description: "English: Sea Day\nQuenya: Eärenya\nSindarin: Oraearon"
                },
                {
                    english: "Valar Day",
                    quenya: "Valanya or Tárion",
                    sindarin: "Orbelain or Rodyn",
                    description: "English: Valar Day\nQuenya: Valanya or Tárion\nSindarin: Orbelain or Rodyn"
                }
            ],

            months: [
                {
                    english: "New Sun",
                    quenya: "Narvinyë",
                    sindarin: "Narwain",
                    description: "English: New Sun\nQuenya: Narvinyë\nSindarin: Narwain",
                    className: "afteryule"
                },
                {
                    english: "Wet Month",
                    quenya: "Nénimë",
                    sindarin: "Nínui",
                    description: "English: Wet Month\nQuenya: Nénimë\nSindarin: Nínui",
                    className: "solmath"
                },
                {
                    english: "Windy Month",
                    quenya: "Súlimë",
                    sindarin: "Gwaeron",
                    description: "English: Windy Month\nQuenya: Súlimë\nSindarin: Gwaeron",
                    className: "rethe"
                },
                {
                    english: "Budding Month",
                    quenya: "Víressë",
                    sindarin: "Gwirith",
                    description: "English: Spring/Budding Month\nQuenya: Víressë\nSindarin: Gwirith",
                    className: "astron"
                },
                {
                    english: "Flower Month",
                    quenya: "Lótessë",
                    sindarin: "Lothron",
                    description: "English: Flower Month\nQuenya: Lótessë\nSindarin: Lothron",
                    className: "thrimidge"
                },
                {
                    english: "Sunny Month",
                    quenya: "Nárië",
                    sindarin: "Nórui",
                    description: "English: Sunny Month\nQuenya: Nárië\nSindarin: Nórui",
                    className: "forelithe"
                },
                {
                    english: "Cutting Month",
                    quenya: "Cermië",
                    sindarin: "Cerveth",
                    description: "English: Cutting Month\nQuenya: Cermië\nSindarin: Cerveth",
                    className: "afterlithe"
                },
                {
                    english: "Hot Month",
                    quenya: "Urimë",
                    sindarin: "Urui",
                    description: "English: Hot Month\nQuenya: Urimë\nSindarin: Urui",
                    className: "wedmath"
                },
                {
                    english: "Harvest Month",
                    quenya: "Yavannië",
                    sindarin: "Ivanneth",
                    description: "English: Harvest/Fruit-giving Month\nQuenya: Yavannië\nSindarin: Ivanneth",
                    className: "halimath"
                },
                {
                    english: "Sun Waning",
                    quenya: "Narquelië",
                    sindarin: "Narbeleth",
                    description: "English: Sun Waning/Fading\nQuenya: Narquelië\nSindarin: Narbeleth",
                    className: "winterfilth"
                },
                {
                    english: "Misty Month",
                    quenya: "Hísimë",
                    sindarin: "Hithui",
                    description: "English: Misty Month\nQuenya: Hísimë\nSindarin: Hithui",
                    className: "blotmath"
                },
                {
                    english: "Cold Month",
                    quenya: "Ringarë",
                    sindarin: "Girithron",
                    description: "English: Cold/Shivering Month\nQuenya: Ringarë\nSindarin: Girithron",
                    className: "foreyule"
                }
            ],

            getNewYearDate: function (today) {
                var startYear = today.getFullYear();
                if (today.getMonth() < 11 || today.getDate() < 21) {
                    startYear--;
                }

                return new Date(startYear, 11, 21, 0, 0, 0);
            },

            convertGregorianWeekday: function (weekday) {
                return (weekday+6)%7;
            }
        },

        getWeekdays: function () {
            return NumenorCalendar.weekdays;
        },
        getMonths: function () {
            return NumenorCalendar.months;
        },

        getInitialState: function() {
            var calendarControls = this.props.calendarControls !== false;
            var language = this.props.language || LanguagePicker.QUENYA;
            var today = this.props.date || new Date();
            var monthViewLayout = this.props.monthViewLayout || MonthViewLayout.VERTICAL;
            var reckoning = this.props.reckoning || NumenorCalendar.RECKONING_KINGS;

            var calendar = this.makeCalendarDates(today, reckoning);
            var monthView = this.props.yearView ? -1 : calendar.todayNumenor.month;

            return {
                calendarControls: calendarControls,
                calendar: calendar,
                monthView: monthView,
                monthViewLayout: monthViewLayout,
                reckoning: reckoning,
                language: language
            };
        },

        componentWillReceiveProps: function(nextProps) {
            var today = nextProps.date;
            var calendar = this.state.calendar;

            if (today && !this.datesMatch(today, calendar.today)) {
                calendar = this.makeCalendarDates(today, this.state.reckoning);
            }
            this.setState({
                calendar: calendar,
                monthView: nextProps.yearView ?
                    -1 :
                    this.getUpdatedMonthView(calendar.todayNumenor.month)
            });
        },

        onStartMonthChange: function (event) {
            var reckoning = event.target.value;
            var calendar = this.makeCalendarDates(this.state.calendar.today, reckoning);

            this.setState({
                calendar: calendar,
                monthView: this.getUpdatedMonthView(calendar.todayNumenor.month),
                reckoning: reckoning
            });
        },

        getNewReckoningNewYearDate: function (today) {
            var startYear = today.getFullYear();
            var thisMonth = today.getMonth();
            var thisDate = today.getDate();

            if (thisMonth < 2) {
                startYear--;
            } else if (thisMonth == 2) {
                if (thisDate < 15 || (!this.isLeapYear(today) && thisDate < 16)) {
                    startYear--;
                }
            }

            var newYearDate = new Date(startYear, 2, 16, 0, 0, 0);
            if (this.isLeapYear(newYearDate)) {
                newYearDate.setDate(15);
            }

            return newYearDate;
        },

        makeCalendarDates: function(today, reckoning) {
            var kingsReckoning = reckoning == NumenorCalendar.RECKONING_KINGS;
            var stewardsReckoning = reckoning == NumenorCalendar.RECKONING_STEWARDS;
            var newReckoning = reckoning == NumenorCalendar.RECKONING_NEW;
            var gregorianDate =
                newReckoning ?
                    this.getNewReckoningNewYearDate(today) :
                    NumenorCalendar.getNewYearDate(today);
            var todayNumenor;

            var dates = [];

            for (var month = 0; month < 12; month++) {
                var maxdays = 30;

                switch (month) {
                    case 0:
                        dates.push({
                            "date": "Yestarë",
                            "month": 0,
                            "weekDay": NumenorCalendar.convertGregorianWeekday(gregorianDate.getDay()),
                            "gregorian": gregorianDate
                        });

                        if (this.datesMatch(today, gregorianDate)) {
                            todayNumenor = dates[0];
                        }
                        gregorianDate = this.getNextDate(gregorianDate);

                        break;

                    case 5:
                    case 6:
                        if (kingsReckoning) maxdays = 31;
                        break;
                }

                for (var day = 1;
                     day <= maxdays;
                     day++, gregorianDate = this.getNextDate(gregorianDate)) {
                    dates.push({
                        "day": day,
                        "month": month,
                        "weekDay": NumenorCalendar.convertGregorianWeekday(gregorianDate.getDay()),
                        "gregorian": gregorianDate
                    });

                    if (this.datesMatch(today, gregorianDate)) {
                        todayNumenor = dates[dates.length-1];
                    }
                }

                switch (month) {
                    case 2:
                        if (stewardsReckoning) {
                            dates.push({
                                "date": "Tuilérë",
                                "month": month + 1,
                                "weekDay": NumenorCalendar.convertGregorianWeekday(gregorianDate.getDay()),
                                "gregorian": gregorianDate
                            });

                            if (this.datesMatch(today, gregorianDate)) {
                                todayNumenor = dates[dates.length-1];
                            }
                            gregorianDate = this.getNextDate(gregorianDate);
                        }

                        break;

                    case 5:
                        var leapYear = this.isLeapYear(gregorianDate);

                        if (leapYear && newReckoning) {
                            dates.push({
                                "date": "Cormarë",
                                "month": month,
                                "weekDay": NumenorCalendar.convertGregorianWeekday(gregorianDate.getDay()),
                                "gregorian": gregorianDate
                            });

                            if (this.datesMatch(today, gregorianDate)) {
                                todayNumenor = dates[dates.length-1];
                            }
                            gregorianDate = this.getNextDate(gregorianDate);
                        }

                        if (leapYear || newReckoning) {
                            dates.push({
                                "date": "Enderë",
                                "month": month + 1,
                                "weekDay": NumenorCalendar.convertGregorianWeekday(gregorianDate.getDay()),
                                "gregorian": gregorianDate
                            });

                            if (this.datesMatch(today, gregorianDate)) {
                                todayNumenor = dates[dates.length-1];
                            }
                            gregorianDate = this.getNextDate(gregorianDate);
                        }

                        if (!leapYear || newReckoning) {
                            dates.push({
                                "date": "Loëndë",
                                "month": month + 1,
                                "weekDay": NumenorCalendar.convertGregorianWeekday(gregorianDate.getDay()),
                                "gregorian": gregorianDate
                            });

                            if (this.datesMatch(today, gregorianDate)) {
                                todayNumenor = dates[dates.length-1];
                            }
                            gregorianDate = this.getNextDate(gregorianDate);
                        }

                        if (leapYear || newReckoning) {
                            dates.push({
                                "date": "Enderë",
                                "month": month + 1,
                                "weekDay": NumenorCalendar.convertGregorianWeekday(gregorianDate.getDay()),
                                "gregorian": gregorianDate
                            });

                            if (this.datesMatch(today, gregorianDate)) {
                                todayNumenor = dates[dates.length-1];
                            }
                            gregorianDate = this.getNextDate(gregorianDate);
                        }

                        break;

                    case 8:
                        if (stewardsReckoning) {
                            dates.push({
                                "date": "Yáviérë",
                                "month": month + 1,
                                "weekDay": NumenorCalendar.convertGregorianWeekday(gregorianDate.getDay()),
                                "gregorian": gregorianDate
                            });

                            if (this.datesMatch(today, gregorianDate)) {
                                todayNumenor = dates[dates.length-1];
                            }
                            gregorianDate = this.getNextDate(gregorianDate);
                        }

                        break;

                    case 11:
                        dates.push({
                            "date": "Mettarë",
                            "month": 11,
                            "weekDay": NumenorCalendar.convertGregorianWeekday(gregorianDate.getDay()),
                            "gregorian": gregorianDate
                        });

                        if (this.datesMatch(today, gregorianDate)) {
                            todayNumenor = dates[dates.length-1];
                        }
                        gregorianDate = this.getNextDate(gregorianDate);

                        break;
                }
            }

            return {
                dates: dates,
                today: today,
                todayNumenor: todayNumenor
            };
        },

        renderDay: function(date, today) {
            var language = this.state.language;
            var reckoning = this.state.reckoning;
            var reckoningDesc =
                reckoning == NumenorCalendar.RECKONING_NEW ?
                    "New Reckoning" :
                    reckoning == NumenorCalendar.RECKONING_KINGS ?
                        "Kings' Reckoning" :
                        "Stewards' Reckoning";

            switch (date.date) {
                case "Yestarë":
                    return (
                        <IntercalaryDay key="NumenorianNewYear"
                                        name={language == LanguagePicker.ENGLISH ? "First Day" : "Yestarë"}
                                        description={reckoningDesc + " New Year's Day!"}
                                        currentDate={today}
                                        gregorian={date.gregorian} />
                    );

                case "Tuilérë":
                    return (
                        <IntercalaryDay key="Stewards-Midspring"
                                        name={language == LanguagePicker.ENGLISH ? "Midspring Day" : "Tuilérë"}
                                        description="Stewards' Midspring Day"
                                        currentDate={today}
                                        gregorian={date.gregorian} />
                    );

                case "Cormarë":
                    return (
                        <IntercalaryDay key={"Numenorian-Leapday" + date.weekDay}
                                        name={language == LanguagePicker.ENGLISH ? "Ring Bearer's Day" : "Cormarë"}
                                        description="Ring Bearer's Day"
                                        currentDate={today}
                                        gregorian={date.gregorian} />
                    );

                case "Loëndë":
                    return (
                        <IntercalaryDay key={"Numenorian-Midyear" + date.weekDay}
                                        name={language == LanguagePicker.ENGLISH ? "Midyear's Day" : "Loëndë"}
                                        description="Midyear's Day"
                                        currentDate={today}
                                        gregorian={date.gregorian} />
                    );

                case "Enderë":
                    return (
                        <IntercalaryDay key={"NumenorianMiddleday-" + date.weekDay}
                                        name={language == LanguagePicker.ENGLISH ? "Middleday" : "Enderë"}
                                        description="Middleday"
                                        currentDate={today}
                                        gregorian={date.gregorian} />
                    );

                case "Yáviérë":
                    return (
                        <IntercalaryDay key={"Stewards-Midautumn"}
                                        name={language == LanguagePicker.ENGLISH ? "Midautumn Day" : "Yáviérë"}
                                        description="Stewards' Midautumn Day"
                                        currentDate={today}
                                        gregorian={date.gregorian} />
                    );

                case "Mettarë":
                    return (
                        <IntercalaryDay key="NumenorianNewYearsEve"
                                        name={language == LanguagePicker.ENGLISH ? "Last Day" : "Mettarë"}
                                        description={reckoningDesc + " New Year's Eve!"}
                                        currentDate={today}
                                        gregorian={date.gregorian} />
                    );

                default:
                    var startMonth = reckoning == NumenorCalendar.RECKONING_NEW ? 3 : 0;
                    var month = NumenorCalendar.months[(date.month+startMonth)%12];
                    var weekday = NumenorCalendar.weekdays[date.weekDay];

                    return (
                        <DateCell key={date.day + month[language]}
                                  date={date}
                                  currentDate={today}
                                  month={month[language]}
                                  description={month.description}
                                  weekday={weekday[language]}
                                  className={month.className}/>
                    );
            }
        },

        renderMonth: function() {
            var today = this.state.calendar.today;
            var dates = this.state.calendar.dates;
            var monthView = this.state.monthView;

            var week = [];
            var weeks = [];

            for (var i = 0, date = dates[i];
                 i < dates.length && date.month != monthView;
                 i++, date = dates[i]) {
                // seek ahead to current month view
            }

            for (var weekday = 0; weekday < dates[i].weekDay; weekday++) {
                week.push(<WeekDayHeaderCell key={'numenor-month-filler-' + weekday} />);
            }

            for (;
                 i < dates.length && (monthView < 0 || monthView == dates[i].month);
                 i++, date = dates[i]) {
                week.push(this.renderDay(date, today));

                if ((date.weekDay + 1) % 7 === 0) {
                    weeks.push(<tr key={"numenor-week-" + (weeks.length + 1)} >{week}</tr>);
                    week = [];
                }
            }

            switch (monthView) {
                case 2:
                    if (date.date == "Tuilérë") {
                        week.push(this.renderDay(date, today));
                    }

                    break;

                case 5:
                    date = dates[i];
                    for (; date.date == "Enderë" || date.date == "Loëndë"; i++, date = dates[i]) {
                        week.push(this.renderDay(date, today));

                        if ((date.weekDay + 1) % 7 === 0) {
                            weeks.push(<tr key={"numenor-week-" + (weeks.length + 1)} >{week}</tr>);
                            week = [];
                        }
                    }

                    break;

                case 8:
                    if (date.date == "Yáviérë") {
                        week.push(this.renderDay(date, today));
                    }

                    break;
            }

            if (week.length > 0) {
                weeks.push(<tr key={"numenor-week-" + (weeks.length + 1)} >{week}</tr>);
            }

            return weeks;
        },

        renderMonthVertical: function() {
            var today = this.state.calendar.today;
            var dates = this.state.calendar.dates;
            var monthView = this.state.monthView;
            var language = this.state.language;

            var weeks = NumenorCalendar.weekdays.map(function (weekday) {
                var weekdayName = weekday[language];
                return [(
                    <WeekDayHeaderCell key={weekdayName}
                                       name={weekdayName}
                                       description={weekday.description}
                                       colSpan='2' />
                )];
            });

            for (var i = 0, date = dates[i];
                 i < dates.length && date.month != monthView;
                 i++, date = dates[i]) {
                // seek ahead to current month view
            }

            for (var weekday = 0; weekday < dates[i].weekDay; weekday++) {
                weeks[weekday].push(<WeekDayHeaderCell key={'numenor-month-filler-' + weekday} />);
            }

            for (;
                 i < dates.length && (monthView < 0 || monthView == dates[i].month);
                 i++, date = dates[i]) {
                weeks[date.weekDay].push(this.renderDay(date, today));
            }

            switch (monthView) {
                case 2:
                    if (date.date == "Tuilérë") {
                        weeks[date.weekDay].push(this.renderDay(date, today));
                    }

                    break;

                case 5:
                    date = dates[i];
                    for (; date.date == "Enderë" || date.date == "Loëndë"; i++, date = dates[i]) {
                        weeks[date.weekDay].push(this.renderDay(date, today));
                    }

                    break;
                case 8:
                    if (date.date == "Yáviérë") {
                        weeks[date.weekDay].push(this.renderDay(date, today));
                    }

                    break;
            }

            if (weeks[0].length > 6) {
                weeks = NumenorCalendar.weekdays.map(function (weekday, i) {
                    var week = weeks[i];
                    var weekdayName = weekday[language];

                    week.shift();
                    week.unshift(
                        <WeekDayHeaderCell key={weekdayName}
                                           name={weekdayName}
                                           description={weekday.description} />
                    );

                    return week;
                });
            }

            return weeks.map(function (week, i) {
                return (<tr key={"numenor-week-" + (i + 1)} >{week}</tr>);
            });
        },

        renderYear: function() {
            var today = this.state.calendar.today;
            var dates = this.state.calendar.dates;

            var week = [];
            var weeks = [];

            for (var weekday = 0; weekday < dates[0].weekDay; weekday++) {
                week.push(<WeekDayHeaderCell key={'numenor-month-filler-' + weekday} />);
            }

            for (var i = 0, date = dates[i]; i < dates.length; i++, date = dates[i]) {
                week.push(this.renderDay(date, today));

                if ((date.weekDay + 1) % 7 === 0) {
                    weeks.push(<tr key={"numenor-week-" + (weeks.length + 1)} >{week}</tr>);
                    week = [];
                }
            }

            if (week.length > 0) {
                weeks.push(<tr key={"numenor-week-" + (weeks.length + 1)} >{week}</tr>);
            }

            return weeks;
        },

        renderCalendarControls: function () {
            var reckoning = this.state.reckoning;
            var startMonth = reckoning == NumenorCalendar.RECKONING_NEW ? 3 : 0;
            var language = this.state.language;
            var monthNames = [];
            for (var i = startMonth; i < (NumenorCalendar.months.length + startMonth); i++) {
                monthNames.push(NumenorCalendar.months[i%12][language]);
            }

            return (
                <tr>
                    <td colSpan='2' className='numenor-calendar-controls' >
                        <select value={reckoning}
                                onChange={this.onStartMonthChange} >
                            <option value={NumenorCalendar.RECKONING_KINGS}>Kings' Reckoning</option>
                            <option value={NumenorCalendar.RECKONING_STEWARDS}>Stewards' Reckoning</option>
                            <option value={NumenorCalendar.RECKONING_NEW}>New Reckoning</option>
                        </select>
                    </td>
                    <td className='numenor-calendar-controls' >
                        {this.renderLanguagePicker()}
                    </td>
                    <td colSpan='3' className='numenor-calendar-controls month-picker-container' >
                        {this.renderMonthViewPicker(monthNames)}
                    </td>
                    <td className='numenor-calendar-controls' >
                        {this.renderMonthViewLayoutControls()}
                    </td>
                </tr>
            );
        },

        render: function () {
            var language = this.state.language;
            var weekDayHeader = (
                <tr>
                    {NumenorCalendar.weekdays.map(function (weekday) {
                        var weekdayName = weekday[language];
                        return (
                            <WeekDayHeaderCell key={weekdayName}
                                               name={weekdayName}
                                               description={weekday.description} />
                        );
                    })}
                </tr>
            );

            var weeks;
            if (this.state.monthView < 0) {
                weeks = this.renderYear();
            } else if (this.state.monthViewLayout == MonthViewLayout.VERTICAL) {
                weeks = this.renderMonthVertical();
                weekDayHeader = this.renderMonthVerticalHeader('numenor-vertical-header-filler');
            } else {
                weeks = this.renderMonth();
            }

            var controls = this.state.calendarControls ? this.renderCalendarControls() : null;
            var caption = this.props.caption ?
                (<caption className='numenor-caption'>{this.props.caption}</caption>)
                : null;

            return (
                <table className={this.props.className} >
                    {caption}
                    <thead>
                    {controls}
                    {weekDayHeader}
                    </thead>
                    <tbody>
                    {weeks}
                    </tbody>
                </table>
            );
        }
    });

    var WeekDayHeaderCell = React.createClass({
        render: function() {
            return (
                <td className='weekday-header'
                    colSpan={this.props.colSpan}
                    title={this.props.description} >
                    {this.props.name}
                </td>
            );
        }
    });

    var DateCell = React.createClass({
        mixins: [CalendarCommon],

        render: function() {
            var date = this.props.date;
            var dateTitle = this.props.description;
            var className = this.props.className;
            var currentDate = this.props.currentDate;
            var gregorianDate = date.gregorian;
            var dayColor = this.getDateColor(className, gregorianDate, currentDate);

            return (
                <td className={dayColor} title={dateTitle + "\nWeekday: " + this.props.weekday} >
                    {date.day} {(date.day == 1) ? this.props.month : ''}
                    <br />
                    {this.getGregorianDateDisplay(gregorianDate)}
                </td>
            );
        }
    });

    var IntercalaryDay = React.createClass({
        mixins: [CalendarCommon],

        render: function() {
            var dateTitle = this.props.description;
            var currentDate = this.props.currentDate;

            var gregorianDate = this.props.gregorian;
            var dayColor = this.getDateColor('holiday', gregorianDate, currentDate);

            if (this.props.dayExtra) {
                var gregorianExtra = this.props.gregorianExtra;
                dayColor = this.getDateColor(dayColor, gregorianExtra, currentDate);

                return (
                    <td className={dayColor} title={dateTitle} >
                        {this.props.name}
                        <br />
                        {this.getGregorianDateDisplay(gregorianDate)}
                        <hr />
                        {this.props.dayExtra}
                        <br />
                        {this.getGregorianDateDisplay(gregorianExtra)}
                    </td>
                );
            }

            return (
                <td className={dayColor} title={dateTitle} >
                    {this.props.name}
                    <br />
                    {this.getGregorianDateDisplay(gregorianDate)}
                </td>
            );
        }
    });

    var TolkienCalendars = React.createClass({
        getInitialState: function() {
            return ({
                date: new Date(),
                shireAlign: false,
                rivendellAlign: false
            });
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
                            <ShireCalendar caption="Shire Reckoning"
                                           date={currentDate}
                                           className={shireClassName}
                                           yearView={shireAlign || rivendellAlign} />
                        </td>
                        <td style={{verticalAlign: 'top'}}>
                            <RivendellCalendar caption="Rivendell Reckoning"
                                               date={currentDate}
                                               className={rivendellClassName}
                                               yearView={shireAlign || rivendellAlign} />
                        </td>
                    </tr>
                    <tr>
                        <td style={{verticalAlign: 'top'}}>
                            <NumenorCalendar caption="Kings' Reckoning"
                                             date={currentDate}
                                             className="shire-calendar" />
                        </td>
                        <td style={{verticalAlign: 'top'}}>
                            <NumenorCalendar caption="Stewards' Reckoning"
                                             reckoning={NumenorCalendar.RECKONING_STEWARDS}
                                             date={currentDate}
                                             className="shire-calendar" />
                        </td>
                    </tr>
                    </tbody>
                </table>
            );
        }
    });

    React.render(
        <TolkienCalendars />,
        document.getElementById("shire-calendar")
    );
});
