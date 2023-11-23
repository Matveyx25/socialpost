import React, { useState } from 'react'
import s from './requisites.module.scss'
import { DashboardCard } from '../dashboard-card'
import { Select } from '../../../Shared/Select/Select';
import { Input, InputField } from '../../../Shared/Input/Input';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../../Shared/Button/Button';
import { Calendar } from '../../../Shared/Calendar/Calendar';

const counties = [
  { value: 'belarus', label: 'Беларусь' },
  { value: 'Russia', label: 'Россия' },
];

export const SelfEmployed = () => {
	const [selectedCountry, setSelectedCountry] = useState(counties[0])

	const nameRegExp = /^([\S]+)\s([\S]+)\s([\S]+)?$/

	const validator = Yup.object().shape({
		fullName: Yup.string()
			.matches(nameRegExp, 'Введите ФИО верно')
			.required('Введите ФИО'),
		seriesPassport: Yup.string()
			.required('Введите серию паспорта'),
		numberPassport: Yup.string()
			.required('Введите номер паспорта'),
		city: Yup.string()
			.required('Введите город рождения'),
		address: Yup.string()
			.required('Введите адрес'),
		cnils: Yup.string()
			.required('Введите СНИЛС'),
		inn: Yup.string()
			.required('Введите ИНН'),
	});

	const validator2 = Yup.object().shape({
		accountNumber: Yup.string()
			.required('Введите рассчетный счет'),
		b: Yup.string()
			.required('Введите B'),
		bic: Yup.string()
			.required('Введите БИК'),
		correspondentAccount: Yup.string()
			.required('Введите корреспондентский счет'),
	});


	return (
		<div className={s.formsWrapper}>
			<DashboardCard className={s.formCard}>
				<div className={s.cardHeader}>
				Личные данные
				</div>
				<div className={s.line}></div>
				<Formik
						initialValues={{
							fullName: '',
							seriesPassport: '',
							numberPassport: '',
							city: '',
							address: '',
							cnils: '',
							inn: ''
						}}
						validationSchema={validator}
						onSubmit={(values) => {
							
						}}
					>
						{({ errors, touched, values }) => (
							<Form>
								<div className={s.formRow}>
									<Select fullWidth label="Страна гражданства" options={counties} defaultValue={selectedCountry} setSelectedOption={setSelectedCountry} className={s.select}/>
									<InputField label={'ФИО'} name='fullName' placeholder='Иванов Иван Иванович' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'Серия паспорта'} name='seriesPassport' placeholder='12345' className={s.input}/>
									<InputField label={'Номер паспорта'} name='numberPassport' placeholder='12345' className={s.input}/>
									<Calendar placeholder={'11.08.2014'} label={'Выдан'} className={s.calendar}/>
								</div>
								<div className={s.formRow}>
									<Calendar placeholder={'11.08.1998'} label={'Дата рождения'} className={s.calendar}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'Город рождения'} name='city' placeholder='Минск' className={s.input}/>
									<InputField label={'Адрес'} name='address' placeholder='Железнодорожная 21А' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'СНИЛС'} name='snils' placeholder='12345' className={s.input}/>
									<InputField label={'ИНН'} name='inn' placeholder='12345' className={s.input}/>
								</div>
								<div className={s.line}></div>
								<div className={s.btns}>
									<Button label="Запомнить данные" theme='secondary' className={s.btn}/> 
								</div>
							</Form>)}
					</Formik>
			</DashboardCard>
			<DashboardCard className={s.formCard}>
				<div className={s.cardHeader}>
				Банковские реквизиты
				</div>
				<div className={s.line}></div>
				<Formik
						initialValues={{
							accountNumber: '',
							b: '',
							bic: '',
							correspondentAccount: '',
						}}
						validationSchema={validator2}
						onSubmit={(values) => {
							
						}}
					>
						{({ errors, touched, values }) => (
							<Form>
								<div className={s.formRow}>
									<InputField label={'Расчетный счет'} name='accountNumber' placeholder='12345' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'В'} name='b' placeholder='12345' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'БИК'} name='city' placeholder='12345' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'Корреспондентский счет'} name='correspondentAccount' placeholder='30101' className={s.input}/>
								</div>
								<div className={s.line}></div>
								<div className={s.btns}>
									<Button label="Запомнить данные" theme='secondary' className={s.btn}/> 
								</div>
							</Form>)}
					</Formik>
			</DashboardCard>
		</div>
	)
}
