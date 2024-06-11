import { Field } from "formik";
import { FormikStep } from "../../Shared/FormikStepper/FormikStepper";
import s from "../DashboardModals.module.scss";
import { InputField, InputFieldMasked } from "../../Shared/Input/Input";
import { Checkbox } from "../../Shared/Checkbox/checkbox";
import * as Yup from "yup";
import { Calendar } from "../../Shared/Calendar/Calendar";

export const SecondStep = () => {
  return (
    <FormikStep
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
      })}
    >
			<div className={s.scroller}>
				<div className={s.form}>
					<div className={s.input}>
						<InputField
							label={"ИНН"}
							required
							placeholder={"Введите ИНН"}
							id="inn"
							name="inn"
						/>
					</div>
					<div className={s.input}>
						<InputFieldMasked
							mask={'+7 (999) 999-99-99'}
							label={"Номер телефона"}
							required
							placeholder={"Введите номер телефона"}
							id="phone"
							name="phone"
						/>
					</div>
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
						<InputField
							label={"Предмет договора"}
							required
							placeholder={"Введите предмет договора"}
							id="contractSubject"
							name="contractSubject"
						/>
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
										setFieldValue("conclusionDate", v.toISOString())
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
						<Checkbox name="recognizedByNDS" label={"Признак НДС"} />
					</div>
				</div>
			</div>
    </FormikStep>
  );
};
