import classNames from "classnames"
import { useSlate } from "slate-react"
import { isMarkActive } from "../Utils/isMarkActive"
import s from '../RichText.module.scss'
import { toggleMark } from '../Utils/toggleMark';

export const MarkButton = ({ format, icon }) => {
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
