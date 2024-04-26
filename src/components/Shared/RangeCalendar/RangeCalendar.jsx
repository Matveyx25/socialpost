import React, { forwardRef, useRef, useState } from 'react'
import s from "./RangeCalendar.module.scss"
import ReactDatePicker, { CalendarContainer } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { IconCalendarUp, IconChevronRight, IconChevronDown, IconCalendarDown, IconChevronUp } from '@tabler/icons-react';
import { CalendarHeader } from './CalendarHeader';
import { Button } from '../Button/Button';

export const RangeCalendar = ({dateRange, setDateRange}) => {
  const [startDate, endDate] = dateRange;

	const calendar = useRef(null)

	const close = () => {
		calendar.current.setOpen(false)
	}

	const reset = () => {
		calendar.current.clear()
		calendar.current.setOpen(false)
	}

	const ExampleCustomInput = forwardRef(({ value, onClick, isOpen }, ref) => (
    <div className={s.inputsWrapper} onClick={onClick} ref={ref}>
			<IconCalendarUp size={20} color='#919396'/>
      <input value={value?.split('-')[0] || value} placeholder='От'/>
			<IconCalendarDown size={20} color='#919396'/>
      <input value={value?.split('-')[1]} placeholder='До'/>
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

	return (
		<div>
			 <ReactDatePicker
					selectsRange={true}
					startDate={startDate}
					endDate={endDate}
					ref={calendar}
					onChange={(update) => {
						setDateRange(update);
					}}
					locale="ru"
					customInput={<ExampleCustomInput />}
					calendarClassName={s.wrapper}
					renderCustomHeader={CalendarHeader}
					calendarContainer={MyContainer}
					shouldCloseOnSelect={false}
				/>
		</div>
	)
}
