import { IconChevronDown } from '@tabler/icons-react';
import React from 'react'
import SelectElement, {components} from 'react-select';
import s from './Select.module.scss'
import { IconInfoCircleFilled } from '@tabler/icons-react';
import classNames from 'classnames';
import { selectStyles } from './SelectStyles';
import { Input } from '../Input/Input';

const CustomMenu = (props) => (
		<components.MenuList  {...props}>
				{props.firstElement}
				{props.children}
				{props.lastElement}
		</components.MenuList >
	)

export const Select = ({styles, disabledValue, headerClassName, value, firstElement, lastElement, label, required, closeMenuOnSelect, className, isMulti, withInfo, fullWidth, options, setSelectedOption, defaultValue, disabled, placeholder, isSearchable = false, ...props}) => {
	if(disabled && disabledValue){
		return (
			<Input required={required} label={label} value={disabledValue} className={s.input} disabled={true} rightIcon={<IconChevronDown color='#888'/>}/>
		)
	}
	
	return <div className={`${className} ${s.selectGroup}`}>
		{label && <div className={classNames(headerClassName, s.header)}>
			<span>{label}{required && <span className={s.star}>*</span>}</span>
			{withInfo && <IconInfoCircleFilled color='#BDBEC0' />}
		</div>}
		<SelectElement
			{...props}
			defaultValue={defaultValue}
			onChange={setSelectedOption}
			options={options}
			placeholder={placeholder ? placeholder : 'Выбрать...'}
			isSearchable={isSearchable}
			isMulti={isMulti}
			isDisabled={disabled}
			value={options?.find(_ => _.value === value)}
			closeMenuOnSelect={closeMenuOnSelect}
			components={{
				DropdownIndicator: () => <IconChevronDown className={s.icon}/>,
				MenuList: (props) => <CustomMenu {...props} lastElement={lastElement} firstElement={firstElement}/>,
				NoOptionsMessage: (props) => <components.NoOptionsMessage {...props}>
				<span className="custom-css-class">Нет доступных вариантов</span> 
			</components.NoOptionsMessage>
			}}
			styles={selectStyles({styles, fullWidth})}
		/>
	</div>
}
