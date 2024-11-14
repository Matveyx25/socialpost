import React from "react";
import s from "./requisites.module.scss";
import { DashboardCard } from "../dashboard-card";
import { Select } from "../../../Shared/Select/Select";
import { InputField } from "../../../Shared/Input/Input";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "../../../Shared/Button/Button";
import {
  useLegalEntity,
  useUpdateLegalEntity,
} from "../../../../hooks/publisherBalance";
import classNames from "classnames";

const tax = [
  { value: "OSN", label: "ОСН" },
  { value: "USN", label: "УСН" },
];

export const Entity = () => {
  const { data: LegalEntity } = useLegalEntity();
  const { mutate: updateLegalEntity } = useUpdateLegalEntity();

  const validator = Yup.object().shape({
    OGRN: Yup.string()
      .matches(/^\d+$/, "ОГРН должен содержать только цифры")
      .required("Введите ОГРН"),
    entityAddress: Yup.string().required("Введите юридический адрес"),
		okved: Yup.string().required("Введите ОКВЭД"),
    correspondentAddress: Yup.string().required(
      "Введите адрес для корреспонденции"
    ),
    taxSystem: Yup.string().required("Выберите систему налогообложения"),
    name: Yup.string()
      .required("Введите ИНН"),
    inn: Yup.string()
      .matches(/^\d+$/, "ИНН должен содержать только цифры")
      .required("Введите ИНН"),
    accountNumber: Yup.string()
      .matches(/^\d+$/, "Расчетный счет должен содержать только цифры")
      .required("Введите рассчетный счет"),
    bank: Yup.string().required("Введите банк"),
    bic: Yup.string()
      .matches(/^\d+$/, "БИК должен содержать только цифры")
      .required("Введите БИК"),
    correspondentAccount: Yup.string()
      .matches(/^\d+$/, "Корреспондентский счет должен содержать только цифры")
      .required("Введите корреспондентский счет"),
  });

  return (
		<Formik
			enableReinitialize={true}
			initialValues={{
				name: LegalEntity?.name,
				inn: LegalEntity?.inn,
				OGRN: LegalEntity?.ogrn,
				okved: LegalEntity?.okved,
				correspondentAddress: LegalEntity?.correspondenceAddress,
				entityAddress: LegalEntity?.legalAddress,
				taxSystem: LegalEntity?.taxSystem,
				accountNumber: LegalEntity?.bankDetails?.checkingAccount,
				bank: LegalEntity?.bankDetails?.bank,
				bic: LegalEntity?.bankDetails?.bik,
				correspondentAccount:
					LegalEntity?.bankDetails?.correspondentAccount,
			}}
			validationSchema={validator}
			onSubmit={(values) => {
				updateLegalEntity({
					name: values?.name,
					inn: values?.inn,
					taxSystem: values?.taxSystem,
					ogrn: values?.OGRN,
					legalAddress: values?.entityAddress,
					correspondenceAddress: values?.correspondentAddress,
					okved: values?.okved,
					bankDetails: {
						checkingAccount: values?.accountNumber,
						bank: values?.bank,
						bik: values?.bic,
						correspondentAccount: values?.correspondentAccount,
					},
				});
			}}
		>
			{({ dirty, isValid }) => (
				<Form>
					<DashboardCard className={s.formsWrapperCard}>
						<div className={s.formsWrapper}>
							<div className={s.formCard}>
								<div className={s.cardHeader}>Личные данные</div>
								<div className={s.line}></div>
								<div className={s.formRow}>
									<InputField
										label={"Название"}
										name="name"
										placeholder="ООО 'ООО'"
										className={s.input}
										disabled={LegalEntity?.status && LegalEntity?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"ИНН"}
										name="inn"
										placeholder="12345"
										className={s.input}
										disabled={LegalEntity?.status && LegalEntity?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<Field name="taxSystem">
										{({ field: { value }, form: { setFieldValue } }) => (
											<Select
												fullWidth
												label="Система налогообложения"
												options={tax}
												defaultValue={
													value ? tax.find((e) => e.value === value) : null
												}
												setSelectedOption={(v) =>
													setFieldValue("taxSystem", v.value)
												}
												className={s.select}
												disabled={LegalEntity?.status && LegalEntity?.status !== 'DECLINES'}
											/>
										)}
									</Field>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"ОКВЭД"}
										name="okved"
										placeholder="62.09"
										className={s.input}
										disabled={LegalEntity?.status && LegalEntity?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"ОГРН"}
										name="OGRN"
										placeholder="1-02-66-05-60662-0"
										className={s.input}
										disabled={LegalEntity?.status && LegalEntity?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"Юридический адрес"}
										name="entityAddress"
										placeholder="Железнодорожная 21А"
										className={s.input}
										disabled={LegalEntity?.status && LegalEntity?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"Адрес для корреспонденции"}
										name="correspondentAddress"
										placeholder="Железнодорожная 21А"
										className={s.input}
										disabled={LegalEntity?.status && LegalEntity?.status !== 'DECLINES'}
									/>
								</div>
							</div>
							<div className={s.formCard}>
								<div className={s.cardHeader}>Банковские реквизиты</div>
								<div className={s.line}></div>
								<div className={s.formRow}>
									<InputField
										label={"Расчетный счет"}
										name="accountNumber"
										placeholder="12345"
										className={s.input}
										disabled={LegalEntity?.status && LegalEntity?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"Банк"}
										name="bank"
										placeholder="12345"
										className={s.input}
										disabled={LegalEntity?.status && LegalEntity?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"БИК"}
										name="bic"
										placeholder="12345"
										className={s.input}
										disabled={LegalEntity?.status && LegalEntity?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"Корреспондентский счет"}
										name="correspondentAccount"
										placeholder="30101"
										className={s.input}
										disabled={LegalEntity?.status && LegalEntity?.status !== 'DECLINES'}
									/>
								</div>
							</div>
						</div>
						<div className={s.line}></div>
						<div className={s.btns}>
							{LegalEntity?.status ?
							<>
								<div className={classNames(s.status, s[LegalEntity.status])}>
									{{
										'PENDING': 'Данные на модерации',
										'ACCEPTED': 'Данные приняты',
										'DECLINED': 'Данные отклонены',
									}[LegalEntity.status]}
								</div>
							</>
							: <Button
								label={(!dirty || !isValid) ? 'Данные пустые' : "Сохранить данные"}
								theme="secondary"
								className={s.btn}
								disabled={!dirty || !isValid}
							/>}
						</div>
					</DashboardCard>
				</Form>
			)}
		</Formik>
  );
};
