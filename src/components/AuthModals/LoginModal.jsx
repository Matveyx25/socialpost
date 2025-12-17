import { Modal } from "../Shared/Modal/Modal";
import s from "./LoginModal.module.scss";
import { InputField } from "../Shared/Input/Input";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconSquare, IconSquareCheckFilled } from "@tabler/icons-react";
import { Button } from "../Shared/Button/Button";
import { auth } from "../../api/api";
import TelegramLoginButton from "telegram-login-button";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export const LoginModal = ({ isOpen, setOpen }) => {
  const [error, set_error] = useState(null);

  const validator = Yup.object().shape({
		password: Yup.string()
			.min(8, "Пароль должен быть не менее 8 символов")
			.matches(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
			.matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
			.matches(/\d/, "Пароль должен содержать хотя бы одну цифру")
			.matches(/[^a-zA-Z\d]/, "Пароль должен содержать хотя бы один специальный символ")
			.required("Введите пароль"),
    email: Yup.string()
      .email("Такого почтового адреса не существует")
      .required("Заполните поле email"),
  });

  const handleSubmit = (values) => {
    if (!values.password || !values.email) {
      return null;
    }

    auth
      .loginEmail({
        email: values.email,
        password: values.password,
      })
      .catch((err) => {
        if (+err?.response?.status === 401) {
          set_error("Пароль или почта введены неверно");
        } else if (+err?.response?.status === 400) {
          set_error("Данные невалидны");
        }
      });
  };

  return (
    <Modal {...{ isOpen, setOpen }} title={"Вход"} name={"login"}>
      {error && <div className={s.error}>{error}</div>}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validator}
				onSubmit={(values) => {
					handleSubmit(values)
				}}
      >
        {({ dirty, isValid }) => (
          <Form>
            <div className={s.form}>
              <div className={s.input}>
                <InputField
                  label={"Электронная почта"}
                  required
                  placeholder={"email@example.com"}
                  id="email"
                  name="email"
                />
							</div>
							<div className={s.input}>
								<InputField
									label={"Пароль"}
									required
									type="password"
									id="password"
									name="password"
								/>
							</div>
							<div className={s.rememberMe}>
								<div className={s.checkbox}>
									<input type="checkbox" name="rememberMe" id="rememberMe" />
									<label htmlFor="rememberMe">
										<IconSquareCheckFilled className={s.checkboxIcon} />
										<IconSquare className={s.checkboxIcon} />
										Запомнить меня
									</label>
								</div>
								<NavLink onClick={() => setOpen("forget")}>
									Забыли пароль?
								</NavLink>
							</div>
              <Button
                label="Войти"
                disabled={!dirty || !isValid}
              />
              <p>Или</p>
              <div className={s.btns}>
                <TelegramLoginButton
                  botName={process.env.REACT_APP_TG_BOT_NAME}
                  dataOnauth={(user) => auth.loginTelegram(user)}
                  className={s.tgBtnWrapper}
                />
              </div>
              {/* <div className={s.footer}>
                <p>
                  Ещё нет аккаунта?
                  <NavLink onClick={() => setOpen("register")}>
                    {" "}
                    Зарегистрироваться
                  </NavLink>
                </p>
              </div> */}
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
