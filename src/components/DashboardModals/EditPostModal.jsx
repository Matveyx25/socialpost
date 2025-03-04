import { Modal } from "../Shared/Modal/Modal";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import s from './DashboardModals.module.scss'
import { RichText } from "../Shared/RichText/RichText";
import { IconX } from "@tabler/icons-react";
import { Upload } from "../Shared/Upload/Upload";

import { usePost } from "../../hooks/usePost";

import { useUpdatePostContent } from '../../hooks/useUpdatePostContent';
import { Button } from "../Shared/Button/Button";
import { serialize } from '@st.matthew/remark-slate';
import { Node } from "slate";
import { Select } from "../Shared/Select/Select";
import { kktuOptions } from "../../options/kktu";


export const EditPostModal = ({ isOpen, setOpen, modalParams }) => {
  const [files, setFiles] = useState([]);

	const onUpload = (files) => {
    setFiles(files)
  }

  const { mutate: updatePost } = useUpdatePostContent();
  const { data: post } = usePost(modalParams?.editPostId);

  const handleSubmit = (values) => {
		let data = null
		
		const markdownContent = values.text.map(el => serialize(el)).join('')
		data = {id: modalParams?.editPostId, text: markdownContent, content: values.text, files, kktu: values.kktu, markingType: values.markingType}

		updatePost(data);
    setOpen();
  };

	function slateValueValidator(content) {
		let plainText

		if(content?.length){
			plainText = content?.map(n => Node?.isNode(n) ? Node?.string(n) : '').join('\n')
		}
		
		return !!plainText?.trim();
	}

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
						<img src={file?.fileUrl ? file?.fileUrl : URL?.createObjectURL(file)} alt={`preview-${index}`}/>
					</div>
			));
	};

	useEffect(() => {
		if(post?.uploads){
			setFiles(post.uploads)
		}
	}, [post])

  return (
    <Modal
      {...{ isOpen, setOpen }}
      title={`Редактировать запись`}
      name={"edit-post-modal"}
    >
     <Formik
        initialValues={{
          text: post?.content ? post?.content : '',
          markingType: post?.markingType ? post.markingType : '',
          id: modalParams?.editPostId,
					kktu: post?.kktu ? post.kktu : ''
        }}
				enableReinitialize
        onSubmit={(values) => {
          handleSubmit(values);
        }}
				validationSchema={Yup.object().shape({
					kktu: Yup.string().required("Заполните поле"),
					id: Yup.string().required("Выберите РК"),
					text: Yup.mixed().test("is-empty", "Заполните поле", (value) =>
						slateValueValidator(value)
					)
				})}
      >
				<Form>
            <div className={s.scroller}>
              <div className={s.form}>
                <div className={s.input}>
									<Field name="kktu">
											{({ field: { value }, form: { setFieldValue } }) => (
												<Select
													label={"ККТУ"}
													id="kktu"
													name="kktu"
													options={kktuOptions}
													placeholder={"ККТУ"}
													fullWidth
													isMulti={false}
													value={value}
													isSearchable
													required
													setSelectedOption={(v) => {
														setFieldValue("kktu", v.value);
													}}
												/>
											)}
										</Field>
								</div>
                <div className={s.input}>
                  <RichText name={"text"} label={"Текст записи"} />
                </div>
                <div className={s.input}>
                  <div className={s.filePreviews}>{renderFilePreviews()}</div>
                  <Upload {...{ files, onUpload }} />
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
