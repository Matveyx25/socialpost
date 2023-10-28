import { Modal } from "../Shared/Modal/Modal";
import s from './LoginModal.module.scss'
import { Input } from '../Shared/Input/Input';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Button } from '../Shared/Button/Button';

export const RegisterModal = ({isOpen, setOpen}) => {
	const [login, set_login] = useState('')
	const [password, set_password] = useState('')
	const [passwordSecond, set_passwordSecond] = useState('')

  return (
		<Modal {...{isOpen, setOpen}} title={'Регистрация'} name={'register'}>
			<form className={s.form}>
				<Input label={'Электронная почта'} required placeholder={'email@example.com'} value={login} onChange={(e) => set_login(e.target.value)}/>
				<Input label={'Пароль'} required type="password" value={password} onChange={(e) => set_password(e.target.value)}/>
				<Input label={'Повторите пароль'} required type="password" value={passwordSecond} onChange={(e) => set_passwordSecond(e.target.value)}/>
				<Button label="Зарегистрироваться" disabled={!password || !login || password !== passwordSecond}/>
				<p>Или</p>
				<div className={s.btns}>
					<Button theme="secondary" label="Вконтакте" leftIcon={<img src="./images/icons/vk.png"/>}/>
					<Button theme="secondary" label="Telegram" leftIcon={<img src="./images/icons/tg.png"/>}/>
				</div>
				<div className={s.footer}>
					<p>Уже есть аккаунт?<NavLink onClick={() => setOpen('login')}> Войти</NavLink></p>
				</div>
			</form>
		</Modal>
  );
};
