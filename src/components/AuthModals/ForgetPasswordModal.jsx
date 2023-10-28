import { Modal } from "../Shared/Modal/Modal";
import s from './LoginModal.module.scss'
import { Input } from '../Shared/Input/Input';
import { useState } from "react";
import { Button } from '../Shared/Button/Button';

export const ForgetPasswordModal = ({isOpen, setOpen}) => {
	const [login, set_login] = useState('')

  return (
		<Modal {...{isOpen, setOpen}} title={'Восстановление пароля'} name={'forget'}>
			<form className={s.form}>
				<Input label={'Электронная почта'} placeholder={'email@example.com'} value={login} onChange={(e) => set_login(e.target.value)}/>
				<Button label="Зарегистрироваться" disabled={!login}/>
			</form>
		</Modal>
  );
};
