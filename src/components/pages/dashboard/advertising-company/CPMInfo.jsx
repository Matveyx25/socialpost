import React from 'react'
import s from './advertising-company.module.scss'
import { DashboardCard } from '../dashboard-card'
import { Button } from '../../../Shared/Button/Button';
import { useOutletContext } from 'react-router-dom';
import { Dropdown } from '../../../Shared/Dropdown/Dropdown';
import classNames from 'classnames';
import { IconPlayerPlayFilled, IconPlayerStopFilled } from '@tabler/icons-react';
import { IconPlayerPauseFilled } from '@tabler/icons-react';
import { useStartAllCPM } from '../../../../hooks/useStartAllCPM';
import { usePauseAllCPM } from '../../../../hooks/usePauseAllCPM';
import { useStopAllCPM } from '../../../../hooks/useStopAllCPM';

export const CPMInfo = ({company}) => {
	const [setModal] = useOutletContext()

	const {mutate: start} = useStartAllCPM()
	const {mutate: pause} = usePauseAllCPM()
	const {mutate: stop} = useStopAllCPM()

	return (
    <DashboardCard>
      <div className={s.cardHeader}>
        <span>{company?.name}</span>
				{company?.status === 'ACTIVE' && 
				<div className={s.btns}>
						<Dropdown
							className={s.dropdown}
							menuClassName={s.menu}
							disableArrows
							label={
								{
									ACTIVE: (
										<div className={classNames(s.statusItem, s.play)}>
											<IconPlayerPlayFilled size={18}/>
											Показы запущенны
										</div>
									),
									PAUSED: (
										<div className={classNames(s.statusItem, s.pause)}>
											<IconPlayerPauseFilled size={18}/>
											Показы приостановлены
										</div>
									),
									STOPPED: (
										<div className={classNames(s.statusItem, s.stop)}>
											<IconPlayerStopFilled size={18}/>
											Показы завершены
										</div>
									),
									INACTIVE: (
										<div className={s.statusItem}>
											Показы не запущенны
										</div>
									),
								}[company?.cpmStatus]
							}
							options={[
								<div
									className={classNames(s.statusButton, s.play)}
									onClick={(event) => {
										event.stopPropagation();
										start(company.id);
									}}
								>
									<IconPlayerPlayFilled size={18}/>
									Запустить показы
								</div>,
								<div
									className={classNames(s.statusButton, s.pause)}
									onClick={(event) => {
										event.stopPropagation();
										pause(company.id);
									}}
								>
									<IconPlayerPauseFilled size={18}/>
									Приостановить показы
								</div>,
								<div
									className={classNames(s.statusButton, s.stop)}
									onClick={(event) => {
										event.stopPropagation();
										stop(company.id);
									}}
								>
									<IconPlayerStopFilled size={18}/>
									Завершить показы
								</div>,
							]}
						/>
					</div>}
      </div>
      <div className={s.line}></div>
      <div className={s.companyInfoWrapper}>
        <div className={s.infoBlock}>
          <div className={s.infoTitle}>Клиент</div>
          <div className={s.infoValue}>{company?.client?.name}</div>
        </div>
        <div className={s.infoBlock}>
          <div className={s.infoTitle}>Активные посты</div>
          <div className={s.infoValue}>{company?.activePostsCount}</div>
        </div>
        <div className={s.infoBlock}>
          <div className={s.infoTitle}>Выполненных заявок</div>
          <div className={s.infoValue}>{company?.acceptedPostsCount}</div>
        </div>
        <div className={s.infoBlock}>
          <div className={s.infoTitle}>Заблокировано</div>
          <div className={s.infoValue}>
            {company?.moneyBlocked ? company.moneyBlocked + "₽" : "-"}
          </div>
        </div>
        <div className={s.infoBlock}>
          <div className={s.infoTitle}>Потрачено</div>
          <div className={s.infoValue}>
            {company?.totalMoneySpent ? company.totalMoneySpent + "₽" : "-"}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
