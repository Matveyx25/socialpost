import React, { useState } from 'react'
import s from './profile.module.scss'
import { DashboardCard } from '../dashboard/dashboard-card'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import { InputField } from '../../Shared/Input/Input';
import { Button } from '../../Shared/Button/Button';
import { IconCheck, IconEdit, IconExternalLink } from '@tabler/icons-react';
import { useOutletContext } from 'react-router-dom';
import TelegramLoginButton from 'telegram-login-button';
import { useProfile } from '../../../hooks/useProfile';
import { useUpdateProfile } from '../../../hooks/useUpdateProfile';
import { useConnectTelegram } from '../../../hooks/useConnectTelegram';

export const Profile = () => {
	const [setModal] = useOutletContext()
	
	const { mutate } = useUpdateProfile()

	const { mutate: connectTelegramMutate } = useConnectTelegram()

	const {data: profile} = useProfile()

	const nameRegExp = /^([\S]+)?$/

	const validator = Yup.object().shape({
		firstName: Yup.string()
		.matches(nameRegExp, 'Введите имя верно')
			.required('Введите имя'),
		lastName: Yup.string().notRequired()
		.matches(nameRegExp, 'Введите фамилию верно')
	});

	return (
		<div className={s.wrapper}>
			<DashboardCard className={s.formCard}>
				<div className={s.cardHeader}>
				Личные данные
				</div>
				<div className={s.line}></div>
				<Formik
						initialValues={{
							firstName: profile?.firstName || '',
							lastName: profile?.lastName || '',
						}}
						validationSchema={validator}
						onSubmit={(props) => {
							mutate({
								firstName: props.firstName,
								lastName: props.lastName
							})
						}}
					>
						{({ dirty, isValid, values }) => (
							<Form>
								<div className={s.formRow}>
									<InputField label={'Ваше имя'} name='firstName' placeholder='Иван' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'Ваша фамилия'} name='lastName' placeholder='Иванов' className={s.input}/>
								</div>
								<div className={s.line}></div>
								<div className={s.btns}>
									<Button label="Изменить данные" theme='secondary' className={s.btn} leftIcon={<IconEdit/>} 
									disabled={!dirty || !isValid || 
										(values.firstName === (profile?.firstName || '') && values.lastName === (profile?.lastName || ''))}/> 
								</div>
							</Form>)}
					</Formik>
			</DashboardCard>
			 <DashboardCard className={s.formCard}>
				<div className={s.cardHeader}>
				Социальные сети и аккаунты
				</div>
				<div className={s.line}></div>
					<div className={s.formRow}>
							<div className={s.jcsb}>
								<p>Привязать эл.почту</p>
								{profile?.emailData?.email ? 
								<IconCheck className={s.checkIcon}/> :
									<a href='#' onClick={() => setModal('connect-email')}>
										<IconExternalLink/>
									</a>}
							</div>
					</div>
					<div className={s.formRow}>
						<div className={s.jcsb}>
							<p>Привязать telegram</p>
							{profile?.telegramData ? 
								<IconCheck className={s.checkIcon}/>
								: <TelegramLoginButton
									botName={process.env.REACT_APP_TG_BOT_NAME}
									buttonSize='small'
									dataOnauth={(data) => connectTelegramMutate(data)}
							/>}
						</div>
					</div>
			</DashboardCard>
		</div>
	)
}
