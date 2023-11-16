import React, { useEffect, useRef, useState } from 'react'
import s from './SellerContent.module.scss'
import { Circle } from './Circle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Path } from './Path';
import { Counter } from './Counter';

gsap.registerPlugin(ScrollTrigger);

export const SellerContent = () => {
	let scroller = useRef(null)
	const [progress, setProgress] = useState(1)

	useEffect(() => {
		if(scroller){
			gsap.utils.toArray(".box.reveal").forEach((box, i) => {
				ScrollTrigger.create({
					trigger: box,
					start: "top top",
					pin: false,
					pinSpacing: true,
					snap: {
						snapTo: true,
						duration: 0.4,
						delay: 0.1,
						ease: "none"
					},
					onEnter: (e) => setProgress(+e.trigger.dataset.number + (+e.direction === 1 && 1)),
					onEnterBack: (e) => setProgress(+e.trigger.dataset.number + (+e.direction === 1 && 1))
				});
			});
		}
		return () => {
			ScrollTrigger.killAll();
		}
	}, [scroller])

	return (
		<div className={s.wrapper}>
			<div className="container">
				<div className={s.circle}>
					<Circle step={progress}/>
				</div>
				<div className={s.scroll} ref={ref => scroller = ref}>
					<section className='box reveal' data-number="1">
						<h2>1.</h2>
						<h5>Создайте аккаунт</h5>
						<img src="/images/seller/img1.svg" alt="" />
					</section>
					<section className='box reveal' data-number="2">
						<h2>2.</h2>
						<h5>Пополните баланс</h5>
						<img src="/images/seller/img2.svg" alt="" />
					</section>
					<section className='box reveal' data-number="3">
						<h2>3.</h2>
						<h5>Выберите интересующие вас каналы</h5>
						<img src="/images/seller/img3.svg" alt="" />
					</section>
					<section className='box reveal' data-number="4">
						<h2>4.</h2>
						<h5>Создайте пост</h5>
						<img src="/images/seller/img4.svg" alt="" />
					</section>
					<section className='box reveal' data-number="5">
						<h2>5.</h2>
						<h5 className={s.small}>Заполните необходимые юридические данные, а система автоматически  обработает их и зарегистрирует  РК в ОРД</h5>
						<img src="/images/seller/img5.svg" alt="" />
					</section>
					<section className='box reveal' data-number="6">
						<h2>6.</h2>
						<h5 className={s.small}>Владелец канала получит пост для  размещения</h5>
						<img src="/images/seller/img6.svg" alt="" />
					</section>
					<section className='box reveal' data-number="7">
						<h2>7.</h2>
						<h5 className={s.small}>Скачайте отчет о РК</h5>
						<img src="/images/seller/img7.svg" alt="" />
					</section>
				</div>
			</div>
			<div className={s.pathWrapper}>
				<h2 className='motion-section__seller'>3 причины быть с нами:</h2>
				<Path/>
				<div className={s.messages}>
					<div className={s.message} id="message_1">
						<p>Крупнейшие каналы <br/> работают с нами</p>
						<img src="/images/seller/message.svg" alt="" className={s.chevron} />
						<img src="/images/seller/star.svg" alt="" className={s.star} />
					</div>
					<div className={s.message} id="message_2">
						<p>Низкая комиссия <br/> за размещение</p>
						<img src="/images/seller/message.svg" alt="" className={s.chevron} />
						<img src="/images/seller/star.svg" alt="" className={s.star} />
					</div>
					<div className={s.message} id="message_3">
						<p>Все необходимые <br/> юридические документы</p>
						<img src="/images/seller/message.svg" alt="" className={s.chevron} />
						<img src="/images/seller/star.svg" alt="" className={s.star} />
					</div>
				</div>
				<Counter/>
			</div>
		</div>
	)
}
