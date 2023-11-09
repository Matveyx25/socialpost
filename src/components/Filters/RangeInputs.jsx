import React, { useEffect, useState } from 'react'
import s from './Filters.module.scss'

export const RangeInputs = ({minValue, maxValue, minOnChange, maxOnChange}) => {
	const [localMin, set_localMin] = useState(minValue)
	const [localMax, set_localMax] = useState(maxValue)

	useEffect(() => {
		if(minValue){
			set_localMin(minValue)
		}else{
			set_localMin('')
		}
	}, [minValue])
	
	useEffect(() => {
		if(maxValue){
			set_localMax(maxValue)
		}else{
			set_localMax('')
		}
	}, [maxValue])

	const validValue = (e) => {
		let value = e.target.value;
		if (value !== '') {
			value = value.replace(/\D/,'');
		}
		return value
	}

	const handleBlur = (type) => {
		if(type === 'max'){
			localMax > minValue || !minValue ? maxOnChange(localMax) : set_localMax(maxValue)
		}else if(type === 'min'){
			localMin < maxValue || !maxValue ? minOnChange(localMin) : set_localMin(minValue)
		}
	}
	
	return (
		<div className={s.inputsWrapper}>
			<span>
				от
			</span>
			<input type="text" placeholder='-' value={localMin} onBlur={() => handleBlur('min')} onChange={(e) => set_localMin(validValue(e))}/>
			<span>
				до
			</span>
			<input type="text" placeholder='-' value={localMax} onBlur={() => handleBlur('max')} onChange={(e) => set_localMax(validValue(e))}/>
		</div>
	)
}
