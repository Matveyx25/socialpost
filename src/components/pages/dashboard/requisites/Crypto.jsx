import React from 'react'
import s from './requisites.module.scss'
import { DashboardCard } from '../dashboard-card'
import { Select } from '../../../Shared/Select/Select';
import { InputField } from '../../../Shared/Input/Input';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../../Shared/Button/Button';
import { useCryptoWallet, useUpdateCryptoWallet } from '../../../../hooks/publisherBalance';

const currency = [
  { value: 'USDT', label: 'USDT (TRC20)' },
  { value: 'Ethereum', label: 'Ethereum' },
  { value: 'Bitcoin', label: 'Bitcoin' },
  { value: 'Solano', label: 'Solano' },
  { value: 'Cardano', label: 'Cardano' },
];

export const Crypto = () => {
	const {data: crypto, isFetched} = useCryptoWallet()
	const {mutate: updateCryptoWallet} = useUpdateCryptoWallet()

	const validator = Yup.object().shape({
		address: Yup.string()
			.required('Введите адрес'),
		currency: Yup.string()
		.required('Выберите криптовалюту'),
	});

	return (
		<div className={s.formsWrapper}>
			<DashboardCard className={s.formCard}>
				<div className={s.cardHeader}>
				Личные данные
				</div>
				<div className={s.line}></div>
				{isFetched && <Formik
						initialValues={{
							address: crypto?.address,
							currency: crypto?.type
						}}
						validationSchema={validator}
						onSubmit={(values) => {
							updateCryptoWallet({
								"type": values?.currency,
								"address": values?.address
							})
						}}
					>
						{({ dirty, isValid }) => (
							<Form>
								<div className={s.formRow}>
									<Field name="currency">
										{({ field: {value}, form: {setFieldValue}  }) => (
											<Select fullWidth label="Криптовалюта" options={currency} defaultValue={value ? currency.find(e => e.value === value) : null} setSelectedOption={v => setFieldValue('currency', v.value)} className={s.select}/>
										)}
									</Field>
								</div>
								<div className={s.formRow}>
									<InputField label={'Адрес'} name='address' placeholder='TLT3nnK2iYgZ8h19M12TtCPEPsAUFPQLJp' className={s.input}/>
								</div>
								<div className={s.line}></div>
								<div className={s.btns}>
									<Button label="Запомнить данные" theme='secondary' className={s.btn} disabled={!dirty || !isValid}/>
								</div>
							</Form>)}
					</Formik>}
			</DashboardCard>
		</div>
	)
}
