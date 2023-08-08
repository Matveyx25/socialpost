import React, { useEffect, useRef } from 'react'
import s from './SwitchWrapper.module.scss'
import { Player } from '@lottiefiles/react-lottie-player'

export const SwitchWrapper = ({role, setRole}) => {
	let publisherPlayRef = useRef(null)

	useEffect(() => {
		setTimeout(() => {
			publisherPlayRef?.current?.play();
		}, 800)
	}, [])

	return (
		<div className={`${s.wrapper} ${s[role]}`}>
			<div className={s.publisher__bgScene}>
				<div className={s.publisher__plane}>
						<Player
							autoplay
							loop
							src="/lotties/Plane.json"
							style={{ height: '100%', objectFit:'cover'}}
						/>
				</div>
				<img src="/images/plane-arrow-right.svg" alt="" className={s.publisher__planeRight}/>
				<img src="/images/plane-arrow-left.svg" alt="" className={s.publisher__planeLeft}/>
				<div className={s.publisher__leftBg}>
						<Player
							ref={publisherPlayRef}
							autoplay={false}
							loop
							src="/lotties/publisher-left.json"
							speed={.7}
							style={{ height: '100%',objectFit:'contain' }}
						/>
				</div>
				<div className={s.publisher__rightBg}>
						<Player
							autoplay
							loop
							src="/lotties/publisher-right.json"
							speed={.7}
							style={{ height: '100%',objectFit:'contain' }}
						/>
				</div>
			</div>
			<div className={s.seller__bgScene}>
				<div className={s.seller__lottie}>
						<Player
							autoplay
							loop
							src="/lotties/seller.json"
							style={{ height: '100%', objectFit:'cover'}}
						/>
				</div>
				<img src="/images/seller/bg-arrow-right.svg" alt="" className={s.seller__right}/>
				<img src="/images/seller/bg-arrow-left.svg" alt="" className={s.seller__left}/>
			</div>
			<div className={s.switchWrapper}>
				<p>Выберите Вашу роль</p>
				<div className={s.switchFlex}>
					<h2 className={role === 'publisher' && s.active} onClick={() => setRole('publisher')}>Паблишер</h2>
						<div className={`${s.switch} ${s[role]}`} onClick={() => 
							setRole(role === 'publisher' ? 'seller' : 'publisher')}>
							<span></span>
						</div>
					<h2 className={role === 'seller' && s.active} onClick={() => setRole('seller')}>Рекламодатель</h2>
				</div>
			</div>
			<h1 dangerouslySetInnerHTML={{__html: {
				'publisher': 'Монетизация ваших <span><img src="/images/publisher/Telegram.svg"/><span>Telegram</span></span> каналов',
				'seller': 'Быстрый запуск <span><img src="/images/publisher/ad.svg"/><span>рекламных</span></span> кампаний',
				}[role]}}>
			</h1>
		</div>
	)
}
