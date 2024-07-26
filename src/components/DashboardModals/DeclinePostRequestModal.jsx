import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Button } from '../Shared/Button/Button';
import { Field, Form, Formik } from "formik";
import { Textarea } from '../Shared/Textarea/Textarea';
import * as Yup from 'yup';
import { useDeclinePostRequest } from '../../hooks/useDeclinePostRequest';

 export const DeclinePostRequestModal = ({isOpen, setOpen, modalParams}) => {
	const {mutate: decline} = useDeclinePostRequest()
 
	return (
		 <Modal {...{isOpen, setOpen}} title={'Отменить запрос'} name={'decline-post-request-modal'}>
			 <Formik
				 initialValues={{
					declineComment: ''
				 }}
				 onSubmit={(values) => {
					 decline({data: values?.declineComment, id: modalParams?.postId})
					 setOpen()
				 }}
				 validationSchema={Yup.object().shape({
					moderationComment: Yup.string(),
					})}
			 >
				 {({ dirty, isValid}) => (
					 <Form>
						 <div className={s.form}>
							 <div className={s.input}>
								 <Field name='declineComment'>
									{({ field: { value }, form: { setFieldValue } }) =>
										<Textarea
											label={'Комментарий'}
											value={value}
											onChange={v => setFieldValue('declineComment', v.target.value)}
										/>}
								 </Field>
							 </div>
							 <div className={s.rowBtns}>
								 <Button label="Отменить" theme="secondary" className={s.btnHalf} type="button" onClick={() => setOpen()}/>
								 <Button label="Отправить" className={s.btnHalf} type="submit"/>
							 </div>
						 </div>
					 </Form>
				 )}
			 </Formik>
		 </Modal>
	);
 };