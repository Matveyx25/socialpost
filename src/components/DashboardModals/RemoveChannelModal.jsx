import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Button } from '../Shared/Button/Button';
import { useRemoveChannel } from '../../hooks/useRemoveChannel';
import { useChannelById } from "../../hooks/useChannleById";

export const RemoveChannelModal = ({isOpen, setOpen, modalParams}) => {

	const {mutate: removeChannel} = useRemoveChannel()
	const {data: channel} = useChannelById(modalParams)

  return (
		<Modal {...{isOpen, setOpen}} title={'Убрать канал'} name={'remove-channel'}>
			<form className={s.form}>
				<p className={s.removeText}>
				Вы уверены, что хотите убрать канал <br/>
				<strong>{channel?.name}</strong> из списка каналов?
				</p>
				<div className={s.rowBtns}>
					<Button label="Отменить" theme="secondary" className={s.btnHalf} nClick={(e) => {
						e.preventDefault()
						setOpen()
					}}/>
					<Button label="Убрать канал" className={s.btnHalf} onClick={(e) => {
						e.preventDefault()
						removeChannel(modalParams)
						setOpen()
					}}/>
				</div>
			</form>
		</Modal>
  );
};
