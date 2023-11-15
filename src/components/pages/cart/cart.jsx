import React, { useEffect, useState } from 'react'
import s from './cart.module.scss'
import channels from '../../../data/channels.json'
import { Counter } from '../../Shared/Counter/Counter';
import { IconSquare, IconSquareCheckFilled, IconTrash } from '@tabler/icons-react';
import emailjs from '@emailjs/browser';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../Shared/Button/Button';
import { InputField } from '../../Shared/Input/Input';
import ReactDomServer from 'react-dom/server';
import { NavLink } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';

export const Cart = () => {
	const getSum = () => {
  return !cart.length || cart.map(el => ({ ...channels.find(e => e.id === el.id), count: el.count }))
    .reduce((a, b) =>
      a + (b.price?.replace(/\s/g, '') || 0) * b.count, 0);
	};

	const [payingNotice, set_payingNotice] = useState(false)
	const [policy, set_policy] = useState(false)
	
	const [cart, set_cart] = useState(() => {
		const saved = localStorage.getItem("cart");
		const initialValue = JSON.parse(saved);
		return initialValue || "";
	});
	const [sum, set_sum] = useState(() => getSum())

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
		set_sum(getSum())
	}, [cart])


	const removeFromCart = (id) => {
		set_cart(cart?.filter(el => el.id !== id))
	}

	const phoneRegExp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
	const nameRegExp = /^([\S]+)\s([\S]+)\s([\S]+)?$/
	const tgRegExp = /^[\S]+$/;

	const [isSended, setIsSended] = useState(false)

	const validator = Yup.object().shape({
		fullName: Yup.string()
			.matches(nameRegExp, 'Введите ФИО верно')
			.required('Введите ФИО'),
		phone: Yup.string()
			.matches(phoneRegExp, 'Такого номера не существует'),
		tg: Yup.string()
			.matches(tgRegExp, 'Такого ника не существует'),
		email: Yup.string().email('Такого почтового адреса не существует').required('Заполните поле email'),
	});

	const renderHtmlEmail = (values) => {
		return (
			<>
				<p>От {values.fullName},</p>
					<p>Email {values.email},</p>
					{values.phone && <p>Телефон {values.phone},</p>}
					{values.tg && <p>Телеграмм {values.tg},</p>}
					<p>Корзина</p>
					<table style={{ borderCollapse: 'collapse', width: '100%' }}>
						<thead>
							<tr>
								<th style={{ border: '1px solid black', padding: '8px' }}>Название постов</th>
								<th style={{ border: '1px solid black', padding: '8px' }}>Формат размещений</th>
								<th style={{ border: '1px solid black', padding: '8px' }}>Кол-во размещений</th>
								<th style={{ border: '1px solid black', padding: '8px' }}>Общая стоимость размещений</th>
							</tr>
						</thead>
						<tbody>
							{cart.map((el) => {
								const channel = channels.find(e => e.id === el.id)
								return ( 
										<tr key={channel.id}>
											<td style={{ border: '1px solid black', padding: '8px' }}>{channel.title}</td>
											<td style={{ border: '1px solid black', padding: '8px' }}>Нативный</td>
											<td style={{ border: '1px solid black', padding: '8px' }}>{el.count}</td>
											<td style={{ border: '1px solid black', padding: '8px' }}>{+channel?.price.replace(/\s/g, '') * +el.count}₽</td>
										</tr>
									)
								})}
						</tbody>
					</table>
					<p>
						Итого: <strong>{cart.length ? (sum + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,') 
							: '0'} ₽</strong>
					</p>
				</>
		)
	}

	const sendEmail = (values) => {
		const html = renderHtmlEmail(values)
    emailjs.send('service_rgqkma5', 'template_dh599xr', 
		{user_name: values.fullName,
			myHTML: ReactDomServer.renderToString(html)
		},
		 '-y8sIbyiQNpb85idG')
      .then((result) => {
				setIsSended(true)
      }, (error) => {
          console.log(error.text);
      });
  };

	return (
		<div className={`${s.screen} ${isSended && s.sended}`}>
			{isSended ? 
			<div className={s.successWrapper}>
				<h2>Письмо успешно отправлено и <br/> скоро прибудет к нам. </h2>
				<p>А пока...</p>
				<NavLink to="/channels-catalog">Вернуться к каталогу</NavLink>
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
			<div className={s.wrapper}>
				<div className="container">
					<h2 className={s.title}>
						Корзина
					</h2>
					<div className={s.flex}>
						<table className={s.table}>
								<thead>
										<tr>
												<th>Название постов</th>
												<th>Формат размещений</th>
												<th>Кол-во размещений</th>
												<th>Общая стоимость размещений</th>
												<th></th>
										</tr>
								</thead>
								<tbody>
										{cart.length ? cart.map((el) => {
											const channel = channels.find(e => e.id === el.id)
											return (
												<tr key={'row-in-cart-' + channel.id}>
														<td>
															<div>
																{channel?.title}
															</div>
														</td>
														<td>
															<div>
																Нативный
															</div>
														</td>
														<td>

															<Counter value={el.count} min={1} max={Infinity} onChange={(value) => {
																	const newState = cart.map(obj => {
																		if (obj.id === el.id) {
																			return {...obj, count: value};
																		}

																		return obj;
																	});
															
																	set_cart(newState)
																}}/>
														</td>
														<td>
															<div>
																{+channel?.price.replace(/\s/g, '') * +el.count}₽
															</div>
														</td>
														<td>
															<div>
																<button className={s.removeBtn}>
																	<IconTrash size={24} color='#436CFF' onClick={() => removeFromCart(channel.id)}/>
																</button>
															</div>
														</td>
												</tr>
											)
										}) : <tr>
											<td></td>
											<td></td>
											<td>
												<p>
													<br />
														Корзина пуста
													<br />
													<br />
												</p>
											</td>
											<td></td>
											<td></td>
										</tr>}
								</tbody>
						</table>
						<div className={s.cardWrapper}>
							<h5>Ваш заказ</h5>
							<Formik
								initialValues={{
									fullName: '',
									phone: '',
									email: '',
									tg: '',
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
											<InputField label={'ФИО'} name='fullName' placeholder='Введите ваше ФИО' required className={s.input}/>
											<InputField label={'E-mail'} name='email' placeholder='Введите ваш e-mail' required className={s.input}/>
											<InputField label={'Телефон'} name='phone' placeholder='Введите ваш телефон' className={s.input}/>
											<InputField label={'Telegram'} name='tg' placeholder='Введите ваш ник в Telegram' className={s.input}/>
										</div>
										<span className={s.line}></span>
										<p className={s.price}>
											<span>Итого </span> 
											<span>{cart.length ? (sum + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,') : '0'} ₽</span>
										</p>
										<span className={s.line}></span>
										<div className={`${s.checkbox + ' ' + s.sm}`}>	
											<input type="checkbox" name="payingNotice" id="payingNotice" checked={payingNotice} onChange={() => set_payingNotice(prev => !prev)}/>
											<label htmlFor="payingNotice">
												<IconSquare className={s.checkboxIcon} size={20}/>
												<IconSquareCheckFilled className={s.checkboxIcon} size={20}/>
												<span>
													Обращаем ваше вниманием, что до момента оплаты администраторы каналов вправе отказаться от размещения или изменить его стоимость в зависимости от поста.
												</span>
											</label>
										</div>
										<div className={`${s.checkbox + ' ' + s.sm}`}>	
											<input type="checkbox" name="policy" id="policy" checked={policy} onChange={() => set_policy(prev => !prev)}/>
											<label htmlFor="policy">
												<IconSquare className={s.checkboxIcon} size={20}/>
												<IconSquareCheckFilled className={s.checkboxIcon} size={20}/>
												<span>
													Принимаю <NavLink to={'/policy'}>политику конфидециальности</NavLink>
												</span>
											</label>
										</div>
										<div className={s.btns}>
											<Button label="Оформить заказ" disabled={!values.fullName || !values.email || !policy || !payingNotice || !cart.length || Object.values(errors).length} className={s.btn}/> 
										</div>
									</Form>)}
							</Formik>
						</div>
					</div>
				</div>
			</div>
		}
		</div>
	)
}
