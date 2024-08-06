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

	// const {data: clients, isFetched} = usePublishersCPMs({
	// 	campaign_name: search,
	// 	_start: (page - 1) * 30,
	// 	_end: page * 30,
	// })
	
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
						placeholder={'Найти клиента'} value={search} onChange={(v) => setSearch(v.target.value)}/>
						{/* Найдено клиентов: {clients?.headers['x-total-count']} */}
					</div>
          
          <Button
            label="Добавить клиента"
            leftIcon={<IconPlus size={20}/>}
            className={s.addBtn}
						onClick={() => {
							setModal('add-my-client')
						}}
          />
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
						<tbody>
						{/* {
							"type": "NEW_POST",
							"status": "NOT_MODERATED",
							"cpmStatus": "INACTIVE",
							"campaignId": 0,
							"content": "string",
							"uploads": [
								{
									"id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
									"fileUrl": "string",
									"thumbnailUrl": "string",
									"mediaType": "string"
								}
							],
							"markingType": "NONE",
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
							<tr>
								<td>
									<div className={s.center}>
										{'el.name'}
									</div>
								</td>
								<td>
									<div className={s.center}>
											{/* {new Date(post?.cpmStartDate).toLocaleDateString("ru-RU", {
												formatMatcher: "basic",
											}) +
												" - " +
												new Date(post?.cpmEndDate).toLocaleDateString("ru-RU", {
													formatMatcher: "basic",
												})} */}
											{new Date().toLocaleDateString("ru-RU", {
												formatMatcher: "basic",
											}) +
												" - " +
												new Date().toLocaleDateString("ru-RU", {
													formatMatcher: "basic",
												})}
									</div>
								</td>
								<td>
									<div className={s.center}>
										{'el.name'}
									</div>
								</td>
								<td>
									<div className={s.center}>
										{'el.cpmViews'}
									</div>
								</td>
								<td>
									<div className={s.center}>
										{'el.name'}
									</div>
								</td>
								<td>
									<div className={s.center}>
										{'el.name'}
									</div>
								</td>
							</tr>
						</tbody>
            {/* <tbody>
              {isFetched ? (
                clients?.data.map((el) => (
                  <tr key={el.id}>
                    <td>
                      <div className={s.center}>
                        {
                          {
                            PHYSICAL_ENTITY: "Физическое лицо",
                            IE: "ИП",
                            OOO: "Юридическое лицо",
                          }[el.type]
                        }
                      </div>
                    </td>
                    <td>
                      <div className={s.center}>
												{
                          {
                            AGENCY: "Агентство",
                            ADVERTISER: "Рекламодатель",
                          }[el.role]
                        }
                      </div>
                    </td>
										<td>
                      <div className={s.center}>{el.name}</div>
                    </td>
										<td>
                      <div className={s.center}>{el.inn ? el.inn : '-'}</div>
                    </td>
										<td>
                      <div className={s.center}>{el.phone ? el.phone : '-'}</div>
                    </td>
										<td>
                      <div className={s.center}>{el.contractNumber ? '№' + el.contractNumber  : '-'}</div>
                    </td>
										<td>
                      <div className={s.center}>{el.contractSubject ? el.contractSubject : '-'}</div>
											
                    </td>
                    <td>
                      <div className={s.center}>{(new Date(el.conclusionDate)).toLocaleDateString('ru-RU', {dateStyle: 'short'})}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <Loader />
              )}
            </tbody> */}
          </table>
        </div>
        {/* {clients?.headers['x-total-count'] && 
				<Pagination
          currentPage={page}
          totalCount={+clients?.headers['x-total-count']}
          pageSize={size}
          setSize={setSize}
          onPageChange={(page) => setPage(page)}
        />} */}
      </div>
    </div>
  );
}
