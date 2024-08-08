import { Spoiler } from 'react-spoiler-tag'
import 'react-spoiler-tag/dist/index.css'

export const Leaf = ({ attributes, children, leaf }) => {
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
  
	if (leaf.spoiler) {
    children = <Spoiler>{children}</Spoiler>
  }

  if (leaf.strikeThrough) {
    children = <s>{children}</s>
  }

  return <span {...attributes}>{children}</span>
}
