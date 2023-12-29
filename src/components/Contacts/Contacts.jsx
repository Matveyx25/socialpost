import React, { useEffect, useState } from 'react'
import s from './Contacts.module.scss'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import emailjs from '@emailjs/browser';
import { useMediaQuery } from 'react-responsive';

export const Contacts = () => {
	const phoneRegExp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
	const nameRegExp = /^([\S]+)\s([\S]+)\s([\S]+)?$/
	const isMobile = useMediaQuery({
    query: '(max-width: 756px)'
  })

	const [isSended, setIsSended] = useState(false)

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

	const sendEmail = (values) => {
    emailjs.send('service_rgqkma5', 'template_3dbg9ge', 
		{user_name: values.fullName,
		user_phone: values.phone,
		user_email: values.email,
		message: values.message,
		},
		 '-y8sIbyiQNpb85idG')
      .then((result) => {
				setIsSended(true)
      }, (error) => {
          console.log(error.text);
      });
  };
	
	return (
		<div className={`${s.wrapper} ${isSended && s.sended}`}>
			{isSended ? 
			<div className={s.successWrapper}>
				<h2>Письмо успешно отправлено и <br/> скоро прибудет к нам. </h2>
				<p>А пока...</p>
				<NavLink to="/">Вернуться на главную</NavLink>
				<img src="/images/contacts-path.svg" alt="" />
				<div className={s.plane}>
						<Player
							autoplay
							loop
							src="/lotties/Plane.json"
							speed={.7}
							style={{ height: '100%', objectFit:'cover'}}
						/>
				</div>
			</div>
			:
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
							onSubmit={(values) => {
								setTimeout(() => {
									sendEmail(values)
								}, 1000)
							}}
						>
							{({ errors, touched, values }) => (
								<Form>
									<div className={s.formFlex}>
										<div className={s.lgInput}>
											<div className={`${s.inputWrapper} ${(errors.fullName && touched.fullName) && s.errorWrapper}`}>
												<label className={s.img} htmlFor="fullName">
													<img src={(errors.fullName && touched.fullName) ? "/images/icons/ic/user-error.svg" : "/images/icons/ic/user.svg"} alt="" />
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
											<div className={`${s.inputWrapper} ${(errors.phone && touched.phone) && s.errorWrapper}`}>
												<label className={s.img} htmlFor="phone">
													<img src={(errors.phone && touched.phone) ? "/images/icons/ic/phone-error.svg" : "/images/icons/ic/phone.svg"} alt="" />
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
											<div className={`${s.inputWrapper} ${(errors.email && touched.email) && s.errorWrapper}`}>
												<label className={s.img} htmlFor="email">
													<img src={(errors.email && touched.email) ? "/images/icons/ic/email-error.svg" : "/images/icons/ic/email.svg"} alt="" />
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
										<div className={`${s.textarea} ${(errors.message && touched.message) && s.errorWrapper}`}>
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
										<button 
											type='submit'
											disabled={!values.fullName || !values.phone || !values.email || Object.values(errors).length}>
											Отправить
										</button>
										<a href='https://t.me/socialpost_support' target='_blank' className={s.link}> 
											Написать в Телеграм
											<img src="/images/icons/ic/tg.svg" alt="" />
										</a>
									</div>
								</Form>)}
						</Formik>
					</div>
					{isMobile || <div className={s.img}>
						<Player
							autoplay
							loop
							src="/lotties/contacts.json"
							speed={.7}
							style={{ height: '100%', width: '100%', objectFit:'contain' }}
						/>
					</div>}
				</div>
			</div>}
		</div>
	)
}
