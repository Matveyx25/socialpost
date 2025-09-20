import React from "react";
import s from "./RangeCalendar.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import {
  IconChevronRight,
	IconClockDown,
	IconClockUp,
} from "@tabler/icons-react";
import classNames from "classnames";
import { startOfDay, isValid, addHours, isEqual, subDays } from "date-fns";

export const TimeRange = ({
  dateRange,
  timeRange,
  setTimeRange,
  inputsWrapperClassName
}) => {
  const [startDate, endDate] = dateRange;

  const isTodayOrNotSet = (date) => {
		if(!date){
			return true
		}
		return isEqual(startOfDay(subDays(new Date(date), 1)), startOfDay(subDays(new Date(), 1))) || !isValid(new Date(date));
	};

  const minTimeForFirstCalendar = isTodayOrNotSet(startDate)
    ? addHours(new Date(), 5).toTimeString().split(' ')[0]
    : "00:00";

  return (
    <div
      className={classNames(
        s.inputsWrapper,
				s.timeRangeWrapper,
        inputsWrapperClassName
      )}
    >
      <IconClockUp size={20} color="#919396" />
			<input
				type="time"
				value={timeRange[0]}
				onChange={(e) => {
					if(e?.target?.value){
						setTimeRange(prev => [e.target.value, prev[1]])
					}
				}}
				onClick={(e) => e.stopPropagation()}
				className={s.calendarInput}
			/>
      <IconClockDown size={20} color="#919396" />
			<input
				type="time"
				value={timeRange[1]}
				onChange={(e) => {
					if(e?.target?.value){
						setTimeRange(prev => [prev[0], e.target.value])
					}
				}}
				onClick={(e) => e.stopPropagation()}
				className={s.calendarInput}
			/>
    </div>
  );
};
