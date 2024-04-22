import React, { useState } from 'react'
import s from './payments.module.scss'
import { IconRefresh, IconSortDescending } from '@tabler/icons-react'
import { Select } from '../../../Shared/Select/Select';
import { RangeCalendar } from '../../../Shared/RangeCalendar/RangeCalendar'
import { Pagination } from '../../../Shared/Pagination/Pagination'
import { Button } from '../../../Shared/Button/Button'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { DashboardCard } from '../dashboard-card';
import channelsJson from '../../../../data/channels.json'
import { useProfile } from '../../../../hooks/useProfile';
import { useBalanceOperations } from '../../../../hooks/publisherBalance';
import { Loader } from '../../../Shared/Loader/Loader';

const payments = [
	{
		nameOfAd: 'Онлайн-Школа “Импульс”',
		nameOfPost: 'Бесплатный урок',
		channel: 'Marvel/DC',
		dateDone: '25.10.2023 в 12:30',
		price: '2400',
	}
]

export const Payments = () => {
	const {data: profile, isFetched: isProfileFetched} = useProfile()
	const {data: operations, isFetched: isOperationsFetched} = useBalanceOperations()
	const [page, setPage] = useState(1)
	const [size, setSize] = useState(30)

	const [setModal] = useOutletContext()

	return (
		<div className={s.grid}>
			<DashboardCard className={s.balance}>
				<div>
					<p>{profile?.balance} ₽</p>
					<span className={s.label}>Баланс кабинета</span>
				</div>
				<Button label={'Вывести'} className={s.btn} onClick={() => setModal('withdraw-modal')}/>
			</DashboardCard>
			<div className={s.tableCard}>
				<div className={s.filters}>
					<RangeCalendar/>
					Найдено выплат: {operations?.length}
					<Button label='Сбросить' leftIcon={<IconRefresh/>} theme='secondary' className={s.refreshBtn}/>
				</div>
				<div className={s.tableWrapper}>
					<table className={s.table}>
						<thead>
								<tr>
									<th>Тип</th>
									<th>Статус</th>
									<th>
										<div className={s.flex}>
										Дата
											<IconSortDescending size={18}/>
										</div>
									</th>
									<th>
										<div className={s.flex}>
										Сумма
											<IconSortDescending size={18}/>
										</div>
									</th>
								</tr>
						</thead>
						<tbody>
								{isOperationsFetched ? operations?.map(el => (
									<tr key={el.id}>
										<td>
										{/* INCOME, WITHDRAWAL_SELF_EMPLOYED, WITHDRAWAL_IE, WITHDRAWAL_LEGAL_ENTITY, WITHDRAWAL_CRYPTO_WALLET */}
											<div className={s.center}>
												{el.type}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{/* PENDING, EXECUTED, DECLINED */}
												{el.status}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.dataTime}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.amount}₽
											</div>
										</td>
									</tr>
								)) : <Loader />}
						</tbody>
					</table>
				</div>
				<Pagination 
				currentPage={page}
        totalCount={10}
        pageSize={size}
				setSize={setSize}
        onPageChange={page => setPage(page)}/>
			</div>
		</div>
	)
}