import { IconChevronDown } from '@tabler/icons-react';
import React from 'react'
import SelectElement from 'react-select';
import s from './Select.module.scss'
import { IconInfoCircleFilled } from '@tabler/icons-react';

export const Select = ({label, className,withInfo, fullWidth, options, setSelectedOption, defaultValue}) => {
	return <div className={`${className} ${s.selectGroup}`}>
		<div className={s.header}>
			<span>{label}</span>
			{withInfo && <IconInfoCircleFilled color='#BDBEC0' />}
		</div>
		<SelectElement
			defaultValue={defaultValue}
			onChange={setSelectedOption}
			options={options}
			isSearchable={false}
			components={{
				DropdownIndicator: () => <IconChevronDown size={18}/>
			}}
			styles={{
				control: (baseStyles) => ({
					...baseStyles,
					borderColor: '#E9EAEA',
					borderRadius: 8,
					minHeight: 48,
					paddingLeft: 16,
					paddingRight: 16
				}),
				container: (baseStyles) => ({
					...baseStyles,
					width: fullWidth ? '100%' : 'fit-content'
				}),
				singleValue: (baseStyles) => ({
					...baseStyles,
					padding: 0
				}),
				valueContainer: (baseStyles)=> ({
					...baseStyles,
					padding: 0,
					paddingRight: 8
				}),
				indicatorSeparator: () => ({
					display: 'none',
				}),
				dropdownIndicator: (baseStyles) => ({
					...baseStyles,
					padding: 0,
				}),
			}}
		/>
	</div>
}
