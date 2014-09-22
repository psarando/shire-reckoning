(use '[leiningen.exec :only (deps)]
     '[leiningen.core.project :only (defproject)])
(deps '[[org.clojure/clojure "1.6.0"]
        [org.clojure/tools.cli "0.3.1"]
        [joda-time/joda-time "2.4"]])
(require '[clojure.tools.cli :as cli])
(import '[org.joda.time LocalDate])

(def weekdays ["Sterday" "Sunday" "Monday" "Trewsday" "Hevensday" "Mersday" "Highday"])

(def weekday-descriptions
 ["Sterday: Stars of Varda Day (sterrendei)."
  "Sunday: Sun Day (sunnendei)."
  "Monday: Moon Day (monendei)."
  "Trewsday: Two Trees of Valinor Day (trewesdei)."
  "Hevensday: Heavens Day (hevensdei)."
  "Mersday: Sea Day (meresdei)."
  "Highday: Valar Day (hihdei)."])

(def months ["Afteryule"
             "Solmath"
             "Rethe"
             "Astron"
             "Thrimidge"
             "Forelithe"
             "Afterlithe"
             "Wedmath"
             "Halimath"
             "Winterfilth"
             "Blotmath"
             "Foreyule"])

(def month-descriptions
 ["Afteryule:\\nThe month after the winter solstice (Midwinter) feast of Gēola or Giúl=Yule."
  "Solmath:\\nSol Month. The return of the sol=sun.\\nMuddy Month."
  "Rethe:\\nMonth of the Goddess Hrēþ or Hretha.\\nMonth of Wildness."
  "Astron:\\nSpring month.\\nNamed after the Goddess Ēostre."
  "Thrimidge:\\nThe month of plenty\\, when cows were given thri+milching=three milkings daily."
  "Forelithe:\\nThe month before the summer solstice (Midsummer)\\, when Litha=gentle weather encouraged voyages.\\nCalm or Navigable Month."
  "Afterlithe:\\nThe month after the summer solstice (Midsummer).\\nMeadow Month."
  "Wedmath:\\nWhen fields were beset by weod=weeds.\\nPlant Month."
  "Halimath:\\nThe haleg=holy month of sacred rites.\\nHarvest Month."
  "Winterfilth:\\nThe fylleth=filling of winter's first full moon\\, according to Bede\\; Tolkien instead suggests the \"fall\" or arrival of winter\\, or the \"fall\" of the leaves.\\nWine Month."
  "Blotmath:\\nThe month of blod=blood.\\nMonth of Sacrifice or Slaughter."
  "Foreyule:\\nThe month before the solstice (Midwinter) feast of Gēola or Giúl=Yule."])

(defn format-date
 [date]
 (.toString date "yyyyMMdd"))

(defn format-shire-date
 [month day weekday]
 (str month " " day (if weekday (str "\\, " weekday) "")))

(defn format-event-summary
 [month weekday]
 (str (get month-descriptions month)
      "\\n\\n"
      (weekday-descriptions (mod weekday 7))))

(defn print-cal-header
 []
 (println "BEGIN:VCALENDAR")
 (println "PRODID:-//Paul Sarando//Shire Reckoning Calendar 1.0//EN")
 (println "VERSION:2.0")
 (println "CALSCALE:GREGORIAN")
 (println "METHOD:PUBLISH")
 (println "X-WR-CALNAME:Shire Reckoning")
 (println "X-WR-CALDESC:A calendar of J.R.R. Tolkien's 'Shire Reckoning' dates corresponding to our
  Gregorian dates\\, according to http://shire-reckoning.com/calendar.html\\, which
  suggests that we \"anchor the Shire calendar on the solstice of one particular
  year\\, then add the Overlithe every four years thereafter. This [...] could
  maintain a stable relationship between Shire and modern dates if Shire
  leap-years were coordinated with those of our own calendar. [...] Under this
  system we always celebrate the Shire New Year upon our own 21 December.\"\\n\\n
 I chose to start this calendar on the 21st of December 1931\\, which places the
  majority of the Shire Reckoning dates in 1932\\, the year 'The Hobbit' was first
  completed\\, and also happens to be a leap-year\\, a good starting point for marking
  Overlithe leap-days. Additional month descriptions taken from
  http://en.wikipedia.org/wiki/Germanic_calendar.\\n\\n
 Note: This calendar will erroneously mark June 22 as Overlithe days on
  centennial years which are not leap-years."))

(defn print-cal-event
 [date summary description rule-extra]
 (println "BEGIN:VEVENT")
 (println (str "DTSTART;VALUE=DATE:" (format-date date)))
 (println (str "DTEND;VALUE=DATE:" (format-date (.plusDays date 1))))
 (println (str "RRULE:FREQ=YEARLY" rule-extra))
 (println "DTSTAMP:20120922T115737Z")
 (println (str "DESCRIPTION:" description))
 (println "LOCATION:")
 (println "SEQUENCE:0")
 (println "STATUS:CONFIRMED")
 (println (str "SUMMARY:" summary))
 (println "TRANSP:OPAQUE")
 (println "END:VEVENT"))

(defn print-cal-footer
 []
 (println "END:VCALENDAR"))

(defn print-cal-dates
 [start-date start-year-day end-year-day start-month start-day start-weekday rule-extra]
 (loop [next-day start-date
        day-of-year start-year-day
        month start-month
        day start-day
        weekday start-weekday]
  (when (<= day-of-year end-year-day)
   (print-cal-event next-day
                    (format-shire-date (get months month) day (get weekdays (mod weekday 7)))
                    (format-event-summary month weekday)
                    (if rule-extra (str rule-extra day-of-year) ""))
   (recur (.plusDays next-day 1)
          (inc day-of-year)
          (if (= day 30) (inc month) month)
          (if (= day 30) 1 (inc day))
          (inc weekday)))))

(defn main-func
 []
 (print-cal-header)
 (print-cal-event (LocalDate. 1931 12 21)
                  (format-shire-date "Yule" 2 "Sterday")
                  "Midwinter: Shire New Year!"
                  "")
 (print-cal-dates (LocalDate. 1931 12 22) -9 59 0 1 1 nil)
 (print-cal-dates (LocalDate. 1932 2 29) 60 170 2 10 0 ";INTERVAL=1;BYYEARDAY=")
 (print-cal-event (LocalDate. 1932 6 19)
                  (format-shire-date "Lithe" 1 "Highday")
                  "Midsummer's Eve!"
                  ";INTERVAL=1;BYYEARDAY=171")
 (print-cal-event (LocalDate. 1932 6 20)
                  (format-shire-date "Mid-Year's" "Day" nil)
                  "Midsummer's Day!"
                  ";INTERVAL=1;BYYEARDAY=172")
 (print-cal-event (LocalDate. 1932 6 21)
                  (format-shire-date "Overlithe" "" nil)
                  "Shire Leap Day."
                  ";INTERVAL=4;BYYEARDAY=173")
 (print-cal-event (LocalDate. 1932 6 22)
                  (format-shire-date "Lithe" 2 "Sterday")
                  "Day after Midsummer."
                  "")
 (print-cal-dates (LocalDate. 1932 6 23) 175 354 6 1 1 nil)
 (print-cal-event (LocalDate. 1932 12 20)
                  (format-shire-date "Yule" 1 "Highday")
                  "Shire New Year's Eve!"
                  "")
 (print-cal-footer))

(main-func)

