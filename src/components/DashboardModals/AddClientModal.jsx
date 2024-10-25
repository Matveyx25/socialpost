import { Modal } from "../Shared/Modal/Modal";
import { useEffect, useState } from "react";
import { FormikStepper } from "../Shared/FormikStepper/FormikStepper";
import { useAddClient } from "../../hooks/useAddClient";
import { ThirdStep } from "./AddClientModal/ThirdStep";
import { SecondStep } from "./AddClientModal/SecondStep";
import { FirstStep } from "./AddClientModal/FirstStep";
import * as Yup from "yup";

export const AddClientModal = ({ isOpen, setOpen }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [role, setRole] = useState('');

  const { mutate: createClient } = useAddClient();

  const handleSubmit = (values) => {
    createClient({...values, agencyInfo: values.role === 'AGENCY' ? values.agencyInfo : null});
    setOpen();
    setCurrentStep(0);
  };

  useEffect(() => {
		if(isOpen !== "add-my-client"){
			setCurrentStep(0);
		}
  }, [isOpen]);

  return (
    <Modal
      {...{ isOpen, setOpen }}
      title={(currentStep === 2 ? `Данные договора с рекламодателем ${currentStep + 1}/2` : `Добавить клиента ${currentStep + 1}/2`)}
      name={"add-my-client"}
    >
      <FormikStepper
				btnLabel="Создать клиента"
        initialValues={{
          name: "",
          type: "",
          role: "",
					advertiserInfo: {
						inn: "",
						phone: "",
						contractNumber: "",
						contractSubject: "",
						description: "",
						conclusionDate: "",
						recognizedByNDS: false,
						moneyAmount: "",
					},
					agencyInfo: {
						advertiserType: '',
						advertiserInn: '',
						advertiserPhone: '',
						executorType: '',
						executorInn: '',
						executorPhone: '',
						contractNumber: '',
						contractSubject: '',
						description: '',
						conclusionDate: '',
						recognizedByNDS: false,
						moneyAmount: '',
					}
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        onCancel={setOpen}
        step={currentStep}
        setStep={setCurrentStep}
      >
				<FirstStep {...{setRole}} validationSchema={Yup.object().shape({
					role: Yup.string().required("Выберите роль клиента"),
					type: Yup.string().required("Выберите тип клиента"),
					name: Yup.string().required("Заполните поле"),
				})}/>
        {role !== 'AGENCY' ? <SecondStep 
				validationSchema={Yup.object().shape({
					advertiserInfo:  Yup.object().shape({
						inn: Yup.string().when("type", (type, field) =>
							type.includes("IE") || type.includes("LEGAL_ENTITY")
								? field.required("Введите ИНН")
								: field.when("phone", (phone, phoneField) =>
										phone + "" ? phoneField : phoneField.required("Введите ИНН")
									)
						),
						phone: Yup.string().when("type", (type, field) =>
							type.includes("PHYSICAL_ENTITY")
								? field.when("inn", (inn, innField) =>
										inn + ""
											? innField
											: innField.required("Введите номер телефона")
									)
								: field.required("Введите номер телефона")
						),
						contractNumber: Yup.string().required("Введите номер договора"),
						contractSubject: Yup.string().required("Введите предмет договора"),
						description: Yup.string(),
						conclusionDate: Yup.string().required(
							"Введите дату заключения договора"
						),
						recognizedByNDS: Yup.boolean(),
						moneyAmount: Yup.string().matches(/^\d+$/, "Можно вводить только цифры"),
					})
					})}/> : null}
				{role === 'AGENCY' ? <ThirdStep 
				{...{role}} validationSchema={Yup.object().shape({
					agencyInfo: Yup.object().shape({
						advertiserType: Yup.string().required(),
						advertiserInn: Yup.string().required(),
						advertiserPhone: Yup.string().required(),
						executorType: Yup.string().required(),
						executorInn: Yup.string().required(),
						executorPhone: Yup.string().required(),
						contractNumber: Yup.string().required(),
						contractSubject: Yup.string().required(),
						description: Yup.string(),
						conclusionDate: Yup.string().required(),
						recognizedByNDS: Yup.boolean().oneOf([true], 'Признак НДС должен быть выбран'),
						moneyAmount: Yup.string().matches(/^\d+$/, "Можно вводить только цифры"),
					})
      	})}/> : null}
      </FormikStepper>
    </Modal>
  );
};
