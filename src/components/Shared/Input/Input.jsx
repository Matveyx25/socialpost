import React, { useState } from 'react'
import s from './Input.module.scss'
import { IconEye, IconInfoCircleFilled } from '@tabler/icons-react'
import { IconEyeOff } from '@tabler/icons-react'

export const Input = ({type = 'text', className, rightIcon, leftIcon, label, placeholder, value, onChange, error, disabled, required, withInfo}) => {
	const [localType, set_localType] = useState(type)
	
	return (
		<div className={`${className} ${s.inputGroup} ${error && s.error} ${disabled && s.disabled}`}>
			<div className={s.header}>
				<span>{label}{required && <span className={s.star}>*</span>} </span>	
				{withInfo && <IconInfoCircleFilled color='#BDBEC0'/>}
			</div>
			<div className={s.inputWrapper}>
				{leftIcon}
				<input {...{type: localType, value, disabled, onChange}} placeholder={placeholder}/>
				{rightIcon}
				{type === 'password' && 
					(localType === 'password' ? 
					<IconEye onClick={() => set_localType('text')} className={s.eyeBtn} size={18}/> :
					<IconEyeOff onClick={() => set_localType('password')} className={s.eyeBtn} size={18}/> )
				}
			</div>
			{error && <span className={s.error}>{error}</span>}
		</div>
	)
}
