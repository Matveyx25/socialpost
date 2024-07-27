import React, { useState } from 'react'
import { Loader } from '../../../Shared/Loader/Loader'
import { Tabs } from '../../../Shared/Tabs/Tabs'
import s from './post-by-advertiser.module.scss'
import { usePostRequests } from '../../../../hooks/usePostRequests'
import { NavLink, useOutletContext } from 'react-router-dom'
import { IconExternalLink, IconX } from '@tabler/icons-react'
import { Pagination } from '../../../Shared/Pagination/Pagination';

export const DefaultRequests = ({post, postId}) => {
	const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);
  const [tab, setTab] = useState(0);

	const tabs = [
		{
			label: "Ожидают публикации",
			count: post?.pendingRequestsCount,
			value: "PENDING",
			id: 0,
		},
		{
			label: "Активные",
			count: post?.activeRequestsCount,
			value: "ACTIVE",
			id: 1,
		},
		{
			label: "Выполненные",
			count: post?.completedRequestsCount,
			value: "",
			id: 2,
		},
		{
			label: "Отклоненные",
			count: post?.declinedRequestsCount,
			value: "DECLINED",
			id: 3,
		},
		{
			label: "Просроченные",
			count: post?.expiredRequestsCount,
			value: "EXPIRED",
			id: 4,
		},
	];

  const { data: requests, isFetched } = usePostRequests(postId, {
    status: tabs[tab].value,
    _start: (page - 1) * 30,
    _end: page * 30,
  });

	const [setModal] = useOutletContext()

  function formatDate(input) {
    if (!input) {
      return "-";
    }
    const date = new Date(input);

    return date.toLocaleTimeString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

	return (
		<div className={s.tableCard}>
          <div className={s.cardHeader}>
            <span>Заявки</span>
          </div>
          <div className={s.line}></div>
          <div className={s.tabsWrapper}>
            <Tabs {...{ tabs, tab, setTab }} />
          </div>
          <div className={s.tableWrapper}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Название канала</th>
                  {tabs[tab].value === "DECLINED" ||
                  tabs[tab].value === "EXPIRED" ? null : (
                    <>
                      <th>Дата публикации</th>
                      <th>Дата выполнения</th>
                    </>
                  )}
                  {tabs[tab].value === "DECLINED" ? (
                    <>
                      <th>Отклонивший</th>
                      <th>Комментарий отклонившего</th>
                    </>
                  ) : (
                    ""
                  )}
                  <th>Стоимость размещения</th>
                  {tabs[tab].value === "DECLINED" ||
                  tabs[tab].value === "EXPIRED" ? null : tabs[tab].value ===
                    "PENDING" ? (
                    <th>Отменить</th>
                  ) : (
                    <th>Ссылка</th>
                  )}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {isFetched ? (
                  requests?.headers["x-total-count"] > 0 ? (
                    requests?.data.map((el) => (
                      <tr key={el.id}>
                        <td>
                          <div className={s.center}>
                            <div className={s.mainInfo}>
                              <div className={s.img}>
                                <img
                                  src={
                                    el?.channelImageUrl
                                      ? el?.channelImageUrl
                                      : "/images/channel-without-image.svg"
                                  }
                                  alt=""
                                />
                              </div>
                              {el.channelName}
                            </div>
                          </div>
                        </td>
                        {tabs[tab].value === "DECLINED" ? (
                          <>
                            <td>
                              <div className={s.center}>-</div>
                            </td>
                            <td>
                              <div className={s.center}>{el.declineReason}</div>
                            </td>
                          </>
                        ) : null}
                        {tabs[tab].value === "DECLINED" ||
                        tabs[tab].value === "EXPIRED" ? null : (
                          <>
                            <td>
                              <div className={s.center}>
                                {formatDate(el.publishTime)}
                              </div>
                            </td>
                            <td>
                              <div className={s.center}>
                                {formatDate(el.completionTime)}
                              </div>
                            </td>
                          </>
                        )}
                        <td>
                          <div className={s.center}>
                            <div className={s.center}>{el.price + "₽"}</div>
                          </div>
                        </td>
                        {tabs[tab].value === "DECLINED" ||
                        tabs[tab].value === "EXPIRED" ? null : tabs[tab]
                            .value === "PENDING" ? (
                          <td>
                            <div className={s.center}>
                              <IconX
                                className={s.decline}
                                onClick={() =>
                                  setModal("decline-post-request-modal", {
                                    postId: el.id,
                                  })
                                }
                              />
                            </div>
                          </td>
                        ) : (
                          <td>
                            <div className={s.center}>
                              <NavLink to={el.telegramUrl} className={s.link}>
                                <IconExternalLink />
                              </NavLink>
                            </div>
                          </td>
                        )}
                        <td>
                          <div className={s.end}></div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className={s.emptyMessage}>
                      Заявок с таким статусом пока нет
                    </div>
                  )
                ) : (
                  <Loader />
                )}
              </tbody>
            </table>
          </div>
          {requests?.headers["x-total-count"] && (
            <Pagination
              currentPage={page}
              totalCount={+requests?.headers["x-total-count"]}
              pageSize={size}
              setSize={setSize}
              onPageChange={(page) => setPage(page)}
            />
          )}
        </div>
	)
}
