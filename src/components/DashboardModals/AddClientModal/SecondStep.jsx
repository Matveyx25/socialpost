import { Field } from "formik";
import { FormikStep } from "../../Shared/FormikStepper/FormikStepper";
import s from "../DashboardModals.module.scss";
import { InputField, InputFieldMasked } from "../../Shared/Input/Input";
import { Checkbox } from "../../Shared/Checkbox/checkbox";
import { Calendar } from "../../Shared/Calendar/Calendar";
import { formatToISO } from "../../../helpers/formatToISO";

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
							id="advertiserInfo.inn"
							name="advertiserInfo.inn"
						/>
					</div>
					<div className={s.input}>
						<InputFieldMasked
							mask={'+7 (999) 999-99-99'}
							label={"Номер телефона"}
							required
							placeholder={"Введите номер телефона"}
							id="advertiserInfo.phone"
							name="advertiserInfo.phone"
						/>
					</div>
					<div className={s.input}>
						<InputField
							label={"Номер договора клиента"}
							required
							placeholder={"Введите номер договора"}
							id="advertiserInfo.contractNumber"
							name="advertiserInfo.contractNumber"
						/>
					</div>
					<div className={s.input}>
						<InputField
							label={"Предмет договора"}
							required
							placeholder={"Введите предмет договора"}
							id="advertiserInfo.contractSubject"
							name="advertiserInfo.contractSubject"
						/>
					</div>
					<div className={s.input}>
						<InputField
							label={"Краткое описание"}
							placeholder={"Введите краткое описание"}
							id="advertiserInfo.description"
							name="advertiserInfo.description"
						/>
					</div>
					<div className={s.input}>
						<Field name="advertiserInfo.conclusionDate">
							{({ field: { value }, form: { setFieldValue } }) => (
								<Calendar
									placeholder={"11.08.1998"}
									label={"Дата заключения договора:"}
									className={s.calendar}
									value={value}
									required
									onChange={(v) =>
										setFieldValue("advertiserInfo.conclusionDate", formatToISO(v))
									}
								/>
							)}
						</Field>
					</div>
					<div className={s.input}>
						<InputField
							label={"Сумма договора"}
							placeholder={"Введите сумму договора"}
							id="advertiserInfo.moneyAmount"
							name="advertiserInfo.moneyAmount"
						/>
					</div>
					<div className={s.input}>
						<Checkbox name="advertiserInfo.recognizedByNDS" label={"Признак НДС"} />
					</div>
				</div>
			</div>
    </FormikStep>
  );
};
