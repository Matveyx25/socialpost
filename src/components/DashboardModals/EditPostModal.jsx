import { Modal } from "../Shared/Modal/Modal";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { InputField } from "../Shared/Input/Input";
import s from './DashboardModals.module.scss'
import { RichText } from "../Shared/RichText/RichText";
import { IconX } from "@tabler/icons-react";
import { Upload } from "../Shared/Upload/Upload";

import { usePost } from "../../hooks/usePost";

import {unified} from 'unified';
import markdown from 'remark-parse';
import gfm from 'remark-gfm'
import { useUpdatePost } from '../../hooks/useUpdatePost';
import { Button } from "../Shared/Button/Button";
import { serializeNodes } from "../../helpers/serializeNodes";
import { remarkToSlate } from "remark-slate-transformer";
import { visit } from "unist-util-visit";

function underlinePlugin() {
	return (tree) => {
		visit(tree, 'text', (node, index, parent) => {
			const match = node.value.match(/||/g);
			if (match && match.length === 2) {
				// Wrap the text with an underline node
				parent.children.splice(index, 1, {
					type: 'underline',
					children: [{ type: 'text', value: node.value }],
				});
			}
		});
	};
}


const processor = unified()
	.use(underlinePlugin) // Add the custom plugin here
	.use(markdown, { commonmark: true })
	.use(gfm)
	.use(remarkToSlate);

export const EditPostModal = ({ isOpen, setOpen, modalParams }) => {
  const [files, setFiles] = useState([]);

	const onUpload = (files) => {
    setFiles(files)
  }

  const { mutate: updatePost } = useUpdatePost();
  const { data: post } = usePost(modalParams?.editPostId);

  const handleSubmit = (values) => {
		let data = null
		
		const markdownContent = values.content.map(el => serializeNodes(el)).join('<br/>')
		data = {id: modalParams?.editPostId, name: values?.name, content: markdownContent, files}

		updatePost(data);
    setOpen();
  };

	const slateValueValidator = (value) => {
		if (!value || value.document?.nodes?.isEmpty()) {
			return false;
		}
		return true;
	};

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
						<img src={file?.fileUrl ? file?.fileUrl : URL?.createObjectURL(file)} alt={`preview-${index}`} style={{ width: '100px', height: 'auto' }} />
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
			{console.log(processor.processSync(post?.content).result)}
     <Formik
        initialValues={{
          name: post?.name,
          content: post?.content ? processor.processSync(post?.content).result : '',
          markingType: "NONE",
          id: modalParams?.editPostId,
        }}
				enableReinitialize
        onSubmit={(values) => {
          handleSubmit(values);
        }}
				validationSchema={Yup.object().shape({
					id: Yup.string().required("Выберите РК"),
					name: Yup.string().required("Заполните поле"),
					content: Yup.mixed().test("is-empty", "Заполните поле", (value) =>
						slateValueValidator(value)
					)
				})}
      >
				<Form>
            <div className={s.scroller}>
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
                  <RichText name={"content"} label={"Текст записи"} />
                </div>
                <div className={s.input}>
                  <div className={s.filePreviews}>{renderFilePreviews()}</div>
                  <Upload {...{ files, onUpload }} />
                </div>
								<div className={s.input}>
									<Button label={'Сохранить'} type="submit"/>
								</div>
              </div>
            </div>
				</Form>
      </Formik>
    </Modal>
  );
};
