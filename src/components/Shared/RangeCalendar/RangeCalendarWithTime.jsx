import React, { forwardRef, useRef, useState } from 'react'
import s from "./RangeCalendar.module.scss"
import ReactDatePicker, { CalendarContainer } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { IconCalendarUp, IconChevronRight, IconCalendarDown, IconChevronUp } from '@tabler/icons-react';
import { CalendarHeader } from './CalendarHeader';
import { Button } from '../Button/Button';
import classNames from 'classnames';
import { Calendar } from '../Calendar/Calendar';
import { ru } from 'date-fns/locale';
import { add, min, startOfDay, endOfDay, addDays } from 'date-fns';

export const RangeCalendarWithTime = ({dateRange, setDateRange, timeRange, setTimeRange, inputsWrapperClassName, ...props}) => {
  const [startDate, endDate] = dateRange;

	const calendar = useRef(null)

	const close = () => {
		calendar.current.setOpen(false)
	}

	const reset = () => {
		calendar.current.clear()
		calendar.current.setOpen(false)
	}

	// Utility function to check if dateRange[0] is today or not set
	const isTodayOrNotSet = (date) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const selectedDate = date ? new Date(date) : new Date();
		selectedDate.setHours(0, 0, 0, 0);
		return selectedDate.getTime() === today.getTime() || !date;
	};

	const minEndDate = startDate ? addDays(startDate, 2) : null; // Ensure endDate is at least 2 days after startDate

	const minTimeForFirstCalendar = isTodayOrNotSet(startDate) ? new Date().setHours(new Date().getHours() + 5) : new Date();

	const ExampleCustomInput = forwardRef(({ value, onClick, isOpen }, ref) => (
    <div className={classNames(s.inputsWrapper, inputsWrapperClassName)} onClick={onClick} ref={ref}>
			<IconCalendarUp size={20} color='#919396'/>
      <input value={value?.split('-')[0] || value} placeholder='От'/>
			<Calendar
				value={timeRange[0]}
				placeholder={"От"}
				minTime={minTimeForFirstCalendar}
				maxTime={new Date()}
				showTimeSelect
				showTimeSelectOnly
				inputClassName={s.timeInput}
				className={s.calendarGroupTimeInput}
				timeFormat="HH:mm"
				dateFormat="HH:mm"
				timeIntervals={60}
				onChange={(v) => setTimeRange((prev) => [v, prev[1]])}
			/>
			<IconCalendarDown size={20} color='#919396'/>
      <input value={value?.split('-')[1]} placeholder='До'/>
			<Calendar
				value={timeRange[1]}
				placeholder={"До"}
				minDate={new Date()}
				showTimeSelect
				showTimeSelectOnly
				inputClassName={s.timeInput}
				className={s.calendarGroupTimeInput}
				timeFormat="HH:mm"
				dateFormat="HH:mm"
				timeIntervals={60}
				onChange={(v) => setTimeRange((prev) => [prev[0], v])}
			/>
			{!calendar.current?.state.open ? <IconChevronRight size={18} color='#919396'/> : <IconChevronUp size={18} color='#919396'/>}
    </div>
  ));

	const MyContainer = ({ className, children }) => {
    return (
			<CalendarContainer className={className + ' ' + s.wrapper}>
				<div style={{ position: "relative" }}>{children}</div>
				<div className={s.btns}>
					<Button label="За всё время" size='small' theme='secondary' onClick={reset}/>
					<Button label="Выбрать" size='small' onClick={close}/>
				</div>
			</CalendarContainer>
    );
  };


  const onRangeChange = range => {
    if ( 7 && range[1] ) {
    //  Determine the max date
      const maxDate = add( range[0], { days: 7 } );
      //  Then, choose between max value and actual value
      range[1] = min([ maxDate, range[1] ]);
    }

    // Ensure that we include info from the start of the day
    range[0] = startOfDay( range[0] );

    if ( range[1] ) {
      // Ensure that we include info until the end of the day
      range[1] = endOfDay( range[1] );
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
	)
}