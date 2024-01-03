import React, { useEffect, useState } from 'react'
import s from './channel.module.scss'
import { DashboardCard } from '../dashboard/dashboard-card';
import { useParams } from 'react-router-dom';
import channels from '../../../data/channels.json'
import { Select } from '../../Shared/Select/Select';
import { IconShoppingCart } from '@tabler/icons-react';
import { Button } from '../../Shared/Button/Button';
import { IconX } from '@tabler/icons-react';
import LineChart from '../../Shared/LineChart/LineChart';

const formats = [
	{value: 'Нативный', label: 'Нативный'},
	{value: 'Стандартный', label: 'Стандартный'},
	{value: 'Без удаления', label: 'Без удаления'},
]

export const Channel = () => {
	const { channelId } = useParams()
	const channel = channels.find(el => el.id === channelId)
	const {img, title, type, desc, cpv, er, postReach, subscribers, price} = channel
	
	const [cart, set_cart] = useState(() => {
		const saved = localStorage.getItem("cart");
		const initialValue = JSON.parse(saved);
		return initialValue || "";
	});
	const [inCart, set_inCart] = useState(cart && cart?.find(el => el.id === channelId))
	const [selectedFormat, setSelectedFormat] = useState(inCart ? formats.find(el => el.value === cart?.find(a => a.id === channelId).format) : formats[0])
	
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
		window.dispatchEvent(new Event("cart-changed"));
	}, [cart])

	const addToCart = () => {
		set_inCart(true)
		set_cart([...cart, {id: channelId, count: 1, format: selectedFormat.label}])
	}
	
	const removeFromCart = () => {
		set_inCart(false)
		set_cart(cart.filter(el => el.id !== channelId))
	}

	const postReachData = {
		labels: ["", "", "", "", "", "", "", ""],
		data: [85, 83, 82, 78, 77, 70, 63, 60, 0]
	};

	const subscribersData = {
		labels: ["", "", "", "", "", ""],
		data: [33, 53, 85, 41, 44, 65, 0]
	};

	return (
		<div className={s.wrapper}>
			<div className="container">
				<div className={s.flex}>
					<div className={s.content}>
						<DashboardCard className={s.mainInfo}>
							<div className={s.preview}>
								<div className={s.img}>
									<img src={img}/>
								</div>
								<div className={s.previewContent}>
									<h2>
										{title}
										<span>
											{type}
										</span>
									</h2>
									<p dangerouslySetInnerHTML={{__html: desc}}></p>
								</div>
							</div>
						</DashboardCard>
						<div className={s.row}>
							<DashboardCard className={s.postReach}>
								<div className={s.cardHeader}>
								Средний охват поста
								</div>
								<div className={s.line}></div>
								<p className={s.postReachNumber}>{postReach?.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}</p>
								<ul className={s.postReachList}>
									<li>
										<p>За 12 часов</p>
										<span>250,250</span>
									</li>
									<li>
										<p>За 24 часа</p>
										<span>351,821</span>
									</li>
									<li>
										<p>За 48 часов</p>
										<span>412,526</span>
									</li>
								</ul>
								<LineChart data={postReachData.data} labels={postReachData.labels} borderColor={'#F78F8F'} startColor={'rgba(247, 143, 143, 1)'} endColor={'rgba(255, 255, 255, .34)'}/>
							</DashboardCard>
							<DashboardCard className={s.subscribers}>
								<div className={s.cardHeader}>
								Подписчики
								</div>
								<div className={s.line}></div>
								<p className={s.subscribersNumber}>{subscribers?.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}</p>
								<ul className={s.subscribersList}>
									<li>
										<p>За сегодня</p>
										<span className={s.plus}>+29</span>
									</li>
									<li>
										<p>За неделю</p>
										<span className={s.minus}>-377</span>
									</li>
									<li>
										<p>За месяц</p>
										<span className={s.plus}>+9,800</span>
									</li>
								</ul>
								<LineChart data={subscribersData.data} labels={subscribersData.labels} borderColor={'#436CFF'} startColor={'rgba(67, 108, 255, .34)'} endColor={'rgba(255, 255, 255, .34)'}/>
							</DashboardCard>
						</div>
						<DashboardCard className={s.otherStats}>
							<div className={s.cardHeader}>
								Остальная стаитистика
							</div>
							<div className={s.line}></div>
							<div className={s.stats}>
								<div>
									<span>ER</span>
									<p>{er}%</p>
								</div>
								<div>
									<span>CPV</span>
									<p>{cpv}₽</p>
								</div>
								<div>
									<span>ERR</span>
									<p>{er}%</p>
								</div>
							</div>
						</DashboardCard>
					</div>
					<DashboardCard className={s.buyCard}>
						<div className={s.cardHeader}>
							Купить рекламу
						</div>
						<div className={s.line}></div>
						<Select label={'Формат поста'} options={formats} defaultValue={selectedFormat} setSelectedOption={setSelectedFormat} fullWidth={true}/>
						{inCart ?
							<Button className={s.removeBtn} label={'Убрать'} leftIcon={<IconX size={18}/>} onClick={removeFromCart}/>: 
							<Button className={s.button} label={(price + '').replace(/\s/g, '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')} leftIcon={<IconShoppingCart size={18}/>} onClick={addToCart}/>}
					</DashboardCard>
				</div>
			</div>
		</div>
	)
}