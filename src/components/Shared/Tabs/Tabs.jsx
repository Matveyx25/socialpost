import React from 'react'
import s from './Tabs.module.scss'

export const Tabs = ({tabs, setTab, tab}) => {
	return (
		<div className={s.wrapper}>
			{tabs?.map(el => (
				<div className={`${s.tab} ${tab === el.id && s.active}`} onClick={() => setTab(el.id)}>
					<span>{el.label}</span>
					<span className={s.count}>{el.count}</span>
				</div>
			))}
		</div>
	)
}
