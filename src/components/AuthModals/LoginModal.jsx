import { Modal } from "../Shared/Modal/Modal";
import s from './LoginModal.module.scss'
import { Input } from '../Shared/Input/Input';
import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { IconSquare, IconSquareCheckFilled } from "@tabler/icons-react";
import { Button } from '../Shared/Button/Button';
import { auth } from "../../api/api";
import TelegramLoginButton from "telegram-login-button";

export const LoginModal = ({isOpen, setOpen}) => {
	const [login, set_login] = useState('')
	const [password, set_password] = useState('')

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		if(!password || !login){
			return null
		}

		auth.loginEmail({
			"email": login,
			"password": password,
		})
	}

  return (
		<Modal {...{isOpen, setOpen}} title={'Вход'} name={'login'}>
			<form className={s.form}>
				<Input label={'Электронная почта'} required placeholder={'email@example.com'} value={login} onChange={(e) => set_login(e.target.value)}/>
				<div>
					<Input label={'Пароль'} required type="password" value={password} onChange={(e) => set_password(e.target.value)}/>
					<div className={s.rememberMe}>
						<div className={s.checkbox}>	
							<input type="checkbox" name="rememberMe" id="rememberMe"/>
							<label htmlFor="rememberMe">
								<IconSquare className={s.checkboxIcon}/>
								<IconSquareCheckFilled className={s.checkboxIcon}/>
								Запомнить меня
							</label>
						</div>
						<NavLink onClick={() => setOpen('forget')}>Забыли пароль?</NavLink>
					</div>
				</div>
				<Button label="Войти" disabled={!password || !login} onClick={handleSubmit}/>
				<p>Или</p>
				<div className={s.btns}>
					<TelegramLoginButton
						botName="socialpost_ru_bot"
						dataOnauth={(user) => auth.loginTelegram(user)}
						className={s.tgBtnWrapper}
					/>
				</div>
				<div className={s.footer}>
					<p>Ещё нет аккаунта?<NavLink onClick={() => setOpen('register')}> Зарегистрироваться</NavLink></p>
				</div>
			</form>
		</Modal>
  );
};
