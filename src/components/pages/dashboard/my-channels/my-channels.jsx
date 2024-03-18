import React from 'react'
import s from './my-channels.module.scss'
import { useOutletContext } from 'react-router-dom'
import { DashboardCard } from '../dashboard-card'
import { Button } from '../../../Shared/Button/Button'
import { IconPlus } from '@tabler/icons-react'
import { ChannelCard } from '../channel-card/channel-card'
import { useMyChannels } from '../../../../hooks/useMyChannels'

// const channels = [
// 	{"id": "1", "img": "https://static6.tgstat.ru/channels/_0/57/57a4540862ee5bc25c74249dc791aa56.jpg", "title": "КБ", 
// 	"link": "https://t.me/Cbpub",  "type": "Юмор и развлечения", 
// 	"desc": "Рекламный контакт: @paprikamedia<br>Предложить новость - @zum_predloga_bot ", 
// 	"subscribers": "624679", "postReach": "245118", "er": "3.41", "cpv": "0.26", 
// 	"price": [
// 		{"type": "Стандартное размещение", "price": "2400"},
// 		{"type": "Нативное размещение", "price": "4400"},
// 		{"type": "Размещение без удаления", "price": "10000"},
// 	]},
// ]

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
