import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Input } from '../Shared/Input/Input';
import { useState } from "react";
import { Button } from '../Shared/Button/Button';
import { useAddChannel } from '../../hooks/useAddChannel';

export const AddChannelModal = ({isOpen, setOpen}) => {
	const [href, set_href] = useState('')

	const { mutate: createChannel } = useAddChannel()

  return (
		<Modal {...{isOpen, setOpen}} title={'Добавить канал'} name={'add-channel'}>
			<form className={s.form}>
				<Input label={'Ссылка на канал'} placeholder={'https://t.me/'} value={href} onChange={(e) => set_href(e.target.value)}/>
				<Button label="Добавить" disabled={!href} onClick={(e) => {
					e.preventDefault()
					createChannel({
						url: href
					})
					set_href('')
					setOpen()
				}}/>
			</form>
		</Modal>
  );
};
