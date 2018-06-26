import React from "react";
import isEqual from "lodash/isEqual";
import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";

import styles from "./styles.scss";

const WEEK_DAYS = {
  mon: "Пн",
  tue: "Вт",
  wed: "Ср",
  thu: "Чт",
  fri: "Пт",
  sat: "Сб",
  sun: "Нд"
};

const WorkingHours = ({ workingHours }) => (
  <dl className="working-hours">
    {normalizeWorkingHours(workingHours).map(
      ([dayRanges, timeRanges], index) => [
        <dt className="working-hours__days" key={`days-${index}`}>
          {dayRanges
            .map(range => range.map(day => WEEK_DAYS[day]).join(" — "))
            .join(", ")}
        </dt>,
        <dd className="working-hours__hours" key={`hours-${index}`}>
          {timeRanges.map(([from, till], index) => (
            <div key={index}>
              <span className="working-hours__hour working-hours__hour-from">
                {from}
              </span>
              {" — "}
              <span className="working-hours__hour working-hours__hour-till">
                {till}
              </span>
            </div>
          ))}
        </dd>
      ]
    )}
  </dl>
);

export default withStyles(styles)(WorkingHours);

const normalizeWorkingHours = workingHours => {
  const workingHoursEntries = Object.entries(workingHours);
  workingHoursEntries.sort(([a], [b]) => {
    const days = Object.keys(WEEK_DAYS);
    return days.indexOf(a) - days.indexOf(b);
  });

  const groupedWorkingHours = groupWorkingHours(workingHoursEntries);

  return groupedWorkingHours.map(([days, timeRanges]) => [
    groupDays(days),
    timeRanges
  ]);
};

const groupWorkingHours = workingHours =>
  workingHours.reduce((groups, [day, timeRanges]) => {
    const groupIndex = groups.findIndex(([_, groupRanges]) =>
      isEqual(timeRanges, groupRanges)
    );

    if (groupIndex === -1) {
      const days = [day];
      const group = [days, timeRanges];

      return [...groups, group];
    } else {
      const head = groups.slice(0, groupIndex);
      const tail = groups.slice(groupIndex + 1);

      const [days, timeRanges] = groups[groupIndex];
      const group = [days.concat(day), timeRanges];

      return [...head, group, ...tail];
    }
  }, []);

const groupDays = days => {
  const allDays = Object.keys(WEEK_DAYS);

  const dayRanges = days.reduce((dayRanges, day, index, days) => {
    const prevDay = days[index - 1];

    if (prevDay && allDays.indexOf(day) - allDays.indexOf(prevDay) === 1) {
      const [range, ...ranges] = dayRanges.reverse();
      return [...ranges, [...range, day]];
    } else {
      return [...dayRanges, [day]];
    }
  }, []);

  return dayRanges.map(
    range =>
      range.length > 2 ? [...range.slice(0, 1), ...range.slice(-1)] : range
  );
};
