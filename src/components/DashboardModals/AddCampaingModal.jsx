import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { InputField } from '../Shared/Input/Input';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import "formik-stepper/dist/style.css";
import { FormikStep, FormikStepper } from "../Shared/FormikStepper/FormikStepper";
import { Field } from "formik";
import { Select } from "../Shared/Select/Select";

export const AddCampaingModal = ({isOpen, setOpen}) => {
	const [currentStep, setCurrentStep] = useState(0)

  const handleSubmit = (values) => {
		setOpen()
		setCurrentStep(0)
  };

	useEffect(() => {
		return () => {
			setCurrentStep(0)
		}
	}, [])

  return (
		<Modal {...{isOpen, setOpen}} title={`Создать рекламную кампанию ${currentStep + 1}/3`} name={'add-campaing'}>
			 <FormikStepper
					initialValues={{
						name: "",
						type: "",
						clientId: null
					}}
					onSubmit={(values) => {
						handleSubmit(values)
					}}
					onCancel={setOpen}
					step={currentStep}
					setStep={setCurrentStep}
				>
					<FormikStep validationSchema={Yup.object().shape({
						name: Yup.string()
							.required("Заполните поле"),
					})}>
						<div className={s.form}>
							<div className={s.input}>
								<InputField
									label={"Название рекламной кампании"}
									required
									placeholder={'Название'}
									id="name"
									name="name"
								/>
							</div>
						</div>
					</FormikStep>
					<FormikStep  validationSchema={Yup.object().shape({
						clientId: Yup.string()
							.required("Заполните поле"),
					})}>
						<div className={s.form}>
							<div className={s.input}>
								<Field name="type">
									{({ field: { value }, form: { setFieldValue } }) => (
										<Select 
											label={'Тип клиента'} 
											id="type"
											name="type"
											options={[
												{value: ''}
											]}
											required={true}
											placeholder={'Выберите тип'}
											fullWidth={true}
											value={value}
											isMulti={false}
											setSelectedOption={(v) =>
												setFieldValue("type", v.value)
											}
										/>
									)}
								</Field>
							</div>
						</div>
					</FormikStep>
					{/* AD_POST, NATIVE_POST, FIXED_CPM, CHAT_BOT_PROMOTION  */}
				</FormikStepper>
		</Modal>
  );
};
