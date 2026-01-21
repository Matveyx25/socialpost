import { Modal } from "../Shared/Modal/Modal";
import s from './Filters.module.scss'
import { useEffect, useState } from "react";
import { Button } from '../Shared/Button/Button';
import { RangeSlider } from "./RangeSlider";
import { RangeInputs } from "./RangeInputs";
import { Select } from "../Shared/Select/Select";
import { filterChannelTypes, filterSubsScales } from "./Filters";
import { IconReload } from "@tabler/icons-react";

export const FilterModal = ({isOpen, setOpen, onFilterSubmit, maxSubscribersNumber}) => {
	const [minSubscribers, set_minSubscribers] = useState(0);
	const [maxSubscribers, set_maxSubscribers] = useState(maxSubscribersNumber);
	const [minPostReach, set_minPostReach] = useState();
	const [maxPostReach, set_maxPostReach] = useState();
	const [minCPV, set_minCPV] = useState();
	const [maxCPV, set_maxCPV] = useState();
	const [minPrice, set_minPrice] = useState();
	const [maxPrice, set_maxPrice] = useState();

	const [isSended, set_isSended] = useState(false)
	const [selectedTypes, set_selectedTypes] = useState([])

	useEffect(() => {
		if(maxSubscribersNumber){
			set_maxSubscribers(maxSubscribersNumber)
		}
	}, [maxSubscribersNumber])

	const reset = () => {
		set_minSubscribers(0)
		set_maxSubscribers(maxSubscribersNumber)
		set_minPostReach(undefined)
		set_maxPostReach(undefined)
		set_minCPV(undefined)
		set_maxCPV(undefined)
		set_minPrice(undefined)
		set_maxPrice(undefined)
	}

	const filterFunction = (el) => {
		const subscribers = +el.subscribers.replace(/\s/g, '');
		const postReach = +el.postReach.replace(/\s/g, '');
		const cpv = +el.cpv.replace(/\s/g, '');
		const price = +el.price.replace(/\s/g, '');
		const type = el.type;

		return (
			(minSubscribers === undefined || subscribers >= +minSubscribers) &&
			(maxSubscribers === undefined || subscribers <= +maxSubscribers) &&
			(minPostReach === undefined || postReach >= +minPostReach) &&
			(maxPostReach === undefined || postReach <= +maxPostReach) &&
			(minCPV === undefined || cpv >= +minCPV) &&
			(maxCPV === undefined || cpv <= +maxCPV) &&
			(minPrice === undefined || price >= +minPrice) &&
			(maxPrice === undefined || price <= +maxPrice) &&
			(selectedTypes.length === 0 || selectedTypes.findIndex(i => i.label === type) !== -1)
		);
	}

	const submitHandler = () => {
		set_isSended(true)
		setTimeout(() => {
			set_isSended(false)
			setOpen('')
		}, 1000)
		onFilterSubmit(filterFunction)
	}


  return (
		<Modal {...{isOpen, setOpen}} title={'Фильтры'} name={'filter-modal'}>
			<div className={s.wrapper}>
				<div className={s.inputsGroup}>
					<h5>Подписчики</h5>
					<RangeSlider scales={filterSubsScales} maxSubscribersNumber={maxSubscribersNumber} minValue={minSubscribers} maxValue={maxSubscribers} set_minValue={set_minSubscribers} set_maxValue={set_maxSubscribers}/>
					<RangeInputs minValue={minSubscribers} maxValue={maxSubscribers} minOnChange={set_minSubscribers} maxOnChange={set_maxSubscribers}/>
				</div>
				<Select className={s.select} options={filterChannelTypes} setSelectedOption={set_selectedTypes} isMulti closeMenuOnSelect={false} fullWidth placeholder="Тематика канала"/>
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
		</Modal>
  );
};
