import React, { useEffect, useRef } from 'react'
import s from './PublisherContent.module.scss'
import { Path } from '../Path/Path';
import { useMediaQuery } from 'react-responsive';

export const PublisherContent = () => {
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)'
	})

	return (
    <div className={s.wrapper}>
			<div className="container">
				{isMobile ? <img src="/images/publisher-path-mobile.svg" alt="" className={s.pathMobile}/> :
				<Path/>}
				<div className={s.flex} id="start-path">
					<div className={s.info} id="publisher_info1">
						<img src="/images/publisher/img1.svg" alt="" className='motion-section'/>
						<span>
							Легализация размещения<br/>
							постов с автоматической<br/>
							передачей данных в ОРД
						</span>
					</div>
					<div className={s.info} id="publisher_info2">
						<img src="/images/publisher/img2.svg" alt="" />
						<span>
							Работа в соответствии с законом о<br/>
							рекламе - регистрируем в ОРД все<br/>
							необходимы данные за Вас 
						</span>
					</div>
					<div className={s.info} id="publisher_info3">
						<img src="/images/publisher/img3.svg" alt="" />
						<span>
							Кошелек любым удобным<br/>
							Вам способом
						</span>
					</div>
				</div>
			</div>
    </div>
  );
}
