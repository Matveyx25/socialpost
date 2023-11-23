import React, { useState } from 'react'
import s from './Accordion.module.scss'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import classNames from 'classnames'

export const Accordion = ({active, title, content}) => {
	const [isOpen, setIsOpen] = useState(active)

	return (
		<div className={classNames(s.wrapper, isOpen ? s.open : null)}>
			<div className={s.title} onClick={() => setIsOpen(prev => !prev)}>
				{title}
				<IconChevronDown className={s.chevronDown}/>
				<IconChevronUp className={s.chevronUp}/>
			</div>
			<div className={s.content}>
				{content}
			</div>
		</div>
	)
}
