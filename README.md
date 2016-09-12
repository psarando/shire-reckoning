Shire Reckoning
===============

> The months and days, therefore, throughout The Lord of the Rings refer to the Shire Calendar.
>
> ... Mid-year's Day was intended to correspond as nearly as possible to the summer solstice.
> In that case the Shire dates were actually in advance of ours by some ten days...
>
> -- J.R.R. Tolkien, The Lord of the Rings, Appendix D

This repository contains a couple of scripts that generate calendars showing the current date in J.R.R. Tolkien's 'Shire Reckoning'.
One script [displays the calendars described in The Lord of the Rings, Appendix D](http://psarando.github.io/shire-reckoning),
with each day of each calendar labeled with the corresponding [Gregorian date](https://en.wikipedia.org/wiki/Gregorian_calendar).
The other script generates a [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar)
with each day labeled with the corresponding Shire Reckoning date
(pre-generated in [shire-reckoning.ics](shire-reckoning.ics)).

The primary goal of this project is to visualize how the calendars described in Appendix D relate to the
[Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar).
So the Shire Reckoning calendar is displayed according to the reasonable rules suggested by
[Shire-Reckoning.com](http://shire-reckoning.com/calendar.html),
where Shire Mid-year's Day is aligned as much as possible with the contemporary
[summer solstice](https://en.wikipedia.org/wiki/Solstice) (which is usually on June 21st),
and it follows the same leap-day rules of the Gregorian calendar.
This allows it to stay in sync with the Gregorian calendar so that most Shire Reckoning dates
will always fall on the same Gregorian date.

These calendars make no attempt to correlate Gregorian years with Shire-reckoning years or the Ages of Middle-earth.
Additionally, these calendars always reckon their dates from midnight to midnight,
just as our modern Gregorian calendar and the Shire Calendar reckon dates.
Note that Tolkien stated in Appendix D that the Gondor calendars reckoned their dates from sunrise to sunrise,
and the Elves reckoned their dates from sunset to sunset.

## [tolkien-calendars](http://psarando.github.io/shire-reckoning): html + css + javascript

The [html](html) directory contains files that can generate a visualization of
the calendars described in The Lord of the Rings, Appendix D, in a web browser as simple HTML tables,
labeled with each day's corresponding Gregorian date of the current year,
and with today's date highlighted on each calendar.
These calendars are the [Shire Reckoning, Rivendell Reckoning, and calendars of Gondor:
Kings' Reckoning, Stewards' Reckoning, and the New Reckoning](http://psarando.github.io/shire-reckoning).

More examples of each calendar can be found in the [examples directory](html/examples):

* [Shire Calendar examples](http://psarando.github.io/shire-reckoning/examples/shire-calendars.html)
* [Rivendell Calendar examples](http://psarando.github.io/shire-reckoning/examples/rivendell-calendars.html)
* [Númenor Calendar examples](http://psarando.github.io/shire-reckoning/examples/numenor-calendars.html)

These javascript calendars use the [React javascript library](http://facebook.github.io/react/).

### Shire Reckoning Notes

> In the above notes [of Appendix D], as in the narrative,
> I have used our modern names for both months and weekdays,
> though of course neither the Eldar nor the Dúnedain nor the Hobbits actually did so...
>
> All the days, months, and dates are in the Red Book translated into Shire terms, or equated with them in notes.
> The months and days, therefore, throughout The Lord of the Rings refer to the Shire Calendar.
>
> -- J.R.R. Tolkien, The Lord of the Rings, Appendix D

In other words,
as Tolkien "translated" the [Red Book of Westmarch](https://en.wikipedia.org/wiki/Red_Book_of_Westmarch)
into English as [The Lord of the Rings](#references),
he "translated" (or rather substituted) the Shire names of the months and weekdays with
[Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar) names,
so that Mersday becomes Thursday and Rethe becomes March in the narrative.

These scripts use the original Shire names by default,
but a control is available in this visualization to display the Shire Calendar with the Gregorian names
Tolkien used as substitutions, and there's also the option to display the calendar
with the alternate month names used in Bree.

The descriptions of the month and weekday names in this visualization were taken from
[The Lord of the Rings: A Reader's Companion](#references),
[Shire-Reckoning.com](http://shire-reckoning.com/calendar.html),
and the [Wikipedia article on the pre-latin Germanic calendar](https://en.wikipedia.org/wiki/Germanic_calendar).
To see these descriptions, hover your cursor over any day in a month or over a weekday header cell,
and a tooltip will display the description of that month or weekday name.

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
Note this annotation from [The Lord of the Rings: A Reader's Companion](#references),
referring to its chart demonstrating this alignment:

> N.B. the chart in 'Chronologies, Calendars, and Moon' earlier in the present volume is concerned
> only with Tolkien's method of adjusting the lunar calendar for 1941-2 to his changing ideas within the narrative.
> It has no relation to the correspondences discussed in Appendix D.

* Since moon phases [approximately repeat dates every 19 years](https://en.wikipedia.org/wiki/Metonic_cycle),
  then these 1941-2 moon phases will repeat on most of these same "adjusted" dates
  (reckoning the start of the Shire Calendar year from Gregorian December 25) in 2017-18.
* If reckoning the start of the Shire Calendar year from Gregorian December 21,
  then the moon phases of 2020-21 will match the Shire Reckoning dates of the narrative instead
  (and a bit better).

### Notes on the visualizations of the calendars of Gondor

Since the Shire Calendar originated from the Kings' Reckoning,
and in order to keep these calendars in sync with each other
as Tolkien described in The Lord of the Rings, Appendix D,
the calendars of Gondor in these scripts will also follow the Gregorian leap-day rules
so that they will always stay in sync with the Shire Reckoning calendar in these scripts.

These calendars actually had very similar, but slightly different leap-day rules compared to the
Gregorian calendar's leap-day rules, [as described below in the Rivendell Reckoning notes](#why-not-march-29th).

Also note Tolkien's statements in Appendix D about the Shire's weekdays.

> The last day of the week, Friday (Highday), was the chief day, and one of holiday (after noon) and evening feasts.

So culturally speaking, Highday "more nearly" corresponded with Gregorian Sunday,
and Mersday with Gregorian Saturday.
Since Shire weekday names originated from Kings' Reckoning weekday names,
I assumed the same cultural correlation in Gondor,
so these Gondorian calendars also correlate their weekdays similarly with Gregorian weekdays.
In other words, Eärenya corresponds with Gregorian Saturday and Valanya with Gregorian Sunday.

### Rivendell Reckoning Notes

* For a general reference for converting a date in the Gregorian calendar, in any year, to a
  date in the Rivendell Reckoning calendar, I recommend using the
  [Reformed Rivendell Reckoning rules](#reformed-rivendell-reckoning)
  (and choosing a non-leap year for dates between February 28 and Rivendell's New Year's Day).

Since the Rivendell Reckoning calendar (also known as the Calendar of Imladris)
described by Tolkien had very different leap-day rules than the Gregorian calendar, then by default,
this Calendar of Imladris will follow those
["traditional" rules](https://en.wikipedia.org/wiki/Middle-earth_calendar#Calendar_of_Imladris)
where every year has 365 days,
except every 12th year which is a leap-year that adds 3 extra days in the middle of the year,
except every 432nd year which is not a leap-year.

I chose March 21st as the default starting date of this Calendar of Imladris,
and to keep the date and leap-year calculations simple,
its years are also synced with the Gregorian calendar years.
In other words, this calendar starts reckoning (or starts re-reckoning by some imagined mechanism)
on March 21st, 1 A.D. of the [proleptic Gregorian calendar](https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar).

#### Why March 21st?

The following details given by Tolkien in The Lord of the Rings, Appendix D, and his letter #211,
imply that Rivendell New Year's Day was on a proleptic Gregorian March 25 in the Third Age 3019
(the year the One Ring was destroyed and of the downfall of Barad-dûr and Sauron),
which seems to support a March 21st start of the reckoning of the Calendar of Imladris 7050 years before that
(590 Years of the Sun in the First Age + 3441 years in the Second Age + 3019 years in the Third Age):

1. Tolkien's letter #211 estimated the events of The Lord of the Rings could have occurred around 6000 years ago.
2. Rivendell New Year's Day "corresponded more or less with Shire April 6" (Astron 6).
    * The timeline given in The Lord of the Rings, Appendix B,
      lists the Elves' New Year's Day precisely on Astron 6 in the Third Age 3019.
3. Gregorian January 1 corresponded "more or less to the Shire January 9" (Afteryule 9).
4. The correlations of the New Reckoning dates with the Kings' and Shire Reckoning dates imply these
   calendars were in sync by the Third Age 3019:
    * Rethe 25 = New Reckoning New Year's Day = Kings'/Stewards' Reckoning Súlimë 25
5. The details of the Kings' Reckoning leap-day rules make it possible to calculate that this
   calendar drifted 3 days behind a proleptic Gregorian calendar over the 6460 year period
   from the start of the Second Age to the start of the Third Age 3019,
   which implies the Shire Calendar was also 3 days behind at the start of the Third Age 3019.

In The Lord of the Rings, Appendix D, Tolkien states that the first day of the Rivendell Reckoning
calendar "corresponded more or less with Shire April 6" (Astron 6).
This corresponds to Gregorian March 27 (in non-leap years)
[if we align the Shire Mid-year's Day](http://shire-reckoning.com/calendar.html)
with the contemporary [summer solstice](https://en.wikipedia.org/wiki/Solstice) of Gregorian June 21,
by always aligning Shire New Year's Day with December 21.
This puts the Calendar of Imladris New Year's Day very close to the [spring equinox](http://en.wikipedia.org/wiki/Equinox)
and the 3 Middle-days (Enderi) very close to the [autumnal equinox](http://en.wikipedia.org/wiki/Equinox),
which suggests these days were intended to correlate as closely as possible with these equinoxes.

In Tolkien's letter #211, he estimated the events of
The Lord of the Rings could have occurred approximately 6000 years ago,
and around that time (and throughout much of antiquity)
[the spring equinox did generally occur on proleptic Gregorian March 21](http://www.thetropicalevents.com/pngCharts/eVE_Gregorian1.png).
Due to the difference in leap-day rules between the Calendar of Imladris and the Gregorian calendar,
these calendars do not stay in sync with each other over long periods of time.
Approximately every 1700 years the 432-year cycle of the Calendar of Imladris
will drift a day ahead of the Gregorian calendar.
If the Calendar of Imladris started reckoning on a proleptic Gregorian March 21,
then after enough millennia Rivendell's New Year's Day will have drifted to correspond with
March 27th. Also note that when Rivendell's New Year's Day falls on March 25th,
the 3 Enderi start on September 22nd, which is the usual date of the
[autumnal equinox](http://en.wikipedia.org/wiki/Equinox) in our time.

However, Tolkien also stated in Appendix D
that January 1 of the Gregorian calendar would have corresponded
"more or less to the Shire January 9" (Afteryule 9).
If Gregorian January 1 corresponded to Afteryule 9,
then that would put the Shire Mid-year's Day on Gregorian June 23
(or June 22 in leap-years; to see this for yourself,
[set the Shire Calendar to start reckoning from December 23](http://psarando.github.io/shire-reckoning/#tolkien-calendars)).
Since Tolkien also stated that "Mid-year's Day was intended to correspond as nearly as possible to the summer solstice",
this would seem to put Shire Mid-year's Day 2 days after our usual summer solstices,
but note that the summer solstice did generally occur on
[proleptic Gregorian June 23 around 6000 years ago, and throughout much of antiquity](http://www.thetropicalevents.com/pngCharts/eSS_Gregorian1.png).

##### Why not March 29th?

If Shire Mid-year's Day corresponded with June 23rd, then wouldn't Astron 6 correspond with March 29th?
Now consider Tolkien's other statements about the Shire Calendar in Appendix D:

1. Shire Reckoning was based on the calendar of Númenor (and later of Gondor)
called the Kings' Reckoning, which later became the Stewards' Reckoning calendar of Gondor.
These calendars must have stayed aligned by the Third Age 3019,
since Tolkien states in Appendix D that the New Year's Day of the New Reckoning calendar corresponded
with "March 25" of the Shire, Kings', and Stewards' Reckoning calendars (Rethe 25 and Súlimë 25).

    > The months and days, therefore, throughout The Lord of the Rings refer to the Shire Calendar.
    > ... March 25, the date of the downfall of Barad-dûr
    > ... was, however, March 25 in both Kings' and Stewards' Reckoning.
    >
    > -- J.R.R. Tolkien, The Lord of the Rings, Appendix D

2. The Kings' Reckoning was founded in the first year of the Second Age (S.A.).
Both the Kings' and Shire Reckoning followed leap-year rules similar to the Gregorian calendar,
where every 4th year is a leap-year except the last in a century,
but the Gregorian calendar also adds an extra leap-day (i.e. does not omit the leap-day) every 4th century
whereas Kings' Reckoning [adds 2 extra leap-days every millenium](http://rinsanity.weebly.com/tolkien.html)
(as explained in [The Lord of the Rings: A Reader's Companion](#references)).
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

Taking these concepts together with the point made earlier that Gregorian January 1 corresponded
"more or less to the Shire January 9" (Afteryule 9),
then if Mid-year's Day in the original Kings' Reckoning corresponded
with Gregorian June 23 at the start of the Second Age,
meaning its New Year's Day corresponded with Gregorian December 23,
then when it drifted back 3 days relative to the Gregorian calendar by the War of the Ring,
the New Year's Day of both the Gondor and Shire Calendar would have corresponded with December 20 in T.A. 3019.

Now note that the year 6460 in a Gregorian calendar is also a leap year,
so in T.A. 3019 -- Shire Reckoning (S.R.) 1419 --
Astron 6 would instead have correspond to the Gregorian March 25
(to see this for yourself,
[set the Shire Calendar to start reckoning from December 20 and the year to 6460](http://psarando.github.io/shire-reckoning/#tolkien-calendars)).
This also means the Shire Reckoning New Year's Day was another day behind in T.A. 3020 (S.R. 1420),
which means Astron 6 correspond to Gregorian March 25 again,
until the Overlithe that year re-synced Shire New Year's Day with December 20 in T.A. 3021 (S.R. 1421).

If the Calendar of Imladris started reckoning from a proleptic Gregorian March 21
in the first Years of the Sun in the First Age (590 years before the start of the Second Age),
then the 7050 years from then to the end of the War of the Ring
(590 Years of the Sun + S.A. 3441 + T.A. 3019 = 7050)
would have been enough time for Rivendell's New Year's Day to drift to Gregorian March 25 as well.
To see this for yourself, [set the year in this calendar to 7050 (with the default settings)](http://psarando.github.io/shire-reckoning/#tolkien-calendars).

###### Side Notes

* The Elves' New Year's Day of Gregorian March 25 corresponding to Shire "April 6" (Astron 6)
  mirrors this relationship between the old Julian calendar and the modern Gregorian calendar in England:
    * March 25 of the Julian calendar
      [was the start of the legal year in England](https://en.wikipedia.org/wiki/Gregorian_calendar#Beginning_of_the_year)
      before the adoption of the Gregorian calendar in 1752,
      which converted to Gregorian April 5 at that time.
      Then the Julian March 25 corresponded to Gregorian April 6 in the year 1800
      (when the Gregorian calendar omitted its leap-day but the Julian calendar did not),
      and [April 6 is still the start of the United Kingdom's tax year to this day](https://en.wikipedia.org/wiki/Quarter_days#In_England).

* This script works by taking a Gregorian date and calculating a corresponding
  Rivendell calendar year for that date, and as mentioned before,
  its years are synced with the Gregorian calendar years to keep the leap-year calculations simple.
  The next proleptic Gregorian year before 1 A.D. that starts both a 400-year Gregorian leap cycle
  and a 432-year Rivendell Calendar leap cycle would be 10800 B.C.
  (if the year 0 is included) since it's evenly divisible by both 400 and 432.
  So these calculations could easily be adapted to start reckoning the Calendar of Imladris from this
  year, and the 7050 years from then to T.A. 3019 would be 3750 B.C.,
  which is fairly close to Tolkien's 6000-year gap to our time.

##### Remaining Problems

Claiming the Calendar of Imladris should start from a proleptic Gregorian March 21,
because its New Year's Day fell on a proleptic Gregorian March 25 in the Third Age (T.A.) 3019,
requires the following claims in order for the arguments above to tie together:

1. The Calendar of Imladris should start reckoning 590 years before the start of the Second Age
   (in the first Years of the Sun of the First Age).
2. The first day of the Calendar of Imladris should be on a March 21st because the spring equinox
   occurred on a proleptic Gregorian March 21 around the time these stories might have taken place.
3. The first Kings' Reckoning Mid-year's Day (Loëndë) should correspond with June 23rd,
   which implies a December 23rd New Year's Day (Yestarë),
   because the summer solstice occurred on a proleptic Gregorian June 23 around the time of the setting of
   The Lord of the Rings.

The first two points are the most plausible of these claims.

1. Another logical start of the reckoning of the Calendar of Imladris,
   which also allows its New Year's Day to fall on a March 25 in T.A. 3019,
   could be on a March 20th at the start of the Second Age.
   This start date is less likely since Tolkien wrote in Appendix D about a note on the
   Calendars of the Red Book that states that the omission of the 3 extra Enderi at the end of a
   432-year cycle 'has not happened in our time'.
   If this calendar did start at the beginning of the Second Age, then it would have started a
   new cycle just 20 years after the War of the Ring in Shire Reckoning (S.R.) 1439 (T.A. 3039).
   Starting with the Years of the Sun in the First Age means this calendar started a new 432-year
   cycle in S.R. 1281 (T.A. 2881; 9 years before the birth of Bilbo Baggins)
   and its next wasn't due until S.R. 1713 (more than 100 years after the Red Book was copied in Gondor).

    * Note that according to the Elves' mythology,
      the Sun was created and first set sail across the sky starting with the Years of the Sun of the First Age.
      So the "years" were of different length before that time,
      which makes it very unlikely that the Elves would use the Calendar of Imladris to reckon time before then.

2. March 20th is the usual date of the spring equinox these days
   (and during the second half of the 19th century), however
   March 21st was the more common date of the spring equinox in the first half of the 20th century.
   In fact, the [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar)
   was designed so that the spring equinox should always fall between March 19th and March 21st
   from the time it was conceived and into the foreseeable future.

3. The last claim presents the biggest problem:

    * Even if Tolkien was aware that 6000 years ago the summer solstice generally occurred on June 23rd,
      which is a day or 2 different than when it occurs in our time,
      should he have started his calendar of Númenor from that date approximately
      12 thousand years ago without any adjustment?
    * I focused on the first Kings' Reckoning Mid-year's Day (Loëndë) corresponding with June 23rd
      because the Shire Mid-year's Day should coincide with Loëndë,
      and Tolkien made a correlation with the Shire Mid-year's Day and the summer solstice,
      and a correlation with the Shire Calendar and the Gregorian calendar New Year's Day.
      The problem with assuming the first Loëndë corresponded with a June 23rd summer solstice
      is that Tolkien stated in Appendix D that the Kings' Reckoning New Year's Day originated in "mid-winter",
      which implies it originally corresponded with the [winter solstice](https://en.wikipedia.org/wiki/Solstice).
      Starting this calendar on the December 21st winter solstice in our time
      allows Loëndë to fall on the contemporary June 21st summer solstice,
      but 6000 years ago the solstices didn't align this way, since
      [the winter solstice would have generally occurred on a proleptic Gregorian December 18](http://www.thetropicalevents.com/pngCharts/eWS_Gregorian1.png).

    It's possible that Tolkien was aware of the June 23rd summer solstice of 6000 years ago
    and just made the mistake of assuming that this date still corresponded 6000 years earlier,
    and that the relative days between the winter solstice and summer solstice
    were the same back then as they are now
    ([he did assume the lengths of the years were the same then as they are now](http://rinsanity.weebly.com/tolkien.html)).
    His "long summer" calendars of the Shire and Númenor seem to fit these possibilities.
    Or perhaps he just didn't concern himself with any other dates of the solar events beyond the
    spring equinox and summer solstice during the hypothetical time-frame
    of the "Great Years" of the War of the Ring.

These calendars are not historically perfect,
and generally fit the solar events and seasons of our time better than in ancient times,
but starting the Calendar of Imladris from a proleptic Gregorian March 21
is the most logical choice given the other details by Tolkien in The Lord of the Rings, Appendix D.

#### Reformed Rivendell Reckoning

Since the primary goal of these scripts is to visualize how Tolkien's calendars relate to the Gregorian calendar,
I've included a control that lets you choose "Reformed" Rivendell Reckoning rules.
I invented these "reformed reckoning" rules to keep the Calendar of Imladris more in sync with the
Gregorian calendar so that most of its dates always fall on the same Gregorian date.
These rules always start the Calendar of Imladris on the same Gregorian day (March 25th by default),
and make the calendar follow the leap-year and leap-day rules of the Gregorian calendar.
With these "Reformed" Rivendell Reckoning rules, a single "Reformed Enderë" (or a "Leap Middleday" if you will)
falls between the first and last day of the Calendar of Imladris in every leap-year of the Gregorian calendar,
rather than adding 3 extra Enderi to the middle of the year every 12 years.

##### Why March 25th?

[As explained above](#why-march-21st),
Gregorian March 25 corresponds to the Elves' New Year's Day in the Third Age 3019,
the year of the destruction of the One Ring and of the downfall of Barad-dûr and Sauron,
but starting this calendar's year from March 25 also aligns it with the seasons
and the Gregorian calendar in the following ways:

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

Starting this calendar on Gregorian March 25 with "reformed" rules
allows the Enderi to always start on Gregorian September 22,
and also lets the other seasons of this calendar align with
[March 25th](https://en.wikipedia.org/wiki/March_25#Holidays_and_observances),
[June 24th](https://en.wikipedia.org/wiki/Midsummer#United_Kingdom) (the middle of Lairë),
and [December 24th](https://en.wikipedia.org/wiki/Christmas_Eve) (the middle of Hrívë),
which fall on (or very close to) the
[traditional quarter days of England](https://en.wikipedia.org/wiki/Quarter_days#In_England).

* Note that starting this calendar from March 22 with "traditional" rules
  has the nice property of allowing September 22 to always fall on an Enderë
  and allows Yestarë to always fall between March 22 - 25 from around 1900 until around 2100.

#### References

* Tolkien, J. R. R. (1965). The Return of the King: being the third part of The Lord of the Rings. Boston: Houghton Mifflin Co. Appendix D. ISBN 0-395-08256-0
* Hammond, W. G.; Scull, C. (2005). The Lord of the Rings: A Reader's Companion. Boston: Houghton Mifflin Co. pp. 725-732. ISBN-13 978-0-618-64267-0.
* [Shire-Reckoning.com](http://shire-reckoning.com/calendar.html)
* [Tolkien's Legendarium versus Astronomical Reality](http://rinsanity.weebly.com/tolkien.html)
* [TheTropicalEvents.com](http://www.thetropicalevents.com/):
  Search this page for "Gregorian calendar" for charts showing how the dates of the
  solstices and equinoxes change through ancient history and into the future.
* [sym454.org/seasons](http://www.sym454.org/seasons/):
  Provides an in-depth graphical analysis of how the lengths of the seasons change over time.
* [Wikipedia article on Middle-earth calendars](https://en.wikipedia.org/wiki/Middle-earth_calendar)
* [Wikipedia article on the Ages of Middle-earth](https://en.wikipedia.org/wiki/Timeline_of_Arda)
* [Wikipedia solstice article](https://en.wikipedia.org/wiki/Solstice)
* [Wikipedia equinox article](https://en.wikipedia.org/wiki/Equinox)
* [Wikipedia article on the pre-latin Germanic calendar](https://en.wikipedia.org/wiki/Germanic_calendar)

## `shire-icalendar.clj` -> [shire-reckoning.ics](shire-reckoning.ics)

This script prints iCalendar formatted dates with corresponding Shire Reckoning dates,
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

Original concept and terminology created by J.R.R. Tolkien for The Lord of Rings, Appendix D.

This source code is Copyright (C) 2016 Paul Sarando.

Distributed under the [Eclipse Public License](http://www.eclipse.org/legal/epl-v10.html).

Feel free to use any portion of these calendars on your site.
Spruce it up with your own CSS and images!
Just link credit back to this repository. I'd love to see what anyone else can do with these!
