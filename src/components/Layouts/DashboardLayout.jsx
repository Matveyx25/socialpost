import React, { useState } from "react";
import { NavLink, Outlet, useLocation, useMatches } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import s from './Layouts.module.scss'
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { Dropdown } from '../Shared/Dropdown/Dropdown';
import { DashboardModals } from "../DashboardModals/DashboardModals";
import { auth, profile } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

const routesTitle = {
	'/profile/': 'Профиль',
	'/dashboard/': 'Дашборд',
	'/dashboard/my-channels/': 'Мои каналы',
	'/dashboard/placement-appointments/': 'Заявки на размещение',
	'/dashboard/appointment/': 'Заявки на размещение / Бесплатный урок',
	'/dashboard/payments/': 'Выплаты',
	'/dashboard/requisites/': 'Реквизиты',
	'/dashboard/faq/': 'FAQ',
	'/dashboard/support/': 'Поддержка',
}

const dropdown = [
	<NavLink to="/profile">Профиль</NavLink>,
	<span onClick={() => auth.logout()}>Выйти</span>,
]

export const DashboardLayout = ({}) => {
	const { pathname } = useLocation()
	const [modal, setModal] = useState('')

	const {data: profileData} = useQuery({queryKey: ['profile'], queryFn: profile.me})

  return (
		<>
			<DashboardModals isOpen={modal} setOpen={setModal}/>
			<div className={s.wrapper}>
				<Sidebar/>
				<div className={s.content}>
					<div className={s.header}>
						{routesTitle[pathname] || routesTitle[pathname + '/']}
						<Dropdown 
							options={dropdown} label={<img src={profileData?.data.photoUrl ? profileData?.data.photoUrl : '/images/user.png'}/>}
							arrowClosed={<IconChevronDown size={18}/>}
							arrowOpen={<IconChevronUp size={18}/>}/>
					</div>
					<div className={s.scroll}>
						<Outlet context={[setModal]}/>
					</div>
				</div>
			</div>
		</>
  );
};
