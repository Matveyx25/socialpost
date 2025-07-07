import React from 'react'
import { useChannelById } from '../../../hooks/useChannelById'
import s from './cart.module.scss'
import { IconTrash } from '@tabler/icons-react'
import { Counter } from '../../Shared/Counter/Counter'
import { Loader } from '../../Shared/Loader/Loader'
import { useUpdateCart } from '../../../hooks/useUpdateCart'
import { useCart } from '../../../hooks/useCart'
import { transformDuration } from '../../../helpers/transformDuratuin'

export const CartChannelCard = ({el, removeFromCart}) => {
	const {data: channel, isFetched} = useChannelById(el.id)
	const {data: cart} = useCart()
	const {mutate: updateCart} = useUpdateCart()

	const prices = channel?.prices?.map((el) => ({
		enabled: true,
		label: transformDuration(el?.duration),
		value: el.duration.id,
		price: el.price,
	}));

	const formats = channel ? [
		{enabled: channel?.nativePostPriceEnabled, label: 'Нативный', value: null, price: channel?.nativePostPrice},
		...prices
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
				{formats.find(f => f.value == el.format)?.label}
			</div>
				<div className={s.productPrice}>
					<span>Общая стоимость</span>
					{(formats.find(f => f.value == el.format)?.price * +el.count + '₽') }
				</div>
				<div className={s.productBtns}>
					<button className={s.removeBtn}>
						<IconTrash size={24} color='#436CFF' onClick={() => removeFromCart(channel.id)}/>
					</button>
					<Counter value={el.count} min={1} max={Infinity} onChange={(value) => {
							const newState = cart?.map(obj => {
								if (obj?.id === el?.id) {
									return {...obj, count: value};
								}

								return obj;
							});
					
							updateCart(newState)
						}}/>
				</div>
		</div>)
}
