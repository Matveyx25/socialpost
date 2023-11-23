import React, { useEffect, useState } from 'react'
import s from './Header.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../Shared/Button/Button'
import { IconShoppingCart } from '@tabler/icons-react'

export const Header = ({role, setRole, onModalOpen}) => {
	const navigate = useNavigate()

	const getSum = () => {
		return !cart.length || cart.reduce((a, b) =>
				a + b.count, 0);
	};

	const [cart, set_cart] = useState(() => {
		const saved = localStorage.getItem("cart");
		const initialValue = JSON.parse(saved);
		return initialValue || "";
	});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart])

	window.addEventListener('cart-changed', () => {
		const saved = localStorage.getItem("cart");
		const initialValue = JSON.parse(saved);
		set_cart(initialValue || "")
	})


	return (
		<div className={s.header}>
			<div className="container">
				<div className={s.flex}>
					<NavLink to="/" className={s.logo}>
						<img src="/images/logo.png" alt="" />
					</NavLink>
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
					</ul>
					<div className={s.btns}>
						<Button onClick={() => navigate('cart')} className={s.cartBtn} label={cart.length > 0 ? '|  ' + getSum() : ''} leftIcon={<IconShoppingCart className={cart.length > 0 ? s.cartIcon : ''}/>}/>
						<NavLink className={s.btn} onClick={() => onModalOpen()}>
							Войти
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	)
}
