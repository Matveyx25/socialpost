import { Field, useField } from "formik";
import { FormikStep } from "../../Shared/FormikStepper/FormikStepper";
import s from '../DashboardModals.module.scss'
import { Select } from "../../Shared/Select/Select";
import { InputField } from "../../Shared/Input/Input";

export const FirstStep = ({setRole}) => {
  const roleOptions = [
    { value: "AGENCY", label: "Агентство" },
    { value: "ADVERTISER", label: "Рекламодатель" },
  ];

  const typeOptions = [
    { value: "PHYSICAL_ENTITY", label: "Физ. лицо" },
    { value: "SELF_EMPLOYED", label: "Самозанятый" },
    { value: "IE", label: "ИП" },
    { value: "LEGAL_ENTITY", label: "Юр. лицо" },
  ];

  return (
		<FormikStep>
			<div className={s.scroller}>
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
						<Field name="role">
							{({ field: { value }, form: { setFieldValue } }) => (
								<Select
									label={"Роль клиента"}
									id="role"
									name="role"
									options={roleOptions}
									required={true}
									placeholder={"Выберите роль"}
									fullWidth={true}
									isMulti={false}
									value={value}
									setSelectedOption={(v) => {
										setFieldValue("role", v.value)
										setRole(v.value)
									}}
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
				</div>
			</div>
		</FormikStep>
  );
};