import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { Editable, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import s from './RichText.module.scss'
import { IconBold, IconEyeFilled, IconInfoCircleFilled, IconItalic, IconLink, IconStrikethrough, IconUnderline } from "@tabler/icons-react";
import isHotkey from 'is-hotkey'
import { useField } from 'formik'
import { insertLink } from '../../../utils/rich-text-link'
import { withLinks } from './Plugins/withLinks';
import { Menu } from './Elements/Menu'
import { toggleMark } from './Utils/toggleMark';
import { MarkButton } from './Elements/MarkButton';
import { Leaf } from './Elements/Leaf';
import { Element } from './Elements/Element';

export const RichText = memo(({name, label, required, withInfo}) => {
	const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

	const [field, meta, helpers] = useField(name);
  const editor = useMemo(() => withReact(withLinks(createEditor())), []);

  const { value } = field;
  const { setValue } = helpers;

  useEffect(() => {
		if(!value){
			setValue([
				{
					type: "paragraph",
					children: [{ text: "" }],
				},
			]);
		}
  }, []);
	
	return (
		<div className={s.group}>
			<div className={s.header}>
				<span>{label}{required && <span className={s.star}>*</span>} </span>
				{withInfo && <IconInfoCircleFilled color='#BDBEC0' />}
			</div>
			<div className={s.wrapper}>
				<Slate 	editor={editor} 
								value={value}
								name={name}
								onChange={(v) => console.log(v) || setValue(v)} 
								initialValue={value || [{
									type: 'paragraph',
									children: [{ text: '' }],
								}]}>
						<Menu>
							<MarkButton format="strikeThrough" icon={<IconStrikethrough size={16} stroke={3}/>} />
							<MarkButton format="underline" icon={<IconUnderline size={16} stroke={3}/>}/>
							<MarkButton format="italic" icon={<IconItalic size={16} stroke={3}/>}/>
							<MarkButton format="bold" icon={<IconBold size={16} stroke={3}/>} />
							<MarkButton format="spoiler" icon={<IconEyeFilled size={16} stroke={3}/>} />
							<button className={s.menuItem} onClick={event => {
								event.preventDefault()
								const url = window.prompt('Введите URL:')
								if (url) {
									insertLink(editor, url)
								}
							}}>
								<IconLink size={16} stroke={3}/>
							</button>
						</Menu>
					<Editable
							className={s.textarea}
							renderElement={renderElement}
							renderLeaf={renderLeaf}
							placeholder="Enter some rich text…"
							spellCheck
							autoFocus
							onKeyDown={event => {
								for (const hotkey in HOTKEYS) {
									if (isHotkey(hotkey, event)) {
										event.preventDefault()
										const mark = HOTKEYS[hotkey]
										toggleMark(editor, mark)
									}
								}
							}}/>
				</Slate>
			</div>
		</div>
	)
})

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'emphasis',
  'mod+u': 'underline',
}
