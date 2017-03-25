/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import * as Utils from '../Utils';

it('makes Years Elapsed', () => {
    let startDate = Utils.fullYearDate(1,0,1);
    let today = Utils.fullYearDate(-405,0,1);

    for (let year = -405; year <= 405; year++) {
        today.setFullYear(year,0,1);
        let nextDate = new Date(today);
        while(nextDate.getFullYear() == year) {
            let yearsElapsed = Utils.daysElapsedToGregorianYear(Utils.toDaysElapsed(startDate, nextDate)).year;
            expect(nextDate.toDateString() + " == " + yearsElapsed)
                .toEqual(nextDate.toDateString() + " == " + year);
            nextDate = Utils.getNextDate(nextDate);
        }
    }
});

it('makes Start Dates', () => {
    let startDate = Utils.fullYearDate(1,0,1);
    let today = Utils.fullYearDate(-405,0,1);

    for (let year = -405; year <= 405; year++) {
        today.setFullYear(year,0,1);
        let nextDate = new Date(today);
        while(nextDate.getFullYear() == year) {
            let daysElapsed = Utils.daysElapsedToGregorianYear(Utils.toDaysElapsed(startDate, nextDate)).daysRemainder;
            let newYearDate = Utils.getNewYearDate(startDate, nextDate, daysElapsed);
            expect(nextDate.toDateString() + " -> " + newYearDate.toDateString())
                .toEqual(nextDate.toDateString() + " -> " + today.toDateString());
            nextDate = Utils.getNextDate(nextDate);
        }
    }
});
