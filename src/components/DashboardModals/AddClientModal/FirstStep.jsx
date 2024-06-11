import { Field, useField } from "formik";
import { FormikStep } from "../../Shared/FormikStepper/FormikStepper";
import s from '../DashboardModals.module.scss'
import { Select } from "../../Shared/Select/Select";
import { InputField } from "../../Shared/Input/Input";
import * as Yup from "yup";

export const FirstStep = ({setRole}) => {
  const roleOptions = [
    { value: "AGENCY", label: "Агентство" },
    { value: "ADVERTISER", label: "Рекламодатель" },
  ];

  const typeOptions = [
    { value: "PHYSICAL_ENTITY", label: "Физ. лицо" },
    { value: "IE", label: "ИП" },
    { value: "OOO", label: "ООО" },
  ];

  return (
		<FormikStep
			validationSchema={Yup.object().shape({
				role: Yup.string().required("Выберите роль клиента"),
				type: Yup.string().required("Выберите тип клиента"),
				name: Yup.string().required("Заполните поле"),
			})}
		>
			<div className={s.scroller}>
				<div className={s.form}>
					<div className={s.input}>
						<Field name="type">
							{({ field: { value }, form: { setFieldValue } }) => (
								<Select
									label={"Тип клиента"}
									id="type"
									name="type"
									options={typeOptions}
									required={true}
									placeholder={"Выберите тип"}
									fullWidth={true}
									value={value}
									isMulti={false}
									setSelectedOption={(v) => setFieldValue("type", v.value)}
								/>
							)}
						</Field>
					</div>
					<div className={s.input}>
						<Field name="type">
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