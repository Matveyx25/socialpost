import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Button } from '../Shared/Button/Button';
import { Field, Form, Formik } from "formik";
import { Textarea } from '../Shared/Textarea/Textarea';
import { useAddModeratePost } from '../../hooks/useAddModeratePost';
import * as Yup from 'yup';

 export const AddPostToModerationModal = ({isOpen, setOpen, modalParams}) => {
	const {mutate: moderate} = useAddModeratePost()
 
	return (
		 <Modal {...{isOpen, setOpen}} title={'Отправить на модеарцию'} name={'add-post-to-moderation'}>
			 <Formik
				 initialValues={{
					moderationComment: ''
				 }}
				 onSubmit={(values) => {
					 moderate({data: {
							moderationComment: values?.moderationComment
					 }, id: modalParams?.postId})
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
								 <Field name='moderationComment'>
									{({ field: { value }, form: { setFieldValue } }) =>
										<Textarea
											label={'Комментарий'}
											value={value}
											onChange={v => setFieldValue('moderationComment', v.target.value)}
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