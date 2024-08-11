import React, { forwardRef, memo, useMemo, useRef } from "react";
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
import { add, min, startOfDay, endOfDay, isValid, addHours, isEqual, subDays } from "date-fns";

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
    : "00:00";

	const TimeInput = memo(({value, setValue}) => {
		return (
			<input
				type="time"
				value={value}
				onChange={(e) => {
					if(e?.target?.value){
						setValue(e.target.value)
					}
				}}
				onClick={(e) => e.stopPropagation()}
				className={s.timeInput}
			/>
		)
	})

  const ExampleCustomInput = forwardRef(({ value, onClick, isOpen }, ref) => (
    <div
      className={classNames(
        s.inputsWrapper,
        s.withTime,
        inputsWrapperClassName
      )}
      ref={ref}
			onClick={onClick}
    >
      <IconCalendarUp size={20} color="#919396" />
      <input
        value={value?.split("-")[0] || value}
        placeholder="От"
        className={s.calendarInput}
      />
      <TimeInput value={timeRange[0]} setValue={(v) => setTimeRange(prev => [v, prev[1]])}/> 
      <IconCalendarDown size={20} color="#919396" />
      <input
        value={value?.split("-")[1]}
        placeholder="До"
        className={s.calendarInput}
      />
			<TimeInput value={timeRange[1]} setValue={(v) => setTimeRange(prev => [prev[0], v])}/> 
      {!calendar.current?.state.open ? (
        <IconChevronRight onClick={onClick} size={18} color="#919396" />
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
        dateFormat={'dd.MM.yyyy'}
      />
    </div>
  );
};
