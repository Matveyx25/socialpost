import React, { useState } from 'react'
import { DashboardCard } from '../dashboard-card'
import { Button } from '../../../Shared/Button/Button';
import { NavLink, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import s from './post-by-advertiser.module.scss'
import { usePost } from '../../../../hooks/usePost';
import { Tabs } from '../../../Shared/Tabs/Tabs'
import { usePostRequests } from '../../../../hooks/usePostRequests';
import {ImageGrid} from "react-fb-image-video-grid"
import DOMPurify from 'dompurify';
import { IconAlertTriangle, IconClockHour4, IconExternalLink, IconX } from '@tabler/icons-react';

import Markdown from 'react-markdown'
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Pagination } from '../../../Shared/Pagination/Pagination';
import { Loader } from '../../../Shared/Loader/Loader';

export const PostByAdvertiser = () => {
	const [setModal] = useOutletContext()
	const {postId} = useParams()
	const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);
  const [tab, setTab] = useState(0);
	const navigate = useNavigate()
	
	const {data: post} = usePost(postId)

	const tabs = [
		{label: 'Ожидают публикации', value: 'PENDING', id: 0},
		{label: 'Активные', count: post?.activeRequestsCount, value: 'ACTIVE', id: 1},
		{label: 'Выполненные', count: post?.completedRequestsCount, value: '', id: 2},
		{label: 'Отклоненные', value: 'DECLINED', id: 3},
		{label: 'Просроченные', value: 'EXPIRED', id: 4}
	]

	const {data: requests, isFetched} = usePostRequests(postId, {
		status: tabs[tab].value,
		_start: (page - 1) * 30,
		_end: page * 30,
	})

	function formatDate(input) {
		if(!input){
			return '-'
		}
		const date = new Date(input);
	
		return date.toLocaleTimeString('ru-RU', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
	}

	return (
    <div className={s.grid}>
      <div className={s.colSm}>
        <DashboardCard>
          <div className={s.cardHeader}>{post?.name}</div>
          <div className={s.line}></div>
          {post?.uploads.length ? (
            <div className={s.preview}>
              <ImageGrid showModal={false}>
                {post?.uploads?.map((img) => (
                  <div>
                    <img src={img.thumbnailUrl} alt="" />
                  </div>
                ))}
              </ImageGrid>
            </div>
          ) : (
            ""
          )}
          <div className={s.content}>
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeRaw]}
            >
              {post?.content}
            </Markdown>
          </div>
        </DashboardCard>
      </div>
      <div className={s.colLg}>
        {
          {
            NOT_MODERATED: null,
            MODERATING: (
              <DashboardCard className={s.card}>
                <div className={s.alertWrapper}>
                  <IconClockHour4 color="#436CFF" size={24} />
                  <div className={s.alertContent}>
                    <div className={s.alertTitle}>
                      Рекламная запись на модерации
                    </div>
                  </div>
                </div>
              </DashboardCard>
            ),
            DECLINED: (
              <DashboardCard className={s.card}>
                <div className={s.alertWrapper}>
                  <IconAlertTriangle color="#F46262" size={24} />
                  <div className={s.alertContent}>
                    <div className={s.alertTitle}>
                      Рекламная запись не прошла модерацию
                    </div>
                    <div className={s.alertText}>{post?.declineReason}</div>
                  </div>
                </div>
              </DashboardCard>
            ),
            ACCEPTED: null,
          }[post?.status]
        }
        <DashboardCard className={s.card}>
          <div className={s.cardHeader}>
            Информация
            <div className={s.btns}>
              {
                {
                  NOT_MODERATED: (
                    <Button
                      label={"Отправить на модерацию"}
                      size="small"
                      onClick={() => {
                        setModal("add-post-to-moderation", { postId });
                      }}
                    />
                  ),
                  MODERATING: null,
                  DECLINED: (
                    <Button
                      label={"Отправить на модерацию"}
                      size="small"
                      onClick={() => {
                        setModal("add-post-to-moderation", { postId });
                      }}
                    />
                  ),
                  ACCEPTED: (
                    <Button
                      label={"Разместить пост"}
                      size="small"
                      onClick={() => navigate("./create-request")}
                    />
                  ),
                }[post?.status]
              }
            </div>
          </div>
          <div className={s.line}></div>
          <div className={s.info}>
            <div>
              <p>Название записи</p>
              <span>{post?.name}</span>
            </div>
            <div>
              <p>Всего заявок</p>
              <span>{post?.totalRequestsCount}</span>
            </div>
            <div>
              <p>Активных заявок</p>
              <span>{post?.activeRequestsCount}</span>
            </div>
            <div>
              <p>Выполненных заявок</p>
              <span>{post?.completedRequestsCount}</span>
            </div>
          </div>
          <div className={s.info}>
            <div>
              <p>Заблокированно</p>
              <span>{post?.moneyBlocked}₽</span>
            </div>
            <div>
              <p>Потрачено</p>
              <span>{post?.moneyBlocked}₽</span>
            </div>
          </div>
        </DashboardCard>
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
									{tabs[tab].value === 'DECLINED' ||
										tabs[tab].value === 'EXPIRED' ? null : 
										<>
											<th>Дата публикации</th>
											<th>Дата выполнения</th>
										</>}
                  {tabs[tab].value === 'DECLINED' ? 
									<>
										<th>Отклонивший</th>
										<th>Комментарий отклонившего</th>
									</> : ''}
                  <th>Стоимость размещения</th>
                    {
										tabs[tab].value === 'DECLINED' ||
										tabs[tab].value === 'EXPIRED' ? null : 
											tabs[tab].value === 'PENDING' ? <th>Отменить</th> : <th>Ссылка</th> 
										}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {isFetched ? (
									requests?.headers['x-total-count'] > 0 ?
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
												{tabs[tab].value === 'DECLINED' ? 
													<>
														<td>
															<div className={s.center}>
																-
															</div>
														</td>
														<td>
															<div className={s.center}>
																{el.declineReason}
															</div>
														</td>
													</>
													: null}
												{tabs[tab].value === 'DECLINED' ||
													tabs[tab].value === 'EXPIRED' ? null : 
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
													</>}
                      <td>
                        <div className={s.center}>
                          <div className={s.center}>{el.price + "₽"}</div>
                        </div>
                      </td>
                      <td>
												{
													tabs[tab].value === 'DECLINED' ||
													tabs[tab].value === 'EXPIRED' ? null : 
													tabs[tab].value === 'PENDING' ? 
													<div className={s.center}>
														<IconX className={s.decline} onClick={() => {}}/>
													</div> : 
														<div className={s.center}>
														<NavLink to={el.telegramUrl} className={s.link}>
															<IconExternalLink />
														</NavLink>
													</div> 
													}
                      </td>
                      <td>
                        <div className={s.end}></div>
                      </td>
                    </tr>
                  )) : <div className={s.emptyMessage}>
										Заявок с таким статусом пока нет
									</div>
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
      </div>
    </div>
  );
}
