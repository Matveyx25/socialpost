import React, { useEffect, useState } from 'react'
import s from './channels-catalog.module.scss'
import { Filters } from '../../Filters/Filters'
import { ChannelCard } from '../../ChannelCard/ChannelCard';
import channels from '../../../data/channels.json'
import { Select } from '../../Shared/Select/Select';
import { useMediaQuery } from 'react-responsive';
import { FilterModal } from '../../Filters/FilterModal';

const options = [
  { value: 'subscribers more', label: 'Подписчиков: Больше' },
  { value: 'subscribers less', label: 'Подписчиков: Меньше' },
  { value: 'post-reach more', label: 'Охват поста: Больше' },
  { value: 'post-reach less', label: 'Охват поста: Меньше' },
  { value: 'price more', label: 'Цена: Больше' },
  { value: 'price less', label: 'Цена: Меньше' },
];

export const ChannelsCatalog = () => {
	const [selectedOption, setSelectedOption] = useState(options[0]);
	const [filtered, setFiltered] = useState([...channels]);
	const [modalIsOpen, setModalIsOpen] = useState('')
	const isMobile = useMediaQuery({
		query: '(max-width: 820px)'
	})


	const [cart, set_cart] = useState(() => {
		const saved = localStorage.getItem("cart");
		const initialValue = JSON.parse(saved);
		return initialValue || "";
	});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
		window.dispatchEvent(new Event("cart-changed"));
	}, [cart])

	useEffect(() => {
		const saved = localStorage.getItem("cart");
		const initialValue = JSON.parse(saved);
		set_cart(initialValue || '')
	}, [filtered])

	const onFilterSubmit = (filter) => {
		setFiltered([...channels].filter(filter))
	}

	const sortChannels = (array) => {
		const subscribers = (a) => a.subscribers.replace(/\s/g, '');
		const postReach = (a) => a.postReach.replace(/\s/g, '');
		const price = (a) => a.price[Object.keys(a.price)[0]].replace(/\s/g, '')

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
			{isMobile && <FilterModal isOpen={modalIsOpen} setOpen={setModalIsOpen} onFilterSubmit={onFilterSubmit} maxSubscribersNumber={
						Math.max(...channels.map(o => Number(o.subscribers.replace(/\s/g, ''))))}/>}
			<div className="container">
				<h2 className={s.title}>
					Каталог каналов
				</h2>
				<p className={s.subtitle}>
					{(channels.length + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')} каналов
				</p>
				<div className={s.flex}>
					{isMobile || <Filters onFilterSubmit={onFilterSubmit} maxSubscribersNumber={
						Math.max(...channels.map(o => Number(o.subscribers.replace(/\s/g, ''))))}/>}
					<div className={s.content}>
						<div className={s.header}>
							{isMobile && <button className={s.filterBtn} onClick={() => setModalIsOpen('filter-modal')}>Фильтры</button>}
							<Select defaultValue={options[0]} options={options} setSelectedOption={setSelectedOption}/>
							<span>
								Найдено: {(filtered.length + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}
							</span>
						</div>
						{sortChannels(filtered).map(channel => (
							<ChannelCard  updateCart={set_cart} key={'channel-id-' + channel.id} cart={cart} {...channel}/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
