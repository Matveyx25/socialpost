import React from 'react'
import s from './Footer.module.scss'
import { NavLink } from 'react-router-dom'

const links = [
	{label: 'О нас', to: '/about'},
	{label: 'FAQ', to: '/faq'},
	{label: 'Юридические документы', to: '/documetns'},
	{label: 'Поддержка', to: '/support'},
	{label: 'Контакты', to: '/contact'},
]

export const Footer = () => (
		<div className={s.footer}>
			<div className="container">
				<div className={s.flex}>
					<NavLink to="/"  className={s.logo}>
						<img src="/images/logo-footer.png" alt="" />
					</NavLink>
					<ul>
						{links.map((link, index) => (
							<li key={index}>
								<NavLink to={link.to} 
								className={({ isActive }) => isActive && s.active}>{link.label}</NavLink>
							</li>
						))}
					</ul>
					<a href='https://t.me/socialpost_support' target='_blank' className={s.btn}>
						<img src="/images/icons/tg.svg" alt="" />
					</a>
				</div>
			</div>
		</div>
	)
