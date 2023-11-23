import React, { useState } from 'react'
import s from './requisites.module.scss'
import { DashboardCard } from '../dashboard-card'
import { Select } from '../../../Shared/Select/Select';
import { Input, InputField } from '../../../Shared/Input/Input';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../../Shared/Button/Button';
import { Calendar } from '../../../Shared/Calendar/Calendar';

const crypto = [
  { value: 'USDT (TRC20)', label: 'USDT (TRC20)' },
  { value: 'Ethereum', label: 'Ethereum' },
  { value: 'Bitcoin', label: 'Bitcoin' },
  { value: 'Solano', label: 'Solano' },
  { value: 'Cardano', label: 'Cardano' },
];

export const Crypto = () => {
	const [selectedCrypto, setSelectedCrypto] = useState(crypto[0])

	const validator = Yup.object().shape({
		address: Yup.string()
			.required('Введите адрес'),
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
							address: ''
						}}
						validationSchema={validator}
						onSubmit={(values) => {
							
						}}
					>
						{({ errors, touched, values }) => (
							<Form>
								<div className={s.formRow}>
									<Select fullWidth label="Криптовалюта" options={crypto} defaultValue={selectedCrypto} setSelectedOption={setSelectedCrypto} className={s.select}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'Адрес'} name='address' placeholder='TLT3nnK2iYgZ8h19M12TtCPEPsAUFPQLJp' className={s.input}/>
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
