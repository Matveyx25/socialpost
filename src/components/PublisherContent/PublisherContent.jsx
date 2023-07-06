import React, { useRef } from 'react'
import s from './PublisherContent.module.scss'
import { Path } from '../Path/Path';

export const PublisherContent = () => {
	let start = useRef(null)

	return (
    <div className={s.wrapper}>
			<div className="container">
				<Path {...{start}}/>
				<div className={s.flex}>
					<div className={s.info} ref={ref => start = ref}>
						<img src="/images/publisher/img1.svg" alt="" className='motion-section'/>
						Легализация размещения<br/>
						постов с автоматической<br/>
						передачей данных в ОРД
					</div>
					<div className={s.info}>
					<img src="/images/publisher/img2.svg" alt="" />
						Работа в соответствии с законом о<br/>
						рекламе - регистрируем а ОРД все<br/>
						необходимы данные за Вас
					</div>
					<div className={s.info}>
						<img src="/images/publisher/img3.svg" alt="" />
						Выплаты любым удобным<br/>
						Вам способом
					</div>
				</div>
			</div>
    </div>
  );
}
