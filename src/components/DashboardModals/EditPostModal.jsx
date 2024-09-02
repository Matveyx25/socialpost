import { Modal } from "../Shared/Modal/Modal";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import s from './DashboardModals.module.scss'
import { RichText } from "../Shared/RichText/RichText";
import { IconX } from "@tabler/icons-react";
import { Upload } from "../Shared/Upload/Upload";

import { usePost } from "../../hooks/usePost";

import {unified} from 'unified';
import markdown from 'remark-parse';
import { useUpdatePostContent } from '../../hooks/useUpdatePostContent';
import { Button } from "../Shared/Button/Button";
import slate, { serialize } from '@st.matthew/remark-slate';
import deserialize from '../../helpers/deserialize'
import { Node } from "slate";

const processor = unified().use(markdown).use(deserialize).use(slate)

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
		data = {id: modalParams?.editPostId, text: markdownContent, files}

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
          text: post?.text ? processor.processSync(post?.text).result : '',
          markingType: "NONE",
          id: modalParams?.editPostId,
        }}
				enableReinitialize
        onSubmit={(values) => {
          handleSubmit(values);
        }}
				validationSchema={Yup.object().shape({
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
