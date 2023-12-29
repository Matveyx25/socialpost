import React from 'react'
import s from './NotFound.module.scss'
import { Player } from '@lottiefiles/react-lottie-player'
import { useMediaQuery } from 'react-responsive'

export const NotFound = () => {
	const isMobile = useMediaQuery({
		query: '(max-width: 620px)'
	})

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
						{isMobile  ? <img src='/images/not-found.png'/> : <Player
							autoplay
							loop
							src="/lotties/not-found.json"
							speed={.7}
							style={{ height: '100%', width: '100%', objectFit:'contain' }}
						/>}
					</div>
				</div>
			</div>
		</div>
	)
}
