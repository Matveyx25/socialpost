import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { InputField } from '../Shared/Input/Input';
import { Button } from '../Shared/Button/Button';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useWithdrawal } from "../../hooks/publisherBalance";

const validator = Yup.object().shape({
 price: Yup.string()
    .required("Укажите сумму вывода")
		.test("price", "Минимальная сумма вывода 1,000 ₽", function (f) {
      return +f >= 1000;
    }),
});

export const WithdrawModal = ({isOpen, setOpen}) => {
	const {mutate: withdraw} = useWithdrawal()

  return (
		<Modal {...{isOpen, setOpen}} title={'Вывести средства'} name={'withdraw-modal'}>
			<Formik
				initialValues={{
					price: '',
				}}
				validationSchema={validator}
				onSubmit={(values) => {
					withdraw({
						"type": "SELF_EMPLOYED",
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
