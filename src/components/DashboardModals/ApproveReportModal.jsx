import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Input } from '../Shared/Input/Input';
import { useState } from "react";
import { Button } from '../Shared/Button/Button';

export const ApproveReportModal = ({isOpen, setOpen}) => {
	const [time, set_time] = useState('12:30')

  return (
		<Modal {...{isOpen, setOpen}} title={'Принять заявку'} name={'approve-report'}>
			<form className={s.form}>
				<Input label={'Время поста'} value={time} onChange={(e) => set_time(e.target.value)}/>
				<div className={s.rowBtns}>
					<Button label="Отменить" theme="secondary" className={s.btnHalf}/>
					<Button label="Принять" className={s.btnHalf} disabled={!time}/>
				</div>
			</form>
		</Modal>
  );
};
