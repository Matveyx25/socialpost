import React, { useEffect, useRef } from 'react'
import s from './PublisherContent.module.scss'
import { Path } from '../Path/Path';

export const PublisherContent = () => {
	return (
    <div className={s.wrapper}>
			<div className="container">
				<Path/>
				<div className={s.flex} id="start-path">
					<div className={s.info} id="publisher_info1">
						<img src="/images/publisher/img1.svg" alt="" className='motion-section'/>
						Легализация размещения<br/>
						постов с автоматической<br/>
						передачей данных в ОРД
					</div>
					<div className={s.info} id="publisher_info2">
						<img src="/images/publisher/img2.svg" alt="" />
						Работа в соответствии с законом о<br/>
						рекламе - регистрируем в ОРД все<br/>
						необходимы данные за Вас 
					</div>
					<div className={s.info} id="publisher_info3">
						<img src="/images/publisher/img3.svg" alt="" />
						Выплаты любым удобным<br/>
						Вам способом
					</div>
				</div>
			</div>
    </div>
  );
}
