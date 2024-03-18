import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { InputField } from '../Shared/Input/Input';
import { Button } from '../Shared/Button/Button';
import { Form, Formik } from "formik";
import * as Yup from 'yup';

const validator = Yup.object().shape({
 desc: Yup.string().required("Укажите причину отклонения"),
});

export const RemoveReportModal = ({isOpen, setOpen}) => {
  return (
		<Modal {...{isOpen, setOpen}} title={'Отклонить заявку'} name={'remove-report'}>
			<Formik
				initialValues={{
					desc: '',
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
									label={'Причина отклонения'}
									required
									placeholder={'Причина удаления'}
									id="desc"
									name="desc"
								/>
							</div>
							<div className={s.rowBtns}>
								<Button label="Отменить" theme="secondary" className={s.btnHalf} type="button" onClick={() => setOpen()}/>
								<Button label="Отклонить" className={s.btnHalf} disabled={!dirty || !isValid} type="submit"/>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
  );
};
