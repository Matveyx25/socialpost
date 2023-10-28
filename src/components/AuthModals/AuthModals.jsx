import React from 'react'
import { LoginModal } from './LoginModal'
import { RegisterModal } from './RegisterModal'
import { ForgetPasswordModal } from './ForgetPasswordModal'

export const AuthModals = ({isOpen, setOpen}) => {
	return (
		<div>
			<LoginModal isOpen={isOpen} setOpen={setOpen}/>
			<RegisterModal isOpen={isOpen} setOpen={setOpen}/>
			<ForgetPasswordModal isOpen={isOpen} setOpen={setOpen}/>
		</div>
	)
}
