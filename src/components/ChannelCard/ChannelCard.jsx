import React, { useState } from 'react'
import s from './ChannelCard.module.scss'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import { IconChevronDown, IconChevronUp, IconShoppingCart, IconX } from '@tabler/icons-react'
import { Button } from '../Shared/Button/Button';
import { NavLink } from 'react-router-dom';

export const ChannelCard = ({link, updateCart, id, cart, title, type, desc, subscribers, postReach, cpv, er, img, price}) => {
	const	formats = Object.keys(price)
	
	const [inCart, set_inCart] = useState(cart && cart?.find(el => el.id === id))
	const [selectedFormat, setSelectedFormat] = useState(inCart ? cart?.find(el => el.id === id).format : {value: formats[0], label: formats[0]})

	const addToCart = () => {
		set_inCart(true)
		updateCart([...cart, {id, count: 1, format: selectedFormat.value}])
	}
	
	const removeFromCart = () => {
		set_inCart(false)
		updateCart(cart.filter(el => el.id !== id))
	}

	return (
		<div className={s.wrapper}>
			<div className={s.flex}>
				<div className={s.mobileFlex}>
					<NavLink className={s.img}  to={'/channel/' + id}>
						<img src={img}/>
					</NavLink>
					<div className={s.content}>
						<div className={s.titleFlex}>
							<NavLink className={s.title}  to={'/channel/' + id}>
								{title}
							</NavLink>
							<span>
								{type}
							</span>
						</div>
						<p dangerouslySetInnerHTML={{__html: desc}}></p>
					</div>
				</div>
				<div className={s.mobileBtns}>
					<Dropdown value={selectedFormat}
										options={formats} className={s.formats} 
										onChange={setSelectedFormat}
										arrowClosed={<IconChevronDown size={18}/>}
										arrowOpen={<IconChevronUp size={18}/>}/>
					{inCart ?
					<Button className={s.removeBtn} label={'Убрать'} leftIcon={<IconX size={18}/>} onClick={removeFromCart}/> : 
					<Button className={s.button} label={(price[selectedFormat.value] + '').replace(/\s/g, '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')} leftIcon={<IconShoppingCart size={18}/>} onClick={addToCart}/>}
				</div>
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
					{cpv === '-' ? <p>{cpv}</p> : <p>{cpv}₽</p>}
				</div>
			</div>
		</div>
	)
}
