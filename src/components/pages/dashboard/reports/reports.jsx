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
import { useRequestsStats } from '../../../../hooks/useRequestsStats'
import { formatToISO } from '../../../../helpers/formatToISO'

export const Reports = () => {
	const [selectedChannel, setSelectedChannel] = useState(null)
	const [page, setPage] = useState(1)
	const [size, setSize] = useState(30)
	const [dateRange, setDateRange] = useState([null, null])
	const {data: requestsStats} = useRequestsStats()

	const tabs = [
		{label: 'Ожидают публикации', id: 0, count: requestsStats?.pendingCount, value: 'PENDING'},
		{label: 'Активные', id: 1, count: requestsStats?.activeCount, value: 'ACTIVE'},
		{label: 'Выполненные', id: 2, count: requestsStats?.completedCount, value: 'COMPLETED'},
		{label: 'Отклоненные', id: 3, count: requestsStats?.declinedCount, value: 'DECLINED'},
		{label: 'Невыполненные', id: 4, count: requestsStats?.expiredCount, value: 'EXPIRED'}
	]

	const [tab, setTab] = useState(tabs[0].id)

	const {data: requests} = usePublishersRequests({
    _start: (page - 1) * 30,
    _end: page * 30,
		start_publish_time: dateRange[0] ? formatToISO(dateRange[0])?.slice(0, 10) : null,
		end_publish_time: dateRange[1] ? formatToISO(dateRange[1])?.slice(0, 10) : null,
		status: tabs[tab].value,
		channel_id: selectedChannel?.value
	})
	const {data: channels} = useMyChannels()
	const navigate = useNavigate()

	const reset = () => {
		setSelectedChannel(null)
		setDateRange([null, null])
	}


  function formatDate(input) {
    if (!input) {
      return "-";
    }
    const date = new Date(input);

    return date.toLocaleTimeString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
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
												{formatDate(el.publishTime)}
											</div>
										</td>
										<td>
											<div className={s.center}>
												{formatDate(el.completionTime)}
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
