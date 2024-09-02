import React, { useState } from 'react'
import s from './requisites.module.scss';
import { DashboardCard } from '../dashboard-card';
import { Tabs } from '../../../Shared/Tabs/Tabs';
import { IndividualEntrepreneur } from './IndividualEntrepreneur';
import { Entity } from './Entity';

const tabs = [
	{label: 'Индивидуальный предприниматель', id: 1},
	{label: 'Юридическое лицо', id: 2},
]

export const Requisites = () => {
	const [tab, setTab] = useState(tabs[0].id)

	return (
		<div className={s.grid}>
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
