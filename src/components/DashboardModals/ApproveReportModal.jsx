import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { InputField } from '../Shared/Input/Input';
import { Button } from '../Shared/Button/Button';
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from 'yup';

const validator = Yup.object().shape({
	time: Yup.string()
		 .required("Время поста обязательно")
		 .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Время должно быть в формате HH:MM"),
 });
 export const ApproveReportModal = ({isOpen, setOpen}) => {
	return (
		 <Modal {...{isOpen, setOpen}} title={'Принять заявку'} name={'approve-report'}>
			 <Formik
				 initialValues={{
					 time: ''
				 }}
				 validationSchema={validator}
				 onSubmit={(values) => {
					 console.log(values); // Здесь вы можете обработать отправку формы
					 setOpen(); // Закрываем модальное окно после успешной отправки
				 }}
			 >
				 {({ dirty, isValid }) => (
					 <Form>
						 <div className={s.form}>
							 <div className={s.input}>
								 <InputField
									label={'Время поста'}
									required
									placeholder={'12:30'}
									id="time"
									name="time"
								 />
							 </div>
							 <div className={s.rowBtns}>
								 <Button label="Отменить" theme="secondary" className={s.btnHalf} onClick={() => setOpen()}/>
								 <Button label="Принять" className={s.btnHalf} disabled={!dirty || !isValid} type="submit"/>
							 </div>
						 </div>
					 </Form>
				 )}
			 </Formik>
		 </Modal>
	);
 };