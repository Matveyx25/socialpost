import React from 'react'
import s from './Header.module.scss'
import { NavLink } from 'react-router-dom'

export const Header = ({role, setRole}) => {
	return (
		<div className={s.header}>
			<div className="container">
				<div className={s.flex}>
					<a href="#" className={s.logo}>
						<img src="/images/logo.png" alt="" />
					</a>
					<ul>
						<li>
							<NavLink to="/"  onClick={() => setRole('seller')}
							className={({ isActive }) => (isActive && role === 'seller') && s.active}>Рекламодателям</NavLink>
						</li>
						<li>
							<NavLink to="/"  onClick={() => setRole('publisher')}
							className={({ isActive }) => (isActive && role === 'publisher') && s.active}>Паблишерам</NavLink>
						</li>
						<li>
							<NavLink to="/contact" 
							className={({ isActive }) => isActive && s.active}>Контакты</NavLink>
						</li>
						<li>
							<NavLink to="/faq" 
							className={({ isActive }) => isActive && s.active}>FAQ</NavLink>
						</li>
					</ul>
					<NavLink to="contact" className={s.btn}>
						Войти
					</NavLink>
				</div>
			</div>
		</div>
	)
}
