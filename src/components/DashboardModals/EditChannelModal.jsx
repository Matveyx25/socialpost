import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Input } from '../Shared/Input/Input';
import { useState } from "react";
import { Button } from '../Shared/Button/Button';

export const EditChannelModal = ({isOpen, setOpen}) => {
	const [price1, set_price1] = useState('')
	const [price2, set_price2] = useState('')
	const [price3, set_price3] = useState('')

  return (
		<Modal {...{isOpen, setOpen}} title={'Редактирование'} name={'edit-channel'}>
			<form className={s.form}>
				<Input label={'Стандартное размещение'} value={price1} onChange={(e) => set_price1(e.target.value)}/>
				<Input label={'Нативное размещение размещение'} value={price2} onChange={(e) => set_price2(e.target.value)}/>
				<Input label={'Размещение без удаления'} value={price3} onChange={(e) => set_price3(e.target.value)}/>
				<div className={s.rowBtns}>
					<Button label="Отменить" theme="secondary" className={s.btnHalf}/>
					<Button label="Применить" className={s.btnHalf}/>
				</div>
			</form>
		</Modal>
  );
};
