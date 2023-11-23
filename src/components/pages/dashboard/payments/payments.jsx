import React, { useState } from 'react'
import s from './payments.module.scss'
import { IconRefresh, IconSortDescending } from '@tabler/icons-react'
import { Select } from '../../../Shared/Select/Select';
import { RangeCalendar } from '../../../Shared/RangeCalendar/RangeCalendar'
import { Pagination } from '../../../Shared/Pagination/Pagination'
import { Button } from '../../../Shared/Button/Button'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { DashboardCard } from '../dashboard-card';

const payments = [
	{
		nameOfAd: 'Онлайн-Школа “Импульс”',
		nameOfPost: 'Бесплатный урок',
		channel: 'Marvel/DC',
		dateDone: '25.10.2023 в 12:30',
		price: '2400',
	},
	{
		nameOfAd: 'Онлайн-Школа “Импульс”',
		nameOfPost: 'Бесплатный урок',
		channel: 'Marvel/DC',
		dateDone: '25.10.2023 в 12:30',
		price: '2400',
	},
	{
		nameOfAd: 'Онлайн-Школа “Импульс”',
		nameOfPost: 'Бесплатный урок',
		channel: 'Marvel/DC',
		dateDone: '25.10.2023 в 12:30',
		price: '2400',
	},
	{
		nameOfAd: 'Онлайн-Школа “Импульс”',
		nameOfPost: 'Бесплатный урок',
		channel: 'Marvel/DC',
		dateDone: '25.10.2023 в 12:30',
		price: '2400',
	},
	{
		nameOfAd: 'Онлайн-Школа “Импульс”',
		nameOfPost: 'Бесплатный урок',
		channel: 'Marvel/DC',
		dateDone: '25.10.2023 в 12:30',
		price: '2400',
	},
]

const channels = [
  { value: 'all-channels', label: 'Все каналы' },
  { value: 'channel-1', label: 'Канал 1' },
  { value: 'channel-2', label: 'Канал 2' },
  { value: 'channel-3', label: 'Канал 3' },
  { value: 'channel-4', label: 'Канал 4' },
];

export const Payments = () => {
	const [selectedChannel, setSelectedChannel] = useState()
	const [page, setPage] = useState(1)
	const [size, setSize] = useState(30)

	const [setModal] = useOutletContext()

	return (
		<div className={s.grid}>
			<DashboardCard className={s.balance}>
				<div>
					<p>24,500 ₽</p>
					<span className={s.label}>Баланс кабинета</span>
				</div>
				<Button label={'Вывести'} className={s.btn} onClick={() => setModal('withdraw-modal')}/>
			</DashboardCard>
			<div className={s.tableCard}>
				<div className={s.filters}>
					<Select options={channels} defaultValue={channels[0]} setSelectedOption={setSelectedChannel}/>
					<RangeCalendar/>
					Найдено выплат: 12
					<Button label='Сбросить' leftIcon={<IconRefresh/>} theme='secondary' className={s.refreshBtn}/>
				</div>
				<div className={s.tableWrapper}>
					<table className={s.table}>
						<thead>
								<tr>
									<th>Канал</th>
									<th>Название РК</th>
									<th>Название обьявления</th>
									<th>
										<div className={s.flex}>
										Дата начисления
											<IconSortDescending size={18}/>
										</div>
									</th>
									<th>
										<div className={s.flex}>
										Сумма начисления
											<IconSortDescending size={18}/>
										</div>
									</th>
								</tr>
						</thead>
						<tbody>
								{[...payments, ...payments, ...payments].map(el => (
									<tr>
										<td>
											<div className={s.center}>
												{el.channel}
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
												{el.dateDone}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.price}₽
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
