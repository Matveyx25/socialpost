import React, { forwardRef, useCallback, useEffect, useMemo } from 'react'
import { Editable, Slate, useSlate, withReact } from 'slate-react'
import { Editor, createEditor } from 'slate'
import classNames from 'classnames'
import s from './RichText.module.scss'
import { IconBold, IconItalic, IconLink, IconStrikethrough, IconUnderline } from "@tabler/icons-react";
import isHotkey from 'is-hotkey'
import { useField } from 'formik'

export const RichText = ({name}) => {
	const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

	const [field, meta, helpers] = useField(name);
  const editor = useMemo(() => withReact(createEditor()), []);

  const { value } = field;
  const { setValue } = helpers;

  useEffect(() => {
    setValue([
      {
        type: "paragraph",
        children: [{ text: "Type something ..." }],
      },
    ]);
  }, []);
	
	return (
		<div className={s.wrapper}>
			<Slate editor={editor} value={value}
							name={name}
							onChange={(v) => setValue(v)} 
							initialValue={[{
								type: 'paragraph',
								children: [{ text: '' }],
							}]}>
					<Menu>
						<MarkButton format="strikethrough" icon={<IconStrikethrough size={16} stroke={3}/>} />
						<MarkButton format="underline" icon={<IconUnderline size={16} stroke={3}/>}/>
						<MarkButton format="italic" icon={<IconItalic size={16} stroke={3}/>}/>
						<MarkButton format="bold" icon={<IconBold size={16} stroke={3}/>} />
						<MarkButton format="link" icon={<IconLink size={16} stroke={3}/>} />
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
									toggleMark(value, mark)
								}
							}
						}}/>
			</Slate>
		</div>
	)
}


export const Menu = forwardRef(
  ({ className, ...props },ref) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={classNames(className, s.toolbar)}
    />
  )
)

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
		<button className={classNames(s.menuItem, isMarkActive(editor, format) ? s.active : '')} onClick={event => {
			event.preventDefault()
			event.stopPropagation()
			toggleMark(editor, format)
		}}>
			{icon}
		</button>
  )
}

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>
  }
 
	if (leaf.link) {
    children = <a href={children}>{children}</a>
  }

  return <span {...attributes}>{children}</span>
}


const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
}
