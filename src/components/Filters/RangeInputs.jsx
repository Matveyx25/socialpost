import React, { useEffect, useState } from 'react'
import s from './Filters.module.scss'
import { useFormikContext } from 'formik'

export const RangeInputs = ({minValue, maxValue, minOnChange, maxOnChange}) => {
	const [localMin, set_localMin] = useState(minValue)
	const [localMax, set_localMax] = useState(maxValue)

	useEffect(() => {
		if(minValue){
			set_localMin(minValue)
		}else{
			set_localMin('')
		}
	}, [minValue])
	
	useEffect(() => {
		if(maxValue){
			set_localMax(maxValue)
		}else{
			set_localMax('')
		}
	}, [maxValue])

	const validValue = (e) => {
		let value = e.target.value;
		if (value !== '') {
			value = value.replace(/\D/,'');
		}
		return value
	}

	const handleBlur = (type) => {
		if(type === 'max'){
			localMax > minValue || !minValue ? maxOnChange(localMax) : set_localMax(maxValue)
		}else if(type === 'min'){
			localMin < maxValue || !maxValue ? minOnChange(localMin) : set_localMin(minValue)
		}
	}
	
	return (
		<div className={s.inputsWrapper}>
			<span>
				от
			</span>
			<input type="text" placeholder='-' value={localMin} onBlur={() => handleBlur('min')} onChange={(e) => set_localMin(validValue(e))}/>
			<span>
				до
			</span>
			<input type="text" placeholder='-' value={localMax} onBlur={() => handleBlur('max')} onChange={(e) => set_localMax(validValue(e))}/>
		</div>
	)
}

export const RangeInputsField = ({ minName, maxName }) => {
  const { values, setFieldValue } = useFormikContext();

  const validValue = (e) => {
    let value = e.target.value;
    if (value!== '') {
      value = value.replace(/\D/, '');
    }
    return value;
  };

  const handleBlur = (type) => {
    const fieldName = type === 'min'? minName : maxName;
    const fieldValue = type === 'min'? values[minName] : values[maxName];
    const otherFieldName = type === 'min'? maxName : minName;
    const otherFieldValue = type === 'min'? values[maxName] : values[minName];

    if (type === 'max') {
      if (fieldValue > values[otherFieldName] ||!values[otherFieldName]) {
        setFieldValue(fieldName, fieldValue);
      } else {
        setFieldValue(fieldName, values[fieldName]);
      }
    } else if (type === 'min') {
      if (fieldValue < values[otherFieldName] ||!values[otherFieldName]) {
        setFieldValue(fieldName, fieldValue);
      } else {
        setFieldValue(fieldName, values[fieldName]);
      }
    }
  };

  return (
    <div className={s.inputsWrapper}>
      <span>от</span>
      <input
        type="text"
        placeholder='-'
        value={values[minName]}
        onBlur={() => handleBlur('min')}
        onChange={(e) => {
          const value = validValue(e);
          setFieldValue(minName, value);
        }}
      />
      <span>до</span>
      <input
        type="text"
        placeholder='-'
        value={values[maxName]}
        onBlur={() => handleBlur('max')}
        onChange={(e) => {
          const value = validValue(e);
          setFieldValue(maxName, value);
        }}
      />
    </div>
  );
};