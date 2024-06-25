import React, { useState } from 'react'
import { DashboardCard } from '../dashboard-card'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '../../../Shared/Button/Button';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import s from './post-by-advertiser.module.scss'
import { usePost } from '../../../../hooks/usePost';
import { Tabs } from '../../../Shared/Tabs/Tabs'
import { usePostRequests } from '../../../../hooks/usePostRequests';

export const PostByAdvertiser = () => {
	const [setModal] = useOutletContext()
	const {postId} = useParams()
	const [tab, setTab] = useState(5)
	const navigate = useNavigate()

	const {data: post} = usePost(postId)
	const {data: requests} = usePostRequests(postId)


	const tabs = [
		{label: 'Все', count: 4, id: 5},
		{label: 'Ожидают публикации', count: 2, id: 6},
		{label: 'Активные', count: 1, id: 7},
		{label: 'Выполненные', count: 14, id: 8},
		{label: 'Отклоненные', count: 48, id: 9},
		{label: 'Просроченные', count: 0, id: 10}
	]


	return (
		<div className={s.grid}>
			<div className={s.colSm}>
				<DashboardCard>
					<div className={s.cardHeader}>
						{post?.name}
					</div>
					<div className={s.line}></div>
					{post?.uploads.length ? <div className={s.preview}>
						{post?.uploads?.map(img => <img src={img.file} alt="" />)}
					</div> : ''}
					<div className={s.content}>
						<Markdown remarkPlugins={[remarkGfm]}>{post?.content}</Markdown>
					</div>
				</DashboardCard>
			</div>
			<div className={s.colLg}>
				<DashboardCard className={s.card}>
					<div className={s.cardHeader}>
						Информация
						<div className={s.btns}>
							<Button label={'Создать заявку'} size='small' onClick={() => navigate('./create-request')}/> 
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
				<DashboardCard className={s.card}>
					<div className={s.cardHeader}>
						<span>Заявки</span>
					</div>
					<div className={s.line}></div>
					<Tabs {...{tabs, tab, setTab}}/>
			{/* {
						"id": 0,
						"channelId": 0,
						"channelName": "string",
						"channelImageUrl": "string",
						"status": "PENDING",
						"publishStartTime": "2024-06-20T10:51:38.109Z",
						"publishEndTime": "2024-06-20T10:51:38.109Z",
						"publishTime": "2024-06-20T10:51:38.109Z",
						"completionTime": "2024-06-20T10:51:38.109Z",
						"price": 0,
						"telegramUrl": "string",
						"declineReason": "string"
					} */}
				</DashboardCard>
			</div>
		</div>
	)
}
