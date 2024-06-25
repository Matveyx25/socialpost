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
import { Node, Text } from "slate";


export const AddPostModal = ({ isOpen, setOpen, modalParams }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState([]);

	const onUpload = (files) => {
    setFiles(files)
  }

	const serializeNodes = node => {
		if (Text.isText(node)) {
			let string = Node.string(node)
			if(!string){
				return string
			}
			if (node.bold) {
				string = `**${string}**`
			}
			if (node.italic){
				string = `*${string}*`
			}
			if(node.underline){
				string = `<ins>${string}</ins>`
			}
			if(node.strikethrough){
				string = `~~${string}~~`
			}
			return string
		}
	
		const children = node.children?.map(n => serializeNodes(n)).join('')
	
		switch (node.type) {
			case 'link':
				const url = node.href;
				return `[${children}](${url})`;
			default:
				return children
		}
	}

  const { mutate: createPost } = useAddPost();

  const handleSubmit = (values) => {
		const markdownContent = values.content.map(el => serializeNodes(el)).join('<br/>')
		createPost({...values, content: markdownContent, files});
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
						<img src={URL.createObjectURL(file)} alt={`preview-${index}`} style={{ width: '100px', height: 'auto' }} />
					</div>
			));
	};

  useEffect(() => {
    return () => {
      setCurrentStep(0);
    };
  }, []);

  return (
    <Modal
      {...{ isOpen, setOpen }}
      title={ `Создать запись ${currentStep + 1}/2` }
      name={"add-post"}
    >
      <FormikStepper
        initialValues={{
					name: "",
					type: "",
					content: '',
					// telegramPostUrl: "",
					id: modalParams
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        onCancel={setOpen}
        step={currentStep}
        setStep={setCurrentStep}
      >
				<FormikStep validationSchema={Yup.object().shape({
					id: Yup.string().required("Выберите РК"),
					type: Yup.string().required("Выберите тип клиента"),
					name: Yup.string().required("Заполните поле"),
				})}>
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
							<div className={s.input}>
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
											setSelectedOption={(v) => setFieldValue("type", v.value)}
										/>
									)}
								</Field>
							</div>
						</div>
				</FormikStep>
				<FormikStep validationSchema={Yup.object().shape({
					content: Yup.mixed().test(
						'is-empty',
						'Заполните поле',
						value => slateValueValidator(value)
					),
				})}>
						<div className={s.scroller}>
							<div className={s.form}>
								<div className={s.input}>
								<RichText name={'content'} label={'Текст записи'}/>
								</div>
								<div className={s.input}>
										<div className={s.filePreviews}>{renderFilePreviews()}</div>
										<Upload {...{files, onUpload}}/>
								</div>
							</div>
						</div>
				</FormikStep>
      </FormikStepper>
    </Modal>
  );
};
