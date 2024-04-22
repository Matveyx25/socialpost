import React, { useState } from 'react'
import s from './requisites.module.scss';
import { DashboardCard } from '../dashboard-card';
import { Tabs } from '../../../Shared/Tabs/Tabs';
import { SelfEmployed } from './SelfEmployed';
import { IndividualEntrepreneur } from './IndividualEntrepreneur';
import { Entity } from './Entity';

const tabs = [
	{label: 'Самозанятый', id: 1},
	{label: 'Индивидуальный предприниматель', id: 2},
	{label: 'Юридическое лицо', id: 3},
]

export const Requisites = () => {
	const [tab, setTab] = useState(tabs[0].id)

	return (
		<div className={s.grid}>
			<DashboardCard>
				<Tabs {...{tabs, tab, setTab}}/>
			</DashboardCard>
			{{1: <SelfEmployed/>,
			 2: <IndividualEntrepreneur/>, 
			 3: <Entity/>, 
			 }[tab]}
		</div>
	)
}
