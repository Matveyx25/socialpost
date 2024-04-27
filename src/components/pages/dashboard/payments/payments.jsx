import React, { useEffect, useState } from 'react'
import s from './payments.module.scss'
import { IconRefresh, IconSortDescending } from '@tabler/icons-react'
import { RangeCalendar } from '../../../Shared/RangeCalendar/RangeCalendar'
import { Pagination } from '../../../Shared/Pagination/Pagination'
import { Button } from '../../../Shared/Button/Button'
import { useOutletContext } from 'react-router-dom'
import { DashboardCard } from '../dashboard-card';
import { useProfile } from '../../../../hooks/useProfile';
import { useBalanceOperations } from '../../../../hooks/publisherBalance';
import { Loader } from '../../../Shared/Loader/Loader';

export const Payments = () => {
	const [dateRange, setDateRange] = useState([null, null])
	const [page, setPage] = useState(1)
	const [size, setSize] = useState(30)

	const {data: profile} = useProfile()
	const {data: operations, isFetched: isOperationsFetched} = useBalanceOperations({
		start_date: dateRange[0] ? (new Date(dateRange[0])).toISOString() : null,
		end_date: dateRange[1] ? (new Date(dateRange[1])).toISOString() : null,
	})
	
	const [setModal] = useOutletContext()

	useEffect(() => {
		if(dateRange[0] || dateRange[1]){

		}
	}, [dateRange])

	return (
    <div className={s.grid}>
      <DashboardCard className={s.balance} >
        <div>
          <p>{profile?.balance} ₽</p>
          <span className={s.label}>Баланс кабинета</span>
        </div>
        <Button
          label={"Вывести"}
          className={s.btn}
          onClick={() => setModal("withdraw-modal")}
        />
      </DashboardCard>
      <div className={s.tableCard}>
				<div className={s.cardHeader}>
						<span>История операций</span>
				</div>
        <div className={s.filters}>
          <RangeCalendar {...{dateRange, setDateRange}}/>
          Найдено выплат: {operations?.length}
          <Button
            label="Сбросить"
            leftIcon={<IconRefresh />}
            theme="secondary"
            className={s.refreshBtn}
          />
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
                  </div>
                </th>
                <th>
                  <div className={s.flex}>
                    Сумма
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {isOperationsFetched ? (
                operations?.map((el) => (
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
        <Pagination
          currentPage={page}
          totalCount={10}
          pageSize={size}
          setSize={setSize}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
}