import { IconChevronDown } from '@tabler/icons-react';
import React from 'react'
import SelectElement, {components} from 'react-select';
import s from './Select.module.scss'
import { IconInfoCircleFilled } from '@tabler/icons-react';
import classNames from 'classnames';
import { selectStyles } from './SelectStyles';

const CustomMenu = (props) => (
		<components.MenuList  {...props}>
				{props.firstElement}
				{props.children}
				{props.lastElement}
		</components.MenuList >
	)

export const Select = ({styles, headerClassName, value, firstElement, lastElement, label, required, closeMenuOnSelect, className, isMulti, withInfo, fullWidth, options, setSelectedOption, defaultValue, disabled, placeholder, ...props}) => {
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
			isSearchable={false}
			isMulti={isMulti}
			isDisabled={disabled}

			value={options?.find(_ => _.value === value)}
			closeMenuOnSelect={closeMenuOnSelect}
			components={{
				DropdownIndicator: () => <IconChevronDown className={s.icon}/>,
				MenuList: (props) => <CustomMenu {...props} lastElement={lastElement} firstElement={firstElement}/>
			}}
			styles={selectStyles({styles, fullWidth})}
		/>
	</div>
}
