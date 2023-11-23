import React, { useEffect, useState } from 'react'
import s from './channels-catalog.module.scss'
import { Filters } from '../../Filters/Filters'
import { ChannelCard } from '../../ChannelCard/ChannelCard';
import channels from '../../../data/channels.json'
import { Select } from '../../Shared/Select/Select';

const options = [
  { value: 'subscribers more', label: 'Подписчиков: Больше' },
  { value: 'subscribers less', label: 'Подписчиков: Меньше' },
  { value: 'post-reach more', label: 'Охват поста: Больше' },
  { value: 'post-reach less', label: 'Охват поста: Меньше' },
  { value: 'price more', label: 'Цена: Больше' },
  { value: 'price less', label: 'Цена: Меньше' },
];

const formats = [
	'Нативный',
	'Стандартный',
	'Без удаления',
]

export const ChannelsCatalog = () => {
	const [selectedOption, setSelectedOption] = useState(options[0]);
	const [filtered, setFiltered] = useState([...channels]);

	const [cart, set_cart] = useState(() => {
		const saved = localStorage.getItem("cart");
		const initialValue = JSON.parse(saved);
		return initialValue || "";
	});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
		window.dispatchEvent(new Event("cart-changed"));
	}, [cart])

	const onFilterSubmit = (filter) => {
		setFiltered([...channels].filter(filter))
	}

	const sortChannels = (array) => {
		const subscribers = (a) => a.subscribers.replace(/\s/g, '');
		const postReach = (a) => a.postReach.replace(/\s/g, '');
		const price = (a) => a.price.replace(/\s/g, '');

		switch(selectedOption.value){
			case 'subscribers more': 
				return array.sort((a, b) => subscribers(b) - subscribers(a))
			case 'subscribers less': 
				return array.sort((a, b) => subscribers(a) - subscribers(b))
			case 'post-reach more': 
				return array.sort((a, b) => postReach(b) - postReach(a))
			case 'post-reach less': 
				return array.sort((a, b) => postReach(a) - postReach(b))
			case 'price more': 
				return array.sort((a, b) => price(b) - price(a))
			case 'price less': 
				return array.sort((a, b) => price(a) - price(b))
			default: 
				break
		}
	}

	return (
		<div className={s.wrapper}>
			<div className="container">
				<h2 className={s.title}>
					Каталог каналов
				</h2>
				<p className={s.subtitle}>
					{(channels.length + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')} каналов
				</p>
				<div className={s.flex}>
					<Filters onFilterSubmit={onFilterSubmit} maxSubscribersNumber={
						Math.max(...channels.map(o => Number(o.subscribers.replace(/\s/g, ''))))}/>
					<div className={s.content}>
						<div className={s.header}>
							<Select defaultValue={options[0]} options={options} setSelectedOption={setSelectedOption}/>
							<span>
								Найдено: {(filtered.length + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}
							</span>
						</div>
						{sortChannels(filtered).map(channel => (
							<ChannelCard  updateCart={set_cart} formats={formats} cart={cart} {...channel}/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
