import React from 'react'
import s from './CheckedAll.module.scss'
import { useFormikContext } from 'formik'
import { IconSquare, IconSquareMinusFilled } from '@tabler/icons-react'

export const CheckedAll = ({ids, name}) => {
	const {values, setFieldValue} = useFormikContext()

	return (
		<div className={s.checkWrapper}>
		<label>
			<input
				type="checkbox"
				checked={values.checkboxes?.length > 0}
				onChange={() => {
					if (values.checkboxes?.length > 0) {
						setFieldValue(name, []);
					} else {
						setFieldValue(
							name,
							ids
						);
					}
				}}
			/>
			<span className={s.checkLabel}>
				<IconSquare className={s.checkboxIconEmpty} />
				<IconSquareMinusFilled
					className={s.checkboxIconFill}
				/>
			</span>
		</label>
	</div>
	)
}
