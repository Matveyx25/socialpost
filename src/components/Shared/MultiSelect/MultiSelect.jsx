import React, { useRef } from "react";
import { IconChevronDown, IconInfoCircleFilled } from "@tabler/icons-react";
import s from './MultiSelect.module.scss'
import { selectStyles } from "../Select/SelectStyles";
import classNames from "classnames";
import ReactSelect from "react-select";

export const MultiSelect = props => {
  const valueRef = useRef(props.value);
  valueRef.current = props.value;

  const selectAllOption = {
    value: "<SELECT_ALL>",
    label: "Выбрать все"
  };

  const isSelectAllSelected = () =>
    valueRef.current.length === props.options.length;

  const isOptionSelected = option =>
    valueRef.current.some(({ value }) => value === option.value) ||
    isSelectAllSelected();

  const getOptions = () => [selectAllOption, ...props.options];

  const getValue = () =>
    isSelectAllSelected() ? [selectAllOption] : props.value;

  const onChange = (newValue, actionMeta) => {
    const { action, option, removedValue } = actionMeta;

    if (action === "select-option" && option.value === selectAllOption.value) {
      props.onChange(props.options, actionMeta);
    } else if (
      (action === "deselect-option" &&
        option.value === selectAllOption.value) ||
      (action === "remove-value" &&
        removedValue.value === selectAllOption.value)
    ) {
      props.onChange([], actionMeta);
    } else if (
      actionMeta.action === "deselect-option" &&
      isSelectAllSelected()
    ) {
      props.onChange(
        props.options.filter(({ value }) => value !== option.value),
        actionMeta
      );
    } else {
      props.onChange(newValue || [], actionMeta);
    }
  };

  return (
		<div className={`${props?.className} ${s.selectGroup}`}>
			{props?.label && <div className={classNames(props?.headerClassName, s.header)}>
				<span>{props?.label}{props?.required && <span className={s.star}>*</span>}</span>
				{props?.withInfo && <IconInfoCircleFilled color='#BDBEC0' />}
			</div>}
			<ReactSelect
				{...props}
				isOptionSelected={isOptionSelected}
				options={getOptions()}
				value={getValue()}
				onChange={onChange}
				hideSelectedOptions={false}
				closeMenuOnSelect={false}
				isMulti
				components={{
					DropdownIndicator: () => <IconChevronDown className={s.icon}/>,
				}}
				styles={selectStyles({styles: props?.styles, fullWidth: props?.fullWidth})}
			/>
		</div>
  );
};
