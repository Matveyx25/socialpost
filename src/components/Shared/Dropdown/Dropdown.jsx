import React, { useRef, useState } from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside';
import s from './Dropdown.module.scss'
import { IconChevronUp } from '@tabler/icons-react';
import { IconChevronDown } from '@tabler/icons-react';

export const Dropdown = ({label, options}) => {
	const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    if (isOpen) setOpen(false);
  });

  return (
    <div className={s.wrapper} ref={menuRef}>
      <button className={`${s.button} ${isOpen ? s.active : ""}`} onClick={() => setOpen(prev => !prev)}>
				<div className={s.circle}>
					{label}
				</div>
				<IconChevronDown size={18} className={s.arrowDown}/>
				<IconChevronUp size={18} className={s.arrowUp}/>
      </button>
      <nav className={`${s.menu} ${isOpen ? s.active : ""}`}>
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
