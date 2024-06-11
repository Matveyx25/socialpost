import { Field } from "formik";
import { FormikStep } from "../../Shared/FormikStepper/FormikStepper";
import s from "../DashboardModals.module.scss";
import { InputField, InputFieldMasked } from "../../Shared/Input/Input";
import { Checkbox } from "../../Shared/Checkbox/checkbox";
import { Calendar } from "../../Shared/Calendar/Calendar";

export const SecondStep = () => {
  return (
    <FormikStep>
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
