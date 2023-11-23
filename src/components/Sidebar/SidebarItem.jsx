import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Sidebar.module.scss'

export const SidebarItem = ({to, label, icon, count, target, end, exact}) => {
	return (
		<NavLink {...{end ,target, to, exact}} className={({ isActive }) => isActive ? `${s.active} ${s.itemWrapper}` : s.itemWrapper}>
			{icon}
			{label}
			{count && <span className={s.count}>
				{count}
			</span>}
		</NavLink>
	)
}
