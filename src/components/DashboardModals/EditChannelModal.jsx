import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Input } from '../Shared/Input/Input';
import { useState } from "react";
import { Button } from '../Shared/Button/Button';
import { useUpdateChannel } from '../../hooks/useUpdateChannel';

export const EditChannelModal = ({isOpen, setOpen, modalParams}) => {
	const [price1, set_price1] = useState('')
	const [price2, set_price2] = useState('')
	const [price3, set_price3] = useState('')
	const [price4, set_price4] = useState('')

	const {mutate: updateChannel} = useUpdateChannel()

  return (
		<Modal {...{isOpen, setOpen}} title={'Редактирование'} name={'edit-channel'}>
			<form className={s.form}>
				<Input label={'Нативное размещение размещение'} value={price1} onChange={(e) => set_price1(e.target.value)}/>
				<Input label={'Размещение 1/48'} value={price2} onChange={(e) => set_price2(e.target.value)}/>
				<Input label={'Размещение 1/24'} value={price3} onChange={(e) => set_price3(e.target.value)}/>
				<Input label={'Размещение 2/48'} value={price4} onChange={(e) => set_price4(e.target.value)}/>
				<div className={s.rowBtns}>
					<Button label="Отменить" theme="secondary" className={s.btnHalf} onClick={(e) => {
						e.preventDefault()
						setOpen()
					}}/>
					<Button label="Применить" className={s.btnHalf} onClick={(e) => {
						e.preventDefault()
						updateChannel({data: {
							"nativePostPrice": price1,
							"post1For48Price": price2,
							"post1For24Price": price3,
							"post2For48Price": price4
						}, id: modalParams})
						setOpen()
					}}/>
				</div>
			</form>
		</Modal>
  );
};
