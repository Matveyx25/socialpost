import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import s from './restore-password.module.scss'
import { auth } from '../../../api/api'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Button } from '../../Shared/Button/Button';
import { InputField } from '../../Shared/Input/Input';

export const RestorePassword = () => {
	const [error, set_error] = useState(false)
	const {token} = useParams()
	const navigate = useNavigate()
			
  const handleSubmit = (values) => {
    if (
      !values.password ||
      values.password !== values.secondPassword
    ) {
      return null;
    }

    auth
      .updatePassword({
        password: values.password,
				token
      })
      .then((res) => {
        if (res.status === 200) {
					navigate('/')
        }
      })
      .catch((err) => {
        if (+err.response.status === 401) {
          set_error("Пароль или почта введены неверно");
        } else if (+err.response.status === 400) {
          set_error("Данные невалидны");
        } else if (+err.response.status === 409) {
          set_error("Пользователь с такой почтой уже существует");
        }
      });
  };

  const validator = Yup.object().shape({
    password: Yup.string()
      .min(8, "Пароль должен быть не менее 8 символов")
      .matches(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
      .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
      .matches(/\d/, "Пароль должен содержать хотя бы одну цифру")
      .matches(
        /[^a-zA-Z\d]/,
        "Пароль должен содержать хотя бы один специальный символ"
      )
      .required("Введите пароль"),
    secondPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
      .required("Подтвердите пароль"),
  });

  return (
    <div className={s.wrapper}>
      {error && <div className={s.error}>{error}</div>}
      <Formik
        initialValues={{
          password: "",
          secondPassword: "",
        }}
        validationSchema={validator}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ dirty, isValid}) => (
          <Form>
            <div className={s.form}>
              <InputField
                label={"Пароль"}
                required
                type="password"
                id="password"
                name="password"
              />
              <InputField
                label={"Повторите пароль"}
                required
                type="password"
                id="secondPassword"
                name="secondPassword"
              />
              <Button
                label="Восстановить"
                disabled={!dirty || !isValid}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
