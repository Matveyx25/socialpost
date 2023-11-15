import React, { useRef, useState } from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside';
import s from './Dropdown.module.scss'
import { IconChevronUp } from '@tabler/icons-react';
import { IconChevronDown } from '@tabler/icons-react';

export const Dropdown = ({label, options}) => {
	const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    if (isOpen) setTimeout(() => setOpen(false), 50);
  });

  return (
    <div className={s.wrapper}>
      <button className={`${s.button} ${isOpen ? s.active : ""}`} onClick={() => setOpen(!isOpen)}>
				<div className={s.circle}>
					{label}
				</div>
				<IconChevronDown size={18} className={s.arrowDown}/>
				<IconChevronUp size={18} className={s.arrowUp}/>
      </button>
      <nav className={`${s.menu} ${isOpen ? s.active : ""}`} ref={menuRef}>
        <ul className={s.list}>
          {options?.map(el => 
						<li className={s.item}>
							<span>{el}</span>
						</li>
					)}
        </ul>
      </nav>
    </div>
  );
}
