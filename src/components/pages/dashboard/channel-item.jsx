import React from 'react'
import s from './dashboard.module.scss'
import { Button } from '../../Shared/Button/Button';
import { IconX } from '@tabler/icons-react';

export const ChannelItem = ({title, img, link}) => {
	return (
		<div className={s.channelItem}>
			<div className={s.img}>
				<img src={img} alt="" />
			</div>
			<a href={link}>
				{title}
			</a>
			<Button size='small' label={'Убрать'} leftIcon={<IconX size={18}/>} theme='secondary'/>
		</div>
	)
}
