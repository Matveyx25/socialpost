import { IconX } from "@tabler/icons-react";
import ReactModal from "react-modal";
import './Modal.scss'

export const Modal = ({isOpen, setOpen, name, title, children}) => {
  return (
		<ReactModal
			isOpen={isOpen === name}
			onAfterOpen={() => setOpen(name)}
			onRequestClose={() => setOpen('')}
			parentSelector={() => document.querySelector('#root')}
		>
			<div className="ReactModal__Header">
				<p>{title}</p>
				<button onClick={() => setOpen('')}>
					<IconX size={24}/>
				</button>
			</div>
			{children}
		</ReactModal>
  );
};
