import React, { useState } from 'react'
import s from './dashboard.module.scss'
import { DashboardCard } from './dashboard-card'
import { Button } from '../../Shared/Button/Button';
import { IconPlus } from '@tabler/icons-react';
import { ChannelItem } from './channel-item';
import { Tabs } from '../../Shared/Tabs/Tabs';
import { ReportItem } from './report-item/report-item';

const tabs = [
	{label: 'Запросы', count: 4, id: 5},
	{label: 'Ожидают публикации', count: 2, id: 6},
	{label: 'Активные', count: 1, id: 7},
	{label: 'Выполненные', count: 14, id: 8},
	{label: 'Отклоненные', count: 48, id: 9},
	{label: 'Невыполненные', count: 0, id: 10}
]

export const MainDashboard = () => {
	const [tab, setTab] = useState(tabs[0].id)

	return (
		<div className={s.grid}>
			<div className={s.colSm}>
				<DashboardCard>
					<div className={s.balanceWrapper}>
						<span className={s.balance}>0,00 ₽</span>
						<span className={s.balanceLabel}>Общий баланс</span>
					</div>
				</DashboardCard>
				<DashboardCard className={s.fullHeight}>
					<div className={s.cardHeader}>
						<span>Список каналов</span>
						<Button size="small" label={"Добавить"} leftIcon={<IconPlus size={18}/>}/>
					</div>
					<div className={s.line}></div>
					<div className={s.channelsWrapper}>
						<ChannelItem title={'Marvel / DC: Geek Movies'} img={'https://static10.tgstat.ru/channels/_0/ba/badd99aa75b9e763b085afabff67c285.jpg'} link={'/'}/>
						<ChannelItem title={'Marvel / DC: Geek Movies'} img={'https://static10.tgstat.ru/channels/_0/ba/badd99aa75b9e763b085afabff67c285.jpg'} link={'/'}/>
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
					<ReportItem title={'Реклама кроссовок'}/>
					<ReportItem title={'Реклама кроссовок'}/>
					<ReportItem title={'Реклама кроссовок'}/>
					<ReportItem title={'Реклама кроссовок'}/>
					<ReportItem title={'Реклама кроссовок'}/>
				</div>
			</DashboardCard>
		</div>
	)
}
