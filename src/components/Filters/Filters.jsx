import React, { useState } from 'react'
import s from './Filters.module.scss'
import { RangeInputs } from './RangeInputs';
import { Button } from '../Shared/Button/Button';
import { IconReload } from '@tabler/icons-react';
import { RangeSlider } from './RangeSlider';

const scales = [
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1200},
	{value: 1420},
	{value: 1620},
	{value: 1620},
	{value: 1420},
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1200},
	{value: 1420},
	{value: 1620},
	{value: 1620},
	{value: 1420},
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1256},
	{value: 1140},
	{value: 1000},
	{value: 1000},
	{value: 1200},
	{value: 1420},
	{value: 1620},
	{value: 1620},
	{value: 1420},
	{value: 1256},
	{value: 1140},
	{value: 1000},
]

export const Filters = ({onFilterSubmit, maxSubscribersNumber}) => {
	const [minSubscribers, set_minSubscribers] = useState(0);
	const [maxSubscribers, set_maxSubscribers] = useState(35000);
	const [minPostReach, set_minPostReach] = useState();
	const [maxPostReach, set_maxPostReach] = useState();
	const [minCPV, set_minCPV] = useState();
	const [maxCPV, set_maxCPV] = useState();
	const [minPrice, set_minPrice] = useState();
	const [maxPrice, set_maxPrice] = useState();

	const [isSended, set_isSended] = useState(false)

	const reset = () => {
		set_minSubscribers(null)
		set_maxSubscribers(null)
		set_minPostReach('')
		set_maxPostReach('')
		set_minCPV('')
		set_maxCPV('')
		set_minPrice('')
		set_maxPrice('')
	}

	const filterFunction = (el) => {
		const subscribers = +el.subscribers.replace(/\s/g, '');
		const postReach = +el.postReach.replace(/\s/g, '');
		const cpv = +el.cpv.replace(/\s/g, '');
		const price = +el.price.replace(/\s/g, '');

		return (
			(minSubscribers === undefined || subscribers >= +minSubscribers) &&
			(maxSubscribers === undefined || subscribers <= +maxSubscribers) &&
			(minPostReach === undefined || postReach >= +minPostReach) &&
			(maxPostReach === undefined || postReach <= +maxPostReach) &&
			(minCPV === undefined || cpv >= +minCPV) &&
			(maxCPV === undefined || cpv <= +maxCPV) &&
			(minPrice === undefined || price >= +minPrice) &&
			(maxPrice === undefined || price <= +maxPrice)
		);
	}

	const submitHandler = () => {
		set_isSended(true)
		setTimeout(() => {
			set_isSended(false)
		}, 2000)
		onFilterSubmit(filterFunction)
	}

	return (
		<div className={s.wrapper}>
			<h2>Фильтры</h2>
			<span className={s.line}></span>
			<div className={s.inputsGroup}>
				<h5>Подписчики</h5>
				<RangeSlider scales={scales} maxSubscribersNumber={maxSubscribersNumber} minValue={minSubscribers} maxValue={maxSubscribers} set_minValue={set_minSubscribers} set_maxValue={set_maxSubscribers}/>
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
			<Button className={s.resetBtn} label={'Сбросить'} theme='secondary' leftIcon={<IconReload size={18}/>} onClick={reset}/>
			<Button className={s.btn} label={'Применить'} fetching={isSended} onClick={submitHandler}/>
		</div>
	)
}
