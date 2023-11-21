import React, { useState } from 'react'
import s from './reports.module.scss'
import { DashboardCard } from '../dashboard-card'
import { Tabs } from '../../../Shared/Tabs/Tabs'
import { IconExternalLink, IconRefresh, IconSortDescending } from '@tabler/icons-react'
import { Select } from '../../../Shared/Select/Select';
import { RangeCalendar } from '../../../Shared/RangeCalendar/RangeCalendar'
import { Pagination } from '../../../Shared/Pagination/Pagination'
import { Button } from '../../../Shared/Button/Button'
import { useNavigate } from 'react-router-dom'

const tabs = [
	{label: 'Запросы', count: 4, id: 5},
	{label: 'Ожидают публикации', count: 2, id: 6},
	{label: 'Активные', count: 1, id: 7},
	{label: 'Выполненные', count: 14, id: 8},
	{label: 'Отклоненные', count: 48, id: 9},
	{label: 'Невыполненные', count: 0, id: 10}
]

const reports = [
	{
		img: '/images/post-preview.jpeg', 
		desc: '5 дней дизайн-прокачки.\n 4 интересные UX‑задач...',
		nameOfAd: 'Онлайн-Школа “Импульс”',
		nameOfPost: 'Бесплатный урок',
		channel: 'Marvel/DC',
		datePublic: '25.10.2023 в 12:30',
		price: '2400',
	},
	{
		img: '/images/post-preview.jpeg', 
		desc: '5 дней дизайн-прокачки.\n 4 интересные UX‑задач...',
		nameOfAd: 'Онлайн-Школа “Импульс”',
		nameOfPost: 'Бесплатный урок',
		channel: 'Marvel/DC',
		datePublic: '25.10.2023 в 12:30',
		dateDone: '25.10.2023 в 12:30',
		price: '2400',
		link: 'https://t.me/joinchat/AAAAAFFULXy6e3n0dWtLwg'
	},
	{
		img: '/images/post-preview.jpeg', 
		desc: '5 дней дизайн-прокачки.\n 4 интересные UX‑задач...',
		nameOfAd: 'Онлайн-Школа “Импульс”',
		nameOfPost: 'Бесплатный урок',
		channel: 'Marvel/DC',
		datePublic: '25.10.2023 в 12:30',
		dateDone: '25.10.2023 в 12:30',
		price: '2400',
		link: 'https://t.me/joinchat/AAAAAFFULXy6e3n0dWtLwg'
	},
	{
		img: '/images/post-preview.jpeg', 
		desc: '5 дней дизайн-прокачки.\n 4 интересные UX‑задач...',
		nameOfAd: 'Онлайн-Школа “Импульс”',
		nameOfPost: 'Бесплатный урок',
		channel: 'Marvel/DC',
		datePublic: '25.10.2023 в 12:30',
		dateDone: '25.10.2023 в 12:30',
		price: '2400',
		link: 'https://t.me/joinchat/AAAAAFFULXy6e3n0dWtLwg'
	},
	{
		img: '/images/post-preview.jpeg', 
		desc: '5 дней дизайн-прокачки.\n 4 интересные UX‑задач...',
		nameOfAd: 'Онлайн-Школа “Импульс”',
		nameOfPost: 'Бесплатный урок',
		channel: 'Marvel/DC',
		datePublic: '25.10.2023 в 12:30',
		dateDone: '25.10.2023 в 12:30',
		price: '2400',
		link: 'https://t.me/joinchat/AAAAAFFULXy6e3n0dWtLwg'
	},
]


const channels = [
  { value: 'all-channels', label: 'Все каналы' },
  { value: 'channel-1', label: 'Канал 1' },
  { value: 'channel-2', label: 'Канал 2' },
  { value: 'channel-3', label: 'Канал 3' },
  { value: 'channel-4', label: 'Канал 4' },
];

const options = [
  { value: 'all', label: 'Все' },
];


export const Reports = () => {
	const [tab, setTab] = useState(tabs[0].id)
	const [selectedChannel, setSelectedChannel] = useState()
	const [selectedOption, setSelectedOption] = useState()
	const [page, setPage] = useState(1)
	const [size, setSize] = useState(30)

	const navigation = useNavigate()

	return (
		<div className={s.grid}>
			<DashboardCard>
				<Tabs {...{tabs, tab, setTab}}/>
			</DashboardCard>
			<div className={s.tableCard}>
				<div className={s.filters}>
					<Select options={channels} defaultValue={channels[0]} setSelectedOption={setSelectedChannel}/>
					<Select options={options} defaultValue={options[0]} setSelectedOption={setSelectedOption}/>
					<RangeCalendar/>
					Найдено заявок: 12
					<Button label='Сбросить' leftIcon={<IconRefresh/>} theme='secondary' className={s.refreshBtn}/>
				</div>
				<div className={s.tableWrapper}>
					<table className={s.table}>
						<thead>
								<tr>
									<th>Превью поста</th>
									<th>Название РК</th>
									<th>Название обьявления</th>
									<th>
										<div className={s.flex}>
											Канал публикации
											<IconSortDescending size={18}/>
										</div>
									</th>
									<th>
										<div className={s.flex}>
											Дата публикации
											<IconSortDescending size={18}/>
										</div>
									</th>
									<th>
										<div className={s.flex}>
											Дата выполнения
											<IconSortDescending size={18}/>
										</div>
									</th>
									<th>
										<div className={s.flex}>
											Стоимость
											<IconSortDescending size={18}/>
										</div>
									</th>
									<th>Ссылка</th>
								</tr>
						</thead>
						<tbody>
								{[...reports, ...reports, ...reports].map(el => (
									<tr>
										<td>
											<div className={s.preview}>
												<div className={s.img}>
													<img src={el.img} alt="" />
												</div>
												<p>{el.desc}</p>
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.nameOfAd}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.nameOfPost}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.channel}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.datePublic}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.dateDone ? 'Выполнено' : '-'}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.price}₽
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.link ? <IconExternalLink color='#436CFF' size={24} onClick={() => navigation('/dashboard/appointment')}/> : '-'}
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<Pagination 
				currentPage={page}
        totalCount={300}
        pageSize={size}
				setSize={setSize}
        onPageChange={page => setPage(page)}/>
			</div>
		</div>
	)
}
