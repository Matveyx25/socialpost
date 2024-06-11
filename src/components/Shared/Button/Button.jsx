import React from 'react'
import s from './Button.module.scss'
import { IconLoader2 } from '@tabler/icons-react'

const themes = {
	primary: {
		className: s.primary,
		color: '#fff'
	},
	secondary: {
		className: s.secondary,
		color: '#4F5157'
	}
}

export const Button = ({theme = 'primary', size = 'normal', fetching, rightIcon, leftIcon, label, className, onClick, disabled, ...props}) => {
	return (
		<button 
		onClick={onClick} 
		{...props}
		className={`${className} ${s.wrapper}
								${themes[theme].className} 
								${fetching && s.fetching} 
								${size === 'small' && s.small}`} disabled={disabled}>
			{fetching ? 
				<div className={s.iconWrapper}>
					<IconLoader2 color={themes[theme].color} className={s.loader} />
				</div>
				: 
				<>
					{leftIcon}
					<span>{label}</span>
					{rightIcon}
				</>
			}
		</button>
	)
}


