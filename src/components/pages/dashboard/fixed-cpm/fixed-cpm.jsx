import React, { useState } from 'react'
import { Pagination } from '../../../Shared/Pagination/Pagination'
import { Loader } from '../../../Shared/Loader/Loader'
import { IconPlus, IconRefresh, IconSearch } from '@tabler/icons-react'
import { Button } from '../../../Shared/Button/Button'
import { useOutletContext } from 'react-router-dom'
import s from './fixed-cpm.module.scss'
import { Input } from '../../../Shared/Input/Input'
import { usePublishersCPMs } from '../../../../hooks/usePublishersCPMs'

export const FixedCPM = () => {
	const [page, setPage] = useState(1)
	const [size, setSize] = useState(30)
	const [search, setSearch] = useState('')

	const {data: campaigns, isFetched} = usePublishersCPMs({
		campaign_name: search,
		_start: (page - 1) * 30,
		_end: page * 30,
	})
	
	const [setModal] = useOutletContext()

	// Название кампании
	// Сроки
	// Оставшиеся показы
	// Показов всего
	// Участники
	// Ставка CPM

	return (
    <div className={s.grid}>
      <div className={s.tableCard}>
        <div className={s.filters}>
					<div className={s.selects}>
						<Input leftIcon={<IconSearch/>} 
						placeholder={'Найти кампанию'} value={search} onChange={(v) => setSearch(v.target.value)}/>
						Найдено кампаний: {campaigns?.headers['x-total-count']}
					</div>
          
        </div>
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>
									Название кампании
								</th>
                <th>
									Сроки
                </th>
                <th>
									Оставшиеся показы
                </th>
                <th>
									Показов всего
                </th>
                <th>
									Участники
                </th>
                <th>
									Ставка CPM
                </th>
                <th>
									
                </th>
              </tr>
            </thead>
						{/* {
							"id": 0,
							"name": "string",
							"type": "NEW_POST",
							"status": "NOT_MODERATED",
							"cpmStatus": "INACTIVE",
							"campaignId": 0,
							"markingType": "NONE",
							"cpmStartDate": "2024-08-06",
							"cpmEndDate": "2024-08-06",
							"cpmTags": [
								"string"
							],
							"cpmChannelPostsLimit": 0,
							"telegramPostUrl": "string",
							"moderationComment": "string",
							"declineReason": "string",
							"cancelReason": "string",
							"moneyBlocked": 0,
							"totalMoneySpent": 0,
							"cpmBudget": 0,
							"cpmValue": 0,
							"cpmViews": 0,
							"totalRequestsCount": 0,
							"pendingRequestsCount": 0,
							"activeRequestsCount": 0,
							"completedRequestsCount": 0,
							"declinedRequestsCount": 0,
							"expiredRequestsCount": 0
						} */}
							
						<tbody>
							{isFetched ? (
								campaigns?.data.map((el) => (
									<tr key={el.id}>
										<td>
											<div className={s.center}>{el.name}</div>
										</td>
										<td>
												{new Date(el.cpmStartDate).toLocaleDateString("ru-RU", {
													formatMatcher: "basic",
												}) +
														" - " +
												new Date(el.cpmEndDate).toLocaleDateString("ru-RU", {
													formatMatcher: "basic",
												})}
										</td>
										<td>
											<div className={s.center}>{el.cpmChannelPostsLimit - el.cpmViews}</div>
										</td>
										<td>
											<div className={s.center}>{el.cpmViews}</div>
										</td>
										<td>
											<div className={s.center}>-</div>
										</td>
										<td>
											<div className={s.center}>{el.cpmValue}</div>
										</td>
										<td>
											<div className={s.center}></div>
										</td>
									</tr>
								))
							) : (
								<Loader />
							)}
						</tbody>
          </table>
        </div>
        {campaigns?.headers['x-total-count'] && 
				<Pagination
          currentPage={page}
          totalCount={+campaigns?.headers['x-total-count']}
          pageSize={size}
          setSize={setSize}
          onPageChange={(page) => setPage(page)}
        />}
      </div>
    </div>
  );
}
