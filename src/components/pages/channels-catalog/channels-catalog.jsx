import React, { useEffect, useState } from 'react'
import s from './channels-catalog.module.scss'
import { Filters } from '../../Filters/Filters'
import { ChannelCard } from '../../ChannelCard/ChannelCard';
import { Select } from '../../Shared/Select/Select';
import { useMediaQuery } from 'react-responsive';
import { FilterModal } from '../../Filters/FilterModal';
import { useChannels } from '../../../hooks/useChannels';
import { Loader } from '../../Shared/Loader/Loader';
import { useCart } from '../../../hooks/useCart';
import { useUpdateCart } from '../../../hooks/useUpdateCart';

const options = [
  { value: 'subscribers more', label: 'Подписчиков: Больше' },
  { value: 'subscribers less', label: 'Подписчиков: Меньше' },
  { value: 'post-reach more', label: 'Охват поста: Больше' },
  { value: 'post-reach less', label: 'Охват поста: Меньше' },
  { value: 'price more', label: 'Цена: Больше' },
  { value: 'price less', label: 'Цена: Меньше' },
];

export const ChannelsCatalog = () => {
	const {data: cart} = useCart()
	const {mutate: updateCart} = useUpdateCart()
	
	const [selectedOption, setSelectedOption] = useState(options[0]);
	const [modalIsOpen, setModalIsOpen] = useState('')
	const [filters, setFilters] = useState(null)
	const isMobile = useMediaQuery({
		query: '(max-width: 820px)'
	})

	const {data: channels, isFetched, refetch} = useChannels(filters)

	const onFilterSubmit = (f) => {
		setFilters({
			subscribers_min: f?.minSubscribers,
			subscribers_max: f?.maxSubscribers,
			average_post_reach_min: f?.minPostReach,
			average_post_reach_max: f?.maxPostReach,
			cost_per_view_min: f?.minCPV,
			cost_per_view_max: f?.maxCPV,
			price_min: f?.minPrice,
			price_max: f?.maxPrice,
		})
		refetch()
	}

	return (
		<div className={s.wrapper}>
			{isMobile && <FilterModal isOpen={modalIsOpen} setOpen={setModalIsOpen} onFilterSubmit={onFilterSubmit}
			maxSubscribersNumber={100000}/>}
			<div className="container">
				<h2 className={s.title}>
					Каталог каналов
				</h2>
				<p className={s.subtitle}>
					{(channels?.length + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')} каналов
				</p>
				<div className={s.flex}>
					{isMobile || <Filters onFilterSubmit={onFilterSubmit} maxSubscribersNumber={100000}/>}
					<div className={s.content}>
						<div className={s.header}>
							{isMobile && <button className={s.filterBtn} onClick={() => setModalIsOpen('filter-modal')}>Фильтры</button>}
							<Select defaultValue={options[0]} options={options} setSelectedOption={setSelectedOption}/>
							<span>
								Найдено: {(channels?.length + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}
							</span>
						</div>
						{isFetched ? channels?.map(channel =>{
						const formats = [
							{enabled: channel?.nativePostPriceEnabled, label: 'Нативный', value: 'NATIVE_POST_PRICE', price: channel?.nativePostPrice},
							{enabled: channel?.post1For24PriceEnabled, label: '1/24', value: 'POST_1_FOR_24', price: channel?.post1For24Price},
							{enabled: channel?.post1For48PriceEnabled, label: '1/48', value: 'POST_1_FOR_48', price: channel?.post1For48Price},
							{enabled: channel?.post2For48PriceEnabled, label: '2/48', value: 'POST_2_FOR_48', price: channel?.post2For48Price},
						].filter(el => el.enabled)

						return (
              <ChannelCard
                updateCart={updateCart}
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
