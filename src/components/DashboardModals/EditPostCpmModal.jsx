import { Modal } from "../Shared/Modal/Modal";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import s from './DashboardModals.module.scss'
import { usePost } from "../../hooks/usePost";
import { Button } from "../Shared/Button/Button";
import { useUpdatePostCpm } from '../../hooks/useUpdatePostCpm';
import { RangeCalendar } from "../Shared/RangeCalendar/RangeCalendar";
import { Select } from "../Shared/Select/Select";
import { useAllChannelsTags } from "../../hooks/useAllChannelsTags";
import { InputField } from "../Shared/Input/Input";
import { differenceInDays } from "date-fns";
import { formatToISO } from "../../helpers/formatToISO";

export const EditPostCpmModal = ({ isOpen, setOpen, modalParams }) => {
  const { mutate: updatePost } = useUpdatePostCpm();
  const { data: post } = usePost(modalParams?.editCpmPostId);
	const { data: tags } = useAllChannelsTags();

  const handleSubmit = (values) => {
		updatePost({
			id: modalParams?.editCpmPostId,
			cpmTags: values?.cpmTags?.map(el => el.label),
			cpmStartDate: formatToISO(values?.dateRange[0]),
			cpmEndDate: formatToISO(values?.dateRange[0]),
			cpmChannelPostsLimit: values.cpmChannelPostsLimit,
			cpmValue: values.cpmValue,
		});
    setOpen();
  };

  return (
    <Modal
      {...{ isOpen, setOpen }}
      title={`Редактировать запись`}
      name={"edit-post-cpm-modal"}
    >
     <Formik
        initialValues={{
          id: modalParams?.editCpmPostId,
					dateRange: [new Date(post?.cpmStartDate), new Date(post?.cpmEndDate)],
					cpmTags: post?.cpmTags.map((el, index) => ({value: index, label: el})),
					cpmValue: post?.cpmValue,
					cpmChannelPostsLimit: post?.cpmChannelPostsLimit
        }}
				enableReinitialize
        onSubmit={(values) => {
          handleSubmit(values);
        }}
				validationSchema={Yup.object().shape({
					cpmValue: Yup.string()
							.matches(/^\d+$/, "Можно вводить только цифры")
							.required("Заполните поле"),
					cpmChannelPostsLimit: Yup.string()
							.matches(/^\d+$/, "Можно вводить только цифры")
							.required("Заполните поле"),
					dateRange: Yup.array()
						.test(
							'is-date-range-valid',
							'Разница между датами должна быть не менее 3 дней',
							(value) => {
								if (!value || !value[0] || !value[1]) return false;
								const diffDays = differenceInDays(new Date(value[1]), new Date(value[0]));
								return diffDays >= 3;
							}
						).required('Выберите диапазон дат'),
					cpmTags: Yup.array()
				})}
      >
				<Form>
            <div className={s.scroller}>
              <div className={s.form}>
							<div className={s.input}>
									<Field name="cpmTags">
										{({ field: { value }, form: { setFieldValue } }) => (
											<Select
												label={"Тематика канала"}
												className={s.select}
												options={tags?.map((el, index) => ({value: index, label: el}))}
												setSelectedOption={(v) => {
													setFieldValue("cpmTags", v);
												}}
												isMulti
												value={value}
												defaultValue={value}
												closeMenuOnSelect={false}
												fullWidth
												placeholder="Тематика канала"
											/>
										)}
									</Field>
								</div>
                <div className={s.input}>
									<Field name="dateRange">
										{({ field: { value }, form: { setFieldValue }, meta }) => (
											<>
											<div className={s.inputFlexHeader}>
												Период размещения
											</div>
												<RangeCalendar minDate={new Date()} inputsWrapperClassName={s.rangeWrapper} dateRange={value} setDateRange={(v) => setFieldValue('dateRange', v)}/>
												{meta.error && (<div className={s.errorMessage}>{meta.error}</div>)}
											</>
										)}
									</Field>
                </div>
								<div className={s.input}>
                  <InputField
                    label={"CPM"}
                    required
                    placeholder={"0,00 ₽"}
                    id="cpmValue"
                    name="cpmValue"
                  />
                </div>
                <div className={s.input}>
                  <InputField
                    label={"Ограничение на количество размещений в одном канале"}
                    required
                    placeholder={"120"}
                    id="cpmChannelPostsLimit"
                    name="cpmChannelPostsLimit"
                  />
                </div>
								<div className={s.rowBtns}>
									<Button label="Отменить" theme="secondary" className={s.btnHalf} type="button" onClick={() => setOpen()}/>
									<Button label={'Сохранить'} type="submit" className={s.btnHalf}/>
								</div>
              </div>
            </div>
				</Form>
      </Formik>
    </Modal>
  );
};
