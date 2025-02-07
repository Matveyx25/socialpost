import React, { useState } from 'react'
import s from './requisites.module.scss';
import { DashboardCard } from '../dashboard-card';
import { Tabs } from '../../../Shared/Tabs/Tabs';
import { IndividualEntrepreneur } from './IndividualEntrepreneur';
import { Entity } from './Entity';
import { useProfile } from '../../../../hooks/useProfile';
import { Checkbox } from '../../../Shared/Checkbox/checkbox';

const tabs = [
	{label: 'Индивидуальный предприниматель', id: 1},
	{label: 'Юридическое лицо', id: 2},
]

export const Requisites = () => {
	const {data: profile} = useProfile()

	const [tab, setTab] = useState(tabs[0].id)
	const [is_self_promoted, set_is_self_promoted] = useState(false)

	return (
			<div className={s.grid}>
			{/* {!!profile?.roles?.includes('ADVERTISER') && <DashboardCard>
				Я являюсь конечным рекламодателем
			</DashboardCard>} */}
				<DashboardCard>
					<Tabs {...{tabs, tab, setTab}}/>
				</DashboardCard>
				{{
				1: <IndividualEntrepreneur/>, 
				2: <Entity/>, 
				}[tab]}
			</div>
	)
}
