import React from 'react'
import s from './channel-card.module.scss'
import { IconEdit, IconTrash, IconInfoCircle } from '@tabler/icons-react'
import { Button } from '../../../Shared/Button/Button'
import {  useOutletContext } from 'react-router-dom'
import classNames from 'classnames'
import { Tooltip } from 'react-tooltip'
import { priceSeparator } from '../../../../helpers/priceSeparator'

export const ChannelCard = ({channel}) => {
	const [setModal] = useOutletContext()

	return (
		<div className={s.wrapper}>
			<Tooltip id='confirm_channel' className="react-tooltip-clickable-link" events={['click']} html={`<div>Для подтверждения своего канала добавьте <a href="${'https://t.me/' + process.env.REACT_APP_TG_BOT_NAME}" target="_blank">@${process.env.REACT_APP_TG_BOT_NAME}</a> </br> как администратора канала для того, чтобы мы могли убедиться, что <br/> именно вы являетесь владельцем. Или напишите в поддержку сервиса.</div>`}/>
			<div className={s.flex}>
				<div className={s.img}>
					<img src={channel?.imageUrl ? channel?.imageUrl : '/images/channel-without-image.svg'}/>
				</div>
				<div className={s.content}>
					<h2>
						{channel?.name}
						{(channel?.status === 'NOT_CONFIRMED' || !channel?.isOrdConfirmed) ?
						 <div data-tooltip-id="confirm_channel" className={classNames(s.status, s.notConfirmed)}>Ожидает подтверждение <IconInfoCircle size={16}/></div> :
						 <>
							{channel?.tags && 
								channel?.tags.map(el => 
								<span>{el}</span>)}
						</>}
					</h2>
					<p dangerouslySetInnerHTML={{__html: channel?.description}}></p>
				</div>
				{channel?.status === 'CONFIRMED' && <>
						<Button className={s.editBtn} label={'Редактировать'} leftIcon={<IconEdit />} theme='secondary' onClick={() => setModal('edit-channel', {channelId: channel?.id})}/>
						<Button className={s.removeBtn} label={<IconTrash color='#F78F8F'/>} theme='secondary' onClick={() => setModal('remove-channel', {channelId: channel?.id})}/>
					</>}
			</div>
			<div className={s.stats}>
				<div>
					<span>Подписчики</span>
					<p>{priceSeparator(channel?.subscribersCount || 0)}</p>
				</div>
				{channel?.averagePostReach ? <div>
					<span>Средний охват поста</span>
					<p>{priceSeparator(channel?.averagePostReach)}</p>
				</div> : null}
				{channel?.engagementRate ? <div>
					<span>ER</span>
					<p>{priceSeparator(channel?.engagementRate)}%</p>
				</div> : null}
				{channel?.costPerView ? <div>
					<span>CPV</span>
					<p>{priceSeparator(channel?.costPerView)}</p>
				</div> : null}
				{typeof +channel?.nativePostPrice === 'number' && <div>
					<span>Нативное размещение</span>
					<p>{priceSeparator(channel?.nativePostPrice)}₽</p>
				</div>}
				{typeof +channel?.post1For24Price === 'number' && <div>
					<span>Размещение 1/24</span>
					<p>{priceSeparator(channel?.post1For24Price)}₽</p>
				</div>}
				{typeof +channel?.post1For48Price === 'number' && <div>
					<span>Размещение 1/48</span>
					<p>{priceSeparator(channel?.post1For48Price)}₽</p>
				</div>}
				{typeof +channel?.post2For48Price === 'number' && <div>
					<span>Размещение 2/48</span>
					<p>{priceSeparator(channel?.post2For48Price)}₽</p>
				</div>}
			</div>
		</div>
	)
}
