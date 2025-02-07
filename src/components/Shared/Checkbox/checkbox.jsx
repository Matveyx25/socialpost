import { Field } from 'formik';
import s from './checkbox.module.scss';
import { IconSquare, IconSquareCheckFilled } from '@tabler/icons-react';

export const Checkbox = ({ name, className, label }) => {
 return (
		<div className={`${s.wrapper} ${className}`}>
			<label>
				<Field type="checkbox" name={name}/>
				<span className={s.label}>
					<IconSquare className={s.checkboxIconEmpty} />
					<IconSquareCheckFilled className={s.checkboxIconFill} />
					{label}
				</span>
			</label>
		</div>
 );
};