import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Input } from '../Shared/Input/Input';
import { useState } from "react";
import { Button } from '../Shared/Button/Button';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profile } from "../../api/api";

export const EmailModal = ({isOpen, setOpen}) => {
	const [login, set_login] = useState('')
	const [password, set_password] = useState('')
	const [passwordSecond, set_passwordSecond] = useState('')

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: profile.connectEmail,
		onSuccess: () => {
      queryClient.invalidateQueries('profile')
    },
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		if(!password || !login || password !== passwordSecond){
			return null
		}

		mutate({
			"email": login,
			"password": password
		})

		setOpen()
	}

  return (
		<Modal {...{isOpen, setOpen}} title={'Email'} name={'connect-email'}>
			<form className={s.form}>
				<Input label={'Электронная почта'} required placeholder={'email@example.com'} value={login} onChange={(e) => set_login(e.target.value)}/>
				<Input label={'Пароль'} required type="password" value={password} onChange={(e) => set_password(e.target.value)}/>
				<Input label={'Повторите пароль'} required type="password" value={passwordSecond} onChange={(e) => set_passwordSecond(e.target.value)}/>
				<Button label="Подключить" disabled={!password || !login || password !== passwordSecond} onClick={handleSubmit}/>
			</form>
		</Modal>
  );
};
