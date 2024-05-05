import React from 'react'
import s from './requisites.module.scss'
import { DashboardCard } from '../dashboard-card'
import { Select } from '../../../Shared/Select/Select';
import { InputField } from '../../../Shared/Input/Input';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../../Shared/Button/Button';
import { Calendar } from '../../../Shared/Calendar/Calendar';
import { useSelfEmployed, useUpdateSelfEmployed } from '../../../../hooks/publisherBalance';
import { Loader } from '../../../Shared/Loader/Loader';

const counties = [
  { value: 'belarus', label: 'Беларусь' },
  { value: 'Russia', label: 'Россия' },
];

export const SelfEmployed = () => {
	const nameRegExp = /^([\S]+)\s([\S]+)\s([\S]+)?$/

	const {data: selfEmployed} = useSelfEmployed()
	const {mutate: updateSelfEmployed} = useUpdateSelfEmployed()

	const validator = Yup.object().shape({
		fullName: Yup.string()
			.matches(nameRegExp, 'Введите ФИО верно')
			.required('Введите ФИО'),
		seriesPassport: Yup.string()
			.matches(/^\d+$/, 'Серия паспорта должен содержать только цифры')
			.required('Введите серию паспорта'),
		numberPassport: Yup.string()
			.matches(/^\d+$/, 'Номер паспорта должен содержать только цифры')
			.required('Введите номер паспорта'),
		city: Yup.string()
			.required('Введите город рождения'),
		address: Yup.string()
			.required('Введите адрес'),
		snils: Yup.string()
			.matches(/^\d+$/, 'СНИЛС должен содержать только цифры')
			.required('Введите СНИЛС'),
		inn: Yup.string()
			.matches(/^\d+$/, 'ИНН должен содержать только цифры')
			.required('Введите ИНН'),
		accountNumber: Yup.string()
			.matches(/^\d+$/, 'Расчетный счет должен содержать только цифры')
			.required('Введите рассчетный счет'),
		bank: Yup.string()
				.required('Введите банк'),
		bic: Yup.string()
				.matches(/^\d+$/, 'БИК должен содержать только цифры')
				.required('Введите БИК'),
		correspondentAccount: Yup.string()
				.matches(/^\d+$/, 'Корреспондентский счет должен содержать только цифры')
				.required('Введите корреспондентский счет'),
	});

	return (
		<Formik
			enableReinitialize={true}
			initialValues={{
				fullName: selfEmployed?.fullName,
				seriesPassport: selfEmployed?.passportSeries,
				numberPassport: selfEmployed?.passportNumber,
				birthDate: selfEmployed?.birthDate,
				city: selfEmployed?.birthCity,
				address: selfEmployed?.address,
				snils: selfEmployed?.snils,
				inn: selfEmployed?.inn,
				citizenshipCountry: selfEmployed?.citizenshipCountry,
				passportIssueDate: selfEmployed?.passportIssueDate,
				accountNumber: selfEmployed?.bankDetails?.checkingAccount,
				bank: selfEmployed?.bankDetails?.bank,
				bic: selfEmployed?.bankDetails?.bik,
				correspondentAccount: selfEmployed?.bankDetails?.correspondentAccount,
			}}
			validationSchema={validator}
			onSubmit={(values) => {
				updateSelfEmployed({
					passportIssueDate: values?.passportIssueDate,
					citizenshipCountry: values?.citizenshipCountry,
					fullName: values?.fullName,
					passportSeries: values?.seriesPassport,
					passportNumber: values?.numberPassport,
					birthCity: values?.city,
					birthDate: values?.birthDate,
					address: values?.address,
					snils: values?.snils,
					inn: values?.inn,
					bankDetails: {
						checkingAccount: values?.accountNumber,
						bank: values?.bank,
						bik: values?.bic,
						correspondentAccount: values?.correspondentAccount,
					},
				});
			}}
		>
			{({ isValid, dirty }) => (
				<Form>
					<DashboardCard className={s.formsWrapperCard}>
						<div className={s.formsWrapper}>
							<div className={s.formCard}>
								<div className={s.cardHeader}>Личные данные</div>
								<div className={s.line}></div>
								<div className={s.formRow}>
							<Field name="citizenshipCountry">
								{({ field: {value}, form: {setFieldValue}  }) => (
									<Select fullWidth label="Страна гражданства" options={counties} defaultValue={value ? counties.find(e => e.value === value) : null} setSelectedOption={v => setFieldValue('citizenshipCountry', v.value)} className={s.select} headerClassName={s.selectHeader}/>
								)}
							</Field>
							<InputField label={'ФИО'} name='fullName' placeholder='Иванов Иван Иванович' className={s.input}/>
						</div>
						<div className={s.formRow}>
							<InputField label={'Серия паспорта'} name='seriesPassport' placeholder='12345' className={s.input}/>
							<InputField label={'Номер паспорта'} name='numberPassport' placeholder='12345' className={s.input}/>
							<Field name="passportIssueDate">
								{({ field: {value}, form: {setFieldValue} }) => (
									<Calendar placeholder={'11.08.2014'} label={'Выдан'} className={s.calendar} value={value} onChange={v => setFieldValue("passportIssueDate", v.toISOString())}/>
								)}
							</Field>
						</div>
						<div className={s.formRow}>
							<Field name="birthDate">
								{({ field: {value}, form: {setFieldValue}  }) => (
									<Calendar placeholder={'11.08.1998'} label={'Дата рождения'} className={s.calendar} value={value} onChange={v => setFieldValue("birthDate", v.toISOString())}/>
								)}
							</Field>
						</div>
						<div className={s.formRow}>
							<InputField label={'Город рождения'} name='city' placeholder='Минск' className={s.input}/>
							<InputField label={'Адрес'} name='address' placeholder='Железнодорожная 21А' className={s.input}/>
						</div>
						<div className={s.formRow}>
							<InputField label={'СНИЛС'} name='snils' placeholder='12345' className={s.input}/>
							<InputField label={'ИНН'} name='inn' placeholder='12345' className={s.input}/>
						</div>
							</div>
							<div className={s.formCard}>
								<div className={s.cardHeader}>Банковские реквизиты</div>
								<div className={s.line}></div>
								<div className={s.formRow}>
									<InputField
										label={"Расчетный счет"}
										name="accountNumber"
										placeholder="12345"
										className={s.input}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"Банк"}
										name="bank"
										placeholder="12345"
										className={s.input}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"БИК"}
										name="bic"
										placeholder="12345"
										className={s.input}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"Корреспондентский счет"}
										name="correspondentAccount"
										placeholder="30101"
										className={s.input}
									/>
								</div>
							</div>
						</div>
						<div className={s.line}></div>
						<div className={s.btns}>
							<Button
								label="Запомнить данные"
								theme="secondary"
								className={s.btn}
								disabled={!dirty || !isValid}
							/>
						</div>
					</DashboardCard>
				</Form>
			)}
		</Formik>
  );
}
