import { gsap } from 'gsap';
import { MotionPathPlugin, ScrollTrigger } from 'gsap/all';
import React, { useEffect, useRef, useState } from 'react'
import { Shus } from './Shus';
import s from './SellerContent.module.scss'
import { useMediaQuery } from 'react-responsive';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

export const Path = () => {
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)'
	})

	let star = useRef(null)
	let path = useRef(null)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const length = path.getTotalLength();
	
		path.style.strokeDasharray = length + 6;
		path.style.strokeDashoffset = length + 6;
	
		var draw = length * progress
		path.style.strokeDashoffset = length - draw > 0 ? length - draw : 0;	
	}, [progress])
	
	useEffect(() => {
		const pulses = gsap.timeline({
			defaults: {
				alpha: 1,
				transformorigin: 'center',
			}})
			.to(" #message_1", {
				x: 0
			}, 1)
			.to(" .shu_1", {}, 4)
			.to(" #message_2", {
				x: 0
			}, 5.42)
			.to(" .shu_2", {}, 5.42)
			.to(" #message_3", {
				x: 0
			}, 8)
			.to(" .shu_3", {}, 6)

		if(!isMobile && path){
			gsap.timeline({
				scrollTrigger: {
					trigger: ".motion-section__seller",
					start: "bottom center",
					end: "top top",
					scrub: 1,
				}
			})
			.to(star, {
				duration: 8,
				ease: "none",
				immediateRender: true,
				motionPath: {
					path: path,
					align: path,
					alignOrigin: [0.5, 0.5],
					autoRotate: 90,
				},
				onUpdate: function() {
					setProgress(this.progress())
				}
			}, 0).add(pulses, 0)
		}
	}, [path, isMobile])

	return (
    <div className={s.pathContainer}>
      <svg
        width="1329"
        height="876"
        viewBox="0 0 1329 876"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
					ref={(ref) => (path = ref)}
					d="M42.8698 0.396484C10.9813 31.0348 -33.6626 107.707 42.8698 169.29C123.538 234.201 212.354 203.541 289.612 270.396C289.612 270.396 325.176 303.508 363.453 317.267C414.48 335.609 516.612 333.896 516.612 333.896C588.287 333.896 710.519 333.896 852.842 333.896L1011.12 333.896C1067.86 333.896 1125.88 333.896 1183.61 333.896C1452.11 333.896 1128.61 168.897 999.112 233.897C949.817 258.639 939.657 296.496 937.867 333.896C934.956 394.749 954.205 454.396 863.112 454.396C757.112 454.396 820.112 563.396 970.612 543.896C970.612 543.896 1118.67 513.555 1178.15 543.896C1215.57 562.987 1215.11 607.396 1215.11 607.396C1215.11 666.396 1301.01 733.796 1224.61 787.396C1144.08 843.893 1017.11 736.396 911.612 736.396H658.711"
          stroke="black"
          stroke-dasharray="6 6"
        />
        <path
					d="M42.8698 0.396484C10.9813 31.0348 -33.6626 107.707 42.8698 169.29C123.538 234.201 212.354 203.541 289.612 270.396C289.612 270.396 325.176 303.508 363.453 317.267C414.48 335.609 516.612 333.896 516.612 333.896C588.287 333.896 710.519 333.896 852.842 333.896L1011.12 333.896C1067.86 333.896 1125.88 333.896 1183.61 333.896C1452.11 333.896 1128.61 168.897 999.112 233.897C949.817 258.639 939.657 296.496 937.867 333.896C934.956 394.749 954.205 454.396 863.112 454.396C757.112 454.396 820.112 563.396 970.612 543.896C970.612 543.896 1118.67 513.555 1178.15 543.896C1215.57 562.987 1215.11 607.396 1215.11 607.396C1215.11 666.396 1301.01 733.796 1224.61 787.396C1144.08 843.893 1017.11 736.396 911.612 736.396H658.711"
          stroke="#FEE9E9"
          stroke-dasharray="6 6"
					stroke-width="2px"
        />
				<circle ref={(ref) => (star = ref)} cx="0.5" cy="0.5" r="0.5" fill="#000"/>
        <Shus />
      </svg>
    </div>
  );
}
