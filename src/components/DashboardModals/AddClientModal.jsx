import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { InputField } from '../Shared/Input/Input';
import { Field } from "formik";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import "formik-stepper/dist/style.css";
import { FormikStep, FormikStepper } from "../Shared/FormikStepper/FormikStepper";
import { Select } from "../Shared/Select/Select";
import { Checkbox } from '../Shared/Checkbox/checkbox';
import { Calendar } from "../Shared/Calendar/Calendar";
import { useAddClient } from '../../hooks/useAddClient';

export const AddClientModal = ({isOpen, setOpen}) => {
	const [currentStep, setCurrentStep] = useState(1)
	const {mutate: createClient} = useAddClient()

  const handleSubmit = (values) => {
		createClient(values)
		setOpen()
		setCurrentStep(0)
  };

	useEffect(() => {
		return () => {
			setCurrentStep(0)
		}
	}, [])

	const roleOptions = [
		{ value: 'AGENCY', label: 'Агентство' },
		{ value: 'ADVERTISER', label: 'Рекламодатель' },
	 ];
	 
	 
	const typeOptions = [
		{ value: 'PHYSICAL_ENTITY', label: 'Физ. лицо' },
		{ value: 'IE', label: 'ИП' },
		{ value: 'OOO', label: 'ООО' },
	];

  return (
		<Modal {...{isOpen, setOpen}} title={`Добавить клиента ${currentStep + 1}/2`} name={'add-my-client'}>
			 <FormikStepper
			 		initialValues={{
						name: "",
						type: "",
						role: "",
						inn: '',
						phone: '',
						contractNumber: '',
						contractSubject: '',
						description: '',
						conclusionDate: '',
						recognizedByNDS: false,
						moneyAmount: '',
					}}
					onSubmit={(values) => {
						handleSubmit(values)
					}}
					onCancel={setOpen}
					step={currentStep}
					setStep={setCurrentStep}
				>
					<FormikStep validationSchema={
						Yup.object().shape({
							role: Yup.string()
								.required("Выберите роль клиента"),
							type: Yup.string()
								.required("Выберите тип клиента"),
							name: Yup.string()
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
												options={typeOptions}
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
								<div className={s.input}>
								<Field name="type">
                    {({ field: { value }, form: { setFieldValue } }) => (
											<Select 
												label={'Роль клиента'} 
												id="role"
												name="role"
												options={roleOptions}
												required={true}
												placeholder={'Выберите роль'}
												fullWidth={true}
												isMulti={false}	
												value={value}
												setSelectedOption={(v) =>
													setFieldValue("role", v.value)
												}
											/>
                    )}
                  </Field>
								</div>
								<div className={s.input}>
									<InputField
										label={"Наименование клиента"}
										required
										placeholder={'Наименование'}
										id="name"
										name="name"
									/>
								</div>
							</div>
					</FormikStep>
					{/* - поле ввода "ИНН" !!!!!!!(для ИП и ООО обяз; для физ л обяз, если нет тел),
							- поле ввода "Номер телефона" !!!!!!!(для физ л обяз, если нет ИНН), 
					*/}
						<FormikStep validationSchema={Yup.object().shape({
							inn: Yup.string().when('type', (type, field) => 
								type.includes('IE') || type.includes('OOO') ? 
									field.required("Введите ИНН") : 
									field.when('phone', (phone, phoneField) =>
										phone + '' ? 
											phoneField :
											phoneField.required("Введите ИНН")
									 )
							 ),
							phone: Yup.string().when('type', (type, field) => 
								type.includes('PHYSICAL_ENTITY') ? 
									field.when('inn', (inn, innField) =>
										inn + '' ? 
											innField :
											innField.required("Введите номер телефона")
									 ) : 
									 field.required("Введите номер телефона")
							 ),
							contractNumber: Yup.string().required("Введите номер договора"),
							contractSubject: Yup.string().required("Введите предмет договора"),
							description: Yup.string(),
							conclusionDate: Yup.string().required("Введите дату заключения договора"),
							recognizedByNDS: Yup.boolean(),
							moneyAmount: Yup.number().nullable(),
						})}>
								<div className={s.form}>
									<div className={s.input}>
										<InputField
											label={"ИНН"}
											required
											placeholder={'Введите ИНН'}
											id="inn"
											name="inn"
										/>
									</div>
									<div className={s.input}>
										<InputField
											label={"Номер телефона"}
											required
											placeholder={'Введите номер телефона'}
											id="phone"
											name="phone"
										/>
									</div>
									<div className={s.input}>
										<InputField
											label={"Номер договора клиента"}
											required
											placeholder={'Введите номер договора'}
											id="contractNumber"
											name="contractNumber"
										/>
									</div>
									<div className={s.input}>
										<InputField
											label={"Предмет договора"}
											required
											placeholder={'Введите предмет договора'}
											id="contractSubject"
											name="contractSubject"
										/>
									</div>
									<div className={s.input}>
										<InputField
											label={"Краткое описание"}
											placeholder={'Введите краткое описание'}
											id="description"
											name="description"
										/>
									</div>
									<div className={s.input}>
                  <Field name="conclusionDate">
                    {({ field: { value }, form: { setFieldValue } }) => (
                      <Calendar
                        placeholder={"11.08.1998"}
                        label={"Дата заключения договора:"}
                        className={s.calendar}
                        value={value}
												required
                        onChange={(v) =>
                          setFieldValue("conclusionDate", v.toISOString())
                        }
                      />
                    )}
                  </Field>
                </div>
									<div className={s.input}>
										<InputField
											label={"Сумма договора"}
											placeholder={'Введите сумму договора'}
											id="moneyAmount"
											name="moneyAmount"
										/>
									</div>
									<div className={s.input}>
										<Checkbox
											name="recognizedByNDS"
											label={'Признак НДС'}
										/>
									</div>
								</div>
						</FormikStep>
				</FormikStepper>
		</Modal>
  );
};
