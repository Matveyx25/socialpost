import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { usePublishersRequestById } from '../../hooks/usePublishersRequestById';
import { Input } from "../Shared/Input/Input";

export const RequestStatisticModal = ({ isOpen, setOpen, modalParams }) => {
	const {data: stat} = usePublishersRequestById(modalParams?.requestId)

  return (
    <Modal
      {...{ isOpen, setOpen }}
      title={`Статистика`}
      name={"request-statistic-modal"}
    >
			<div className={s.scroller}>
				<div className={s.form}>
					<div className={s.statisticFlex}>
						<span className={s.statisticLabel}>
							Название записи
						</span>
						<span className={s.statisticValue}>
							{stat?.postName}
						</span>
					</div>
					<div className={s.statisticFlex}>
						<span className={s.statisticLabel}>
							Площадка размещения
						</span>
						<span className={s.statisticValue}>
							{stat?.channelName}
						</span>
					</div>
					<div className={s.statisticFlex}>
						<span className={s.statisticLabel}>
							Кол-во показов
						</span>
						<span className={s.statisticValue}>
							{+stat?.viewsCount}
						</span>
					</div>
				</div>
			</div>
    </Modal>
  );
};
