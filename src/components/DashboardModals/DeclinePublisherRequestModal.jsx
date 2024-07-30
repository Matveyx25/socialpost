import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Button } from '../Shared/Button/Button';
import { Field, Form, Formik } from "formik";
import { Textarea } from '../Shared/Textarea/Textarea';
import * as Yup from 'yup';
import { usePublisherDeclineRequest } from '../../hooks/usePublisherDeclineRequest';

 export const DeclinePublisherRequestModal = ({isOpen, setOpen, modalParams}) => {
	const {mutate: decline} = usePublisherDeclineRequest()
 
	return (
		 <Modal {...{isOpen, setOpen}} title={'Отклонить заявку'} name={'decline-publisher-request-modal'}>
			 <Formik
				 initialValues={{
					declineComment: ''
				 }}
				 onSubmit={(values) => {
					 decline({data: values?.declineComment, id: modalParams?.postId})
					 setOpen()
				 }}
				 validationSchema={Yup.object().shape({
					declineComment: Yup.string(),
					})}
			 >
				 {({ dirty, isValid}) => (
					 <Form>
						 <div className={s.form}>
							 <div className={s.input}>
								 <Field name='declineComment'>
									{({ field: { value }, form: { setFieldValue } }) =>
										<Textarea
											label={'Причина отклонения'}
											value={value}
											onChange={v => setFieldValue('declineComment', v.target.value)}
										/>}
								 </Field>
							 </div>
							 <div className={s.rowBtns}>
								 <Button label="Отменить" theme="secondary" className={s.btnHalf} type="button" onClick={() => setOpen()}/>
								 <Button label="Оклонить" className={s.btnHalf} type="submit"/>
							 </div>
						 </div>
					 </Form>
				 )}
			 </Formik>
		 </Modal>
	);
 };