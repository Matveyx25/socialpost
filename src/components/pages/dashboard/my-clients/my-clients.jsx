import React, { useState } from 'react'
import { Pagination } from '../../../Shared/Pagination/Pagination'
import { Loader } from '../../../Shared/Loader/Loader'
import { IconPlus, IconRefresh, IconSearch } from '@tabler/icons-react'
import { Button } from '../../../Shared/Button/Button'
import { useNavigate, useOutletContext } from 'react-router-dom'
import s from './my-clients.module.scss'
import { useMyClients } from '../../../../hooks/useMyClients'
import { Input } from '../../../Shared/Input/Input'

export const MyClients = () => {
	const [page, setPage] = useState(1)
	const [size, setSize] = useState(30)
	const [search, setSearch] = useState('')

	const {data: clients, isFetched} = useMyClients({
		name: search,
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
						placeholder={'Поиск'} value={search} onChange={(v) => setSearch(v.target.value)}/>
					</div>
          
          <Button
            label={<IconPlus size={20}/>}
            className={s.addBtn}
						size='small'
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
									Тип
								</th>
                <th>
									Роль
                </th>
                <th>
									Наименование клиента
                </th>
                <th>
									ИНН
                </th>
                <th>
									Номер телефона
                </th>
              </tr>
            </thead>
            <tbody>
              {isFetched ? (
                clients?.data.map((el) => (
                  <tr key={el.id} onClick={() => navigate('./' + el.id)}>
                    <td>
                      <div className={s.center}>
                        {el?.advertiserInfo ? 
                          {
                            PHYSICAL_ENTITY: "Физическое лицо",
														SELF_EMPLOYED: "Самозанятый",
														IE: "ИП",
														LEGAL_ENTITY: "Юридическое лицо",
                          }[el?.advertiserInfo.type] :
                          {
                            PHYSICAL_ENTITY: "Физическое лицо",
														SELF_EMPLOYED: "Самозанятый",
														IE: "ИП",
														LEGAL_ENTITY: "Юридическое лицо",
                          }[el?.agencyInfo.advertiserType]
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
                      {el?.role === 'AGENCY' ? 
												<div className={s.center}>{el?.agencyInfo?.advertiserInn ? el?.agencyInfo?.advertiserInn : '-'}</div> 
												: 
												<div className={s.center}>{el?.advertiserInfo?.inn ? el?.advertiserInfo?.inn : '-'}</div> 
											}
                    </td>
										<td>
                      {el?.role === 'AGENCY' ? 
												<div className={s.center}>{el?.agencyInfo?.advertiserPhone ? el?.agencyInfo?.advertiserPhone : '-'}</div> 
												: 
												<div className={s.center}>{el?.advertiserInfo?.phone ? el?.advertiserInfo?.phone : '-'}</div> 
											}
                    </td>
                  </tr>
                ))
              ) : (
                <Loader />
              )}
            </tbody>
          </table>
        </div>
        {clients?.headers['x-total-count'] && 
				<Pagination
          currentPage={page}
          totalCount={+clients?.headers['x-total-count']}
          pageSize={size}
          setSize={setSize}
          onPageChange={(page) => setPage(page)}
        />}
      </div>
    </div>
  );
}
