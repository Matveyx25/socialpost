import React, { useState } from "react";
import { NavLink, Outlet, useLocation, useMatches } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import s from './Layouts.module.scss'
import { IconChevronDown, IconChevronUp, IconMoneybag } from "@tabler/icons-react";
import { Dropdown } from '../Shared/Dropdown/Dropdown';
import { DashboardModals } from "../DashboardModals/DashboardModals";
import { auth } from "../../api/api";
import { useProfile } from "../../hooks/useProfile";
import { Breadcrumbs } from "../Shared/Breadcrunbs/Breadcrumbs";
import { priceSeparator } from '../../helpers/priceSeparator';

export const DashboardLayout = ({}) => {
	const [modal, setOpen] = useState('')
	const [modalParams, setModalParams] = useState(null)
	
	const {data: profile} = useProfile()
	
	const dropdown = [
		<NavLink to="/profile">Профиль</NavLink>,
		profile?.roles?.includes('MAIN_ADMIN') ? <NavLink to="/admin">Админ-панель</NavLink> : null,
		<span onClick={() => auth.logout()}>Выйти</span>,
	]
	
	const setModal = (name, params) => {
		setModalParams(params)
		setOpen(name)
	}

  return (
		<>
			<DashboardModals isOpen={modal} setOpen={setOpen} {...{modalParams, setModalParams}}/>
			<div className={s.wrapper}>
				<Sidebar/>
				<div className={s.content}>
					<div className={s.header}>
						<Breadcrumbs/>
						<div className={s.userFlex}>
							<p className={s.balance}>
								<IconMoneybag color="#436CFF" size={18}/>
								{priceSeparator(profile?.balance)} ₽
							</p>
							<Dropdown 
								options={dropdown} label={<img src={profile?.photoUrl ? profile?.photoUrl : '/images/user-without-image.svg'}/>}
								arrowClosed={<IconChevronDown size={18}/>}
								arrowOpen={<IconChevronUp size={18}/>}/>
						</div>
					</div>
					<div className={s.scroll}>
						<Outlet context={[setModal]}/>
					</div>
				</div>
			</div>
		</>
  );
};
