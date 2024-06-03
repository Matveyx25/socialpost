import React, { useState } from 'react'
import { Pagination } from '../../../Shared/Pagination/Pagination'
import { Loader } from '../../../Shared/Loader/Loader'
import { IconPlus, IconRefresh } from '@tabler/icons-react'
import { Button } from '../../../Shared/Button/Button'
import { Select } from '../../../Shared/Select/Select'
import { RangeCalendar } from '../../../Shared/RangeCalendar/RangeCalendar'
import { priceSeparator } from '../../../../helpers/priceSeparator'
import { DashboardCard } from '../dashboard-card'
import { useOutletContext } from 'react-router-dom'
import { useMyChannels } from '../../../../hooks/useMyChannels'
import { useBalanceOperations } from '../../../../hooks/publisherBalance'
import { useProfile } from '../../../../hooks/useProfile'
import s from './advertising-companies.module.scss'

export const AdvertisingCompanies = () => {
	const [dateRange, setDateRange] = useState([null, null])
	const [option, setOption] = useState()
	const [channel, setChannels] = useState(null)
	const [page, setPage] = useState(1)
	const [size, setSize] = useState(30)

	const {data: profile} = useProfile()
	const {data: operations, isFetched: isOperationsFetched} = useBalanceOperations({
		start_date: dateRange[0] ? (new Date(dateRange[0])).toISOString() : null,
		end_date: dateRange[1] ? (new Date(dateRange[1])).toISOString() : null,
		type: option?.value,
		_start: (page - 1) * 30,
		_end: page * 30,
	})
	const {data: channels} = useMyChannels()
	
	const [setModal] = useOutletContext()

	return (
    <div className={s.grid}>
      <div className={s.tableCard}>
        <div className={s.filters}>
					<div className={s.selects}>
						<Select
							options={[
								{label: 'Все операции', value: ['WITHDRAWAL_SELF_EMPLOYED', 'WITHDRAWAL_IE', 'WITHDRAWAL_LEGAL_ENTITY', 'WITHDRAWAL_CRYPTO_WALLET', 'INCOME']},
								{label: 'Поступления', value: ["INCOME"]},
								{label: 'Списания', value: ['WITHDRAWAL_SELF_EMPLOYED', 'WITHDRAWAL_IE', 'WITHDRAWAL_LEGAL_ENTITY', 'WITHDRAWAL_CRYPTO_WALLET']},
							]}
							required={true}
							placeholder={'Все операции'}
							setSelectedOption={setOption}
							value={option}
							fullWidth={true}
							isMulti={false}
						/>
					</div>
          
          <Button
            label="Создать кампанию"
            leftIcon={<IconPlus size={20}/>}
            className={s.addBtn}
						onClick={() => {
							setModal('add-campaing')
						}}
          />
        </div>
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>
									Клиент
								</th>
                <th>
									Тип
								</th>
                <th>
									Общий лимит трат
                </th>
                <th>
									Всего потрачено
                </th>
                <th>
									Статус
                </th>
              </tr>
            </thead>
            <tbody>
              {isOperationsFetched ? (
                operations?.data.map((el) => (
                  <tr key={el.id}>
                    <td>
                      <div className={s.center}>
                        {
                          {
                            INCOME: "Поступление",
                            WITHDRAWAL_SELF_EMPLOYED: "Вывод у самозанятого",
                            WITHDRAWAL_IE: "Вывод у ИП",
                            WITHDRAWAL_LEGAL_ENTITY: "Вывод у ЮЛ",
                            WITHDRAWAL_CRYPTO_WALLET: "Вывод с криптокошелька",
                          }[el.type]
                        }
                      </div>
                    </td>
                    <td>
                      <div className={s.center}>
												{
                          {
                            PENDING: "В обработке",
                            EXECUTED: "Исполнено",
                            DECLINED: "Отклонено",
                          }[el.status]
                        }
                      </div>
                    </td>
                    <td>
                      <div className={s.center}>{(new Date(el.dateTime)).toLocaleDateString('ru-RU', {dateStyle: 'medium'})}</div>
                    </td>
                    <td>
                      <div className={s.center}>{el.amount}₽</div>
                    </td>
                  </tr>
                ))
              ) : (
                <Loader />
              )}
            </tbody>
          </table>
        </div>
        {operations?.headers['x-total-count'] && 
				<Pagination
          currentPage={page}
          totalCount={+operations?.headers['x-total-count']}
          pageSize={size}
          setSize={setSize}
          onPageChange={(page) => setPage(page)}
        />}
      </div>
    </div>
  );
}
