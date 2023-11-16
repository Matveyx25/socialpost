import React from 'react'
import { AddChannelModal } from './AddChannelModal'
import { RemoveChannelModal } from './RemoveChannelModal'

export const DashboardModals = ({isOpen, setOpen}) => {
	return (
		<div>
			<AddChannelModal {...{isOpen, setOpen}}/>
			<RemoveChannelModal {...{isOpen, setOpen}}/>
		</div>
	)
}
