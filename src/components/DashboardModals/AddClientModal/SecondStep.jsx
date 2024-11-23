import { FormikStep } from "../../Shared/FormikStepper/FormikStepper";
import s from "../DashboardModals.module.scss";
import { InputField, InputFieldMasked } from "../../Shared/Input/Input";

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
				</div>
			</div>
    </FormikStep>
  );
};
