import { Modal } from "../Shared/Modal/Modal";
import { useEffect, useState } from "react";
import { FormikStep, FormikStepper } from "../Shared/FormikStepper/FormikStepper";
import * as Yup from "yup";
import { Field } from "formik";
import { Select } from "../Shared/Select/Select";
import { InputField } from "../Shared/Input/Input";
import s from './DashboardModals.module.scss'
import { useAddPost } from '../../hooks/useAddPost';

import { RichText } from "../Shared/RichText/RichText";
import { IconX } from "@tabler/icons-react";
import { Upload } from "../Shared/Upload/Upload";
import { useCampaignById } from "../../hooks/useCampaignById";
import { useAllChannelsTags } from '../../hooks/useAllChannelsTags';
import { RangeCalendar } from '../Shared/RangeCalendar/RangeCalendar';
import { differenceInDays } from "date-fns";
import { serialize } from "@st.matthew/remark-slate";

export const AddPostModal = ({ isOpen, setOpen, modalParams }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [type, setType] = useState();

	const onUpload = (files) => {
    setFiles(files)
  }

  const { mutate: createPost } = useAddPost();
  const { data: post } = useCampaignById(modalParams?.campaignId);
  const { data: tags } = useAllChannelsTags();

  const handleSubmit = (values) => {
		let data = null

		if(post?.type === 'FIXED_CPM'){
			const markdownContent = values.text.map((v) => serialize(v)).join('')

			console.log(values?.cpmTags);

			data = {
				name: values?.name,
				type: values?.type,
				telegramPostUrl: values?.telegramPostUrl,
				id: modalParams?.campaignId,
				cpmTags: values?.cpmTags?.map(el => el.label),
				cpmStartDate: (new Date(values?.dateRange[0])).toISOString(),
				cpmEndDate: (new Date(values?.dateRange[1])).toISOString(),
				markingType: values?.markingType,
				cpmChannelPostsLimit: values.cpmChannelPostsLimit,
				cpmBudget: values.cpmBudget,
				cpmValue: values.cpmValue,
				text: markdownContent, 
				files
			}
		}else{
			if(type === 'REPOST'){
				data = {
					name: values?.name,
					type: values?.type,
					telegramPostUrl: values?.telegramPostUrl,
					id: modalParams?.campaignId,
				}
			}else{
				const markdownContent = values.text.map(el => serialize(el)).join('')
				data = {...values, text: markdownContent, files}
			}
		}

		createPost(data);
    setOpen();
    setCurrentStep(0);
  };

	const slateValueValidator = (value) => {
		if (!value || value.document?.nodes?.isEmpty()) {
			return false;
		}
		return true;
	};

  const typeOptions = [
		{value: 'NEW_POST', label: "Новая запись",},
		{value: 'REPOST', label: 'Репост'}
  ];

  const markingOptions = [
		{value: 'NONE', label: "Не размещать",},
		{value: 'IN_TEXT', label: 'В тексте записи'},
		{value: 'IN_VIDEO', label: 'В видео'},
		{value: 'IN_PHOTO', label: 'На фотографиях'}
  ];

	const renderFilePreviews = () => {
			return files.map((file, index) => (
					<div key={index} className={s.filePreview}>
						<div className={s.button}>
							<button onClick={(e) => {
								e.preventDefault()
								setFiles(files.filter((_, i) => i!== index));
							}}>
								<IconX size={20}/>
							</button>
						</div>
						<img src={URL.createObjectURL(file)} alt={`preview-${index}`}/>
					</div>
			));
	};

  
  useEffect(() => {
		if(isOpen !== "add-post"){
			setCurrentStep(0);
			setFiles([])
		}
  }, [isOpen]);

  return (
    <Modal
      {...{ isOpen, setOpen }}
      title={`Создать запись ${currentStep + 1}/${post?.type === 'FIXED_CPM' ? 3 : 2}`}
      name={"add-post"}
    >
      <FormikStepper
				btnLabel='Создать запись'
        initialValues={{
          name: "",
          type: post?.type === 'FIXED_CPM' ? "NEW_POST" : '',
          text: "",
          telegramPostUrl: "",
          markingType: "NONE",
          id: modalParams?.campaignId,
					dateRange: [null, null],
					cpmBudget: '',
					cpmValue: '',
					cpmChannelPostsLimit: '',
					cpmTags: []
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        onCancel={setOpen}
        step={currentStep}
        setStep={setCurrentStep}
      >
        <FormikStep
          validationSchema={Yup.object().shape({
            id: Yup.string().required("Выберите РК"),
            name: Yup.string().required("Заполните поле"),
						...(post?.type === 'FIXED_CPM' ? {
							dateRange: Yup.array()
								.test(
									'is-date-range-valid',
									'Разница между датами должна быть не менее 3 дней',
									(value) => {
										if (!value || !value[0] || !value[1]) return false;
										const diffDays = differenceInDays(new Date(value[1]), new Date(value[0]));
										return diffDays >= 3;
									}
								)
								.required('Выберите диапазон дат'),
							cpmTags: Yup.array()
						} : {type: Yup.string().required("Выберите тип записи")})
					})}
        >
          <div className={s.form}>
            <div className={s.input}>
              <InputField
                label={"Название"}
                required
                placeholder={"Название"}
                id="name"
                name="name"
              />
            </div>
            {post?.type === "FIXED_CPM" ? (
							<>
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
							</>
            ) :  <div className={s.input}>
						<Field name="type">
							{({ field: { value }, form: { setFieldValue } }) => (
								<Select
									label={"Тип"}
									id="type"
									name="type"
									options={typeOptions}
									required={true}
									placeholder={"Тип записи"}
									fullWidth={true}
									value={value}
									isMulti={false}
									setSelectedOption={(v) => {
										setFieldValue("type", v.value);
										setType(v.value);
									}}
								/>
							)}
						</Field>
					</div>}
            {post?.client?.type !== "PHYSICAL_ENTITY" ? (
              <div className={s.input}>
                <Field name="markingType">
                  {({ field: { value }, form: { setFieldValue } }) => (
                    <Select
                      label={"Где разместить маркировку"}
                      id="markingType"
                      name="markingType"
                      options={markingOptions}
                      placeholder={"Маркировка"}
                      fullWidth={true}
                      isMulti={false}
                      value={value}
                      setSelectedOption={(v) => {
                        setFieldValue("markingType", v.value);
                      }}
                    />
                  )}
                </Field>
              </div>
            ) : null}
          </div>
        </FormikStep>
				{post?.type === "FIXED_CPM" ? (
					<FormikStep
            validationSchema={Yup.object().shape({
              cpmBudget: Yup.string()
							.matches(/^\d+$/, "Можно вводить только цифры")
							.required("Заполните поле"),
              cpmValue: Yup.string()
							.matches(/^\d+$/, "Можно вводить только цифры")
							.required("Заполните поле"),
              cpmChannelPostsLimit: Yup.string()
							.matches(/^\d+$/, "Можно вводить только цифры")
							.required("Заполните поле"),
            })}
          >
            <div className={s.scroller}>
              <div className={s.form}>
                <div className={s.input}>
                  <InputField
                    label={"Бюджет"}
                    required
                    placeholder={"0,00 ₽"}
                    id="cpmBudget"
                    name="cpmBudget"
                  />
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
              </div>
            </div>
          </FormikStep>
				) : null}
        {type === "REPOST" ? (
          <FormikStep
            validationSchema={Yup.object().shape({
              telegramPostUrl: Yup.string()
                .matches(
                  /^https:\/\/t\.me\/[a-zA-Z0-9]+\/\d+$/,
                  "Ссылка на пост не валидна"
                )
                .required("Заполните поле"),
            })}
          >
            <div className={s.scroller}>
              <div className={s.form}>
                <div className={s.input}>
                  <InputField
                    label={"Ссылка на пост"}
                    required
                    placeholder={"https://t.me/channel_username/post_id"}
                    id="telegramPostUrl"
                    name="telegramPostUrl"
                  />
                </div>
              </div>
            </div>
          </FormikStep>
        ) : (
          <FormikStep
            validationSchema={Yup.object().shape({
              text: Yup.mixed().test("is-empty", "Заполните поле", (value) =>
                slateValueValidator(value)
              ),
            })}
          >
            <div className={s.scroller}>
              <div className={s.form}>
                <div className={s.input}>
                  <RichText name={"text"} label={"Текст записи"} />
                </div>
                <div className={s.input}>
                  <div className={s.filePreviews}>{renderFilePreviews()}</div>
                  <Upload {...{ files, onUpload }} />
                </div>
              </div>
            </div>
          </FormikStep>
        )}
      </FormikStepper>
    </Modal>
  );
};
