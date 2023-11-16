import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Input } from '../Shared/Input/Input';
import { useState } from "react";
import { Button } from '../Shared/Button/Button';

export const AddChannelModal = ({isOpen, setOpen}) => {
	const [href, set_href] = useState('')

  return (
		<Modal {...{isOpen, setOpen}} title={'Добавить канал'} name={'add-channel'}>
			<form className={s.form}>
				<Input label={'Ссылка на канал'} placeholder={'https://t.me/'} value={href} onChange={(e) => set_href(e.target.value)}/>
				<Button label="Добавить" disabled={!href}/>
			</form>
		</Modal>
  );
};
