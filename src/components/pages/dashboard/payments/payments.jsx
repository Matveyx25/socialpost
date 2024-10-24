import React, { useState } from 'react'
import s from './payments.module.scss'
import { IconRefresh } from '@tabler/icons-react'
import { RangeCalendar } from '../../../Shared/RangeCalendar/RangeCalendar'
import { Pagination } from '../../../Shared/Pagination/Pagination'
import { Button } from '../../../Shared/Button/Button'
import { useOutletContext } from 'react-router-dom'
import { DashboardCard } from '../dashboard-card';
import { useProfile } from '../../../../hooks/useProfile';
import { useBalanceOperations } from '../../../../hooks/publisherBalance';
import { Loader } from '../../../Shared/Loader/Loader';
import { priceSeparator } from '../../../../helpers/priceSeparator'
import { Select } from '../../../Shared/Select/Select'
import { useMyChannels } from '../../../../hooks/useMyChannels';
import { formatToISO } from '../../../../helpers/formatToISO'

export const Payments = () => {
	const [dateRange, setDateRange] = useState([null, null])
	const [option, setOption] = useState()
	const [channel, setChannels] = useState(null)
	const [page, setPage] = useState(1)
	const [size, setSize] = useState(30)

	const {data: profile} = useProfile()
	const {data: operations, isFetched: isOperationsFetched} = useBalanceOperations({
		start_date: dateRange[0] ? formatToISO(dateRange[0])?.slice(0, 10) : null,
		end_date: dateRange[1] ? formatToISO(dateRange[1])?.slice(0, 10) : null,
		type: option?.value,
		_start: (page - 1) * 30,
		_end: page * 30,
	})
	const {data: channels} = useMyChannels()
	
	const [setModal] = useOutletContext()

	return (
    <div className={s.grid}>
      <DashboardCard className={s.balance}>
        <div>
          <p>{priceSeparator(profile?.balance)} ₽</p>
          <span className={s.label}>Баланс кабинета</span>
        </div>
        {profile?.roles?.includes('PUBLISHER') ? <Button
          label={"Вывести"}
          className={s.btn}
          onClick={() => setModal("withdraw-modal")}
        /> : <Button
					label={"Пополнить"}
					className={s.btn}
					onClick={() => setModal("refill-modal")}
				/>}
      </DashboardCard>
      <div className={s.tableCard}>
        <div className={s.cardHeader}>
          <span>История операций</span>
        </div>
        <div className={s.filters}>
          <RangeCalendar {...{ dateRange, setDateRange }} />
          <Select
            options={[
              {
                label: "Все операции",
                value: [
                  "WITHDRAWAL_SELF_EMPLOYED",
                  "WITHDRAWAL_IE",
                  "WITHDRAWAL_LEGAL_ENTITY",
                  "WITHDRAWAL_CRYPTO_WALLET",
                  "INCOME",
									"CAMPAIGN_POST_REQUEST_INCOME",
									"CAMPAIGN_POST_REQUEST_PAYMENT",
									"CPM_CAMPAIGN_POST_INCOME",
									"REPLENISHMENT_REQUEST"
                ],
              },
              { label: "Поступления", value: ["INCOME", "CPM_CAMPAIGN_POST_INCOME", "CAMPAIGN_POST_REQUEST_INCOME", "REPLENISHMENT_REQUEST"] },
              {
                label: "Списания",
                value: [
                  "WITHDRAWAL_SELF_EMPLOYED",
                  "WITHDRAWAL_IE",
                  "WITHDRAWAL_LEGAL_ENTITY",
                  "WITHDRAWAL_CRYPTO_WALLET",
									"CAMPAIGN_POST_REQUEST_PAYMENT",
                ],
              },
            ]}
            required={true}
            placeholder={"Все операции"}
            setSelectedOption={setOption}
            value={option}
            fullWidth={true}
            isMulti={false}
          />
          Найдено выплат: {operations?.headers["x-total-count"]}
          <div className={s.channels}>
            {channels && option?.value[0] === "INCOME" && (
              <Select
                options={[
                  { label: "Все каналы", value: null },
                  ...channels?.map((el) => ({ label: el.name, value: el.id })),
                ]}
                required={true}
                placeholder={"Все каналы"}
                setSelectedOption={setChannels}
                value={channel}
                fullWidth={true}
                isMulti={false}
              />
            )}
          </div>
          <Button
            label="Сбросить"
            leftIcon={<IconRefresh />}
            theme="secondary"
            className={s.refreshBtn}
            onClick={() => {
              setChannels(null);
              setDateRange([null, null]);
              setOption(null);
            }}
          />
        </div>
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Тип</th>
                <th>Статус</th>
                <th>
                  <div className={s.flex}>Дата</div>
                </th>
                <th>
                  <div className={s.flex}>Сумма</div>
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
                            REPLENISHMENT_REQUEST: "Поступление",
                            WITHDRAWAL_SELF_EMPLOYED: "Вывод у самозанятого",
                            WITHDRAWAL_IE: "Вывод у ИП",
                            WITHDRAWAL_LEGAL_ENTITY: "Вывод у ЮЛ",
                            WITHDRAWAL_CRYPTO_WALLET: "Вывод с криптокошелька",
                            CAMPAIGN_POST_REQUEST_INCOME: "Поступление",
                            CPM_CAMPAIGN_POST_INCOME: "Поступление",
                            CAMPAIGN_POST_REQUEST_PAYMENT: "Списание",
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
                      <div className={s.center}>
                        {new Date(el.dateTime).toLocaleDateString("ru-RU", {
                          dateStyle: "medium",
                        })}
                      </div>
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
        {operations?.headers["x-total-count"] && (
          <Pagination
            currentPage={page}
            totalCount={+operations?.headers["x-total-count"]}
            pageSize={size}
            setSize={setSize}
            onPageChange={(page) => setPage(page)}
          />
        )}
      </div>
    </div>
  );
}