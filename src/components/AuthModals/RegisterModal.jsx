import { Modal } from "../Shared/Modal/Modal";
import s from './LoginModal.module.scss'
import { Input } from '../Shared/Input/Input';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Button } from '../Shared/Button/Button';
import { auth } from "../../api/api";
import TelegramLoginButton from "telegram-login-button";

export const RegisterModal = ({isOpen, setOpen}) => {
	const [login, set_login] = useState('')
	const [name, set_name] = useState('')
	const [password, set_password] = useState('')
	const [passwordSecond, set_passwordSecond] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		if(!password || !login || password !== passwordSecond || !name){
			return null
		}

		auth.registrationEmail({
			"email": login,
			"password": password,
			"firstName": name
		}).then(res => {
			if(res.status === 200){
				auth.loginEmail({
					"email": login,
					"password": password
				})
			}
		})
	}

  return (
		<Modal {...{isOpen, setOpen}} title={'Регистрация'} name={'register'}>
			<form className={s.form}>
				<Input label={'Ваше имя'} required placeholder={'Иван'} value={name} onChange={(e) => set_name(e.target.value)}/>
				<Input label={'Электронная почта'} required placeholder={'email@example.com'} value={login} onChange={(e) => set_login(e.target.value)}/>
				<Input label={'Пароль'} required type="password" value={password} onChange={(e) => set_password(e.target.value)}/>
				<Input label={'Повторите пароль'} required type="password" value={passwordSecond} onChange={(e) => set_passwordSecond(e.target.value)}/>
				<Button label="Зарегистрироваться" disabled={!password || !login || password !== passwordSecond || !name} onClick={handleSubmit}/>
				<p>Или</p>
				<div className={s.btns}>
					<TelegramLoginButton
						botName="socialpost_ru_bot"
						dataOnauth={(user) => auth.login(user)}
						className={s.tgBtnWrapper}
					/>
				</div>
				<div className={s.footer}>
					<p>Уже есть аккаунт?<NavLink onClick={() => setOpen('login')}> Войти</NavLink></p>
				</div>
			</form>
		</Modal>
  );
};
