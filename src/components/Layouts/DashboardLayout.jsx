import React, { useState } from "react";
import { Outlet, useLocation, useMatches } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import s from './Layouts.module.scss'
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { Dropdown } from '../Shared/Dropdown/Dropdown';
import { DashboardModals } from "../DashboardModals/DashboardModals";

const routesTitle = {
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
	'Профиль',
	"Мои каналы",
	"Выйти"
]

export const DashboardLayout = ({}) => {
	const { pathname } = useLocation()
	const [modal, setModal] = useState('')

  return (
		<>
			<DashboardModals isOpen={modal} setOpen={setModal}/>
			<div className={s.wrapper}>
				<Sidebar/>
				<div className={s.content}>
					<div className={s.header}>
						{routesTitle[pathname] || routesTitle[pathname + '/']}
						<Dropdown 
						options={dropdown} label={<img src="https://st.adda247.com/https://adda247-wp-multisite-assets.s3.ap-south-1.amazonaws.com/wp-content/uploads/multisite/sites/5/2023/08/03164553/mukesh-ambani-e1691061413489.png"/>}
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
