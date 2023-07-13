import React from 'react'
import s from './Contacts.module.scss'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

export const Contacts = () => {
	const phoneRegExp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
	const nameRegExp = /^([\S]+)\s([\S]+)\s([\S]+)?$/

	const validator = Yup.object().shape({
		fullName: Yup.string()
			.matches(nameRegExp, 'Введите ФИО верно')
			.required('Введите ФИО'),
		phone: Yup.string()
			.matches(phoneRegExp, 'Такого номера не существует')
			.required('Заполните поле телефон'),
		email: Yup.string().email('Такого почтового адреса не существует').required('Заполните поле email'),
		message: Yup.string()
			.max(500, 'Максимум 500 символов')
	});
	
	return (
		<div className={s.wrapper}>
			<div className="container">
				<div className={s.flex}>
					<div>
						<h2>Есть вопросы? Напишите нам.</h2>
						<p>Ответим в течение 3 рабочих дней.</p>
						<Formik
							initialValues={{
								fullName: '',
								phone: '',
								email: '',
								message: '',
							}}
							validationSchema={validator}
							onSubmit={async (values) => {
								await new Promise((r) => setTimeout(r, 500));
								alert(JSON.stringify(values, null, 2));
							}}
						>
							{({ errors, touched, values }) => (
								<Form>
									<div className={s.formFlex}>
										<div className={s.lgInput}>
											<div className={`${s.inputWrapper} ${(errors.fullName && touched.fullName) && s.error}`}>
												<label className={s.img} for="fullName">
													<img src="/images/icons/ic/user.svg" alt="" />
												</label>
												<Field id="fullName" name="fullName" placeholder="Введите ФИО" />
											</div>
											{errors.fullName && touched.fullName ? (
												<div className={s.error}>
													<img src="/images/icons/ic/closesquare.svg"/>
													{errors.fullName}
												</div>
											) : null}
										</div>
										<div className={s.smInput}>
											<div className={`${s.inputWrapper} ${(errors.phone && touched.phone) && s.error}`}>
												<label className={s.img} for="phone">
													<img src="/images/icons/ic/phone.svg" alt="" />
												</label>
												<Field id="phone" name="phone" placeholder="Введите номер телефона" />
											</div>
											{errors.phone && touched.phone ? (
												<div className={s.error}>
													<img src="/images/icons/ic/closesquare.svg"/>
													{errors.phone}
												</div>
											) : null}
										</div>
										<div className={s.smInput}>
											<div className={`${s.inputWrapper} ${(errors.email && touched.email) && s.error}`}>
												<label className={s.img} for="email">
													<img src="/images/icons/ic/email.svg" alt="" />
												</label>
												<Field id="email" name="email" placeholder='Введите email'/>
											</div>
											{errors.email && touched.email ? (
												<div className={s.error}>
													<img src="/images/icons/ic/closesquare.svg"/>
													{errors.email}
												</div>
											) : null}
										</div>
										<div className={`${s.textarea} ${(errors.message && touched.message) && s.error}`}>
											<Field name="message" as="textarea" placeholder='Введите сообщение'/>
											<div className={s.counter}>
												{values.message.trim().length}/500
											</div>
											{errors.message && touched.message ? (
												<div className={s.error}>
														<img src="/images/icons/ic/closesquare.svg"/>
														{errors.message}
													</div>
											) : null}
										</div>
									</div>
									<div className={s.btns}>
										<button type='submit' disabled={!values.fullName || !values.phone || !values.email || Object.values(errors).length}>
											Отправить
										</button>
										<a href="https://t.me" className={s.link}>
											Написать в Телеграм
											<img src="/images/icons/tg.svg" alt="" />
										</a>
									</div>
								</Form>)}
						</Formik>
					</div>
					<div className={s.img}>
						<img src="/images/contacts.svg" alt="" />
					</div>
				</div>
			</div>
		</div>
	)
}
