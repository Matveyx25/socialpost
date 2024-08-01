import React, { forwardRef, useRef, useState } from "react";
import s from "./RangeCalendar.module.scss";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  IconCalendarUp,
  IconChevronRight,
  IconCalendarDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { CalendarHeader } from "./CalendarHeader";
import { Button } from "../Button/Button";
import classNames from "classnames";
import { ru } from "date-fns/locale";
import { add, min, startOfDay, endOfDay, isToday, isValid, addHours, isEqual, subDays } from "date-fns";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

export const RangeCalendarWithTime = ({
  dateRange,
  setDateRange,
  timeRange,
  setTimeRange,
  inputsWrapperClassName,
  ...props
}) => {
  const [startDate, endDate] = dateRange;

  const calendar = useRef(null);

  const close = () => {
    calendar.current.setOpen(false);
  };

  const reset = () => {
    calendar.current.clear();
    calendar.current.setOpen(false);
  };

  const isTodayOrNotSet = (date) => {
		if(!date){
			return true
		}
		return isEqual(startOfDay(subDays(new Date(date), 1)), startOfDay(subDays(new Date(), 1))) || !isValid(new Date(date));
	};

  const minTimeForFirstCalendar = isTodayOrNotSet(startDate)
    ? addHours(new Date(), 5).toTimeString().split(' ')[0]
    : "00:00:00";

  const ExampleCustomInput = forwardRef(({ value, onClick, isOpen }, ref) => (
    <div
      className={classNames(s.inputsWrapper, inputsWrapperClassName)}
      onClick={onClick}
      ref={ref}
    >
      <IconCalendarUp size={20} color="#919396" />
      <input value={value?.split("-")[0] || value} placeholder="От" className={s.calendarInput}/>
      <TimePicker
				maxDetail="minute"
        disableClock
        format="HH:mm"
        className={s.timeInput}
				onClick={e => e.stopPropagation()}
        onChange={(v) => v && setTimeRange((prev) =>  [v, prev[1]])}
				minTime={minTimeForFirstCalendar}
        value={timeRange[0]}
      />
      <IconCalendarDown size={20} color="#919396" />
      <input value={value?.split("-")[1]} placeholder="До" className={s.calendarInput}/>
      <TimePicker
				maxDetail="minute"
        disableClock
        format="HH:mm"
				onClick={e => e.stopPropagation()}
        className={s.timeInput}
        onChange={(v) => v && setTimeRange((prev) => [prev[0], v])}
				minTime={timeRange[0]}
        value={timeRange[1]}
      />
      {!calendar.current?.state.open ? (
        <IconChevronRight size={18} color="#919396" />
      ) : (
        <IconChevronUp size={18} color="#919396" />
      )}
    </div>
  ));

  const MyContainer = ({ className, children }) => {
    return (
      <CalendarContainer className={className + " " + s.wrapper}>
        <div style={{ position: "relative" }}>{children}</div>
        <div className={s.btns}>
          <Button
            label="За всё время"
            size="small"
            theme="secondary"
            onClick={reset}
          />
          <Button label="Выбрать" size="small" onClick={close} />
        </div>
      </CalendarContainer>
    );
  };

  const onRangeChange = (range) => {
    if (7 && range[1]) {
      //  Determine the max date
      const maxDate = add(range[0], { days: 7 });
      //  Then, choose between max value and actual value
      range[1] = min([maxDate, range[1]]);
    }

    // Ensure that we include info from the start of the day
    range[0] = startOfDay(range[0]);

    if (range[1]) {
      // Ensure that we include info until the end of the day
      range[1] = endOfDay(range[1]);
    }

    setDateRange(range);
  };

  return (
    <div>
      <ReactDatePicker
        {...props}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        ref={calendar}
        onChange={onRangeChange}
        customInput={<ExampleCustomInput />}
        calendarClassName={s.wrapper}
        renderCustomHeader={CalendarHeader}
        calendarContainer={MyContainer}
        shouldCloseOnSelect={false}
        locale={ru}
      />
    </div>
  );
};
