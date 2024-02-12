import { Modal } from "../Shared/Modal/Modal";
import s from './LoginModal.module.scss'
import { Input } from '../Shared/Input/Input';
import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { IconSquare, IconSquareCheckFilled } from "@tabler/icons-react";
import { Button } from '../Shared/Button/Button';
import { auth } from "../../api/api";
import { TLoginButton, TLoginButtonSize } from "react-telegram-auth";

export const LoginModal = ({isOpen, setOpen}) => {
	const [login, set_login] = useState('')
	const [password, set_password] = useState('')

	const navigate = useNavigate()

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
				<Button label="Войти" onClick={() => {}}/>
				{/* <Button label="Войти" disabled={!password || !login}/> */}
				<p>Или</p>
				<div className={s.btns}>
					{/* <Button theme="secondary" label="Вконтакте" leftIcon={<img src="./images/icons/vk.png"/>}/> */}
					<Button theme="secondary" label="Telegram" leftIcon={<img src="./images/icons/tg.png"/>}
					onClick={(e) => {
						e.preventDefault()
						auth.login({
							"telegramId": 0,
							"telegramFirstName": "string",
							"telegramLastName": "string",
							"telegramUsername": "string",
							"telegramPhotoUrl": "string",
							"authDate": 0,
							"hash": "string"
						})
					}}/>
					{/* <TLoginButton
						botName="@socialpost_ru_bot"
						buttonSize={TLoginButtonSize.Large}
						lang="ru"
						usePic={false}
						cornerRadius={20}
						onAuthCallback={(user) => {
							auth.login(user);
						}}
						requestAccess={'write'}
						additionalClasses={'css-class-for-wrapper'}
					/> */}
				</div>
				<div className={s.footer}>
					<p>Ещё нет аккаунта?<NavLink onClick={() => setOpen('register')}> Зарегистрироваться</NavLink></p>
				</div>
			</form>
		</Modal>
  );
};
