import React from 'react'
import s from './Contacts.module.scss'

export const Contacts = () => {
	return (
		<div className={s.wrapper}>
			<div className="container">
				<div className={s.flex}>
					<div>
						<h2>Есть вопросы? Напишите нам.</h2>
						<p>Ответим в течение 3 рабочих дней.</p>
						<form action="">
							<div className={s.formFlex}>
								<div className={s.lgInput}>
									<div className={s.img}>
										<img src="/images/icons/ic/user.svg" alt="" />
									</div>
									<input type="text" placeholder='Введите ФИО'/>
								</div>
								<div className={s.smInput}>
									<div className={s.img}>
										<img src="/images/icons/ic/phone.svg" alt="" />
									</div>
									<input type="phone" placeholder='Введите номер телефона'/>
								</div>
								<div className={s.smInput}>
									<div className={s.img}>
										<img src="/images/icons/ic/email.svg" alt="" />
									</div>
									<input type="text" placeholder='Введите email'/>
								</div>
								<div className={s.textarea}>
									<textarea placeholder='Введите сообщение'/>
								</div>
							</div>
							<div className={s.btns}>
								<button>
									Отправить
								</button>
								<a href="https://t.me" className={s.link}>
									Написать в Телеграм
									<img src="/images/icons/tg.svg" alt="" />
								</a>
							</div>
						</form>
					</div>
					<div className={s.img}>
						<img src="/images/contacts.svg" alt="" />
					</div>
				</div>
			</div>
		</div>
	)
}
