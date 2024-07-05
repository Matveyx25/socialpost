import React, { useState } from 'react'
import { Pagination } from '../../../Shared/Pagination/Pagination'
import { Loader } from '../../../Shared/Loader/Loader'
import { IconPlus, IconRefresh, IconSearch } from '@tabler/icons-react'
import { Button } from '../../../Shared/Button/Button'
import { Select } from '../../../Shared/Select/Select'
import { useOutletContext } from 'react-router-dom'
import { useProfile } from '../../../../hooks/useProfile'
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

	return (
    <div className={s.grid}>
      <div className={s.tableCard}>
        <div className={s.filters}>
					<div className={s.selects}>
						<Input leftIcon={<IconSearch/>} 
						placeholder={'Найти клиента'} value={search} onChange={(v) => setSearch(v.target.value)}/>
						Найдено клиентов: {clients?.headers['x-total-count']}
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
                <th>
									№ договора с клиентом
                </th>
                <th>
									Предмет договора									
                </th>
                <th>
									Дата заключения договора
                </th>
              </tr>
            </thead>
            <tbody>
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
