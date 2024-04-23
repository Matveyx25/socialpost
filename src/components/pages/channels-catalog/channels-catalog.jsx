import React, { useEffect, useState } from 'react'
import s from './channels-catalog.module.scss'
import { Filters } from '../../Filters/Filters'
import { ChannelCard } from '../../ChannelCard/ChannelCard';
import { Select } from '../../Shared/Select/Select';
import { useMediaQuery } from 'react-responsive';
import { FilterModal } from '../../Filters/FilterModal';
import { useChannels } from '../../../hooks/useChannels';
import { Loader } from '../../Shared/Loader/Loader';

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
	const [modalIsOpen, setModalIsOpen] = useState('')
	const isMobile = useMediaQuery({
		query: '(max-width: 820px)'
	})

	const [cart, set_cart] = useState(() => {
		const saved = localStorage.getItem("cart");
		const initialValue = JSON.parse(saved);
		return initialValue || "";
	});

	const {data: channels, isFetched} = useChannels()

	const onFilterSubmit = () => {}

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
		window.dispatchEvent(new Event("cart-changed"));
	}, [cart])

	return (
		<div className={s.wrapper}>
			{isMobile && <FilterModal isOpen={modalIsOpen} setOpen={setModalIsOpen} onFilterSubmit={onFilterSubmit}
			maxSubscribersNumber={10000000}/>}
			<div className="container">
				<h2 className={s.title}>
					Каталог каналов
				</h2>
				<p className={s.subtitle}>
					{(channels?.length + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')} каналов
				</p>
				<div className={s.flex}>
					{isMobile || <Filters onFilterSubmit={onFilterSubmit} maxSubscribersNumber={10000000}/>}
					<div className={s.content}>
						<div className={s.header}>
							{isMobile && <button className={s.filterBtn} onClick={() => setModalIsOpen('filter-modal')}>Фильтры</button>}
							<Select defaultValue={options[0]} options={options} setSelectedOption={setSelectedOption}/>
							<span>
								Найдено: {(channels?.length + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}
							</span>
						</div>
						{isFetched ? channels?.map(channel =>{
						const {
              nativePostPriceEnabled,
              post1For24PriceEnabled,
              post1For48PriceEnabled,
              post2For48PriceEnabled,
							nativePostPrice,
							post1For24Price,
							post1For48Price,
							post2For48Price
            } = channel;
						const formats = [
							{enabled: nativePostPriceEnabled, label: 'Нативный', value: 'nativePostPrice', price: nativePostPrice},
							{enabled: post1For24PriceEnabled, label: '1/24', value: 'post1For24Price', price: post1For24Price},
							{enabled: post1For48PriceEnabled, label: '1/48', value: 'post1For48Price', price: post1For48Price},
							{enabled: post2For48PriceEnabled, label: '2/48', value: 'post2For48Price', price: post2For48Price},
						].filter(el => el.enabled)

						return (
              <ChannelCard
                updateCart={set_cart}
                key={"channel-id-" + channel.id}
                {...{ channel, cart, formats }}
              />
            );}) : <Loader/>}
					</div>
				</div>
			</div>
		</div>
	)
}
