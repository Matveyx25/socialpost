import React, { useEffect, useState } from 'react'
import s from './dashboard.module.scss'
import { DashboardCard } from './dashboard-card'
import { Button } from '../../Shared/Button/Button';
import { IconPlus } from '@tabler/icons-react';
import { ChannelItem } from './channel-item';
import { Tabs } from '../../Shared/Tabs/Tabs';
import { ReportItem } from './report-item/report-item';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useMyChannels } from '../../../hooks/useMyChannels';
import { useProfile } from '../../../hooks/useProfile';
import { priceSeparator } from '../../../helpers/priceSeparator';
import { usePublishersRequests } from '../../../hooks/usePublishersRequests';
import { useRequestsStats } from '../../../hooks/useRequestsStats';

export const MainDashboard = () => {
	const [setModal] = useOutletContext()
	const {data: channels} = useMyChannels()
	const {data: profile} = useProfile()
	const {data: requestsStats} = useRequestsStats()

	const tabs = [
		{label: 'Ожидают публикации', id: 0, count: requestsStats?.pendingCount, value: 'PENDING'},
		{label: 'Активные', id: 1, count: requestsStats?.activeCount, value: 'ACTIVE'},
		{label: 'Выполненные', id: 2, count: requestsStats?.completedCount, value: 'COMPLETED'},
		{label: 'Отклоненные', id: 3, count: requestsStats?.declinedCount, value: 'DECLINED'},
		{label: 'Невыполненные', id: 4, count: requestsStats?.expiredCount, value: 'EXPIRED'}
	]

	const [tab, setTab] = useState(tabs[0].id)

	const {data: requests} = usePublishersRequests({
    _start: 0,
    _end: 30,
		status: tabs[tab].value,
	})

	return (
		<div className={s.grid}>
			<div className={s.colSm}>
				<DashboardCard>
					<div className={s.balanceWrapper}>
						<span className={s.balance}>{priceSeparator(profile?.balance)} ₽</span>
						<span className={s.balanceLabel}>Общий баланс</span>
					</div>
				</DashboardCard>
				<DashboardCard className={s.fullHeight}>
					<div className={s.cardHeader}>
						<span>Список каналов</span>
						<Button size="small" label={"Добавить"} leftIcon={<IconPlus size={18}/>} onClick={() => setModal('add-channel')}/>
					</div>
					<div className={s.line}></div>
					<div className={s.channelsWrapper}>
						{channels?.map(channel => (
							<ChannelItem title={channel?.name} img={channel?.imageUrl} link={'/'} status={channel?.status}/>
						))}
					</div>
				</DashboardCard>
			</div>
			<DashboardCard className={s.reportsCard}>
				<div className={s.cardHeader}>
					<span>Заявки на размещение</span>
				</div>
				<div className={s.line}></div>
				<Tabs {...{tabs, tab, setTab}}/>
				<div className={s.reports}>
					{requests?.data?.map(el => (
						<ReportItem request={el}/>
					))}
				</div>
			</DashboardCard>
		</div>
	)
}
