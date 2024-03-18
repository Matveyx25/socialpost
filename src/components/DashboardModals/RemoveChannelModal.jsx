import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Button } from '../Shared/Button/Button';
import { useRemoveChannel } from '../../hooks/useRemoveChannel';

export const RemoveChannelModal = ({isOpen, setOpen, channelId}) => {

	const {mutate: removeChannel} = useRemoveChannel()

  return (
		<Modal {...{isOpen, setOpen}} title={'Убрать канал'} name={'remove-channel'}>
			<form className={s.form}>
				<p className={s.removeText}>
				Вы уверены, что хотите убрать канал <br/>
				<strong>“Marvel / DC: Geek Movies”</strong> из списка каналов?
				</p>
				<div className={s.rowBtns}>
					<Button label="Отменить" theme="secondary" className={s.btnHalf} nClick={(e) => {
						e.preventDefault()
						setOpen()
					}}/>
					<Button label="Убрать канал" className={s.btnHalf} onClick={(e) => {
						e.preventDefault()
						removeChannel(channelId)
						setOpen()
					}}/>
				</div>
			</form>
		</Modal>
  );
};
