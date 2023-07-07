import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
import s from "./Path.module.scss";
import { Stars } from "./Stars";
import { MotionStar } from "./MotionStar";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

export const Path = () => {
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
			.to(" #publisher_star1", {}, 1)
			.to(" #publisher_info1", {
				x: 0
			}, 1)
			.to(" #publisher_star2", {}, 5.42)
			.to(" #publisher_info2", {
				x: 0
			}, 5.42)
			.to(" #publisher_info3", {
				x: 0
			}, 8)

		if(path){
			gsap.timeline({
				scrollTrigger: {
					trigger: ".motion-section",
					start: "bottom bottom",
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
	}, [path])

  return (
    <div className={s.container}>
      <svg
        width="1158"
        height="1402"
        viewBox="0 0 1158 1402"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
				>
        <path
					ref={(ref) => (path = ref)}
          d="M188.184 1C156.351 27.6667 111.784 94.4 188.184 148C268.713 204.497 389.06 174.602 466.184 232.791C497.793 260.71 504.021 275.622 504.021 275.622C547.874 348.132 702.691 535.725 864.331 593.479C929.049 616.603 994.477 618.895 1053.68 585C1257.18 468.5 1118.18 210.5 988.684 275.5C887.199 326.439 819.798 446.162 727.765 516.513C702.36 535.932 675.078 551.59 644.684 561C549.176 590.57 416 663.5 377 811.5L339.273 883.631C324.545 942.946 293.139 1030.82 190.886 1090.71C98.4208 1144.86 1 1138.86 1 1074.5C1 984.086 145.266 967.699 240.997 1054.25C262.265 1073.48 281.137 1097.79 295.5 1127.5C354 1248.5 358 1336 446 1401"
          stroke="#000"
          stroke-dasharray="6 6"
					stroke-width="4px" 
        />
        <path
          d="M188.184 1C156.351 27.6667 111.784 94.4 188.184 148C268.713 204.497 389.06 174.602 466.184 232.791C497.793 260.71 504.021 275.622 504.021 275.622C547.874 348.132 702.691 535.725 864.331 593.479C929.049 616.603 994.477 618.895 1053.68 585C1257.18 468.5 1118.18 210.5 988.684 275.5C887.199 326.439 819.798 446.162 727.765 516.513C702.36 535.932 675.078 551.59 644.684 561C549.176 590.57 416 663.5 377 811.5L339.273 883.631C324.545 942.946 293.139 1030.82 190.886 1090.71C98.4208 1144.86 1 1138.86 1 1074.5C1 984.086 145.266 967.699 240.997 1054.25C262.265 1073.48 281.137 1097.79 295.5 1127.5C354 1248.5 358 1336 446 1401"
          stroke="#FFF"
          stroke-dasharray="6 6"
					stroke-width="6px" 
        />
				<g ref={ref => star = ref} className="motion-star">
					<MotionStar/>
				</g>
				<Stars/>
      </svg>
    </div>
  );
};
