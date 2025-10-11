import React from "react";
import s from "./RangeCalendar.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import {
	IconClockUp,
} from "@tabler/icons-react";
import classNames from "classnames";
import { useField } from "formik";
import TimeInputComponent from '../TimeInput/index';

export const TimeInput = ({
  time,
  setTime,
	name,
  inputsWrapperClassName,
	...props
}) => {
	const [field, meta] = useField(props)

  return (
		<>
			<div
				className={classNames(
					s.inputsWrapper,
					s.timeRangeWrapper,
					inputsWrapperClassName,
					// (meta.touched && meta.error) ? s.error : ''
				)}
			>
				<IconClockUp size={20} color="#919396" />
				<TimeInputComponent value={time} onChange={setTime} withSeconds={false} className={s.timeInputComponent}/>
			</div>
			{(meta.touched && meta.error) && <span className={s.error}>{meta.error[name]}</span>}
		</>
  );
};
