import React, { useState } from 'react'
import s from './requisites.module.scss'
import { DashboardCard } from '../dashboard-card'
import { Select } from '../../../Shared/Select/Select';
import { InputField } from '../../../Shared/Input/Input';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../../Shared/Button/Button';
import { IconEdit } from '@tabler/icons-react';
import { useIE, useIEBankDetails, useUpdateIE, useUpdateIEBankDetails } from '../../../../hooks/publisherBalance';
import { Loader } from '../../../Shared/Loader/Loader';

const tax = [
  { value: 'OSN', label: 'ОСН' },
  { value: 'USN', label: 'УСН' },
];

export const IndividualEntrepreneur = () => {
	const {data: IE, isFetched} = useIE()
	const {mutate: updateIE} = useUpdateIE()

	const {data: IEBankDetails, isFetched: isFetchedBankDetails} = useIEBankDetails()
	const {mutate: updateIEBankDetails} = useUpdateIEBankDetails()

	const [selectedTax, setSelectedTax] = useState(tax[0])
	const [filledForm1, setFilledForm1] = useState(false)
	const [filledForm2, setFilledForm2] = useState(false)

	const validator = Yup.object().shape({
		OGRN: Yup.string()
		.matches(/^\d+$/, 'ОГРН должен содержать только цифры')
			.required('Введите ОГРН'),
		address: Yup.string()
			.required('Введите адрес'),
		taxSystem: Yup.string().required('Выберите систему налогообложения'),
		inn: Yup.string()
			.matches(/^\d+$/, 'ИНН должен содержать только цифры')
			.required('Введите ИНН'),
	});

	const validator2 = Yup.object().shape({
		accountNumber: Yup.string()
			 .matches(/^\d+$/, 'Расчетный счет должен содержать только цифры')
			.required('Введите рассчетный счет'),
		b: Yup.string()
			 .matches(/^\d+$/, 'В должен содержать только цифры')
			.required('Введите B'),
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
							inn: IE?.inn,
							OGRN: IE?.ogrn,
							address: IE?.address,
							taxSystem: IE?.taxSystem
						}}
						validationSchema={validator}
						onSubmit={(values) => {
							updateIE({
								inn: values?.inn,
								ogrn: values?.OGRN,
								address: values?.address,
								taxSystem: values?.taxSystem
							})
						}}
					>
						{({ isValid, dirty }) => (
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
									<InputField label={'Адрес'} name='address' placeholder='Железнодорожная 21А' className={s.input}/>
								</div>
								<div className={s.line}></div>
								<div className={s.btns}>
									{filledForm1 ? <Button label="Изменить данные" theme='secondary' className={s.btn} leftIcon={<IconEdit/>}/> : 
									<Button label="Запомнить данные" theme='secondary' className={s.btn} disabled={!isValid || !dirty}/>}
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
							accountNumber: IEBankDetails?.checkingAccount,
							b: IEBankDetails?.bank,
							bic: IEBankDetails?.bik,
							correspondentAccount: IEBankDetails?.correspondentAccount,
						}}
						validationSchema={validator2}
						onSubmit={(values) => {
							updateIEBankDetails({
								checkingAccount: values?.accountNumber,
								bank: values?.b,
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
								<Button label="Запомнить данные" theme='secondary' className={s.btn} disabled={!dirty || !isValid}/>
								</div>
							</Form>)}
					</Formik> : <Loader/>}
			</DashboardCard>
		</div>
	)
}
