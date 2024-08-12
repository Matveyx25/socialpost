import React, { useRef, useState } from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside';
import s from './Dropdown.module.scss'
import { IconChevronUp } from '@tabler/icons-react';
import { IconChevronDown } from '@tabler/icons-react';
import classNames from 'classnames';

export const Dropdown = ({label, options, className, menuClassName, disableArrows}) => {
	const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    if (isOpen) setOpen(false);
  });

  return (
    <div className={s.wrapper} ref={menuRef}>
      <button className={classNames(s.button, isOpen ? s.active : "")} onClick={(e) => {
					e.preventDefault()
					e.stopPropagation()
					setOpen(prev => !prev)
				}}>
				<div className={classNames(s.circle, className)}>
					{label}
				</div>
				{!disableArrows && <IconChevronDown size={18} className={s.arrowDown}/>}
				{!disableArrows && <IconChevronUp size={18} className={s.arrowUp}/>}
      </button>
      <nav className={classNames(s.menu, menuClassName, isOpen ? s.active : "")}>
        <ul className={s.list}>
          {options?.map(el => 
						<li className={s.item}>
							{el}
						</li>
					)}
        </ul>
      </nav>
    </div>
  );
}
