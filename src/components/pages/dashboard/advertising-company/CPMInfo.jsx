import React from 'react'
import s from './advertising-company.module.scss'
import { DashboardCard } from '../dashboard-card'
import { Button } from '../../../Shared/Button/Button';
import { useOutletContext } from 'react-router-dom';

export const CPMInfo = ({company}) => {
	const [setModal] = useOutletContext()

	return (
    <DashboardCard>
      <div className={s.cardHeader}>
        <span>{company?.name}</span>
				<Button label={'Запустить показы'} 
            size='small'
            onClick={() => {
              setModal("add-post", {campaignId: company?.id});
            }}/>
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
