import React from 'react'
import s from './SwitchWrapper.module.scss'

export const SwitchWrapper = ({role, setRole}) => {
	return (
		<div className={`${s.wrapper} ${s[role]}`}>
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
