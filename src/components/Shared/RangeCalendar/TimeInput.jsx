import React from "react";
import s from "./RangeCalendar.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import {
	IconClockUp,
} from "@tabler/icons-react";
import classNames from "classnames";
import { useField } from "formik";

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
				<input
					type="time"
					value={time}
					onChange={(e) => {
						setTime(e.target.value)
					}}
					onClick={(e) => e.stopPropagation()}
					className={s.calendarInput}
				/>
			</div>
			{(meta.touched && meta.error) && <span className={s.error}>{meta.error[name]}</span>}
		</>
  );
};
