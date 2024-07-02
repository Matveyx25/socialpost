import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { Button } from '../Shared/Button/Button';
import { Field, Form, Formik } from "formik";
import { Textarea } from '../Shared/Textarea/Textarea';
import { useAddModeratePost } from '../../hooks/useAddModeratePost';

 export const AddPostToModerationModal = ({isOpen, setOpen, modalParams}) => {
	const {mutate: moderate} = useAddModeratePost()
 
	return (
		 <Modal {...{isOpen, setOpen}} title={'Отправить на модеарцию'} name={'add-post-to-moderation'}>
			 <Formik
				 initialValues={{
					comment: ''
				 }}
				 onSubmit={(values) => {
					 moderate({data: {
							comment: values.comment
					 }, id: modalParams?.postId})
					 setOpen()
				 }}
			 >
				 {({ dirty, isValid}) => (
					 <Form>
						 <div className={s.form}>
							 <div className={s.input}>
								 <Field name='comment'>
								 {({ field: { value }, form: { setFieldValue } }) =>
								  <Textarea
										label={'Комментарий'}
										value={value}
										onChange={v => setFieldValue('comment', v)}
									/>}
								 </Field>
							 </div>
							 <div className={s.rowBtns}>
								 <Button label="Отменить" theme="secondary" className={s.btnHalf} type="button" onClick={() => setOpen()}/>
								 <Button label="Отправить" className={s.btnHalf} disabled={!dirty || !isValid} type="submit"/>
							 </div>
						 </div>
					 </Form>
				 )}
			 </Formik>
		 </Modal>
	);
 };