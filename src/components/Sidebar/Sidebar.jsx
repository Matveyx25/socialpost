import React from 'react'
import s from './Sidebar.module.scss'
import { NavLink } from 'react-router-dom'
import { SidebarItem } from './SidebarItem'
import { IconBuildingBank, IconDashboard, IconHelp, IconLifebuoy, IconList, IconMoneybag, IconPointerQuestion, IconUserFilled } from '@tabler/icons-react'

export const Sidebar = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.logoWrapper}>
				<NavLink to="/" className={s.logo}>
					<img src="/images/logo.png" alt="" />
				</NavLink>
			</div>
			<div className={s.itemList}>
				{/* <SidebarItem label="Дашборд" icon={<IconDashboard/>} to={'/dashboard'} end/> */}
				{/* <SidebarItem label="Мои каналы" icon={<IconList/>} to={'/dashboard/my-channels'} count={2}/> */}
				{/* <SidebarItem label="Заявки на размещение" icon={<IconPointerQuestion/>} to={'/dashboard/placement-appointments'} count={4}/> */}
				{/* <SidebarItem label="Выплаты" icon={<IconMoneybag/>} to={'/dashboard/payments'}/> */}
				{/* <SidebarItem label="Реквизиты" icon={<IconBuildingBank/>} to={'/dashboard/requisites'}/> */}
				<SidebarItem label="Профиль" icon={<IconUserFilled/>} to={'/profile'}/>
				<SidebarItem label="FAQ" icon={<IconHelp/>} to={'/dashboard/faq'}/>
				{/* <SidebarItem label="Поддержка" icon={<IconLifebuoy/>} to={'https://t.me/socialpost_support'} target="_blank"/> */}
			</div>
		</div>
	)
}
