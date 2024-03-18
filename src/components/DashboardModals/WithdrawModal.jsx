import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { InputField } from '../Shared/Input/Input';
import { Button } from '../Shared/Button/Button';
import { Form, Formik } from "formik";
import * as Yup from 'yup';

const validator = Yup.object().shape({
 price: Yup.string()
    .required("Укажите сумму вывода")
    .min(1000, "Минимальная сумма вывода 1,000 ₽"),
});

export const WithdrawModal = ({isOpen, setOpen}) => {
  return (
		<Modal {...{isOpen, setOpen}} title={'Вывести средства'} name={'withdraw-modal'}>
			<Formik
				initialValues={{
					price: '',
				}}
				validationSchema={validator}
				onSubmit={(values) => {
					console.log(values); // Здесь вы може��е обработать отправку формы
					setOpen(); // Закрываем модальное окно после успешной отправки
				}}
			>
				{({ dirty, isValid }) => (
					<Form>
						<div className={s.form}>
							<div className={s.input}>
								<InputField
								 label={'Сумма вывода (мин. 1,000 ₽)'}
								 required
								 id="price"
								 name="price"
								/>
							</div>
						<div className={s.rowBtns}>
							<Button label="Вывести" disabled={!dirty || !isValid} className={s.fullBtn} type="submit"/>
						</div>
					</div>
				</Form>
				)}
			</Formik>
		</Modal>
  );
};
