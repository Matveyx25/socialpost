import React from 'react'
import s from './Filters.module.scss'

export const RangeInputs = ({minValue, maxValue, minOnChange, maxOnChange}) => {
	return (
		<div className={s.inputsWrapper}>
			<span>
				от
			</span>
			<input type="text" placeholder='-' value={minValue} onChange={(e) => minOnChange(+e.target.value.replace(/\D/,''))}/>
			<span>
				до
			</span>
			<input type="text" placeholder='-' value={maxValue} onChange={(e) => maxOnChange(+e.target.value.replace(/\D/,''))}/>
		</div>
	)
}
