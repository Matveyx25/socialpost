import React, { forwardRef, useRef, useState } from 'react'
import s from "./Calendar.module.scss"
import ReactDatePicker, { CalendarContainer } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { IconCalendar } from '@tabler/icons-react';
import { Button } from '../Button/Button';
import { CalendarHeader } from '../RangeCalendar/CalendarHeader';

export const Calendar = ({placeholder, className, label}) => {
	const [date, setDate] = useState(null);

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
			<div className={s.header}>
				<span>{label}</span>
			</div>
			 <ReactDatePicker
					selected={date}
					ref={calendar}
					onChange={(update) => {
						setDate(update);
					}}
					locale="ru"
					customInput={<ExampleCustomInput />}
					calendarClassName={s.wrapper}
					renderCustomHeader={CalendarHeader}
					calendarContainer={MyContainer}
				/>
		</div>
	)
}
