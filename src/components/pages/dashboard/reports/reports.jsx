import React, { useState } from 'react'
import s from './reports.module.scss'
import { DashboardCard } from '../dashboard-card'
import { Tabs } from '../../../Shared/Tabs/Tabs'
import { IconExternalLink, IconRefresh } from '@tabler/icons-react'
import { Select } from '../../../Shared/Select/Select';
import { Pagination } from '../../../Shared/Pagination/Pagination'
import { Button } from '../../../Shared/Button/Button'
import { useNavigate } from 'react-router-dom'
import { usePublishersRequests } from '../../../../hooks/usePublishersRequests';
import { priceSeparator } from '../../../../helpers/priceSeparator';
import { useMyChannels } from '../../../../hooks/useMyChannels'
import { RangeCalendar } from '../../../Shared/RangeCalendar/RangeCalendar'

const tabs = [
	{label: 'Ожидают публикации', id: 0, value: 'PENDING'},
	{label: 'Активные', id: 1, value: 'ACTIVE'},
	{label: 'Выполненные', id: 2, value: 'COMPLETED'},
	{label: 'Отклоненные', id: 3, value: 'DECLINED'},
	{label: 'Невыполненные', id: 4, value: 'EXPIRED'}
]

export const Reports = () => {
	const [tab, setTab] = useState(tabs[0].id)
	const [selectedChannel, setSelectedChannel] = useState(null)
	const [page, setPage] = useState(1)
	const [size, setSize] = useState(30)
	const [dateRange, setDateRange] = useState([null, null])


	const {data: requests} = usePublishersRequests({
    _start: (page - 1) * 30,
    _end: page * 30,
		start_publish_time: dateRange[0] ? (new Date(dateRange[0])).toISOString() : null,
		end_publish_time: dateRange[1] ? (new Date(dateRange[1])).toISOString() : null,
		status: tabs[tab].value,
		channel_id: selectedChannel?.value
	})
	const {data: channels} = useMyChannels()
	const navigate = useNavigate()

	const reset = () => {
		setSelectedChannel(null)
		setDateRange([null, null])
	}

	return (
		<div className={s.grid}>
			<DashboardCard>
				<Tabs {...{tabs, tab, setTab}}/>
			</DashboardCard>
			<div className={s.tableCard}>
				<div className={s.filters}>
					{channels && <Select
						options={[
							{ label: "Все каналы", value: null },
							...channels?.map((el) => ({ label: el.name, value: el.id })),
						]}
						required={true}
						placeholder={"Все каналы"}
						setSelectedOption={setSelectedChannel}
						value={selectedChannel}
						fullWidth={true}
						isMulti={false}
					/>}
					<RangeCalendar {...{ dateRange, setDateRange }} />
					Найдено заявок: {requests?.headers["x-total-count"]}
					<Button label='Сбросить' leftIcon={<IconRefresh/>} theme='secondary' onClick={reset} className={s.refreshBtn}/>
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
										</div>
									</th>
									<th>
										<div className={s.flex}>
											Дата публикации
										</div>
									</th>
									<th>
										<div className={s.flex}>
											Дата выполнения
										</div>
									</th>
									<th>
										<div className={s.flex}>
											Стоимость
										</div>
									</th>
									<th>Ссылка</th>
								</tr>
						</thead>
						<tbody>
								{requests?.data?.map(el => (
									<tr onClick={() => navigate('./' + el.id)}>
										<td>
											<div className={s.preview}>
												{el?.postThumbnailsUrls ? <div className={s.img}>
													<img src={el.postThumbnailsUrls[0]} alt="" />
												</div> : ''}
												<p>{el?.postContent?.replaceAll('<br/>', ' ').replace(/<[^>]*>?/gm, '').replaceAll('*', '')}</p>
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el?.campaignName}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.postName}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.channelName}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.publishStartDate}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.completionTime ? 'Выполнено' : '-'}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{priceSeparator(el.price)}₽
											</div>
										</td>
										<td>
											<div className={s.center}>
												{el.link ? <IconExternalLink color='#436CFF' size={24}/> : '-'}
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				{requests?.headers["x-total-count"] && (
            <Pagination
              currentPage={page}
              totalCount={+requests?.headers["x-total-count"]}
              pageSize={size}
              setSize={setSize}
              onPageChange={(page) => setPage(page)}
            />
          )}
			</div>
		</div>
	)
}
