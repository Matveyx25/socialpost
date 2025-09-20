import React from "react";
import s from "./requisites.module.scss";
import { DashboardCard } from "../dashboard-card";
import { Select } from "../../../Shared/Select/Select";
import { InputField } from "../../../Shared/Input/Input";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "../../../Shared/Button/Button";
import {
  useIE,
  useUpdateIE,
} from "../../../../hooks/publisherBalance";
import classNames from "classnames";

const tax = [
  { value: "OSN", label: "ОСН" },
  { value: "USN", label: "УСН" },
];

export const IndividualEntrepreneur = () => {
	const nameRegExp = /^([\S]+)\s([\S]+)\s([\S]+)?$/;

  const { data: IE } = useIE();
  const { mutate: updateIE } = useUpdateIE();

  const validator = Yup.object().shape({
    OGRN: Yup.string()
      .matches(/^\d+$/, "ОГРН должен содержать только цифры")
      .required("Введите ОГРН"),
    address: Yup.string().required("Введите адрес"),
		okved: Yup.string().required("Введите ОКВЭД"),
    taxSystem: Yup.string().required("Выберите систему налогообложения"),
    fullName: Yup.string()
      .matches(nameRegExp, "Введите ФИО верно")
      .required("Введите ФИО"),
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
    vatRate: Yup.string()
      .matches(/^\d+$/, "НДС должен содержать только цифры")
      .required("Введите НДС"),
    correspondentAccount: Yup.string()
      .matches(/^\d+$/, "Корреспондентский счет должен содержать только цифры")
      .required("Введите корреспондентский счет"),
  });

  return (
		<Formik
			enableReinitialize={true}	
			initialValues={{
				inn: IE?.inn,
				fullName: IE?.fullName,
				OGRN: IE?.ogrn,
				address: IE?.address,
				taxSystem: IE?.taxSystem,
				okved: IE?.okved,
				vatRate: IE?.vatRate,
				accountNumber: IE?.bankDetails?.checkingAccount,
				bank: IE?.bankDetails?.bank,
				bic: IE?.bankDetails?.bik,
				correspondentAccount: IE?.bankDetails?.correspondentAccount,
			}}
			validationSchema={validator}
			onSubmit={(values) => {
				updateIE({
					fullName: values?.fullName,
					inn: values?.inn,
					ogrn: values?.OGRN,
					address: values?.address,
					taxSystem: values?.taxSystem,
					okved: values?.okved,
					vatRate: values?.vatRate,
					bankDetails: {
						checkingAccount: values?.accountNumber,
						bank: values?.bank,
						bik: values?.bic,
						correspondentAccount: values?.correspondentAccount,
					},
				});
			}}
		>
			{({ isValid, dirty }) => (
				<Form>
					<DashboardCard className={s.formsWrapperCard}>
						<div className={s.formsWrapper}>
							<div className={s.formCard}>
								<div className={s.cardHeader}>Личные данные</div>
								<div className={s.line}></div>
								<div className={s.formRow}>
									<InputField
										label={"ФИО"}
										name="fullName"
										placeholder="Иванов Иван Иванович"
										className={s.input}
										disabled={IE?.status && IE?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"ИНН"}
										name="inn"
										placeholder="12345"
										className={s.input}
										disabled={IE?.status && IE?.status !== 'DECLINES'}
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
												disabled={IE?.status && IE?.status !== 'DECLINES'}
											/>
										)}
									</Field>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"НДС"}
										name="vatRate"
										placeholder="20"
										className={s.input}
										disabled={IE?.status && IE?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"ОКВЭД"}
										name="okved"
										placeholder="62.09"
										className={s.input}
										disabled={IE?.status && IE?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"ОГРН"}
										name="OGRN"
										placeholder="1-02-66-05-60662-0"
										className={s.input}
										disabled={IE?.status && IE?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"Адрес"}
										name="address"
										placeholder="Железнодорожная 21А"
										className={s.input}
										disabled={IE?.status && IE?.status !== 'DECLINES'}
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
										disabled={IE?.status && IE?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"Банк"}
										name="bank"
										placeholder="12345"
										className={s.input}
										disabled={IE?.status && IE?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"БИК"}
										name="bic"
										placeholder="12345"
										className={s.input}
										disabled={IE?.status && IE?.status !== 'DECLINES'}
									/>
								</div>
								<div className={s.formRow}>
									<InputField
										label={"Корреспондентский счет"}
										name="correspondentAccount"
										placeholder="30101"
										className={s.input}
										disabled={IE?.status && IE?.status !== 'DECLINES'}
									/>
								</div>
							</div>
						</div>
						<div className={s.line}></div>
						<div className={s.btns}>
							{IE?.status ?
							<>
								<div className={classNames(s.status, s[IE.status])}>
									{{
										'PENDING': 'Данные на модерации',
										'ACCEPTED': 'Данные приняты',
										'DECLINED': 'Данные отклонены',
									}[IE.status]}
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
