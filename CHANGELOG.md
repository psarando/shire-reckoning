## 4.0.0 (2019-09-22)

* **BREAKING:** Upgraded React dependency to version `16.8.6`
  (and `react-scripts` dev dependency to version `3.0.0`).
* Converted all examples to [Storybook](https://storybook.js.org) stories!
* Added [emojis](https://psarando.github.io/shire-reckoning/#shire-weekdays)
  to all weekday and month reckoning functions and calendar UIs!
* Changed the English translation of *Cermië* to "Reaping Month".
* Changed the English translation of *Yavannië* to "Fruit Giving".
* Added [Sindarin translations](https://psarando.github.io/shire-reckoning/#gondor-holidays)
  for Elvish holiday names.
* Updated descriptions of various [Shire Calendar months](https://psarando.github.io/shire-reckoning/#shire-months).

## 3.2.0 (2018-03-25)

* The UI calendars will now allow each date to set its own `className`,
  but will continue to use the month's `className` if the date's `className` is `undefined`.
  This allows the calendar dates passed to each UI calendar to override any individual date's style.
  See the [Middle-earth calendar simulation source](https://github.com/psarando/shire-reckoning/blob/3.2.0/src/examples/simulation/ShireCalendar.js#L145-L159)
  for an example of how to override a date cell's `className` (to override or unset its background color).
* The Shire Calendar UI will now mark Astron 6 and Blotmath 2 as holidays by default.
* The New Reckoning Calendar UI will now mark Yavannië 30 as a holiday by default.

## 3.1.3 (2017-10-22)

* Shire Reckoning with "traditional" rules now uses
  [Shire-reform](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html#shire-reform)
  starting from T.A. 2703.

## 3.1.0 (2017-09-22)

* Bumped React dependency version to `15.6.2`.
* Replaced the `shire-icalendar.clj` script with a
  [JSX example](https://psarando.github.io/shire-reckoning/examples/shire-icalendar.html)
  that uses the `ShireReckoning` library exports.
  So now this project is all JS.

## 3.0.0 (2017-09-22)

* **BREAKING:** The calendar controls (for picking months, languages, etc.) are no longer exported by this library,
  but their sources are still available under the examples directory.
* The `ShireReckoning` now exports `REGION_NAMES_TOLKIEN`, `REGION_NAMES_SHIRE`, and `REGION_NAMES_BREE` constants.
* Added "Vertical Month" layout support to the `RivendellCalendar`!

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
  (see [Synchronize settings: Moon phases notes](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html#synchronize-settings)).
* [examples/simulated.html](https://psarando.github.io/shire-reckoning/examples/simulated.html)
  now synchronizes with 2017-18 moon phases by default.

## 2.0.0 (2017-03-25)

* Calendars can now start reckoning from any date in any year!
* Added "traditional" Gondor Reckoning rules!
* Added "traditional" Shire Reckoning rules!
* Added [Middle-earth calendar simulations](https://psarando.github.io/shire-reckoning/Middle-earth-simulation.html)!
* See [Shire Calendar examples](https://psarando.github.io/shire-reckoning/examples/shire-calendars.html)
  and [Gondor Calendar examples](https://psarando.github.io/shire-reckoning/examples/gondor-calendars.html)
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
