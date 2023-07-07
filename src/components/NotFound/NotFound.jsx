import React from 'react'
import s from './NotFound.module.scss'

export const NotFound = () => {
	return (
		<div className={s.wrapper}>
			<div className="container">
				<div className={s.flex}>
					<div className={s.content}>
						<h2>
						<span>Ой... </span>
						Страница в <br/> разработке
						</h2>
						<p>Пожалуйста, зайдите позже</p>
					</div>
					<div className={s.img}>
						<img src="/images/indev.svg" alt="" />
					</div>
				</div>
			</div>
		</div>
	)
}
