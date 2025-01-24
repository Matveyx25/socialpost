import { FormikStep } from "../../Shared/FormikStepper/FormikStepper";
import s from "../DashboardModals.module.scss";
import { InputField, InputFieldMasked } from "../../Shared/Input/Input";
import { Select } from "../../Shared/Select/Select";
import { Field } from 'formik';

const typeOptions = [
	{ value: "PHYSICAL_ENTITY", label: "Физ. лицо" },
	{ value: "SELF_EMPLOYED", label: "Самозанятый" },
	{ value: "IE", label: "ИП" },
	{ value: "LEGAL_ENTITY", label: "Юр. лицо" },
];

export const SecondStep = () => {
  return (
    <FormikStep>
			<div className={s.form}>
				<div className={s.input}>
						<Field name="advertiserInfo.type">
							{({ field: { value }, form: { setFieldValue } }) => (
								<Select
									label={"Тип клиента"}
									id="advertiserInfo.type"
									name="advertiserInfo.type"
									options={typeOptions}
									required={true}
									placeholder={"Физ. лицо, Самозанятый, ИП, Юр. лицо"}
									fullWidth={true}
									value={value}
									isMulti={false}
									setSelectedOption={(v) => setFieldValue("advertiserInfo.type", v.value)}
								/>
							)}
						</Field>
					</div>
					<div className={s.input}>
						<InputField
							label={"Наименование клиента"}
							required
							placeholder={"Наименование"}
							id="name"
							name="name"
						/>
					</div>
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
				</div>
    </FormikStep>
  );
};
