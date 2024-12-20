import React, { useEffect, useState } from 'react'
import s from './Header.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../Shared/Button/Button'
import { IconChevronDown, IconChevronUp, IconMenu2, IconShoppingCart } from '@tabler/icons-react'
import { useMediaQuery } from 'react-responsive'
import { slide as Menu } from 'react-burger-menu'
import { Dropdown } from '../Shared/Dropdown/Dropdown';
import { auth } from '../../api/api'
import { useProfile } from '../../hooks/useProfile';
import { useCart } from '../../hooks/useCart';

export const Header = ({role, setRole, onModalOpen}) => {
	const navigate = useNavigate()
	const [burgerOpen, setBurgerOpen] = useState(false)
	const {data: cart} = useCart()

	const isMobile = useMediaQuery({
		query: '(max-width: 840px)'
	})
	const smMobile = useMediaQuery({
		query: '(max-width: 420px)'
	})

	const {data: profile, isSuccess: profileSuccess} = useProfile()

	const dropdown = [
		<NavLink to="/dashboard">Профиль</NavLink>,
		profile?.roles?.includes('MAIN_ADMIN') ? <NavLink to="/admin">Админ-панель</NavLink> : null,
		<span onClick={() => auth.logout()}>Выйти</span>,
	]

	const getSum = () => {
		return !cart?.length || cart?.reduce((a, b) =>
				a + b.count, 0);
	};

	return (
		<>
			<div className={s.header}>
				<div className="container">
					<div className={s.flex}>
						{isMobile && <button className={s.burgerBtn} onClick={() => setBurgerOpen(prev => !prev)}><IconMenu2 color={burgerOpen ? '#436CFF' : '#212121'}/></button>}
						<NavLink to="/" className={s.logo}>
							<img src="/images/logo.png" alt="" />
						</NavLink>
						{!isMobile && <ul>
							<li>
								<NavLink to="/"  onClick={() => setRole('seller')}
								className={({ isActive }) => (isActive && role === 'seller') && s.active}>Рекламодателям</NavLink>
							</li>
							<li>
								<NavLink to="/"  onClick={() => setRole('publisher')}
								className={({ isActive }) => (isActive && role === 'publisher') && s.active}>Паблишерам</NavLink>
							</li>
							<li>
								<NavLink to="/channels-catalog" 
								className={({ isActive }) => isActive && s.active}>Каталог каналов</NavLink>
							</li>
							<li>
								<NavLink to="/contact" 
								className={({ isActive }) => isActive && s.active}>Контакты</NavLink>
							</li>
							<li>
								<NavLink to="/faq" 
								className={({ isActive }) => isActive && s.active}>FAQ</NavLink>
							</li>
						</ul>}
						<div className={s.btns}>
							 <Button onClick={() => navigate('cart')} className={s.cartBtn} label={cart?.length > 0 ? '|  ' + getSum() : ''} leftIcon={<IconShoppingCart className={cart?.length > 0 ? s.cartIcon : ''}/>}/>
							 	{profileSuccess ? 
									<Dropdown
									options={dropdown} label={<img src={profile?.photoUrl ? profile?.photoUrl : '/images/user-without-image.svg'}/>}
										arrowClosed={<IconChevronDown size={18}/>}
										arrowOpen={<IconChevronUp size={18}/>}/> : 
										<NavLink className={s.btn} onClick={() => onModalOpen()}>
											Войти
										</NavLink>
								}
						</div>
					</div>
				</div>
			</div>
			{isMobile && <Menu overlayClassName={s.overlay} burgerButtonClassName={s.burgerBtnDefault} isOpen={burgerOpen} onClose={() => setBurgerOpen(false)} width={smMobile ? '17.9375rem' : '27.5625rem'}>
				<div className={s.burgerMenu}>
					<ul>
						<li>
							<NavLink to="/"  onClick={() => {
								setRole('seller')
								setBurgerOpen(false)
							}}
							className={({ isActive }) => (isActive && role === 'seller') && s.active}>Рекламодателям</NavLink>
						</li>
						<li>
							<NavLink to="/"  onClick={() => {
								setRole('publisher')
								setBurgerOpen(false)
							}}
							className={({ isActive }) => (isActive && role === 'publisher') && s.active}>Паблишерам</NavLink>
						</li>
						<li>
							<NavLink to="/channels-catalog" onClick={() => {
								setBurgerOpen(false)
							}}
							className={({ isActive }) => isActive && s.active}>Каталог каналов</NavLink>
						</li>
						<li>
							<NavLink to="/contact" onClick={() => {
								setBurgerOpen(false)
							}}
							className={({ isActive }) => isActive && s.active}>Контакты</NavLink>
						</li>
						<li>
							<NavLink to="/faq" onClick={() => {
								setBurgerOpen(false)
							}}
							className={({ isActive }) => isActive && s.active}>FAQ</NavLink>
						</li>
					</ul>
				</div>
			</Menu>}
		</>
	)
}
