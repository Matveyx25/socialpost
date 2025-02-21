import { Modal } from "../Shared/Modal/Modal";
import { useEffect, useState } from "react";
import { FormikStepper } from "../Shared/FormikStepper/FormikStepper";
import { ThirdStep } from "./AddClientModal/ThirdStep";
import { SecondStep } from "./AddClientModal/SecondStep";
import * as Yup from "yup";
import { useMyClientById } from "../../hooks/useMyClientById";
import { useEditClient } from '../../hooks/useEditClient';
import { Loader } from "../Shared/Loader/Loader";

export const EditClientModal = ({ isOpen, setOpen, modalParams }) => {
  const [currentStep, setCurrentStep] = useState(0);

	const { mutate: editClient } = useEditClient(modalParams?.clientId);
	const { data: client, isFetching } = useMyClientById(modalParams?.clientId)

  const handleSubmit = (values) => {
    editClient({...values, agencyInfo: client?.role === 'AGENCY' ? values.agencyInfo : null,  advertiserInfo: client?.role !== 'AGENCY' ? values.advertiserInfo : null});
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
      title={(`Редактировать рекламодателя`)}
      name={"edit-client"}
    >
			{isFetching ? <Loader/> : 
			<>
      <FormikStepper
				btnLabel="Сохранить"
        initialValues={{
          ...client
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        onCancel={setOpen}
        step={currentStep}
        setStep={setCurrentStep}
      >
        {client?.role !== 'AGENCY' ? <SecondStep 
				validationSchema={Yup.object().shape({
					name: Yup.string().required("Заполните поле"),
					advertiserInfo:  Yup.object().shape({
						inn: Yup.string().when("advertiserInfo.type", (type, field) =>
							type.includes("IE") || type.includes("LEGAL_ENTITY")
								? field.required("Введите ИНН")
								: field.when("phone", (phone, phoneField) =>
										phone + "" ? phoneField : phoneField.required("Введите ИНН")
									)
						),
						type: Yup.string().required("Выберите тип"),
						phone: Yup.string().when("advertiserInfo.type", (type, field) =>
							type.includes("PHYSICAL_ENTITY")
								? field.when("inn", (inn, innField) =>
										inn + ""
											? innField
											: innField.required("Введите номер телефона")
									)
								: field.required("Введите номер телефона")
						),
					})
					})}/> : null}
				{client?.role === 'AGENCY' ? <ThirdStep
				isEdit={true}
				role={client?.role} validationSchema={Yup.object().shape({
					name: Yup.string().required("Заполните поле"),
					agencyInfo: Yup.object().shape({
						advertiserType: Yup.string().required("Заполните поле"),
						advertiserInn: Yup.string().required("Заполните поле"),
						advertiserPhone: Yup.string().required("Заполните поле"),
						executorType: Yup.string().required("Заполните поле"),
						executorName: Yup.string().required("Заполните поле"),
						executorInn: Yup.string().required("Заполните поле"),
						executorPhone: Yup.string().required("Заполните поле"),
						contractNumber: Yup.string().required("Заполните поле"),
						contractSubject: Yup.string().required("Заполните поле"),
						description: Yup.string(),
						conclusionDate: Yup.string().required("Заполните поле"),
						moneyAmount: Yup.string().matches(/^\d+$/, "Можно вводить только цифры"),
					})
      	})}/> : null}
      </FormikStepper>
			</>}
    </Modal>
  );
};
