import React, { useState } from 'react'
import s from './filter.module.scss'
import { IconChevronRight, IconReload, IconSearch } from '@tabler/icons-react';
import {  RangeInputsField } from '../../../Filters/RangeInputs';
import { Button } from '../../../Shared/Button/Button';
import { InputField } from '../../../Shared/Input/Input';
import { Form, Formik } from 'formik';
import { RangeCalendar } from '../../../Shared/RangeCalendar/RangeCalendar';
import { Calendar } from '../../../Shared/Calendar/Calendar';

export const filterSubsScales = [
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1200},
	{value: 1420},
	{value: 1620},
	{value: 1620},
	{value: 1420},
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1200},
	{value: 1420},
	{value: 1620},
	{value: 1620},
	{value: 1420},
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1200},
	{value: 1420},
	{value: 1620},
	{value: 1620},
	{value: 1420},
	{value: 1256},
	{value: 1140},
	{value: 1000},
]

export const Filters = ({onFilterSubmit, maxSubscribersNumber, timeRange, setTimeRange, dateRange, setDateRange}) => {
	const [isSended, set_isSended] = useState(false)

	const submitHandler = (values) => {
		set_isSended(true)
		onFilterSubmit(values)
		set_isSended(false)
	}

	return (
    <Formik
      initialValues={{
        search: "",
        minBudget: "",
        maxBudget: "",
        minPrice: "",
        maxPrice: "",
        minSubscribers: "",
        minPostReach: "",
      }}
      onSubmit={(values) => {
        submitHandler(values);
      }}
    >
			<Form>
				<div className={s.wrapper}>
					<h2>Параметры</h2>
					<span className={s.line}></span>
					<InputField
						leftIcon={<IconSearch />}
						placeholder={"Поиск"}
						label={"Поиск по названию канала"}
						name="search"
						className={s.input}
					/>
					<div className={s.inputsRow}>
						<InputField
							leftIcon={<IconSearch />}
							placeholder={"140,00 ₽"}
							label={"Мин. цена размещения"}
							name="minPrice"
							className={s.input}
						/>
						<InputField
							leftIcon={<IconSearch />}
							placeholder={"2940,00 ₽"}
							label={"Макс. цена размещения"}
							name="maxPrice"
							className={s.input}
						/>
					</div>
					<InputField
						placeholder={"0"}
						label={"Подписчиков, от"}
						name="minSubscribers"
						className={s.input}
					/>
					<InputField
						placeholder={"0"}
						label={"Охват, от"}
						name="minPostReach"
						className={s.input}
					/>
					<div className={s.inputsGroup}>
						<h5 className={s.calendarLabel}>Диапазон размещения</h5>
						<RangeCalendar {...{dateRange, setDateRange}} inputsWrapperClassName={s.calendarInputs}/>
					</div>
					<div className={s.inputsGroup}>
						<div className={s.calendarsWrapper}>
							<Calendar
								value={timeRange[0]}
								placeholder={"От"}
								minDate={new Date()}
								showTimeSelect
								showTimeSelectOnly
								inputClassName={s.firstCalendar}
								minTime={new Date().setHours(9, 0, 0)}
								maxTime={new Date().setHours(18, 0, 0)}
								timeFormat="HH:mm"
      					dateFormat="HH:mm"
								onChange={(v) => setTimeRange((prev) => [v, prev[1]])}
							/>
							<Calendar
								value={timeRange[1]}
								placeholder={"До"}
								minDate={new Date()}
								showTimeSelect
								showTimeSelectOnly
								inputClassName={s.secondCalendar}
								minTime={new Date().setHours(9, 0, 0)}
								maxTime={new Date().setHours(18, 0, 0)}
								timeFormat="HH:mm"
      					dateFormat="HH:mm"
								onChange={(v) => setTimeRange((prev) => [prev[0], v])}
							/>
							<IconChevronRight size={18} color='#919396'/>
						</div>
					</div>
					<span className={s.line}></span>
					<div className={s.btns}>
						<Button
							className={s.resetBtn}
							label={"Сбросить"}
							theme="secondary"
							leftIcon={<IconReload size={18} />}
						/>
						<Button
							className={s.btn}
							label={"Применить"}
							fetching={isSended}
						/>
					</div>
				</div>
			</Form>
    </Formik>
  );
}
