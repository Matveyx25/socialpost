import { Form, Formik } from "formik";
import { Children, useEffect, useState } from "react";
import { Button } from "../Button/Button";
import s from './FormikStepper.module.scss'

export function FormikStep({ children }) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }) {
  const childrenArray = Children.toArray(children);
  const currentChild = childrenArray[props.step];

  function isLastStep() {
    return props.step === childrenArray.length - 1;
  }

	useEffect(() => {
		console.log(props.step);
	}, [props.step])

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          props.setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <>
					<Form autoComplete="off">
						{currentChild}
						<div className={s.rowBtns}>
							{<Button
								label={props.step === 0 ? "Отменить" : "Назад"}
								theme="secondary"
								className={s.btnHalf}
								disabled={isSubmitting}
								variant="contained"
								color="primary"
								onClick={() => {
									if(props.step === 0){
										props.onCancel()
									}else{
										props.setStep((s) => s - 1)
									}}}
							/>}
							<Button
								label={isLastStep() ? "Создать кампанию" : "Далее"}
								className={s.btnHalf}
								disabled={!dirty || !isValid}
								type="submit"
							/>
						</div>
					</Form>
				</>
      )}
    </Formik>
  );
}