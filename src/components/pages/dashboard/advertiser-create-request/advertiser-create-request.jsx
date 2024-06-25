import React, { useState } from 'react'
import { DashboardCard } from '../dashboard-card'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '../../../Shared/Button/Button';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import s from './advertiser-create-request.module.scss'
import { usePost } from '../../../../hooks/usePost';
import { Tabs } from '../../../Shared/Tabs/Tabs'
import { useChannels } from '../../../../hooks/useChannels';
import { Filters } from '../../../Filters/Filters';
import { useAddPostRequest } from '../../../../hooks/useAddPostRequest';

export const AdvertiserCreateRequest = () => {
	const [setModal] = useOutletContext()
	const {postId} = useParams()
	const [tab, setTab] = useState(5)
	const navigate = useNavigate()
	const [filters, setFilters] = useState(null)

	const {data: channels, isFetched, refetch} = useChannels({...filters})
	const {mutate: createRequest} = useAddPostRequest()

	const onFilterSubmit = (f) => {
		setFilters({
			subscribers_min: f?.minSubscribers,
			subscribers_max: f?.maxSubscribers,
			average_post_reach_min: f?.minPostReach,
			average_post_reach_max: f?.maxPostReach,
			cost_per_view_min: f?.minCPV,
			cost_per_view_max: f?.maxCPV,
			price_min: f?.minPrice,
			price_max: f?.maxPrice
		})
		refetch()
	}

	// {
	// 	"channelId": 0,
	// 	"publishStartTime": "2024-06-20T10:52:56.347Z",
	// 	"publishEndTime": "2024-06-20T10:52:56.347Z"
	// }

	return (
		<div className={s.grid}>
			<div className={s.colSm}>
				<DashboardCard>
					<Filters onFilterSubmit={onFilterSubmit} maxSubscribersNumber={100000}/>
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
				</DashboardCard>
				<DashboardCard className={s.card}>
					<div className={s.cardHeader}>
						<span>Каналы</span>
					</div>
					<div className={s.line}></div>
					
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
