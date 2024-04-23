import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { InputField } from '../Shared/Input/Input';
import { Button } from '../Shared/Button/Button';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useUpdateChannel } from '../../hooks/useUpdateChannel';
import { useChannelById } from '../../hooks/useChannleById';
import { Loader } from "../Shared/Loader/Loader";
import { useEffect } from "react";
import { Checkbox } from '../Shared/Checkbox/checkbox';


const validator = Yup.object().shape({
	nativePostPrice: Yup.string().matches(/^\d+$/, "Можно вводить только цифры"),
	post1For48Price: Yup.string().matches(/^\d+$/, "Можно вводить только цифры"),
	post1For24Price: Yup.string().matches(/^\d+$/, "Можно вводить только цифры"),
	post2For48Price: Yup.string().matches(/^\d+$/, "Можно вводить только цифры"),
 })

 export const EditChannelModal = ({isOpen, setOpen, modalParams}) => {
	const {mutate: updateChannel} = useUpdateChannel()
	const {data: channel, isFetching, refetch} = useChannelById(modalParams)

	useEffect(() => {
		if(isOpen && modalParams){
			refetch()
		}
	}, [isOpen])
 
	return (
		 <Modal {...{isOpen, setOpen}} title={'Редактирование'} name={'edit-channel'}>
			 {!isFetching ? <Formik
				 initialValues={{
					nativePostPrice: typeof channel?.nativePostPrice === 'number' ? channel?.nativePostPrice : '',
					post1For48Price: typeof channel?.post1For48Price === 'number' ? channel?.post1For48Price : '',
					post1For24Price: typeof channel?.post1For24Price === 'number' ? channel?.post1For24Price : '',
					post2For48Price: typeof channel?.post2For48Price === 'number' ? channel?.post2For48Price : '',
					nativePostPriceEnabled: channel?.nativePostPriceEnabled,
					post1For24PriceEnabled: channel?.post1For24PriceEnabled,
					post1For48PriceEnabled: channel?.post1For48PriceEnabled,
					post2For48PriceEnabled: channel?.post2For48PriceEnabled,
				 }}
				 validationSchema={validator}
				 onSubmit={(values) => {
					 updateChannel({data: {
							"nativePostPrice": values.nativePostPrice,
							"post1For48Price": values.post1For48Price,
							"post1For24Price": values.post1For24Price,
							"post2For48Price": values.post2For48Price,
							nativePostPriceEnabled: values?.nativePostPriceEnabled,
							post1For24PriceEnabled: values?.post1For24PriceEnabled,
							post1For48PriceEnabled: values?.post1For48PriceEnabled,
							post2For48PriceEnabled: values?.post2For48PriceEnabled,
							"nativePostPriceType": "NUMERIC",
					 }, id: modalParams})
					 setOpen()
				 }}
			 >
				 {({ dirty, isValid, values, touched  }) => (
					 <Form>
						 <div className={s.form}>
							 <div className={s.input}>
								 <InputField
									label={
										<div className={s.inputFlexHeader}>
											Нативное размещение
											<Checkbox name={'nativePostPriceEnabled'} label={'Показывать'}/>
										</div>
									}
									id="nativePostPrice"
									name="nativePostPrice"
								 />
							 </div>
							 <div className={s.input}>
								 <InputField
									label={
										<div className={s.inputFlexHeader}>
											Размещение 1/48	
											<Checkbox name={'post1For48PriceEnabled'} label={'Показывать'}/>
										</div>
									}
									id="post1For48Price"
									name="post1For48Price"
								 />
							 </div>
							 <div className={s.input}>
								 <InputField
									label={
										<div className={s.inputFlexHeader}>
											Размещение 1/24	
											<Checkbox name={'post1For24PriceEnabled'} label={'Показывать'}/>
										</div>
									}
									id="post1For24Price"
									name="post1For24Price"
								 />
							 </div>
							 <div className={s.input}>
								 <InputField
									label={
										<div className={s.inputFlexHeader}>
											Размещение 2/48	
											<Checkbox name={'post2For48PriceEnabled'} label={'Показывать'}/>
										</div>
									}
									id="post2For48Price"
									name="post2For48Price"
								 />
							 </div>
							 {(touched?.nativePostPrice || touched?.post1For48Price || touched?.post1For24Price || touched?.post2For48Price)  && !(values?.nativePostPrice || values?.post1For48Price || values?.post1For24Price || values?.post2For48Price) && (
                  <div className={s.errorMessage}>Заполните хотя бы одно поле</div>
                )}
							 <div className={s.rowBtns}>
								 <Button label="Отменить" theme="secondary" className={s.btnHalf} type="button" onClick={() => setOpen()}/>
								 <Button label="Применить" className={s.btnHalf} disabled={!dirty || !isValid} type="submit"/>
							 </div>
						 </div>
					 </Form>
				 )}
			 </Formik> : <Loader/>}
		 </Modal>
	);
 };