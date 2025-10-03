import { Modal } from "../Shared/Modal/Modal";
import s from "./LoginModal.module.scss";
import { Input, InputField } from "../Shared/Input/Input";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../Shared/Button/Button";
import { auth } from "../../api/api";
import TelegramLoginButton from "telegram-login-button";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Select } from '../Shared/Select/Select';
import classNames from "classnames";
import { IconSquare, IconSquareCheckFilled } from "@tabler/icons-react";

export const RegisterModal = ({ isOpen, setOpen }) => {
  const [error, set_error] = useState(null);

	const roleOptions = [
		{ value: 'PUBLISHER', label: 'Паблишер' },
		{ value: 'ADVERTISER', label: 'Рекламодатель' },
	 ];

  const handleSubmit = (values) => {
    if (
      !values.password ||
      !values.email ||
      values.password !== values.secondPassword ||
      !values.name || !values.role
    ) {
      return null;
    }

    auth
      .registrationEmail({
        email: values.email,
        password: values.password,
        firstName: values.name,
        lastName: values?.lastName,
				role: values.role
      })
      .then((res) => {
        if (res.status === 200) {
					setOpen(false);
					set_error(null);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          set_error("Пароль или почта введены неверно");
        } else if (err.response.status == 400) {
          set_error("Данные невалидны");
        } else if (err.response.status == 409) {
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
    email: Yup.string()
      .email("Такого почтового адреса не существует")
      .required("Заполните поле email"),
    name: Yup.string()
      .matches(/^[a-zA-Zа-яА-Я\s]+$/, "Имя должно содержать только буквы")
      .required("Заполните поле имя"),
    lastName: Yup.string()
      .matches(/^[a-zA-Zа-яА-Я\s]+$/, "Фамилия должна содержать только буквы")
      .notRequired(),
		policy: Yup.bool().oneOf([true], 'Необходимо выбрать согласие на обработку персональных данных')
  });

  return (
    <Modal {...{ isOpen, setOpen }} title={"Регистрация"} name={"register"}>
      {error && <div className={s.error}>{error}</div>}
      <Formik
        initialValues={{
          email: "",
          password: "",
          secondPassword: "",
          name: "",
          lastName: "",
					role: "",
					news: false,
					policy: false,
        }}
        validationSchema={validator}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ dirty, isValid, setFieldTouched, setFieldValue, values }) => (
          <Form>
            <div className={s.form}>
							<Select 
								label={'Выберите роль'} 
								id="role"
								name="role"
								options={roleOptions}
								required={true}
								placeholder={'Выберите роль'}
								setSelectedOption={(selectedOption) => setFieldValue('role', selectedOption.value)}
								onBlur={() => setFieldTouched('role')}
								defaultValue={values?.role}
								fullWidth={true}
								isMulti={false}
							/>
              <InputField
                label={"Ваше имя"}
                required
                placeholder={"Иван"}
                id="name"
                name="name"
              />
              <InputField
                label={"Ваша фамилия"}
                placeholder={"Иванов"}
                id="lastName"
                name="lastName"
              />
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
							 <Field name="policy">
                {({ field: { value }, form: { setFieldValue } }) => (
									<div className={s.checkbox}>
										<input type="checkbox" name="policy" id="policy" checked={value} onChange={(e) => {
											setFieldValue('policy', e.target.checked)
											console.log(e.target.checked);
										}}/>
										<label htmlFor="policy">
											<IconSquareCheckFilled className={s.checkboxIcon} />
											<IconSquare className={s.checkboxIcon} />
											<p>
												Даю свою <NavLink to="/agreement">согласие</NavLink> на обработку персональных данных в соответствии с <NavLink to="/policy">Политикой конфиденциальности и обработки персональных данных</NavLink>
											</p>
										</label>
									</div>
								)}
							</Field>
							<div className={s.checkbox}>
								<input type="checkbox" name="news" id="news" />
								<label htmlFor="news">
									<IconSquareCheckFilled className={s.checkboxIcon} />
									<IconSquare className={s.checkboxIcon} />
									<p>Даю согласие на получение рекламной и информационной рассылки</p>
								</label>
							</div>
              <Button
                label="Зарегистрироваться"
                disabled={!dirty || !isValid || !values.role}
              />
              <p>Или</p>
              <div className={s.btns}>
                <TelegramLoginButton
                  botName={process.env.REACT_APP_TG_BOT_NAME}
                  dataOnauth={(user) => (values.role) && auth.registrationTelegram({...user, role: values?.role}).then(res => {
										if(res.status == 200){
											auth.loginTelegram(user)
										}
									})}
                  className={classNames(s.tgBtnWrapper, !values.role && s.disabled)}
                />
              </div>
              <div className={s.footer}>
                <p>
                  Уже есть аккаунт?
                  <NavLink onClick={() => setOpen("login")}>
                    {" "}
                    Войти
                  </NavLink>
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
