import React from 'react'
import MultiRangeSlider from 'multi-range-slider-react';
import s from './Filters.module.scss'


export const RangeSlider = ({minValue, maxValue, set_minValue, set_maxValue, scales, maxSubscribersNumber}) => {
	const maxScale = Math.max(...scales.map(obj => obj.value));

	const handleInput = (e) => {
		set_minValue(e.minValue);
		set_maxValue(e.maxValue);
	};

	return (
		<>
			<div className={s.graphLines}>
				{scales.map((el, index) => (
					<span key={`line-${index}`} style={{'height': (el.value/maxScale*100) + '%'}}></span>
				))}
			</div>
			<MultiRangeSlider
				min={0}
				max={maxSubscribersNumber}
				step={1}
				ruler={false}
				label={false}
				minValue={minValue}
				maxValue={maxValue}
				baseClassName={`multi-range-slider ${s.slider}`}
				onInput={(e) => {
					handleInput(e);
				}}
			/>
		</>
	)
}
