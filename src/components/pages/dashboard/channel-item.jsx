import React from 'react'
import s from './dashboard.module.scss'
import classNames from 'classnames'

export const ChannelItem = ({title, img, link, status}) => {
	return (
		<div className={s.channelItem}>
			<div className={s.img}>
				<img src={img ? img : '/images/channel-without-image.svg'} alt="" />
			</div>
			<a href={link}>
				{title}
			</a>
			<div className={classNames(s.status, status === 'CONFIRMED' ? s.confirmed : s.notConfirmed)}>
				{status === 'CONFIRMED' ? 'Подтвержден' : 'Ожидает подтверждение'}
			</div>
		</div>
	)
}
