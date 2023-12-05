import React, { useState } from 'react'
import s from './requisites.module.scss'
import { DashboardCard } from '../dashboard-card'
import { Select } from '../../../Shared/Select/Select';
import { Input, InputField } from '../../../Shared/Input/Input';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../../Shared/Button/Button';
import { Calendar } from '../../../Shared/Calendar/Calendar';
import { IconEdit } from '@tabler/icons-react';

const tax = [
  { value: 'OSN', label: 'ОСН' },
  { value: 'USN', label: 'УСН' },
];

export const IndividualEntrepreneur = () => {
	const [selectedTax, setSelectedTax] = useState(tax[0])
	const [filledForm1, setFilledForm1] = useState(false)
	const [filledForm2, setFilledForm2] = useState(false)

	const nameRegExp = /^([\S]+)\s([\S]+)\s([\S]+)?$/

	const validator = Yup.object().shape({
		OGRN: Yup.string()
			.required('Введите ОГРН'),
		address: Yup.string()
			.required('Введите адрес'),
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
							inn: '',
							OGRN: '',
							address: '',
						}}
						validationSchema={validator}
						onSubmit={() => {
							setFilledForm1(true)
						}}
					>
						{({ isValid, dirty }) => (
							<Form>
								<div className={s.formRow}>
									<InputField label={'ИНН'} name='inn' placeholder='12345' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<Select fullWidth label="Система налогообложения" options={tax} defaultValue={selectedTax} setSelectedOption={setSelectedTax} className={s.select}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'ОГРН'} name='OGRN' placeholder='Иванов Иван Иванович' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'Адрес'} name='address' placeholder='Железнодорожная 21А' className={s.input}/>
								</div>
								<div className={s.line}></div>
								<div className={s.btns}>
									{filledForm1 ? <Button label="Изменить данные" theme='secondary' className={s.btn} leftIcon={<IconEdit/>}/> : 
									<Button label="Запомнить данные" theme='secondary' className={s.btn} disabled={!isValid || !dirty}/>}
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
							setFilledForm2(true)
						}}
					>
						{({ dirty, isValid }) => (
							<Form>
								<div className={s.formRow}>
									<InputField label={'Расчетный счет'} name='accountNumber' placeholder='12345' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'В'} name='b' placeholder='12345' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'БИК'} name='bic' placeholder='12345' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'Корреспондентский счет'} name='correspondentAccount' placeholder='30101' className={s.input}/>
								</div>
								<div className={s.line}></div>
								<div className={s.btns}>
								{filledForm2 ? <Button label="Изменить данные" theme='secondary' className={s.btn} leftIcon={<IconEdit/>}/> : 
									<Button label="Запомнить данные" theme='secondary' className={s.btn} disabled={!dirty || !isValid}/>}
								</div>
							</Form>)}
					</Formik>
			</DashboardCard>
		</div>
	)
}
