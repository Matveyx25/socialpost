import React from 'react'
import s from './report-item.module.scss'
import { IconPointerQuestion } from '@tabler/icons-react'

export const ReportItem = ({title, link}) => {
	return (
		<div className={s.wrapper}>
			<div className={s.icon}>
				<IconPointerQuestion/>
			</div>
			{title}
		</div>
	)
}
