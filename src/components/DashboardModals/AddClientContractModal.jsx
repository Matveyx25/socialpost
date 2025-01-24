import { Modal } from "../Shared/Modal/Modal";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import s from "./DashboardModals.module.scss";
import { InputField } from "../Shared/Input/Input";
import { Calendar } from "../Shared/Calendar/Calendar";
import { formatToISO } from "../../helpers/formatToISO";
import { Checkbox } from "../Shared/Checkbox/checkbox";
import { useAddClientContract } from "../../hooks/useAddClientContract";
import { Button } from "../Shared/Button/Button";
import { Select } from "../Shared/Select/Select";
import { contractSubjectsOptions } from '../../options/contractSubjects';

export const AddClientContractModal = ({ isOpen, setOpen, modalParams }) => {
  const { mutate: createClientContract } = useAddClientContract();

  const handleSubmit = (values) => {
    createClientContract({ ...values, id: modalParams.clientId });
    setOpen();
  };

  return (
    <Modal
      {...{ isOpen, setOpen }}
      title={`Добавить договор`}
      name={"add-my-client-contract"}
    >
      <Formik
        initialValues={{
          contractNumber: "",
          contractSubject: "",
          description: "",
          conclusionDate: "",
          recognizedByNDS: false,
          moneyAmount: "",
        }}
        enableReinitialize
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        validationSchema={Yup.object().shape({
          contractNumber: Yup.string().required("Введите номер договора"),
          contractSubject: Yup.string().required("Введите предмет договора"),
          description: Yup.string(),
          conclusionDate: Yup.string().required(
            "Введите дату заключения договора"
          ),
          recognizedByNDS: Yup.boolean(),
          moneyAmount: Yup.string().matches(
            /^\d+$/,
            "Можно вводить только цифры"
          ),
        })}
      >
					{({ dirty, isValid}) => (
						<Form>
							<div className={s.scroller}>
								<div className={s.form}>
									<div className={s.input}>
										<InputField
											label={"Номер договора клиента"}
											required
											placeholder={"Введите номер договора"}
											id="contractNumber"
											name="contractNumber"
										/>
									</div>
									<div className={s.input}>
										<Field name="contractSubject">
												{({ field: { value }, form: { setFieldValue } }) => (
													<Select
														label={"Предмет договора"}
														id="contractSubject"
														name="contractSubject"
														options={contractSubjectsOptions}
														required={true}
														placeholder={"Выберите предмет договора"}
														fullWidth={true}
														value={value}
														isMulti={false}
														setSelectedOption={(v) =>
															setFieldValue("contractSubject", v.value)
														}
													/>
												)}
											</Field>
									</div>
									<div className={s.input}>
										<InputField
											label={"Краткое описание"}
											placeholder={"Введите краткое описание"}
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
														setFieldValue("conclusionDate", formatToISO(v))
													}
												/>
											)}
										</Field>
									</div>
									<div className={s.input}>
										<InputField
											label={"Сумма договора"}
											placeholder={"Введите сумму договора"}
											id="moneyAmount"
											name="moneyAmount"
										/>
									</div>
									<div className={s.input}>
										<Checkbox name="recognizedByNDS" label={"с НДС"} />
									</div>
									<Button label="Добавить" disabled={!dirty || !isValid} />
								</div>
							</div>
						</Form>
				)}
      </Formik>
    </Modal>
  );
};
