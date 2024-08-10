import { Form, Formik, useFormikContext } from "formik";
import { Children, useEffect } from "react";
import { Button } from "../Button/Button";
import s from './FormikStepper.module.scss'

export function FormikStep({ children }) {
  return <>{children}</>;
}

const MyForm = ({currentChild, isLastStep, ...props}) => {
	const context  = useFormikContext();
	const {setTouched, isValid, dirty} = context

	useEffect(() => {
		setTouched({});
	}, [currentChild]);
	
	return (
		<Form autoComplete="off">
			{currentChild}
			<div className={s.rowBtns}>
				<Button
					label={props.step === 0 ? "Отменить" : "Назад"}
					theme="secondary"
					className={s.btnHalf}
					onClick={(event) => {
						event.stopPropagation()
						event.preventDefault()
						if(props.step === 0){
							props.onCancel()
						}else{
							props.setStep(s => s - 1)
						}}}
				/>
				<Button
					label={isLastStep() ? props?.btnLabel : "Далее"}
					className={s.btnHalf}
					disabled={!dirty || !isValid}
					type="submit"
				/>
			</div>
		</Form>
	)
}

export function FormikStepper({ children, ...props }) {
  const childrenArray = Children.toArray(children);
  const currentChild = childrenArray[props.step];

  function isLastStep() {
    return props.step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          props.setStep(s => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ dirty, isValid }) => (
        <MyForm {...props} {...{isLastStep, currentChild}}/>
      )}
    </Formik>
  );
}