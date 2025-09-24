import { Modal } from "../Shared/Modal/Modal";
import s from './DashboardModals.module.scss'
import { usePublishersRequestById } from '../../hooks/usePublishersRequestById';
import { Calendar } from '../Shared/Calendar/Calendar';
import { Field, Form, Formik } from "formik";
import { formatToISO } from "../../helpers/formatToISO";
import { TimeInput } from '../Shared/RangeCalendar/TimeInput';
import { Button } from "../Shared/Button/Button";
import * as Yup from 'yup'
import { format } from "date-fns";
import { usePublisherAcceptRequest } from "../../hooks/usePublisherAcceptRequest";

export const RequestApproveModal = ({ isOpen, setOpen, modalParams }) => {
	const {data: request} = usePublishersRequestById(modalParams?.requestId)
	const {mutate: accept} = usePublisherAcceptRequest()

	const validator = Yup.object().shape({
		time: Yup.string().required('Обязательное поле')
		.test('max-min-time',  `Время должно быть в промежутке ${request?.publishStartTime} - ${request?.publishEndTime}`, (value) => {
      const minTime = request?.publishStartTime
			const maxTime = request?.publishEndTime

			if(value && (value > maxTime || value > minTime)){
				return false
      }

      return true
  }),
		date: Yup.string().required('Обязательное поле'),
	});

  return (
    <Modal
      {...{ isOpen, setOpen }}
      title={`Подтверждение`}
      name={"request-approve-modal"}
    >
			<div className={s.scroller}>
				<Formik
							initialValues={{
								date: new Date(request?.publishStartDate) || null,
								time: request?.publishStartTime || '12:00'
							}}
							validationSchema={validator}
							onSubmit={(values) => {
								const res = `${(new Date(values.date)).toISOString().split('T')[0]}T${values.time}.000Z`;
								accept({id: modalParams?.requestId, publishTime: res})
								setOpen()
							}}
						>
						<Form>
							<div className={s.form}>
								{request?.publishStartDate && <div className={s.subtitle}>
									Выберите дату и время публикации в диапазоне от {format(request?.publishStartDate, 'dd.MM')}, {request?.publishStartTime.split(':')[0]}:{request?.publishStartTime.split(':')[1]} до {format(request?.publishEndDate, 'dd.MM')}, {request?.publishEndTime.split(':')[0]}:{request?.publishEndTime.split(':')[1]}
								</div>}
								<div className={s.input}>
									<div className={s.inputFlexHeader}>Дата размещения</div>
									<Field name="date">
										{({ field: { value }, form: { setFieldValue } }) => (
											<Calendar
												placeholder={"11.08.2014"}
												value={value}
												onChange={(v) =>
													setFieldValue("date", formatToISO(v))
												}
												minDate={new Date(request?.publishStartDate)}
												maxDate={new Date(request?.publishEndDate)}
											/>
										)}
									</Field>
								</div>
								<div className={s.input}>
									<div className={s.inputFlexHeader}>Время размещения</div>
									<Field name="time">
										{({ field: { value }, form: { setFieldValue } }) =>
										 (
											<TimeInput 
												setTime={(v) =>{
													setFieldValue("time", v)
												}}
												inputsWrapperClassName={s.timeInput}
												time={value}
												name={'time'}
											/>
										)}
									</Field>
								</div>
								<div className={s.rowBtns}>
									<Button label="Отменить" theme="secondary" className={s.btnHalf} type="button" onClick={() => setOpen()}/>
									<Button label="Подтвердить" className={s.btnHalf} type="submit"/>
								</div>
							</div>
						</Form>
				</Formik>
			</div>
    </Modal>
  );
};
