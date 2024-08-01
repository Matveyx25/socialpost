import React from 'react'
import s from './CheckboxField.module.scss'
import { IconSquare, IconSquareCheckFilled } from '@tabler/icons-react';

export const CheckboxField = ({field, form, initValue}) => {
	return (
			<div className={s.checkWrapper}>
				<label>
					<input {...field} type="checkbox" 
					checked={field.value.find(_ => _ === initValue)}
					onChange={() => {
						if (field.value.find(_ => _ === initValue)) {
							form.setFieldValue(field.name, field.value.filter((_) => _ !== initValue));
						} else {
							form.setFieldValue(field.name, [...field.value, initValue]);
						}
					}}/>
					<span className={s.checkLabel}>
						<IconSquare className={s.checkboxIconEmpty}/>
						<IconSquareCheckFilled className={s.checkboxIconFill}/>
					</span>
				</label>
			</div>
	)
}
