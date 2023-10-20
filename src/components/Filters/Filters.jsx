import React, { useState } from 'react'
import s from './Filters.module.scss'
import MultiRangeSlider from "multi-range-slider-react";
import { RangeInputs } from './RangeInputs';
import { Button } from '../Shared/Button/Button';
import { IconReload } from '@tabler/icons-react';

export const Filters = () => {
	const [minSubscribers, set_minSubscribers] = useState(0);
	const [maxSubscribers, set_maxSubscribers] = useState(35000);
	const [minPostReach, set_minPostReach] = useState();
	const [maxPostReach, set_maxPostReach] = useState();
	const [minCPV, set_minCPV] = useState();
	const [maxCPV, set_maxCPV] = useState();
	const [minPrice, set_minPrice] = useState();
	const [maxPrice, set_maxPrice] = useState();
	const handleInput = (e) => {
		set_minSubscribers(e.minValue);
		set_maxSubscribers(e.maxValue);
	};

	return (
		<div className={s.wrapper}>
			<h2>Фильтры</h2>
			<span className={s.line}></span>
			<div className={s.inputsGroup}>
				<h5>Подписчики</h5>
				<MultiRangeSlider
					min={0}
					max={100000}
					step={1}
					ruler={false}
					label={false}
					minValue={minSubscribers}
					maxValue={maxSubscribers}
					baseClassName={`multi-range-slider ${s.slider}`}
					onInput={(e) => {
						handleInput(e);
					}}
				/>
				<RangeInputs minValue={minSubscribers} maxValue={maxSubscribers} minOnChange={set_minSubscribers} maxOnChange={set_maxSubscribers}/>
			</div>
			<div className={s.inputsGroup}>
				<h5>Средний охват поста</h5>
				<RangeInputs minValue={minPostReach} maxValue={maxPostReach} minOnChange={set_minPostReach} maxOnChange={set_maxPostReach}/>
			</div>
			<div className={s.inputsGroup}>
				<h5>CPV <span>(цена за просмотр)</span></h5>
				<RangeInputs minValue={minCPV} maxValue={maxCPV} minOnChange={set_minCPV} maxOnChange={set_maxCPV}/>
			</div>
			<div className={s.inputsGroup}>
				<h5>Стоимость рекламы</h5>
				<RangeInputs minValue={minPrice} maxValue={maxPrice} minOnChange={set_minPrice} maxOnChange={set_maxPrice}/>
			</div>
			<span className={s.line}></span>
			<Button className={s.resetBtn} label={'Сбросить'} theme='secondary' leftIcon={<IconReload size={18}/>}/>
			<Button className={s.btn} label={'Применить'}/>
		</div>
	)
}
