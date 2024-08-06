export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.strong) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.emphasis) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikeThrough) {
    children = <s>{children}</s>
  }

  return <span {...attributes}>{children}</span>
}
