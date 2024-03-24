import React from 'react'
import s from './channel-card.module.scss'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { Button } from '../../../Shared/Button/Button'
import {  useOutletContext } from 'react-router-dom'
import { useConfirmChannel } from '../../../../hooks/useConfirmChannel';

export const ChannelCard = ({channel}) => {
	const [setModal] = useOutletContext()

	const {mutate: confirmChannel} = useConfirmChannel()

	return (
		<div className={s.wrapper}>
			<div className={s.flex}>
				<div className={s.img}>
					<img src={channel?.imageUrl}/>
				</div>
				<div className={s.content}>
					<h2>
						{channel?.name}
						<span>
							{channel?.tag}
						</span>
					</h2>
					<p dangerouslySetInnerHTML={{__html: channel?.description}}></p>
				</div>
				{channel?.status !== 'NOT_CONFIRMED' ?
					<Button className={s.editBtn} label={'Подтвердить'} theme='secondary' onClick={() => {
						confirmChannel(channel?.id)
						window.open('https://t.me/socialpost_ru_dev_bot','_blank', 'rel=noopener noreferrer')
					}}/>
				: <>
					<Button className={s.editBtn} label={'Редактировать'} leftIcon={<IconEdit />} theme='secondary' onClick={() => setModal('edit-channel', channel?.id)}/>
					<Button className={s.removeBtn} label={<IconTrash color='#F78F8F'/>} theme='secondary' onClick={() => setModal('remove-channel', channel?.id)}/>
				</>}
			</div>
			<div className={s.stats}>
				<div>
					<span>Подписчики</span>
					<p>{channel?.subscribersCount}</p>
				</div>
				{channel?.averagePostReach && <div>
					<span>Средний охват поста</span>
					<p>{channel?.averagePostReach?.replace(/\s/g, '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}</p>
				</div>}
				{channel?.engagementRate && <div>
					<span>ER</span>
					<p>{channel?.engagementRate}%</p>
				</div>}
				{channel?.costPerView && <div>
					<span>CPV</span>
					<p>{channel?.costPerView}₽</p>
				</div>}
				<div>
					<span>Нативное размещение</span>
					<p>{channel?.nativePostPrice || 0}₽</p>
				</div>
				<div>
					<span>Размещение 1/24</span>
					<p>{channel?.post1For24Price || 0}₽</p>
				</div>
				<div>
					<span>Размещение 1/48</span>
					<p>{channel?.post1For48Price || 0}₽</p>
				</div>
				<div>
					<span>Размещение 2/48</span>
					<p>{channel?.post2For48Price || 0}₽</p>
				</div>
			</div>
		</div>
	)
}
