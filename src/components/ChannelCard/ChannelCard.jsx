import React, { useState } from 'react'
import s from './ChannelCard.module.scss'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import { IconChevronDown, IconChevronUp, IconShoppingCart, IconX } from '@tabler/icons-react'
import { Button } from '../Shared/Button/Button';

export const ChannelCard = ({formats, title, type, desc, subscribers, postReach, cpv, er, img, price}) => {
	const [inCart, set_inCart] = useState(false)
	
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
				<Dropdown value={formats[0]}
				options={formats} className={s.formats} 
				arrowClosed={<IconChevronDown size={18}/>}
  			arrowOpen={<IconChevronUp size={18}/>}/>
				{inCart ?
				<Button className={s.removeBtn} label={'Убрать'} leftIcon={<IconX size={18}/>} onClick={() => set_inCart(false)}/>: 
				<Button className={s.button} label={(price + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')} leftIcon={<IconShoppingCart size={18}/>} onClick={() => set_inCart(true)}/>}
			</div>
			<div className={s.stats}>
				<div>
					<span>Подписчики</span>
					<p>{subscribers.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}</p>
				</div>
				<div>
					<span>Средний охват поста</span>
					<p>{postReach.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}</p>
				</div>
				<div>
					<span>ER</span>
					<p>{er}%</p>
				</div>
				<div>
					<span>CPV</span>
					<p>{cpv}₽</p>
				</div>
			</div>
		</div>
	)
}
