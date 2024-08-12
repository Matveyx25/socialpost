import React from 'react'
import s from './report.module.scss'
import { DashboardCard } from '../dashboard-card'
import { IconChevronLeft, IconExternalLink } from '@tabler/icons-react'
import { Button } from '../../../Shared/Button/Button';
import { NavLink, useOutletContext, useParams } from 'react-router-dom'
import { usePublishersRequestById } from '../../../../hooks/usePublishersRequestById';
import { ImageGrid } from 'react-fb-image-video-grid';
import { priceSeparator } from '../../../../helpers/priceSeparator'
import { usePublisherAcceptRequest } from '../../../../hooks/usePublisherAcceptRequest';
import { PostContent } from '../../../Shared/PostContent/PostContent'

export const Report = () => {
	const {requestId} = useParams()
	const [setModal] = useOutletContext()
	const {data: request} = usePublishersRequestById(requestId)
	const {mutate: accept} = usePublisherAcceptRequest()

	return (
		<div className={s.grid}>
			<div className={s.colSm}>
				<DashboardCard>
					<div className={s.cardHeader}>
						<NavLink to='/placement-appointments'>
							<IconChevronLeft/>
						</NavLink>
						{request?.postName}
					</div>
					<div className={s.line}></div>
					{request?.postThumbnailsUrls.length ? (
            <div className={s.preview}>
              <ImageGrid showModal={false}>
                {request?.postThumbnailsUrls?.map((img) => (
                  <div>
                    <img src={img} alt="" />
                  </div>
                ))}
              </ImageGrid>
            </div>
          ) : (
            ""
          )}
					<PostContent text={request?.postText}/> 
				</DashboardCard>
			</div>
				<DashboardCard>
					<div className={s.cardHeader}>
						Информация
						{request?.status === 'PENDING' ? <div className={s.btns}>
							<Button label={'Отклонить'} theme='secondary' size='small' onClick={() => setModal('remove-report', {requestId})}/> 
							<Button label={'Подтвердить'} size='small' onClick={() => accept(requestId)}/> 
						</div> : ''}
					</div>
					<div className={s.line}></div>
					<div className={s.info}>
						<div>
							<p>Название РК</p>
							<span>{request?.campaignName}</span>
						</div>
						<div>
							<p>Название обьявления</p>
							<span>{request?.postName}</span>
						</div>
					</div>
					<div className={s.info}>
						<div>
							<p>Канал публикации</p>
							<span>{request?.channelName}</span>
						</div>
						<div>
							<p>Дата публикации</p>
							<span>{request?.publishStartDate}</span>
						</div>
						<div>
							<p>Дата выполнения</p>
							<span>{request?.completionTime ? 'Выполнено' : '-'}</span>
						</div>
						<div>
							<p>Стоимость</p>
							<span>{priceSeparator(request?.price)}₽</span>
						</div>
						<div>
							<p>Ссылка</p>
							<NavLink to={request?.telegramUrl}><IconExternalLink size={16} color='#436CFF'/></NavLink>
						</div>
					</div>
				</DashboardCard>
		</div>
	)
}
