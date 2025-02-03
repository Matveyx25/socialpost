import { Field } from "formik";
import { FormikStep } from "../../Shared/FormikStepper/FormikStepper";
import s from '../DashboardModals.module.scss'
import { Select } from "../../Shared/Select/Select";

export const FirstStep = ({setRole}) => {
  const roleOptions = [
    { value: "AGENCY", label: "Нет" },
    { value: "ADVERTISER", label: "Да" },
  ];

  return (
		<FormikStep>
			<div className={s.form}>
				<div className={s.input}>
					<Field name="role">
						{({ field: { value }, form: { setFieldValue } }) => (
							<Select
								label={"Прямой рекламодатель"}
								id="role"
								name="role"
								options={roleOptions}
								required={true}
								placeholder={"Выберите"}
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
			</div>
		</FormikStep>
  );
};