import React from 'react'
import s from './Textarea.module.scss'
import { IconInfoCircleFilled } from '@tabler/icons-react'

export const Textarea = ({className, label, placeholder, value, onChange, error, disabled, required, withInfo}) => {
	return (
		<div className={`${className} ${s.textareaGroup} ${error && s.error} ${disabled && s.disabled}`}>
			<div className={s.header}>
				<span>{label}{required && <span className={s.star}>*</span>} </span>	
				{withInfo && <IconInfoCircleFilled color='#BDBEC0'/>}
			</div>
			<div className={s.textareaWrapper}>
				<textarea {...{value, disabled, onChange}} placeholder={placeholder}/>
			</div>
			{error && <span className={s.error}>{error}</span>}
		</div>
	)
}