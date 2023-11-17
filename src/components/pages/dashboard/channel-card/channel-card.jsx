import React from 'react'
import s from './channel-card.module.scss'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { Button } from '../../../Shared/Button/Button'
import { useOutletContext } from 'react-router-dom'

export const ChannelCard = ({title, type, desc, subscribers, postReach, cpv, er, img, price}) => {
	const [setModal] = useOutletContext()

	return (
		<div className={s.wrapper}>
			<div className={s.flex}>
				<div className={s.img}>
					<img src={img}/>
				</div>
				<div className={s.content}>
					<h2>
						{title}
						<span>
							{type}
						</span>
					</h2>
					<p dangerouslySetInnerHTML={{__html: desc}}></p>
				</div>
				<Button className={s.editBtn} label={'Редактировать'} leftIcon={<IconEdit />} theme='secondary' onClick={() => setModal('edit-channel')}/>
				<Button className={s.removeBtn} label={<IconTrash color='#F78F8F'/>} theme='secondary' onClick={() => setModal('remove-channel')}/>
			</div>
			<div className={s.stats}>
				<div>
					<span>Подписчики</span>
					<p>{subscribers.replace(/\s/g, '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}</p>
				</div>
				<div>
					<span>Средний охват поста</span>
					<p>{postReach.replace(/\s/g, '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}</p>
				</div>
				<div>
					<span>ER</span>
					<p>{er}%</p>
				</div>
				<div>
					<span>CPV</span>
					<p>{cpv}₽</p>
				</div>
				{price?.map(el => <div>
					<span>{el.type}</span>
					<p>{el.price}₽</p>
				</div>)}
			</div>
		</div>
	)
}
