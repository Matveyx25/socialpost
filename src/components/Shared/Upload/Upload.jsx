import { IconPaperclip } from "@tabler/icons-react";
import s from './Upload.module.scss'
import { useEffect, useId, useRef } from "react";
import classNames from "classnames";
import { Button } from "../Button/Button";

export const Upload = ({ 
  onUpload,
  className,
	files
}) => {
	const form = useRef(null)

	const handleFile = (newFile) => {
		if (!newFile) return;

    if (newFile.type.startsWith('image/') || newFile.type.startsWith('video/')) {
        const isFileExists = files.some(file => file.name === newFile.name && file.size === newFile.size);
        if (!isFileExists) {
            onUpload([...files, newFile]);
        } else {
            alert('Файл уже существует');
        }
    } else {
        alert('Разрешены только изображения и видео.');
    }
	};

  const handleFileChange = (event) => {
		if(event.target.files.length > 0){
			[...event.target.files].forEach((f) => {
				handleFile(f)
			})
		}
  };

	useEffect(() => {
		if(!files){
			form.current.reset()
		}
	}, [files])

  const input = useRef();

  const id = useId()

  return (
		<form ref={form}>
      <label htmlFor={id} className={classNames(s.attachmentsBtn, className)}>
        <input
          ref={input}
          type="file"
          className={s.input}
          onChange={handleFileChange}
          id={id}
					multiple
    			accept="image/*,video/*"
        />
        <Button theme="secondary" onClick={(e) => {
					e.preventDefault()
					input.current.focus();
       	 	input.current.click();
				}} leftIcon={<IconPaperclip/>} label={'Прикрепить файлы'} className={s.button}/>
      </label>
		</form>
  );
};