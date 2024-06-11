import { Field, useField, useFormikContext } from "formik";
import { FormikStep } from "../../Shared/FormikStepper/FormikStepper";
import s from '../DashboardModals.module.scss'
import { Select } from "../../Shared/Select/Select";
import { InputField, InputFieldMasked } from "../../Shared/Input/Input";
import { Checkbox } from "../../Shared/Checkbox/checkbox";
import * as Yup from "yup";
import { Calendar } from "../../Shared/Calendar/Calendar";
import { useEffect } from "react";

export const ThirdStep = () => {
  const context = useFormikContext();

  const typeOptions = [
    { value: "PHYSICAL_ENTITY", label: "Физ. лицо" },
    { value: "IE", label: "ИП" },
    { value: "OOO", label: "ООО" },
  ];

  const subjectOptions = [
    { value: "Представительство", label: "Представительство" },
    { value: "Распространение рекламы", label: "Распространение рекламы" },
    {
      value: "Организация Распространение рекламы",
      label: "Организация Распространение рекламы",
    },
    { value: "Посредничество", label: "Посредничество" },
    { value: "Иное", label: "Иное" },
  ];

  if (context.getFieldMeta('role').value !== "AGENCY") {
		return null;
  }

  return (
    <FormikStep
      validationSchema={Yup.object().shape({
        "agencyInfo.advertiserType": Yup.string().required(),
        "agencyInfo.advertiserInn": Yup.string().required(),
        "agencyInfo.advertiserPhone": Yup.string().required(),
        "agencyInfo.executorType": Yup.string().required(),
        "agencyInfo.executorInn": Yup.string().required(),
        "agencyInfo.executorPhone": Yup.string().required(),
        "agencyInfo.contractNumber": Yup.string().required(),
        "agencyInfo.contractSubject": Yup.string().required(),
        "agencyInfo.description": Yup.string(),
        "agencyInfo.conclusionDate": Yup.string().required(),
        "agencyInfo.recognizedByNDS": Yup.boolean().oneOf([true], 'Признак НДС должен быть выбран'),
        "agencyInfo.moneyAmount": Yup.string(),
      })}
    >
			<div className={s.scroller}>
				<div className={s.form}>
					<div className={s.subtitle}>Рекламодатель</div>
					<div className={s.input}>
						<Field name="agencyInfo.advertiserType">
							{({ field: { value }, form: { setFieldValue } }) => (
								<Select
									label={"Тип рекламодателя"}
									id="agencyInfo.advertiserType"
									name="agencyInfo.advertiserType"
									options={typeOptions}
									required={true}
									placeholder={"Выберите тип"}
									fullWidth={true}
									value={value}
									isMulti={false}
									setSelectedOption={(v) =>
										setFieldValue("agencyInfo.advertiserType", v.value)
									}
								/>
							)}
						</Field>
					</div>
					<div className={s.input}>
						<InputField
							label={"ИНН рекламодателя"}
							required
							placeholder={"Введите ИНН"}
							id="agencyInfo.advertiserInn"
							name="agencyInfo.advertiserInn"
						/>
					</div>
					<div className={s.input}>
						<InputFieldMasked
							mask={'+7 (999) 999-99-99'}
							label={"Номер телефона рекламодателя"}
							required
							placeholder={"Введите номер телефона"}
							id="agencyInfo.advertiserPhone"
							name="agencyInfo.advertiserPhone"
						/>
					</div>

					<div className={s.subtitle}>Данные исполнителя</div>

					<div className={s.input}>
						<Field name="agencyInfo.executorType">
							{({ field: { value }, form: { setFieldValue } }) => (
								<Select
									label={"Тип исполнителя"}
									id="agencyInfo.executorType"
									name="agencyInfo.executorType"
									options={typeOptions}
									required={true}
									placeholder={"Выберите тип"}
									fullWidth={true}
									value={value}
									isMulti={false}
									setSelectedOption={(v) =>
										setFieldValue("agencyInfo.executorType", v.value)
									}
								/>
							)}
						</Field>
					</div>
					<div className={s.input}>
						<InputField
							label={"ИНН исполнителя"}
							required
							placeholder={"Введите ИНН"}
							id="agencyInfo.executorInn"
							name="agencyInfo.executorInn"
						/>
					</div>
					<div className={s.input}>
						<InputFieldMasked
							mask={'+7 (999) 999-99-99'}
							label={"Номер телефона исполнителя"}
							required
							placeholder={"Введите номер телефона"}
							id="agencyInfo.executorPhone"
							name="agencyInfo.executorPhone"
						/>
					</div>

					<div className={s.subtitle}>
						Данные изначального договора с рекламодателем
					</div>

					<div className={s.input}>
						<InputField
							label={"Номер договора"}
							required
							placeholder={"Введите номер договора"}
							id="agencyInfo.contractNumber"
							name="agencyInfo.contractNumber"
						/>
					</div>

					<div className={s.input}>
						<Field name="agencyInfo.contractSubject">
							{({ field: { value }, form: { setFieldValue } }) => (
								<Select
									label={"Предмет договора"}
									id="agencyInfo.contractSubject"
									name="agencyInfo.contractSubject"
									options={subjectOptions}
									required={true}
									placeholder={"Выберите предмет договора"}
									fullWidth={true}
									value={value}
									isMulti={false}
									setSelectedOption={(v) =>
										setFieldValue("agencyInfo.contractSubject", v.value)
									}
								/>
							)}
						</Field>
					</div>
					<div className={s.input}>
						<InputField
							label={"Краткое описание"}
							placeholder={"Введите краткое описание"}
							id="agencyInfo.description"
							name="agencyInfo.description"
						/>
					</div>
					<div className={s.input}>
						<Field name="agencyInfo.conclusionDate">
							{({ field: { value }, form: { setFieldValue } }) => (
								<Calendar
									placeholder={"11.08.1998"}
									label={"Дата заключения договора:"}
									className={s.calendar}
									value={value}
									required
									onChange={(v) =>
										setFieldValue("agencyInfo.conclusionDate", v.toISOString())
									}
								/>
							)}
						</Field>
					</div>
					<div className={s.input}>
						<InputField
							label={"Сумма договора"}
							placeholder={"Введите сумму договора"}
							id="agencyInfo.moneyAmount"
							name="agencyInfo.moneyAmount"
						/>
					</div>
					<div className={s.input}>
						<Checkbox name="agencyInfo.recognizedByNDS" label={"Признак НДС"} />
					</div>
				</div>
			</div>
    </FormikStep>
  );
};