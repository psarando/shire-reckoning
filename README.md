Shire Reckoning
===============

> The months and days, therefore, throughout The Lord of the Rings refer to the Shire Calendar.
>
> ... Mid-year's Day was intended to correspond as nearly as possible to the summer solstice.
> In that case the Shire dates were actually in advance of ours by some ten days...
>
> -- J.R.R. Tolkien, The Lord of the Rings Appendix D

## Contents

* [Introduction](#introduction)
* [Tolkien's Calendars](#tolkiens-calendars)
* [Shire Reckoning Notes](#shire-reckoning-notes)
* [Notes on the visualizations of the calendars of Gondor](#notes-on-the-visualizations-of-the-calendars-of-gondor)
* [Rivendell Reckoning Notes](#rivendell-reckoning-notes)
    * For a general reference for converting a date in the Gregorian calendar, in any year, to a
      date in the Rivendell Reckoning calendar, I recommend using the
      [Reformed Rivendell Reckoning rules](#reformed-rivendell-reckoning)
      (and choosing a non-leap year for dates between February 28 and Rivendell New Year's Day).
    * [Why March 22nd?](#why-march-22nd)
        * [Why not March 29th?](#why-not-march-29th)
    * [Reformed Rivendell Reckoning rules](#reformed-rivendell-reckoning)
        * [Why March 25th?](#why-march-25th)
* [References](#references)
* [shire-reckoning.ics iCalendar](#shire-reckoningicsshire-reckoningics-icalendar)
* [License](#license)

## Introduction

The primary goal of this project is to visualize how the calendars described in
J.R.R. Tolkien's *The Lord of the Rings* Appendix D relate to the
[Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar),
so the Shire Reckoning calendar is displayed according to the reasonable rules suggested by
[Shire-Reckoning.com](http://shire-reckoning.com/calendar.html),
where Shire Mid-year's Day is aligned as much as possible with the contemporary
[summer solstice](https://en.wikipedia.org/wiki/Solstice) (which is usually on June 21st),
and it follows the same leap-day rules of the Gregorian calendar.
This allows it to stay in sync with the Gregorian calendar so that most Shire Reckoning dates
will always fall on the same Gregorian date.

Additionally, these calendars always reckon their dates from midnight to midnight,
just as our modern Gregorian calendar and the Shire Calendar reckon dates.
Note that Tolkien stated in Appendix D that the Gondor calendars reckoned their dates from sunrise to sunrise,
and the Elves reckoned their dates from sunset to sunset.
These calendars also make no attempt to correlate Gregorian years with Shire-reckoning years or the Ages of Middle-earth.

## Tolkien's Calendars

The main library module of this project can generate a visualization of
the calendars described in *The Lord of the Rings* Appendix D in a web browser as simple HTML tables,
labeled with each day's corresponding Gregorian date of the current year,
and with today's date highlighted on each calendar.
These calendars are the [Shire Reckoning, Rivendell Reckoning, and calendars of Gondor:
Kings' Reckoning, Stewards' Reckoning, and the New Reckoning](http://psarando.github.io/shire-reckoning).

More examples of each calendar, as well as installation and usage, can be found in the
[examples directory](http://psarando.github.io/shire-reckoning/examples/):

* [Shire Calendar examples](http://psarando.github.io/shire-reckoning/examples/shire-calendars.html)
* [Rivendell Calendar examples](http://psarando.github.io/shire-reckoning/examples/rivendell-calendars.html)
* [Gondor Calendar examples](http://psarando.github.io/shire-reckoning/examples/gondor-calendars.html)

[![NPM version](https://img.shields.io/npm/v/shire-reckoning.svg)](https://www.npmjs.org/package/shire-reckoning)
These javascript calendars use the [React javascript library](http://facebook.github.io/react/).

### Shire Reckoning Notes

> In the above notes [of Appendix D], as in the narrative,
> I have used our modern names for both months and weekdays,
> though of course neither the Eldar nor the Dúnedain nor the Hobbits actually did so...
>
> All the days, months, and dates are in the Red Book translated into Shire terms, or equated with them in notes.
> The months and days, therefore, throughout The Lord of the Rings refer to the Shire Calendar.
>
> -- J.R.R. Tolkien, The Lord of the Rings Appendix D

In other words,
as Tolkien "translated" the [Red Book of Westmarch](https://en.wikipedia.org/wiki/Red_Book_of_Westmarch)
into English as [The Lord of the Rings](#references),
he "translated" (or rather substituted) the Shire names of the months and weekdays with
[Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar) names,
so that Mersday becomes Thursday and Rethe becomes March in the narrative.

This project's calendar uses the original Shire names by default,
but a control is available in this visualization to display the Shire Calendar with the Gregorian names
Tolkien used as substitutions, and there's also the option to display the calendar
with the alternate month names used in Bree.

To see the descriptions of the month and weekday names in this visualization,
hover your cursor over any day in a month or over a weekday header cell,
and a tooltip will display the description of that month or weekday name.
These descriptions were compiled from
[The Lord of the Rings: A Reader's Companion](#references),
[Shire-Reckoning.com](http://shire-reckoning.com/calendar.html),
and the [Wikipedia article on the pre-latin Germanic calendar](https://en.wikipedia.org/wiki/Germanic_calendar).

#### Layout of days and weeks

The default layout of the individual month views in the Shire Calendar might look odd at first,
with the dates starting at the top of the left column and advancing vertically down the column,
then continuing the next week in the next column (again counting dates from top to bottom),
but this is the "vertical" layout Tolkien used in his example Shire Calendar at the beginning of Appendix D.
A control is available to switch the month views from this default "vertical" layout
to the more familiar "horizontal" layout, where the dates advance within in each row from left to right,
and the weeks advance from top to bottom.

#### Reckoning start dates

This visualization starts reckoning the start of the Shire Calendar year from Gregorian December 21 by default,
in order to align Shire Mid-year's Day as much as possible with the contemporary
[summer solstice](https://en.wikipedia.org/wiki/Solstice)
(see [Shire-Reckoning.com](http://shire-reckoning.com/calendar.html)).
A control is included that allows the Shire Calendar year to start reckoning from days up to Gregorian December 25,
since it is demonstrated in [The Lord of the Rings: A Reader's Companion](#references)
that Tolkien used the actual moon phases of 1941-1942 as a reference for the moon phases described in
[The Lord of the Rings](#references),
but these moon phases only align with the dates in the narrative if those Shire Calendar dates start reckoning their year
from December 25 in 1941 and 1942.
Note this annotation from [The Lord of the Rings: A Reader's Companion](#references)
(referring to its chart demonstrating this alignment):

> N.B. the chart in 'Chronologies, Calendars, and Moon' earlier in the present volume is concerned
> only with Tolkien's method of adjusting the lunar calendar for 1941-2 to his changing ideas within the narrative.
> It has no relation to the correspondences discussed in Appendix D.

* Since moon phases [approximately repeat dates every 19 years](https://en.wikipedia.org/wiki/Metonic_cycle),
  then these 1941-2 moon phases will repeat on most of these same "adjusted" dates
  (reckoning the start of the Shire Calendar year from Gregorian December 25) in 2017-18.
* If reckoning the start of the Shire Calendar year from Gregorian December 21,
  then the moon phases of 2020-21 will match the Shire Reckoning dates of the narrative instead
  (and a bit better; e.g.
  [the full moons of Afteryule and Rethe will fall on the correct days](https://www.reddit.com/r/tolkienfans/comments/53i3qa/the_moon_phases_used_for_lotr_are_about_to_mostly/)).

### Notes on the visualizations of the calendars of Gondor

Since the Shire Calendar originated from the Kings' Reckoning,
and in order to keep these calendars in sync with each other
as Tolkien described in *The Lord of the Rings* Appendix D,
the calendars of Gondor in this project will also follow the Gregorian leap-day rules,
so that they will always stay in sync with this project's Shire Reckoning calendar.

These calendars actually had very similar, but slightly different leap-day rules compared to the
Gregorian calendar's leap-day rules, [as described below in the Rivendell Reckoning notes](#why-not-march-29th).

#### Gondor's weekdays

Also note Tolkien's statements in Appendix D about the Shire's weekdays.

> The last day of the week, Friday (Highday), was the chief day, and one of holiday (after noon) and evening feasts.

So culturally speaking, Highday "more nearly" corresponded with Gregorian Sunday,
and Mersday with Gregorian Saturday.
Since Shire weekday names originated from Kings' Reckoning weekday names,
I assumed the same cultural correlation in Gondor,
so these Gondorian calendars also correlate their weekdays similarly with Gregorian weekdays.
In other words, Eärenya (Sea Day) corresponds with Gregorian Saturday
and Valanya (Valar Day) with Gregorian Sunday.

### Rivendell Reckoning Notes

* For a general reference for converting a date in the Gregorian calendar, in any year, to a
  date in the Rivendell Reckoning calendar, I recommend using the
  [Reformed Rivendell Reckoning rules](#reformed-rivendell-reckoning)
  (and choosing a non-leap year for dates between February 28 and Rivendell New Year's Day).

Since the Rivendell Reckoning calendar (also known as the Calendar of Imladris)
described by Tolkien has very different leap-day rules than the
[Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar), then by default,
this Calendar of Imladris will follow its
["traditional" rules](https://en.wikipedia.org/wiki/Middle-earth_calendar#Calendar_of_Imladris)
where every year has 365 days,
except every 12th year is a leap-year, which adds 3 extra days in the middle of the year,
however every 432nd year is not a leap-year.
Compare these rules to the Gregorian calendar, where every year has 365 days,
except every 4th year is a leap-year, which adds 1 leap-day,
except the last year in a century is not a leap-year,
however every 4th century is a leap-year.


I chose March 22nd as the default starting date of this Calendar of Imladris,
and its first year starts reckoning (or starts re-reckoning by some imagined mechanism)
on year one of the [proleptic Gregorian calendar](https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar),
in order to keep its leap-years in sync with our Gregorian leap-years
(to make it easier to compare how the Calendar of Imladris relates to our Gregorian calendar).
In other words, this calendar starts reckoning
on March 22nd, 1 A.D. of the [proleptic Gregorian calendar](https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar).

#### Why March 22nd?

Starting this calendar from Gregorian March 22 with "traditional" rules allows September 22 during our lifetimes
(the usual date of the contemporary [autumnal equinox](http://en.wikipedia.org/wiki/Equinox);
but also known as [Hobbit Day](https://en.wikipedia.org/wiki/Hobbit_Day))
to always fall on one of the 3 Middle-days (Enderi) from about 1900 until 2100,
and also allows Rivendell New Year's Day (Yestarë) to "re-sync" with March 25 for a few years
following one of its leap-years during these centuries.

The following details given by J.R.R. Tolkien in *The Lord of the Rings* Appendix D, and his letter #211,
imply that Rivendell New Year's Day (Yestarë) was on a proleptic Gregorian March 25 by the end of the narrative
(in the year of the downfall of Barad-dûr and Sauron when the One Ring was destroyed),
which also seems to support a March 21st or 22nd start of the reckoning of the Calendar of Imladris 7050 years before that
(590 Years of the Sun in the First Age + 3441 years in the Second Age + 3019 years in the Third Age):

1. Tolkien's letter #211 estimated the events of *The Lord of the Rings* could have occurred around 6000 years ago.
2. Rivendell New Year's Day "corresponded more or less with Shire April 6" (Astron 6).
    * The timeline given in *The Lord of the Rings* Appendix B
      lists the Elves' New Year's Day precisely on Astron 6 in the Third Age 3019
      (the year the One Ring was destroyed).
3. Gregorian January 1 corresponded "more or less to the Shire January 9" (Afteryule 9).
4. The correlations of the New Reckoning dates with the Kings' and Shire Reckoning dates imply these
   calendars were in sync by the Third Age 3019:
    * Rethe 25 = New Reckoning New Year's Day = Kings'/Stewards' Reckoning Súlimë 25
5. The details of the Kings' Reckoning leap-day rules make it possible to calculate that this
   calendar drifted 3 days behind a proleptic Gregorian calendar over the 6460 year period
   from the start of the Second Age to the start of the Third Age 3019,
   which implies the Shire Calendar was also 3 days behind at the start of the Third Age 3019.

In *The Lord of the Rings* Appendix D, Tolkien states that New Year's Day in the Rivendell Reckoning
calendar "corresponded more or less with Shire April 6" (Astron 6).
This corresponds to Gregorian March 27 (in non-leap years)
if we always align Shire New Year's Day with December 21
[in order to align the Shire Mid-year's Day](http://shire-reckoning.com/calendar.html)
with the contemporary [summer solstice](https://en.wikipedia.org/wiki/Solstice) of Gregorian June 21.
This puts Rivendell New Year's Day (Yestarë) very close to the [spring equinox](http://en.wikipedia.org/wiki/Equinox)
and the 3 Middle-days (Enderi) very close to the [autumnal equinox](http://en.wikipedia.org/wiki/Equinox),
which suggests these special days were intended to correspond as nearly as possible with these equinoxes.

March 20th is the usual date of the contemporary spring equinox,
although March 21st was the more common date of the spring equinox in the first half of the 20th century.
In fact, the [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar)
was designed so that the spring equinox should always fall between March 19th and March 21st,
from the time it was conceived and into the foreseeable future.

In Tolkien's letter #211, he estimated the events of
*The Lord of the Rings* could have occurred approximately 6000 years ago,
and around that time
[the spring equinox generally occurred on a proleptic Gregorian March 21 or 22](http://www.thetropicalevents.com/pngCharts/eVE_Gregorian1.png).
Due to the difference in leap-day rules between the Calendar of Imladris and the Gregorian calendar,
these calendars would not stay in sync with each other over long periods of time.
Approximately every 1700 years,
[the 432-year cycle of the Calendar of Imladris will drift a day ahead](Rivendell_Drift.md)
of the Gregorian calendar's 400-year cycle.
If the Calendar of Imladris started reckoning on a proleptic Gregorian March 22,
then after enough millennia Yestarë will have drifted to correspond with March 25th
and eventually with March 27th.

##### Why not March 29th?

Tolkien also stated in Appendix D
that January 1 of the Gregorian calendar would have corresponded
"more or less to the Shire January 9" (Afteryule 9).
If Gregorian January 1 corresponded to Afteryule 9,
then that would put the Shire Mid-year's Day on Gregorian June 23, or June 22 in leap-years (to see this for yourself,
[set the Shire Calendar to start reckoning from December 23](http://psarando.github.io/shire-reckoning/#tolkien-calendars)).
Since Tolkien also stated that "Mid-year's Day was intended to correspond as nearly as possible to the summer solstice",
this would seem to put Shire Mid-year's Day two days after our modern day summer solstices,
but note that the summer solstice did generally occur on
[proleptic Gregorian June 23 around 6000 years ago, and throughout much of antiquity](http://www.thetropicalevents.com/pngCharts/eSS_Gregorian1.png).

If Shire Mid-year's Day corresponded with June 23rd, then wouldn't Astron 6 have corresponded with March 29th?
Shouldn't this mean Rivendell New Year's Day (Yestarë) also corresponded ("more or less")
with March 29th if it "corresponded more or less with Shire April 6" (Astron 6)?

Now consider Tolkien's other statements about the Shire Calendar in Appendix D:

1. Shire Reckoning was based on the calendar of Gondor called the Kings' Reckoning,
which later became the Stewards' Reckoning calendar of Gondor.
These calendars must have stayed aligned by the Third Age 3019,
since Tolkien states in Appendix D that the New Year's Day of the New Reckoning calendar corresponded
with "March 25" of the Shire, Kings', and Stewards' Reckoning calendars (Rethe 25 and Súlimë 25).

    > The months and days, therefore, throughout The Lord of the Rings refer to the Shire Calendar.
    > ... March 25, the date of the downfall of Barad-dûr
    > ... was, however, March 25 in both Kings' and Stewards' Reckoning.
    >
    > -- J.R.R. Tolkien, The Lord of the Rings Appendix D

2. The Kings' Reckoning was founded in Númenor, and started reckoning from the first year of the Second Age (S.A.).
Both the Kings' and Shire Reckoning followed leap-year rules similar to the Gregorian calendar,
where every 4th year is a leap-year except the last in a century,
but the Gregorian calendar also adds an extra leap-day (i.e. does not omit the leap-day) every 4th century
whereas Kings' Reckoning [adds 2 extra leap-days every millenium](http://rinsanity.weebly.com/tolkien.html)
(as explained in [The Lord of the Rings: A Reader's Companion](#references)).
This slight difference in leap-day rules is enough to cause dates between these calendars
to gradually drift apart over the millennia
(similar to [how the Julian and Gregorian calendars drift apart](https://en.wikipedia.org/wiki/Gregorian_calendar#Difference_between_Gregorian_and_Julian_calendar_dates)),
but Tolkien detailed additional (leap-day) adjustments to the Gondorian calendar during the Third Age:
    * The 2 millennial leap-days were added throughout the Second Age (which ended in S.A. 3441),
      and again up to the Third Age (T.A.) 2000 (S.A. 5441).
    * Then 2 more extra leap-days were added in S.A. 5500
      (T.A. 2059, when Stewards' Reckoning was introduced).
    * Then one more extra leap-day was added in S.A. 5801 (T.A. 2360).
    * Tolkien states that no more extra leap-days are added between then
      and the War of the Ring, or the start of the Fourth Age after that (S.A. 6462 or T.A. 3021).
    * So by T.A. 3019, the calendar of Gondor had 3 less leap-days
      (2*5+2+1 = 13 extra leap-days)
      than the Gregorian calendar would have had over the same period of 6460 years
      (6400 / 400 = 16 extra leap-days).
    * Mathematically we can see how a Gregorian calendar,
      starting at the beginning of the Second Age,
      would have had 3 more leap-days by December 6459
      than the Gondor calendar by the start of the Third Age 3019:
        * Gregorian: `6456/4 - 6400/100 + 6400/400 = 1566 leap-days`
        * Gondor: `(3440/4 - 3400/100 + 2*3000/1000) + (3016/4 - 3000/100 + 2*2000/1000 + 2 + 1) = 1563 leap-days`

3. Tolkien implied in the first publication of The Lord of the Rings
that the Shire Calendar had incorporated these millennial adjustments as well,
further suggesting that the Shire Calendar was in sync with the Kings' and Stewards' Reckoning calendars
by the end of the Third Age:

    > These alterations seem to have become recognized eventually throughout the west-lands;
    > but there were no further corrections during the Third Age.
    >
    > -- J.R.R. Tolkien, as quoted in The Lord of the Rings: A Reader's Companion Appendix D

So if the calendar of Gondor would have added 3 less leap-days than this proleptic Gregorian calendar by T.A. 3019,
this means its New Year's Day would have drifted back 3 days relative to this Gregorian calendar
(the Stewards' Reckoning was only a slight modification of the Kings' Reckoning calendar
so that the dates of New Year's Day and Mid-year's Day did not change).

Taking these concepts together with the point made earlier that Gregorian January 1 corresponded
"more or less to the Shire January 9" (Afteryule 9),
then if Mid-year's Day in the original Kings' Reckoning corresponded
with Gregorian June 23 at the start of the Second Age,
meaning its New Year's Day corresponded with Gregorian December 23,
then the New Year's Day of both the Gondor and Shire calendars would have corresponded with December 20 in T.A. 3019.

Now note that the year 6460 in a Gregorian calendar is also a leap year,
so Astron 6 in T.A. 3019 would have corresponded to the Gregorian March 25
(to see this for yourself,
[set the Shire Calendar to start reckoning from December 20 and the Gregorian Date to March 25, 6460](http://psarando.github.io/shire-reckoning/#tolkien-calendars)).
This also means the Shire Reckoning New Year's Day was another day behind in T.A. 3020,
which means Astron 6 corresponded to Gregorian March 25 again
(the date the mallorn tree first flowered in the Party Field),
until the Overlithe in that "Great Year of Plenty"
re-synced Shire New Year's Day with December 20 in T.A. 3021.

Since *The Tale of Years* (Appendix B) lists the Elves' New Year's Day on Astron 6 in T.A. 3019,
then Rivendell New Year's Day (Yestarë) was also Gregorian March 25 in T.A. 3019.

###### Side Notes

* The Elves' New Year's Day on a Gregorian March 25 corresponding to Shire "April 6" (Astron 6)
  mirrors a similar relationship between the old Julian calendar and the modern Gregorian calendar in England:
    * March 25 of the Julian calendar
      [was the start of the legal year in England](https://en.wikipedia.org/wiki/Gregorian_calendar#Beginning_of_the_year)
      before the adoption of the Gregorian calendar in 1752,
      which converted to Gregorian April 5 at that time.
      Then the Julian March 25 corresponded to Gregorian April 6 in the year 1800
      (when the Gregorian calendar omitted its leap-day but the Julian calendar did not),
      and [April 6 is still the start of the United Kingdom's tax year to this day](https://en.wikipedia.org/wiki/Quarter_days#In_England).

* This project works by taking a Gregorian date and calculating a corresponding
  Rivendell calendar year for that date, and as mentioned before,
  its first year starts reckoning on year one of the proleptic Gregorian calendar
  in order to keep their leap-year cycles in sync.
  The next proleptic Gregorian year before 1 A.D. that starts both a Gregorian 400-year cycle
  and a Calendar of Imladris 432-year cycle would be 10800 B.C.
  (if the year 0 is included) since it's evenly divisible by both 400 and 432.
  So these calculations could easily be adapted to start reckoning the Calendar of Imladris from 10800 B.C.,
  and the 7050 years from then to T.A. 3019 would be 3750 B.C.,
  which is fairly close to Tolkien's 6000-year gap to our time.

##### Loose Ends

###### First Day of the Calendar of Imladris

It's not stated in the Appendices of *The Lord of the Rings*
when the Calendar of Imladris was established or from what year it started reckoning,
but the most likely starting date would have been in the first Years of the Sun in the First Age
(590 years before the start of the Second Age).
Then the 7050 years from then to the end of the War of the Ring
(590 Years of the Sun + S.A. 3441 + T.A. 3019 = 7050)
would have been enough time for Rivendell New Year's Day (Yestarë) to drift
from a spring equinox to the Gregorian March 25 by T.A. 3019.

Another logical start of the reckoning of the Calendar of Imladris,
which also allows its New Year's Day to fall on a March 25 in T.A. 3019,
could be on a March 20th at the start of the Second Age.
This start date is less likely since Tolkien wrote in Appendix D about a note on the
Calendars of the Red Book (a.k.a. *The Reckoning of Years* by Meriadoc Brandybuck)
that states that the omission of the 3 extra Enderi at the end of a 432-year cycle
'has not happened in our time'.

If this calendar did start at the beginning of the Second Age, then it would have started a
new cycle just 20 years after the War of the Ring in Shire Reckoning (S.R.) 1439 (T.A. 3039).
Starting with the Years of the Sun in the First Age means this calendar started a new 432-year
cycle in S.R. 1281 (T.A. 2881; 9 years before the birth of Bilbo Baggins)
and its next wasn't due until S.R. 1713 (more than 100 years after the Red Book was copied in Gondor).

Note that [according to the Elves' mythology](https://en.wikipedia.org/wiki/Timeline_of_Arda#Years_of_the_Sun),
the Sun was created and first set sail across the sky starting with the Years of the Sun of the First Age.
So the "years" were of different length before that time,
which makes it very unlikely that the Elves would use something like the Calendar of Imladris
to reckon time before then.

In a previous revision of these notes, I had naively
[set the Gregorian year in this calendar to 7050](http://psarando.github.io/shire-reckoning/#tolkien-calendars)
and observed that if the Calendar of Imladris started reckoning from a proleptic Gregorian March 21,
then its Yestarë fell on Gregorian March 25 in the year 7050.
[Recall in the notes above](#why-not-march-29th) that we compared the Shire Calendar's Astron 6
with a Gregorian calendar in its 6460th year to get the corresponding date of March 25.
Since a Gregorian calendar in its 6460th year is at a different point in a 400-year cycle
than a Gregorian calendar in its 7050th year, it's not correct to compare the Calendar of Imladris
with the Shire Calendar in this way.
It would be more accurate to compare the Calendar of Imladris with the same Gregorian calendar in its 6460th year,
which means the Calendar of Imladris would have to start reckoning in this Gregorian calendar's year 589 B.C.
(590 years before year 1, if the year 0 is included).
This would also mean that the leap-years of this Calendar of Imladris
would not be in sync with the leap-years of this Gregorian calendar,
so it makes the comparison more complicated;
but if I have done my calculations correctly, then the first few years of this Calendar of Imladris
would correspond with this Gregorian calendar's March 22
in order for its Yestarë to fall on March 25 in this Gregorian calendar's year 6460.

###### First Day of the Kings' Reckoning

Another loose end in these notes is the idea that
the first Kings' Reckoning Mid-year's Day (Loëndë) should correspond with June 23rd,
which implies a December 23rd New Year's Day (Yestarë),
because the summer solstice occurred on a proleptic Gregorian June 23 around the time of the setting of
*The Lord of the Rings*.

So if Tolkien was aware that 6000 years ago the summer solstice generally occurred on June 23rd,
which is a day or 2 different than when it occurs in our time,
should he have started his calendar of Númenor from that date approximately 12000 years ago without any adjustment?
The same could be asked of the Calendar of Imladris and the spring equinox of 6000 vs. 13000 years ago.

I focused on the first Kings' Reckoning Mid-year's Day (Loëndë) corresponding with June 23rd
because the Shire Mid-year's Day should coincide with Loëndë,
and Tolkien made a correlation with the Shire Mid-year's Day and the summer solstice,
and a correlation with the Shire Calendar and the Gregorian calendar New Year's Day.
The problem with assuming the first Loëndë corresponded with a June 23rd summer solstice
is that Tolkien stated in Appendix D that the Kings' Reckoning New Year's Day originated in "mid-winter",
which seems to imply it originally corresponded with the [winter solstice](https://en.wikipedia.org/wiki/Solstice).
Starting this calendar on the December 21st winter solstice in our time
allows Loëndë to fall on the contemporary June 21st summer solstice,
but 6000 years ago the solstices didn't align this way, since
[the winter solstice would have generally occurred on a proleptic Gregorian December 18](http://www.thetropicalevents.com/pngCharts/eWS_Gregorian1.png).

It's possible that Tolkien was aware of the June 23rd summer solstice of 6000 years ago
and just made the mistake of assuming that this date still corresponded 6000 years earlier,
and that the relative days between the winter solstice and summer solstice
were the same back then as they are now
([he did assume the lengths of the years were the same then as they are now](http://rinsanity.weebly.com/tolkien.html)).
His "long summer" calendars of the Shire and Gondor seem to fit these possibilities.
In fact, the first publication of *The Lord of the Rings* stated:

> ... Mid-year's Day and Year's End were originally intended to correspond as nearly as possible
> to the summer and winter solstices, and still do so.
> In that case the Shire dates were actually in advance of ours by some nine days...
>
> -- J.R.R. Tolkien, as quoted in The Lord of the Rings: A Reader's Companion Appendix D

So it's also possible Tolkien became aware of the fact that
the winter solstices occurred relatively earlier around 6000 years ago,
and when emending Appendix D for the second edition,
perhaps he just didn't concern himself with any other dates of the solar events beyond the
spring equinox and summer solstice during the hypothetical time-frame
of the "Great Years" of the War of the Ring.

This may be perfectly reasonable in the context of the mythology of Middle-earth,
since the world of Middle-earth was a flat world only about 3000 years before the War of the Ring,
when the epic cataclysm of the Downfall of Númenor made it into the round world we know today.
If we allow for the possibility that this mythological flat world
(and the first 3000 years of the round world)
had more stable lengths of years and seasons,
then these calendars could be more applicable to that mythological past than our actual planet's physical history.

#### Reformed Rivendell Reckoning

Since the primary goal of this project is to visualize how Tolkien's calendars relate to the Gregorian calendar,
I've included a control that lets you choose "Reformed" Rivendell Reckoning rules.
I invented these "reformed reckoning" rules to keep the Calendar of Imladris more in sync with the
Gregorian calendar so that most of its dates always fall on the same Gregorian date.
These rules always start the Calendar of Imladris on the same Gregorian day (March 25th by default),
and make the calendar follow the leap-year and leap-day rules of the Gregorian calendar.
With these "Reformed" Rivendell Reckoning rules, a single "Reformed Enderë" (or a "Leap Middleday" if you will)
falls between the Last Day (Mettarë) and First Day (Yestarë) of the Calendar of Imladris in every leap-year of the Gregorian calendar,
rather than adding 3 extra Enderi to the middle of the year every 12 years.

##### Why March 25th?

[As explained above](#why-march-22nd),
Gregorian March 25 corresponds to the Elves' New Year's Day by the end of the narrative
(in the year of the downfall of Barad-dûr and Sauron when the One Ring was destroyed in T.A. 3019),
but starting this calendar's year on Gregorian March 25 with "reformed" rules
also means the Enderi will always start on Gregorian September 22
(a.k.a. [Hobbit Day](https://en.wikipedia.org/wiki/Hobbit_Day)).

Starting the elvish Calendar of Imladris on the vernal equinox in our time
would mean starting on the usual date of March 20th,
but that would put the 3 Enderi from September 17th - 19th
which is 3 to 5 days before the contemporary [autumnal equinox](http://en.wikipedia.org/wiki/Equinox).
At one time in prehistory, [autumn was the longest of the seasons](http://www.sym454.org/seasons/),
so these dates might have matched the seasons better during this time (and may again about 4000 years from now),
but these days summer is the longest season and the spring equinox comes relatively earlier than it did back then.
So now the [autumnal equinox](http://en.wikipedia.org/wiki/Equinox)
usually falls on September 22nd (or early on the 23rd), and as mentioned earlier,
the 3 Enderi were most likely intended to occur around this equinox.

Starting this calendar's year on Gregorian March 25 also means the other seasons of this calendar will align with
[March 25th](https://en.wikipedia.org/wiki/March_25#Holidays_and_observances),
[June 24th](https://en.wikipedia.org/wiki/Midsummer#United_Kingdom) (the middle of Lairë),
and [December 24th](https://en.wikipedia.org/wiki/Christmas_Eve) (the middle of Hrívë),
which fall on (or very close to) the
[traditional quarter days of England](https://en.wikipedia.org/wiki/Quarter_days#In_England).

### References

* Tolkien, J. R. R. *The Return of the King: Being the third part of The Lord of the Rings*. Boston: Houghton Mifflin Co, 1965.
  [ISBN 0-395-08256-0](https://en.wikipedia.org/wiki/Special:BookSources/?isbn=0-395-08256-0).
* Hammond, W. G.; Scull, C. *The Lord of the Rings: A Reader's Companion*. Boston: Houghton Mifflin Co, 2005.
  [ISBN-13 978-0-618-64267-0](https://en.wikipedia.org/wiki/Special:BookSources/?isbn=978-0-618-64267-0).
* [Shire-Reckoning.com](http://shire-reckoning.com/calendar.html)
* [Wikipedia article on the pre-latin Germanic calendar](https://en.wikipedia.org/wiki/Germanic_calendar)
* [Wikipedia article on the Coligny calendar](https://en.wikipedia.org/wiki/Coligny_calendar):
  A possible inspiration behind the design of Tolkien's calendars in Appendix D,
  particularly the similarity of the Enderi to the *trinoxtion Samonii*.
* [Wikipedia article on Middle-earth calendars](https://en.wikipedia.org/wiki/Middle-earth_calendar)
* [Wikipedia article on the Ages of Middle-earth](https://en.wikipedia.org/wiki/Timeline_of_Arda)
* [Wikipedia solstice article](https://en.wikipedia.org/wiki/Solstice)
* [Wikipedia equinox article](https://en.wikipedia.org/wiki/Equinox)
* [A Tolkien Calendar: Part 1 | Miruvor](https://taruithornmiruvor.wordpress.com/2015/05/24/a-tolkien-calendar-part-1/#attachment_143):
  Joe Bartram's article on the history of Middle-earth calendars,
  including an excellent chart of the "evolution and divergence of calendar systems in Middle Earth".
* [Tolkien's Legendarium versus Astronomical Reality](http://rinsanity.weebly.com/tolkien.html)
* [TheTropicalEvents.com](http://www.thetropicalevents.com/):
  Search this page for "Gregorian calendar" for charts showing how the dates of the
  solstices and equinoxes change through ancient history and into the future.
* [sym454.org/seasons](http://www.sym454.org/seasons/):
  Provides an in-depth graphical analysis of how the lengths of the seasons change over time.

## [shire-reckoning.ics](shire-reckoning.ics) iCalendar

This project also contains a `shire-icalendar.clj` script
that prints iCalendar formatted dates with corresponding Shire Reckoning dates,
which can be saved as an ics file
(such as the [shire-reckoning.ics](shire-reckoning.ics) file included in this repo)
then imported into a calendaring program, such as Google Calendar or Apple's iCal.

* Hint for Google Calendar users: you probably want to create a new, empty calendar
(it could be named "Shire Reckoning"), then import the [shire-reckoning.ics](shire-reckoning.ics)
events into that calendar.
This way you can easily hide all these events,
or delete this new calendar to remove all the events at once,
without affecting events in your default calendar,
and without having to remove these shire dates one at a time.

The Shire Reckoning iCalendar description is provided below:

> A calendar of J.R.R. Tolkien's 'Shire Reckoning' dates corresponding to Gregorian dates,
> according to http://shire-reckoning.com/calendar.html, which suggests that we
> "anchor the Shire calendar on the solstice of one particular year,
> then add the Overlithe every four years thereafter.
> This [...] could maintain a stable relationship between Shire and modern dates
> if Shire leap-years were coordinated with those of our own calendar.
> [...] Under this system we always celebrate the Shire New Year upon our own 21 December."

> I chose to start this calendar on the 21st of December 1931,
> which places the majority of the Shire Reckoning dates in 1932,
> the year 'The Hobbit' was first completed, and also happens to be a leap-year,
> a good starting point for marking Overlithe leap-days.
> Month and weekday descriptions are based on The Lord of the Rings: A Reader's Companion.
>
> Note: This calendar will erroneously mark June 22 as Overlithe days on centennial years which are not leap-years.

Use [Leiningen](http://leiningen.org) and the [lein-exec plugin](https://github.com/kumarshantanu/lein-exec)
to run `shire-icalendar.clj` from the command-line.

## License

Original concept and terminology created by J.R.R. Tolkien for *The Lord of the Rings* Appendix D.

This source code is Copyright (C) 2016 Paul Sarando.

Distributed under the [Eclipse Public License](http://www.eclipse.org/legal/epl-v10.html).

Feel free to use any portion of these calendars on your site, just link credit back to this repository.
I'd love to see what anyone else can do with these!
