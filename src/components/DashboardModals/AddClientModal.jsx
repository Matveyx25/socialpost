import { Modal } from "../Shared/Modal/Modal";
import { useEffect, useState } from "react";
import "formik-stepper/dist/style.css";
import { FormikStepper } from "../Shared/FormikStepper/FormikStepper";
import { useAddClient } from "../../hooks/useAddClient";
import { ThirdStep } from "./AddClientModal/ThirdStep";
import { SecondStep } from "./AddClientModal/SecondStep";
import { FirstStep } from "./AddClientModal/FirstStep";


export const AddClientModal = ({ isOpen, setOpen }) => {
  const [currentStep, setCurrentStep] = useState(1);
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
				<FirstStep {...{setRole}}/>
        <SecondStep/>
				<ThirdStep {...{role}}/>
      </FormikStepper>
    </Modal>
  );
};
