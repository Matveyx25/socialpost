import { useState } from 'react';
import { Pagination } from '../../../Shared/Pagination/Pagination'
import { Loader } from '../../../Shared/Loader/Loader'
import { IconPencil, IconPlus } from '@tabler/icons-react';
import { Button } from '../../../Shared/Button/Button'
import { useOutletContext, useParams } from 'react-router-dom'
import s from './advertiser-client.module.scss'
import { useMyClientContracts } from '../../../../hooks/useMyClientContracts';
import { contractSubjectsDecode } from '../../../../options/contractSubjects';
import { DashboardCard } from '../dashboard-card';
import { useMyClientById } from '../../../../hooks/useMyClientById';

export const AdvertiserClient = () => {
	const [page, setPage] = useState(1)
	const [size, setSize] = useState(30)
	const { clientId } = useParams();
	const {data: client, isFetched: clientIsFetched} = useMyClientById(clientId)
	const {data: contracts, isFetched} = useMyClientContracts(clientId)
	
	const [setModal] = useOutletContext()

	return (
    <div className={s.grid}>
			 <DashboardCard>
				{clientIsFetched ? <>
					<div className={s.cardHeader}>
						<span className={s.companyName}>{client?.name}
							<button className={s.editButton} onClick={() => {
									setModal('edit-client', {clientId})
								}}>
									<IconPencil size={16}/>
							</button>
						</span>
					</div>
					<div className={s.companyInfoWrapper}>
						<div className={s.infoBlock}>
							<div className={s.infoTitle}>Прямой рекламодатель</div>
							<div className={s.infoValue}>{{ "AGENCY": "Нет", "ADVERTISER": "Да" }[client?.role]}</div>
						</div>
						<div className={s.infoBlock}>
							<div className={s.infoTitle}>ИНН</div>
							<div className={s.infoValue}>
							{client?.role === 'AGENCY' ? 
								client?.agencyInfo?.advertiserInn ? client?.agencyInfo?.advertiserInn : '-'
								: client?.advertiserInfo?.inn ? client?.advertiserInfo?.inn : '-'}
							</div>
						</div>
						<div className={s.infoBlock}>
							<div className={s.infoTitle}>Номер телефона</div>
							<div className={s.infoValue}>
							{client?.role === 'AGENCY' ? 
								client?.agencyInfo?.advertiserPhone ? client?.agencyInfo?.advertiserPhone : '-'
								: 
								client?.advertiserInfo?.phone ? client?.advertiserInfo?.phone : '-'
							}
							</div>
						</div>
						<div className={s.infoBlock}>
							<div className={s.infoTitle}>Тип</div>
							<div className={s.infoValue}>
								{client?.advertiserInfo ? 
									{
										PHYSICAL_ENTITY: "Физическое лицо",
										SELF_EMPLOYED: "Самозанятый",
										IE: "ИП",
										LEGAL_ENTITY: "Юридическое лицо",
									}[client?.advertiserInfo.type] :
									{
										PHYSICAL_ENTITY: "Физическое лицо",
										SELF_EMPLOYED: "Самозанятый",
										IE: "ИП",
										LEGAL_ENTITY: "Юридическое лицо",
									}[client?.agencyInfo.advertiserType]
								}
							</div>
						</div>
					</div>
				</> : <Loader/>}
			</DashboardCard>
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
                <th>
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
											<div className={s.center}>{el?.contractSubject ? contractSubjectsDecode[el?.contractSubject] : '-'}</div> 
                    </td>
                    <td>
											<div className={s.center}>{(new Date(el?.conclusionDate)).toLocaleDateString('ru-RU', {dateStyle: 'short'})}</div> 
                    </td>
                    <td>
											<div className={s.center}>{el?.moneyAmount}</div> 
                    </td>
                    <td>
											<div className={s.center}>
												<button className={s.editBtn} onClick={() => {
													setModal('edit-client-contract', {contractId: el.id})
												}}>
													<IconPencil/>
												</button>	
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
