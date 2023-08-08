import React from 'react'
import s from './NotFound.module.scss'
import { Player } from '@lottiefiles/react-lottie-player'

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
						<Player
							autoplay
							loop
							src="/lotties/not-found.json"
							style={{ height: '100%', width: '100%', objectFit:'contain' }}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
