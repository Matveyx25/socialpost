import React from 'react'
import s from './dashboard.module.scss'

export const DashboardCard = ({children, className}) => {
	return (
		<div className={`${className} ${s.cardWrapper}`}>{children}</div>
	)
}
