import React, { memo, useEffect, useRef } from 'react'
import s from './SwitchWrapper.module.scss'
import { Player } from '@lottiefiles/react-lottie-player'
import { useMediaQuery } from 'react-responsive'

export const SwitchWrapper = memo(({role, setRole}) => {
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)'
	})
	
	const smMobile = useMediaQuery({
		query: '(max-width: 420px)'
	})

	return (
		<div className={`${s.wrapper} ${s[role]}`}>
			<div className={s.publisher__bgScene}>
				{isMobile ? <img src={smMobile ? '/images/publisher-mobile-375.svg' : '/images/publisher-mobile.svg'} className={s.publisherMobileImg} alt=''/> : <>
					<div className={s.publisher__plane}>
							<Player
								autoplay={true}
								loop
								src="/lotties/Plane.json"
								speed={.7}
								style={{ height: '100%', objectFit:'cover', visibility: role === 'publisher' ? 'visible' : 'hidden' }}
							/>
					</div>
					<img src="/images/plane-arrow-right.svg" alt="" className={s.publisher__planeRight}/>
					<img src="/images/plane-arrow-left.svg" alt="" className={s.publisher__planeLeft}/>
					<div className={s.publisher__leftBg}>
							<Player
								autoplay={true}
								loop
								src="/lotties/publisher-left.json"
								speed={.5}
								style={{ height: '100%',objectFit:'contain', visibility: role === 'publisher' ? 'visible' : 'hidden'  }}
							/>
					</div>
					<div className={s.publisher__rightBg}>
							<Player
								autoplay={true}
								loop
								src="/lotties/publisher-right.json"
								speed={.5}
								style={{ height: '100%',objectFit:'contain', visibility: role === 'publisher' ? 'visible' : 'hidden'  }}
							/>
					</div>
				</>}
			</div>
			<div className={s.seller__bgScene}>
				{isMobile ? <img src={smMobile ? '/images/seller-mobile-375.svg' : '/images/seller-mobile.svg'} className={s.sellerMobileImg} alt=''/> : <>
					<div className={s.seller__lottie}>
							<Player
								autoplay={true}
								loop
								src="/lotties/seller.json"
								speed={.7}
								style={{ height: '100%', objectFit:'cover', visibility: role === 'seller' ? 'visible' : 'hidden' }}
							/>
					</div>
					<img src="/images/seller/cloud.png" alt="" className={s.seller__static_cloud}/>
					<img src="/images/seller/profile.png" alt="" className={s.seller__static_profile}/>
					<img src="/images/seller/notes.png" alt="" className={s.seller__static_notes}/>
					<img src="/images/seller/switcher.png" alt="" className={s.seller__static_switcher}/>
					<img src="/images/seller/bg-arrow-right.svg" alt="" className={s.seller__right}/>
					<img src="/images/seller/bg-arrow-left.svg" alt="" className={s.seller__left}/>
				</>}
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
})
