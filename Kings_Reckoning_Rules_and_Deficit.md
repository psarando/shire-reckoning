---
layout: page
title: "Shire Reckoning: The Kings' Reckoning Rules and the Deficit"
---

The Kings' Reckoning Rules and the *Deficit*
============================================

# Contents

* [Introduction](#introduction)
* [The Rules](#the-rules)
* [The *Deficit*](#the-deficit)
    * [Deficit Calculation Results for Select Years](#deficit-calculation-results-for-select-years)
* [The Stewards' Reckoning: Tolkien Reckoned Mostly Correct](#the-stewards-reckoning-tolkien-reckoned-mostly-correct)

# Introduction

In *The Lord of the Rings* Appendix D,
after Tolkien describes [the leap-year rules](#the-rules) of the
[Kings' Reckoning calendar of Númenor and Gondor](https://psarando.github.io/shire-reckoning/#the-3-calendars-of-gondor),
he describes the *Deficit* of this calendar when compared to the length of the actual ([solar](https://en.wikipedia.org/wiki/Tropical_year)) year:

> In Númenor calculation started with S.A. 1.
> The *Deficit* caused by deducting 1 day from the last year of a century was not adjusted until the year of a millennium,
> leaving a *millennial deficit* of 4 hours, 46 minutes, 40 seconds.

He then goes into more (but brief) details and figures of the *Deficit* of the [Kings' and Stewards' Reckoning calendars](https://psarando.github.io/shire-reckoning/#the-3-calendars-of-gondor)
throughout their history in Gondor.

The *Deficit* is due to the fact that the [solar year](https://en.wikipedia.org/wiki/Tropical_year)
is slightly longer than the 365 days of a common year
(365 days, 5 hours, 48 minutes, 46 seconds as given in Appendix D),
which causes the seasons (such as the summer solstice) to fall on later and later dates in the calendar.
So [leap-days are added every few years](#the-rules) to keep the calendar more in sync with the seasons,
but the calendar is not perfectly in sync, so the seasons will still very gradually fall on later dates in the calendar.
This difference between the length of each calendar year and the solar year is what Tolkien called the *Deficit*.
In contrast, our modern [Gregorian calendar usually has a surplus of days](https://en.wikipedia.org/wiki/Gregorian_calendar#Accuracy)
due to its leap-year rules, so the seasons are very gradually falling on earlier dates in our calendar.

For all my interest in Appendix D,
I was never really interested in Tolkien's *Deficit* calculations and whether or not he made any mistakes.
After all, others have already addressed these calculations in other articles,
such as "The King's Reckoning: Did Tolkien Reckon Correct?"
(*[Beyond Bree](http://www.cep.unt.edu/bree.html)*, November 1985) by [Åke Jönsson (Bertenstam)](https://tolkiengateway.net/wiki/%C3%85ke_Bertenstam)
and "J.R.R. Tolkien's Calendars or The Saga of Hador The Incompetent"
(*[Mythlore](http://www.mythsoc.org/mythlore.htm)* 54, Summer 1988) by Darrell A. Martin.
I also did not need to analyze Tolkien's calculations in order to understand the rules of the calendars as presented in Appendix D,
and I only needed those rules in order to create the [Middle-earth calendar simulations](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html).
My understanding of those rules is also the basis of my argument that
[Rivendell New Year's Day fell on a March 25th by the end of the Third Age](https://psarando.github.io/shire-reckoning/#rivendell-new-years-day-fell-on-a-march-25th-by-the-end-of-the-third-age).

Then I came across the Reddit post "[Tolkien has reckoned correct in App. D after all](https://www.reddit.com/r/tolkienfans/comments/836lf1/tolkien_has_reckoned_correct_in_app_d_after_all/)"
by Andreas Möhn, a.k.a. CodexRegius
(apparently reproduced from the [Lalaith's Middle-earth Science Pages blog post of a similar title](https://lalaithmesp.blogspot.de/2018/03/tolkien-has-reckoned-correct-after-all.html)).
Since I was skeptical of Möhn's conclusion that additional Stewards' Reckoning rules that Tolkien "failed to specify" explain the Appendix D calculations,
I decided to finally examine Tolkien's *Deficit* calculations for myself to see if they supported this idea.

Since I'm confident I have accurately reproduced the rules of the Kings' and Stewards' Reckoning in the
[Middle-earth calendar simulations](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html),
it was not difficult
[to use these simulations to assist my own *Deficit* calculations](https://psarando.github.io/shire-reckoning/examples/?path=/story/shire-reckoning-gondor-calendar--deficits),
and then compare my results with the results of Tolkien and others.
When I finally performed these calculations for myself,
using the rules as presented in Appendix D,
and compared them with Tolkien's figures,
I was as perplexed as Darrell A. Martin by these results.
Then Möhn's suggestion that "the odd allusion to 5500 Second Age as corresponding to 2059 TA might hide a clue"
pointed me to a different conclusion than Möhn.
I am confident that all the rules of the Kings' and Stewards' Reckoning are accounted for in Appendix D,
and I think the simplest explanation for Tolkien's *Deficit* figures is that he attempted a mathematical shortcut
of using deficit calculations for Second Age years (S.A.) 5501, 5801, and 6462
when discussing the deficit for Third Age years (T.A.) 2060, 2360, and 3021.

# The Rules

[The Kings' Reckoning](https://psarando.github.io/shire-reckoning/#the-3-calendars-of-gondor)
started reckoning from the first year of the Second Age (S.A. 1).
The Kings' Reckoning rules are very similar to the [Gregorian calendar rules](https://en.wikipedia.org/wiki/Gregorian_calendar),
where each year has 365 days, every 4th year (S.A. 4, 8, 12, etc.) is a leap-year that adds an extra day,
except the last year in a century (S.A. 100, 200, 300, etc.) which is not a leap-year;
however, the Gregorian calendar adds back the leap-day every 4th century
whereas the Kings' Reckoning adds 2 extra leap-days every Millennial Leap-year.

What I'm calling a "Millennial Leap-year" is a year in which the "millennial additions"
to the calendars of Númenor or Gondor occurred,
as Tolkien described in Appendix D.
The "millennial additions" were an addition of 2 days in every millennium of the Kings' Reckoning calendar
(in S.A. 1000, 2000, 3000 and again in T.A. 1000, 2000).
Although the second edition of *The Return of the King* Appendix D does not specify the number of days of the "millennial additions",
[The Lord of the Rings: A Reader's Companion](https://psarando.github.io/shire-reckoning/#references)
quotes the first publication where it's explicitly stated that it was 2 days added.
This can also be figured out from Tolkien's *Deficit* calculations in the second edition of Appendix D,
as explained by Jönsson's *[Beyond Bree](http://www.cep.unt.edu/bree.html)* (November 1985) article,
and [as demonstrated below](#the-deficit).

The Second Age ended with S.A. 3441, but this system continued into the
"Third Age with a new numeration: S.A. 3442 became T.A. 1. By making T.A. 4 a leap year",
the system could follow the same rules in Third Age years as it had in Second Age years;
i.e. leap-years are still every 4th year by Third Age year counts (T.A. 4, 8, 12, etc.),
except the last of a Third Age century (T.A. 100, 200, 300, etc.),
and as mentioned above, the first couple of Third Age millennia became Millennial Leap-years.

Note the 3 exceptions to the Millennial Leap-year rule as interpreted from Tolkien's statements in Appendix D:

* T.A. 3000 was not a Millennial Leap-year, and since it was the last year of a century,
  it ended up as another common (non-leap) year.
* Hador the Steward added an extra day to T.A. 2360, and since this year was already a leap-year,
  adding 1 extra day is equivalent to treating this year as a Millennial Leap-year.
* Mardil the Steward added 2 days to the last year of the Kings' Reckoning in T.A. 2059,
  which also makes it equivalent to a Millennial Leap-year.

In the first publication of Appendix D, as quoted in the *Reader's Companion* and also in Jönsson's article,
Mardil added 2 days to T.A. 2060 instead of T.A. 2059.
Since T.A. 2060 was already supposed to be a leap-year, which means it was already to be a year of 366 days,
then if Mardil's 2-day addition to T.A. 2060 persisted into the second edition,
that would have meant a year with 368 days,
which had never happened before in all of the 5500 year history of the Kings' Reckoning;
not even in a Millennial Leap-year which has 367 days.

This is probably why Tolkien emended Mardil's special 2-day addition to T.A. 2059 instead,
so that the last year of the Kings' Reckoning could be treated as another Millennial Leap-year
(just like the one that occurred 59 years earlier in T.A. 2000),
and then the first year of Stewards' Reckoning in T.A. 2060 could still be a leap-year of 366 days as already scheduled.
Then the rules of Third Age leap-years (every 4 years except the last of a century)
could continue as normal, just as they had for the past 2059 years.

# The *Deficit*

Using these rules of the Kings' Reckoning and Tolkien's static year length of
365 days, 5 hours, 48 minutes, 46 seconds given in Appendix D,
I was able to reproduce Tolkien's millennial deficit of 4 hours, 46 minutes, 40 seconds.
I understand that the real-world [solar year length is not static](https://en.wikipedia.org/wiki/Tropical_year#Length_of_tropical_year),
but this does not factor into these calculations.

As mentioned earlier, I used my [calendar simulations](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html)
to assist my calculations of the total number of days elapsed since the start of the Second Age,
and subtracting Tolkien's static year length, times the number of years elapsed since the start of S.A. 1
(all converted into days),
gives the deficit results for the end of that year.

I will also demonstrate an equivalent way to calculate these results by hand,
but those not interested in how the math works out may wish to
[jump directly to my *Deficit* calculation results](#deficit-calculation-results-for-select-years).

To find the deficit for the end of some year since S.A. 1,
first find the number of days elapsed since the start of S.A. 1,
subtract the number of years elapsed times the static year length converted into days,
then convert the result back to days, hours, minutes, and seconds.

For example, to find the number of days elapsed since the start of S.A. 1 to the end of some year,
take the number of years elapsed and multiply by 365,
add the number of leap-days for every 4 years,
then subtract the number of leap-days omitted every century,
and finally add the 2-day millennial addition every 1000 years.
So the total number of days elapsed at the end of S.A. 1000 is

    (365*1000) + (1000/4) - (1000/100) + (1000/1000) * 2
    = 365000 + 250 - 10 + 2
    = 365242 days

To find the deficit at the end of that year,
subtract from the total number of days elapsed Tolkien's static year length, converted into days,
times the number of years elapsed.
So the deficit at the end of S.A. 1000 works out to

    365242 days - 365.24219907407 days * 1000
    = 365242 days - 365242.19907407 days
    = -0.19907407 days
    = 4 hours, 46 minutes, 40 seconds deficit
    = 4h:46m:40s deficit

Similarly, the deficit of 1 normal year is

    365 days - 365.24219907407 days
    = -0.24219907407 days
    = 5 hours, 48 minutes, 46 seconds deficit
    = 5h:48m:46s deficit

The following is the general formula for finding the total number of days elapsed by the end of any Second Age year since S.A. 1:

    (365 * year) + floor(year/4) - floor(year/100) + (floor(year/1000) * 2)

Where "floor" is a function that simply drops any fractional remainder (rounds down to the nearest integer).
The deficit for the end of that year is that number of days elapsed minus `(year * 365.24219907407)`.
So the total number of days elapsed by the end of S.A. 3441 is

    (365 * 3441) + floor(3441/4) - floor(3441/100) + (floor(3441/1000) * 2)
    = 1255965 + 860 - 34 + 6
    = 1256797 days

The total deficit at the end of the Second Age is

    1256797 - (3441 * 365.24219907407)
    = -1.40701387487 days
    = 1 day, 9 hours, 46 minutes, 6 seconds deficit
    = 1d:9h:46m:6s deficit

To find the total number of days elapsed and the deficit for a Third Age year is slightly more complicated.
The value of the "actual" days elapsed since the start of S.A. 1 can easily be found
by simply continuing the Second Age year counts and multiplying by Tolkien's static year length.
Finding the days elapsed according to the Kings' Reckoning system is different,
since leap-years were reset to start over from T.A. 1,
but we can add the total number of days elapsed by the end of S.A. 3441 to the calculation for any Third Age year using the same formula above.

So the total number of days elapsed by the end of T.A. 1:

    1256797 + (365 * 1) + floor(1/4) - floor(1/100) + (floor(1/1000) * 2)
    = 1256797 + 365 + 0 - 0 + 0
    = 1257162 days

Then the deficit for the end of T.A. 1:

    1257162 - (3442 * 365.24219907407)
    = -1.64921294894 days
    = 1d:15h:34m:52s deficit

The total number of days elapsed by the end of T.A. 4:

    1256797 + (365 * 4) + floor(4/4) - floor(4/100) + (floor(4/1000) * 2)
    = 1256797 + 1460 + 1 - 0 + 0
    = 1258258 days

The deficit for the end of T.A. 4:

    1258258 - (3445 * 365.24219907407)
    = -1.37581017115 days
    = 1d:9h:1m:10s deficit

The Stewards’ Reckoning was only a slight modification of the Kings’ Reckoning calendar,
which rearranged some of the days of the months in the middle of the calendar;
but the New Year’s Day (Yestarë) of both calendars would still fall on the same day when following the rules described above.
This means that deficit calculations are not affected by the format of the Stewards' Reckoning calendar,
and we only need to account for Mardil and Hador's special additions and the omission of the millennial adjustment to T.A. 3000.

## Deficit Calculation Results for Select Years

This chart shows deficit calculations for select Second Age and Third Age years,
as calculated with this project's [Kings' and Stewards' Reckoning simulations](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html).

**Note**: The `Year` column is indicating what the deficit results are for the *end* of that year,
which is why the first row displays 365 days elapsed by the end of S.A. 1.

In the last 2 columns, a negative value represents a *deficit*, and a positive value a *surplus*.

The code used to generate these tables is also included in the examples directory,
[with a live version in this project's hosted examples pages](https://psarando.github.io/shire-reckoning/examples/?path=/story/shire-reckoning-gondor-calendar--deficits).

| Year | Days elapsed since the start of S.A. 1 | Days per Solar Year elapsed | The deficit / surplus | The deficit / surplus in days:hours:minutes:seconds |
| ---- | -------------------------------------- | --------------------------- | --------------------- | --------------------------------------------------- |
| S.A.    1 |     365 | 365.2421990740741 | -0.2421990740741 | -0d:05h:48m:46s |
| S.A.  100 |   36524 | 36524.21990740741 | -0.21990740741   | -0d:05h:16m:40s |
| S.A.  500 |  182620 | 182621.0995370371 | -1.0995370371    | -1d:02h:23m:20s |
| S.A. 1000 |  365242 | 365242.1990740741 | -0.1990740741    | -0d:04h:46m:40s |
| S.A. 2000 |  730484 | 730484.3981481482 | -0.3981481482    | -0d:09h:33m:20s |
| S.A. 3000 | 1095726 | 1095726.597222222 | -0.597222222     | -0d:14h:20m:00s |
| S.A. 3441 | 1256797 | 1256798.407013889 | -1.407013889     | -1d:09h:46m:06s |
| T.A.    1 | 1257162 | 1257163.649212963 | -1.649212963     | -1d:15h:34m:52s |
| T.A.    3 | 1257892 | 1257894.133611111 | -2.133611111     | -2d:03h:12m:24s |
| T.A.    4 | 1258258 | 1258259.375810185 | -1.375810185     | -1d:09h:01m:10s |
| T.A. 1000 | 1622039 | 1622040.606087963 | -1.606087963     | -1d:14h:32m:46s |
| T.A. 2000 | 1987281 | 1987282.805162037 | -1.805162037     | -1d:19h:19m:26s |
| T.A. 2058 | 2008465 | 2008466.852708333 | -1.852708333     | -1d:20h:27m:54s |
| T.A. 2059 | 2008832 | 2008832.094907408 | -0.094907408     | -0d:02h:16m:40s |
| T.A. 2060 | 2009198 | 2009197.337106482 | +0.662893518     | +0d:15h:54m:34s |
| T.A. 2359 | 2118404 | 2118404.754629630 | -0.754629630     | -0d:18h:06m:40s |
| T.A. 2360 | 2118771 | 2118769.996828704 | +1.003171296     | +1d:00h:04m:34s |
| T.A. 2999 | 2352159 | 2352159.762037037 | -0.762037037     | -0d:18h:17m:20s |
| T.A. 3000 | 2352524 | 2352525.004236111 | -1.004236111     | -1d:00h:06m:06s |
| T.A. 3019 | 2359463 | 2359464.606018519 | -1.606018519     | -1d:14h:32m:40s |
| T.A. 3020 | 2359829 | 2359829.848217593 | -0.848217593     | -0d:20h:21m:26s |


The following chart shows hypothetical deficit calculations for some Second Age years,
if the Second Age had continued through to the end of S.A. 6461 (T.A. 3020),
and without the Stewards' adjustments in T.A. 2059 (S.A. 5500) and T.A. 2360 (S.A. 5801).
Of course, this chart includes the 2-day millennial adjustment that would have been due in S.A. 6000 (T.A. 2559).

| Year | Days elapsed since the start of S.A. 1 | Days per Solar Year elapsed | The deficit | The deficit in days:hours:minutes:seconds |
| ---- | -------------------------------------- | --------------------------- | ----------- | ----------------------------------------- |
| S.A. 3445 | 1258258 | 1258259.375810185 | -1.375810185 | -1d:09h:01m:10s |
| S.A. 5500 | 2008830 | 2008832.094907408 | -2.094907408 | -2d:02h:16m:40s |
| S.A. 5501 | 2009195 | 2009197.337106482 | -2.337106482 | -2d:08h:05m:26s |
| S.A. 5801 | 2118767 | 2118769.996828704 | -2.996828704 | -2d:23h:55m:26s |
| S.A. 6461 | 2359828 | 2359829.848217593 | -1.848217593 | -1d:20h:21m:26s |

These hypothetical figures may be helpful in the following discussion.

# The Stewards' Reckoning: Tolkien Reckoned Mostly Correct

As demonstrated in the notes above, and as shown in the table above for the year S.A. 1000,
I have reproduced Tolkien's millennial deficit of 4 hours, 46 minutes, 40 seconds.

I have also reproduced the calculations presented in "Table 5" of Martin's article,
where the total deficit at the start of T.A. 1 was given as "1 day 9 hr 46 min 6 sec"
(note that the start of T.A. 1 is the same as the end of S.A. 3441 shown in the chart above),
the deficit at the start of T.A. 2001 was given as "1 day 19 hr 19 min 26 sec",
and later in the article the total deficit at the start of T.A. 3001 was calculated as "1 day 6 minutes and 6 seconds".
This indicates that I have interpreted the Kings' and Stewards' Reckoning rules the same as Martin.

Tolkien's first puzzling statement about the deficit concerns the start of the Stewards' Reckoning,
when the first Ruling Steward of Gondor decided to reduce the deficit at that time:
"Mardil the Steward issued a revised calendar to take effect in T.A. 2060,
after a special addition of 2 days to 2059 (S.A. 5500),
which concluded 5 1/2 millennia since the beginning of the Númenórean system.
But this still left about 8 hours deficit."
My results for the total deficit for the end of T.A. 2059,
according to the rules described above and accounting for Mardil's 2-day correction,
agrees with the amount of "2 hours, 16 minutes, 40 seconds" given in the *Reader's Companion*,
but this is not "about 8 hours".

Jönsson's article appears to explain Tolkien's "about 8 hours deficit",
but Jönsson's method for calculating the deficit at the end of T.A. 2059 is not quite correct according to the Kings' Reckoning rules.
Without Mardil's 2-day addition to T.A. 2059, Jönsson gives the deficit as
"2 days, 8 hours, 5 minutes, 26 seconds, consisting of 1 day, 2 hours, 16 minutes, 40 seconds
(5.5 times the millennial deficit) together with 5 hours, 48 minutes, 46 seconds
(this deficit was caused by making T.A. 4 instead of T.A. 3 the first leap-year in the Third Age -
note that the Second Age ended with the year 3441)
and 1 further day, caused by the millennial adjustments being made 441 years late in the Third Age
together with the deficit accumulated during the 59 years since the last millennial addition."

The value given for "5.5 times the millennial deficit"
should only apply if the King's Reckoning added 1 day every 500 years to account for the millennial deficit.
Since the millennial deficit is adjusted by adding 2 days only after 1000 years have elapsed,
then one way to find the actual deficit by this system would be 5 times the millennial deficit,
plus another deficit of 500 years.
This will find the deficit for the end of S.A. 5500,
but it also works out to the deficit for the end of T.A. 2059 as well.
This results in the amount of "50 hours, 16 minutes, 40 seconds" given in the *Reader's Companion*;
or 2 days, 2 hours, 16 minutes, 40 seconds (2d:2h:16m:40s).
Note that this is 1 day more than the value for "5.5 times the millennial deficit",
but Jönsson's "1 further day" added to "5.5 times the millennial deficit"
actually works out to the correct deficit for the end of T.A. 2059.

Adding the regular yearly deficit of 5h:48m:46s to that total actually results in the deficit for T.A. 2060, less 1 day,
because it doesn't account for the leap-day due in T.A. 2060.
Jönsson may have been misled by Tolkien's statement in Appendix D that
"by making T.A. 4 a leap year instead of T.A. 3 (S.A. 3444)
1 more short year of only 365 days was intruded causing a deficit of 5 hours, 48 minutes, 46 seconds."
While it's correct that the regular yearly deficit of 5h:48m:46s was not offset by a leap-day in T.A. 3,
the leap day added in T.A. 4 made up the difference,
so that both the end of T.A. 4 and the end of S.A. 3445 would end up with the same deficit.

After adding the 2 days of Mardil's correction, Jönsson's total deficit would come to 8h:5m:26s.
The *Reader's Companion* suggests the possibility that Tolkien may have come to a similar 8h:5m:26s deficit
by adding the regular yearly 5h:48m:46s deficit to the 2h:16m:40s deficit at the end of T.A. 2059.
Instead Möhn suggests
"whether the odd allusion to 5500 Second Age as corresponding to 2059 TA might hide a clue",
and then assumes additional Stewards' Reckoning rules that Tolkien "failed to specify" that would explain the "8 hours deficit".
I have not reproduced Möhn's calculations,
and he has not published his method of calculating his deficit figures (as of this writing),
but I think his clue points to another explanation instead.

Perhaps Tolkien's "8 hours deficit" is a remnant of calculations done for the first publication of Appendix D.
As pointed out in [The Rules](#the-rules) section of these notes,
in the first publication Mardil added 2 days to T.A. 2060 instead of T.A. 2059.
If Tolkien was using a shortcut of calculating the deficit at the end of S.A. 5501
(which would be the same year as T.A. 2060),
that deficit would be 1 day less than the deficit for the end of T.A. 2060.
It works out that the deficit by the end of S.A. 5500 would match the deficit by the end of T.A. 2059,
but T.A. 2060 has a leap-day whereas there would be no leap-day in S.A. 5501.
Aaron Chong (whose [blog post](http://rinsanity.weebly.com/tolkien.html)
was referenced in Möhn's [Reddit post](https://www.reddit.com/r/tolkienfans/comments/836lf1/tolkien_has_reckoned_correct_in_app_d_after_all/))
suggests that Tolkien may have forgotten that T.A. 2060 was a leap-year,
and that dropping the leap-day in that year may explain his calculations
(note that my deficit calculations also match most of Chong's figures,
except for the hypothetical Kings' Reckoning calculations and his adjustments for T.A. 2060 and T.A. 2360).
Möhn also suggested that the leap-day was dropped in T.A. 2060, in order to explain his own calculations,
in an archive of his webpage "[The Reckoning of Time](http://web.archive.org/web/20060430070040/http://rover.wiesbaden.netsurf.de/~lalaith/Tolkien/Time.html)"
(linked in [Chong's blog post](http://rinsanity.weebly.com/tolkien.html),
and suggested by Möhn as early as 2002 [according to those archives](http://web.archive.org/web/20020622042801/http://rover.wiesbaden.netsurf.de:80/~lalaith/Tolkien/Time.html)).
The *Reader's Companion* also suggests a T.A. 2060 leap-day omission as another possibility for explaining Tolkien's "8 hours deficit".
On the other hand, using a shortcut of calculating the deficit for S.A. 5501 would also explain the missing leap-day in Tolkien's calculations;
and as pointed out in [The Rules](#the-rules) section of these notes,
I think Tolkien probably did realize that T.A. 2060 was supposed to have a leap-day,
which would explain why he emended Mardil's special 2-day addition to T.A. 2059 in the revised publication.

Accounting for Mardil's extra 2 days in T.A. 2059 and the leap-day in T.A. 2060,
I calculated a *surplus* of 15h:54m:34s by the end of T.A. 2060.
Omitting the leap-day due in T.A. 2060, but keeping Mardil's extra 2 days,
results in a deficit of 8h:5m:26s by the end of that year instead;
which also works out to the same result as Jönsson's adjusted deficit as explained earlier.
If Tolkien used a shortcut of calculating the deficit for the end of S.A. 5501,
and then added Mardil's 2 days,
this would be equivalent to the deficit for the end of T.A. 2060 minus the leap-day.
If he did not emend his calculation when the year of Mardil's 2-day addition was emended for the revised publication,
then this 8h:5m:26s result would explain Tolkien's "about 8 hours deficit" for the beginning of the Stewards' Reckoning.

In Tolkien's next statement about the deficit,
"Hador to 2360 added 1 day though this deficiency had not quite reached that amount.
After that no more adjustments were made.
(In T.A. 3000 with the threat of imminent war such matters were neglected.)"
My results do show a deficit of not quite 1 day, at 18h:6m:40s by the start of T.A. 2360.
After Hador's extra day, however, I calculated another *surplus* of 1d:0h:4m:34s by the end of T.A. 2360,
which explains the subtitle of Martin's article, "The Saga of Hador The Incompetent".
As Martin points out in his article, "had he not added a day, and had Denethor II added the expected two days to 3Age 3000,
the accumulated deficit to begin the fourth millennium would have been a mere *6 minutes and 6 seconds*!
As it actually occurred, the deficit was 1 day 6 minutes and 6 seconds" by the end of T.A. 3000, and my calculations agree.
If Tolkien meant that the "deficiency had not quite reached" 1 day at the end of T.A. 2360,
then once again he may have used a shortcut of calculating the deficit for the end of S.A. 5801,
and after adding the Stewards' extra 3 days,
he would again be 1 day off from my calculation for the end of T.A. 2360
and thought that Hador only added a surplus of 4m:34s.

Tolkien's final statement about the deficit concerns the end of T.A. 3020 or early T.A. 3021,
which was 660 years after Hador's adjustment:
"By the end of the Third Age, after 660 more years, the Deficit had not yet amounted to 1 day."
If the Stewards' Reckoning had continued through T.A. 3020,
I calculate a deficit of 20h:21m:26s by the start of Stewards' T.A. 3021.
Adding to this deficit about 1/4 of the yearly deficit (approximately 1h:27m),
to get to the start of [Fourth Age 1 of the New Reckoning](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html#now-the-minutiae)
(T.A. 3021 March 25 "old style"),
would still be a deficit of less than 1 day.
It works out that the deficit for the start of S.A. 6462 would be the same as the deficit for the start of Stewards' T.A. 3021
(if Hador's 1 day addition were taken into account;
Mardil's 2 day addition does not need to be taken into account
since 2 days would have been added to S.A. 6000).
So once again Tolkien could have used the shortcut of calculating for a Second Age year equivalent,
but this time the results would be correct for the end of the Third Age.

I am confident I have accurately reproduced all of the Kings' and Stewards' Reckoning rules as presented in Appendix D in the
[Middle-earth calendar simulations](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html).
I have also been able to analyze all of Tolkien's statements about the *Deficit* with the assistance of my simulation,
and I now think it's plausible that any miscalculations Tolkien published in Appendix D can be explained
by his use of a shortcut of calculating the deficit for Second Age years instead of S.A. 3441 plus Third Age years.

So if Åke Jönsson (Bertenstam) asks "Did Tolkien Reckon Correct?", I can now answer with confidence: "Mostly."
