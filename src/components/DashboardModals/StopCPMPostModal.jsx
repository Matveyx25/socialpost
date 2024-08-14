import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Button } from '../Shared/Button/Button';
import { useStopCPM } from "../../hooks/useStopCPM";

export const StopCPMPostModal = ({isOpen, setOpen, modalParams}) => {

	const {mutate: stop} = useStopCPM()

  return (
		<Modal {...{isOpen, setOpen}} title={'Завершить показы'} name={'stop-cpm'}>
			<form className={s.form}>
				<p className={s.removeText}>
				Вы уверены, что хотите завершить показы? <br/>
				</p>
				<div className={s.rowBtns}>
					<Button label="Отменить" theme="secondary" className={s.btnHalf} onClick={(e) => {
						e.preventDefault()
						setOpen()
					}}/>
					<Button label="Завершить" className={s.btnHalf} onClick={(e) => {
						e.preventDefault()
						stop(modalParams?.postId)
						setOpen()
					}}/>
				</div>
			</form>
		</Modal>
  );
};
