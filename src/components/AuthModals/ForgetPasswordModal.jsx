import { Modal } from "../Shared/Modal/Modal";
import s from './LoginModal.module.scss'
import { Input, InputField } from '../Shared/Input/Input';
import { useState } from "react";
import { Button } from '../Shared/Button/Button';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { auth } from '../../api/api';

export const ForgetPasswordModal = ({isOpen, setOpen}) => {
	const validator = Yup.object().shape({
		email: Yup.string().email('Некорректный email').required('Обязательное поле'),
	});

	const handleSubmit = (values) => {
		auth.restorePassword({email: values.email}).then(res => {
			if(res.status == 200){
				setOpen()
			}
		})
	}

  return (
		<Modal {...{isOpen, setOpen}} title={'Восстановление пароля'} name={'forget'}>
			<Formik
        initialValues={{
          email: "",
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
							<Button label="Восстановить" disabled={!dirty || !isValid}/>
            </div>
          </Form>
        )}
      </Formik>
		</Modal>
  );
};
