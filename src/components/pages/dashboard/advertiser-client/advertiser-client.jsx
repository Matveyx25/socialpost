import { useState } from 'react';
import { Pagination } from '../../../Shared/Pagination/Pagination'
import { Loader } from '../../../Shared/Loader/Loader'
import { IconPlus } from '@tabler/icons-react';
import { Button } from '../../../Shared/Button/Button'
import { useOutletContext, useParams } from 'react-router-dom'
import s from './advertiser-client.module.scss'
import { useMyClients } from '../../../../hooks/useMyClients'
import { useMyClientContracts } from '../../../../hooks/useMyClientContracts';

// [{
// 	"id": 52,
// 	"description": "41234",
// 	"contractNumber": "1234123",
// 	"contractSubject": "2134",
// 	"conclusionDate": "2024-10-28",
// 	"recognizedByNDS": true,
// 	"moneyAmount": 1000.00
// }]


export const AdvertiserClient = () => {
	const [page, setPage] = useState(1)
	const [size, setSize] = useState(30)
	const { clientId } = useParams();

	const {data: client} = useMyClients(clientId)
	const {data: contracts, isFetched} = useMyClientContracts(clientId)
	
	const [setModal] = useOutletContext()

	return (
    <div className={s.grid}>
      <div className={s.tableCard}>
        <div className={s.filters}>
					<div className={s.selects}>
						Всего договоров: {contracts?.headers['x-total-count']}
					</div>
          
          <Button
            label="Добавить договор"
            leftIcon={<IconPlus size={20}/>}
            className={s.addBtn}
						onClick={() => {
							setModal('add-my-client-contract', {clientId})
						}}
          />
        </div>
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
								<th>
									№ договора с клиентом
                </th>
                <th>
									Предмет договора									
                </th>
                <th>
									Дата заключения договора
                </th>
                <th>
									Сумма договора
                </th>
              </tr>
            </thead>
            <tbody>
              {isFetched ? (
                contracts?.data.map((el) => (
                  <tr key={el.id}>
                    <td>
											<div className={s.center}>{el?.contractNumber ? '№' + el?.contractNumber  : '-'}</div> 
                    </td>
										<td>
											<div className={s.center}>{el?.contractSubject ? el?.contractSubject : '-'}</div> 
                    </td>
                    <td>
											<div className={s.center}>{(new Date(el?.conclusionDate)).toLocaleDateString('ru-RU', {dateStyle: 'short'})}</div> 
                    </td>
                    <td>
											<div className={s.center}>{el?.moneyAmount}</div> 
                    </td>
                  </tr>
                ))
              ) : (
                <Loader />
              )}
            </tbody>
          </table>
        </div>
        {contracts?.headers['x-total-count'] && 
				<Pagination
          currentPage={page}
          totalCount={+contracts?.headers['x-total-count']}
          pageSize={size}
          setSize={setSize}
          onPageChange={(page) => setPage(page)}
        />}
      </div>
    </div>
  );
}
