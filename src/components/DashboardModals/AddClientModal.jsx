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
    return () => {
      setCurrentStep(0);
    };
  }, []);

  return (
    <Modal
      {...{ isOpen, setOpen }}
      title={role === 'AGENCY' ? 
				(currentStep === 2 ? `Данные договора с рекламодателем ${currentStep + 1}/3` : `Добавить клиента ${currentStep + 1}/3`)
				: `Добавить клиента ${currentStep + 1}/2` }
      name={"add-my-client"}
    >
      <FormikStepper
        initialValues={{
          name: "",
          type: "",
          role: "",
          inn: "",
          phone: "",
          contractNumber: "",
          contractSubject: "",
          description: "",
          conclusionDate: "",
          recognizedByNDS: false,
          moneyAmount: "",
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
        <SecondStep 
				validationSchema={Yup.object().shape({
						inn: Yup.string().when("type", (type, field) =>
							type.includes("IE") || type.includes("OOO")
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
						moneyAmount: Yup.number().nullable(),
					})}/>
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
						moneyAmount: Yup.string(),
					})
      	})}/> : null}
      </FormikStepper>
    </Modal>
  );
};
