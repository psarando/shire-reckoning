## 2.0.4 (2017-06-24)

* Fixed calculations for dates observing Daylight Savings Time.
    * Starting with v2.0.0,
      calendars were off by 1 day when adjusting `Dates of Interest` or the current Gregorian date
      if the device viewing the calendars was in a region where DST was in effect.

## 2.0.3 (2017-06-21)

* Fixed UI calendars to no longer alter dates passed to them through props.

## 2.0.2 (2017-03-30)

* Simulation example `Dates of Interest` auto-select bug fix.

## 2.0.1 (2017-03-30)

* Updated 2017-18 moon phase simulated calendar start dates
  (see [Synchronize settings: Moon phases notes](http://psarando.github.io/shire-reckoning/Middle-earth-simulation.html#synchronize-settings)).
* [examples/simulated.html](http://psarando.github.io/shire-reckoning/examples/simulated.html)
  now synchronizes with 2017-18 moon phases by default.

## 2.0.0 (2017-03-25)

* Calendars can now start reckoning from any date in any year!
* Added "traditional" Gondor Reckoning rules!
* Added "traditional" Shire Reckoning rules!
* Added [Middle-earth calendar simulations](http://psarando.github.io/shire-reckoning/Middle-earth-simulation.html)!
* See [Shire Calendar examples](http://psarando.github.io/shire-reckoning/examples/shire-calendars.html)
  and [Gondor Calendar examples](http://psarando.github.io/shire-reckoning/examples/gondor-calendars.html)
  for usage examples of different start dates and the "traditional" rules.


* **BREAKING:** The following have been removed from `TolkienCalendars`:
    * `makeShireCalendarDates`
    * `ShireWeekdays`
    * `ShireMonths`
    * `getShireNewYearDate`
    * `makeRivendellCalendarDates`
    * `TRADITIONAL_RULES`
    * `REFORMED_RULES`
    * `RivendellWeekdays`
    * `RivendellMonths`
    * `getRivendellNewYearDay`
    * `getRivendellNewYearDate`
    * `isRivendellLeapYear`
    * `makeNumenorCalendarDates`
    * `RECKONING_KINGS`
    * `RECKONING_STEWARDS`
    * `RECKONING_NEW`
    * `NumenorWeekdays`
    * `NumenorMonths`
    * `convertGondorianMonthIndex`
    * `convertGregorianToGondorianWeekday`
    * `convertMonthIndex`
    * `convertGregorianWeekday`
    * `getNumenorNewYearDate`
    * `getNewReckoningNewYearDate`
    * `NumenorCalendar`

## 1.1.0 (2017-03-25)

* **Deprecation Upgrade Guide:**
    1. Handle all `Date` vs. `number` warnings first.
        * Most calendar library functions now accept a `Date` instead of a `number`,
          except `isRivendellLeapYear` is now the opposite (it accepts a `number` instead of a `Date`).
    2. Handle all `make*CalendarDates` warnings for `date` vs. `day` next.
    3. Calendar library functions are now bundled under appropriate namespaces,
       and functions named with `Numenor` have been renamed to use `Gondor` instead.
       Migrate any library function calls to use the new namespace
       after handling all `Date` vs. `number` and `date` vs. `day` warnings first.
        * For example, first migrate `TolkienCalendars.isRivendellLeapYear(today)` to
          `TolkienCalendars.isRivendellLeapYear(today.getFullYear())`, then migrate to
          `TolkienCalendars.RivendellReckoning.isRivendellLeapYear(today.getFullYear())`.
          Do not attempt to call `TolkienCalendars.RivendellReckoning.isRivendellLeapYear(today)`,
          which will break and not give a deprecation warning.

* Added the following namespaces to `TolkienCalendars`:
    * `ShireReckoning`
    * `RivendellReckoning`
    * `GondorReckoning`

* Added deprecation warnings for the following in `TolkienCalendars`:
    * `makeShireCalendarDates`
    * `ShireWeekdays`
    * `ShireMonths`
    * `getShireNewYearDate`
    * `makeRivendellCalendarDates`
    * `TRADITIONAL_RULES`
    * `REFORMED_RULES`
    * `RivendellWeekdays`
    * `RivendellMonths`
    * `getRivendellNewYearDay`
    * `getRivendellNewYearDate`
    * `isRivendellLeapYear`
    * `makeNumenorCalendarDates`
    * `RECKONING_KINGS`
    * `RECKONING_STEWARDS`
    * `RECKONING_NEW`
    * `NumenorWeekdays`
    * `NumenorMonths`
    * `convertGondorianMonthIndex`
    * `convertGregorianToGondorianWeekday`
    * `convertMonthIndex`
    * `convertGregorianWeekday`
    * `getNumenorNewYearDate`
    * `getNewReckoningNewYearDate`
    * `NumenorCalendar`

* `GondorCalendar` now defaults to Stewards' Reckoning (the calendar is use during War of the Ring).
* Calendars now support setting their own default captions when their `caption` prop is set to `true`
  (setting a custom string is still supported as well).
* Calendars now check almost all props for changes in `componentWillReceiveProps`
  (`calendarControls` still only checked at construction).

## 1.0.1 (2016-12-23)

* Added the following functions to `TolkienCalendars`:
    * `convertGondorianMonthIndex`
    * `convertGregorianToGondorianWeekday`

* Added deprecation warnings for the following functions in `TolkienCalendars`:
    * `convertMonthIndex`
    * `convertGregorianWeekday`

## 1.0.0 (2016-12-21)

* Initial project update as a React 15.4.1 library module!
