/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import { makeShireCalendarDates } from "../../ShireReckoning";
import { RECKONING_RULES_TRADITIONAL } from "../../GondorReckoning";
import { getRivendellNewYearDate } from "../../RivendellReckoning";
import {
    GONDOR_DAYS_PER_1000_YEARS,
    toDaysElapsed,
    daysElapsedToSecondAgeYear,
    datesMatch,
    fullYearDate,
} from "../../Utils";

/**
 * The Middle-earth New Year Dates, relative to the Second Age.
 */
interface StartDates {
    // The Gregorian Date of the first Rivendell New Year Date.
    rivendell: Date;
    // The Gregorian Date of the first Númenor New Year Date, relative to the Second Age.
    gondor: Date;
    // The Gregorian Date of the first Shire New Year Date, relative to the Second Age.
    shire: Date;
}

interface SecondAgeSyncScheme {
    // Display label for this synchronization scheme.
    label: string;
    startDates: StartDates;
}

/**
 * Calendar simulation synchronization schemes.
 * @constant
 */
const SyncAges: SecondAgeSyncScheme[] = [
    {
        label: "Gregorian years with Second Age years",
        startDates: {
            rivendell: fullYearDate(-589, 2, 23),
            gondor: fullYearDate(0, 11, 23),
            shire: fullYearDate(0, 11, 23),
        },
    },
    {
        label: "2025-26 Southern Hemisphere moon phases with Third Age 3018-19",
        startDates: {
            rivendell: fullYearDate(-5023, 8, 22),
            gondor: fullYearDate(-4433, 5, 26),
            shire: fullYearDate(-4433, 5, 26),
        },
    },
    {
        label: "2020-21 Moon phases with Third Age 3018-19",
        startDates: {
            rivendell: fullYearDate(-5028, 2, 23),
            gondor: fullYearDate(-4439, 11, 25),
            shire: fullYearDate(-4439, 11, 25),
        },
    },
    {
        label: "2017-18 Moon phases with Third Age 3018-19",
        startDates: {
            rivendell: fullYearDate(-5031, 2, 26),
            gondor: fullYearDate(-4442, 11, 28),
            shire: fullYearDate(-4442, 11, 28),
        },
    },
    {
        label: "1941-42 Moon phases with Third Age 3018-19",
        startDates: {
            rivendell: fullYearDate(-5107, 2, 26),
            gondor: fullYearDate(-4518, 11, 28),
            shire: fullYearDate(-4518, 11, 28),
        },
    },
    {
        label: "Gregorian years with Years of the Sun",
        startDates: {
            rivendell: fullYearDate(-10799, 2, 21),
            gondor: fullYearDate(-10210, 11, 22),
            shire: fullYearDate(-10210, 11, 22),
        },
    },
    {
        label: "Fourth Age with Venerable Bede's Reckoning",
        startDates: {
            rivendell: fullYearDate(-11002, 2, 21),
            gondor: fullYearDate(-10413, 11, 23),
            shire: fullYearDate(-10413, 11, 23),
        },
    },
    {
        label: `Fourth Age with James "the Just" Strom's Reckoning`,
        startDates: {
            rivendell: fullYearDate(-11056, 2, 22),
            gondor: fullYearDate(-10467, 11, 24),
            shire: fullYearDate(-10467, 11, 24),
        },
    },
    {
        label: "Shire Reckoning with Joe Bartram's Reckoning",
        startDates: {
            rivendell: fullYearDate(-11692, 2, 28),
            gondor: fullYearDate(-11103, 11, 28),
            shire: fullYearDate(-11103, 11, 28),
        },
    },
    {
        label: "Fourth Age with my NoME-adjusted Stellarium Reckoning",
        startDates: {
            rivendell: fullYearDate(-14244, 2, 23),
            gondor: fullYearDate(-13655, 11, 25),
            shire: fullYearDate(-13655, 11, 25),
        },
    },
];

interface DateOfInterest {
    // Display label for this Middle-earth event.
    label: string;
    // Middle-earth display date for this event.
    displayDate: string;
    // True if this event should display in the simulation for the entire S.R. year.
    allYear: boolean;
    // Second Age year of this event.
    year: number;
    // S.R. month of this event.
    month?: number;
    // S.R. day of this event.
    day?: string | number;
}

/**
 * Calendar simulation Dates of Interest list of Fourth Age events.
 * @constant
 */
const DatesOfInterestFourthAge: DateOfInterest[] = [
    {
        year: 1592 + 1600 + 3441,
        allYear: true,
        displayDate: "S.R. 1592",
        label: "Red Book of Westmarch copied in Gondor.",
    },
    {
        year: 1542 + 1600 + 3441,
        allYear: true,
        month: 2,
        day: 24,
        displayDate: "S.R. 1542 Coirë",
        label: "Arwen Undómiel laid herself to rest upon Cerin Amroth.",
    },
    {
        year: 1541 + 1600 + 3441,
        allYear: false,
        month: 2,
        day: 1,
        displayDate: "S.R. 1541 Rethe 1",
        label: "Passing of King Elessar.",
    },
    {
        year: 1484 + 1600 + 3441,
        allYear: true,
        month: 8,
        day: 22,
        displayDate: "S.R. 1484 Autumn",
        label: "Passing of King Éomer.",
    },
    {
        year: 1482 + 1600 + 3441,
        allYear: false,
        month: 8,
        day: 22,
        displayDate: "S.R. 1482 Halimath 22",
        label: "Samwise departs Bag End, then leaves Middle-earth, last of the Ring-bearers.",
    },
];

/**
 * Calendar simulation Dates of Interest list of events that took place during the main story of The Lord of the Rings.
 * @constant
 */
const DatesOfInterestThirdAgeLotR: DateOfInterest[] = [
    {
        year: 3021 + 3441,
        allYear: false,
        month: 8,
        day: 29,
        displayDate: "III 3021 Halimath 29",
        label: "Frodo and Bilbo depart over Sea with the Three Keepers. End of Third Age.",
    },
    {
        year: 3020 + 3441,
        allYear: false,
        month: 8,
        day: 22,
        displayDate: "III 3020 Halimath 22",
        label: "Bilbo's 130th birthday.",
    },
    {
        year: 3020 + 3441,
        allYear: false,
        month: 3,
        day: 6,
        displayDate: "III 3020 Astron 6",
        label: "The mallorn tree planted by Samwise first flowers in the Party Field.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 10,
        day: 3,
        displayDate: "III 3019 Blotmath 3",
        label: "Battle of Bywater. Passing of Saruman. End of the War of the Ring.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 7,
        day: 10,
        displayDate: "III 3019 Wedmath 10",
        label: "Funeral of King Théoden.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 5,
        day: "Midyear's Day",
        displayDate: "III 3019 Mid-year's Day",
        label: "Wedding of Elessar and Arwen.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 4,
        day: 1,
        displayDate: "III 3019 Thrimidge 1",
        label: "Crowning of King Elessar.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 3,
        day: 8,
        displayDate: "III 3019 Astron 8",
        label: "The Ring-bearers are honoured on the Field of Cormallen.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 3,
        day: 6,
        displayDate: "III 3019 Astron 6",
        label: "Elves' New Year's Day. Meeting of Celeborn and Thranduil in Mirkwood.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 2,
        day: 25,
        displayDate: "III 3019 Rethe 25",
        label: "Destruction of the One Ring. Passing of Sauron.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 2,
        day: 17,
        displayDate: "III 3019 Rethe 17",
        label: "Battle of Dale.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 2,
        day: 15,
        displayDate: "III 3019 Rethe 15",
        label: "Battle of the Pelennor.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 2,
        day: 13,
        displayDate: "III 3019 Rethe 13",
        label: "Frodo is poisoned by Shelob. Aragorn captures the fleet at Pelargir.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 2,
        day: 10,
        displayDate: "III 3019 Rethe 10",
        label: "The Dawnless Day. The Muster of Rohan.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 2,
        day: 8,
        displayDate: "III 3019 Rethe 8",
        label: "Aragorn takes the 'Paths of the Dead'.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 2,
        day: 7,
        displayDate: "III 3019 Rethe 7",
        label: "Faramir takes Frodo and Sam to Henneth Annûn.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 2,
        day: 5,
        displayDate: "III 3019 Rethe 5",
        label: "Parley with Saruman in Orthanc. Frodo hides in sight of the Morannon.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 2,
        day: 3,
        displayDate: "III 3019 Rethe 3",
        label: "Théoden retreats to Helm's Deep. Battle of the Hornburg.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 2,
        day: 2,
        displayDate: "III 3019 Rethe 2",
        label: "Gandalf comes to Edoras and heals Théoden. The Ents march on Isengard.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 2,
        day: 1,
        displayDate: "III 3019 Rethe 1",
        label: "Frodo begins passage of Dead Marshes. Aragorn meets Gandalf the White.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 1,
        day: 30,
        displayDate: "III 3019 Solmath 30",
        label: "Entmoot begins. Éomer meets Aragorn.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 1,
        day: 29,
        displayDate: "III 3019 Solmath 29",
        label: "Merry and Pippin meet Treebeard.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 1,
        day: 26,
        displayDate: "III 3019 Solmath 26",
        label: "Breaking of the Fellowship of the Ring. Death of Boromir.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 1,
        day: 25,
        displayDate: "III 3019 Solmath 25",
        label: "First Battle of the Fords of Isen; Théodred son of Théoden is slain.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 1,
        day: 16,
        displayDate: "III 3019 Solmath 16",
        label: "Farewell to Lórien.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 1,
        day: 15,
        displayDate: "III 3019 Solmath 15",
        label: "Frodo is shown The Mirror of Galadriel.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 0,
        day: 25,
        displayDate: "III 3019 Afteryule 25",
        label: "Gandalf casts down the Balrog.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 0,
        day: 17,
        displayDate: "III 3019 Afteryule 17",
        label: "The Fellowship of the Ring comes to Caras Galadhon.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 0,
        day: 15,
        displayDate: "III 3019 Afteryule 15",
        label: "The Bridge of Khazad-Dûm, and fall of Gandalf.",
    },
    {
        year: 3019 + 3441,
        allYear: false,
        month: 0,
        day: 13,
        displayDate: "III 3019 Afteryule 13",
        label: "The Fellowship reach the West-gate of Moria at nightfall.",
    },
    {
        year: 3018 + 3441,
        allYear: false,
        month: 11,
        day: 25,
        displayDate: "III 3018 Foreyule 25",
        label: "The Fellowship of the Ring leaves Rivendell.",
    },
    {
        year: 3018 + 3441,
        allYear: false,
        month: 9,
        day: 25,
        displayDate: "III 3018 Winterfilth 25",
        label: "Council of Elrond.",
    },
    {
        year: 3018 + 3441,
        allYear: false,
        month: 9,
        day: 6,
        displayDate: "III 3018 Winterfilth 6",
        label: "The camp under Weathertop attacked. Frodo wounded by the Witch-king.",
    },
    {
        year: 3018 + 3441,
        allYear: false,
        month: 8,
        day: 29,
        displayDate: "III 3018 Halimath 29",
        label: "The hobbits stay at the Prancing Pony.",
    },
    {
        year: 3018 + 3441,
        allYear: false,
        month: 8,
        day: 28,
        displayDate: "III 3018 Halimath 28",
        label: "The hobbits are captured by a Barrow-wight.",
    },
    {
        year: 3018 + 3441,
        allYear: false,
        month: 8,
        day: 26,
        displayDate: "III 3018 Halimath 26",
        label: "The Old Forest. Frodo comes to Tom Bombadil.",
    },
    {
        year: 3018 + 3441,
        allYear: false,
        month: 8,
        day: 23,
        displayDate: "III 3018 Halimath 23",
        label: "Frodo leaves Bag End. A Black Rider comes to Hobbiton at nightfall.",
    },
    {
        year: 3018 + 3441,
        allYear: false,
        month: 8,
        day: 18,
        displayDate: "III 3018 Halimath 18",
        label: "Gandalf is rescued by Gwaihir from the top of Orthanc.",
    },
    {
        year: 3018 + 3441,
        allYear: false,
        month: 6,
        day: 10,
        displayDate: "III 3018 Afterlithe 10",
        label: "Gandalf imprisoned in Orthanc by Saruman.",
    },
    {
        year: 3018 + 3441,
        allYear: false,
        month: 5,
        day: "Midyear's Day",
        displayDate: "III 3018 Mid-year's Day",
        label: "Gandalf meets Radagast.",
    },
    {
        year: 3018 + 3441,
        allYear: false,
        month: 5,
        day: 20,
        displayDate: "III 3018 Forelithe 20",
        label: "Sauron attacks Osgiliath. Start of the War of the Ring.",
    },
    {
        year: 3018 + 3441,
        allYear: false,
        month: 3,
        day: 12,
        displayDate: "III 3018 Astron 12",
        label: "Gandalf reaches Hobbiton.",
    },
    {
        year: 3001 + 3441,
        allYear: false,
        month: 8,
        day: 22,
        displayDate: "III 3001 Halimath 22",
        label: "Bilbo's 111th birthday.",
    },
];

/**
 * Calendar simulation Dates of Interest list of Third Age events.
 * @constant
 */
const DatesOfInterestThirdAge: DateOfInterest[] = [
    {
        year: 2995 + 3441,
        allYear: true,
        displayDate: "III 2995",
        label: "Éowyn sister of Éomer born.",
    },
    {
        year: 2994 + 3441,
        allYear: false,
        month: 10,
        day: 10,
        displayDate: "III 2994 Blotmath 10",
        label: "Balin, Lord of Moria, is killed. Dwarf-colony destroyed soon after.",
    },
    {
        year: 2991 + 3441,
        allYear: true,
        displayDate: "III 2991",
        label: "Éomer Éomund's son born in Rohan.",
    },
    {
        year: 2990 + 3441,
        allYear: true,
        displayDate: "III 2990",
        label: "Peregrin Took born.",
    },
    {
        year: 2984 + 3441,
        allYear: true,
        displayDate: "III 2984",
        label: "Denethor II becomes Steward of Gondor.",
    },
    {
        year: 2983 + 3441,
        allYear: true,
        displayDate: "III 2983",
        label: "Faramir son of Denethor born.",
    },
    {
        year: 2982 + 3441,
        allYear: true,
        displayDate: "III 2982",
        label: "Meriadoc Brandybuck born.",
    },
    {
        year: 2980 + 3441,
        allYear: false,
        month: 3,
        day: 6,
        displayDate: "III 2980 Astron 6",
        label: "Samwise Gamgee born.",
    },
    {
        year: 2978 + 3441,
        allYear: true,
        displayDate: "III 2978",
        label: "Boromir son of Denethor born.",
    },
    {
        year: 2968 + 3441,
        allYear: false,
        month: 8,
        day: 22,
        displayDate: "III 2968 Halimath 22",
        label: "Frodo Baggins born.",
    },
    {
        year: 2956 + 3441,
        allYear: true,
        displayDate: "III 2956",
        label: "Aragorn meets Gandalf.",
    },
    {
        year: 2954 + 3441,
        allYear: true,
        displayDate: "III 2954",
        label: "Mount Doom (Orodruin) bursts into flame again.",
    },
    {
        year: 2953 + 3441,
        allYear: true,
        displayDate: "III 2953",
        label: "Last meeting of the White Council.",
    },
    {
        year: 2951 + 3441,
        allYear: false,
        month: 2,
        day: 2,
        displayDate: "III 2951 Rethe 2",
        label: "Aragorn meets Arwen Undómiel. Sauron reveals himself in Mordor in this year.",
    },
    {
        year: 2948 + 3441,
        allYear: true,
        displayDate: "III 2948",
        label: "Théoden son of Thengel, King of Rohan, born.",
    },
    {
        year: 2941 + 3441,
        allYear: true,
        month: 8,
        day: 22,
        displayDate: "III 2941",
        label: "The year Bilbo finds the One Ring, Bard slays Smaug, and of The Battle of Five Armies.",
    },
    {
        year: 2931 + 3441,
        allYear: false,
        month: 2,
        day: 1,
        displayDate: "III 2931 Rethe 1",
        label: "Aragorn son of Arathorn II born.",
    },
    {
        year: 2930 + 3441,
        allYear: true,
        displayDate: "III 2930",
        label: "Denethor II born.",
    },
    {
        year: 2920 + 3441,
        allYear: true,
        displayDate: "III 2920",
        label: "Death of the Old Took (Bilbo's maternal grandfather).",
    },
    {
        year: 2890 + 3441,
        allYear: false,
        month: 8,
        day: 22,
        displayDate: "III 2890 Halimath 22",
        label: "Bilbo Baggins born.",
    },
    {
        year: 2879 + 3441,
        allYear: true,
        displayDate: "III 2879",
        label: "Gimli Glóin's son born.",
    },
    {
        year: 2799 + 3441,
        allYear: true,
        displayDate: "III 2799",
        label: "The Battle of Azanulbizar is fought and Azog is killed.",
    },
    {
        year: 2790 + 3441,
        allYear: true,
        displayDate: "III 2790",
        label: "Thrór slain by Azog in Moria. Gerontius born, later known as the Old Took.",
    },
    {
        year: 2770 + 3441,
        allYear: true,
        displayDate: "III 2770",
        label: "Smaug the Dragon descends on Erebor. Dale destroyed.",
    },
    {
        year: 2758 + 3441,
        allYear: true,
        month: 10,
        day: 1,
        displayDate: "III 2758",
        label: "The Long Winter.",
    },
    {
        year: 2747 + 3441,
        allYear: true,
        displayDate: "III 2747",
        label: "The Battle of the Greenfields. Bandobras 'the Bullroarer' Took invents golf.",
    },
    {
        year: 2746 + 3441,
        allYear: true,
        displayDate: "III 2746",
        label: "Thorin Oakenshield born.",
    },
    {
        year: 2703 + 3441,
        allYear: true,
        month: 5,
        day: "Midyear's Day",
        displayDate: "III c.2703",
        label: "Shire-reform enacted during the time of Isengrim II.",
    },
    {
        year: 2683 + 3441,
        allYear: true,
        displayDate: "III 2683",
        label: "Isengrim II becomes 10th Thain of the Took-line, begins excavation of the Great Smials.",
    },
    {
        year: 2670 + 3441,
        allYear: true,
        displayDate: "III c.2670",
        label: "Tobold Hornblower plants 'pipe-weed' in the Southfarthing.",
    },
    {
        year: 2570 + 3441,
        allYear: true,
        displayDate: "III 2570",
        label: "Baldor son of Brego lost beyond Forbidden Door of the 'Paths of the Dead'.",
    },
    {
        year: 2569 + 3441,
        allYear: true,
        displayDate: "III 2569",
        label: "Brego son of Eorl completes the Golden Hall.",
    },
    {
        year: 2510 + 3441,
        allYear: false,
        month: 7,
        day: 15,
        displayDate: "III 2510 Urimë",
        label: "Cirion the Steward gifts Calenardhon (Rohan) to Eorl and the Rohirrim.",
    },
    {
        year: 2510 + 3441,
        allYear: false,
        month: 3,
        day: 16,
        displayDate: "III 2510 Víressë 15",
        label: "Battle of the Field of Celebrant.",
    },
    {
        year: 2463 + 3441,
        allYear: true,
        displayDate: "III 2463",
        label: "Sméagol murders Déagol for the One Ring. White Council formed.",
    },
    {
        year: 2460 + 3441,
        allYear: true,
        displayDate: "III 2460",
        label: "Sauron returns to Dol Guldur. The Watchful Peace ends.",
    },
    {
        year: 2360 + 3441,
        allYear: true,
        month: 6,
        day: "Midyear's Day",
        displayDate: "III 2360",
        label: "Hador the Steward adds an extra day to the calendars of the west-lands.",
    },
    {
        year: 2063 + 3441,
        allYear: true,
        displayDate: "III 2063",
        label: "The Watchful Peace begins.",
    },
    {
        year: 2060 + 3441,
        allYear: true,
        month: 6,
        day: "Midyear's Day",
        displayDate: "III 2060",
        label: "First year of Stewards' Reckoning in Gondor.",
    },
    {
        year: 2059 + 3441,
        allYear: true,
        month: 6,
        day: "Midyear's Day",
        displayDate: "III 2059",
        label: "Last year of Kings' Reckoning in Gondor.",
    },
    {
        year: 2050 + 3441,
        allYear: true,
        displayDate: "III 2050",
        label: "Mardil becomes the first Ruling Steward of Gondor.",
    },
    {
        year: 2002 + 3441,
        allYear: true,
        displayDate: "III 2002",
        label: "Fall of Minas Ithil, afterwards known as Minas Morgul.",
    },
    {
        year: 2000 + 3441,
        allYear: true,
        month: 6,
        day: "Midyear's Day",
        displayDate: "III 2000",
        label: "Millennial Leap-year in Gondor (and the Shire?). Nazgûl besiege Minas Ithil.",
    },
    {
        year: 1999 + 3441,
        allYear: true,
        displayDate: "III 1999",
        label: "Erebor founded by Thráin I and the Arkenstone is discovered.",
    },
    {
        year: 1980 + 3441,
        allYear: true,
        displayDate: "III 1980",
        label: "A Balrog appears in Moria, and slays Durin VI.",
    },
    {
        year: 1975 + 3441,
        allYear: true,
        displayDate: "III 1975",
        label: "Last-king Arvedui drowned in Bay of Forochel. Witch-king defeated at Battle of Fornost.",
    },
    {
        year: 1636 + 3441,
        allYear: true,
        displayDate: "III 1636",
        label: "Year of the Great Plague (or Dark Plague), which reached the Shire in 1637.",
    },
    {
        year: 1601 + 3441,
        allYear: true,
        displayDate: "III 1601",
        label: "Shire colonized by Marcho and Blanco.",
    },
    {
        year: 1409 + 3441,
        allYear: true,
        displayDate: "III 1409",
        label: "The Witch-king of Angmar invades Arnor. King Arvaleg I slain. Tower of Amon Sûl destroyed.",
    },
    {
        year: 1300 + 3441,
        allYear: true,
        displayDate: "III c.1300",
        label: "Nazgûl reappear in Middle-earth and the realm of Angmar is founded by the Witch-King.",
    },
    {
        year: 1000 + 3441,
        allYear: true,
        month: 6,
        day: "Midyear's Day",
        displayDate: "III 1000",
        label: "Millennial Leap-year in Gondor. The Istari arrive to Middle-earth around this time.",
    },
    {
        year: 241 + 3441,
        allYear: true,
        displayDate: "III 241",
        label: "Arwen Undómiel born.",
    },
    {
        year: 109 + 3441,
        allYear: true,
        displayDate: "III 109",
        label: "Elrond weds Celebrían, daughter of Celeborn.",
    },
    {
        year: 2 + 3441,
        allYear: false,
        month: 9,
        day: 4,
        displayDate: "III 2 Narbeleth 4",
        label: "Battle of the Gladden Fields. Death of Isildur. The One Ring is lost in the river.",
    },
];

/**
 * Calendar simulation Dates of Interest list of Second Age events.
 * @constant
 */
const DatesOfInterestSecondAge: DateOfInterest[] = [
    {
        year: 3441,
        allYear: true,
        displayDate: "II 3441",
        label: "Defeat of Sauron and death of Elendil and Gil-galad. End of Second Age.",
    },
    {
        year: 3440,
        allYear: true,
        displayDate: "II 3440",
        label: "Anárion slain.",
    },
    {
        year: 3430,
        allYear: true,
        displayDate: "II 3430",
        label: "The Last Alliance is formed.",
    },
    {
        year: 3320,
        allYear: true,
        displayDate: "II 3320",
        label: "Elendil and his sons, Isildur and Anárion, found the Realms in Exile: Arnor and Gondor.",
    },
    {
        year: 3319,
        allYear: true,
        displayDate: "II 3319",
        label: "Downfall of Númenor. World is made round. Elendil and his sons escape.",
    },
    {
        year: 3000,
        allYear: true,
        month: 6,
        day: "Midyear's Day",
        displayDate: "II 3000",
        label: "Millennial Leap-year in Númenor, in the time when its kings took Adûnaic names.",
    },
    {
        year: 2000,
        allYear: true,
        month: 6,
        day: "Midyear's Day",
        displayDate: "II 2000",
        label: "Millennial Leap-year. Sauron has extended his power and the shadow has fallen on Númenor.",
    },
    {
        year: 1697,
        allYear: true,
        displayDate: "II 1697",
        label: "Eregion destroyed. The gates of Moria are shut. Elrond founds Rivendell.",
    },
    {
        year: 1693,
        allYear: true,
        displayDate: "II 1693",
        label: "The Three Rings are hidden and the War of the Elves and Sauron begins.",
    },
    {
        year: 1600,
        allYear: true,
        displayDate: "II c.1600",
        label: "Sauron forges The One Ring and completes Barad-dûr.",
    },
    {
        year: 1590,
        allYear: true,
        displayDate: "II c.1590",
        label: "The Three Rings are completed in Eregion.",
    },
    {
        year: 1075,
        allYear: true,
        displayDate: "II 1075",
        label: "Tar-Aldarion yields the Sceptre of Númenor to his daughter, Tar-Ancalimë.",
    },
    {
        year: 1000,
        allYear: true,
        month: 6,
        day: "Midyear's Day",
        displayDate: "II 1000",
        label: "Millennial Leap-year in Númenor. Sauron begins building Barad-dûr around this time.",
    },
    {
        year: 883,
        allYear: true,
        displayDate: "II 883",
        label: "Tar-Aldarion receives the Sceptre of Númenor from his father, Tar-Meneldur.",
    },
    {
        year: 870,
        allYear: true,
        displayDate: "II 870",
        label: "Marriage of Aldarion and Erendis.",
    },
    {
        year: 750,
        allYear: true,
        displayDate: "II 750",
        label: "Eregion founded by the Noldor.",
    },
    {
        year: 500,
        allYear: true,
        displayDate: "II c.500",
        label: "Sauron arises again in Middle-earth.",
    },
    {
        year: 442,
        allYear: true,
        displayDate: "II 442",
        label: "Death of Elros Tar-Minyatur.",
    },
    {
        year: 40,
        allYear: true,
        displayDate: "II c.40",
        label: "Many Dwarves leaving their old cities in Ered Luin migrate to Moria.",
    },
    {
        year: 32,
        allYear: true,
        displayDate: "II 32",
        label: "Elros is crowned first King of Númenor.",
    },
    {
        year: 1,
        allYear: true,
        displayDate: "II 1",
        label: "Foundation of the Grey Havens, and of Lindon.",
    },
];

/**
 * Calendar simulation Dates of Interest list of First Age events.
 * @constant
 */
const DatesOfInterestFirstAge: DateOfInterest[] = [
    {
        year: 0,
        allYear: true,
        displayDate: "Iys 590",
        label: "Morgoth cast through the Door of Night into the Void. First Age ends.",
    },
    {
        year: -3,
        allYear: true,
        displayDate: "Iys 587",
        label: "Eärendil slays Ancalagon the Black. Morgoth defeated and the War of Wrath ends.",
    },
    {
        year: -45,
        allYear: true,
        displayDate: "Iys 545",
        label: "War of Wrath begins.",
    },
    {
        year: -48,
        allYear: true,
        displayDate: "Iys 542",
        label: "Eärendil sails to Valinor and delivers the errand of the Two Kindreds.",
    },
    {
        year: -52,
        allYear: true,
        displayDate: "Iys 538",
        label: "Third Kinslaying at the Havens of Sirion. Maglor takes Elrond and Elros.",
    },
    {
        year: -58,
        allYear: true,
        displayDate: "Iys 532",
        label: "Elrond and Elros born.",
    },
    {
        year: -65,
        allYear: true,
        displayDate: "Iys 525",
        label: "Tuor and Idril sail Eärrámë into the West. Eärendil marries Elwing.",
    },
    {
        year: -80,
        allYear: false,
        month: 4,
        day: 26,
        displayDate: "Iys 510 Gates of Summer",
        label: "Fall of Gondolin.",
    },
    {
        year: -84,
        allYear: false,
        month: 11,
        day: "1 Yule",
        displayDate: "Iys 506 Midwinter",
        label: "Fall of Doriath in the Second Kinslaying.",
    },
    {
        year: -87,
        allYear: true,
        displayDate: "Iys 503",
        label: "Eärendil (spring) and Elwing born. Final deaths of Beren and Lúthien (autumn?).",
    },
    {
        year: -88,
        allYear: true,
        displayDate: "Iys 502",
        label: "Thingol slain by Dwarves in Menegroth. Melian returns to Valinor in grief.",
    },
    {
        year: -91,
        allYear: true,
        month: 4,
        day: 25,
        displayDate: "Iys 499 Spring or Summer",
        label: "Túrin Turambar slays Glaurung.",
    },
    {
        year: -95,
        allYear: false,
        month: 10,
        day: 19,
        displayDate: "Iys 495 Hísimë 19",
        label: "Tuor comes to Gondolin.",
    },
    {
        year: -95,
        allYear: false,
        month: 10,
        day: 1,
        displayDate: "Iys 495 c.Hísimë 1",
        label: "Fall of Nargothrond, followed by the Fell Winter.",
    },
    {
        year: -95,
        allYear: false,
        month: 9,
        day: 11,
        displayDate: "Iys 495 Narquelië 11",
        label: "Tuor meets Ulmo in Nevrast.",
    },
    {
        year: -118,
        allYear: false,
        month: 11,
        day: "1 Yule",
        displayDate: "Iys 472 Winter",
        label: "Tuor born.",
    },
    {
        year: -118,
        allYear: false,
        month: 6,
        day: "Midyear's Day",
        displayDate: "Iys 472 Midsummer",
        label: 'Nírnaeth Arnoediad: The 6-day "Battle of Unnumbered Tears" begins.',
    },
    {
        year: -124,
        allYear: true,
        displayDate: "Iys 466 Spring",
        label: "Beren and Lúthien achieve the Quest of the Silmaril.",
    },
    {
        year: -125,
        allYear: true,
        month: 10,
        day: 23,
        displayDate: "Iys 465 Autumn or Winter",
        label: "Finrod slain by a werewolf saving Beren during the Quest of the Silmaril.",
    },
    {
        year: -126,
        allYear: false,
        month: 6,
        day: "Midyear's Day",
        displayDate: "Iys 464 Midsummer",
        label: "Beren first sees Lúthien dancing under the moonrise in Neldoreth.",
    },
    {
        year: -126,
        allYear: false,
        displayDate: "Iys 464 Gwaeron?",
        label: "Túrin Turambar born.",
    },
    {
        year: -134,
        allYear: false,
        displayDate: "Iys 456",
        label: "Fingolfin slain in single combat with Morgoth.",
    },
    {
        year: -134,
        allYear: false,
        month: 0,
        day: "2 Yule",
        displayDate: "Iys 455 Midwinter",
        label: "Dagor Bragollach: Battle of Sudden Flame. Barahir rescues Finrod.",
    },
    {
        year: -158,
        allYear: true,
        displayDate: "Iys 432",
        label: "Beren Erchamion born.",
    },
    {
        year: -280,
        allYear: true,
        displayDate: "Iys 310",
        label: "Bëor leads The First House of the Edain into Beleriand and are discovered by Finrod.",
    },
    {
        year: -330,
        allYear: true,
        displayDate: "Iys 260",
        label: "Glaurung first appears and is driven back to Angband. The Long Peace begins.",
    },
    {
        year: -474,
        allYear: true,
        displayDate: "Iys 116",
        label: "Gondolin completed.",
    },
    {
        year: -488,
        allYear: true,
        displayDate: "Iys 102",
        label: "Nargothrond completed.",
    },
    {
        year: -526,
        allYear: true,
        displayDate: "Iys 64",
        label: "Turgon begins building Gondolin.",
    },
    {
        year: -530,
        allYear: true,
        displayDate: "Iys 60",
        label: "Dagor Aglareb: start of the Siege of Angband.",
    },
    {
        year: -537,
        allYear: true,
        displayDate: "Iys 53",
        label: "Turgon, guided by Ulmo, discovers the hidden valley of Tumladen.",
    },
    {
        year: -538,
        allYear: true,
        displayDate: "Iys 52",
        label: "Finrod begins building Nargothrond.",
    },
    {
        year: -540,
        allYear: true,
        month: 6,
        day: "Midyear's Day",
        displayDate: "Iys 50 Summer",
        label: "Ulmo sends Turgon and Finrod a dream near the Aelin-uial.",
    },
    {
        year: -570,
        allYear: false,
        displayDate: "Iys 20 Spring",
        label: "Mereth Aderthad: The Feast of Reuniting held near Eithel Ivrin.",
    },
    {
        year: -585,
        allYear: true,
        displayDate: "Iys 5",
        label: "Fingon rescues Maedhros from atop Thangorodrim.",
    },
    {
        year: -589,
        allYear: false, // don't set a Shire date, so that Eldar New Year's Day is always selected.
        displayDate: "Iys 1",
        label: "The Sun first rises over Middle-earth. Awakening of Men in Hildórien.",
    },
];

/**
 * Calendar simulation Dates of Interest list.
 * @constant
 */
const DatesOfInterest: DateOfInterest[] = [
    ...DatesOfInterestFourthAge,
    ...DatesOfInterestThirdAgeLotR,
    ...DatesOfInterestThirdAge,
    ...DatesOfInterestSecondAge,
    ...DatesOfInterestFirstAge,
];

/**
 * @return {Date} The Gregorian Date corresponding to the given `DateOfInterest` and start dates.
 */
const eventOfInterestToDate = (
    eventOfInterest: DateOfInterest,
    shireStartDate: Date,
    rivendellStartDate: Date
): Date => {
    // Find a date somewhere in the middle of the current Shire calendar year.
    let gregorian = new Date(shireStartDate);
    let daysElapsed =
        Math.floor(
            ((eventOfInterest.year - 1) * GONDOR_DAYS_PER_1000_YEARS) / 1000
        ) + 183;
    gregorian.setDate(gregorian.getDate() + daysElapsed);

    if (eventOfInterest.day) {
        // Find the Gregorian date for the specific Shire Reckoning date of the event.
        let calendar = makeShireCalendarDates(
            gregorian,
            shireStartDate,
            RECKONING_RULES_TRADITIONAL
        );
        let shireDate = calendar.dates.find(
            (date) =>
                date.month === eventOfInterest.month
                && date.day === eventOfInterest.day
        );

        gregorian = shireDate?.gregorian || calendar.dates[0].gregorian;
    } else {
        // Find the Elves' New Year's Day for the current Shire calendar year.
        gregorian = getRivendellNewYearDate(gregorian, rivendellStartDate);
    }

    return gregorian;
};

/**
 * @return {Date} The Gregorian Date corresponding to the `currentEventIndex` and start dates,
 *                or `currentDate` if the `currentEventIndex` is not a valid `DateOfInterest`.
 */
const adjustDateForCurrentEvent = (
    currentDate: Date,
    currentEventIndex: number,
    shireStartDate: Date,
    rivendellStartDate: Date
): Date => {
    if (currentEventIndex < 0 || DatesOfInterest.length <= currentEventIndex) {
        return currentDate;
    }

    return eventOfInterestToDate(
        DatesOfInterest[currentEventIndex],
        shireStartDate,
        rivendellStartDate
    );
};

/**
 * @return {number} The DatesOfInterest index for the `currentDate` according to the given start dates.
 */
const findEventIndex = (
    currentDate: Date,
    shireStartDate: Date,
    rivendellStartDate: Date
): number => {
    const currentSAYear = daysElapsedToSecondAgeYear(
        toDaysElapsed(shireStartDate, currentDate)
    ).year;

    return DatesOfInterest.findIndex((event) => {
        if (event.allYear) {
            return currentSAYear === event.year;
        }

        return datesMatch(
            currentDate,
            eventOfInterestToDate(event, shireStartDate, rivendellStartDate)
        );
    });
};

/**
 * @return {number} The DatesOfInterest index preceding the `currentDate` according to the given start dates, or -1.
 */
const findPreviousEventIndex = (
    currentDate: Date,
    shireStartDate: Date,
    rivendellStartDate: Date
): number => {
    const currentSAYear = daysElapsedToSecondAgeYear(
        toDaysElapsed(shireStartDate, currentDate)
    ).year;

    return DatesOfInterest.findIndex((event) => {
        if (event.allYear) {
            return currentSAYear > event.year;
        }

        return (
            currentDate
            > eventOfInterestToDate(event, shireStartDate, rivendellStartDate)
        );
    });
};

export {
    SecondAgeSyncScheme,
    SyncAges,
    DatesOfInterest,
    DatesOfInterestFourthAge,
    DatesOfInterestThirdAgeLotR,
    DatesOfInterestThirdAge,
    DatesOfInterestSecondAge,
    DatesOfInterestFirstAge,
    eventOfInterestToDate,
    adjustDateForCurrentEvent,
    findEventIndex,
    findPreviousEventIndex,
};
