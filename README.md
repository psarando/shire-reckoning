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
* [Middle-earth Simulation](#middle-earth-simulation)
* [Shire Reckoning Notes](#shire-reckoning-notes)
    * [Reckoning start dates](#reckoning-start-dates)
        * [Reckoning with moon phases](#reckoning-with-moon-phases)
* [Gondor Reckoning Notes](#gondor-reckoning-notes)
* [Rivendell Reckoning Notes](#rivendell-reckoning-notes)
    * For a general reference for converting a date in the Gregorian calendar, in any year, to a
      date in the Rivendell Reckoning calendar, I recommend using my
      [Reformed Rivendell Reckoning rules](#reformed-rivendell-reckoning)
      (and choosing a non-leap year for dates between February 28 and Rivendell New Year's Day).
    * [Why March 22nd?](#why-march-22nd)
        * [Why not March 29th?](#why-not-march-29th)
        * [Rivendell New Year's Day fell on a March 25th by the end of the Third Age](#rivendell-new-years-day-fell-on-a-march-25th-by-the-end-of-the-third-age)
    * [Reformed Rivendell Reckoning rules](#reformed-rivendell-reckoning)
        * [Why March 25th?](#why-march-25th)
* [References](#references)
* [shire-reckoning.ics iCalendar](#shire-reckoningicsshire-reckoningics-icalendar)
* [License](#license)

## Introduction

The primary goal of this project is to visualize how the calendars described in
J.R.R. Tolkien's *The Lord of the Rings* Appendix D relate to the
[Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar).
So the default Shire Reckoning calendar is displayed according to the reasonable rules suggested by
[Shire-Reckoning.com](http://shire-reckoning.com/calendar.html),
where Shire Mid-year's Day is aligned as much as possible with the contemporary
[summer solstice](https://en.wikipedia.org/wiki/Solstice)
(which is [usually on June 21st](https://en.wikipedia.org/wiki/Summer_solstice#/media/File:Gregoriancalendarleap_solstice.svg)),
and it follows the same leap-day rules of the Gregorian calendar.
This allows it to stay in sync with the Gregorian calendar so that most Shire Reckoning dates
will always fall on the same Gregorian date.

Additionally, these calendars always reckon their dates from midnight to midnight,
just as our modern Gregorian calendar and the Shire Calendar reckon dates.
Note that Tolkien stated in Appendix D that the Gondor calendars reckoned their dates from sunrise to sunrise,
and the Elves reckoned their dates from sunset to sunset.

By default, these calendars make no attempt to correlate Gregorian years with Shire-reckoning years or the Ages of Middle-earth.
Although I've created a separate set of example calendars that can
[simulate Shire-reckoning years and the Ages of Middle-earth](https://psarando.github.io/shire-reckoning/#middle-earth-simulation)
with various possible Gregorian year correlations.

## Tolkien's Calendars

The main library module of this project can generate a visualization of
the calendars described in *The Lord of the Rings* Appendix D in a web browser as simple HTML tables,
labeled with each day's corresponding Gregorian date of the current year,
and with today's date highlighted on each calendar.
These calendars are the [Shire Reckoning, Rivendell Reckoning, and calendars of Gondor:
Kings' Reckoning, Stewards' Reckoning, and the New Reckoning](https://psarando.github.io/shire-reckoning).

More examples of each calendar, as well as installation and usage, can be found in the
[examples directory](https://psarando.github.io/shire-reckoning/examples/):

* [Shire Calendar examples](https://psarando.github.io/shire-reckoning/examples/shire-calendars.html)
* [Rivendell Calendar examples](https://psarando.github.io/shire-reckoning/examples/rivendell-calendars.html)
* [Gondor Calendar examples](https://psarando.github.io/shire-reckoning/examples/gondor-calendars.html)

[![NPM version](https://img.shields.io/npm/v/shire-reckoning.svg)](https://www.npmjs.org/package/shire-reckoning)
These javascript calendars use the [React javascript library](http://facebook.github.io/react/).

### Middle-earth Simulation

As pointed out in the [Shire Reckoning notes](https://psarando.github.io/shire-reckoning/#reckoning-start-dates),
the calendars of Gondor and the Shire described in Appendix D had similar
yet different leap-year and leap-day rules compared to our Gregorian calendar.
So this project also includes a way to reckon Shire and Gondor dates according to
the "traditional" leap-day and leap-year rules as described in Appendix D.
This allows me to implement a simulation that can display these calendars according to
Shire-reckoning years and the Ages of Middle-earth.
Various ways of synchronizing Gregorian years with Shire-reckoning years and the Ages of Middle-earth are also provided.

[Follow this link for a live demonstration of these simulations](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html).

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

This project's visualization can display the Shire Calendar with
either the Gregorian names Tolkien used as substitutions,
or the original Shire names of the months and weekdays,
or the alternate month names used in Bree.

To see the descriptions of the month and weekday names in this visualization,
hover your cursor over any day in a month or over a weekday,
and a tooltip will display the description of that month or weekday name.
These descriptions were compiled from
[The Lord of the Rings: A Reader's Companion](#references),
[Shire-Reckoning.com](http://shire-reckoning.com/calendar.html),
and the [Wikipedia article on the pre-latin Germanic calendar](https://en.wikipedia.org/wiki/Germanic_calendar).

#### Layout of days and weeks

The individual month views of the calendars in this project can switch
between a "vertical" layout and a more familiar "horizontal" layout.

The "horizontal" layout is what you see in any modern Gregorian calendar,
where the dates advance within each row from left to right,
and the weeks advance from top to bottom.

The "vertical" layout might look odd at first,
with the dates starting at the top of the left column and advancing vertically down the column,
then continuing the next week in the next column (again counting dates from top to bottom),
but this is the "vertical" layout Tolkien used in his example Shire Calendar at the beginning of Appendix D.

#### Reckoning start dates

This visualization reckons the start of the Shire Calendar year from Gregorian December 21 by default,
in order to align Shire Mid-year's Day as much as possible with the contemporary
[summer solstice](https://en.wikipedia.org/wiki/Solstice)
(see [Shire-Reckoning.com](http://shire-reckoning.com/calendar.html)),
which is [usually on June 21st](https://en.wikipedia.org/wiki/Summer_solstice#/media/File:Gregoriancalendarleap_solstice.svg)
(in our lifetimes).

The Shire Calendar on this [project's home page](https://psarando.github.io/shire-reckoning/#tolkien-calendars)
includes a control that allows the Shire Calendar to start reckoning its year from different days in December,
since Tolkien did not specifically state when we should observe Shire New Year's Day in modern times.
He only directly compared the Shire Calendar with real-world years in one passage of Appendix D,
(and all other calendars in Appendix D are only compared with the Shire Calendar):

> It appears, however, that Mid-year’s Day was intended to correspond as nearly as possible to the summer solstice.
> In that case the Shire dates were actually in advance of ours by some ten days,
> and our New Year's Day corresponded more or less to the Shire January 9.

So Tolkien only gave us 2 direct comparisons of the Shire Calendar with a real-world year:

1. "Mid-year’s Day was intended to correspond as nearly as possible to the summer solstice."
2. "our New Year's Day corresponded more or less to the Shire January 9."

Although these statements are somewhat vague,
some will see the 2nd comparison and choose to always observe the Shire New Year's Day on our December 23,
since reckoning the start of the Shire Calendar year from Gregorian December 23
allows our January 1 to fall on Shire 'January' 9 (Afteryule 9);
but as a consequence, Mid-year’s Day will fall on Gregorian June 23, or June 22 in leap-years (to see this for yourself,
[set the Shire Calendar to start reckoning from December 23](https://psarando.github.io/shire-reckoning/#tolkien-calendars)).

This may be acceptable for those that are interested in keeping with "tradition"
and wish to observe the "traditional" New Year's Day of the Shire Calendar.

This project reckons the start of the Shire Calendar year from Gregorian December 21 by default,
because I'm placing more importance on the 1st comparison.

I think Tolkien was vague with these statements because he had in mind the
differences in the leap-year rules between the Shire and our Gregorian calendars.
The Shire Calendar originated from the Kings' Reckoning calendar of Gondor,
and both the Kings' and Shire Reckoning followed leap-year rules similar to the Gregorian calendar,
where every 4th year is a leap-year except the last in a century;
however, the Gregorian calendar does not omit the leap-day every 4th century
whereas Kings' Reckoning [adds 2 extra leap-days every millennium](http://rinsanity.weebly.com/tolkien.html),
as explained by [Åke Jönsson (Bertenstam)](http://tolkiengateway.net/wiki/%C3%85ke_Bertenstam)
in "The King's Reckoning: Did Tolkien Reckon Correct?"
and presented in [The Lord of the Rings: A Reader's Companion](#references).

So maybe he said "more or less to the Shire January 9" because he knows every 400 years that date would shift by 1 day;
and if the Shire Calendar had
"[millennial leap-days](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html#millennial-leap-years)"
like the Gondor calendars,
then it would shift back 2 days the other way every 1000 years.
So even if the Gondor and Shire Calendars' New Year's Day started out on a Gregorian December 23,
after 400 years they would correspond with December 22, then 400 years after that December 21,
but they could re-sync with December 23 after the
"[millennial leap-days](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html#millennial-leap-years)"
are added 200 years after that.
Eventually these differences would add up,
and after only 2000 years the calendars would permanently shift 1 day off from where they started
(or by 5 days with no millennial adjustments).
So for example, if the Shire Calendar started reckoning from a
[proleptic Gregorian](https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar)
December 23 in 1 A.D.,
then its New Year's Day would end up on our December 22 for a few centuries after the year 2000,
or without Gondor's millennial adjustments in the years 1000 and 2000,
it would now fall on Gregorian December 18 instead.

If we don't want to observe the Shire Calendar with these "traditional" leap-year rules,
and we adopt it to our Gregorian leap-year rules (in order to keep the calendars always in sync),
then I think we also get to choose to start its reckoning from December 21
so that it fits the seasons the way it was originally intended.

Also note that in Tolkien's letter #211,
he estimated the events of *The Lord of the Rings* could have occurred approximately 6000 years ago,
and around that time the summer solstice did generally occur on
[proleptic Gregorian June 23, and throughout much of antiquity](http://www.thetropicalevents.com/pngCharts/eSS_Gregorian1.png).
So reckoning the start of the Shire Calendar year from Gregorian December 23
may have kept Mid-year’s Day in sync with the June 23 solstice in ancient times,
but reckoning from Gregorian December 21 in modern times will keep Mid-year’s Day in sync with the modern summer solstice.

I'll also point out that some prefer to start reckoning the Shire Calendar year from Gregorian December 22,
which will keep Mid-year’s Day in sync with June 22.
I'm assuming that's because
[the summer solstice usually fell on June 22nd during the first half of the 20th century](https://en.wikipedia.org/wiki/Summer_solstice#/media/File:Gregoriancalendarleap_solstice.svg),
when Tolkien was writing this material,
but June 21st is the more common date in the centuries around the year 2000.

Finally I'll point out that the similar leap-year rules between these calendars
(especially with Gondor's "[millennial leap-days](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html#millennial-leap-years)")
means these calendars will track the seasons in a similar way.

In fact, the entire purpose behind the
[Gregorian reform of the classical Julian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar#Gregorian_reform)
was to keep it more in sync with the spring equinox,
so that the date of Easter is more in sync with traditional Easter dates.
Of course it's not perfectly in sync,
which is why the spring equinox can fall anywhere from the Gregorian March 19th to the 21st.
Apparently, the calendars of Gondor and the Shire had similar leap-year rules
(if including Gondor's "[millennial leap-days](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html#millennial-leap-years)")
in order for their Mid-year’s Day "to correspond as nearly as possible to the summer solstice".
Tolkien also mentioned in his [Letter #176](http://tolkiengateway.net/wiki/Letter_176)
that the calendar of Gondor was a bit more accurate than the modern Gregorian calendar in tracking the solar year.

##### Reckoning with moon phases

The Shire Calendar on this [project's home page](https://psarando.github.io/shire-reckoning/#tolkien-calendars)
allows the calendar to start reckoning from days up to Gregorian December 25,
since it is demonstrated in [The Lord of the Rings: A Reader's Companion](#references)
that Tolkien used the actual moon phases of 1941-1942 as a reference for the moon phases described in
[The Lord of the Rings](#references),
but these moon phases only align with the dates in the narrative if those Shire Calendar dates start reckoning their year
from December 25 in 1940 and 1941.
Note this annotation from [The Lord of the Rings: A Reader's Companion](#references)
(referring to its chart demonstrating this alignment):

> N.B. the chart in 'Chronologies, Calendars, and Moon' earlier in the present volume is concerned
> only with Tolkien's method of adjusting the lunar calendar for 1941-2 to his changing ideas within the narrative.
> It has no relation to the correspondences discussed in Appendix D.

* Since [moon phases repeat on approximately the same dates every 19 years](https://en.wikipedia.org/wiki/Metonic_cycle),
  then these 1941-2 moon phases will repeat on most of these same "adjusted" dates in 2017-18.
  Although reckoning the start of the Shire Calendar year [back 1 more day](https://en.wikipedia.org/wiki/Callippic_cycle)
  (from Gregorian December 24) in 2017 allows the full moons of
  Afteryule (just before the Fellowship reaches Moria)
  and Rethe (just before the destruction of the One Ring)
  to fall on the correct days.
* If reckoning the start of the Shire Calendar year from Gregorian December 21,
  then the moon phases of 2020-21 will match the Shire Reckoning dates of the narrative instead
  (and a bit better).

### Gondor Reckoning Notes

Since the Shire Calendar originated from the Kings' Reckoning,
and in order to keep these calendars in sync with each other
as Tolkien [implied](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html#millennial-leap-years)
in *The Lord of the Rings* Appendix D,
the calendars of Gondor in this project will also follow the Gregorian leap-day rules by default,
so that they will always stay in sync with this project's Shire Reckoning calendar.

These calendars actually had very similar, but slightly different leap-day rules compared to the
Gregorian calendar's leap-day rules, [as described above in the Shire Reckoning notes](#reckoning-start-dates).

#### The 3 Calendars of Gondor

The calendar of Gondor went through 3 variations throughout its history:

1. **Kings' Reckoning**:
   The Kings' Reckoning was established in Númenor and was
   "used in Númenor, and in Arnor and Gondor until the end of the kings".
   This was the calendar that was in use for the longest period of time in Middle-earth
   (with the likely exception of the Calendar of Imladris).
   The Kings' Reckoning was in use probably throughout the entire history of Númenor,
   for over 3000 years during the Second Age,
   and up to the Third Age (T.A.) 2059 in Gondor.
2. **Stewards' Reckoning**:
   The Stewards' Reckoning was established in the time of Mardil, the first Ruling Steward of Gondor,
   and replaced the Kings' Reckoning in T.A. 2060.
   It was only a minor modification of the Kings' Reckoning that added a "Spring-day" (Tuilérë)
   and an "Autumn-day" (Yáviérë) and shortened the two 31-day months in summer to 30 days each.
   These new Tuilérë and Yáviérë days may have been in honor (or a reflection) of the holidays of Númenor for
   [Erukyermë and Eruhantalë](http://tolkiengateway.net/wiki/Three_Prayers).
3. **New Reckoning**:
   The New Reckoning was introduced by King Elessar (a.k.a Aragorn)
   and started its reckoning from the day the One Ring was destroyed,
   T.A. 3019 'March' (Rethe/Súlimë) 25, which became its New Year's Day (Yestarë).
   So the start of each month was shifted back by a few days to align the calendar with this new Yestarë.
   It also removed the Stewards' Spring-day and Autumn-day and moved the Mid-year's Day (Loëndë) to autumn,
   along with 2 Middle-days, which immediately followed its month of Yavannië.

   > But in honour of Frodo *Yavannië* 30, which corresponded with former September 22, his birthday,
   > was made a festival, and the leap-year was provided for by doubling this feast, called *Cormarë* or Ringday.
   >
   > -- J.R.R. Tolkien, The Lord of the Rings Appendix D

   In other words, Yavannië 30 of the New Reckoning calendar falls on Frodo's birthday, Shire 'September' (Halimath) 22,
   except in leap-years when Yavannië 30 falls on Halimath 21 due to the Shire Calendar's leap-day in summer (Overlithe).
   So the New Reckoning calendar adds its leap-day, Cormarë (Ringday), between Yavannië 30 and its Middle-days.
   This way Yavannië 30 is a festival in every year, but in leap-years Cormarë falls on Frodo's actual birthday,
   and his birthday celebrations are doubled!
   
   Although Shire Rethe 25 and Halimath 22,
   which fall on the New Reckoning's Yestarë and Cormarë/Yavannië 30,
   were holidays in King Elessar's Reunited Kingdom,
   it appears these dates were not celebrated in the Shire;
   but note these other holidays celebrated in the Shire after the War of the Ring:

   > There is no record of the Shire-folk commemorating either March 25 or September 22;
   > but in the Westfarthing, especially in the country round Hobbiton Hill,
   > there grew up a custom of making holiday and dancing in the Party Field, when weather permitted, on April 6.
   > Some said that it was old Sam Gardner's birthday,
   > some that it was the day on which the Golden Tree first flowered in 1420,
   > and some that it was the Elves' New Year.
   > In the Buckland the Horn of the Mark was blown at sundown every November 2 and bonfires and feastings followed.
   >
   > -- J.R.R. Tolkien, The Lord of the Rings Appendix D

#### Gondor's weekdays

This project assumes Tolkien's statements in Appendix D about the Shire's weekdays also apply to Gondor's weekdays:

> The last day of the week, Friday (Highday), was the chief day, and one of holiday (after noon) and evening feasts.

So culturally speaking, Highday "more nearly" corresponded with Gregorian Sunday,
and Mersday with Gregorian Saturday.
Since Shire weekday names originated from Kings' Reckoning weekday names,
I assumed the same cultural correlation in Gondor,
so these Gondorian calendars also correlate their weekdays similarly with Gregorian weekdays.
In other words, Eärenya (Sea Day) corresponds with Gregorian Saturday
and Valanya (Valar Day) with Gregorian Sunday.

### Rivendell Reckoning Notes

* For a general reference for converting a date in the modern Gregorian calendar, in any year, to a
  date in the Rivendell Reckoning calendar, I recommend using my
  [Reformed Rivendell Reckoning rules](#reformed-rivendell-reckoning)
  (and choosing a non-leap year for dates between February 28 and Rivendell New Year's Day).

Since the Rivendell Reckoning calendar (also known as the Calendar of Imladris)
described by Tolkien has very different leap-day rules than the
[Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar), then by default,
the Calendar of Imladris in this project will follow its
["traditional" rules](https://en.wikipedia.org/wiki/Middle-earth_calendar#Calendar_of_Imladris)
where every year has 365 days,
except every 12th year is a leap-year, which adds 3 extra days in the middle of the year,
however every 432nd year is not a leap-year.
Compare these rules to the Gregorian calendar, where every year has 365 days,
except every 4th year is a leap-year, which adds 1 leap-day,
except the last year in a century is not a leap-year,
however every 4th century is a leap-year.

In other words, both calendars average 1 leap-day every 4 years (which is the same average as 3 leap-days every 12 years),
but the Gregorian calendar omits 3 leap-days every 400 years (once a century except every 4th century),
whereas the Calendar of Imladris omits 3 leap-days every 432 years.

These leap-day rules are close enough that these calendars will stay in sync with each other for a few centuries,
but due to the differences, these calendars would not stay in sync with each other over longer periods of time.
Approximately every 1700 years,
[the 432-year cycle of the Calendar of Imladris will drift a day ahead](Rivendell_Drift.md)
of the Gregorian calendar's 400-year cycle, and gradually, over the millennia,
the dates of the Calendar of Imladris will fall on later and later dates in the Gregorian calendar.

I chose March 22nd as the default starting date of this Calendar of Imladris,
and its first year starts reckoning (or starts re-reckoning by some imagined mechanism)
on year 1 of the [proleptic Gregorian calendar](https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar),
in order to keep its leap-years in sync with our Gregorian leap-years
(to make it easier to compare how the Calendar of Imladris relates to our Gregorian calendar).
In other words, this calendar starts reckoning
on March 22nd, 1 A.D. of the [proleptic Gregorian calendar](https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar).

#### Why March 22nd?

Starting this calendar from Gregorian March 22 with "traditional" rules allows September 22 during our lifetimes
(the usual date of the contemporary [autumnal equinox](http://en.wikipedia.org/wiki/Equinox);
and the date also known as [Hobbit Day](https://en.wikipedia.org/wiki/Hobbit_Day))
to always fall on one of the 3 Middle-days (Enderi) from about 1900 until 2100,
and also allows Rivendell New Year's Day (Yestarë) to "re-sync" with March 25 for a few years
following one of its leap-years during these centuries.

Unfortunately, Tolkien never stated in the Appendices of *The Lord of the Rings*
when the Calendar of Imladris was established or from what date it started reckoning,
so we don't have anything "cannon" to choose from as a proper first day to start our reckoning in modern times.

Tolkien provided many thorough details about his calendars in Appendix D,
but he only provided a few (sometimes vague) details of how each calendar related to one another,
and [as mentioned earlier](#reckoning-start-dates), only the Shire Calendar was compared to the Gregorian calendar,
which complicates attempts to observe these calendars in modern times.
Perhaps he was intentionally vague on some of these details,
as indicated by his [letter #268](http://tolkiengateway.net/wiki/Letter_268)
(it's referring to the fate of Shadowfax at the end of the story, but I think it also applies to Appendix D):

> I feel it is better not to state everything (and indeed it is more realistic,
> since in chronicles and accounts of 'real' history,
> many facts that some enquirer would like to know are omitted,
> and the truth has to be discovered or guessed from such evidence as there is)."
>
> -- J.R.R. Tolkien's letter #268, as quoted in The Lord of the Rings: A Reader's Companion

So it's up to the reader to put together the clues Tolkien left us in the Appendices of *The Lord of the Rings*,
in order to figure out how these calendars,
throughout their history in Middle-earth,
would have related to a modern Gregorian calendar,
and perhaps that will help us to determine a "proper" way to observe these calendars in modern times.

Many have already attempted this, including Boris Shapiro in his article
"[The Calendars of Imladris, Gondor and the Shire and their adaptation for Gregorian reckoning](http://www.elvish.org/gwaith/calendars.htm)",
which is the article I've usually seen referenced for observing the Calendar of Imladris in modern times.
Shapiro provides an excellent comparison of the history of our modern Gregorian calendar
with a hypothetical Rivendell calendar that starts its reckoning from the classical Julian date of March 29, 1 A.D.

To see how Shapiro's calculations work out using this project,
[set the Rivendell calendar on this project's home page to start reckoning from March 27](https://psarando.github.io/shire-reckoning/#tolkien-calendars),
because the calendars on this project's home page start reckoning from 1 A.D. using the
[proleptic Gregorian calendar](https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar),
and the [proleptic Gregorian March 27 in 1 A.D. is equivalent to the classical Julian March 29 in 1 A.D](https://en.wikipedia.org/wiki/Conversion_between_Julian_and_Gregorian_calendars).

##### Why not March 29th?

Shapiro focuses on 2 clues from Appendix D for determining this starting date of the Calendar of Imladris in modern times:

1. Tolkien stated "our New Year's Day corresponded more or less to the Shire January 9" (Afteryule 9).
2. Rivendell New Year's Day "corresponded more or less with Shire April 6" (Astron 6).
    * The timeline given in *The Lord of the Rings* Appendix B
      lists the Elves' New Year's Day precisely on Astron 6 in the Third Age 3019
      (the year the One Ring was destroyed).

So Shapiro concludes that if Shire Afteryule 9 was January 1, then Shire Astron 6 was March 29
(and Shire New Year's Day was [December 23](#reckoning-start-dates));
and if Rivendell New Year's Day was Shire Astron 6, then Rivendell New Year's Day was also March 29.

Note that Shapiro begins reckoning the Calendar of Imladris from 1 A.D.
because he claims that could be the start of 7th Age of Middle-earth.
I know of no evidence that the Calendar of Imladris should re-start its reckoning at the start of each Age,
but keep in mind that this project makes no claims about the Ages of Middle-earth in modern times.
The Calendar of Imladris on this project's home page starts reckoning
on year 1 of the [proleptic Gregorian calendar](https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar)
to make it easier to compare how the Calendar of Imladris relates to our modern Gregorian calendar.

Regardless of why we start reckoning from 1 A.D.,
I still don't believe March 29 is a proper starting date for observing the Calendar of Imladris in modern times.

First, I think when Tolkien stated "our New Year's Day corresponded more or less to the Shire January 9" (Afteryule 9),
he was making a correspondence between the modern Gregorian January 1 and Shire Afteryule 9,
which means Shire New Year's Day would have corresponded to the Gregorian December 23,
and Shire Astron 6 would have corresponded to the Gregorian March 29.
Shapiro starts his reckoning from the classical Julian March 29 in 1 A.D,
but the [proleptic Gregorian March 29 in 1 A.D. is equivalent to the classical Julian March 31 in 1 A.D.](https://en.wikipedia.org/wiki/Conversion_between_Julian_and_Gregorian_calendars)
Likewise, the proleptic Gregorian December 23 in 1 A.D. is equivalent to the classical Julian December 25 in 1 A.D.
(which may have something to do with [Tolkien's 1942 moon phases alignment](#reckoning-with-moon-phases)).

Second, we know that the Calendar of Imladris New Year's Day ended up on a Shire Astron 6 by the end of the Third Age,
but that doesn't necessarily mean that a Calendar of Imladris should start reckoning from that date.
Due to the differences between the "traditional" [Shire Calendar leap-year rules](#reckoning-start-dates)
and the [Calendar of Imladris leap-year rules](#rivendell-reckoning-notes),
the dates of one calendar will not always fall on the same dates of the other,
which explains why Tolkien said Rivendell New Year's Day "corresponded more or less with Shire April 6" (Astron 6).
These differences in leap-year rules also means that
these calendars would not stay in sync over the centuries,
and the dates of the Calendar of Imladris would fall on later and later dates in the Shire Calendar.
So depending on what year the Calendar of Imladris started its reckoning,
its first New Year's Day could have been much earlier than where Shire Astron 6 would have been in that year.

Finally, since Tolkien was so vague with the correspondences between the Rivendell, Shire, and Gregorian calendars,
I will re-examine the clues Tolkien left us in the Appendices to determine a better
Gregorian date for Rivendell New Year's Day by the end of the Third Age,
then attempt to work backwards from there to find a more fitting starting date.

##### Rivendell New Year's Day fell on a March 25th by the end of the Third Age

If we examine all the clues given by J.R.R. Tolkien in *The Lord of the Rings* Appendices,
and if all the calendar rules and the details of Appendix D are tied together,
and if you happen to align a hypothetical Gregorian calendar with the start of the Second Age,
then the Shire 'April' 6 (Astron 6) in the Third Age (T.A.) 3019
(the year of the downfall of Barad-dûr and Sauron when the One Ring was destroyed),
is equivalent to that hypothetical Gregorian calendar's March 25.

Since *The Tale of Years* (Appendix B) lists the Elves' New Year's Day on Shire 'April' 6 (Astron 6) in T.A. 3019,
then Rivendell New Year's Day (Yestarë) was also on Gregorian March 25 in T.A. 3019.

First I'd like to point out how the Elves' New Year's Day on a Gregorian March 25 corresponding to Shire 'April' 6 (Astron 6)
mirrors a similar relationship between the old Julian calendar and the modern Gregorian calendar in England:

* March 25 of the Julian calendar
  [was the start of the legal year in England](https://en.wikipedia.org/wiki/Gregorian_calendar#Beginning_of_the_year)
  (also known as [Lady Day](https://en.wikipedia.org/wiki/Lady_Day#Non-religious_significance))
  before the adoption of the Gregorian calendar in 1752,
  which converted to Gregorian April 5 at that time.
  Then the Julian March 25 corresponded to Gregorian April 6 in the year 1800
  (when the Gregorian calendar omitted its leap-day but the Julian calendar did not),
  and [April 6 is still the start of the United Kingdom's tax year to this day](https://en.wikipedia.org/wiki/Quarter_days#In_England).

I don't think this is mere coincidence and it strikes me as intentionally calculated by Tolkien.

In order to demonstrate how Rivendell New Year's Day ended up on a Gregorian March 25th by the end of the Third Age,
I'll examine the following details given by Tolkien in *The Lord of the Rings* Appendix D
(some of which have already been discussed earlier in these notes):

1. "our New Year's Day corresponded more or less to the Shire January 9".
2. Rivendell New Year's Day "corresponded more or less with Shire April 6" (Astron 6).
    * The timeline given in *The Lord of the Rings* Appendix B
      lists the Elves' New Year's Day precisely on Astron 6 in the Third Age 3019
      (the year the One Ring was destroyed).
3. The correlations of the New Reckoning dates with the Kings' and Shire Reckoning dates imply these
   calendars were in sync by the Third Age 3019:
    * "March 25, the date of the downfall of Barad-dûr... was, however, March 25 in both Kings' and Stewards' Reckoning."
    * In other words, Shire Rethe 25 = New Reckoning New Year's Day (Yestarë) = Kings'/Stewards' Reckoning Súlimë 25.
4. The details of the Kings' Reckoning leap-day rules make it possible to calculate that this
   calendar drifted 3 days behind a proleptic Gregorian calendar over the 6460 year period
   from the start of the Second Age to the start of the Third Age 3019,
   which implies the Shire Calendar was also 3 days behind this hypothetical Gregorian calendar at the start of T.A. 3019.

When Tolkien stated "our New Year's Day corresponded more or less to the Shire January 9" (Afteryule 9),
this implies he was making a correspondence between the Gregorian January 1 and Shire Afteryule 9.

[As mentioned earlier](#why-not-march-29th),
many would then conclude that Shire New Year's Day must correspond ("more or less") to Gregorian December 23,
Astron 6 must correspond ("more or less") with March 29th,
therefore Rivendell New Year's Day (Yestarë) should also corresponded ("more or less") with March 29th.

Now consider Tolkien's other statements about the Shire Calendar in Appendix D more closely:

1. Shire Reckoning was based on the calendar of Gondor called the Kings' Reckoning,
which later became the Stewards' Reckoning calendar of Gondor.
These calendars must have been aligned by the Third Age 3019,
since Tolkien states in Appendix D that the New Year's Day of the New Reckoning calendar corresponded
with "March 25" of the Shire, Kings', and Stewards' Reckoning calendars (Rethe 25 and Súlimë 25).
The Stewards' Reckoning was only a slight modification of the Kings' Reckoning calendar,
and the New Year's Day (Yestarë), 'March' (Súlimë) 25, and "Mid-year’s Day" (Loëndë)
of both calendars still fell on the same days.

    > The months and days, therefore, throughout The Lord of the Rings refer to the Shire Calendar.
    > ... March 25, the date of the downfall of Barad-dûr
    > ... was, however, March 25 in both Kings' and Stewards' Reckoning.
    >
    > -- J.R.R. Tolkien, The Lord of the Rings Appendix D

2. The Kings' Reckoning was established in Númenor, and started reckoning from the first year of the Second Age (S.A.).
Both the [Kings' and Shire Reckoning followed leap-year rules similar to the Gregorian calendar](#reckoning-start-dates),
but the slight difference in leap-day rules is enough to cause dates between these calendars and the Gregorian calendar
to gradually drift apart over the millennia
(similar to [how the Julian and Gregorian calendars drift apart](https://en.wikipedia.org/wiki/Gregorian_calendar#Difference_between_Gregorian_and_Julian_calendar_dates)),
but Tolkien detailed additional (leap-day) adjustments to the calendars of Gondor during the Third Age:
    * The 2 millennial leap-days were added throughout the Second Age, which ended in S.A. 3441,
      and again up to the Third Age (T.A.) 2000 (which would have been S.A. 5441).
    * Then 2 more extra leap-days were added in T.A. 2059 (S.A. 5500)
      when Stewards' Reckoning was introduced.
    * Then one more extra leap-day was added in T.A. 2360 (S.A. 5801) by Hador the Steward.
    * Tolkien states that no more extra leap-days are added between then
      and the War of the Ring, or the start of the Fourth Age after that (T.A. 3021 or S.A. 6462).
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
suggesting how the Shire Calendar stayed in sync with the Stewards' Reckoning calendar
by the end of the Third Age:

    > These alterations seem to have become recognized eventually throughout the west-lands;
    > but there were no further corrections during the Third Age.
    >
    > -- J.R.R. Tolkien, as quoted in The Lord of the Rings: A Reader's Companion Appendix D

If the Shire Calendar stayed in sync with the Kings' and Stewards' calendars,
then when Tolkien stated "our New Year's Day corresponded more or less to the Shire January 9" (Afteryule 9),
then this is also a correspondence between Gregorian January 1 and Kings' Reckoning Narvinyë 9.
So if Shire Mid-year’s Day corresponded more or less with Gregorian June 23,
then so did the Kings' Reckoning "Mid-year’s Day" (Loëndë),
and if Shire New Year's Day corresponded more or less with Gregorian December 23,
then so did the Kings' Reckoning New Year's Day.

As explained above, the Shire and Gondor calendars would not stay in sync over the centuries with a Gregorian calendar
due to their differences in leap-year rules,
so at what point in the history of these calendars does Tolkien's correspondence apply?

What if this was meant to hint at a correspondence in the 1st year of the Kings' Reckoning at the start of the Second Age?

If we align a hypothetical Gregorian calendar to the start of the Second Age,
and we apply the correspondence of Gregorian January 1 with the Kings' Reckoning Narvinyë 9 in this 1st year of the Second Age,
then the 1st Kings' Reckoning "Mid-year’s Day" (Loëndë) corresponded to this hypothetical Gregorian calendar's June 23rd,
and the 1st day of the Kings' Reckoning (Yestarë) started its reckoning from this hypothetical Gregorian calendar's December 23rd.

Then by T.A. 3019, this calendar of Gondor would have added 3 less leap-days than this hypothetical Gregorian calendar,
which means its New Year's Day would have drifted back 3 days relative to this Gregorian calendar
(the Stewards' Reckoning was only a slight modification of the Kings' Reckoning calendar
so that the dates of New Year's Day and Mid-year's Day did not change).
Then the New Year's Day of both the Gondor and Shire calendars would have corresponded with December 20 in T.A. 3019.

Now note that the year 6460 in a Gregorian calendar is also a leap year,
so Astron 6 in T.A. 3019 would have corresponded to the Gregorian March 25
(to see this for yourself,
[set the Shire Calendar to start reckoning from December 20 and the Gregorian Date to March 25, 6460](https://psarando.github.io/shire-reckoning/#tolkien-calendars)).
This also means the Shire Reckoning New Year's Day was another day behind in T.A. 3020,
which means Astron 6 corresponded to Gregorian March 25 again
(the date the mallorn tree first flowered in the Party Field),
until the Overlithe in that "Great Year of Plenty"
re-synced Shire New Year's Day with December 20 in T.A. 3021.

Since *The Tale of Years* (Appendix B) lists the Elves' New Year's Day on Astron 6 in T.A. 3019,
then Rivendell New Year's Day (Yestarë) was also Gregorian March 25 in T.A. 3019
([see it in action on the Middle-earth simulation page](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html)).

We may also be assured that the Elves' New Year's Day was precisely on Shire Astron 6 in T.A. 3019,
and the Kings'/Stewards' Reckoning Súlimë 25 was on Shire Rethe 25 in T.A. 3019,
due to the following quote near the beginning of Appendix D (note that S.R. 1418, 1419 are the same years as T.A. 3018, 3019):

> I am not skilled in these matters, and may have made many errors;
> but at any rate the chronology of the crucial years of S.R. 1418, 1419
> is so carefully set out in the Red Book
> that there cannot be much doubt about days and times at that point.

If Tolkien really did work out the calculations of the calendars of Appendix D
so that the Elves' New Year's Day on Shire Astron 6 in T.A. 3019 could fall on a Gregorian March 25,
then I think he was more skilled in these matters than some might realize.
This would also explain the reason behind the seemingly confusing extra day added to T.A. 2360 by Hador the Steward,
and the omission of the 2 millennial leap-days in T.A. 3000.

##### Loose Ends

###### First Day of the Calendar of Imladris

It's not stated in the Appendices of *The Lord of the Rings*
when the Calendar of Imladris was established or from what year it started reckoning,
but now that we know the Rivendell New Year's Day (Yestarë)
could have corresponded with a Gregorian March 25 by the end of the Third Age,
let's attempt to work backwards from this date to find a more appropriate date for
the first Yestarë of the Calendar of Imladris.

When Rivendell New Year's Day (Yestarë) corresponds to Gregorian March 25,
that Yestarë falls very close to the [spring equinox](http://en.wikipedia.org/wiki/Equinox)
and the 3 Middle-days (Enderi) fall on or very close to the [autumnal equinox](http://en.wikipedia.org/wiki/Equinox).

March 20th is the usual date of the contemporary spring equinox,
although March 21st was the more common date of the spring equinox in the first half of the 20th century.
In fact, the [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar)
was designed so that the spring equinox should always fall between March 19th and March 21st,
from the time it was conceived and into the foreseeable future.
Since the [Calendar of Imladris and the Gregorian calendar have similar leap-year rules](#rivendell-reckoning-notes),
this might suggest Rivendell's Yestarë and Enderi were intended to correspond as nearly as possible with the equinoxes,
which is also similar to how the Shire Calendar
"Mid-year’s Day was intended to correspond as nearly as possible to the summer solstice".

In Tolkien's letter #211, he estimated the events of
*The Lord of the Rings* could have occurred approximately 6000 years ago,
and around that time
[the spring equinox generally occurred on a proleptic Gregorian March 21 or 22](http://www.thetropicalevents.com/pngCharts/eVE_Gregorian1.png).
Due to the difference in leap-day rules between the Calendar of Imladris and the Gregorian calendar,
these calendars would not stay in sync with each other over long periods of time.
Approximately every 1700 years,
[the 432-year cycle of the Calendar of Imladris will drift a day ahead](Rivendell_Drift.md)
of the Gregorian calendar's 400-year cycle.
If the Calendar of Imladris started reckoning on a proleptic Gregorian March 21 or 22,
then after enough millennia Yestarë will have drifted to correspond with March 25th.

Aaron Chong suggests that the Calendar of Imladris could have started its reckoning from the first Year of the Sun in the First Age
(590 years before the start of the Second Age)
in his blog post [Tolkien's Legendarium versus Astronomical Reality](http://rinsanity.weebly.com/tolkien.html).
I also noticed this suggestion in the forum post
[Middle-earth chronology](http://tolkienforums.activeboard.com/t42820320/middle-earth-chronology/),
by James "the Just" Strom, which is also linked in Aaron Chong's blog post.

If the Calendar of Imladris started reckoning from the first Year of the Sun in the First Age,
then the 7049 years from then to the end of the War of the Ring
(590 Years of the Sun + S.A. 3441 + T.A. 3018 = 7049)
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
Additionally, the names of the months (or "seasons") and the leap-year rules of the Calendar of Imladris indicate that it's a
[solar calendar](https://en.wikipedia.org/wiki/Solar_calendar).

In a previous revision of these notes, I had naively
[set the Gregorian year in this calendar to 7050](https://psarando.github.io/shire-reckoning/examples/rivendell-calendars.html)
and observed that if the Calendar of Imladris started reckoning from a proleptic Gregorian March 21,
then its Yestarë fell on Gregorian March 25 in the year 7050.
[Recall in the notes above](#rivendell-new-years-day-fell-on-a-march-25th-by-the-end-of-the-third-age)
that we compared the Shire Calendar's Astron 6
with a Gregorian calendar in its 6460th year to get the corresponding date of March 25.
Since a Gregorian calendar in its 6460th year is at a different point in a 400-year cycle
than a Gregorian calendar in its 7050th year, it's not correct to compare the Calendar of Imladris
with the Shire Calendar in this way.
It would be more accurate to compare the Calendar of Imladris with the same Gregorian calendar in its 6460th year,
which means the Calendar of Imladris would have to start reckoning in this Gregorian calendar's year 590 B.C.E.
This would also mean that the leap-years of this Calendar of Imladris
would not be in sync with the leap-years of this Gregorian calendar,
so it makes the comparison more complicated;
but the first few years of this Calendar of Imladris
would correspond with this Gregorian calendar's March 22
in order for its Yestarë to fall on March 25 in this Gregorian calendar's year 6460.
More precisely,
the Calendar of Imladris would have to start reckoning on a March 23 in this Gregorian calendar's year 590 B.C.E.,
but the year 590 B.C.E. in the Gregorian calendar is right before a leap-year,
so in the next 4 years (589 B.C.E. through 586 B.C.E.) Yestarë would fall on a March 22.
One way to look at this would be to consider this Gregorian calendar as already a day off from the seasons in 590 B.C.E.,
and its leap-day in 589 B.C.E. will re-sync it with the seasons and this Calendar of Imladris
([see it in action on the Middle-earth simulation page](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html)).

So for these reasons, in addition to those [given at the beginning of these Rivendell Reckoning notes](#why-march-22nd),
I have settled on March 22 as the default date for the first Yestarë of this project's Calendar of Imladris.

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
One potential problem with assuming the first Loëndë should correspond with a June 23rd summer solstice
is that Tolkien stated in Appendix D that the Kings' Reckoning New Year's Day originated in "mid-winter",
which may imply it was originally intended to correspond with the [winter solstice](https://en.wikipedia.org/wiki/Solstice).
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

This could be reasonable in the context of the mythology of Middle-earth,
since the world of Middle-earth was a flat world only about 3000 years before the War of the Ring,
when the epic cataclysm of the Downfall of Númenor made it into the round world we know today.
If we allow for the possibility that this mythological flat world
(and the first 3000 years of the round world)
had more static lengths of years and seasons,
then these calendars could be more applicable to that mythological past than our actual planet's physical history.
Aaron Chong suggests something similar in his [blog post](http://rinsanity.weebly.com/tolkien.html) as well.

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

[As explained above](#rivendell-new-years-day-fell-on-a-march-25th-by-the-end-of-the-third-age),
Gregorian March 25 corresponds to the Elves' New Year's Day by the end of the narrative
(in the year of the downfall of Sauron when the One Ring was destroyed in T.A. 3019),
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
[March 25th](https://en.wikipedia.org/wiki/Lady_Day#Non-religious_significance),
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
* [A Tolkien Calendar: Part 1 | Miruvor](https://taruithornmiruvor.wordpress.com/2015/05/24/a-tolkien-calendar-part-1/#attachment_143):
  Joe Bartram's article on the history of Middle-earth calendars,
  including an excellent chart of the "evolution and divergence of calendar systems in Middle Earth".
* [Tolkien's Legendarium versus Astronomical Reality](http://rinsanity.weebly.com/tolkien.html)
* [Wikipedia article on the pre-latin Germanic calendar](https://en.wikipedia.org/wiki/Germanic_calendar)
* [Wikipedia article on the Coligny calendar](https://en.wikipedia.org/wiki/Coligny_calendar):
  A possible inspiration behind the design of Tolkien's calendars in Appendix D,
  particularly the similarity of the Enderi to the *trinoxtion Samonii*.
* [Wikipedia article on Middle-earth calendars](https://en.wikipedia.org/wiki/Middle-earth_calendar)
* [Wikipedia article on the Ages of Middle-earth](https://en.wikipedia.org/wiki/Timeline_of_Arda)
* [Wikipedia solstice article](https://en.wikipedia.org/wiki/Solstice)
* [Wikipedia equinox article](https://en.wikipedia.org/wiki/Equinox)
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
