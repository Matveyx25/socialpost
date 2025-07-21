import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'

export const RequestStatisticModal = ({ isOpen, setOpen, modalParams }) => {
  return (
    <Modal
      {...{ isOpen, setOpen }}
      title={`Статистика`}
      name={"request-statistic-modal"}
    >
			<div className={s.scroller}>
				
			</div>
    </Modal>
  );
};
