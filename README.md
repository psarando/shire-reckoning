Shire Reckoning
===============

This repo contains a couple of scripts that generate calendars showing the current date in J.R.R. Tolkien's 'Shire Reckoning'. One calendar is our Gregorian calendar with the corresponding Shire Reckoning date, and the other is a Shire Reckoning calendar showing the corresponding Gregorian date.

## shire-icalendar.clj -> [shire-reckoning.ics](shire-reckoning.ics)

##### Use [Leiningen](http://leiningen.org) and the [lein-exec plugin](https://github.com/kumarshantanu/lein-exec) to run this from the command-line.

#### This script prints iCalendar formatted dates with corresponding Shire Reckoning dates, which can be saved as an ics file (such as the [shire-reckoning.ics](shire-reckoning.ics) file included in this repo) then imported into a calendaring program, such as Google Calendar. This Shire Reckoning iCalendar is described below:

A calendar of J.R.R. Tolkien's 'Shire Reckoning' dates corresponding to our Gregorian dates, according to http://shire-reckoning.com/calendar.html, which suggests that we "anchor the Shire calendar on the solstice of one particular year, then add the Overlithe every four years thereafter. This [...] could maintain a stable relationship between Shire and modern dates if Shire leap-years were coordinated with those of our own calendar. [...] Under this system we always celebrate the Shire New Year upon our own 21 December."

I chose to start this calendar on the 21st of December 1931, which places the majority of the Shire Reckoning dates in 1932, the year 'The Hobbit' was first completed, and also happens to be a leap-year, a good starting point for marking Overlithe leap-days. Additional month descriptions taken from http://en.wikipedia.org/wiki/Germanic_calendar.

Note: This calendar will erroneously mark June 22 as Overlithe days on centennial years which are not leap-years.

## shire-calendar.html + shire-calendar.js

These files will print a Shire Reckoning Calendar in a browser as a simple HTML table using a little jQuery. The calendar includes each day's corresponding Gregorian date of the current year and highlights the current day on the calendar. Apologies for the not-so-great color scheme used for each month.

## License

Copyright (C) 2014 Paul Sarando

Distributed under the [Eclipse Public License](http://www.eclipse.org/legal/epl-v10.html).
