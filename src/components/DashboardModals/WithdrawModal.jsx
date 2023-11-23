import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Input } from '../Shared/Input/Input';
import { useState } from "react";
import { Button } from '../Shared/Button/Button';
import { Select } from "../Shared/Select/Select";

const types = [
  { value: 'type1', label: 'Юридическое лицо' },
  { value: 'type2', label: 'Физическое лицо' },
];

export const WithdrawModal = ({isOpen, setOpen}) => {
	const [price, set_price] = useState('25,000 ₽')
	const [type, set_type] = useState(types[0])

  return (
		<Modal {...{isOpen, setOpen}} title={'Вывести средства'} name={'withdraw-modal'}>
			<form className={s.form}>
				<Input label={'Сумма вывода (мин. 1,000 ₽)'} value={price} onChange={(e) => set_price(e.target.value)}/>
				<Select label="Способ оплаты" options={types} defaultValue={types[0]} setSelectedOption={set_type}/>
				<div className={s.rowBtns}>
					<Button label="Вывести" disabled={!price} className={s.fullBtn}/>
				</div>
			</form>
		</Modal>
  );
};
