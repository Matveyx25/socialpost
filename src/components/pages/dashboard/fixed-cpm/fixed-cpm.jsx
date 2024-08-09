import React, { useState } from 'react'
import { Pagination } from '../../../Shared/Pagination/Pagination'
import { Loader } from '../../../Shared/Loader/Loader'
import { IconPlus, IconRefresh, IconSearch } from '@tabler/icons-react'
import { Button } from '../../../Shared/Button/Button'
import { useNavigate, useOutletContext } from 'react-router-dom'
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
	const navigate = useNavigate()

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
                <th className={s.th1}>
									Название кампании
								</th>
                <th className={s.th2}>
									Сроки
                </th>
                <th className={s.th3}>
									Оставшиеся показы
                </th>
                <th className={s.th4}>
									Показов всег
                </th>
                <th className={s.th5}>
									Участники
                </th>
                <th className={s.th6}>
									Ставка CPM
                </th>
                <th className={s.th7}>
									
                </th>
              </tr>
            </thead>
						<tbody>
							{isFetched ? (
								campaigns?.data.map((el) => (
									<tr key={el.id}>
										<td className={s.td1}>
											<div className={s.center}>{el.name}</div>
										</td>
										<td className={s.td2}>
												{new Date(el.cpmStartDate).toLocaleDateString("ru-RU", {
													formatMatcher: "basic",
												}) +
														" - " +
												new Date(el.cpmEndDate).toLocaleDateString("ru-RU", {
													formatMatcher: "basic",
												})}
										</td>
										<td className={s.td3}>
											<div className={s.center}>{el.cpmChannelPostsLimit - el.cpmViews}</div>
										</td>
										<td className={s.td4}>
											<div className={s.center}>{el.cpmViews}</div>
										</td>
										<td className={s.td5}>
											<div className={s.center}>-</div>
										</td>
										<td className={s.td6}>
											<div className={s.center}>{el.cpmValue}</div>
										</td>
										<td className={s.td7}>
											<div className={s.end}>
													<Button
														label={"Принять участие"}
														size="small"
														onClick={(event) => {
															event.stopPropagation();
															navigate("./" + el.id);
														}}
													/>
											</div>
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
