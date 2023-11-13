import React, { useState } from 'react'
import s from './Counter.module.scss'

export const Counter = ({className,value, onChange, max, min}) => {
	const minus = () => {
		if(+value - 1 >= +min){
			onChange(+value - 1)
		}
	}
	const plus = () => {
		if(+value + 1 <= +max){
			onChange(+value + 1)
		}
	}

	return (
		<div className={`${className} ${s.inputGroup}`}>
			<div className={s.inputWrapper}>
				<button onClick={minus} disabled={+value <= min}>-</button>
				<p>{value}</p>
				<button onClick={plus} disabled={+value + 1 >= max}>+</button>
			</div>
		</div>
	)
}
