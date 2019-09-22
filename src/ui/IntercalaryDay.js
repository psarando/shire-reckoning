/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { getDateColor, GregorianDateDisplay } from "./DateCell";

const IntercalaryDay = props => {
    const {
        currentDate,
        dayClassName,
        dayExtra,
        dayExtraClassName,
        description,
        gregorian,
        gregorianExtra,
        name,
    } = props;

    let dayColor = getDateColor("holiday", gregorian, currentDate);

    if (dayExtra) {
        dayColor = getDateColor(dayColor, gregorianExtra, currentDate);

        return (
            <td
                className={`${dayColor} intercalary-multi-day`}
                title={description}
            >
                <div className={dayClassName}>{name}</div>
                <GregorianDateDisplay date={gregorian} />
                <hr className="intercalary-day-separator" />
                <div className={dayExtraClassName}>{dayExtra}</div>
                <GregorianDateDisplay date={gregorianExtra} />
            </td>
        );
    }

    return (
        <td className={dayColor} title={description}>
            <div className="date-container">
                <div className="date-display-emoji" />
                <div className="date-display">{name}</div>
                <GregorianDateDisplay date={gregorian} />
            </div>
        </td>
    );
};

export default IntercalaryDay;
