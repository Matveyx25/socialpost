import React, { useEffect, useRef, useState } from 'react'
import s from './SellerContent.module.scss'
import { Circle } from './Circle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SellerContent = () => {
	let scroller = useRef(null)
	const [progress, setProgress] = useState(1)

	useEffect(() => {
		if(scroller){
			ScrollTrigger.create({
				scroller,
			});
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
					onSnapComplete: (e) => setProgress(+e.trigger.dataset.number + (+e.direction === 1 && 1))
				});
			});
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
		</div>
	)
}
