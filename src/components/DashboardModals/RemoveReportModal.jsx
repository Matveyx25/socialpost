import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { useState } from "react";
import { Button } from '../Shared/Button/Button';
import { Textarea } from "../Shared/Textarea/Textarea";

export const RemoveReportModal = ({isOpen, setOpen}) => {
	const [desc, set_desc] = useState('')

  return (
		<Modal {...{isOpen, setOpen}} title={'Отклонить заявку'} name={'remove-report'}>
			<form className={s.form}>
				<Textarea label={'Причина отклонения'} placeholder={'Причина удаления'} value={desc} onChange={(e) => set_desc(e.target.value)}/>
				<div className={s.rowBtns}>
					<Button label="Отменить" theme="secondary" className={s.btnHalf}/>
					<Button label="Оклонить" className={s.btnHalf} disabled={!desc}/>
				</div>
			</form>
		</Modal>
  );
};
