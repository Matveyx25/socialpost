import React from 'react'
import s from './report-item.module.scss'
import { IconPointerQuestion } from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'

export const ReportItem = ({request}) => {
	return (
		<NavLink className={s.wrapper} to={'/placement-appointments/' + request?.id}>
			<div className={s.icon}>
				<IconPointerQuestion/>
			</div>
			{request?.postName}
		</NavLink>
	)
}