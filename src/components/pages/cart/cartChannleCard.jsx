import React from 'react'
import { useChannelById } from '../../../hooks/useChannelById'
import s from './cart.module.scss'
import { IconTrash } from '@tabler/icons-react'
import { Counter } from '../../Shared/Counter/Counter'
import { Loader } from '../../Shared/Loader/Loader'

export const CartChannelCard = ({el, removeFromCart, cart, set_cart}) => {
	const {data: channel, isFetched} = useChannelById(el.id)

	const formats = channel ? [
		{enabled: channel?.nativePostPriceEnabled, label: 'Нативный', value: 'nativePostPrice', price: channel?.nativePostPrice},
		{enabled: channel?.post1For24PriceEnabled, label: '1/24', value: 'post1For24Price', price: channel?.post1For24Price},
		{enabled: channel?.post1For48PriceEnabled, label: '1/48', value: 'post1For48Price', price: channel?.post1For48Price},
		{enabled: channel?.post2For48PriceEnabled, label: '2/48', value: 'post2For48Price', price: channel?.post2For48Price},
	] : []

	if(!isFetched){
		return <Loader/>
	}

	return (
		<div key={'card-in-cart-' + channel.id} className={s.productCard}>
			<div className={s.productTitle}>
				{channel?.name}
			</div>
			<div className={s.productFormat}>
				<span>Формат размещения</span>
				{formats.find(f => f.value === el.format)?.label}
			</div>
				<div className={s.productPrice}>
					<span>Общая стоимость</span>
					{(formats.find(f => f.value === el.format)?.price * +el.count + '₽') }
				</div>
				<div className={s.productBtns}>
					<button className={s.removeBtn}>
						<IconTrash size={24} color='#436CFF' onClick={() => removeFromCart(channel.id)}/>
					</button>
					<Counter value={el.count} min={1} max={Infinity} onChange={(value) => {
							const newState = cart.map(obj => {
								if (obj?.id === el?.id) {
									return {...obj, count: value};
								}

								return obj;
							});
					
							set_cart(newState)
						}}/>
				</div>
		</div>)
}
