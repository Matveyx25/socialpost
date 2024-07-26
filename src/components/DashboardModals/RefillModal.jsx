import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { InputField } from '../Shared/Input/Input';
import { Button } from '../Shared/Button/Button';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useRefill } from '../../hooks/useRefill';

const validator = Yup.object().shape({
 price: Yup.string()
    .required("Укажите сумму пополнения")
		.test("price", "Минимальная сумма пополнения 1,000 ₽", function (f) {
      return +f >= 1000;
    }),
});

export const RefillModal = ({isOpen, setOpen}) => {
	const {mutate: refill} = useRefill()

  return (
		<Modal {...{isOpen, setOpen}} title={'Пополнить баланс'} name={'refill-modal'}>
			<Formik
				initialValues={{
					price: '',
				}}
				validationSchema={validator}
				onSubmit={(values) => {
					refill({
						"amount": values?.price
					});
					setOpen();
				}}
			>
				{({ dirty, isValid }) => (
					<Form>
						<div className={s.form}>
							<div className={s.input}>
								<InputField
								 label={'Сумма пополнения (мин. 1,000 ₽)'}
								 required
								 id="price"
								 name="price"
								/>
							</div>
						<div className={s.rowBtns}>
							<Button label="Отправить" disabled={!dirty || !isValid} className={s.fullBtn} type="submit"/>
						</div>
					</div>
				</Form>
				)}
			</Formik>
		</Modal>
  );
};
