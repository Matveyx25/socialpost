import React, { useState } from 'react'
import s from './requisites.module.scss'
import { DashboardCard } from '../dashboard-card'
import { Select } from '../../../Shared/Select/Select';
import { InputField } from '../../../Shared/Input/Input';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../../Shared/Button/Button';
import { useLegalEntity, useLegalEntityBankDetails, useUpdateLegalEntity, useUpdateLegalEntityBankDetails } from '../../../../hooks/publisherBalance';
import { Loader } from '../../../Shared/Loader/Loader';

const tax = [
  { value: 'OSN', label: 'ОСН' },
  { value: 'USN', label: 'УСН' },
];

export const Entity = () => {
	const {data: LegalEntity, isFetched} = useLegalEntity()
	const {mutate: updateLegalEntity} = useUpdateLegalEntity()

	const {data: LegalEntityBankDetails, isFetched: isFetchedBankDetails} = useLegalEntityBankDetails()
	const {mutate: updateLegalEntityBankDetails} = useUpdateLegalEntityBankDetails()

	const validator = Yup.object().shape({
		OGRN: Yup.string()
		.matches(/^\d+$/, 'ОГРН должен содержать только цифры')
			.required('Введите ОГРН'),
		entityAddress: Yup.string()
			.required('Введите юридический адрес'),
		correspondentAddress: Yup.string()
			.required('Введите адрес для корреспонденции'),
		taxSystem: Yup.string().required('Выберите систему налогообложения'),
		inn: Yup.string()
		.matches(/^\d+$/, 'ИНН должен содержать только цифры')
			.required('Введите ИНН'),
	});

	const validator2 = Yup.object().shape({
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
		<div className={s.formsWrapper}>
			<DashboardCard className={s.formCard}>
				<div className={s.cardHeader}>
				Личные данные
				</div>
				<div className={s.line}></div>
				{isFetched ? <Formik
						initialValues={{
							inn: LegalEntity?.inn,
							OGRN: LegalEntity?.ogrn,
							correspondentAddress: LegalEntity?.correspondenceAddress,
							entityAddress: LegalEntity?.legalAddress,
							taxSystem: LegalEntity?.taxSystem
						}}
						validationSchema={validator}
						onSubmit={(values) => {
							updateLegalEntity({
									"inn": values?.inn,
									"taxSystem": values?.taxSystem,
									"ogrn": values?.OGRN,
									"legalAddress": values?.entityAddress,
									"correspondenceAddress": values?.correspondentAddress
							})
						}}
					>
						{({ dirty, isValid }) => (
							<Form>
								<div className={s.formRow}>
									<InputField label={'ИНН'} name='inn' placeholder='12345' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<Field name="taxSystem">
										{({ field: {value}, form: {setFieldValue}  }) => (
											<Select fullWidth label="Система налогообложения" options={tax} defaultValue={value ? tax.find(e => e.value === value) : null} setSelectedOption={v => setFieldValue('taxSystem', v.value)} className={s.select}/>
										)}
									</Field>
								</div>
								<div className={s.formRow}>
									<InputField label={'ОГРН'} name='OGRN' placeholder='1-02-66-05-60662-0' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'Юридический адрес'} name='entityAddress' placeholder='Железнодорожная 21А' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'Адрес для корреспонденции'} name='correspondentAddress' placeholder='Железнодорожная 21А' className={s.input}/>
								</div>
								<div className={s.line}></div>
								<div className={s.btns}>
									<Button label="Запомнить данные" theme='secondary' className={s.btn} disabled={!dirty || !isValid}/>
								</div>
							</Form>)}
					</Formik> : <Loader/>}
			</DashboardCard>
			<DashboardCard className={s.formCard}>
				<div className={s.cardHeader}>
				Банковские реквизиты
				</div>
				<div className={s.line}></div>
				{isFetchedBankDetails ? <Formik
						initialValues={{
							accountNumber: LegalEntityBankDetails?.checkingAccount,
							bank: LegalEntityBankDetails?.bank,
							bic: LegalEntityBankDetails?.bik,
							correspondentAccount: LegalEntityBankDetails?.correspondentAccount,
						}}
						validationSchema={validator2}
						onSubmit={(values) => {
							updateLegalEntityBankDetails({
								checkingAccount: values?.accountNumber,
								bank: values?.bank,
								bik: values?.bic,
								correspondentAccount: values?.correspondentAccount,
							})
						}}
					>
						{({ dirty, isValid }) => (
							<Form>
								<div className={s.formRow}>
									<InputField label={'Расчетный счет'} name='accountNumber' placeholder='12345' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'Банк'} name='bank' placeholder='12345' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'БИК'} name='bic' placeholder='12345' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'Корреспондентский счет'} name='correspondentAccount' placeholder='30101' className={s.input}/>
								</div>
								<div className={s.line}></div>
								<div className={s.btns}>
								<Button label="Запомнить данные" theme='secondary' className={s.btn} disabled={!dirty || !isValid}/>
								</div>
							</Form>)}
					</Formik> : <Loader/>}
			</DashboardCard>
		</div>
	)
}
