import { IconExternalLink, IconUnlink } from "@tabler/icons-react";
import { useFocused, useSelected, useSlateStatic } from "slate-react";
import { removeLink } from "../../../../utils/rich-text-link";
import s from '../RichText.module.scss'

export const Link = ({ attributes, element, children }) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div className={s['element-link']}>
      <a {...attributes} href={element.link}>
        {children}
      </a>
      {selected && focused && (
        <div className={s.popup} contentEditable={false}>
          <a href={element.link} rel="noreferrer" target="_blank">
            <IconExternalLink/>
            <span>{element.link}</span>
          </a>
          <button onClick={() => removeLink(editor)}>
            <IconUnlink/>
          </button>
        </div>
      )}
    </div>
  );
};