/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import { makeShireCalendarDates } from '../../ShireReckoning';
import { RECKONING_RULES_TRADITIONAL } from '../../GondorReckoning';
import { getRivendellNewYearDate } from '../../RivendellReckoning';
import {
    GONDOR_DAYS_PER_1000_YEARS,
    daysElapsedToSecondAgeYear,
    toDaysElapsed,
    datesMatch,
    fullYearDate
} from '../../Utils';

import '../../ui/tolkien-calendars.css';

import ShireCalendar from './ShireCalendar';
import RivendellCalendar from './RivendellCalendar';
import GondorCalendar from './GondorCalendars';

import { CalendarCellStyle, DatePicker } from '../Common';
import '../examples.css';

const SyncAges = [
    {label: "Custom Reckoning"},
    {
        label:      "Gregorian years with Second Age years",
        startDates: {
            rivendell: fullYearDate(-589,  2, 23),
            gondor:    fullYearDate(   0, 11, 23),
            shire:     fullYearDate(   0, 11, 23)
        }
    },
    {
        label:      "2020-21 Moon phases with Third Age 3018-19",
        startDates: {
            rivendell: fullYearDate(-5028,  2, 23),
            gondor:    fullYearDate(-4439, 11, 25),
            shire:     fullYearDate(-4439, 11, 25)
        }
    },
    {
        label:      "2017-18 Moon phases with Third Age 3018-19",
        startDates: {
            rivendell: fullYearDate(-5031,  2, 26),
            gondor:    fullYearDate(-4442, 11, 28),
            shire:     fullYearDate(-4442, 11, 28)
        }
    },
    {
        label:      "1941-42 Moon phases with Third Age 3018-19",
        startDates: {
            rivendell: fullYearDate(-5107,  2, 26),
            gondor:    fullYearDate(-4518, 11, 28),
            shire:     fullYearDate(-4518, 11, 28)
        }
    },
    {
        label:      "Fourth Age with Venerable Bede's Reckoning",
        startDates: {
            rivendell: fullYearDate(-11002,  2, 21),
            gondor:    fullYearDate(-10413, 11, 23),
            shire:     fullYearDate(-10413, 11, 23)
        }
    },
    {
        label:      `Fourth Age with James "the Just" Strom's Reckoning`,
        startDates: {
            rivendell: fullYearDate(-11056,  2, 22),
            gondor:    fullYearDate(-10467, 11, 24),
            shire:     fullYearDate(-10467, 11, 24)
        }
    },
    {
        label:      "Shire Reckoning with Joe Bartram's Reckoning",
        startDates: {
            rivendell: fullYearDate(-11692,  2, 28),
            gondor:    fullYearDate(-11103, 11, 28),
            shire:     fullYearDate(-11103, 11, 28)
        }
    }
];

const DatesOfInterest = [
    {label: ""},
    {
        year:    1592 + 1600 + 3441,
        allYear: true,
        label:   "S.R. 1592 | Red Book of Westmarch copied in Gondor."
    },
    {
        year:    1542 + 1600 + 3441,
        allYear: true,
        month:   2,
        day:     24,
        label:   "S.R. 1542 Coirë | Arwen Undómiel laid herself to rest upon Cerin Amroth."
    },
    {
        year:    1541 + 1600 + 3441,
        allYear: false,
        month:   2,
        day:     1,
        label:   "S.R. 1541 Rethe 1 | Passing of King Elessar."
    },
    {
        year:    1484 + 1600 + 3441,
        allYear: true,
        month:   8,
        day:     22,
        label:   "S.R. 1484 Autumn | Passing of King Éomer."
    },
    {
        year:    1482 + 1600 + 3441,
        allYear: false,
        month:   8,
        day:     22,
        label:   "S.R. 1482 Halimath 22 | Samwise departs Bag End, then leaves Middle-earth, last of the Ring-bearers."
    },
    {
        year:    3021 + 3441,
        allYear: false,
        month:   8,
        day:     29,
        label:   "III 3021 Halimath 29 | Frodo and Bilbo depart over Sea with the Three Keepers. End of Third Age."
    },
    {
        year:    3020 + 3441,
        allYear: false,
        month:   8,
        day:     22,
        label:   "III 3020 Halimath 22 | Bilbo's 130th birthday."
    },
    {
        year:    3020 + 3441,
        allYear: false,
        month:   3,
        day:     6,
        label:   "III 3020 Astron 6 | The mallorn tree planted by Samwise first flowers in the Party Field."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   10,
        day:     3,
        label:   "III 3019 Blotmath 3 | Battle of Bywater. Passing of Saruman. End of the War of the Ring."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   7,
        day:     10,
        label:   "III 3019 Wedmath 10 | Funeral of King Théoden."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   5,
        day:     "Midyear's Day",
        label:   "III 3019 Mid-year's Day | Wedding of Elessar and Arwen."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   4,
        day:     1,
        label:   "III 3019 Thrimidge 1 | Crowning of King Elessar."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   3,
        day:     8,
        label:   "III 3019 Astron 8 | The Ring-bearers are honoured on the Field of Cormallen."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   3,
        day:     6,
        label:   "III 3019 Astron 6 | Elves' New Year's Day. Meeting of Celeborn and Thranduil in Mirkwood."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   2,
        day:     25,
        label:   "III 3019 Rethe 25 | Destruction of the One Ring. Passing of Sauron."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   2,
        day:     17,
        label:   "III 3019 Rethe 17 | Battle of Dale."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   2,
        day:     15,
        label:   "III 3019 Rethe 15 | Battle of the Pelennor."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   2,
        day:     13,
        label:   "III 3019 Rethe 13 | Frodo is poisoned by Shelob. Aragorn captures the fleet at Pelargir."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   2,
        day:     10,
        label:   "III 3019 Rethe 10 | The Dawnless Day. The Muster of Rohan."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   2,
        day:     8,
        label:   "III 3019 Rethe 8 | Aragorn takes the 'Paths of the Dead'."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   2,
        day:     7,
        label:   "III 3019 Rethe 7 | Faramir takes Frodo and Sam to Henneth Annûn."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   2,
        day:     5,
        label:   "III 3019 Rethe 5 | Parley with Saruman in Orthanc. Frodo hides in sight of the Morannon."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   2,
        day:     3,
        label:   "III 3019 Rethe 3 | Théoden retreats to Helm's Deep. Battle of the Hornburg."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   2,
        day:     2,
        label:   "III 3019 Rethe 2 | Gandalf comes to Edoras and heals Théoden. The Ents march on Isengard."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   2,
        day:     1,
        label:   "III 3019 Rethe 1 | Frodo begins passage of Dead Marshes. Aragorn meets Gandalf the White."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   1,
        day:     30,
        label:   "III 3019 Solmath 30 | Entmoot begins. Éomer meets Aragorn."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   1,
        day:     29,
        label:   "III 3019 Solmath 29 | Merry and Pippin meet Treebeard."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   1,
        day:     26,
        label:   "III 3019 Solmath 26 | Breaking of the Fellowship of the Ring. Death of Boromir."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   1,
        day:     25,
        label:   "III 3019 Solmath 25 | First Battle of the Fords of Isen; Théodred son of Théoden is slain."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   1,
        day:     16,
        label:   "III 3019 Solmath 16 | Farewell to Lórien."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   1,
        day:     15,
        label:   "III 3019 Solmath 15 | Frodo is shown The Mirror of Galadriel."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   0,
        day:     25,
        label:   "III 3019 Afteryule 25 | Gandalf casts down the Balrog."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   0,
        day:     17,
        label:   "III 3019 Afteryule 17 | The Fellowship of the Ring comes to Caras Galadhon."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   0,
        day:     15,
        label:   "III 3019 Afteryule 15 | The Bridge of Khazad-Dûm, and fall of Gandalf."
    },
    {
        year:    3019 + 3441,
        allYear: false,
        month:   0,
        day:     13,
        label:   "III 3019 Afteryule 13 | The Fellowship reach the West-gate of Moria at nightfall."
    },
    {
        year:    3018 + 3441,
        allYear: false,
        month:   11,
        day:     25,
        label:   "III 3018 Foreyule 25 | The Fellowship of the Ring leaves Rivendell."
    },
    {
        year:    3018 + 3441,
        allYear: false,
        month:   9,
        day:     25,
        label:   "III 3018 Winterfilth 25 | Council of Elrond."
    },
    {
        year:    3018 + 3441,
        allYear: false,
        month:   9,
        day:     6,
        label:   "III 3018 Winterfilth 6 | The camp under Weathertop attacked. Frodo wounded by the Witch-king."
    },
    {
        year:    3018 + 3441,
        allYear: false,
        month:   8,
        day:     29,
        label:   "III 3018 Halimath 29 | The Hobbits stay at the Prancing Pony."
    },
    {
        year:    3018 + 3441,
        allYear: false,
        month:   8,
        day:     28,
        label:   "III 3018 Halimath 28 | The Hobbits captured by a Barrow-wight, and rescued by Tom Bombadil."
    },
    {
        year:    3018 + 3441,
        allYear: false,
        month:   8,
        day:     26,
        label:   "III 3018 Halimath 26 | The Old Forest. Frodo comes to Tom Bombadil."
    },
    {
        year:    3018 + 3441,
        allYear: false,
        month:   8,
        day:     23,
        label:   "III 3018 Halimath 23 | Frodo leaves Bag End. A Black Rider comes to Hobbiton at nightfall."
    },
    {
        year:    3018 + 3441,
        allYear: false,
        month:   8,
        day:     18,
        label:   "III 3018 Halimath 18 | Gandalf is rescued by Gwaihir from the top of Orthanc."
    },
    {
        year:    3018 + 3441,
        allYear: false,
        month:   6,
        day:     10,
        label:   "III 3018 Afterlithe 10 | Gandalf imprisoned in Orthanc by Saruman."
    },
    {
        year:    3018 + 3441,
        allYear: false,
        month:   5,
        day:     "Midyear's Day",
        label:   "III 3018 Mid-year's Day | Gandalf meets Radagast."
    },
    {
        year:    3018 + 3441,
        allYear: false,
        month:   5,
        day:     20,
        label:   "III 3018 Forelithe 20 | Sauron attacks Osgiliath."
    },
    {
        year:    3018 + 3441,
        allYear: false,
        month:   3,
        day:     12,
        label:   "III 3018 Astron 12 | Gandalf reaches Hobbiton."
    },
    {
        year:    3001 + 3441,
        allYear: false,
        month:   8,
        day:     22,
        label:   "III 3001 Halimath 22 | Bilbo's 111th birthday."
    },
    {
        year:    2995 + 3441,
        allYear: true,
        label:   "III 2995 | Éowyn sister of Éomer born."
    },
    {
        year:    2994 + 3441,
        allYear: false,
        month:   10,
        day:     10,
        label:   "III 2994 Blotmath 10 | Balin, Lord of Moria, is killed. Dwarf-colony destroyed soon after."
    },
    {
        year:    2991 + 3441,
        allYear: true,
        label:   "III 2991 | Éomer Éomund's son born in Rohan."
    },
    {
        year:    2990 + 3441,
        allYear: true,
        label:   "III 2990 | Peregrin Took born."
    },
    {
        year:    2984 + 3441,
        allYear: true,
        label:   "III 2984 | Denethor II becomes Steward of Gondor."
    },
    {
        year:    2983 + 3441,
        allYear: true,
        label:   "III 2983 | Faramir son of Denethor born."
    },
    {
        year:    2982 + 3441,
        allYear: true,
        label:   "III 2982 | Meriadoc Brandybuck born."
    },
    {
        year:    2980 + 3441,
        allYear: false,
        month:   3,
        day:     6,
        label:   "III 2980 Astron 6 | Samwise Gamgee born."
    },
    {
        year:    2978 + 3441,
        allYear: true,
        label:   "III 2978 | Boromir son of Denethor born."
    },
    {
        year:    2968 + 3441,
        allYear: false,
        month:   8,
        day:     22,
        label:   "III 2968 Halimath 22 | Frodo Baggins born."
    },
    {
        year:    2956 + 3441,
        allYear: true,
        label:   "III 2956 | Aragorn meets Gandalf."
    },
    {
        year:    2954 + 3441,
        allYear: true,
        label:   "III 2954 | Mount Doom (Orodruin) bursts into flame again."
    },
    {
        year:    2953 + 3441,
        allYear: true,
        label:   "III 2953 | Last meeting of the White Council."
    },
    {
        year:    2951 + 3441,
        allYear: false,
        month:   2,
        day:     2,
        label:   "III 2951 Rethe 2 | Aragorn meets Arwen Undómiel. Sauron reveals himself in Mordor in this year."
    },
    {
        year:    2948 + 3441,
        allYear: true,
        label:   "III 2948 | Théoden son of Thengel, King of Rohan, born."
    },
    {
        year:    2941 + 3441,
        allYear: true,
        month:   8,
        day:     22,
        label:   "III 2941 | The year Bilbo finds the One Ring, Bard slays Smaug, and of The Battle of Five Armies."
    },
    {
        year:    2931 + 3441,
        allYear: false,
        month:   2,
        day:     1,
        label:   "III 2931 Rethe 1 | Aragorn son of Arathorn II born."
    },
    {
        year:    2930 + 3441,
        allYear: true,
        label:   "III 2930 | Denethor II born."
    },
    {
        year:    2920 + 3441,
        allYear: true,
        label:   "III 2920 | Death of the Old Took (Bilbo's maternal grandfather)."
    },
    {
        year:    2890 + 3441,
        allYear: false,
        month:   8,
        day:     22,
        label:   "III 2890 Halimath 22 | Bilbo Baggins born."
    },
    {
        year:    2879 + 3441,
        allYear: true,
        label:   "III 2879 | Gimli Glóin's son born."
    },
    {
        year:    2799 + 3441,
        allYear: true,
        label:   "III 2799 | The Battle of Azanulbizar is fought and Azog is killed."
    },
    {
        year:    2790 + 3441,
        allYear: true,
        label:   "III 2790 | Thrór slain by Azog in Moria. Gerontius born, later known as the Old Took."
    },
    {
        year:    2770 + 3441,
        allYear: true,
        label:   "III 2770 | Smaug the Dragon descends on Erebor. Dale destroyed."
    },
    {
        year:    2758 + 3441,
        allYear: true,
        month:   10,
        day:     1,
        label:   "III 2758 | The Long Winter."
    },
    {
        year:    2747 + 3441,
        allYear: true,
        label:   "III 2747 | The Battle of the Greenfields. Bandobras 'the Bullroarer' Took invents golf."
    },
    {
        year:    2746 + 3441,
        allYear: true,
        label:   "III 2746 | Thorin Oakenshield born."
    },
    {
        year:    2685 + 3441,
        allYear: true,
        month:   5,
        day:     "Midyear's Day",
        label:   "III 2685 | Earliest likely year Shire Reform enacted."
    },
    {
        year:    2683 + 3441,
        allYear: true,
        label:   "III 2683 | Isengrim II becomes 10th Thain of the Took-line, begins excavation of the Great Smials."
    },
    {
        year:    2670 + 3441,
        allYear: true,
        label:   "III 2670 | Tobold Hornblower plants 'pipe-weed' in the Southfarthing."
    },
    {
        year:    2570 + 3441,
        allYear: true,
        label:   "III 2570 | Baldor son of Brego lost beyond Forbidden Door of the 'Paths of the Dead'."
    },
    {
        year:    2569 + 3441,
        allYear: true,
        label:   "III 2569 | Brego son of Eorl completes the Golden Hall."
    },
    {
        year:    2510 + 3441,
        allYear: true,
        label:   "III 2510 | Battle of the Field of Celebrant. Rohirrim settle Calenardhon (becomes Rohan later)."
    },
    {
        year:    2463 + 3441,
        allYear: true,
        label:   "III 2463 | Sméagol murders Déagol for the One Ring. White Council formed."
    },
    {
        year:    2460 + 3441,
        allYear: true,
        label:   "III 2460 | Sauron returns to Dol Guldur. The Watchful Peace ends."
    },
    {
        year:    2360 + 3441,
        allYear: true,
        month:   6,
        day:     "Midyear's Day",
        label:   "III 2360 | Hador the Steward adds an extra day to the calendars of the west-lands."
    },
    {
        year:    2063 + 3441,
        allYear: true,
        label:   "III 2063 | The Watchful Peace begins."
    },
    {
        year:    2060 + 3441,
        allYear: true,
        month:   6,
        day:     "Midyear's Day",
        label:   "III 2060 | First year of Stewards' Reckoning in Gondor."
    },
    {
        year:    2059 + 3441,
        allYear: true,
        month:   6,
        day:     "Midyear's Day",
        label:   "III 2059 | Last year of Kings' Reckoning in Gondor."
    },
    {
        year:    2050 + 3441,
        allYear: true,
        label:   "III 2050 | Mardil becomes the first Ruling Steward of Gondor."
    },
    {
        year:    2002 + 3441,
        allYear: true,
        label:   "III 2002 | Fall of Minas Ithil, afterwards known as Minas Morgul."
    },
    {
        year:    2000 + 3441,
        allYear: true,
        month:   6,
        day:     "Midyear's Day",
        label:   "III 2000 | Millennial Leap-year in Gondor and the Shire."
    },
    {
        year:    1999 + 3441,
        allYear: true,
        label:   "III 1999 | Erebor founded by Thráin I and the Arkenstone is discovered."
    },
    {
        year:    1980 + 3441,
        allYear: true,
        label:   "III 1980 | A Balrog appears in Moria, and slays Durin VI."
    },
    {
        year:    1975 + 3441,
        allYear: true,
        label:   "III 1975 | Last-king Arvedui drowned in Bay of Forochel. Witch-king defeated at Battle of Fornost."
    },
    {
        year:    1636 + 3441,
        allYear: true,
        label:   "III 1636 | Dark Plague"
    },
    {
        year:    1601 + 3441,
        allYear: true,
        label:   "III 1601 | Shire colonized by Marcho and Blanco."
    },
    {
        year:    1409 + 3441,
        allYear: true,
        label:   "III 1409 | The Witch-king of Angmar invades Arnor. King Arvaleg I slain. Tower of Amon Sûl destroyed."
    },
    {
        year:    1300 + 3441,
        allYear: true,
        label:   "III 1300 | Nazgûl reappear in Middle-earth and the realm of Angmar is founded by the Witch-King."
    },
    {
        year:    1000 + 3441,
        allYear: true,
        month:   6,
        day:     "Midyear's Day",
        label:   "III 1000 | The Istari arrive to Middle-earth around this time. Millennial Leap-year in Gondor."
    },
    {
        year:    241 + 3441,
        allYear: true,
        label:   "III 241 | Arwen Undómiel born."
    },
    {
        year:    109 + 3441,
        allYear: true,
        label:   "III 109 | Elrond weds Celebrían, daughter of Celeborn."
    },
    {
        year:    2 + 3441,
        allYear: true,
        label:   "III 2 | Death of Isildur in the Battle of the Gladden Fields. The One Ring is lost in the river."
    },
    {
        year:    3441,
        allYear: true,
        label:   "II 3441 | Defeat of Sauron and death of Elendil and Gil-galad. End of Second Age."
    },
    {
        year:    3440,
        allYear: true,
        label:   "II 3440 | Anárion slain."
    },
    {
        year:    3430,
        allYear: true,
        label:   "II 3430 | The Last Alliance is formed."
    },
    {
        year:    3320,
        allYear: true,
        label:   "II 3320 | Elendil and his sons, Isildur and Anárion, found the Realms in Exile: Arnor and Gondor."
    },
    {
        year:    3319,
        allYear: true,
        label:   "II 3319 | Downfall of Númenor. World is made round. Elendil and his sons escape."
    },
    {
        year:    3000,
        allYear: true,
        month:   6,
        day:     "Midyear's Day",
        label:   "II 3000 | Millennial Leap-year in Númenor."
    },
    {
        year:    2000,
        allYear: true,
        month:   6,
        day:     "Midyear's Day",
        label:   "II 2000 | Millennial Leap-year. Sauron has extended his power and the shadow has fallen on Númenor."
    },
    {
        year:    1697,
        allYear: true,
        label:   "II 1697 | Eregion destroyed. The gates of Moria are shut. Elrond founds Rivendell."
    },
    {
        year:    1693,
        allYear: true,
        label:   "II 1693 | The Three Rings are hidden and the War of the Elves and Sauron begins."
    },
    {
        year:    1600,
        allYear: true,
        label:   "II 1600 | Sauron forges The One Ring and completes Barad-dûr."
    },
    {
        year:    1590,
        allYear: true,
        label:   "II 1590 | The Three Rings are completed in Eregion."
    },
    {
        year:    1000,
        allYear: true,
        month:   6,
        day:     "Midyear's Day",
        label:   "II 1000 | Sauron begins the building of Barad-dûr. Millennial Leap-year in Númenor."
    },
    {
        year:    750,
        allYear: true,
        label:   "II 750 | Eregion founded by the Noldor."
    },
    {
        year:    500,
        allYear: true,
        label:   "II 500 | Sauron arises again in Middle-earth."
    },
    {
        year:    40,
        allYear: true,
        label:   "II 40 | Many Dwarves leaving their old cities Ered Luin migrate to Moria."
    },
    {
        year:    32,
        allYear: true,
        label:   "II 32 | Elros is crowned first King of Númenor."
    },
    {
        year:    1,
        allYear: true,
        label:   "II 1 | Foundation of the Grey Havens, and of Lindon."
    },
    {
        year:    -589,
        allYear: false, // don't set a Shire date, so that Eldar New Year's Day is always selected.
        label:   "Iys 1 | The Sun first rises over Middle-earth. Awakening of Men in Hildórien."
    }
];

const eventOfInterestToDate = (eventOfInterest, shireStartDate, rivendellStartDate) => {
    // Find a date somewhere in the middle of the current Shire calendar year.
    let gregorian = new Date(shireStartDate);
    let daysElapsed = Math.floor((eventOfInterest.year - 1) * GONDOR_DAYS_PER_1000_YEARS / 1000) + 183;
    gregorian.setDate(gregorian.getDate() + daysElapsed);

    if (eventOfInterest.day) {
        // Find the Gregorian date for the specific Shire Reckoning date of the event.
        let calendar = makeShireCalendarDates(gregorian, shireStartDate, RECKONING_RULES_TRADITIONAL);
        let shireDate = calendar.dates.find((date) => (
            date.month === eventOfInterest.month && date.day === eventOfInterest.day
        ));

        gregorian = shireDate.gregorian;
    } else {
        // Find the Elves' New Year's Day for the current Shire calendar year.
        gregorian = getRivendellNewYearDate(gregorian, rivendellStartDate);
    }

    return gregorian;
};

const adjustForSelectedEvent = (currentDate, selectedEvent, shireStartDate, rivendellStartDate) => {
    if (selectedEvent < 1) {
        return currentDate;
    }

    return eventOfInterestToDate(DatesOfInterest[selectedEvent], shireStartDate, rivendellStartDate);
};

class SimulatedTolkienCalendars extends Component {

    constructor(props) {
        super(props);

        let calendarRules = props.calendarRules || 1; // Sync Gregorian years with Second Age years
        let selectedEvent = props.selectedEvent >= 0 ? props.selectedEvent : 14; // III 3019 Astron 6 | Elves' New Year
        let currentDate = props.date || new Date();
        let startDates = SyncAges[calendarRules].startDates;

        currentDate = adjustForSelectedEvent(currentDate, selectedEvent, startDates.shire, startDates.rivendell);

        this.state = {
            date:               currentDate,
            calendarRules:      calendarRules,
            rivendellStartDate: startDates.rivendell,
            gondorStartDate:    startDates.gondor,
            shireStartDate:     startDates.shire,
            selectedEvent:      selectedEvent
        };

        this.onCalendarRulesChange      = this.onCalendarRulesChange.bind(this);
        this.onDatesOfInterestChange    = this.onDatesOfInterestChange.bind(this);
        this.onDateChanged              = this.onDateChanged.bind(this);
        this.onShireStartDateChange     = this.onShireStartDateChange.bind(this);
        this.onGondorStartDateChange    = this.onGondorStartDateChange.bind(this);
        this.onRivendellStartDateChange = this.onRivendellStartDateChange.bind(this);
    }

    onCalendarRulesChange(event) {
        let calendarRules      = event.target.value;
        let rivendellStartDate = this.state.rivendellStartDate;
        let gondorStartDate    = this.state.gondorStartDate;
        let shireStartDate     = this.state.shireStartDate;
        let currentDate        = this.state.date;
        let selectedEvent      = this.state.selectedEvent;

        if (calendarRules > 0) {
            let startDates = SyncAges[calendarRules].startDates;

            rivendellStartDate = startDates.rivendell;
            gondorStartDate    = startDates.gondor;
            shireStartDate     = startDates.shire;
        }

        currentDate = adjustForSelectedEvent(currentDate, selectedEvent, shireStartDate, rivendellStartDate);

        this.setState({
            date:               currentDate,
            calendarRules:      calendarRules,
            selectedEvent:      selectedEvent,
            rivendellStartDate: rivendellStartDate,
            gondorStartDate:    gondorStartDate,
            shireStartDate:     shireStartDate
        });
    }

    onDatesOfInterestChange(event) {
        let selectedEvent      = event.target.value;
        let currentDate        = this.state.date;
        let shireStartDate     = this.state.shireStartDate;
        let rivendellStartDate = this.state.rivendellStartDate;

        currentDate = adjustForSelectedEvent(currentDate, selectedEvent, shireStartDate, rivendellStartDate);

        this.setState({
            date: currentDate,
            selectedEvent: selectedEvent
        });
    }

    onDateChanged(currentDate) {
        let shireStartDate     = this.state.shireStartDate;
        let rivendellStartDate = this.state.rivendellStartDate;

        let selectedEvent = DatesOfInterest.findIndex((event) => {
            if (event.allYear) {
                return (
                    event.year === daysElapsedToSecondAgeYear(toDaysElapsed(shireStartDate, currentDate)).year
                );
            }

            return (
                event.year && datesMatch(currentDate, eventOfInterestToDate(event, shireStartDate, rivendellStartDate))
            );
        });

        this.setState({
            date: currentDate,
            selectedEvent: selectedEvent > 0 ? selectedEvent : 0
        });
    }

    onShireStartDateChange(shireStartDate) {
        let gondorStartDate    = new Date(shireStartDate);
        let rivendellStartDate = this.state.rivendellStartDate;
        let selectedEvent      = this.state.selectedEvent;
        let currentDate        = this.state.date;

        currentDate = adjustForSelectedEvent(currentDate, selectedEvent, shireStartDate, rivendellStartDate);

        this.setState({
            calendarRules:   0,
            date:            currentDate,
            gondorStartDate: gondorStartDate,
            shireStartDate:  shireStartDate
        });
    }

    onGondorStartDateChange(gondorStartDate) {
        let shireStartDate     = new Date(gondorStartDate);
        let rivendellStartDate = this.state.rivendellStartDate;
        let selectedEvent      = this.state.selectedEvent;
        let currentDate        = this.state.date;

        currentDate = adjustForSelectedEvent(currentDate, selectedEvent, shireStartDate, rivendellStartDate);

        this.setState({
            calendarRules:   0,
            date:            currentDate,
            gondorStartDate: gondorStartDate,
            shireStartDate:  shireStartDate
        });
    }

    onRivendellStartDateChange(rivendellStartDate) {
        let shireStartDate = this.state.shireStartDate;
        let selectedEvent  = this.state.selectedEvent;
        let currentDate    = this.state.date;

        currentDate = adjustForSelectedEvent(currentDate, selectedEvent, shireStartDate, rivendellStartDate);

        this.setState({
            calendarRules:      0,
            date:               currentDate,
            rivendellStartDate: rivendellStartDate
        });
    }

    render() {
        let currentDate        = this.state.date;
        let shireStartDate     = this.state.shireStartDate;
        let gondorStartDate    = this.state.gondorStartDate;
        let rivendellStartDate = this.state.rivendellStartDate;
        let selectedEvent      = this.state.selectedEvent;

        let eventOpts = DatesOfInterest.map((event, i) => (
            <option key={i} value={i} >
                {event.label}
            </option>
        ));

        if (selectedEvent < 1) {
            let previousEvent = DatesOfInterest.findIndex((event) => {
                if (event.allYear) {
                    return (
                        event.year < daysElapsedToSecondAgeYear(toDaysElapsed(shireStartDate, currentDate)).year
                    );
                }

                return (
                    event.year && eventOfInterestToDate(event, shireStartDate, rivendellStartDate) < currentDate
                );
            });

            if (previousEvent > 0) {
                let blankEvent = eventOpts.shift();
                eventOpts.splice(previousEvent - 1, 0, blankEvent);
            }
        }

        return (
            <table className="simulated-calendar">
                <tbody>
                <tr>
                    <th colSpan='3' className="simulated-date-controls" >
                        Synchronize &nbsp;
                        <select value={this.state.calendarRules}
                                onChange={this.onCalendarRulesChange} >
                            {SyncAges.map(function (sync, i) {
                                return (
                                    <option key={i} value={i}>
                                        {sync.label}
                                    </option>
                                );
                            })}
                        </select>
                    </th>
                </tr>
                <tr>
                    <th colSpan='3' className="simulated-date-controls" >
                        Dates of Interest:&nbsp;
                        <select value={selectedEvent}
                                onChange={this.onDatesOfInterestChange} >
                            {eventOpts}
                        </select>
                    </th>
                </tr>
                <tr>
                    <th colSpan='3' className="simulated-date-controls" >
                        <DatePicker date={currentDate} onDateChanged={this.onDateChanged} className="simulated-gregorian-date-picker" />
                    </th>
                </tr>
                <tr>
                    <td style={CalendarCellStyle}>
                        <ShireCalendar calendarRules={GondorCalendar.RECKONING_RULES_TRADITIONAL}
                                       startDate={shireStartDate}
                                       onCalendarStartChange={this.onShireStartDateChange}
                                       date={currentDate}
                                       className="shire-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <GondorCalendar calendarRules={GondorCalendar.RECKONING_RULES_TRADITIONAL}
                                        startDate={gondorStartDate}
                                        onCalendarStartChange={this.onGondorStartDateChange}
                                        date={currentDate}
                                        className="shire-calendar gondor-calendar" />
                    </td>
                    <td style={CalendarCellStyle}>
                        <RivendellCalendar calendarRules={RivendellCalendar.TRADITIONAL_RULES}
                                           startDate={rivendellStartDate}
                                           onCalendarStartChange={this.onRivendellStartDateChange}
                                           date={currentDate}
                                           className="shire-calendar rivendell-calendar" />
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default SimulatedTolkienCalendars;
