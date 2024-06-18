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
    createClient(values);
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
        <SecondStep validationSchema={Yup.object().shape({
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
        "agencyInfo.advertiserType": Yup.string().required(),
        "agencyInfo.advertiserInn": Yup.string().required(),
        "agencyInfo.advertiserPhone": Yup.string().required(),
        "agencyInfo.executorType": Yup.string().required(),
        "agencyInfo.executorInn": Yup.string().required(),
        "agencyInfo.executorPhone": Yup.string().required(),
        "agencyInfo.contractNumber": Yup.string().required(),
        "agencyInfo.contractSubject": Yup.string().required(),
        "agencyInfo.description": Yup.string(),
        "agencyInfo.conclusionDate": Yup.string().required(),
        "agencyInfo.recognizedByNDS": Yup.boolean().oneOf([true], 'Признак НДС должен быть выбран'),
        "agencyInfo.moneyAmount": Yup.string(),
      })}/> : null}
      </FormikStepper>
    </Modal>
  );
};
