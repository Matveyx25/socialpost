import { Field } from "formik";
import { FormikStep } from "../../Shared/FormikStepper/FormikStepper";
import s from '../DashboardModals.module.scss'
import { Select } from "../../Shared/Select/Select";
import { InputField, InputFieldMasked } from "../../Shared/Input/Input";
import { Checkbox } from "../../Shared/Checkbox/checkbox";
import { Calendar } from "../../Shared/Calendar/Calendar";
import { formatToISO } from "../../../helpers/formatToISO";
import classNames from "classnames";
import { contractSubjectsOptions } from "../../../options/contractSubjects";

export const ThirdStep = () => {
  const typeOptions = [
    { value: "PHYSICAL_ENTITY", label: "Физ. лицо" },
    { value: "SELF_EMPLOYED", label: "Самозанятый" },
    { value: "IE", label: "ИП" },
    { value: "LEGAL_ENTITY", label: "Юр. лицо" },
  ];
	
  return (
    <FormikStep>
			<div className={s.scroller}>
				<div className={classNames(s.form, s.wide)}>
					<div className={s.row}>
						<div className={s.col}>
							<div className={s.subtitle}>Данные рекламодателя</div>
							<div className={s.input}>
								<InputField
									label={"Наименование конечного рекламодателя"}
									required
									placeholder={"Наименование"}
									id="name"
									name="name"
								/>
							</div>
							<div className={s.input}>
								<Field name="agencyInfo.advertiserType">
									{({ field: { value, name }, form: { setFieldValue } }) => (
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
											setSelectedOption={(v) => {
												console.log(name);
												setFieldValue("agencyInfo.advertiserType", v.value)
											}}
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
						</div>
						<div className={s.col}>
							<div className={s.subtitle}>Данные исполнителя</div>
							<div className={s.input}>
								<InputField
									label={"Имя"}
									required
									placeholder={"ФИО или наименование"}
									id="agencyInfo.executorName"
									name="agencyInfo.executorName"
								/>
							</div>
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
						</div>
					</div>

					<div className={s.subtitle}>
						Данные изначального договора с рекламодателем
					</div>
					<div className={s.row}>
						<div className={s.col}>
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
											options={contractSubjectsOptions}
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
						</div>
						<div className={s.col}>
							<div className={s.input}>
								<Field name="agencyInfo.conclusionDate">
									{({ field: { value }, form: { setFieldValue } }) => (
										<Calendar
											placeholder={"11.08.1998"}
											label={"Дата заключения договора:"}
											className={s.calendar}
											value={value}
											required
											onChange={(v) => setFieldValue("agencyInfo.conclusionDate", formatToISO(v))}
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
								<Checkbox name="agencyInfo.recognizedByNDS" label={"с НДС"} />
							</div>
						</div>
					</div>
				</div>
			</div>
    </FormikStep>
  );
};