import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Button } from '../Shared/Button/Button';
import { Form, Formik, Field } from "formik";
import * as Yup from 'yup';
import { usePublisherDeclineRequest } from "../../hooks/usePublisherDeclineRequest";
import { Textarea } from '../Shared/Textarea/Textarea';

const validator = Yup.object().shape({
 desc: Yup.string(),
});

export const RemoveReportModal = ({isOpen, setOpen, modalParams}) => {
	const {mutate: remove} = usePublisherDeclineRequest()

  return (
		<Modal {...{isOpen, setOpen}} title={'Отклонить заявку'} name={'remove-report'}>
			<Formik
				initialValues={{
					desc: '',
				}}
				validationSchema={validator}
				onSubmit={(values) => {
					remove({
						id: modalParams.requestId,
						data: values?.desc
					})
					setOpen(); 
				}}
			>
				{({ dirty, isValid }) => (
					<Form>
						<div className={s.form}>
							<div className={s.input}>
									<Field name='desc'>
										{({ field: { value }, form: { setFieldValue } }) =>
											<Textarea
												label={'Комментарий'}
												value={value}
												onChange={v => setFieldValue('desc', v.target.value)}
											/>}
								 </Field>
							</div>
							<div className={s.rowBtns}>
								<Button label="Отменить" theme="secondary" className={s.btnHalf} type="button" onClick={() => setOpen()}/>
								<Button label="Отклонить" className={s.btnHalf} type="submit"/>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
  );
};
