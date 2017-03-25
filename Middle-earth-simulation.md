A Simulation of J.R.R. Tolkien's Calendars throughout Middle-earth's History
============================================================================

The primary goal of the [calendars on the main page](http://psarando.github.io/shire-reckoning/#tolkien-calendars)
is to visualize how the calendars described in J.R.R. Tolkien's *The Lord of the Rings* Appendix D relate to our modern day
[Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar).
Those are the calendars one would use if they were only interested in a Shire, Gondor, or Rivendell date
for today's date in modern times.

As pointed out in the [Rivendell Reckoning notes](http://psarando.github.io/shire-reckoning/#rivendell-reckoning-notes),
the calendars of Gondor and the Shire described in Appendix D had similar
yet different leap-year and leap-day rules compared to our Gregorian calendar.
So this project also includes a way to reckon Shire and Gondor dates according to
the "traditional" leap-day and leap-year rules as described in Appendix D.
This allows me to implement a simulation that can display these calendars according to
Shire-reckoning years and the Ages of Middle-earth.
Various ways of synchronizing Gregorian years with Shire-reckoning years and the Ages of Middle-earth are also provided.

[Follow this link for a live demonstration of this simulation](http://psarando.github.io/shire-reckoning/Middle-earth-simulation.html).

## How to Use these Calendar Simulations

1. Choose a `Synchronize` setting to align Middle-earth years and dates with Gregorian dates.
   Changing the setting of this list will adjust the `Start reckoning from` dates in each calendar
   to a specific date for the selected `Synchronize` scheme.
    * The [default calendars on the main page](http://psarando.github.io/shire-reckoning/#tolkien-calendars)
      are recommended if you're only interested in a Shire/Gondor/Rivendell date for today's date.
2. Choose one of the events of Middle-earth in the `Dates of Interest` list to see its corresponding date in each calendar,
   as well as which Gregorian date corresponds to that chosen event, for the selected `Synchronize` scheme.
    * These dates are listed in descending order, from latest to earliest.
      Months and days are given according to Shire Reckoning.
3. Adjusting the `Gregorian Date` will change the date displayed in each calendar,
   and may update the selected event in the `Dates of Interest` list, depending on the date or year of the event.
4. Adjusting the `Start reckoning from` dates in any of the calendars will update the
   `Synchronize` setting to a `Custom Reckoning` setting.
    * The events of Middle-earth in the `Dates of Interest` list are tied to this simulation's Shire Reckoning calendar,
      so adjusting the Shire Reckoning's start date will also adjust those events' corresponding Gregorian dates.
      Also, since [the Shire and Gondor calendars were always in sync](http://psarando.github.io/shire-reckoning/#why-not-march-29th),
      adjusting the `Start reckoning from` date of one will also set it to that date in the other.
      The `Start reckoning from` dates in the Shire and Gondor calendars correspond the first year of the Second Age.
    * Since Appendix D only mentioned the one Rivendell calendar date (New Year's Day)
      that corresponded to a Shire calendar date (Third Age 3019 Astron 6),
      this simulation's Rivendell Reckoning `Start reckoning from` date can be adjusted without affecting the other calendars.
      As a result, the `Dates of Interest` event "Third Age 3019 Astron 6" may no longer correspond to Rivendell's New Year's Day,
      depending on the custom adjustments to the Shire and Rivendell `Start reckoning from` dates.
5. See my [Shire Reckoning notes](http://psarando.github.io/shire-reckoning/#shire-reckoning-notes)
   for more details about the names and layout of the days, weeks, and months of the Shire Calendar.

## Caveats and Minutiae

### Shire, Gondor, and Rivendell Reckoning years

The top of each calendar displays a year appropriate to each reckoning, relative to the chosen settings described above.
These years include the year 0 and can go into negative numbers.
So when a date is selected during Third Age 1600, the Shire Reckoning calendar will display as year 0,
and when a date is selected before the start of the Second Age both the Shire Reckoning and Gondor/Númenor calendars
will display a negative year.
Similarly, the `Start reckoning from` dates also include the Gregorian year 0, which is equivalent to 1 B.C.
(and -999 is equivalent to 1000 B.C.)

* [Rivendell Reckoning years](https://en.wikipedia.org/wiki/Middle-earth_calendar#Calendar_of_Imladris):
  The current Rivendell year, or coranar ("sun-round"), includes a conversion into the current yén (144 of our years)
  and loa ("growth", equivalent to a coranar).
* **Gondor years**:
  The Gondor calendar is displayed with the appropriate Kings', Stewards', or New Reckoning for the selected year.
  The displayed year is also converted to the appropriate Age and year,
  where IV = Fourth Age, III = Third Age, and II = Second Age.
  This calendar does not attempt to convert years into any Ages outside of II, III, or IV.
* **Shire and Bree Reckoning years**:
  Since the Shire was first settled in III 1601, Shire-reckoning years are displayed relative to this Gondor year.
  Changing this calendar to display months and weeks with [Tolkien names](http://psarando.github.io/shire-reckoning/#shire-reckoning-notes)
  will still display this Shire-reckoning year.
  Since Hobbits first settled in Bree in III 1300, then changing this calendar to display months and weeks with
  [Bree names](http://psarando.github.io/shire-reckoning/#shire-reckoning-notes)
  will also display the appropriate Bree-reckoning year.

### Gondor Week Days

Note that Tolkien stated in Appendix D that
"all the days, months, and dates are in the Red Book translated into Shire terms, or equated with them in notes".
This means there probably aren't any references to a current weekday of the Gondor Calendar during the narrative of *The Lord of the Rings*.
So for these simulations, I assume that the weekdays were reckoned continuously
starting with Elenya on the first day of the Second Age (S.A.).
Appendix D states that "in Númenor calculation started with S.A. 1",
and though this is mainly a reference to the calculation of leap-days, it may also apply to the calculation of weekdays.

### Synchronize settings

* **Gregorian years with Second Age years**:
  This is the synchronization scheme I think is the one mostly likely used by Tolkien
  while working out the details of *The Lord of the Rings* Appendix D,
  which I make a strong argument for in my [Rivendell Reckoning notes](http://psarando.github.io/shire-reckoning/#rivendell-reckoning-notes).
  Those notes also explain the chosen Rivendell Reckoning `Start reckoning` dates in this simulation's `Synchronize` settings.
  **Note:** I'm not arguing that somehow the Second Age of Middle-earth was supposed to start in our actual historical year 1 A.D.
  I think that Tolkien just used this synchronization scheme as a "model",
  or aligned a hypothetical Gregorian calendar as a kind of "measuring stick" to the start of the Second Age,
  when working out the details of the Gondor leap-days and the Elves' New Year's Day of III 3019.
* **Moon phases**:
  These schemes attempt to align the dates of the 'Great Years' of the War of the Ring as much as possible
  with the real-world moon phases of various real-world years.
  See my [Shire Reckoning notes](http://psarando.github.io/shire-reckoning/#reckoning-start-dates)
  for an explanation of how Tolkien used the moon phases of 1941-42 as the model for the moon phases in *The Lord of the Rings*.
  Also see [Moon Phases in The Lord of the Rings](http://shire-reckoning.com/moon.html) for more details.
* [Venerable Bede's Reckoning](https://en.wikipedia.org/wiki/Bede#Works_on_historical_and_astronomical_chronology):
  This synchronization scheme is based on Venerable Bede's calculation of 3952 B.C. as the date of the "creation of the world",
  and aligns the first year of the Fourth Age with this year.
  Since Tolkien based the names of the Shire Calendar on the
  [Anglo-Saxon calendar](https://en.wikipedia.org/wiki/Germanic_calendar#Medieval)
  described in Venerable Bede's
  [On the Reckoning of Time (De temporum ratione)](https://en.wikipedia.org/wiki/The_Reckoning_of_Time),
  I'm guessing that he may have had Bede's year of 3952 B.C. in mind
  when he estimated the events of *The Lord of the Rings* could have occurred around 6000 years ago in his letter #211.
* **James "the Just" Strom's Reckoning**:
  This synchronization scheme is based on the historical astronomical calculations
  [of this post by James the Just](http://tolkienforums.activeboard.com/t42820320/middle-earth-chronology/).
* **Joe Bartram's Reckoning**:
  This synchronization scheme is based on
  [this post by Joe Bartram of the Oxford Tolkien Society, Taruithorn](https://taruithornmiruvor.wordpress.com/2015/05/24/a-tolkien-calendar-part-1/).
  The `Start reckoning from` dates were chosen to align the start of the Shire Calendar in 2015 (S.R. 8077) with the calendar linked in
  [part 4 of Bartram's calendar posts](https://taruithornmiruvor.wordpress.com/2015/09/23/a-tolkien-calendar-part-4-my-own-estimate/).

### Dates of Interest

As mentioned in the "How to" notes above,
the events of Middle-earth in the `Dates of Interest` list are tied to this simulation's Shire Reckoning calendar.
These dates are listed in descending order, from latest to earliest.
See *The Lord of the Rings* Appendix B or the [LOTR Project Timeline](http://lotrproject.com/timeline/) for even more dates.

The years correspond to the appropriate Shire-reckoning year or Age of Middle-earth,
where S.R. = Shire Reckoning, III = Third Age, II = Second Age, and Iys = [First Age Years of the Sun](https://en.wikipedia.org/wiki/Timeline_of_Arda#Years_of_the_Sun).

* When the date includes a month and a day, they are given according to Shire Reckoning,
  and selecting that event will select that specific date in each calendar,
  and also set the corresponding `Gregorian Date`.
* If the event only includes a year and a season (e.g. the passing of Arwen),
  then selecting that event will select an arbitrary date appropriate to that season,
  although the event will remain selected for any other date selected within that S.R. year.
* If the event only includes a year,
  then selecting that event will select the Rivendell Reckoning's New Year's Day for that S.R. year,
  except Mid-year's Day will be selected in "Millennial Leap-years",
  the first year of Shire Reform, and the first year of Stewards' Reckoning.
  The event will remain selected for any other date selected within those S.R. years.


#### Millennial Leap-years

What I'm calling a "Millennial Leap-year" is a year in which the "millennial adjustment"
to the calendars of Númenor or Gondor occurred,
as Tolkien described in Appendix D.
[As pointed out in "Why not March 29th?" notes #1 and #2](http://psarando.github.io/shire-reckoning/#why-not-march-29th),
this "adjustment" was an addition of 2 days every millennium
(see also [The Lord of the Rings: A Reader's Companion](http://psarando.github.io/shire-reckoning/#references)),
and the adjustment was made to the calendars of Gondor and the Shire.
Tolkien did not give any more details about what this "adjustment" was exactly, so I had to improvise for these simulations.
In the tradition of the Eldar calendar that doubles its middle-days every leap-year,
I decided to double the leap-day in a "Millennial Leap-year" of the Shire and Gondor calendars
in order to accomplish the "millennial adjustment" of adding 2 days.

According to the leap-year rules of the Shire and Gondor calendars, every 4th year is a leap-year,
which means a millennial year would normally also be a leap-year.
Since these leap-year rules also omit a leap-day every century,
then without the "millennial adjustment", a millennial year should be a regular non-leap-year.
So these calendar simulations accomplish the "millennial adjustment" of adding 2 days to a "Millennial Leap-year"
by not omitting the leap-day in each millennial year, and also by doubling that year's leap-day.

In each "Millennial Leap-year" of the Shire Calendar, I've added an extra Overlithe to the other side of Mid-year's Day,
and in each "Millennial Leap-year" of the Gondor calendars, I've added an extra Enderë,
except in the New Reckoning where I honor Frodo by doubling the Cormarë
(meaning the Ring Bearer's birthday celebrations are extended to a 3rd day).

Note the 3 exceptions to this "Millennial Leap-year" rule as stated in Appendix D:

* III 3000 was not a "Millennial Leap-year".
* Hador the Steward added an extra day to III 2360, and since this year was already a leap-year,
  adding 1 extra day is equivalent to treating this year as a "Millennial Leap-year".
* Mardil the Steward made the last year of Kings' Reckoning in III 2059 a "Millennial Leap-year".

#### Leap-years beyond the Third Age

Tolkien did not give any details on how the New Reckoning handled leap-years in the Fourth Age.
That leaves me with 2 options for this simulation, and ultimately I chose option #1:

1. Ignore the new count of years for the Fourth Age and continue reckoning leap-years in the New Reckoning
   and the Shire Calendar as if the count of Third Age years had continued.
   This allows the New Reckoning Yestarë to always correspond to Shire Rethe 25,
   and New Reckoning Yavannië 30 (or Cormarë in leap-years) to always correspond to Shire Halimath 22.
   Since IV 1 corresponds to S.R. 3021, then regular leap-years in the New Reckoning calendar will still occur in years divisible by 4,
   but leap-days omitted at the end of centuries appear to come 20 years early (IV 80, IV 180, IV 280, etc.),
   and "Millennial Leap-years" would come 20 years early in the New Reckoning, but continue to come 600 years early
   (or 400 years late) in Shire-reckoning years (e.g. S.R. 2400, 3400, 4400, etc.)
2. Restart leap-year calculations according to the count of Fourth Age years in the New Reckoning.
   This means either altering omitted leap-years in the Shire Calendar to correspond to the centuries of the Fourth Age,
   which also means omitting leap-days in S.R. 1520, 1620, 1720, etc.
   Or continue omitting leap-days in S.R. centuries 1500, 1600, 1700, etc.,
   which would mean New Reckoning Yestarë, Yavannië 30, and Cormarë
   would be out of sync with the Shire Calendar for 20 years around every century,
   but also the Shire Calendar would have to choose a year to make a "Millennial Leap-year" that would be different than
   the New Reckoning's "Millennial Leap-year" (since those also fall on a centennial year).

#### Shire Reform

Shire Reform was enacted during the time of Isengrim II, which was sometime between S.R. 1083 - 1122.
Once enacted, every year of the Shire Calendar always started on the first day of the week and always ended on the last day of the week,
by not assigning a day of the week to Mid-year's Day or the Overlithe days.
For these simulations, I am assuming that before Shire Reform was enacted,
the current day of the week in the Shire Calendar was the same as the corresponding day of the week that was current in Gondor
(since the Shire Calendar was based on the Kings' Reckoning calendar).
Shire Reform was probably enacted in a year that was already supposed to start on the first day of the week,
which in this simulation means one of these Third Age years during the time of Isengrim II:

* 2685, 2691, 2703, 2714, or 2720

So for this simulation, I just chose the first year in this list as the first year of Shire Reform.
