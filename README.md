Shire Reckoning
===============

This repo contains a couple of scripts that generate calendars showing the current date in J.R.R. Tolkien's 'Shire Reckoning'.
One calendar is a [Shire Reckoning Calendar](http://psarando.github.io/shire-reckoning) showing each day's corresponding Gregorian date,
and the other is our Gregorian calendar with the corresponding Shire Reckoning date (pre-generated in [shire-reckoning.ics](shire-reckoning.ics)).

## [shire-calendar](http://psarando.github.io/shire-reckoning): html + css + javascript

The [html](html) directory contains files that will print a
[Shire Reckoning Calendar and a Rivendell Reckoning Calendar](http://psarando.github.io/shire-reckoning)
in a browser as a simple HTML table.
The calendars include each day's corresponding Gregorian date of the current year and today's date will be highlighted on each calendar.

### Rivendell Reckoning Notes

I chose the original starting date of this calendar as March 25th.
In the Lord of the Rings Appendix D, Tolkien mentions that the first day of the Rivendell Calendar
"corresponded more or less with Shire April 6",
[which corresponds to our March 27th](http://shire-reckoning.com/calendar.html),
but he also guessed that the start of our calendar corresponds "more or less to the Shire January 9".
Since this is [2 days off from when our calendar should start in Shire Reckoning](http://shire-reckoning.com/calendar.html),
It could be that the March 27th start is also 2 days off and the Rivendell Calendar was intended to start on our March 25th as well.

I've also read elsewhere that the calendar is supposed to start on the [Spring Equinox](http://en.wikipedia.org/wiki/Equinox),
but that would put the middle of Lairë (Summer) around June 19th and the 3 Enderi (Middledays) from Sept. 17th - 19th.
[At one time in prehistory](http://www.sym454.org/seasons/), Autumn was the longest of the seasons,
so these dates would have roughly matched during this time (and will again about 4000 years from now),
but these days Summer is the longest season and the Spring Equinox comes relatively earlier than it did back then.
So now the [Autumnal Equionx](http://en.wikipedia.org/wiki/Equinox) usually falls on Sept. 22nd,
and I think the 3 Enderi were intended to occur around this Equionx.

Starting this calendar on March 25th also lets the seasons of this calendar align with traditional seasonal dates of the British Isles,
since [March 25th](https://en.wikipedia.org/wiki/March_25#Holidays_and_observances),
[June 24th](https://en.wikipedia.org/wiki/Midsummer#United_Kingdom) (the middle of Lairë),
and [December 24th](https://en.wikipedia.org/wiki/Christmas_Eve) (the middle of Hrívë)
are important national and religious holidays and feast days in that region.

Note that the Rivendell Calendar starts on March 26th in 2015, but its New Year's Day drifts
back a day with respect to our Gregorian calendar every 4 years until it's leap year adds 3 days every 12 years.
So this Rivendell Calendar does start on March 27th for 4 years, every 12 years, for next few hundred years.

I also noticed that this Rivendell Calendar still advances by a day every 1700 years or so,
even with the rule stated by Tolkien in Appendix D that the extra 3 "leap" Enderi are omitted every 432 years.
Then I noticed that if another extra 3 Enderi are omitted every 4896 years,
then this could account for the 1 day drift about every 1700 years,
so I've included this rule in this calendar just to keep it in sync with the Gregorian Calendar for
the next few thousand years. The Rivendell Calendar should probably make other adjustments to stay
in sync with the actual seasons instead, but that kind of calculation is currently beyond me.


## `shire-icalendar.clj` -> [shire-reckoning.ics](shire-reckoning.ics)

#### This script prints iCalendar formatted dates with corresponding Shire Reckoning dates, which can be saved as an ics file (such as the [shire-reckoning.ics](shire-reckoning.ics) file included in this repo) then imported into a calendaring program, such as Google Calendar or Apple's iCal.
Hint for Google Calendar users: you probably want to create a new, empty calendar (it could be named "Shire Reckoning"), then import the [shire-reckoning.ics](shire-reckoning.ics) events into that calendar.
This way you can easily hide all these events, or delete this new calendar to remove all the events at once, without affecting events in your default calendar, and without having to remove these shire dates one at a time.

#### The Shire Reckoning iCalendar description is provided below:

> A calendar of J.R.R. Tolkien's 'Shire Reckoning' dates corresponding to our Gregorian dates, according to http://shire-reckoning.com/calendar.html, which suggests that we "anchor the Shire calendar on the solstice of one particular year, then add the Overlithe every four years thereafter. This [...] could maintain a stable relationship between Shire and modern dates if Shire leap-years were coordinated with those of our own calendar. [...] Under this system we always celebrate the Shire New Year upon our own 21 December."

> I chose to start this calendar on the 21st of December 1931, which places the majority of the Shire Reckoning dates in 1932, the year 'The Hobbit' was first completed, and also happens to be a leap-year, a good starting point for marking Overlithe leap-days. Additional month descriptions taken from http://en.wikipedia.org/wiki/Germanic_calendar.

> Note: This calendar will erroneously mark June 22 as Overlithe days on centennial years which are not leap-years.

##### Use [Leiningen](http://leiningen.org) and the [lein-exec plugin](https://github.com/kumarshantanu/lein-exec) to run `shire-icalendar.clj` from the command-line.

## License

Copyright (C) 2015 Paul Sarando

Distributed under the [Eclipse Public License](http://www.eclipse.org/legal/epl-v10.html).

With thanks to http://shire-reckoning.com/calendar.html for all the helpful info.
