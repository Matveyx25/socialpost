import { IconChevronsLeft } from "@tabler/icons-react";
import { IconChevronDown, IconChevronsRight } from "@tabler/icons-react";
import React, { useState } from "react";
import Select from "react-select";
import s from './RangeCalendar.module.scss'

export const CalendarHeader = ({
	date,
	changeYear,
	decreaseMonth,
	increaseMonth,
	prevMonthButtonDisabled,
	nextMonthButtonDisabled}) => {
  const years = range(1990, getYear(new Date()) + 1, 1).map((el => ({label: el, value: el})));
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

	function getYear(date) {
		const d = date
		return d.getFullYear();
	}

	function getMonth(date) {
		const d = date
		return d.getMonth();
	}

	function range(start, end, step = 1) {
		const result = [];
		for (let i = start; i < end; i += step) {
			result.push(i);
		}
		return result;
	}

  return (
		<div>
			<div
				className={s.headerWrapper}
			>
				<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
					<IconChevronsLeft size={24} color="#4F5157"/>
				</button>
				{months[getMonth(date)] + ' - '}
				<Select
					defaultValue={years.find(el => el.value == getYear(date))}
					onChange={(el) => changeYear(el.value)}
					options={years}
					isSearchable={false}
					components={{
						DropdownIndicator: () => <IconChevronDown size={18}/>
					}}
					styles={{
						control: (baseStyles) => ({
							...baseStyles,
							minHeight: 0,
							padding: 0,
							border: 'none',
						}),
						singleValue: (baseStyles) => ({
							...baseStyles,
							fontSize: 14,
							color: '#4F5157',
							fontFamily: 'SF Regular',
							padding: 0
						}),
						valueContainer: (baseStyles)=> ({
							...baseStyles,
							padding: 0,
							paddingRight: 4
						}),
						indicatorSeparator: () => ({
							display: 'none',
						}),
						dropdownIndicator: (baseStyles) => ({
							...baseStyles,
							padding: 0,
						}),
					}}
					/>

				<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
					<IconChevronsRight size={24} color="#4F5157"/>
				</button>
			</div>
		</div>
  );
};
