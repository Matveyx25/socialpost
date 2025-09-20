import React from "react";
import s from "./requisites.module.scss";
import { DashboardCard } from "../dashboard-card";
import { InputField } from "../../../Shared/Input/Input";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "../../../Shared/Button/Button";
import { Calendar } from "../../../Shared/Calendar/Calendar";
import {
  useSelfEmployed,
  useUpdateSelfEmployed,
} from "../../../../hooks/publisherBalance";
import classNames from "classnames";
import { formatToISO } from "../../../../helpers/formatToISO";

export const SelfEmployed = () => {
  const nameRegExp = /^([\S]+)\s([\S]+)\s([\S]+)?$/;

  const { data: selfEmployed } = useSelfEmployed();
  const { mutate: updateSelfEmployed } = useUpdateSelfEmployed();

  const validator = Yup.object().shape({
    fullName: Yup.string()
      .matches(nameRegExp, "Введите ФИО верно")
      .required("Введите ФИО"),
    seriesPassport: Yup.string()
      .matches(/^\d+$/, "Серия паспорта должен содержать только цифры")
      .required("Введите серию паспорта"),
    numberPassport: Yup.string()
      .matches(/^\d+$/, "Номер паспорта должен содержать только цифры")
      .required("Введите номер паспорта"),
    city: Yup.string().required("Введите город рождения"),
    address: Yup.string().required("Введите адрес"),
    snils: Yup.string()
      .matches(/^\d+$/, "СНИЛС должен содержать только цифры")
      .required("Введите СНИЛС"),
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
        fullName: selfEmployed?.fullName,
        seriesPassport: selfEmployed?.passportSeries,
        numberPassport: selfEmployed?.passportNumber,
        birthDate: selfEmployed?.birthDate,
        city: selfEmployed?.birthCity,
        address: selfEmployed?.address,
        snils: selfEmployed?.snils,
        inn: selfEmployed?.inn,
        vatRate: selfEmployed?.vatRate,
        passportIssueDate: selfEmployed?.passportIssueDate,
        accountNumber: selfEmployed?.bankDetails?.checkingAccount,
        bank: selfEmployed?.bankDetails?.bank,
        bic: selfEmployed?.bankDetails?.bik,
        correspondentAccount: selfEmployed?.bankDetails?.correspondentAccount,
      }}
      validationSchema={validator}
      onSubmit={(values) => {
        updateSelfEmployed({
          passportIssueDate: values?.passportIssueDate,
          fullName: values?.fullName,
          passportSeries: values?.seriesPassport,
          passportNumber: values?.numberPassport,
          birthCity: values?.city,
          birthDate: values?.birthDate,
          address: values?.address,
          snils: values?.snils,
          inn: values?.inn,
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
                    disabled={
                      selfEmployed?.status &&
                      selfEmployed?.status !== "DECLINES"
                    }
                  />
                </div>
                <div className={s.formRow}>
                  <InputField
                    label={"Серия паспорта"}
                    name="seriesPassport"
                    placeholder="12345"
                    className={s.input}
										disabled={
											selfEmployed?.status &&
											selfEmployed?.status !== "DECLINES"
										}
                  />
                  <InputField
                    label={"Номер паспорта"}
                    name="numberPassport"
                    placeholder="12345"
                    className={s.input}
										disabled={
											selfEmployed?.status &&
											selfEmployed?.status !== "DECLINES"
										}
                  />
                  <Field name="passportIssueDate">
                    {({ field: { value }, form: { setFieldValue } }) => (
                      <Calendar
                        placeholder={"11.08.2014"}
                        label={"Выдан"}
                        className={s.calendar}
                        value={value}
                        onChange={(v) =>
                          setFieldValue("passportIssueDate", formatToISO(v))
                        }
                        disabled={
                          selfEmployed?.status &&
                          selfEmployed?.status !== "DECLINES"
                        }
                      />
                    )}
                  </Field>
                </div>
                <div className={s.formRow}>
                  <Field name="birthDate">
                    {({ field: { value }, form: { setFieldValue } }) => (
                      <Calendar
                        placeholder={"11.08.1998"}
                        label={"Дата рождения"}
                        className={s.calendar}
                        value={value}
                        onChange={(v) =>
                          setFieldValue("birthDate", formatToISO(v))
                        }
                        disabled={
                          selfEmployed?.status &&
                          selfEmployed?.status !== "DECLINES"
                        }
                      />
                    )}
                  </Field>
                </div>
                <div className={s.formRow}>
                  <InputField
                    label={"Город рождения"}
                    name="city"
                    placeholder="Минск"
                    className={s.input}
                    disabled={
                      selfEmployed?.status &&
                      selfEmployed?.status !== "DECLINES"
                    }
                  />
                  <InputField
                    label={"Адрес"}
                    name="address"
                    placeholder="Железнодорожная 21А"
                    className={s.input}
                    disabled={
                      selfEmployed?.status &&
                      selfEmployed?.status !== "DECLINES"
                    }
                  />
                </div>
                <div className={s.formRow}>
                  <InputField
                    label={"СНИЛС"}
                    name="snils"
                    placeholder="12345"
                    className={s.input}
                    disabled={
                      selfEmployed?.status &&
                      selfEmployed?.status !== "DECLINES"
                    }
                  />
                  <InputField
                    label={"ИНН"}
                    name="inn"
                    placeholder="12345"
                    className={s.input}
                    disabled={
                      selfEmployed?.status &&
                      selfEmployed?.status !== "DECLINES"
                    }
                  />
                </div>
								<div className={s.formRow}>
									<InputField
										label={"НДС"}
										name="vatRate"
										placeholder="20"
										className={s.input}
										disabled={selfEmployed?.status && selfEmployed?.status !== 'DECLINES'}
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
                    disabled={
                      selfEmployed?.status &&
                      selfEmployed?.status !== "DECLINES"
                    }
                  />
                </div>
                <div className={s.formRow}>
                  <InputField
                    label={"Банк"}
                    name="bank"
                    placeholder="12345"
                    className={s.input}
                    disabled={
                      selfEmployed?.status &&
                      selfEmployed?.status !== "DECLINES"
                    }
                  />
                </div>
                <div className={s.formRow}>
                  <InputField
                    label={"БИК"}
                    name="bic"
                    placeholder="12345"
                    className={s.input}
                    disabled={
                      selfEmployed?.status &&
                      selfEmployed?.status !== "DECLINES"
                    }
                  />
                </div>
                <div className={s.formRow}>
                  <InputField
                    label={"Корреспондентский счет"}
                    name="correspondentAccount"
                    placeholder="30101"
                    className={s.input}
                    disabled={
                      selfEmployed?.status &&
                      selfEmployed?.status !== "DECLINES"
                    }
                  />
                </div>
              </div>
            </div>
            <div className={s.line}></div>
            <div className={s.btns}>
              <div className={s.btns}>
                {selfEmployed?.status ? (
                  <>
                    <div
                      className={classNames(s.status, s[selfEmployed.status])}
                    >
                      {
                        {
													'PENDING': 'Данные на модерации',
													'ACCEPTED': 'Данные приняты',
													'DECLINED': 'Данные отклонены',
                        }[selfEmployed.status]
                      }
                    </div>
                  </>
                ) : (
                  <Button
                    label={(!dirty || !isValid) ? 'Данные пустые' : "Сохранить данные"}
                    theme="secondary"
                    className={s.btn}
                    disabled={!dirty || !isValid}
                  />
                )}
              </div>
            </div>
          </DashboardCard>
        </Form>
      )}
    </Formik>
  );
};
