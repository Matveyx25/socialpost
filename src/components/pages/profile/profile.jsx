import React, { useState } from 'react'
import s from './profile.module.scss'
import { DashboardCard } from '../dashboard/dashboard-card'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import { InputField } from '../../Shared/Input/Input';
import { Button } from '../../Shared/Button/Button';
import { IconEdit, IconExternalLink, IconLink } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profile as profileApi } from '../../../api/api';
import { useOutletContext } from 'react-router-dom';
import TelegramLoginButton from 'telegram-login-button';

export const Profile = () => {
	const [setModal] = useOutletContext()

	const queryClient = useQueryClient()
	
	const { mutate } = useMutation({
		mutationFn: profileApi.updateProfile,
		onSuccess: () => {
      queryClient.invalidateQueries('profile')
    },
	})

	const { mutate: connectTelegramMutate } = useMutation({
		mutationFn: profileApi.connectTelegram,
		onSuccess: () => {
      queryClient.invalidateQueries('profile')
    },
	})

	const {data: profile} = useQuery({queryKey: ['profile'], queryFn: profileApi.me})

	const nameRegExp = /^([\S]+)?$/

	const validator = Yup.object().shape({
		firstName: Yup.string()
		.matches(nameRegExp, 'Введите имя верно')
			.required('Введите имя'),
		lastName: Yup.string()
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
							firstName: profile?.data.firstName,
							lastName: profile?.data.lastName,
						}}
						validationSchema={validator}
						onSubmit={(props) => {
							mutate({
								firstName: props.firstName,
								lastName: props.lastName
							})
						}}
					>
						{({ dirty, isValid }) => (
							<Form>
								<div className={s.formRow}>
									<InputField label={'Ваше имя'} name='firstName' placeholder='Иван' className={s.input}/>
								</div>
								<div className={s.formRow}>
									<InputField label={'Ваша фамилия'} name='lastName' placeholder='Иванов' className={s.input}/>
								</div>

								<div className={s.line}></div>
								<div className={s.btns}>
									<Button label="Изменить данные" theme='secondary' className={s.btn} leftIcon={<IconEdit/>} disabled={!dirty || !isValid}/> 
								</div>
							</Form>)}
					</Formik>
			</DashboardCard>
			{(profile?.data.telegramData && profile?.data.emailData) ? null :
			 <DashboardCard className={s.formCard}>
				<div className={s.cardHeader}>
				Социальные сети и аккаунты
				</div>
				<div className={s.line}></div>
					<div className={s.formRow}>
						{/* <InputField label={'Ваш email'} name='email' placeholder='example@exampl.com' className={s.input}/> */}
						{profile?.data.emailData?.email ? null :
							<div className={s.jcsb}>
								<p>Привязать эл.почту</p>
							<a href='#' onClick={() => setModal('connect-email')}>
								<IconExternalLink/>
							</a>
							</div>}
					</div>
					<div className={s.formRow}>
						{/* <InputField label={'Ваш email'} name='email' placeholder='example@exampl.com' className={s.input}/> */}
						{profile?.data.telegramData ? null :
						<div className={s.jcsb}>
							<p>Привязать telegram</p>
							<TelegramLoginButton
								botName='socialpost_ru_bot'
								buttonSize='small'
								dataOnauth={(data) => connectTelegramMutate(data)}
							/>
						</div>
						}
					</div>
			</DashboardCard>}
		</div>
	)
}
