import React from 'react'
import s from './Input.module.scss'
import { IconInfoCircleFilled } from '@tabler/icons-react'

export const Input = ({type = 'text', className, rightIcon, leftIcon, label, placeholder, value, onChange, error, disabled}) => {
	return (
		<div className={`${className} ${s.inputGroup} ${error && s.error} ${disabled && s.disabled}`}>
			<div className={s.header}>
				<span>{label}</span>	
				<IconInfoCircleFilled color='#BDBEC0'/>
			</div>
			<div className={s.inputWrapper}>
				{leftIcon}
				<input {...{type, value, disabled, onChange}} placeholder={placeholder}/>
				{rightIcon}
			</div>
			{error && <span className={s.error}>{error}</span>}
		</div>
	)
}
