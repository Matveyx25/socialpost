import React, { useState } from "react";
import { Pagination } from "../../../Shared/Pagination/Pagination";
import { Loader } from "../../../Shared/Loader/Loader";
import { IconPlus, IconRefresh, IconSquare, IconSquareCheckFilled } from "@tabler/icons-react";
import { Button } from "../../../Shared/Button/Button";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import s from "./advertising-company.module.scss";
import { useMyClients } from "../../../../hooks/useMyClients";
import classNames from "classnames";
import { useFormik } from "formik";
import { useCampaignById } from '../../../../hooks/useCampaignById';
import { DashboardCard } from '../dashboard-card';
import { usePostsByCampaign } from '../../../../hooks/usePostsByCampaign';
import { Tabs } from '../../../Shared/Tabs/Tabs';

export const AdvertisingCompany = () => {
	const tabs = [
		{label: 'Активные', value: 'NOT_MODERATED', id: 0},
		{label: 'На проверке', value: 'MODERATING', id: 1},
		{label: 'Отклоненные', value: 'DECLINED', id: 2},
		{label: 'Архивные', value: 'ACCEPTED', id: 3}
	]

	const [allChecked, setAllChecked] = useState(false)
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);
  const [tab, setTab] = useState(0);
	const {companyId} = useParams()

	const navigate = useNavigate()

  const { data: company } = useCampaignById(companyId);

  const { data: posts, isFetched } = usePostsByCampaign(companyId, {
		status: tabs[tab].value,
		_start: (page - 1) * 30,
    _end: page * 30,
	});

  const [setModal] = useOutletContext();

	const formik = useFormik({
		initialValues: {
			clientIds: []
		},
		onSubmit: (values) => {
      console.log(values);
    }
	})

  return (
    <div className={s.grid}>
			<DashboardCard>
					<div className={s.cardHeader}>
						<span>{company?.name}</span>
					</div>
					<div className={s.line}></div>
					<div className={s.companyInfoWrapper}>
						<div className={s.infoBlock}>
							<div className={s.infoTitle}>Клиент</div>
							<div className={s.infoValue}>{company?.client?.name}</div>
						</div>
						<div className={s.infoBlock}>
							<div className={s.infoTitle}>Тип</div>
							<div className={s.infoValue}> {
                          {
                            AD_POST: "Размещение рекламных постов",
                            NATIVE_POST: "Размещение нативных постов",
                            FIXED_CPM: "Кампания с фиксированным СРМ",
                          }[company?.type]
                        }</div>
						</div>
						<div className={s.infoBlock}>
							<div className={s.infoTitle}>Активные посты</div>
							{/* <div className={s.infoValue}>{company.client.name}</div> */}
						</div>
						<div className={s.infoBlock}>	
							<div className={s.infoTitle}>Выполненных заявок</div>
							{/* <div className={s.infoValue}>{company?.client?.name}</div> */}
						</div>
						<div className={s.infoBlock}>
							<div className={s.infoTitle}>Заблокировано</div>
							<div className={s.infoValue}>{company?.moneyBlocked ? company.moneyBlocked + '₽' : '-'}</div>
						</div>
						<div className={s.infoBlock}>	
							<div className={s.infoTitle}>Потрачено</div>
							<div className={s.infoValue}>{company?.totalMoneySpent ? company.totalMoneySpent + '₽' : '-'}</div>
						</div>
					</div>
			</DashboardCard>
      <div className={s.tableCard}>
        <div className={s.filters}>
					<span className={s.title}>
					Рекламные записи  
					</span>
          <Button
            label="Создать запись"
            leftIcon={<IconPlus size={20} />}
            className={s.addBtn}
            onClick={() => {
              setModal("add-post", company?.id);
            }}
          />
        </div>
				<div className={s.tabsWrapper}>
					<Tabs {...{tabs, tab, setTab}}/>
				</div>
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Название записи</th>
                <th>Тип</th>
                <th>Текущие заявки</th>
                <th>Выполненные заявки</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isFetched ?
                  posts?.data.map((el) => (
										<tr key={el.id} onClick={() => navigate('/advertising-company/' + companyId + '/' + el.id)}>
											<td>
												<div className={s.center}>{el?.name}</div>
											</td>
											<td>
												<div className={s.center}>
													{
														{
															NEW_POST: "Новая запись",
															REPOST: "Репост",
														}[el.type]
													}
												</div>
											</td>
											<td>
												<div className={s.center}>{el.activeRequestsCount ? el.activeRequestsCount +'/' + el.moneyBlocked + '₽' : '-'}</div>
											</td>
											<td>
												<div className={s.center}>{el.completedRequestsCount ? el.completedRequestsCount : '-'}</div>
											</td>
											<td>
												<div className={classNames(s.center, s[el.status])}>
													{
														{
															ACTIVE: "Активная",
															COMPLETED: "Завершенная",
														}[el.status]
													}
												</div>
											</td>
											<td>

											</td>
										</tr>
									)) : (
                <Loader />
              )}
            </tbody>
          </table>
        </div>
        {posts?.headers["x-total-count"] && (
          <Pagination
            currentPage={page}
            totalCount={+posts?.headers["x-total-count"]}
            pageSize={size}
            setSize={setSize}
            onPageChange={(page) => setPage(page)}
          />
        )}
      </div>
    </div>
  );
};
