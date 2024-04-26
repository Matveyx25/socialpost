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
import { auth } from '../../../api/api';
import { toast } from 'react-toastify';

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
		.matches(nameRegExp, 'Введите фамилию верно'),
		password: Yup.string()
      .min(8, "Пароль должен быть не менее 8 символов")
      .matches(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
      .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
      .matches(/\d/, "Пароль должен содержать хотя бы одну цифру")
      .matches(
        /[^a-zA-Z\d]/,
        "Пароль должен содержать хотя бы один специальный символ"
      ),
    secondPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Пароли должны совпадать"),
	});


	const newValues = (values) => {
		const fname = values.firstName;
		const lname = values.lastName
		return fname !== profile.firstName || lname !== profile.lastName
	}

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
							if(props?.password && props?.secondPassword){
								auth.updatePassword({password: props.password}).then(res => {
									toast.success('Пароль обновлен')
									props.password = ''
									props.secondPassword = ''
								})
							}
							if(newValues(props)){
								mutate({
									firstName: props.firstName,
									lastName: props.lastName
								})
							}
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
								<div className={s.formRow}>
									<InputField type='password' label={'Новый пароль'} name='password' placeholder='Новый пароль' className={s.input}/>
									<InputField type='password' label={'Повторите пароль'} name='secondPassword' placeholder='Повторите пароль' className={s.input}/>
								</div>
								<div className={s.line}></div>
								<div className={s.btns}>
									<Button label="Изменить данные" theme='secondary' className={s.btn} leftIcon={<IconEdit/>} 
									disabled={(!dirty && !isValid) || !newValues(values) && (!values?.password || !values?.secondPassword)}/> 
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
