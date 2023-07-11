import React, { useEffect, useRef } from 'react'
import s from './SellerContent.module.scss'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export const Counter = () => {
	let counter = useRef(null)

	useEffect(() => {
		if(counter){
				gsap.to("#counter_1", { 
					innerText: 567,
					duration: 1, 
					ease: "power1.in",
					snap: {
						innerText:1
					}, 
					scrollTrigger: {
							trigger: counter,
							start: "100px 80%",
					}
				});
				gsap.to("#counter_2", { 
					innerText: 1234567,
					duration: 1, 
					ease: "power1.in",
					snap: {
						innerText:1
					}, 
					scrollTrigger: {
							trigger: counter,
							start: "100px 80%",
					}
				});
				gsap.to("#counter_3", { 
					innerText: 24567,
					duration: 1, 
					ease: "power1.in",
					snap: {
						innerText:1
					}, 
					scrollTrigger: {
							trigger: counter,
							start: "100px 80%",
					}
				});
		}
	}, [counter])

	return (
		<div className={s.counterWrapper}>
			<h2>Еще немного о нас:</h2>
			<div className={s.counters} ref={ref => counter = ref}>
				<div>
					<h5 className='animCounter' id='counter_1'>0</h5>
					<p>Всего каналов</p>
				</div>
				<div>
					<h5 className='animCounter' id='counter_2'>0</h5>
					<p>Подписчики на каналах</p>
				</div>
				<div>
					<h5 className='animCounter' id='counter_3'>0</h5>
					<p>Размещенные посты</p>
				</div>
			</div>
			<a href="#" className={s.btnSubmit}>Присоединиться к нам </a>
		</div>
	)
}
