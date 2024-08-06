import React from 'react'
import s from './Sidebar.module.scss'
import { NavLink } from 'react-router-dom'
import { SidebarItem } from './SidebarItem'
import { IconBuildingBank, IconDashboard, IconGraph, IconHelp, IconLifebuoy, IconList, IconMoneybag, IconPointerQuestion, IconSettings, IconUserFilled, IconUsers } from '@tabler/icons-react'
import { useMyChannels } from '../../hooks/useMyChannels'
import { useProfile } from '../../hooks/useProfile';
import { usePublishersRequests } from '../../hooks/usePublishersRequests'

export const Sidebar = () => {
	const {data: channels} = useMyChannels()
	const {data: requests} = usePublishersRequests()
	const {data: profile} = useProfile()

	return (
		<div className={s.wrapper}>
			<div className={s.logoWrapper}>
				<NavLink to="/" className={s.logo}>
					<img src="/images/logo.png" alt="" />
				</NavLink>
			</div>
			{profile?.roles?.includes('PUBLISHER') ? 
			<div className={s.itemList}>
				<SidebarItem label="Дашборд" icon={<IconDashboard/>} to={'/dashboard'} end/>
				<SidebarItem label="Мои каналы" icon={<IconList/>} to={'/my-channels'} count={channels?.length || ''}/>
				<SidebarItem label="Заявки на размещение" icon={<IconPointerQuestion/>} to={'/placement-appointments'} count={requests?.headers['x-total-count']}/>
				<SidebarItem label="Кошелек" icon={<IconMoneybag/>} to={'/payments'}/>
				<SidebarItem label="Кампании с фикс. CRM" icon={<IconGraph/>} to={'/fixed-cpm-campaigns'}/>
				<SidebarItem label="Реквизиты" icon={<IconBuildingBank/>} to={'/requisites'}/>
				<SidebarItem label="Профиль" icon={<IconUserFilled/>} to={'/profile'}/>
				<SidebarItem label="FAQ" icon={<IconHelp/>} to={'/faq'}/>
				<SidebarItem label="Поддержка" icon={<IconLifebuoy/>} to={'https://t.me/socialpost_support'} target="_blank"/>
			</div> :
			<div className={s.itemList}>
				<SidebarItem label="Рекламные кампании" icon={<IconGraph/>} to={'/dashboard'} end/>
				<SidebarItem label="Клиенты" icon={<IconUsers/>} to={'/clients'}/>
				<SidebarItem label="Кошелек" icon={<IconMoneybag/>} to={'/payments'}/>
				<SidebarItem label="Реквизиты" icon={<IconBuildingBank/>} to={'/requisites'}/>
				<SidebarItem label="Настройки" icon={<IconSettings/>} to={'/profile'}/>
				<SidebarItem label="FAQ" icon={<IconHelp/>} to={'/faq'}/>
				<SidebarItem label="Поддержка" icon={<IconLifebuoy/>} to={'https://t.me/socialpost_support'} target="_blank"/>
			</div> }
		</div>
	)
}
