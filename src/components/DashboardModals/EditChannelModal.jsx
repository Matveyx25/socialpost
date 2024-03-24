import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { InputField } from '../Shared/Input/Input';
import { Button } from '../Shared/Button/Button';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useUpdateChannel } from '../../hooks/useUpdateChannel';
import { useChannelById } from '../../hooks/useChannleById';

// http://5.35.95.209/api/channels?_end=10&_order=ASC&_sort=id&_start=0

const numberRegax = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/

const validator = Yup.object().shape({
	nativePostPrice: Yup.string().matches(numberRegax, "Можно вводить только цифры").required("Заполните поле"),
	post1For48Price: Yup.string().matches(numberRegax, "Можно вводить только цифры").required("Заполните поле"),
	post1For24Price: Yup.string().matches(numberRegax, "Можно вводить только цифры").required("Заполните поле"),
	post2For48Price: Yup.string().matches(numberRegax, "Можно вводить только цифры").required("Заполните поле"),
 });

 export const EditChannelModal = ({isOpen, setOpen, modalParams}) => {
	const {mutate: updateChannel} = useUpdateChannel()
	const {data: channel} = useChannelById(modalParams)
 
	return (
		 <Modal {...{isOpen, setOpen}} title={'Редактирование'} name={'edit-channel'}>
			 <Formik
				 initialValues={{
					 nativePostPrice: channel?.nativePostPrice || 0,
					 post1For48Price: channel?.post1For48Price || 0,
					 post1For24Price: channel?.post1For24Price || 0,
					 post2For48Price: channel?.post2For48Price || 0,
				 }}
				 validationSchema={validator}
				 onSubmit={(values) => {
					 updateChannel({data: {
						 "nativePostPrice": values.nativePostPrice,
						 "post1For48Price": values.post1For48Price,
						 "post1For24Price": values.post1For24Price,
						 "post2For48Price": values.post2For48Price
					 }, id: modalParams})
					 setOpen()
				 }}
			 >
				 {({ dirty, isValid }) => (
					 <Form>
						 <div className={s.form}>
							 <div className={s.input}>
								 <InputField
									label={'Нативное размещение'}
									required
									id="nativePostPrice"
									name="nativePostPrice"
								 />
							 </div>
							 <div className={s.input}>
								 <InputField
									label={'Размещение 1/48'}
									required
									id="post1For48Price"
									name="post1For48Price"
								 />
							 </div>
							 <div className={s.input}>
								 <InputField
									label={'Размещение 1/24'}
									required
									id="post1For24Price"
									name="post1For24Price"
								 />
							 </div>
							 <div className={s.input}>
								 <InputField
									label={'Размещение 2/48'}
									required
									id="post2For48Price"
									name="post2For48Price"
								 />
							 </div>
							 <div className={s.rowBtns}>
								 <Button label="Отменить" theme="secondary" className={s.btnHalf} type="button" onClick={() => setOpen()}/>
								 <Button label="Применить" className={s.btnHalf} disabled={!dirty || !isValid} type="submit"/>
							 </div>
						 </div>
					 </Form>
				 )}
			 </Formik>
		 </Modal>
	);
 };