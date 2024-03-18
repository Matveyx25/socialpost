import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Input, InputField } from '../Shared/Input/Input';
import { useState } from "react";
import { Button } from '../Shared/Button/Button';
import { profile } from "../../api/api";
import { Form, Formik } from "formik";
import * as Yup from 'yup'

export const EmailModal = ({isOpen, setOpen}) => {
	const [error, set_error] = useState(null)

	const handleSubmit = (values) => {
		profile.connectEmail({
			"email": values.email,
			"password": values.password
		}).then((res) => {
			if (res.status === 200) {
				setOpen(false);
				set_error(null);
			}
		}).catch((err) => {
			if (err.response.status == 401) {
				set_error("Пароль или почта введены неверно");
			} else if (err.response.status == 400) {
				set_error("Данные невалидны");
			}
		});
	}

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
    email: Yup.string()
      .email("Такого почтового адреса не существует")
      .required("Заполните поле email")
  });
	
  return (
		<Modal {...{isOpen, setOpen}} title={'Email'} name={'connect-email'}>
			{error && <div className={s.error}>{error}</div>}
			<Formik
        initialValues={{
          email: "",
          password: "",
					secondPassword: ''
        }}
        validationSchema={validator}
				onSubmit={(values) => {
					handleSubmit(values)
				}}
      >
        {({ dirty, isValid }) => (
          <Form>
            <div className={s.form}>
						<InputField
                label={"Электронная почта"}
                required
                placeholder={"email@example.com"}
                id="email"
                name="email"
              />
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
                label="Подключить"
                disabled={!dirty || !isValid}
              />
            </div>
          </Form>
        )}
      </Formik>
		</Modal>
  );
};
