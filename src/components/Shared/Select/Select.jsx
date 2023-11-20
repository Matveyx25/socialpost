import { IconChevronDown } from '@tabler/icons-react';
import React from 'react'
import SelectElement from 'react-select';

export const Select = ({options, setSelectedOption, defaultValue}) => {
	return <SelectElement
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
}
