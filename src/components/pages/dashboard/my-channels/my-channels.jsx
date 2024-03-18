import React from 'react'
import s from './my-channels.module.scss'
import { useOutletContext } from 'react-router-dom'
import { DashboardCard } from '../dashboard-card'
import { Button } from '../../../Shared/Button/Button'
import { IconPlus } from '@tabler/icons-react'
import { ChannelCard } from '../channel-card/channel-card'
import { useMyChannels } from '../../../../hooks/useMyChannels'

export const MyChannels = () => {
	const [setModal] = useOutletContext()

	const {data: channels} = useMyChannels()

	return (
		<div className={s.grid}>
			<DashboardCard>
				<div className={s.cardHeader}>
					<div>
						<span>Мои каналы</span>
						<span className={s.count}>{channels?.length}</span>
					</div>
					<Button label={"Добавить канал"} leftIcon={<IconPlus/>} onClick={() => setModal('add-channel')} className={s.btn}/>
				</div>
			</DashboardCard>
			{channels?.map(channel => 
				<ChannelCard {...{channel}}/>
			)}
		</div>
	)
}
