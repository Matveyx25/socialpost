import { Editor, Element, Path, Range, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { createParagraphNode } from "./rich-text-paragraph";

export const createLinkNode = (link, text) => ({
  type: "link",
  link,
  children: [{ text }]
});

export const insertLink = (editor, url) => {
  if (!url) return;

  const { selection } = editor;
  const link = createLinkNode(url, url);

  ReactEditor.focus(editor);

  if (!!selection) {
    const [parentNode, parentPath] = Editor.parent(
      editor,
      selection.focus?.path
    );

    // Remove the Link node if we're inserting a new link node inside of another
    // link.
    if (parentNode.type === "link") {
      removeLink(editor);
    }

    if (editor.isVoid(parentNode)) {
      // Insert the new link after the void node
      Transforms.insertNodes(editor, createParagraphNode([link]), {
        at: Path.next(parentPath),
        select: true
      });
    } else if (Range.isCollapsed(selection)) {
      // Insert the new link in our last known locatio
      Transforms.insertNodes(editor, link, { select: true });
    } else {
      // Wrap the currently selected range of text into a Link
      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: "end" });
    }
  } else {
    // Insert the new link node at the bottom of the Editor when selection
    // is falsey
    Transforms.insertNodes(editor, createParagraphNode([link]));
  }
};

export const removeLink = (editor, opts = {}) => {
  Transforms.unwrapNodes(editor, {
    ...opts,
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "link"
  });
};