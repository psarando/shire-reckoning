/**
 * Copyright (C) 2014 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 * With thanks to http://shire-reckoning.com/calendar.html for all the helpful info.
 */

$(window).load(function(){
    var weekdays = ['Sterday', 'Sunday', 'Monday', 'Trewsday', 'Hevensday', 'Mersday', 'Highday'];
    var weekdayDescriptions =
     ["Stars of Varda Day (sterrendei).",
      "Sun Day (sunnendei).",
      "Moon Day (monendei).",
      "Two Trees of Valinor Day (trewesdei).",
      "Heavens Day (hevensdei).",
      "Sea Day (meresdei).",
      "Valar Day (hihdei)."];
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
    var monthColors = ['afteryule',
                       'solmath',
                       'rethe',
                       'astron',
                       'thrimidge',
                       'forelithe',
                       'afterlithe',
                       'wedmath',
                       'halimath',
                       'winterfilth',
                       'blotmath',
                       'foreyule'];
    var monthDescriptions =
      ["Afteryule:\nThe month after the winter solstice (Midwinter) feast of G&emacr;ola or Gi&uacute;l=Yule.",
       "Solmath:\nSol Month. The return of the sol=sun.\nMuddy Month.",
       "Rethe:\nMonth of the Goddess Hr&emacr;&thorn; or Hretha.\nMonth of Wildness.",
       "Astron:\nSpring month.\nNamed after the Goddess &Emacr;ostre.",
       "Thrimidge:\nThe month of plenty, when cows were given thri+milching=three milkings daily.",
       "Forelithe:\nThe month before the summer solstice (Midsummer), when Litha=gentle weather encouraged voyages.\nCalm or Navigable Month.",
       "Afterlithe:\nThe month after the summer solstice (Midsummer).\nMeadow Month.",
       "Wedmath:\nWhen fields were beset by weod=weeds.\nPlant Month.",
       "Halimath:\nThe haleg=holy month of sacred rites.\nHarvest Month.",
       "Winterfilth:\nThe fylleth=filling of winter&apos;s first full moon, according to Bede; Tolkien instead suggests the \"fall\" or arrival of winter, or the \"fall\" of the leaves.\nWine Month.",
       "Blotmath:\nThe month of blod=blood.\nMonth of Sacrifice or Slaughter.",
       "Foreyule:\nThe month before the solstice (Midwinter) feast of G&emacr;ola or Gi&uacute;l=Yule."];

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
            return "highlight";
        }

        return monthColor;
    }

    function makeDateCell(dayColor, title, contents) {
        return "<td class='"+dayColor+"' title='"+title+"'>" + contents + "</td>";
    }

    function addWeek(week) {
        $("#shire-calendar-table").append('<tr>' + week + '</tr>');
    }

    $("#shire-calendar").append("<table id='shire-calendar-table' class='shire-calendar' />");

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
        week += makeDateCell("weekday-header", weekdayDescriptions[day], weekdays[day]);
    }
    addWeek(week);

    var dayColor = getDateColor("holiday", calendarDate, today);
    week = "";
    week += makeDateCell(dayColor, "Midwinter: Shire New Year!", "Yule 2<br/>(" + calendarDate.toDateString() + ")");

    var weekDay = 1;
    for (var month = 0; month < 12; month++) {
        for (var day = 1; day <= 30; day++, weekDay++) {
            var date = (day == 1 ? months[month] + " " + day : day) + "<br />";
            setNextDay(calendarDate);

            week += makeDateCell(getDateColor(monthColors[month], calendarDate, today),
                monthDescriptions[month] + "\n" + weekdays[weekDay%7],
                date + "(" + calendarDate.toDateString() + ")");

            if ((weekDay+1) % 7 === 0) {
                addWeek(week);
                week = "";
            }
        }

        if (month == 5) {
            setNextDay(calendarDate);
            dayColor = getDateColor("holiday", calendarDate, today);
            var lithe1 = "Lithe 1<br />(" + calendarDate.toDateString() + ")<hr>";

            setNextDay(calendarDate);
            dayColor = getDateColor(dayColor, calendarDate, today);
            var midyear = "Mid-Year's Day<br />(" + calendarDate.toDateString() + ")";

            week += makeDateCell(dayColor, "Midsummer&apos;s Eve and Midsummer&apos;s Day!", lithe1 + midyear);
            addWeek(week);

            dayColor = "holiday";
            var overlithe = "";
            var title = "";
            if (isLeapYear(calendarDate)) {
                setNextDay(calendarDate);
                dayColor = getDateColor(dayColor, calendarDate, today);
                overlithe = "OverLithe<br />(" + calendarDate.toDateString() + ")<hr>";
                title = "Shire Leap Day and ";
            }

            setNextDay(calendarDate);
            dayColor = getDateColor(dayColor, calendarDate, today);
            var lithe2 = "Lithe 2<br />(" + calendarDate.toDateString() + ")";
            title += "Day after Midsummer.";
            week = makeDateCell(dayColor, title, overlithe + lithe2);

            weekDay += 2;
        }
    }

    setNextDay(calendarDate);
    dayColor = getDateColor("holiday", calendarDate, today);
    week += makeDateCell(dayColor, "Shire New Year&apos;s Eve!", "Yule 1<br />(" + calendarDate.toDateString() + ")");
    addWeek(week);
});
