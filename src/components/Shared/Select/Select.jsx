import { IconChevronDown } from '@tabler/icons-react';
import React from 'react'
import SelectElement from 'react-select';
import s from './Select.module.scss'
import { IconInfoCircleFilled } from '@tabler/icons-react';

export const Select = ({label, closeMenuOnSelect, className, isMulti, withInfo, fullWidth, options, setSelectedOption, defaultValue, placeholder}) => {
	return <div className={`${className} ${s.selectGroup}`}>
		<div className={s.header}>
			<span>{label}</span>
			{withInfo && <IconInfoCircleFilled color='#BDBEC0' />}
		</div>
		<SelectElement
			defaultValue={defaultValue}
			onChange={setSelectedOption}
			options={options}
			placeholder={placeholder}
			isSearchable={false}
			isMulti={isMulti}
			closeMenuOnSelect={closeMenuOnSelect}
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
				menu: (baseStyles) => ({
					...baseStyles,
					border: '1px solid #BDBEC0',
					borderRadius: 8,
					boxShadow: '0px 4px 20px 0px rgba(212, 217, 222, 0.25)'
				}),
				container: (baseStyles) => ({
					...baseStyles,
					width: fullWidth ? '100%' : 'fit-content'
				}),
				singleValue: (baseStyles) => ({
					...baseStyles,
					padding: 0
				}),
				option: (baseStyles) => ({
					...baseStyles,
					padding: '0.5rem 0.75rem',
					color: '#4F5157',
					fontFamily: 'SF Regular',
					fontSize: '1rem',
					lineHeight: '1.5rem'
				}),
				multiValue: (styles, { data }) => {
					return {
						...styles,
						backgroundColor: '#F3F3F3',
						fontSize: 16,
						fontFamily: 'SF Regular',
						padding: '1px 4px',
						lineHeight: '1.5rem',
						color: '#4F5157'
					};
				},
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
