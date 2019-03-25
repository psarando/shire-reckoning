A Simulation of J.R.R. Tolkien's Calendars throughout Middle-earth's History
============================================================================

## Contents

* [How to Use these Calendar Simulations](#how-to-use-these-calendar-simulations)
* [Caveats and Minutiae](#caveats-and-minutiae)
    * [What's Considered Canon in these Simulations?](#whats-considered-canon-in-these-simulations)
        * [What I Consider Canon in these Simulations](#what-i-consider-canon-in-these-simulations)
        * [Reckoning the start or end of a day](#reckoning-the-start-or-end-of-a-day)
    * [Shire, Gondor, and Rivendell Reckoning years](#shire-gondor-and-rivendell-reckoning-years)
    * [Gondor Week Days](#gondor-week-days)
    * [Synchronize settings](#synchronize-settings)
        * [Gregorian years with Second Age years](#gregorian-years-with-second-age-years)
        * [Moon phases](#moon-phases)
        * [Gregorian years with Years of the Sun](#gregorian-years-with-years-of-the-sun)
        * [Venerable Bede's Reckoning](#venerable-bedes-reckoning)
        * [James "the Just" Strom's Reckoning](#james-the-just-stroms-reckoning)
        * [My Stellarium Reckoning](#my-stellarium-reckoning)
        * [Joe Bartram's Reckoning](#joe-bartrams-reckoning)
    * [Dates of Interest](#dates-of-interest)
        * [Shire-reform](#shire-reform)
        * [Millennial Leap-years](#millennial-leap-years)
            * [Notes on Tolkien's *Deficit* calculations](#notes-on-tolkiens-deficit-calculations)
        * [Leap-years beyond the Third Age](#leap-years-beyond-the-third-age)

The primary goal of the [default calendars on this project's home page](https://psarando.github.io/shire-reckoning/#tolkien-calendars)
is to visualize how the calendars described in J.R.R. Tolkien's *The Lord of the Rings* Appendix D relate to our modern day
[Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar).
Those are the calendars one would use if they were only interested in a Shire, Gondor, or Rivendell date
conversion for today's date in modern times.
For example, if you simply want to know how a Shire date listed on [Tolkien Gateway](http://tolkiengateway.net/wiki/Third_Age_3019)
would convert into a date in this year's calendar, use the [default Shire Calendar on this project's home page](https://psarando.github.io/shire-reckoning/#tolkien-calendars).

As pointed out in the [Shire Reckoning notes](https://psarando.github.io/shire-reckoning/#reckoning-start-dates),
the calendars of Gondor and the Shire described in Appendix D had similar
yet different leap-year and leap-day rules compared to our Gregorian calendar.
So this project also includes a way to reckon Shire and Gondor dates according to
the "traditional" leap-day and leap-year rules as described in Appendix D.
This allows me to implement a simulation that can display these calendars according to
Shire-reckoning years and the Ages of Middle-earth.

If you're more interested in how these different leap-day rules of Appendix D cause dates to shift in each of these calendars relative to each other,
or how these calendar rules would shift dates relative to the Gregorian calendar over thousands of years,
or if you're only interested in [how the Middle-earth calendars related to each other around the War of the Ring](#whats-considered-canon-in-these-simulations),
then you may be more interested in these Middle-earth calendar simulations.

I'm confident I have carefully reproduced all of the [rules of Appendix D](#now-the-minutiae) in these simulations
as accurately as possible, [given the information available](#caveats-and-minutiae) in the Appendices,
and my analysis of [Tolkien's *Deficit* calculations](#notes-on-tolkiens-deficit-calculations)
should support this.

Various ways of synchronizing Gregorian years with Shire-reckoning years and the Ages of Middle-earth are also provided
by the live demonstration below.

[Follow this link for a live demonstration of this simulation](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html).

## How to Use these Calendar Simulations

1. Choose a [`Synchronize`](#synchronize-settings) setting to align Middle-earth years and dates with Gregorian dates.
    * Changing the setting of this list will adjust the `Start reckoning from` dates in each calendar
      to a specific Gregorian date for the selected [`Synchronize`](#synchronize-settings) scheme.
      For example, synchronizing `Gregorian years with Second Age years` will set the Shire and Gondor calendars
      to "Start reckoning from" the Gregorian year 0, December 23,
      and will set the Rivendell Calendar to "Start reckoning from" the Gregorian year -589 (590 B.C.E.), March 23.
    * The [default calendars on this project's home page](https://psarando.github.io/shire-reckoning/#tolkien-calendars)
      are recommended if you're only interested in a Shire, Gondor, or Rivendell date conversion for today's date.
      Those [default Shire and Gondor calendars start reckoning from Gregorian year 0, December 21](https://psarando.github.io/shire-reckoning/#reckoning-start-dates),
      and that [default Rivendell Calendar starts reckoning from Gregorian year 1, March 22](https://psarando.github.io/shire-reckoning/#rivendell-reckoning-notes).
2. Choose one of the events of Middle-earth in the [`Dates of Interest`](#dates-of-interest)
   list to see its corresponding date in each calendar,
   as well as which Gregorian date corresponds to that chosen event,
   for the selected [`Synchronize`](#synchronize-settings) scheme.
    * These dates are listed in descending order, from latest to earliest.
      Months and days are given according to Shire Reckoning,
      [except for a few dates](#dates-of-interest) before Bilbo's time,
      which are given according to the Stewards' or Kings' Reckoning.
3. Adjusting the `Gregorian Date` will change the date displayed in each calendar,
   and may update the selected event in the [`Dates of Interest`](#dates-of-interest) list, depending on the date or year of the event.
4. Adjusting the `Start reckoning from` Gregorian dates in any of the calendars will update the
   [`Synchronize`](#synchronize-settings) setting to a `Custom Reckoning` setting.
    * The events of Middle-earth in the [`Dates of Interest`](#dates-of-interest) list are tied to this simulation's Shire Reckoning calendar,
      so adjusting the Shire Reckoning's starting Gregorian date will also adjust those events' corresponding Gregorian dates.
      Also, in order to keep [the Shire and Gondor calendars in sync](#millennial-leap-years),
      adjusting the `Start reckoning from` Gregorian date of one will also set it to that Gregorian date in the other.
      The `Start reckoning from` Gregorian dates in the Shire and Gondor calendars correspond to the first year of the Second Age.
    * Since [the Appendices only mentioned the one Rivendell calendar date](https://psarando.github.io/shire-reckoning/#why-march-22nd)
      (New Year's Day) that corresponded to a Shire calendar date (Third Age 3019 Astron 6),
      this simulation's Rivendell Reckoning `Start reckoning from` Gregorian date can be adjusted without affecting the other calendars.
      As a result, the [`Dates of Interest`](#dates-of-interest) event "III 3019 Astron 6" may no longer correspond to Rivendell's New Year's Day,
      depending on the custom adjustments to the Shire and Rivendell `Start reckoning from` Gregorian dates.
5. See my [Shire Reckoning notes](https://psarando.github.io/shire-reckoning/#shire-reckoning-notes)
   for more details about the names and layout of the days, weeks, and months of the Shire Calendar.

## Caveats and Minutiae

### What's Considered Canon in these Simulations?

Tolkien gave us just enough details about these calendar systems in Appendix D to make these simulations possible,
but [he didn't give us enough details](https://psarando.github.io/shire-reckoning/#why-march-22nd)
to let us know how accurate these simulations might be throughout the history of Middle-earth.
I know some readers would like to know in which years these calendars are accurate enough
to be considered canon according to Tolkien's Legendarium,
so I will do my best in this section to summarize what could be considered canon,
and in the following sections I will explain how I had to fill in the gaps with my own estimations to make these
simulations possible.

Note that when giving Middle-earth years throughout the rest of these notes,
I will use S.R. = Shire-reckoning, IV = Fourth Age, III = Third Age, II = Second Age,
and Iys = [First Age Years of the Sun](https://en.wikipedia.org/wiki/Timeline_of_Arda#Years_of_the_Sun).

#### First some Caveats

I want to emphasize that none of the corresponding Gregorian dates in any of the
[synchronization schemes](#synchronize-settings) can be considered canon.
Tolkien never attempted to fix these stories to a specific period in our actual history.
He only included a rough estimate in his letter #211 that
the events of *The Lord of the Rings* could have occurred around 6000 years ago,
which is why these simulations provide so many possible [synchronization schemes](#synchronize-settings).

These simulations also make no attempt to display these calendars with the appropriate language during any given year.
For example, the Hobbits used more archaic names for their months and weekdays around "nine hundred years before Frodo's time",
which by the time of the War of the Ring (and we are not told exactly when),
became the Shire Reckoning names displayed by these simulations.
Also note how the month names used for the "Disaster of the Gladden Fields" in *Unfinished Tales* were given in Sindarin
(III 2 Narbeleth), but the Quenya month names were used for the "Battle of the Field of Celebrant" (III 2510 Víressë).
I'm also not 100% certain about some of the English translations for Quenya and Sindarin month names of the Gondor calendars,
which were compiled from online sources, since Tolkien did not provide English translations of these month names in Appendix D.

So it would be unwise to assume that these simulations display every calendar
exactly how they were observed by these cultures in every year of Middle-earth's history;
but one way to view these simulations, if you ignore the corresponding Gregorian dates,
would be to consider them as how a Fourth Age historian might compare or convert Middle-earth dates
between these different calendars,
for certain events in the previous ages of Middle-earth.

In this section of the notes, I'm attempting to address questions like the following:

* If all dates given in *The Lord of the Rings* are Shire Calendar dates,
  can the Gondor or Rivendell calendar dates corresponding to those Shire dates in these simulations be considered canon?
  For example, it's canon that the Council of Elrond in III 3018 was on Winterfilth 25 by Shire Reckoning.
  So is it also canon that it was Narquelië 25 in Gondor and Quellë 19 by the Reckoning of Rivendell?

    * In general, I think the corresponding Gondor dates for any specific Shire month and day given in the
      [`Dates of Interest`](#dates-of-interest) list can be considered canon,
      but only some Rivendell dates in III 3018 - 3019 (see below).
      So for this example, I would say that it is canon that the Council of Elrond in III 3018 was on
      Narquelië 25 in Gondor and Quellë 19 by the Reckoning of Rivendell.

* Did the Shire Calendar make the same millennial leap-day adjustments
  in the same years as the Kings' and Stewards' Reckoning made their adjustments?

    * [We can't be sure](#millennial-leap-years).

* Was the Calendar of Imladris in the 137th loa of its 49th yén (i.e. its 7049th year) when the One Ring was destroyed?

    * We don't know, but at least the Rivendell years in these simulations can help track the years elapsed
      since the first Year of the Sun in the First Age vs. Shire-reckoning, Second, Third, and Fourth Age years.

#### Now the Minutiae

The following details given in *The Lord of the Rings* Appendices
are what I will use to determine what's considered canon
(some are also examined in my [Shire Reckoning Notes](https://psarando.github.io/shire-reckoning/#shire-reckoning-notes)
and in my [Rivendell Reckoning Notes](https://psarando.github.io/shire-reckoning/#rivendell-reckoning-notes)):

* Appendix D gives us all of the rules of the calendars of Númenor and Gondor,
  including all the exceptions to the leap-year and leap-day rules
  (or [intercalations](https://en.wikipedia.org/wiki/Intercalation_(timekeeping)))
  throughout the Second and Third Ages, and that "in Númenor calculation started with S.A. 1".
* Appendix D gives us all of the rules of the Shire Calendar,
  with no exceptions noted between the time [Shire-reform](#shire-reform) was enacted and the end of the Third Age.
    * Appendix D strongly implies that Bree's calendar followed the same leap-day rules in the same years as the Shire Calendar.
      Tolkien states that the Shire Calendar inserts its leap-day every 4 years, except the last in a century,
      but in Bree the exception happens in the 1st year of its centuries
      (Bree-reckoning 401 and S.R. 100 for example, which are the same year).
      This only makes sense if they are also inserting leap-days every 4 years in the same years.
      This would also mean that Bree's calendar would add its leap-day (an extra Summerday)
      in the same year as the Kings' Reckoning would have added its leap-day
      (when Loëndë is replaced with the 2 Enderi).
* Appendix D gives us all of the rules of the Calendar of Imladris,
  and Appendix B tells us the Elves' New Year's Day in III 3019 was on Astron 6.
* In III 3019, Shire
  "March 25, the date of the downfall of Barad-dûr... was, however, March 25 in both Kings' and Stewards' Reckoning."
* "The New Reckoning was begun in the restored Kingdom in T.A. 3019",
  and its New Year's Day (Yestarë) was 'March' 25 of the Shire, Kings', and Stewards' Reckoning calendars.
* The Fourth Age began on III 3021 Halimath 29, but the New Reckoning begins reckoning IV 1 from Yestarë of that year:

    > The Fourth Age was held to have begun with the departure of Master Elrond, which took place in September 3021;
    > but for purposes of record in the Kingdom Fourth Age 1 was the year that began according to the New Reckoning in March 25, 3021, old style...
    > in so far as the Hobbits took any account of the change of Age, they maintained that it began with 2 Yule 1422,
    > and not in the previous March.

##### What I Consider Canon in these Simulations

So based on those details provided by Tolkien in *The Lord of the Rings* Appendices,
I would consider the following details as canon in this project's simulations:

* None of the corresponding Gregorian dates.
* As far as I know, the years and dates of events in the [`Dates of Interest`](#dates-of-interest) list are canon,
  unless marked with a `?` or a `c.` ([circa](https://en.wikipedia.org/wiki/Circa)),
  though some events were already marked with a `c.` by Tolkien in Appendix B.
  Also note [the exception to the specific dates in Iys 495](#dates-of-interest).
* All of the dates in all the years of the Kings' and Stewards' Reckoning
  (with the exception of the [corresponding weekdays](#gondor-week-days)).
    * Tolkien provided thorough details about the history of the calendars of Númenor and Gondor,
      including all of the exceptions throughout their history in the Second and Third Ages.
      So these calendars can be considered the most accurate for the longest period of time in these simulations.
* The Bree or Shire-reckoning year corresponding to the Gondor calendar years
  (see the [next section](#shire-gondor-and-rivendell-reckoning-years) about years that are negative or 0).
* The Shire Calendar dates from S.R. 1122 through S.R. 1500 Mid-year's Day,
  and the corresponding Stewards' Reckoning dates within those years.
    * S.R. 1122 is the last possible year [Shire-reform](#shire-reform) could have been enacted,
      and also the last likely year [any millennial adjustments may have been incorporated](#millennial-leap-years).
      I'm considering S.R. 1500 Mid-year's Day the cutoff
      since [we don't know how leap-years were handled after the Third Age](#leap-years-beyond-the-third-age),
      though it may be reasonable to assume that the Shire Calendar continued reckoning as it had
      since S.R. 1122 up to S.R. 2000.
      Since the [Red Book](https://en.wikipedia.org/wiki/Red_Book_of_Westmarch) was copied in Gondor in S.R. 1592,
      if there were any exceptions to the Shire Calendar in S.R. 1500 - 92,
      we might expect there to be a note or mention of it in Appendix D.
      In any case, Shire Calendar dates in these simulations after S.R. 1500 Mid-year's Day should be accurate to within a day or 2
      (at least for a few centuries).
* The New Reckoning from IV 1 Yestarë through IV 80 Yavannië 30,
  and then again from the Middle-days of IV 100 through IV 180 Yavannië 30,
  [repeating this pattern of non-canon dates during the last 20 years of each century](#leap-years-beyond-the-third-age)
  through IV 980 Yavannië 30.
    * "The New Reckoning was begun in the restored Kingdom in T.A. 3019",
      and though we don't know when in that year it was finalized and enacted,
      it seems likely to me that the New Reckoning system would have been used to record dates
      as far back as III 3019 Yestarë (Súlimë 25 old style) by later historians.
      This would be similar to how the Kings' Reckoning began its reckoning from the 1st year of the Second Age
      even though Númenor was not founded until II 32.
* The dates of the Calendar of Imladris can only be considered canon during the corresponding Shire Calendar dates
  from S.R. 1418 (III 3018) Winterfilth 4 through S.R. 1419 (III 3019) Winterfilth 6
  (but not the corresponding Rivendell weekdays or year-counts),
  because the only known Calendar of Imladris date given for a corresponding Shire or Gondor date
  was the Elves' New Year on S.R. 1419 (III 3019) Astron 6.

If it was considered canon that the Calendar of Imladris
[started its reckoning](Rivendell_Drift.md#aligning-the-calendar-of-imladris-to-the-shire-calendar)
from the first Year of the Sun in the First Age,
then all the dates and corresponding weekdays of this Calendar of Imladris simulation could be considered canon as well,
since it follows all the rules exactly as described in Appendix D.
I'll also point out that, since Rivendell's Yestarë must fall on Astron 6 in S.R. 1419 (III 3019),
then if the Calendar of Imladris started reckoning from the first Year of the Sun,
its Yestarë would also have fallen on Astron 5, 6, or 7 (or the 4th, but only in a Rivendell leap-year)
from about S.R. 1400 (III 3000) until about S.R. 1500 (IV 80).
So around the end of the Third Age, this appears to fit nicely with Tolkien's statement that Rivendell's Yestarë
"corresponded more or less with Shire April 6" (Astron 6).
See the notes on
[How the Calendar of Imladris drifts apart from the Shire Calendar](Rivendell_Drift.md#how-the-calendar-of-imladris-drifts-apart-from-the-shire-calendar)
for more details on how this works out.

In any case, outside of the one canon year described above,
the Calendar of Imladris in these simulations should still be accurate to within 3 days
when compared to the dates of the Gondor calendar in the Second and Third Ages,
and when compared to the dates of the Shire Calendar around the end of the Third Age.

##### Reckoning the start or end of a day

Even when we know a date in all 3 calendars can be considered canon,
those calendar dates only match up that way during the daylight hours of that day;
because Tolkien stated in Appendix D that the Gondor calendars reckoned their dates from sunrise to sunrise,
the Elves reckoned their dates from sunset to sunset,
and it's implied that the Hobbits reckoned their dates from midnight to midnight (as we do in modern times),
exemplified in the following passage from the "Minas Tirith" chapter in *The Return of the King*: 

> With that Gandalf went out;
> and as he did so, there came the note of a clear sweet bell ringing in a tower of the citadel.
> Three strokes it rang, like silver in the air, and ceased: the third hour from the rising of the sun.
> After a minute Pippin went to the door and down the stair...
> 'Nine o'clock we'd call it in the Shire,' said Pippin aloud to himself.

For example, Appendix B tells us that the date the camp under Weathertop was attacked
and Frodo was wounded by the Witch-king was S.R. 1418 (III 3018) Winterfilth 6.
From the story we know that Strider and the hobbits arrived at Weathertop during the day, the attack happened at night,
and Strider attempted to treat Frodo's wound with Kingsfoil just before sunrise.
So we know when they reached Weathertop on that day that it was Narquelië 6 by the Stewards' Reckoning in Gondor
and it was the last Enderë of the year in the Calendar of Imladris.
Since the Elves reckon the next date after sunset, then when Frodo was wounded it was already considered Quellë 1.
Since Strider came back with Kingsfoil after midnight but before sunrise,
then it was already Winterfilth 7 by Shire Reckoning but it was still considered Narquelië 6 by the Stewards' Reckoning in Gondor.

### Shire, Gondor, and Rivendell Reckoning years

The top of each calendar displays a year appropriate to each reckoning,
relative to the chosen [settings described above](#how-to-use-these-calendar-simulations).
These years include the year 0 and can go into negative numbers.
So when a date is selected during Third Age 1600, the Shire Reckoning calendar will display as year 0,
and when a date is selected before the start of the Second Age both the Shire Reckoning and Gondor/Númenor calendars
will display a negative year.
If a calendar is displayed with a year that is negative or 0,
it should be considered [proleptic](https://en.wikipedia.org/wiki/Proleptic_calendar) for that year.
Similarly, the `Start reckoning from` dates also include the Gregorian year 0, which is equivalent to 1 B.C.
(and -999 is equivalent to 1000 B.C.)

* [Rivendell Reckoning years](https://en.wikipedia.org/wiki/Middle-earth_calendar#Calendar_of_Imladris):
  The current Rivendell year, or coranar ("sun-round"), includes a conversion into the current yén (144 of our years)
  and loa ("growth", equivalent to a coranar).
  These simulations assume the Calendar of Imladris starts reckoning its year 1 from the start of the first Year of the Sun of the First Age
  (see my notes on [Aligning the Calendar of Imladris to the Shire Calendar](Rivendell_Drift.md#aligning-the-calendar-of-imladris-to-the-shire-calendar)).
* **Gondor years**:
  The Gondor calendar is displayed with the appropriate
  [Kings', Stewards', or New Reckoning](https://psarando.github.io/shire-reckoning/#the-3-calendars-of-gondor)
  for the selected year.
  The displayed year is also converted to the appropriate Age and year,
  where IV = Fourth Age, III = Third Age, and II = Second Age.
  This calendar does not attempt to convert years into any Ages outside of II, III, or IV.
* **Shire and Bree Reckoning years**:
  Since the Shire was first settled in III 1601, Shire-reckoning years are displayed relative to this Gondor year.
  Changing this calendar to display months and weeks with [Tolkien names](https://psarando.github.io/shire-reckoning/#shire-reckoning-notes)
  will still display this Shire-reckoning year.
  Since Hobbits first settled in Bree in III 1300, then changing this calendar to display months and weeks with
  [Bree names](https://psarando.github.io/shire-reckoning/#shire-reckoning-notes)
  will also display the appropriate Bree-reckoning year.

### Gondor Week Days

Tolkien stated in Appendix D that
"all the days, months, and dates are in the Red Book translated into Shire terms, or equated with them in notes".
This means there probably aren't any references to a current weekday of the Gondor Calendar during the narrative of *The Lord of the Rings*.
Tolkien also stated that the [Kings' Reckoning](https://psarando.github.io/shire-reckoning/#the-3-calendars-of-gondor)
"was ultimately of Eldarin origin" and had a 6-day week like the Elvish calendar of the
[Eldar](http://tolkiengateway.net/wiki/Eldar),
but at some point the Númenóreans added a 7th weekday called "Sea-day" (Eärenya/Oraearon);
although it's not stated when the 7th weekday was added
(one possibility may be sometime during II 883 - 1075 under the reign of [Tar-Aldarion](http://tolkiengateway.net/wiki/Tar-Aldarion)).

Appendix D also states that "in Númenor calculation started with S.A. 1",
and though this is mainly a reference to the calculation of leap-days, it may also apply to the calculation of weekdays.
So for these simulations I assume that the weekdays were reckoned continuously
starting with Elenya on the first day of the Second Age (Yestarë of S.A. 1).
Conveniently (and perhaps intentionally by Tolkien), reckoning the weekdays of Gondor's calendars in this manner
allows them to sync up with the Shire Calendar's weekdays during the events of the narrative,
in the 2nd half of III 3018 and the 1st half of III 3019 (a.k.a. the "Great Years" of the War of the Ring).

### Synchronize settings

These Gregorian `Synchronize` settings (except for `Custom Reckonings`) are configured so that all of the dates of
the Shire, Gondor, and Rivendell calendars will always remain in sync with each other
(and each Middle-earth calendar will still follow its own "traditional" leap-year rules),
no matter which of these `Synchronize` settings is selected.
So changing the `Synchronize` setting is only changing the relationship of the Gregorian calendar to these Middle-earth calendars,
but not the relationship of the Middle-earth calendars to each other.

#### Gregorian years with Second Age years

This synchronization scheme is the one I think was most likely used by Tolkien
while working out the details of *The Lord of the Rings* Appendix D,
which I think is supported by the arguments in my [Rivendell Reckoning notes](https://psarando.github.io/shire-reckoning/#rivendell-reckoning-notes),
but note the following caveats:

1. I'm not arguing that somehow the Second Age of Middle-earth was supposed to start in our actual historical year 1 A.D.
   I just think that Tolkien used this synchronization scheme as a "model",
   or aligned a hypothetical Gregorian calendar as a kind of "measuring stick" to the start of the Second Age,
   when working out the details of the Gondor leap-days
   (or [intercalations](https://en.wikipedia.org/wiki/Intercalation_(timekeeping)))
   and the Elves' New Year's Day of III 3019.
2. In my notes on the [First Day of the Calendar of Imladris](https://psarando.github.io/shire-reckoning/#first-day-of-the-calendar-of-imladris),
   I point out that starting the reckoning of the Calendar of Imladris in this Gregorian calendar's year 590 B.C.E. (-589)
   means that the leap-years of this Calendar of Imladris are not in sync with the leap-years of this Gregorian calendar,
   so comparing the dates in the Calendar of Imladris to the dates of this Gregorian calendar is a bit more complicated
   than the comparison of dates in the [default calendar on this project's home page](https://psarando.github.io/shire-reckoning/#tolkien-calendars).
   As another example of how complicated these comparisons can be,
   depending on how you align the Gregorian calendar "measuring stick" to these Middle-earth calendars,
   notice what happens to the start dates of these simulated calendars when you select the `Synchronize` setting for
   [Venerable Bede's Reckoning](#venerable-bedes-reckoning):
   the Shire and Gondor calendars will still start from a December 23 in the Gregorian year -10413,
   but the Rivendell Calendar will now start on a March 21 in the Gregorian year -11002,
   and yet Shire Astron 6 and Rivendell's Yestarë still fall on a March 25 in the Third Age 3019!

#### Moon phases

These schemes attempt to align the dates of the 'Great Years' of the War of the Ring as much as possible
with the real-world moon phases of various real-world years.
See my [Shire Reckoning notes](https://psarando.github.io/shire-reckoning/#reckoning-with-moon-phases)
for an explanation of how Tolkien used the moon phases of 1941-42 as the model for the moon phases in *The Lord of the Rings*.
Also see [Shire-Reckoning.com's Moon Phases in The Lord of the Rings](http://shire-reckoning.com/moon.html) for additional details.

* Although the moon phases of 2017-18 were [(mostly) a repeat](https://en.wikipedia.org/wiki/Metonic_cycle) of the 1941-2 moon phases,
  the 2017-18 moon phase scheme has been [adjusted by 1 more day](https://en.wikipedia.org/wiki/Callippic_cycle)
  in order for the full moon of March 2018 to fall on the correct Shire date of Rethe 7 (evening, or pre-dawn Rethe 8).
  This made it harder to see some of the young crescent moons described in the story on the correct dates
  (e.g. the moon the night of Rethe 24 was only 2 nights old instead of 4 nights old as described in the story),
  but I think that the full moon of Rethe 7/8 is more crucial to the story than any other moon phase described.

In 2017-18, I attempted to re-read *The Lord of the Rings* in chronological order,
and also aligned with the moon phases in those years.
It actually was not too difficult with the help of *The Lord of the Rings* Appendix B, the *Reader's Companion*,
and these calendar simulations.

I've collected the breakdown of each date's reading by page number,
including snippets of passages from the story where each date begins or ends,
and some of my own real-world observations of the moon phases on certain dates.
You can view the results and the "Grand Scheme" on the
[The Lord of the Rings Lunar Readalong](https://psarando.github.io/shire-reckoning/Lunar_Readalong.html) page.

#### Gregorian years with Years of the Sun

The [default Rivendell calendar on this project's home page](https://psarando.github.io/shire-reckoning/#tolkien-calendars)
starts reckoning its first year on 1 A.D. of the proleptic Gregorian calendar
in order to keep these calendars' leap-year cycles in sync,
making it easier to compare these calendar systems with each other.
The next proleptic Gregorian year before 1 A.D. that starts both a Gregorian 400-year cycle
and a Calendar of Imladris 432-year cycle would be 10800 B.C.
since it's evenly divisible by both 400 and 432.
So this synchronization scheme starts reckoning the Calendar of Imladris from 10800 B.C.,
and the 7049 years from then to III 3019 would be 3751 B.C.,
which is fairly close to Tolkien's 6000-year gap to our time.
Interestingly, this scheme also happens to allow Rivendell's Yestarë to fall on a proleptic Gregorian March 27 in 1 A.D.
Since these calendars' leap-year cycles are in sync in this scheme,
and they both would begin a new cycle in 1 A.D.,
this is nearly equivalent to [Boris Shapiro's calculations](https://psarando.github.io/shire-reckoning/#why-not-march-29th)
which start reckoning from the proleptic Gregorian March 27 in 1 A.D. as well.
The only difference would be that the first Yestarë would logically be reckoned on the first day of the week, Elenya,
but reckoning the first Yestarë from on an Elenya in 10800 B.C. means the Yestarë in 1 A.D. would fall in the middle of the week,
on Aldúya.
So perhaps this scheme demonstrates that if we want to align the Calendar of Imladris with the Gregorian calendar,
then Shapiro's calculations can be viewed as "traditionally appropriate",
since it aligns with a Calendar of Imladris that starts its reckoning from a "seasonally appropriate" March 21
and very close to a "traditionally appropriate" year.

#### Venerable Bede's Reckoning

This synchronization scheme is based on
[Venerable Bede's calculation of 3952 B.C. as the year of the "creation" of the world](https://en.wikipedia.org/wiki/Bede#Works_on_historical_and_astronomical_chronology),
and aligns the first year of the Fourth Age with this year.
Since Tolkien based the names of the Shire Calendar on the
[Anglo-Saxon calendar](https://en.wikipedia.org/wiki/Germanic_calendar#Medieval)
described in Venerable Bede's
[On the Reckoning of Time (De temporum ratione)](https://en.wikipedia.org/wiki/The_Reckoning_of_Time),
I'm guessing that he may have had Bede's year of 3952 B.C. in mind
when he estimated the events of *The Lord of the Rings* could have occurred around 6000 years ago in his letter #211.

#### James "the Just" Strom's Reckoning

This synchronization scheme is based on the [Stellarium](http://www.stellarium.org/) calculations in the forum post
[Middle-earth chronology](http://tolkienforums.activeboard.com/t42820320/middle-earth-chronology/)
by "James the Just",
which aligns Mid-year's Day in III 3019 with June 20 in 4008 B.C.
This scheme also appears to match the calculations in his
[Imladris calendar](http://tolkienforums.activeboard.com/t55579915/imladris-calendar/)
post in the same forums.

#### My Stellarium Reckoning

This synchronization scheme is similar to James Strom's reckoning,
but it's based on my own reckoning using the open-source program [Stellarium](http://www.stellarium.org/).
The James Strom reckoning above is a very close match to the moon phases used in the story,
which matches the full moon of the night of III 3019 Afteryule 8,
and also has Mars in the evening skies of III 3018 Blotmath,
and of course a prominent Venus in the evening sky of III 3019 Solmath 15.
According to Stellarium, however,
the full moon that should fall on the night of Rethe 7/8 actually occurs on the morning of Rethe 7 by that scheme
(most would probably consider that close enough).
Also, the moon on the eve of the destruction of the One Ring should be "four nights old",
so a new moon should occur sometime between dawn on Rethe 21 and dawn on Rethe 22,
but in that scheme the new moon occurs on the evening of Rethe 22,
making the moon of Rethe 24 three nights old instead.

So I used [Stellarium](http://www.stellarium.org/) to find a year around 6000 years ago that attempts to meet all of these requirements,
but also happens to have an even brighter Venus for the evening of III 3019 Solmath 15.
In this scheme, the destruction of the One Ring occurs on a proleptic Gregorian March 15 in 4179 B.C. (or Julian April 17),
and also happens to [align the start of II 1 with a Gregorian December 23](https://psarando.github.io/shire-reckoning/#what-if-the-kings-reckoning-started-reckoning-from-a-gregorian-december-23-in-sa-1).
Unfortunately this scheme is not perfect either,
and the full moon that should fall on the night of Rethe 7/8 occurs on the afternoon of Rethe 7
(which is the afternoon of Gregorian February 25 or Julian March 30 in 4179 B.C. according to [Stellarium](http://www.stellarium.org/)).

#### Joe Bartram's Reckoning

This synchronization scheme is based on
[this post by Joe Bartram of the Oxford Tolkien Society, Taruithorn](https://taruithornmiruvor.wordpress.com/2015/05/24/a-tolkien-calendar-part-1/).
The `Start reckoning from` dates were chosen to align the start of the Shire Calendar in 2015 (S.R. 8077) with the calendar linked in
[part 4 of Bartram's calendar posts](https://taruithornmiruvor.wordpress.com/2015/09/23/a-tolkien-calendar-part-4-my-own-estimate/).


### Dates of Interest

As mentioned in the "[How to Use these Calendar Simulations](#how-to-use-these-calendar-simulations)" notes above,
the events of Middle-earth in the `Dates of Interest` list are tied to this simulation's Shire Reckoning calendar,
including the events given for the First Age
(so the selected First Age event may change if the S.R. year changes when adjusting the `Gregorian Date`).
These dates are listed in descending order, from latest to earliest.

The years in this list correspond to the appropriate Shire-reckoning year or Age of Middle-earth,
where S.R. = Shire-reckoning, III = Third Age, II = Second Age,
and Iys = [First Age Years of the Sun](https://en.wikipedia.org/wiki/Timeline_of_Arda#Years_of_the_Sun).

* When the date includes a month and a day, they are given according to Shire Reckoning,
  except for a few dates before Bilbo's time,
  which were taken from *Unfinished Tales* and are given according to the Stewards' or Kings' Reckoning.
  Selecting one of these events will select that specific date in each calendar,
  and also set the corresponding `Gregorian Date`.
  * The [specific First Age dates come from the first chapter of *Unfinished Tales*](http://tolkiengateway.net/wiki/First_Age_495#Notes),
    but these could have been dates according to the calendar of the Edain.
    I know of no details about the calendar of the Edain,
    other than it appears that the Kings' Reckoning was based on it.
    So this simulation displays these events according to the
    [proleptic](https://en.wikipedia.org/wiki/Proleptic_calendar) Kings' Reckoning.
* If the event only includes a year and a season (e.g. the passing of Arwen),
  then selecting that event will select an arbitrary date appropriate to that season,
  although the event will remain selected for any other date selected within that S.R. year
  (with a few exceptions in the First Age, such as the "Mereth Aderthad" or "Gates of Summer" events).
* If the event only includes a year,
  then selecting that event will select the Rivendell Reckoning's New Year's Day for that S.R. year,
  except Mid-year's Day will be selected in "[Millennial Leap-years](#millennial-leap-years)",
  the first year of Stewards' Reckoning, and the first year of Shire-reform.
  The event will remain selected for any other date selected within those S.R. years.

Most of the dates in this list come from *The Lord of the Rings* Appendix B
(which lists even more events with years and dates from the Second Age through the Fourth Age),
or from some of the other Appendices (such as some of the birth dates),
with a few corrections from *The Lord of the Rings: A Reader's Companion*.
The seasons for First Age events in this list were derived from the text of *The Silmarillion*,
but most of these First Age years were compiled from sites like
the [Timeline of Arda article on Wikipedia](https://en.wikipedia.org/wiki/Timeline_of_Arda#Years_of_the_Sun),
the [Tolkien Gateway Timeline](http://tolkiengateway.net/wiki/Timeline),
the [Henneth Annun Story Archive](http://www.henneth-annun.net/events.cfm),
and the [LOTR Project Timeline](http://lotrproject.com/timeline/).
Ultimately these First Age years come from "The Grey Annals" in
[*The War of the Jewels*](http://tolkiengateway.net/wiki/The_War_of_the_Jewels).

There were many more events that occurred in the First Age before the first rising of the Sun and Moon,
but I don't think it makes sense to view those events in the context of these calendars,
since the calendars of Middle-earth described by Tolkien in Appendix D are certainly
[solar calendars](https://en.wikipedia.org/wiki/Solar_calendar).

#### Shire-reform

Shire-reform was enacted sometime between S.R. 1083 - 1122, during the time of Isengrim II.
Once enacted, every year of the Shire Calendar always started on the first day of the week and always ended on the last day of the week,
by not assigning a day of the week to Mid-year's Day or the Overlithe days.
For these simulations, I am assuming that before Shire-reform was enacted,
the current day of the week in the Shire Calendar was the same as the corresponding day of the week that was current in Gondor
(since the Shire Calendar was based on the Kings' Reckoning calendar).
Shire-reform was probably enacted in a year that was already supposed to start on the first day of the week,
which in this simulation means one of these Shire-reckoning years during the time of Isengrim II:

* 1085, 1091, 1103, 1114, or 1120

So for this simulation, I picked the year in the middle of this list as the first year of Shire-reform.
Shire-reform was also adopted "eventually" in Bree, but we are not told when,
so this simulation also displays the Bree calendar using Shire-reform starting from this year.

#### Millennial Leap-years

What I'm calling a "Millennial Leap-year" is a year in which the "millennial additions"
to the calendars of Númenor or Gondor occurred,
as Tolkien described in Appendix D.
The "millennial additions" were an addition of 2 days in every millennium of the Kings' Reckoning calendar
(in II 1000, 2000, 3000 and again in III 1000, 2000).
See my project's notes on
[The Kings' Reckoning Rules and the *Deficit*](https://psarando.github.io/shire-reckoning/Kings_Reckoning_Rules_and_Deficit.html)
for more details about these "millennial additions".

Tolkien never specified how the Shire Calendar stayed in sync
with the Stewards' Reckoning calendar by the end of the Third Age,
but if the Shire Calendar originated from the Kings' Reckoning around or before III 1601,
then [ended up in sync with the Stewards' Reckoning](#now-the-minutiae) calendar by the end of the Third Age,
it makes sense to me that the Shire Calendar probably incorporated the Kings' and Stewards' millennial adjustments
around the same time as Gondor.
Although another possibility remains that the Shire Calendar incorporated some or all of the adjustments at once
as part of the [Shire-reform](#shire-reform), during the time of Isengrim II between S.R. 1083 - 1122 (III 2683 - 2722),
more than 300 years after the last adjustment was made by Hador the Steward.
Compare this to the real-world example of how the Gregorian calendar was first introduced in October 1582,
but Britain did not adopt it until 1752.
So it could have been a couple of centuries before the Hobbits found a "reasonable" year
to incorporate the Gondor adjustments into their calendar.
Since [Shire-reform](#shire-reform) was the last change to the Shire Calendar that Tolkien mentions in Appendix D,
then this is probably the latest time the millennial adjustments would have been incorporated.

The simulations of this project simply add the millennial adjustments to the Shire Calendar in the same years as the calendars of Gondor,
though Tolkien never specified whether or not this occurred.

Tolkien also did not give any more details about what this "adjustment" was exactly, so I had to improvise for these simulations.
In the tradition of the Eldar calendar that doubles its middle-days every leap-year,
I decided to double the leap-day in a "Millennial Leap-year" of the Shire and Gondor calendars
in order to accomplish the "millennial additions" of 2 days.

According to [the leap-year rules of these calendars](https://psarando.github.io/shire-reckoning/Kings_Reckoning_Rules_and_Deficit.html),
every 4th year is a leap-year,
and if this were the only leap-year rule, then a millennial year would also be a leap-year.
Since these leap-year rules also omit the leap-day every century,
then this additional rule would make a millennial year a common (non-leap) year.
So these calendar simulations accomplish the 2-day "millennial additions" in a "Millennial Leap-year"
by not omitting the leap-day in each millennial year, and also by doubling that year's leap-day.

In each "Millennial Leap-year" of the Shire Calendar, I've added an extra Overlithe to the other side of Mid-year's Day.
In each "Millennial Leap-year" of the Gondor calendars, I replace Loëndë with 3 Enderi instead of 2;
except in the New Reckoning where I honor Frodo by doubling the Cormarë
(meaning the Ring-bearer's birthday celebrations are extended to a 3rd day).

Note the 3 exceptions to the "Millennial Leap-year" rule as interpreted from Tolkien's statements in Appendix D:

* III 3000 was not a "Millennial Leap-year",
  and since it was the last year of a century, it ended up as another common (non-leap) year.
* Hador the Steward added an extra day to III 2360, and since this year was already a leap-year,
  adding 1 extra day is equivalent to treating this year as a "Millennial Leap-year".
* Mardil the Steward added 2 days to the last year of the Kings' Reckoning in III 2059,
  which also makes it equivalent to a "Millennial Leap-year".


##### Notes on Tolkien's *Deficit* calculations

For all my interest in Appendix D,
I was never really interested in Tolkien's *Deficit* calculations,
since I did not need to analyze Tolkien's calculations in order to understand the rules of the calendars as presented in Appendix D,
and I only needed those rules in order to create these calendar simulations.
My understanding of those rules is also the basis of my argument that
[Rivendell New Year's Day fell on a March 25th by the end of the Third Age](https://psarando.github.io/shire-reckoning/#rivendell-new-years-day-fell-on-a-march-25th-by-the-end-of-the-third-age).

Then I came across the Reddit post "[Tolkien has reckoned correct in App. D after all](https://www.reddit.com/r/tolkienfans/comments/836lf1/tolkien_has_reckoned_correct_in_app_d_after_all/)"
by Andreas Möhn, a.k.a. CodexRegius
(apparently reproduced from a [Lalaith's Middle-earth Science Pages blog post](https://lalaithmesp.blogspot.de/2018/03/tolkien-has-reckoned-correct-after-all.html)
with a similar title).
Since I was skeptical of Möhn's conclusion that additional Stewards' Reckoning rules that Tolkien "failed to specify" explain the Appendix D calculations,
I decided to finally examine Tolkien's *Deficit* calculations for myself to see if they supported this idea.

Since I'm confident I have accurately reproduced the rules of the Kings' and Stewards' Reckoning in these calendar simulations,
it was not difficult to use those calculations to assist my own *Deficit* calculations,
and then compare my results with the results of Tolkien and others.

I've come to a different conclusion than Möhn, but thanks to one of the insights posted in his blog,
I've found a simpler explanation for Tolkien's *Deficit* figures presented in Appendix D.
I am confident that all the rules of the Kings' and Stewards' Reckoning are accounted for in Appendix D,
but I now think that Tolkien attempted to use deficit calculations for the Second Age years 5501, 5801, and 6462
when discussing the deficit for the Third Age years 2060, 2360, and 3021.
I have posted my results on this project's "[The Kings' Reckoning Rules and the *Deficit*](https://psarando.github.io/shire-reckoning/Kings_Reckoning_Rules_and_Deficit.html)" page,
along with more details about the Kings' and Stewards' Reckoning rules,
and details on how to work out the math of the *Deficit* according to these rules.

#### Leap-years beyond the Third Age

Tolkien did not give any details on how the New Reckoning handled leap-years in the Fourth Age.
That leaves me with the following 2 options for this simulation.
The first option may be more realistic,
but for the simplicity of not inventing new leap-year rules,
and to always keep the New Reckoning in sync with Shire Reckoning,
I chose option #2:

1. Restart leap-year calculations according to the count of Fourth Age years in the New Reckoning.
   This means either altering the Shire Calendar leap-year rules to omit leap-days in the corresponding centuries of the Fourth Age
   (which means omitting leap-days in S.R. 1520, 1620, 1720, etc.),
   or not altering the Shire Calendar leap-year rules and continue omitting its leap-days in S.R. centuries
   (1500, 1600, 1700, etc.).
   If the traditional Shire Calendar leap-year rules continued into the Fourth Age,
   but the New Reckoning restarted its calculations, then its Yestarë, Yavannië 30, and Cormarë
   would be out of sync with the Shire Calendar for 20 years around every century.
   Also, the Shire Calendar would have to choose a year to make a [Millennial Leap-year](#millennial-leap-years) that would be different than
   the New Reckoning's [Millennial Leap-year](#millennial-leap-years) (since those also fall on a centennial year),
   making these calendars even more out of sync in the meantime.
2. Ignore the new count of years for the Fourth Age and continue reckoning leap-years in the New Reckoning
   and the Shire Calendar as if the count of Third Age years had continued.
   This allows the New Reckoning Yestarë to always correspond to Shire Rethe 25,
   and New Reckoning Yavannië 30 (or Cormarë in leap-years) to always correspond to Shire Halimath 22.
   Since IV 1 corresponds to S.R. 3021, then regular leap-years in the New Reckoning calendar will still occur in years divisible by 4,
   but leap-days omitted at the end of centuries appear to come 20 years early (IV 80, IV 180, IV 280, etc.),
   and [Millennial Leap-years](#millennial-leap-years) would also come 20 years early in the New Reckoning, but continue to come 600 years early
   (or 400 years late) in Shire-reckoning years (e.g. S.R. 2400, 3400, 4400, etc.)
