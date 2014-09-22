$(window).load(function(){
    var weekdays = ['Sterday', 'Sunday', 'Monday', 'Trewsday', 'Hevensday', 'Mersday', 'Highday'];
    var months = ['Afteryule',
                  'Solmath',
                  'Rethe',
                  'Astron',
                  'Thrimidge',
                  'Forelithe',
                  'Afterlithe',
                  'Wedmath',
                  'Halimath',
                  'Winterfilth',
                  'Blotmath',
                  'Foreyule'];
    var monthColors = ['#9CF', // Afteryule
                       '#CCF', // Solmath
                       '#9C3', // Rethe
                       '#3C3', // Astron
                       '#090', // Thrimidge
                       '#360', // Forelithe
                       '#008000', // Afterlithe
                       '#408040', // Wedmath
                       '#C90', // Halimath
                       '#FF8000', // Winterfilth
                       '#800', // Blotmath
                       '#69C']; // Foreyule

    function isLeapYear(date) {
        var year = date.getFullYear();
        return !((year % 4) || (!(year % 100) && (year % 400)));
    }

    function setNextDay(date) {
        date.setDate(date.getDate() + 1);
    }

    function datesMatch(date1, date2) {
        return date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
    }

    function getDateColor(monthColor, date1, date2) {
        if (datesMatch(date1, date2)) {
            return "#CC0";
        }

        return monthColor;
    }

    function makeDateCell(dayColor, contents) {
        return "<td style='background: "+dayColor+";'>" + contents + "</td>";
    }

    function addWeek(week) {
        $("#shire-calendar").append('<tr>' + week + '</tr>');
    }

    var today = new Date();
    var calendarDate = new Date();
    var startYear = today.getFullYear() - 1;
    if (today.getMonth() == 11 && today.getDate() >= 21) {
        startYear++;
    }
    calendarDate.setFullYear(startYear);
    calendarDate.setMonth(11);
    calendarDate.setDate(21);

    var week = "";
    for (var day = 0; day < 7; day++) {
        week += makeDateCell("#FFF", weekdays[day]);
    }
    addWeek(week);

    var dayColor = getDateColor("#FFF", calendarDate, today);
    week = "";
    week += makeDateCell(dayColor, "Yule 2 (MidWinter)<br/>(" + calendarDate.toDateString() + ")");

    var weekDay = 1;
    for (var month = 0; month < 12; month++) {
        for (var day = 1; day <= 30; day++, weekDay++) {
            var date = (day == 1 ? months[month] + "<br/>" + day : day) + "<br />";
            setNextDay(calendarDate);

            week += makeDateCell(getDateColor(monthColors[month], calendarDate, today),
                date + "(" + calendarDate.toDateString() + ")");

            if ((weekDay+1) % 7 === 0) {
                addWeek(week);
                week = "";
            }
        }

        if (month == 5) {
            setNextDay(calendarDate);
            dayColor = getDateColor("#FFF", calendarDate, today);
            var lithe1 = "Lithe 1<br />(" + calendarDate.toDateString() + ")<hr>";

            setNextDay(calendarDate);
            dayColor = getDateColor(dayColor, calendarDate, today);
            var midyear = "Mid-Year's Day<br />(" + calendarDate.toDateString() + ")";

            week += makeDateCell(dayColor, lithe1 + midyear);
            addWeek(week);

            dayColor = "#FFF";
            var overlithe = "";
            if (isLeapYear(calendarDate)) {
                setNextDay(calendarDate);
                dayColor = getDateColor(dayColor, calendarDate, today);
                overlithe = "OverLithe<br />(" + calendarDate.toDateString() + ")<hr>";
            }

            setNextDay(calendarDate);
            dayColor = getDateColor(dayColor, calendarDate, today);
            var lithe2 = "Lithe 2<br />(" + calendarDate.toDateString() + ")";
            week = makeDateCell(dayColor, overlithe + lithe2);

            weekDay += 2;
        }
    }

    setNextDay(calendarDate);
    dayColor = getDateColor("#FFF", calendarDate, today);
    week += makeDateCell(dayColor, "Yule 1<br />(" + calendarDate.toDateString() + ")");
    addWeek(week);
});
