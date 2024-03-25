import React, { forwardRef, useRef, useState } from 'react'
import s from "./Calendar.module.scss"
import ReactDatePicker, { CalendarContainer } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { IconCalendar } from '@tabler/icons-react';
import { CalendarHeader } from '../RangeCalendar/CalendarHeader';

export const Calendar = ({placeholder, className, label, value, onChange}) => {
	const calendar = useRef(null)

	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
		<div className={s.inputsWrapper} onClick={onClick} ref={ref}>
			<IconCalendar size={20} color='#919396'/>
			<input value={value} placeholder={placeholder}/>
		</div>
  ));

	const MyContainer = ({ className, children }) => {
    return (
			<CalendarContainer className={className + ' ' + s.wrapper}>
				<div style={{ position: "relative" }}>{children}</div>
			</CalendarContainer>
    );
  };

	return (
		<div className={`${className} ${s.calendarGroup}`}>
			{label && <div className={s.header}>
				<span>{label}</span>
			</div>}
			 <ReactDatePicker
					selected={value ? new Date(value) : null}
					ref={calendar}
					onChange={(update) => {
						onChange(update.toISOString());
					}}
					customInput={<ExampleCustomInput />}
					calendarClassName={s.wrapper}
					renderCustomHeader={CalendarHeader}
					calendarContainer={MyContainer}
				/>
		</div>
	)
}
