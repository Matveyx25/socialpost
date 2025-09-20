import React, { useState } from 'react'
import s from './filter.module.scss'
import { IconChevronDown, IconChevronUp, IconReload, IconSearch } from '@tabler/icons-react';
import { Button } from '../../../Shared/Button/Button';
import { InputField } from '../../../Shared/Input/Input';
import { Form, Formik } from 'formik';
import { RangeCalendar } from '../../../Shared/RangeCalendar/RangeCalendar';
import { TimeRange } from '../../../Shared/RangeCalendar/TimeRange';
import Dropdown from 'react-dropdown';
import { transformDuration } from '../../../../helpers/transformDuratuin';

export const Filters = ({onFilterSubmit, timeRange, setTimeRange, selectedFormat, campaignType, durations, setSelectedFormat, dateRange, setDateRange}) => {
	const [isSended, set_isSended] = useState(false)

	const isMoreThanFiveHoursLeft = () => {
		const now = new Date();
		const fiveHoursFromNow = new Date();
		fiveHoursFromNow.setHours(now.getHours() + 5);
		return now < fiveHoursFromNow;
	};

	const minDate = isMoreThanFiveHoursLeft() ? new Date() : new Date().setDate(new Date().getDate() + 1);

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
					{(durations?.length > 0 && campaignType !== 'NATIVE_POST') && <div className={s.dropdownWrapper}>
							<span className={s.label}>
								Формат размещения
							</span>
							<Dropdown
								value={selectedFormat}
								options={durations?.map((_) => ({
									value: _.id,
									label: transformDuration(_),
								}))}
								placeholder={'Выберите формат...'}
								className={s.formats}
								onChange={setSelectedFormat}
								arrowClosed={<IconChevronDown size={18} />}
								arrowOpen={<IconChevronUp size={18} />}
							/>
					</div>}
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
						<RangeCalendar {...{dateRange, setDateRange}}
						minDate={minDate}
						inputsWrapperClassName={s.calendarInputs}/>
						<TimeRange {...{dateRange, timeRange, setTimeRange}}
						inputsWrapperClassName={s.calendarInputs}/>
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
