import React, { useState } from 'react'
import s from './filter.module.scss'
import { IconChevronRight, IconReload, IconSearch } from '@tabler/icons-react';
import {  RangeInputsField } from '../../../Filters/RangeInputs';
import { Button } from '../../../Shared/Button/Button';
import { InputField } from '../../../Shared/Input/Input';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
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

export const Filters = ({onFilterSubmit, maxSubscribersNumber, dateRange, setDateRange}) => {
	const [isSended, set_isSended] = useState(false)

  const filterPassedTime = (time) => {
		const now = new Date();
		const minimumBookingTime = new Date(now.getTime());
		minimumBookingTime.setHours(now.getHours() + 5);

		const selectedDate = new Date(time);
	
		return selectedDate >= minimumBookingTime;
	};

  const validator = Yup.object().shape({
    minSubscribers: Yup.string(), 

  });

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
      validationSchema={validator}
      onSubmit={(values) => {
        submitHandler(values);
      }}
    >
      {({ dirty, isValid }) => (
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
            <div className={s.inputsGroup}>
              <h5>Бюджет</h5>
              <RangeInputsField minName={"minBudget"} maxName={"maxBudget"} />
            </div>
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
            {/* <div className={s.inputsGroup}>
              <h5>Бюджет</h5>
							<Field name="type">
								{({ field: { value }, form: { setFieldValue } }) => (
									<Select
										label={"Роль клиента"}
										id="role"
										name="role"
										options={roleOptions}
										required={true}
										placeholder={"Выберите роль"}
										fullWidth={true}
										isMulti={false}
										value={value}
										setSelectedOption={(v) => {
											setFieldValue("role", v.value)
											setRole(v.value)
										}}
									/>
								)}
							</Field>
						</div> */}
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
              <h5>Диапазон размещения</h5>
              <div className={s.calendarsWrapper}>
                <Calendar
                  value={dateRange[0]}
                  placeholder={"От"}
                  minDate={new Date()}
                  showTimeSelect
                  filterTime={filterPassedTime}
									inputClassName={s.firstCalendar}
                  onChange={(v) => setDateRange((prev) => [v, prev[1]])}
                />
                <Calendar
                  value={dateRange[1]}
                  placeholder={"До"}
                  minDate={new Date()}
                  showTimeSelect
                  filterTime={filterPassedTime}
									inputClassName={s.secondCalendar}
                  onChange={(v) => setDateRange((prev) => [prev[0], v])}
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
      )}
    </Formik>
  );
}
